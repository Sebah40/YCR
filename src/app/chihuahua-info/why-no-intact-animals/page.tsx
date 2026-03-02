import Link from "next/link";

export const metadata = { title: "Why Rescues Do Not Place Dogs in Homes with Intact Animals" };

const behaviors = [
  "Wanderers & roamers",
  "Noisy, baying, howling, overbearing, barking & lunging at passersby",
  "Tend toward fighting -- lunging & barking at and fighting with other male dogs",
  "Non-compliant, pushy and bossy attitude towards caretakers and strangers",
  "Uncooperative, resistant; an unwillingness to obey commands",
  "Excessive sniffers",
  "Have sexual frustration, mount other dogs, people, toys",
  "Masturbators, with excessive grooming of genital area",
  "Offensive growling, snapping, biting",
  "A heightened sense of territoriality, marking with urine indoors",
  "Excessive marking on outdoor scent posts",
  "Intolerant and possessive/overprotective behavior -- growling/snapping around food or toys",
];

const stats = [
  "The interest in roaming is eliminated in 90 percent of neutered dogs",
  "Aggressive behavior against other dogs is eliminated in 60 percent of neutered dogs",
  "Urine marking is eliminated in 50 percent of neutered male dogs",
  "Inappropriate mounting is eliminated in 70 percent of neutered dogs",
];

export default function WhyNoIntactAnimalsPage() {
  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-b from-amber-100 to-cream px-6 pb-16 pt-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">
            Why Rescues Do Not Place Dogs in Homes with Intact Animals
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-24">
        <article className="py-16">
          <div className="space-y-6 text-base leading-relaxed text-warm-700">
            <p>
              The main reason why Yankee Chihuahua Rescue will not place a chihuahua in a home
              where the pets have not been neutered is because they deserve a home with
              responsible owners. Responsible owners take good care of their pets and do the best
              thing for them -- Neutering.
            </p>

            <h2 className="!mt-12 text-2xl font-bold text-warm-900">
              Health benefits of neutering
            </h2>
            <div className="h-1 w-12 rounded-full bg-amber-400" />

            <p>
              One of the most important concerns the prostate gland, which under the influence of
              testosterone will gradually enlarge over the course of the dog&apos;s life. In age,
              it is likely to become uncomfortable, possibly being large enough to interfere
              with defecation. The prostate under the influence of testosterone is also
              predisposed to infection which is almost impossible to clear up without neutering.
              Neutering causes the prostate to shrink into insignificance thus preventing both
              prostatitis as well as the uncomfortable benign hyperplasia (enlargement) that
              occurs with aging. It is often erroneously held that neutering prevents prostate
              cancer but this is not true.
            </p>

            <p>
              Other health benefits of neutering include the prevention of certain types of
              hernias and tumors of the testicles and anus.
            </p>

            <p>Excessive prepuce/penis discharge is also reduced by neutering.</p>

            <h2 className="!mt-12 text-2xl font-bold text-warm-900">
              Behavioral concerns with unneutered dogs
            </h2>
            <div className="h-1 w-12 rounded-full bg-coral-400" />

            <p>
              The behavior of other dogs in homes our fosters go into is a huge concern.
              Un-neutered dogs have natural biological needs. If the dog doesn&apos;t fulfill
              those needs, he will build up frustration, anxiety, and may even develop obsessive
              tendencies. Un-neutered dogs are often:
            </p>

            <ul className="space-y-2">
              {behaviors.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <p className="font-semibold">
              These are not the type of environments we want fosters to endure.
            </p>

            <h2 className="!mt-12 text-2xl font-bold text-warm-900">
              Post-neutering improvements
            </h2>
            <div className="h-1 w-12 rounded-full bg-amber-400" />

            <p>
              The only behavior changes after neutering relate to behaviors influenced by male
              hormones. Playfulness, friendliness, and socialization with humans are not changed.
              Activity level and appetite do not change with neutering. A male dog should not
              gain weight or become less interested in activity post neuter.
            </p>

            <p>With Neutering:</p>

            <ul className="space-y-2">
              {stats.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>

            <p>In other words, they are much better behaved.</p>

            <div className="!mt-12 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-warm-50 p-8 text-center shadow-sm">
              <p className="text-lg font-bold italic text-warm-800">
                Well behaved companions are what a Yankee Chihuahua deserves.
              </p>
            </div>
          </div>
        </article>

        <div className="border-t border-warm-200 pt-8">
          <Link
            href="/chihuahua-info"
            className="text-sm font-semibold text-coral-600 hover:text-coral-700"
          >
            &larr; Back to Breed Information
          </Link>
        </div>
      </div>
    </div>
  );
}
