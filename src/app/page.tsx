import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import FallingLeaves from "@/components/FallingLeaves";
import SeasonalImages from "@/components/SeasonalImages";
import HeroLogo from "@/components/HeroLogo";
import ObfuscatedEmail from "@/components/ObfuscatedEmail";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-cream to-coral-50 pt-3 pb-8 sm:pt-4 sm:pb-12 lg:pt-6 lg:pb-16">
        <FallingLeaves />
        <div className="flex items-center justify-center gap-6 pb-3 sm:gap-12 lg:gap-16">
          <Image
            src="/images/scraped/images/holidays/graduation/gradchicoolglasses.png"
            alt="Graduation Chihuahua with cool glasses"
            width={160}
            height={160}
            className="h-auto w-16 sm:w-24 md:w-28"
          />
          <HeroLogo />
          <Image
            src="/images/scraped/images/holidays/graduation/gradchistud.png"
            alt="Graduation Chihuahua stud"
            width={160}
            height={240}
            className="h-auto w-16 sm:w-24 md:w-28"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-warm-900 sm:text-5xl lg:text-6xl">
                Welcome to{" "}
                <span className="text-coral-500">Yankee Chihuahua Rescue</span>{" "}
                and Adoption, Inc.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-warm-600 sm:text-lg">
                YCRAA is a 501(c)(3) public charity, nonprofit organization founded in the
                year 2000. As a New England-based rescue, we are a network of independent
                volunteers who work together to rescue homeless Chihuahuas and Chihuahua mixes.
              </p>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-warm-600">
                YCRAA is comprised entirely of volunteers (we have no paid employees) and is
                dedicated to fostering and fundraising to help this beloved breed. Prior to
                placement, all YCRAA dogs are immunized, heartworm-tested, microchipped,
                spayed/neutered, and provided with any necessary medical attention.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <Link
                  href="/adoption"
                  className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-coral-400 hover:shadow-lg"
                >
                  Adopt a Chihuahua
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>
                <Link
                  href="/volunteer"
                  className="inline-flex items-center rounded-full border border-warm-300 px-7 py-3 text-sm font-semibold text-warm-700 transition-colors hover:border-amber-400 hover:bg-amber-50"
                >
                  Volunteer
                </Link>
              </div>
            </div>
            <div className="relative mx-auto lg:mx-0">
              <div className="min-h-[400px] overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/images/hero.jpg"
                  alt="Chihuahua available for adoption"
                  width={800}
                  height={600}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-5 -left-5 overflow-hidden rounded-xl shadow-md ring-2 ring-cream">
                <Image
                  src="/images/holly.jpg"
                  alt="Holly (adopted)"
                  width={160}
                  height={160}
                  className="h-32 w-32 object-cover"
                />
                <p className="bg-white px-2 py-1 text-center text-[11px] font-medium text-warm-600">
                  Holly (adopted)
                </p>
              </div>
              <div className="absolute -right-5 -top-5 overflow-hidden rounded-xl shadow-md ring-2 ring-cream">
                <Image
                  src="/images/baby.jpg"
                  alt="Baby (adopted)"
                  width={140}
                  height={140}
                  className="h-28 w-28 object-cover"
                />
                <p className="bg-white px-2 py-1 text-center text-[11px] font-medium text-warm-600">
                  Baby (adopted)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Chihuahuas */}
      <SeasonalImages />

      {/* Donations Section */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="flex items-center justify-center gap-3 text-center text-3xl font-bold tracking-tight text-warm-900 sm:text-4xl">
            <Image
              src="/images/scraped/Heart.png"
              alt=""
              width={200}
              height={210}
              aria-hidden="true"
              className="h-7 w-auto sm:h-8"
            />
            Donations are welcomed
            <Image
              src="/images/scraped/Heart.png"
              alt=""
              width={200}
              height={210}
              aria-hidden="true"
              className="h-7 w-auto sm:h-8"
            />
          </h2>

          {/* Donate buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=S69AP6GHFKRUS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-coral-500 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-coral-600"
            >
              <Image
                src="/images/scraped/images/paypal-donate/paypal-donate.png"
                alt="PayPal"
                width={80}
                height={20}
                className="h-5 w-auto brightness-0 invert"
              />
              Donate via PayPal
            </a>
            <a
              href="https://gofund.me/a6cb95fec"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-3.5 text-base font-semibold text-white shadow-md ring-1 ring-emerald-400/50 transition-all hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg"
            >
              <Heart className="h-4 w-4 fill-current" strokeWidth={2} />
              Donate via GoFundMe
            </a>
          </div>

          {/* Item donations */}
          <div className="mt-8 rounded-xl border border-warm-100 bg-warm-50 p-6 text-center">
            <p className="text-sm font-semibold text-warm-800">We also accept item donations</p>
            <p className="mt-2 text-sm text-warm-600">
              Collars, Bedding, Sweaters, Coats, Coupons, Pee Pads, Crates, Toys &mdash; services are always appreciated.
            </p>
            <p className="mt-2 text-sm text-warm-500">
              Email details to{" "}
              <ObfuscatedEmail
                enc="aW5mb0B5YW5rZWVjaGlodWFodWFyZXNjdWUub3Jn"
                subject="Donation Items Detail"
                display="auto"
                className="text-amber-600 underline"
              />
            </p>
          </div>

          {/* iGive - shopping, not donation */}
          <div className="mt-6 text-center">
            <Link
              href="/donate"
              className="inline-flex items-center rounded-full border border-warm-300 px-6 py-2.5 text-sm font-semibold text-warm-700 transition-colors hover:border-amber-400 hover:bg-amber-50"
            >
              Shop via iGive
            </Link>
            <p className="mt-2 text-xs text-warm-500">You shop. Your cause gets money. For free.</p>
          </div>
        </div>
      </section>

      {/* Volunteer CTA */}
      <section className="bg-gradient-to-br from-warm-800 via-warm-900 to-warm-900 py-10 sm:py-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center sm:flex-row sm:gap-10 sm:text-left">
          <Link href="/volunteer" className="shrink-0 transition-transform hover:scale-105">
            <Image
              src="/images/scraped/images/HeartVolunteer.png"
              alt="Volunteer Information"
              width={200}
              height={210}
              className="h-auto w-32 sm:w-40"
            />
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-amber-100 sm:text-4xl">
              Yankee Chihuahua Rescue is looking for dedicated people
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-warm-200">
              If you have a few hours to give to help New England Chihuahuas in need,
              then please consider submitting an application. YCRAA is in need of
              Volunteers and Foster Homes.
            </p>
            <Link
              href="/volunteer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber-400 px-7 py-3 text-sm font-semibold text-warm-900 shadow-md transition-all hover:bg-amber-300 hover:shadow-lg"
            >
              For more information about Volunteering
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Quote & Thanks */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Image
            src="/images/imgA4.jpg"
            alt="Chihuahua"
            width={100}
            height={91}
            className="mx-auto mb-6 rounded-xl shadow-sm"
          />
          <blockquote className="text-2xl font-bold italic leading-relaxed text-warm-800 sm:text-3xl lg:text-4xl">
            &ldquo;If you want the best seat in the house, you&apos;ve got to move the Chihuahua.&rdquo;
          </blockquote>
          <p className="mt-6 text-base text-warm-500">Thanks for stopping by!</p>
          <div className="mt-6 flex items-center justify-center">
            <a
              href="https://www.facebook.com/groups/YankeeChihuahua/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-warm-100 px-6 py-2.5 text-sm font-semibold text-warm-700 transition-colors hover:bg-warm-200"
            >
              Find us on Facebook
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
