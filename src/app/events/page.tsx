import Link from "next/link";
import ThemedDecorativeImage from "@/components/ThemedDecorativeImage";
import HeroLogo from "@/components/HeroLogo";

export const metadata = { title: "Current Events" };

export default function EventsPage() {
  return (
    <div className="bg-cream">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-cream pb-8 pt-14 sm:pb-10 sm:pt-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-5 px-6 sm:flex-row sm:items-center sm:gap-8">
          <HeroLogo />
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl lg:text-6xl">
              Current Events
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border border-amber-200 bg-white/70 p-8 shadow-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-coral-500">
              Upcoming Event
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-warm-900 sm:text-4xl">
              28th Annual Pet Rock Festival
            </h2>
            <a
              href="https://www.petrockfest.org/about"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-sm font-semibold text-coral-500 hover:text-coral-400"
            >
              About Pet Rock Festival →
            </a>

            <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-warm-500">
                  When
                </dt>
                <dd className="mt-1 text-lg text-warm-800">
                  Sunday, Oct 4, 2026
                  <br />
                  Noon to 5 p.m.
                </dd>
              </div>

              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-warm-500">
                  Where
                </dt>
                <dd className="mt-1 text-lg text-warm-800">
                  Lancaster Fairgrounds
                  <br />
                  Lancaster, MA
                </dd>
                <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=The+Fairgrounds+at+Lancaster%2C+318+Seven+Bridge+Rd%2C+Lancaster%2C+MA+01523"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-coral-500 hover:text-coral-400"
                  >
                    Google Maps →
                  </a>
                  <a
                    href="https://www.bing.com/maps?q=The+Fairgrounds+at+Lancaster%2C+318+Seven+Bridge+Rd%2C+Lancaster%2C+MA+01523"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-coral-500 hover:text-coral-400"
                  >
                    Bing Maps →
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-warm-500">
                  Admission
                </dt>
                <dd className="mt-1 text-lg text-warm-800">
                  $15 adults, $5 kids 12 and under
                </dd>
                <dd className="mt-1 text-sm text-warm-600">
                  At the gate · Venmo, PayPal, Cash accepted
                </dd>
              </div>

              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-warm-500">
                  More
                </dt>
                <dd className="mt-1 flex flex-col gap-1 text-lg">
                  <a
                    href="https://www.petrockfest.org/_files/ugd/c3bea5_2f7cc7a08c594b56ab47a0f85e6e26f4.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-coral-500 hover:text-coral-400"
                  >
                    Coupons for you and your friends →
                  </a>
                  <a
                    href="https://www.petrockfest.org/projects"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-coral-500 hover:text-coral-400"
                  >
                    Find out more →
                  </a>
                </dd>
              </div>
            </dl>
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
            Come see us at the Pet Rock Festival — and you can always help our
            Chihuahuas by donating, volunteering, or shopping through iGive.
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
