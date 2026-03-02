import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "About YCRAA" };

const helpAreas = [
  {
    title: "Foster care",
    description:
      "Giving a homeless Chihuahua a temporary home. Sometimes these Chihuahuas are one step away from being euthanized. The stories of their lives can be heart wrenching, but you can help to start them on their road to a happy ending!",
  },
  {
    title: "Reference check assistance",
    description:
      "We ask all adopters for a personal references and a vet reference. The average reference check takes 10 minutes. A form will guide you through a list of questions.",
  },
  {
    title: "Transport assistance",
    description:
      "We need drivers to pick up dogs and bring them to foster homes, vet visits, grooming appointments. The average time commitment is 2 hours.",
  },
  {
    title: 'Adoption follow-up assistance and "Happy Endings" write-ups',
    description:
      'We need assistance following up on recent adoptions, and a friendly phone call to past adopters. Our "Happy Endings" are in need of up dating.',
  },
  {
    title: "Administrative assistance",
    description:
      "We need assistance in updating our standard adoption contracts and other related forms. If you have a computer and a few spare hours, please let us know.",
  },
];

const objectives = [
  "Rehabilitate and place homeless Chihuahuas and Chihuahua mixes in homes that meet the needs of each dog.",
  "Promote responsible pet guardianship through education about how to choose the right dog and care for it, resulting in a rewarding experience.",
  "Build good working relationships with veterinary professionals and other reputable animal rescue organizations.",
  "Ensure, to the best of our ability, that every dog placed will never be homeless again.",
];

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-cream to-coral-50 py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-warm-900 sm:text-5xl lg:text-6xl">
            About Yankee Chihuahua Rescue and Adoption
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-6 text-lg leading-relaxed text-warm-700">
            <Image
              src="/images/scraped/images/holidays/st-patrick/chi-st-patrick-lucky-charm.png"
              alt="Chihuahua - Lucky Charm"
              width={160}
              height={180}
              className="float-right ml-6 mb-4 hidden h-auto w-32 sm:block sm:w-40"
            />
            <p>
              YCRAA is a small group of dedicated, unpaid volunteer dog lovers whose mission
              is to rescue, provide sanctuary, and ultimately to re-home abandoned, stray and
              neglected Chihuahuas. We also assist dogs who, because of extenuating
              circumstances, are unable to remain in their homes with their owners.
            </p>
            <p>
              We operate this rescue in our free time, aside from full-time jobs. Our dogs
              reside in foster homes. This provides a &apos;home&apos; environment and the time to
              over come any difficulties medically or socially and provides an easier
              transition into an adoptive home. Our goal is to find only the best homes for
              the dogs in our care.
            </p>
            <p>
              Founded in 2000, YCRAA&apos;s ultimate goal is to create a world where all
              Chihuahuas and Chi mixes have loving, permanent homes. Where no good natured
              dog, no matter what their age, are considered to be surplus or un-adoptable.
            </p>
            <p>
              All YCRAA Chihuahuas and Chihuahua mixes are brought up to date on shots and
              spayed or neutered prior to adoption.
            </p>
          </div>
        </div>
      </section>

      {/* How You Can Help */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold text-warm-900 sm:text-3xl">
            If you love dogs as much as we do, then please consider helping our rescue efforts.
          </h2>
          <p className="mt-4 text-lg text-warm-700">
            You can help in the following areas:
          </p>
          <div className="mt-10 space-y-6">
            {helpAreas.map((area) => (
              <div
                key={area.title}
                className="rounded-2xl border border-warm-100 bg-white p-6 shadow-sm sm:p-8"
              >
                <h3 className="text-lg font-semibold text-warm-800">{area.title}</h3>
                <p className="mt-2 leading-relaxed text-warm-600">{area.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-warm-700">
            If interested in any of the above, please send an email to{" "}
            <a
              href="mailto:volunteer@yankeechihuahuarescue.org"
              className="font-semibold text-coral-600 underline"
            >
              Volunteer@yankeechihuahuarescue.org
            </a>
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/volunteer"
              className="inline-flex items-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
            >
              Volunteer Application
            </Link>
            <Link
              href="/volunteer"
              className="inline-flex items-center rounded-full border-2 border-amber-500 px-6 py-3 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-50"
            >
              Foster Home Application
            </Link>
          </div>
        </div>
      </section>

      {/* YCRAA Objectives */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold text-warm-900 sm:text-3xl">
            YCRAA objectives are to:
          </h2>
          <ul className="mt-8 space-y-4">
            {objectives.map((item, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                  {idx + 1}
                </span>
                <span className="text-warm-700">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-3 text-warm-700">
            <p>Each home is carefully screened before placement.</p>
            <p>
              Each dog is evaluated for temperament, has a vet exam, is up to date on all
              shots, and receives whatever other vet care is needed.
            </p>
            <p>Adult dogs are spayed or neutered before adoption.</p>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-gradient-to-br from-warm-800 to-warm-900 py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Image
            src="/images/scraped/images/holidays/st-patrick/chi-st-patrick-lucky-dog.gif"
            alt="Lucky Dog"
            width={120}
            height={120}
            className="mx-auto mb-6 h-auto w-24"
          />
          <blockquote className="text-xl italic leading-relaxed text-amber-100 sm:text-2xl">
            &ldquo;Non-violence leads to the highest ethics, which is the goal of all
            evolution. Until we stop harming all other living beings, we are still
            savages.&rdquo;
          </blockquote>
          <p className="mt-4 text-warm-300">~Thomas A. Edison</p>
        </div>
      </section>
    </div>
  );
}
