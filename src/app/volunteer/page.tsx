import Image from "next/image";
import { Check } from "lucide-react";

export const metadata = { title: "Volunteer" };

const roles = [
  "Monitoring shelters, notifying YCRAA about Chihuahuas that may be there",
  "Providing permanent foster homes for special-needs Chihuahuas",
  "Maintaining contact with shelters and other rescue groups",
  "Manning the YCRAA booth at fairs and shows",
  "Screening applicants via telephoning and home visits",
  "Educating the public about the 'real' Chihuahua",
  "Creating and maintaining public relations and websites",
  "Writing articles for our newsletter, website, etc.",
  "Following up on adoption placements",
  "Providing foster homes",
  "Transporting YCRAA dogs",
  "Maintaining records",
  "Responding to inquirers",
  "Fundraising",
  "and more!!",
];

const objectives = [
  "Rehabilitate and place homeless Chihuahuas and Chihuahua mixes in homes that meet the needs of each dog.",
  {
    main: "Promote responsible pet guardianship through education, resulting in a rewarding experience and relationship",
    sub: [
      "How to choose the right dog.",
      "Care for it.",
      "The importance of proper socialization.",
    ],
  },
  "Build good working relationships with veterinary professionals, other reputable animal rescue associations and dog training organizations.",
  "Ensure, to the best of our ability, that every dog placed will never be homeless again.",
];

export default function VolunteerPage() {
  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-cream to-coral-50 py-10 sm:py-14">
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl lg:text-6xl">
            Volunteer for Chihuahua Rescue
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-warm-600 sm:text-lg">
            Volunteer opportunities are available in a variety of areas
          </p>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <div key={role} className="rounded-xl border border-amber-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  <p className="text-sm font-medium text-warm-700">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-warm-800 via-warm-900 to-warm-900 py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-bold text-amber-100 sm:text-3xl">
            Just a few hours can make a difference in the life of a homeless Chihuahua
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-warm-200">
            All these roles are critical to our success. Can you help?
          </p>
          <p className="mt-5 text-warm-200">
            For more information email us:{" "}
            <a
              href="mailto:volunteer@yankeechihuahuarescue.org"
              className="font-semibold text-amber-400 underline"
            >
              volunteer@yankeechihuahuarescue.org
            </a>
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:volunteer@yankeechihuahuarescue.org?subject=Volunteer Application"
              className="inline-flex items-center rounded-full bg-amber-400 px-7 py-3 text-sm font-semibold text-warm-900 shadow-sm transition-all hover:bg-amber-300"
            >
              Volunteer Application
            </a>
            <a
              href="mailto:volunteer@yankeechihuahuarescue.org?subject=Foster Home Application"
              className="inline-flex items-center rounded-full border border-warm-600 px-7 py-3 text-sm font-semibold text-white transition-all hover:border-amber-400 hover:bg-white/10"
            >
              Foster Home Application
            </a>
          </div>
        </div>
      </section>

      {/* YCRAA Objectives */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-warm-900 sm:text-3xl">
                YCRAA objectives:
              </h2>
              <ul className="mt-6 space-y-4">
            {objectives.map((item, idx) => {
              const isComplex = typeof item === "object";
              return (
                <li key={idx}>
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                      {idx + 1}
                    </span>
                    <span className="text-warm-700">
                      {isComplex ? item.main : (item as string)}
                    </span>
                  </div>
                  {isComplex && (
                    <ul className="ml-11 mt-2 space-y-1">
                      {item.sub.map((sub) => (
                        <li key={sub} className="flex items-start gap-2 text-warm-600">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                          {sub}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
              <div className="mt-6 space-y-3 text-warm-700">
                <p>Each home is carefully screened before placement.</p>
                <p>
                  Each dog is evaluated for temperament, has a vet exam, is up to date on all
                  shots, and receives whatever other vet care is needed. Adult dogs are also
                  spayed or neutered before adoption.
                </p>
              </div>
            </div>
            <Image src="/images/scraped/images/holidays/st-patrick/chix2---happy-st-patrick-day.jpg" alt="Happy St. Patrick's Day Chihuahuas" width={140} height={90} className="hidden h-auto w-32 shrink-0 self-start rounded-lg sm:block" />
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-gradient-to-br from-warm-800 to-warm-900 py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-base italic text-amber-100 sm:text-lg">
            The basis of all animal rights should be the Golden Rule:
          </p>
          <blockquote className="mt-4 text-xl italic leading-relaxed text-amber-100 sm:text-2xl">
            &ldquo;We should treat them as we would wish them to treat us, were any other
            species in our dominant position.&rdquo;
          </blockquote>
          <p className="mt-4 text-warm-300">~Christine Stevens</p>
        </div>
      </section>
    </div>
  );
}
