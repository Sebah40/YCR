import { Redis } from "@upstash/redis";

/**
 * Self-hosted visitor statistics.
 *
 * Because Vercel is serverless there are no raw access logs to post-process
 * (the way PowWeb's Webalizer did). Instead each real page view is recorded
 * live into Redis by a small client beacon (see /api/track). Counts are
 * therefore *human* page views and visitors — bots that don't run JS are not
 * counted — so totals read lower, and more honestly, than Webalizer's "hits".
 *
 * Redis keys (all prefixed `stats:`):
 *   stats:months               SET   of "YYYY-MM" that have live data
 *   stats:pv:m:<YYYY-MM>        INT   monthly page views (INCR)
 *   stats:uv:m:<YYYY-MM>        HLL   monthly unique visitors (PFADD/PFCOUNT)
 *   stats:pv:d:<YYYY-MM-DD>     INT   daily page views
 *   stats:uv:d:<YYYY-MM-DD>     HLL   daily unique visitors
 *   stats:pages:<YYYY-MM>       ZSET  path -> views this month
 *   stats:ref:<YYYY-MM>         ZSET  referrer host -> count this month
 *
 * Historical months (before live tracking existed) come from the constant
 * POWWEB_HISTORY below, imported from PowWeb's final Webalizer report.
 */

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const DAY_TTL_SECONDS = 60 * 60 * 24 * 550; // ~18 months
const MONTH_TTL_SECONDS = 60 * 60 * 24 * 800; // keep ZSETs ~2 years

/** Monthly totals imported from PowWeb's Webalizer report (verified against
 *  its own totals row: Visits sum 64,996 / Pages sum 148,759). "visits" maps
 *  to our visitor column, "pages" to page views. */
export const POWWEB_HISTORY: Record<string, { visits: number; pages: number }> = {
  "2025-08": { visits: 7181, pages: 20803 },
  "2025-09": { visits: 7590, pages: 14984 },
  "2025-10": { visits: 9000, pages: 24402 },
  "2025-11": { visits: 3605, pages: 6217 },
  "2025-12": { visits: 5702, pages: 11717 },
  "2026-01": { visits: 5663, pages: 12529 },
  "2026-02": { visits: 6020, pages: 11116 },
  "2026-03": { visits: 6873, pages: 17135 },
  "2026-04": { visits: 6557, pages: 15560 },
  "2026-05": { visits: 6117, pages: 13054 },
  "2026-06": { visits: 682, pages: 1232 },
  "2026-07": { visits: 6, pages: 10 },
};

export interface MonthRow {
  month: string; // YYYY-MM
  label: string; // "Aug 2026"
  pageViews: number;
  visitors: number;
  source: "live" | "powweb";
}

export interface StatsSummary {
  today: { pageViews: number; visitors: number };
  thisMonth: { pageViews: number; visitors: number; label: string };
  totals: { pageViews: number; visits: number };
  months: MonthRow[]; // newest first
  topPages: { path: string; views: number }[];
  topReferrers: { ref: string; count: number }[];
  liveSince: string | null; // label of earliest live month, or null
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function monthLabel(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTH_NAMES[(m || 1) - 1]} ${y}`;
}

/** UTC date parts — keeps day/month boundaries consistent regardless of the
 *  serverless region a request lands in. */
function parts(d: Date) {
  const day = d.toISOString().slice(0, 10); // YYYY-MM-DD
  const month = day.slice(0, 7); // YYYY-MM
  return { day, month };
}

export interface RecordInput {
  path: string;
  referrerHost: string | null;
  visitorId: string;
}

/** Record one page view. Best-effort: never throws into the request path. */
export async function recordView({ path, referrerHost, visitorId }: RecordInput): Promise<void> {
  const { day, month } = parts(new Date());
  try {
    const p = redis.pipeline();
    p.sadd("stats:months", month);
    p.incr(`stats:pv:m:${month}`);
    p.incr(`stats:pv:d:${day}`);
    p.pfadd(`stats:uv:m:${month}`, visitorId);
    p.pfadd(`stats:uv:d:${day}`, visitorId);
    p.zincrby(`stats:pages:${month}`, 1, path);
    p.expire(`stats:pv:d:${day}`, DAY_TTL_SECONDS);
    p.expire(`stats:uv:d:${day}`, DAY_TTL_SECONDS);
    p.expire(`stats:pages:${month}`, MONTH_TTL_SECONDS);
    if (referrerHost) {
      p.zincrby(`stats:ref:${month}`, 1, referrerHost);
      p.expire(`stats:ref:${month}`, MONTH_TTL_SECONDS);
    }
    await p.exec();
  } catch {
    // Analytics must never break page delivery.
  }
}

function currentMonth(): string {
  return parts(new Date()).month;
}

/** Build the full summary the admin page renders. */
export async function getStats(): Promise<StatsSummary> {
  const { day, month: thisMonth } = parts(new Date());

  const liveMonths = ((await redis.smembers("stats:months")) as string[]) || [];

  // Union of every month we can show: imported history + any live months.
  const allMonths = Array.from(
    new Set([...Object.keys(POWWEB_HISTORY), ...liveMonths])
  ).sort((a, b) => b.localeCompare(a)); // newest first

  const liveSet = new Set(liveMonths);
  const rows: MonthRow[] = [];

  for (const m of allMonths) {
    if (liveSet.has(m)) {
      const [pv, uv] = await Promise.all([
        redis.get<number>(`stats:pv:m:${m}`),
        redis.pfcount(`stats:uv:m:${m}`),
      ]);
      rows.push({
        month: m,
        label: monthLabel(m),
        pageViews: Number(pv) || 0,
        visitors: Number(uv) || 0,
        source: "live",
      });
    } else {
      const h = POWWEB_HISTORY[m];
      rows.push({
        month: m,
        label: monthLabel(m),
        pageViews: h.pages,
        visitors: h.visits,
        source: "powweb",
      });
    }
  }

  const [todayPv, todayUv] = await Promise.all([
    redis.get<number>(`stats:pv:d:${day}`),
    redis.pfcount(`stats:uv:d:${day}`),
  ]);

  const thisRow = rows.find((r) => r.month === thisMonth);

  // Top pages / referrers for the current month (live only).
  const [pagesRaw, refRaw] = await Promise.all([
    redis.zrange(`stats:pages:${thisMonth}`, 0, 9, { rev: true, withScores: true }),
    redis.zrange(`stats:ref:${thisMonth}`, 0, 9, { rev: true, withScores: true }),
  ]);

  const topPages = pairScores(pagesRaw as (string | number)[]).map(([path, views]) => ({
    path: String(path),
    views,
  }));
  const topReferrers = pairScores(refRaw as (string | number)[]).map(([ref, count]) => ({
    ref: String(ref),
    count,
  }));

  const totals = rows.reduce(
    (acc, r) => {
      acc.pageViews += r.pageViews;
      acc.visits += r.visitors;
      return acc;
    },
    { pageViews: 0, visits: 0 }
  );

  const earliestLive = liveMonths.slice().sort()[0];

  return {
    today: { pageViews: Number(todayPv) || 0, visitors: Number(todayUv) || 0 },
    thisMonth: {
      pageViews: thisRow?.pageViews ?? 0,
      visitors: thisRow?.visitors ?? 0,
      label: monthLabel(thisMonth),
    },
    totals,
    months: rows,
    topPages,
    topReferrers,
    liveSince: earliestLive ? monthLabel(earliestLive) : null,
  };
}

/** Upstash returns [member, score, member, score, ...] for withScores. */
function pairScores(flat: (string | number)[]): [string, number][] {
  const out: [string, number][] = [];
  for (let i = 0; i < flat.length; i += 2) {
    out.push([String(flat[i]), Number(flat[i + 1]) || 0]);
  }
  return out;
}
