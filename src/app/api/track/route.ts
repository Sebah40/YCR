import { NextResponse, type NextRequest } from "next/server";
import crypto from "crypto";
import { recordView } from "@/lib/stats";

export const runtime = "nodejs";

// Obvious non-human agents. Client-JS tracking already filters most bots
// (they don't run scripts), this catches the headless ones that do.
const BOT_RE = /bot|crawl|spider|slurp|bingpreview|headless|python-requests|curl|wget|facebookexternalhit|embedly|preview|monitor|uptime|lighthouse|pingdom|gtmetrix/i;

/** A per-day, non-reversible visitor fingerprint. No raw IP is ever stored. */
function visitorId(ip: string, ua: string): string {
  const daySalt = new Date().toISOString().slice(0, 10);
  const secret = process.env.ADMIN_PASSWORD || "ycr-stats";
  return crypto
    .createHmac("sha256", secret)
    .update(`${ip}|${ua}|${daySalt}`)
    .digest("hex")
    .slice(0, 32);
}

function firstIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for") || "";
  return xff.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
}

/** Normalize a path: strip query/hash, cap length, ignore non-page routes. */
function cleanPath(raw: unknown): string | null {
  if (typeof raw !== "string" || !raw.startsWith("/")) return null;
  let p = raw.split("?")[0].split("#")[0];
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  if (p.startsWith("/admin") || p.startsWith("/api") || p.startsWith("/_next")) return null;
  return p.slice(0, 200) || "/";
}

function refHost(raw: unknown, selfHost: string): string | null {
  if (typeof raw !== "string" || !raw) return null;
  try {
    const h = new URL(raw).hostname.replace(/^www\./, "");
    if (!h || h === selfHost.replace(/^www\./, "")) return null; // internal nav
    return h.slice(0, 100);
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";
  if (!ua || BOT_RE.test(ua)) return NextResponse.json({ ok: true });

  let body: { path?: string; ref?: string };
  try {
    body = (await req.json()) as { path?: string; ref?: string };
  } catch {
    return NextResponse.json({ ok: true });
  }

  const path = cleanPath(body.path);
  if (!path) return NextResponse.json({ ok: true });

  const selfHost = req.headers.get("host") || "yankeechihuahuarescue.org";
  await recordView({
    path,
    referrerHost: refHost(body.ref, selfHost),
    visitorId: visitorId(firstIp(req), ua),
  });

  return NextResponse.json({ ok: true });
}
