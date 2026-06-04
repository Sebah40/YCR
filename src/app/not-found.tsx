import Link from "next/link";
import { Home } from "lucide-react";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="bg-gradient-to-b from-amber-50 to-cream">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-coral-500">
          404
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-warm-600">
          You may have followed a link from the old YCRAA site, or the page has
          moved. Try jumping to one of these instead:
        </p>
        <div className="mt-8 grid w-full max-w-md grid-cols-2 gap-3 text-sm font-semibold">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-coral-500 px-6 py-3 text-white shadow-sm transition-colors hover:bg-coral-600"
          >
            <Home className="h-4 w-4" strokeWidth={2} />
            Home
          </Link>
          <Link
            href="/adoption"
            className="inline-flex items-center justify-center rounded-full border border-warm-300 px-6 py-3 text-warm-700 transition-colors hover:border-amber-400 hover:bg-amber-50"
          >
            Adopt
          </Link>
          <Link
            href="/chihuahua-info"
            className="inline-flex items-center justify-center rounded-full border border-warm-300 px-6 py-3 text-warm-700 transition-colors hover:border-amber-400 hover:bg-amber-50"
          >
            Chi Info
          </Link>
          <Link
            href="/volunteer"
            className="inline-flex items-center justify-center rounded-full border border-warm-300 px-6 py-3 text-warm-700 transition-colors hover:border-amber-400 hover:bg-amber-50"
          >
            Volunteer
          </Link>
        </div>
      </div>
    </section>
  );
}
