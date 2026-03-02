import Image from "next/image";

export const metadata = { title: "Donate via iGive" };

export default function DonatePage() {
  return (
    <div className="bg-cream">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-cream pb-16 pt-24 sm:pb-20 sm:pt-32">
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl lg:text-6xl">
            Support YCR through iGive
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-warm-600">
            #GiveToReceive &mdash; Help Yankee Chihuahua Rescue and Adoption every time
            you shop online
          </p>
        </div>
      </section>

      {/* iGive Logo & Intro */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <a
            href="http://www.igive.com/html/refer.cfm?causeid=47590"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/scraped/images/igive-dot-com-transparent-color.png"
              alt="iGive.com"
              width={528}
              height={100}
              className="mx-auto h-auto w-full max-w-md"
            />
          </a>

          <div className="mt-8">
            <a
              href="http://www.igive.com/html/refer.cfm?causeid=47590"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/scraped/images/igive-bonus-donation.gif"
                alt="iGive bonus donation"
                width={400}
                height={80}
                className="mx-auto h-auto w-full max-w-sm"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Members */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <a
            href="http://www.igive.com/html/refer.cfm?causeid=47590"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/scraped/images/igive-membership.png"
              alt="iGive Members"
              width={600}
              height={300}
              className="mx-auto h-auto w-full max-w-xl rounded-xl"
            />
          </a>

          <h2 className="mt-10 text-2xl font-bold text-warm-900 sm:text-3xl">
            Help Yankee Chihuahua Rescue and Adoption
          </h2>
        </div>
      </section>

      {/* Store Logos */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <a
            href="http://www.igive.com/html/refer.cfm?causeid=47590"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/scraped/images/igive_48storelogos.jpg"
              alt="iGive partner stores"
              width={625}
              height={300}
              className="mx-auto h-auto w-full max-w-xl rounded-xl"
            />
          </a>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-2xl font-bold text-warm-900 sm:text-3xl">
            How it works
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-amber-400" />

          <div className="mt-8">
            <a
              href="http://www.igive.com/html/refer.cfm?causeid=47590"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/scraped/images/igive-how-it-works.png"
                alt="How iGive works"
                width={600}
                height={300}
                className="mx-auto h-auto w-full max-w-xl rounded-xl"
              />
            </a>
          </div>

          <ul className="mx-auto mt-10 max-w-2xl space-y-4">
            {[
              "Make your first purchase within 45 days to earn $5 Bonus Donation.",
              "Over $8,400,000 raised for great causes since 1997.",
              "Over 1,700 Online Stores - including all your favorites!",
              "Use the iGive Button, shop online as you normally would - no added steps",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                  {idx + 1}
                </span>
                <span className="text-warm-700">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <a
              href="http://www.igive.com/html/refer.cfm?causeid=47590"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/scraped/images/igive_logo_youshopwithstores.jpg"
                alt="You shop with stores, stores donate to your cause"
                width={635}
                height={200}
                className="mx-auto h-auto w-full max-w-xl rounded-xl"
              />
            </a>
          </div>
        </div>
      </section>

      {/* iSearchiGive Banner */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-6 text-lg font-medium text-warm-700">
            Our animal rescue earns money every time you search.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="http://www.igive.com/welcome/warmwelcome.cfm?c=47590"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/scraped/images/isearchigive.gif"
                alt="iSearchiGive.com - Our animal rescue earns money every time you search"
                width={460}
                height={56}
                className="h-auto w-full max-w-md"
              />
            </a>
            <a
              href="http://www.igive.com/html/refer.cfm?causeid=47590"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/scraped/images/save-a-dog-logo-animated.gif"
                alt="Save a Dog via iGive"
                width={120}
                height={60}
                className="h-auto w-28"
              />
            </a>
          </div>
        </div>
      </section>

      {/* PayPal */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-bold text-warm-900 sm:text-3xl">
            Donate directly via PayPal
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-amber-400" />
          <p className="mx-auto mt-6 max-w-2xl text-warm-600">
            Click to send YCR a donation via PayPal &mdash; every dollar goes toward
            rescuing and caring for Chihuahuas in need.
          </p>
          <a
            href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=S69AP6GHFKRUS"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block transition-opacity hover:opacity-80"
          >
            <Image
              src="/images/scraped/images/paypal-donate/paypal-donate.png"
              alt="Donate via PayPal"
              width={120}
              height={80}
              className="mx-auto h-auto w-32"
            />
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-warm-800 to-warm-900 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Image
            src="/images/scraped/images/holidays/new-year/chi-synth02.png"
            alt="Chihuahua"
            width={118}
            height={120}
            className="mx-auto mb-6 h-auto w-24"
          />
          <h2 className="text-2xl font-bold text-amber-100 sm:text-3xl">
            Start helping Yankee Chihuahuas today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-warm-200">
            Every purchase you make through iGive helps rescue, rehabilitate, and rehome
            Chihuahuas in need across New England.
          </p>
          <a
            href="http://www.igive.com/html/refer.cfm?causeid=47590"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center rounded-full bg-amber-400 px-8 py-3.5 text-base font-semibold text-warm-900 shadow-sm transition-all hover:bg-amber-300"
          >
            Join iGive Now
          </a>
        </div>
      </section>
    </div>
  );
}
