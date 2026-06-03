import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { listAllEntries, type GuestbookEntry } from "@/lib/guestbook";
import GuestbookAdminClient from "./client";

export const metadata = { title: "Guest Book Moderation" };
export const dynamic = "force-dynamic";

export default async function AdminGuestbookPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin");
  }

  let entries: GuestbookEntry[] = [];
  let loadError: string | null = null;
  try {
    entries = await listAllEntries();
  } catch (e) {
    loadError = e instanceof Error ? e.message : "Failed to load entries.";
  }

  const pending = entries
    .filter((e) => !e.approved && !e.deleted)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const approved = entries
    .filter((e) => e.approved && !e.deleted)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const deleted = entries.filter((e) => e.deleted);

  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-warm-900">
            Guest Book Moderation
          </h1>
          <Link href="/admin" className="text-sm font-semibold text-coral-600 hover:text-coral-700">
            &larr; Admin Home
          </Link>
        </div>

        <div className="mb-6 flex gap-3 text-sm">
          <span className="rounded-full bg-amber-100 px-4 py-1.5 font-medium text-amber-800">
            {pending.length} pending
          </span>
          <span className="rounded-full bg-emerald-100 px-4 py-1.5 font-medium text-emerald-800">
            {approved.length} approved
          </span>
          <span className="rounded-full bg-warm-100 px-4 py-1.5 font-medium text-warm-700">
            {deleted.length} deleted
          </span>
        </div>

        {loadError && (
          <div className="mb-6 rounded-xl border border-coral-200 bg-coral-50 p-5 text-sm text-coral-800">
            <strong>Failed to load entries:</strong> {loadError}
          </div>
        )}

        <GuestbookAdminClient pending={pending} approved={approved} deleted={deleted} />
      </div>
    </div>
  );
}
