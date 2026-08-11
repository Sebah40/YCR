"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BarChart3, Users, Eye, ArrowLeft, ExternalLink } from "lucide-react";

interface MonthRow {
  month: string;
  label: string;
  pageViews: number;
  visitors: number;
  source: "live" | "powweb";
}
interface StatsSummary {
  today: { pageViews: number; visitors: number };
  thisMonth: { pageViews: number; visitors: number; label: string };
  totals: { pageViews: number; visits: number };
  months: MonthRow[];
  topPages: { path: string; views: number }[];
  topReferrers: { ref: string; count: number }[];
  liveSince: string | null;
}

const n = (v: number) => v.toLocaleString("en-US");

export default function StatsPage() {
  const [state, setState] = useState<"loading" | "unauth" | "error" | "ok">("loading");
  const [data, setData] = useState<StatsSummary | null>(null);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(async (r) => {
        if (r.status === 401) return setState("unauth");
        if (!r.ok) {
          const j = await r.json().catch(() => ({}));
          setErrMsg(j.error || "Could not load statistics.");
          return setState("error");
        }
        setData(await r.json());
        setState("ok");
      })
      .catch(() => setState("error"));
  }, []);

  if (state === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-warm-500">Loading statistics…</p>
      </div>
    );
  }

  if (state === "unauth") {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <p className="text-warm-600">Please log in to view visitor statistics.</p>
          <Link href="/admin" className="mt-4 inline-block rounded-lg bg-coral-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-coral-600">
            Go to Admin Login
          </Link>
        </div>
      </div>
    );
  }

  if (state === "error" || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <p className="text-red-600">{errMsg || "Something went wrong loading statistics."}</p>
      </div>
    );
  }

  const maxVisitors = Math.max(1, ...data.months.map((m) => m.visitors));

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-coral-500" strokeWidth={2} />
          <h1 className="text-2xl font-bold text-warm-900">Visitor Statistics</h1>
        </div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 rounded-lg border border-warm-200 px-4 py-2 text-sm font-medium text-warm-600 transition-colors hover:bg-warm-50"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Back to Admin
        </Link>
      </div>
      <p className="mb-8 text-sm text-warm-500">
        {data.liveSince
          ? `Live tracking since ${data.liveSince}. Earlier months imported from PowWeb.`
          : "Earlier months imported from PowWeb. Live tracking begins with the next deploy."}
      </p>

      {/* Snapshot cards */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Users className="h-5 w-5" />} label="Visitors today" value={n(data.today.visitors)} />
        <StatCard icon={<Eye className="h-5 w-5" />} label="Page views today" value={n(data.today.pageViews)} />
        <StatCard icon={<Users className="h-5 w-5" />} label={`Visitors — ${data.thisMonth.label}`} value={n(data.thisMonth.visitors)} />
        <StatCard icon={<Eye className="h-5 w-5" />} label={`Page views — ${data.thisMonth.label}`} value={n(data.thisMonth.pageViews)} />
      </div>

      {/* Summary by month */}
      <h2 className="mb-3 text-lg font-bold text-warm-900">Summary by Month</h2>
      <div className="mb-10 overflow-x-auto rounded-xl border border-warm-100 shadow-sm">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="bg-warm-50 text-left text-xs uppercase tracking-wide text-warm-500">
              <th className="px-4 py-3 font-semibold">Month</th>
              <th className="px-4 py-3 font-semibold">Visitors</th>
              <th className="px-4 py-3 font-semibold">Page Views</th>
              <th className="px-4 py-3 font-semibold">Trend (visitors)</th>
              <th className="px-4 py-3 font-semibold">Source</th>
            </tr>
          </thead>
          <tbody>
            {data.months.map((m) => (
              <tr key={m.month} className="border-t border-warm-100">
                <td className="whitespace-nowrap px-4 py-2.5 font-medium text-warm-800">{m.label}</td>
                <td className="px-4 py-2.5 tabular-nums text-warm-800">{n(m.visitors)}</td>
                <td className="px-4 py-2.5 tabular-nums text-warm-600">{n(m.pageViews)}</td>
                <td className="px-4 py-2.5">
                  <div className="h-2.5 w-full max-w-[180px] overflow-hidden rounded-full bg-warm-100">
                    <div
                      className={m.source === "live" ? "h-full rounded-full bg-coral-500" : "h-full rounded-full bg-amber-400"}
                      style={{ width: `${Math.round((m.visitors / maxVisitors) * 100)}%` }}
                    />
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className={
                      m.source === "live"
                        ? "rounded-full bg-coral-50 px-2.5 py-0.5 text-xs font-semibold text-coral-600"
                        : "rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700"
                    }
                  >
                    {m.source === "live" ? "Live" : "PowWeb"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-warm-200 bg-warm-50 font-semibold text-warm-800">
              <td className="px-4 py-3">Totals</td>
              <td className="px-4 py-3 tabular-nums">{n(data.totals.visits)}</td>
              <td className="px-4 py-3 tabular-nums">{n(data.totals.pageViews)}</td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Top pages & referrers */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title={`Top Pages — ${data.thisMonth.label}`}>
          {data.topPages.length === 0 ? (
            <Empty />
          ) : (
            <ul className="divide-y divide-warm-100">
              {data.topPages.map((p) => (
                <li key={p.path} className="flex items-center justify-between gap-4 py-2 text-sm">
                  <span className="truncate font-mono text-warm-700">{p.path}</span>
                  <span className="shrink-0 tabular-nums text-warm-500">{n(p.views)}</span>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title={`Where Visitors Came From — ${data.thisMonth.label}`}>
          {data.topReferrers.length === 0 ? (
            <Empty note="Most visitors arrive directly or from search engines that hide the source." />
          ) : (
            <ul className="divide-y divide-warm-100">
              {data.topReferrers.map((r) => (
                <li key={r.ref} className="flex items-center justify-between gap-4 py-2 text-sm">
                  <span className="flex items-center gap-1.5 truncate text-warm-700">
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-warm-400" strokeWidth={2} />
                    {r.ref}
                  </span>
                  <span className="shrink-0 tabular-nums text-warm-500">{n(r.count)}</span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-warm-400">
        Numbers reflect real human page views and unique visitors, so they read lower than PowWeb&apos;s
        old &ldquo;hits&rdquo; (which counted search-engine bots and every image and file). Visitor counts
        exclude admin visits and obvious bots. &ldquo;PowWeb&rdquo; rows are imported from the final
        Webalizer report; &ldquo;Live&rdquo; rows are measured on this site.
      </p>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-warm-100 bg-white p-5 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-warm-400">{icon}</div>
      <p className="text-2xl font-bold tabular-nums text-warm-900">{value}</p>
      <p className="mt-1 text-xs font-medium text-warm-500">{label}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-warm-100 bg-white p-5 shadow-sm">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-warm-500">{title}</h3>
      {children}
    </div>
  );
}

function Empty({ note }: { note?: string }) {
  return <p className="py-6 text-center text-sm text-warm-400">{note || "No data yet for this month."}</p>;
}
