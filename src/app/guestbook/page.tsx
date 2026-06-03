import Link from "next/link";
import HeroLogo from "@/components/HeroLogo";
import { listApprovedEntries, type GuestbookEntry } from "@/lib/guestbook";
import { BookOpen, Heart } from "lucide-react";

export const metadata = { title: "Guest Book" };
// Always fetch fresh data — never cache the entry list at the framework level.
export const revalidate = 0;

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function EntryCard({ entry }: { entry: GuestbookEntry }) {
  const lines = entry.message.split("\n").filter((l) => l.trim() !== "");
  const replyLines = entry.reply.split("\n").filter((l) => l.trim() !== "");
  return (
    <article className="rounded-2xl border border-warm-200 bg-white p-6 shadow-sm">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          <h3 className="text-lg font-semibold text-warm-900">{entry.name}</h3>
          {entry.location && (
            <p className="text-sm text-warm-500">{entry.location}</p>
          )}
        </div>
        <time className="text-xs font-medium uppercase tracking-wider text-warm-400">
          {formatDate(entry.createdAt)}
        </time>
      </header>
      <div className="mt-4 space-y-3 whitespace-pre-line text-base leading-relaxed text-warm-700">
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
      {replyLines.length > 0 && (
        <div className="mt-5 rounded-xl border-l-4 border-coral-300 bg-coral-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-coral-600">
            From YCRAA
          </p>
          <div className="mt-2 space-y-2 whitespace-pre-line text-sm leading-relaxed text-warm-700">
            {replyLines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export default async function GuestbookPage() {
  let entries: GuestbookEntry[] = [];
  let loadError: string | null = null;
  try {
    entries = await listApprovedEntries();
  } catch (e) {
    loadError = e instanceof Error ? e.message : "Failed to load entries.";
  }

  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-b from-amber-50 to-cream pb-8 pt-14 sm:pb-10 sm:pt-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-5 px-6 sm:flex-row sm:gap-8">
          <HeroLogo />
          <div className="text-center sm:text-left">
            <h1 className="flex items-center justify-center gap-3 text-4xl font-bold tracking-tight text-warm-900 sm:justify-start sm:text-5xl">
              <BookOpen className="h-8 w-8 text-coral-500" strokeWidth={2} />
              Guest Book
            </h1>
            <p className="mt-3 max-w-xl text-base text-warm-600">
              Adopters and friends of YCRAA, share your story. Read what others
              have written about their Chihuahuas.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 pb-20">
        <div className="flex justify-center py-6">
          <Link
            href="/guestbook/sign"
            className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-coral-600 hover:shadow-lg"
          >
            <Heart className="h-4 w-4 fill-current" strokeWidth={2} />
            Sign the Guest Book
          </Link>
        </div>

        {loadError && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
            We&apos;re having trouble loading the guest book right now. Please
            check back in a few minutes.
          </div>
        )}

        {!loadError && entries.length === 0 && (
          <p className="py-10 text-center text-warm-500">
            No entries yet. Be the first to sign!
          </p>
        )}

        <div className="space-y-5">
          {entries.map((e) => (
            <EntryCard key={e.id} entry={e} />
          ))}
        </div>
      </div>
    </div>
  );
}
