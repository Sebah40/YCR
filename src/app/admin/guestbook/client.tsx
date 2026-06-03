"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { GuestbookEntry } from "@/lib/guestbook";

type Action = "approve" | "unapprove" | "delete" | "restore" | "reply";

interface Props {
  pending: GuestbookEntry[];
  approved: GuestbookEntry[];
  deleted: GuestbookEntry[];
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function GuestbookAdminClient({ pending, approved, deleted }: Props) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  async function act(id: string, action: Action, reply?: string) {
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch("/api/admin/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action, reply }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body?.error || `${action} failed`);
        return;
      }
      // Re-render the server component with the new state.
      startTransition(() => router.refresh());
    } catch (e) {
      setError(e instanceof Error ? e.message : `${action} failed`);
    } finally {
      setBusyId(null);
    }
  }

  function Entry({ entry, section }: { entry: GuestbookEntry; section: "pending" | "approved" | "deleted" }) {
    const isBusy = busyId === entry.id;
    const draft = replyDrafts[entry.id] ?? entry.reply;
    return (
      <article className="rounded-xl border border-warm-200 bg-white p-5 shadow-sm">
        <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <div>
            <h3 className="font-semibold text-warm-900">{entry.name}</h3>
            {entry.location && <p className="text-xs text-warm-500">{entry.location}</p>}
            {entry.email && (
              <p className="text-xs text-warm-400">{entry.email}</p>
            )}
          </div>
          <time className="text-xs font-medium uppercase tracking-wider text-warm-400">
            {formatDate(entry.createdAt)}
          </time>
        </header>
        <div className="mt-3 whitespace-pre-line text-sm leading-relaxed text-warm-700">
          {entry.message}
        </div>

        {/* Reply editor */}
        <div className="mt-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-warm-500">
            Admin Reply
          </label>
          <textarea
            className="mt-1 block w-full rounded-lg border border-warm-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
            rows={2}
            value={draft}
            onChange={(e) => setReplyDrafts({ ...replyDrafts, [entry.id]: e.target.value })}
            placeholder="Optional response shown on the public guest book"
          />
          {draft !== entry.reply && (
            <button
              type="button"
              disabled={isBusy}
              onClick={() => act(entry.id, "reply", draft)}
              className="mt-2 rounded-md bg-warm-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-warm-800 disabled:opacity-50"
            >
              Save reply
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {section === "pending" && (
            <button
              disabled={isBusy}
              onClick={() => act(entry.id, "approve")}
              className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              Approve
            </button>
          )}
          {section === "approved" && (
            <button
              disabled={isBusy}
              onClick={() => act(entry.id, "unapprove")}
              className="rounded-md border border-warm-300 px-3 py-1.5 text-xs font-semibold text-warm-700 hover:bg-warm-50 disabled:opacity-50"
            >
              Unapprove
            </button>
          )}
          {section !== "deleted" && (
            <button
              disabled={isBusy}
              onClick={() => act(entry.id, "delete")}
              className="rounded-md border border-coral-300 px-3 py-1.5 text-xs font-semibold text-coral-700 hover:bg-coral-50 disabled:opacity-50"
            >
              Delete
            </button>
          )}
          {section === "deleted" && (
            <button
              disabled={isBusy}
              onClick={() => act(entry.id, "restore")}
              className="rounded-md border border-warm-300 px-3 py-1.5 text-xs font-semibold text-warm-700 hover:bg-warm-50 disabled:opacity-50"
            >
              Restore
            </button>
          )}
        </div>
      </article>
    );
  }

  return (
    <div className="space-y-10">
      {error && (
        <div className="rounded-lg border border-coral-200 bg-coral-50 p-4 text-sm text-coral-800">
          {error}
        </div>
      )}

      <section>
        <h2 className="mb-3 text-lg font-bold text-warm-900">Pending ({pending.length})</h2>
        {pending.length === 0 ? (
          <p className="text-sm text-warm-500">No pending entries.</p>
        ) : (
          <div className="space-y-3">
            {pending.map((e) => (
              <Entry key={e.id} entry={e} section="pending" />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold text-warm-900">Approved ({approved.length})</h2>
        {approved.length === 0 ? (
          <p className="text-sm text-warm-500">No approved entries.</p>
        ) : (
          <div className="space-y-3">
            {approved.map((e) => (
              <Entry key={e.id} entry={e} section="approved" />
            ))}
          </div>
        )}
      </section>

      {deleted.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-bold text-warm-900">Deleted ({deleted.length})</h2>
          <div className="space-y-3 opacity-70">
            {deleted.map((e) => (
              <Entry key={e.id} entry={e} section="deleted" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
