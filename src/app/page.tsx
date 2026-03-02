import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-cream to-coral-50 py-20 sm:py-28 lg:py-36">
        <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-coral-200/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-warm-900 sm:text-5xl lg:text-6xl">
                Welcome to{" "}
                <span className="text-coral-500">Yankee Chihuahua Rescue</span>{" "}
                and Adoption, Inc.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-warm-600 sm:text-xl">
                YCRAA is a 501(c)(3) public charity, nonprofit organization founded in the
                year 2000. As a New England based rescue, we are a network of independent
                volunteers who work together to rescue homeless Chihuahuas and Chihuahua mixes.
              </p>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-warm-600">
                YCRAA is comprised entirely of volunteers (we have no paid employees) and is
                dedicated to fostering and fundraising to help this beloved breed. Prior to
                placement, all YCRAA dogs are immunized, heartworm tested, microchipped,
                spayed/neutered and provided with any necessary medical attention.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  href="/adoption"
                  className="inline-flex items-center rounded-full bg-coral-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-coral-500/25 transition-all hover:bg-coral-400 hover:shadow-xl"
                >
                  Adopt a Chihuahua
                  <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/volunteer"
                  className="inline-flex items-center rounded-full border-2 border-warm-300 px-8 py-3.5 text-base font-semibold text-warm-700 transition-colors hover:border-amber-400 hover:bg-amber-50"
                >
                  Volunteer
                </Link>
              </div>
            </div>
            <div className="relative mx-auto lg:mx-0">
              <div className="min-h-[400px] overflow-hidden rounded-3xl shadow-2xl shadow-warm-400/20">
                <Image
                  src="/images/hero.jpg"
                  alt="Chihuahua available for adoption"
                  width={800}
                  height={600}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 overflow-hidden rounded-2xl shadow-lg ring-4 ring-cream">
                <Image
                  src="/images/holly.jpg"
                  alt="Holly (adopted)"
                  width={160}
                  height={160}
                  className="h-32 w-32 object-cover"
                />
                <p className="bg-white px-2 py-1 text-center text-xs font-medium text-warm-700">Holly (adopted)</p>
              </div>
              <div className="absolute -right-6 -top-6 overflow-hidden rounded-2xl shadow-lg ring-4 ring-cream">
                <Image
                  src="/images/baby.jpg"
                  alt="Baby (adopted)"
                  width={140}
                  height={140}
                  className="h-28 w-28 object-cover"
                />
                <p className="bg-white px-2 py-1 text-center text-xs font-medium text-warm-700">Baby (adopted)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Chihuahuas */}
      <section className="bg-white py-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 px-6">
          <Image src="/images/scraped/images/holidays/st-patrick/chi-st-patrick-glasses.png" alt="Chihuahua with St. Patrick's glasses" width={160} height={160} className="h-auto w-28 sm:w-36" />
          <Image src="/images/scraped/images/holidays/st-patrick/chi-4-leaf-clover.png" alt="Chihuahua with four-leaf clover" width={140} height={140} className="h-auto w-24 sm:w-32" />
          <Image src="/images/scraped/images/holidays/st-patrick/chi-st-patrick-kiss-me.png" alt="Chihuahua - Kiss me I'm Irish" width={160} height={160} className="h-auto w-28 sm:w-36" />
        </div>
      </section>

      {/* Donations Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-warm-900 sm:text-4xl">
            Donations are welcomed
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {["Collars", "Bedding", "Sweaters", "Coats", "Coupons", "Pee Pads", "Crates", "Toys"].map((item) => (
              <div key={item} className="flex flex-col items-center rounded-2xl border border-warm-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </div>
                <p className="mt-3 text-sm font-semibold text-warm-800">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-warm-600">
            Services are always much appreciated.
          </p>
          <p className="mt-4 text-center text-sm text-warm-500">
            To donate items please send details of all items in an email to{" "}
            <a href="mailto:info@yankeechihuahuarescue.org" className="text-amber-600 underline">
              info@yankeechihuahuarescue.org
            </a>
          </p>
          <p className="mt-1 text-center text-sm text-warm-500">
            Please remember to include your Contact information, Company name and Location.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=S69AP6GHFKRUS"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/scraped/images/paypal-donate/paypal-donate.png"
                alt="Donate via PayPal"
                width={120}
                height={80}
                className="h-auto w-28"
              />
            </a>
            <a
              href="https://gofund.me/a6cb95fec"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-warm-900 shadow transition-all hover:bg-amber-300"
            >
              GoFundMe
            </a>
            <Link
              href="/donate"
              className="inline-flex items-center rounded-full border-2 border-warm-300 px-6 py-3 text-sm font-semibold text-warm-700 transition-colors hover:border-amber-400 hover:bg-amber-50"
            >
              Donate via iGive
            </Link>
          </div>
        </div>
      </section>

      {/* Volunteer CTA */}
      <section className="bg-gradient-to-br from-warm-800 via-warm-900 to-warm-900 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-amber-100 sm:text-4xl">
            Yankee Chihuahua Rescue is looking for dedicated people
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-warm-200">
            If you have a few hours to give to help New England Chihuahuas in need,
            then please consider submitting an application. YCRAA is in need of
            Volunteers and Foster Homes.
          </p>
          <Link
            href="/volunteer"
            className="mt-8 inline-flex items-center rounded-full bg-amber-400 px-8 py-3.5 text-base font-semibold text-warm-900 shadow-lg transition-all hover:bg-amber-300 hover:shadow-xl"
          >
            For more information about Volunteering
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Bottom Quote & Thanks */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Image
            src="/images/imgA4.jpg"
            alt="Chihuahua"
            width={100}
            height={91}
            className="mx-auto mb-8 rounded-xl shadow-sm"
          />
          <blockquote className="text-2xl font-bold italic leading-relaxed text-warm-800 sm:text-3xl lg:text-4xl">
            &ldquo;If you want the best seat in the house, you&apos;ve got to move the Chihuahua&rdquo;
          </blockquote>
          <p className="mt-8 text-lg text-warm-500">Thanks for stopping by!</p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="https://www.facebook.com/groups/YankeeChihuahua/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-warm-100 px-6 py-3 text-sm font-semibold text-warm-700 transition-colors hover:bg-warm-200"
            >
              Find us on Facebook
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
