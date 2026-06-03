"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import HeroLogo from "@/components/HeroLogo";
import { BookOpen } from "lucide-react";

const ic =
  "mt-1.5 block w-full rounded-lg border border-warm-200 bg-white px-4 py-2.5 text-warm-800 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200";

export default function SignGuestbookPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        body: fd,
      });
      if (res.ok) {
        setSubmitted(true);
        return;
      }
      const body = await res.json().catch(() => ({}));
      setError(body?.error || "Something went wrong. Please try again.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-cream">
        <section className="bg-gradient-to-b from-amber-50 to-cream py-16 text-center">
          <div className="mx-auto max-w-2xl px-6">
            <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">
              Thank You!
            </h1>
            <p className="mt-5 text-lg text-warm-700">
              Your entry has been submitted. A YCRAA volunteer will review it
              and it will appear on the Guest Book shortly.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Link
                href="/guestbook"
                className="rounded-full bg-coral-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-coral-600"
              >
                Back to Guest Book
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-b from-amber-50 to-cream pb-8 pt-14 sm:pb-10 sm:pt-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-5 px-6 sm:flex-row sm:gap-8">
          <HeroLogo />
          <div className="text-center sm:text-left">
            <h1 className="flex items-center justify-center gap-3 text-3xl font-bold tracking-tight text-warm-900 sm:justify-start sm:text-4xl">
              <BookOpen className="h-7 w-7 text-coral-500" strokeWidth={2} />
              Sign the Guest Book
            </h1>
            <p className="mt-3 max-w-xl text-base text-warm-600">
              Share your story. Entries are reviewed by a YCRAA volunteer
              before appearing publicly.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-6 pb-20 pt-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-warm-800">
              <span className="text-coral-500">* </span>Your Name
            </label>
            <input id="name" name="name" type="text" required maxLength={120} className={ic} />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-warm-800">
              Location (City, State)
            </label>
            <input id="location" name="location" type="text" maxLength={120} className={ic} />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-warm-800">
              Email (optional, not shown publicly)
            </label>
            <input id="email" name="email" type="email" maxLength={200} className={ic} />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-warm-800">
              <span className="text-coral-500">* </span>Your Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              maxLength={2000}
              rows={6}
              className={`${ic} min-h-[120px]`}
            />
            <p className="mt-1 text-xs text-warm-500">Up to 2000 characters.</p>
          </div>

          {/* Honeypot — real users won't see or fill this. */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {error && (
            <div className="rounded-lg border border-coral-200 bg-coral-50 p-4 text-sm text-coral-800">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Link
              href="/guestbook"
              className="rounded-full border border-warm-300 px-7 py-3 text-sm font-semibold text-warm-700 transition-colors hover:border-amber-400 hover:bg-amber-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-coral-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-coral-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Submitting…" : "Submit Entry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
