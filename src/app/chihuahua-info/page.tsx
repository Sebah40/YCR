import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Chihuahua Info" };

const breedInfo = [
  { label: "The Chihuahua - a brief description", href: "/chihuahua-info/the-chihuahua" },
  { label: "AKC - Chihuahua Breed Standard", href: "/chihuahua-info/breed-standard" },
  { label: "The Versatile Chihuahua", href: "/chihuahua-info/versatile-chihuahua" },
  { label: "Chihuahua Bill of Rights", href: "/chihuahua-info/bill-of-rights" },
  { label: "TeaCup Chihuahuas - Fact or Fiction?", href: "/chihuahua-info/teacup-chihuahuas" },
  { label: "For Fun, Famous Chihuahuas", href: "/chihuahua-info/famous-chihuahuas" },
];

const volunteerArticles = [
  { label: "YCRAA - The Beginning by Corinne Joly", href: "/chihuahua-info/ycraa-the-beginning" },
  { label: "Volunteering by Cheryl", href: "/chihuahua-info/volunteering-by-cheryl" },
];

const rescueArticles = [
  {
    label: "Tips For New Adopters; by Anne Puchtinger, and Canadian Chihuahua Rescue & Transport",
    href: "/chihuahua-info/tips-for-new-adopters",
  },
  { label: "Are You a Responsible Pet Parent?", href: "/chihuahua-info/responsible-pet-parent" },
  {
    label: "Benefits of Neutering - by Race Foster, DVM; Drs. Foster & Smith, Inc.",
    href: "/chihuahua-info/benefits-of-neutering",
  },
  {
    label: "Why Rescues do not place dogs in homes with intact animals.",
    href: "/chihuahua-info/why-no-intact-animals",
  },
];

const interestArticles = [
  { label: "Chihuahua Treats", href: "/chihuahua-info/chihuahua-treats" },
  { label: "Chocolate Poisoning", href: "/chihuahua-info/chocolate-poisoning" },
  { label: "Crate training; step by step", href: "/chihuahua-info/crate-training" },
];

function ArticleList({
  items,
  accentBg,
  accentText,
}: {
  items: { label: string; href: string }[];
  accentBg: string;
  accentText: string;
}) {
  return (
    <ul className="mt-8 space-y-3">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/80"
          >
            <span
              className={`mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${accentBg} ${accentText}`}
            >
              <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="text-warm-700 underline decoration-warm-300 underline-offset-2 hover:decoration-warm-500">
              {item.label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function ChihuahuaInfoPage() {
  return (
    <div className="bg-cream">
      {/* Header */}
      <section className="bg-gradient-to-b from-amber-100 to-cream px-6 pb-16 pt-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">
            Chihuahua Information
          </h1>
          <div className="mt-8 flex items-center justify-center gap-6">
            <Image src="/images/scraped/images/holidays/st-patrick/chi-st-patrick-pub.jpg" alt="Chihuahua at the pub" width={180} height={140} className="h-auto w-36 rounded-lg shadow-md sm:w-44" />
            <Image src="/images/scraped/images/holidays/st-patrick/chi-hat-graphic02.png" alt="Chihuahua with hat" width={140} height={160} className="hidden h-auto w-28 sm:block sm:w-36" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-24">
        {/* Breed Information */}
        <section className="py-16">
          <h2 className="text-2xl font-bold text-warm-900 sm:text-3xl">Breed Information</h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-amber-400" />
          <ArticleList items={breedInfo} accentBg="bg-amber-100" accentText="text-amber-600" />
        </section>

        {/* Articles by YCRAA Volunteers */}
        <section className="py-16">
          <h2 className="text-2xl font-bold text-warm-900 sm:text-3xl">
            Articles by YCRAA Volunteers
          </h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-coral-400" />
          <ArticleList
            items={volunteerArticles}
            accentBg="bg-coral-100"
            accentText="text-coral-600"
          />
        </section>

        {/* Articles Related to Rescue and Adoption */}
        <section className="py-16">
          <h2 className="text-2xl font-bold text-warm-900 sm:text-3xl">
            Articles Related to Rescue and Adoption
          </h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-amber-400" />
          <ArticleList items={rescueArticles} accentBg="bg-amber-100" accentText="text-amber-600" />
        </section>

        {/* Articles of Interest */}
        <section className="py-16">
          <h2 className="text-2xl font-bold text-warm-900 sm:text-3xl">Articles of Interest</h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-coral-400" />
          <ArticleList
            items={interestArticles}
            accentBg="bg-coral-100"
            accentText="text-coral-600"
          />
        </section>

        {/* Quote */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-warm-50 p-10 text-center shadow-sm">
            <blockquote className="text-lg italic leading-relaxed text-warm-700">
              &ldquo;Our task must be to free ourselves... by widening our circle of compassion
              to embrace all living creatures and the whole of nature and its beauty.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm font-semibold text-warm-500">~Albert Einstein</p>
          </div>
        </section>
      </div>
    </div>
  );
}
