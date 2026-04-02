import Image from "next/image";
import Link from "next/link";
import ThemedDecorativeImage from "@/components/ThemedDecorativeImage";

export const metadata = { title: "Current Events" };

export default function EventsPage() {
  return (
    <div className="bg-cream">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-cream pb-8 pt-14 sm:pb-10 sm:pt-16">
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl lg:text-6xl">
            Current Events
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-start">
            <Image
              src="/images/scraped/images/longhaired-chihuahua-3.jpg"
              alt="Long-haired Chihuahua"
              width={200}
              height={280}
              className="h-auto w-48 shrink-0 rounded-2xl shadow-sm"
            />
            <div className="text-center sm:text-left">
              <p className="text-xl leading-relaxed text-warm-700">
                Sorry. There are no planned events at this time.
              </p>
              <p className="mt-4 text-lg text-warm-600">
                But you never know when there will be another.
              </p>
              <p className="mt-4 text-lg text-warm-600">
                Please check back. We&apos;ll keep you informed.
              </p>
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <ThemedDecorativeImage
              slot="events-hero"
              width={500}
              height={300}
              className="h-auto w-full max-w-lg rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-bold text-warm-900 sm:text-3xl">
            Support Yankee Chihuahua Rescue
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-warm-600">
            While there are no events scheduled, you can still help our Chihuahuas by
            donating, volunteering, or shopping through iGive.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=S69AP6GHFKRUS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-coral-500 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-coral-400"
            >
              Donate via PayPal
            </a>
            <Link
              href="/volunteer"
              className="inline-flex items-center rounded-full border-2 border-amber-500 px-8 py-3.5 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-50"
            >
              Volunteer
            </Link>
            <a
              href="https://gofund.me/a6cb95fec"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border-2 border-warm-300 px-8 py-3.5 text-sm font-semibold text-warm-700 transition-colors hover:bg-warm-50"
            >
              GoFundMe
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
