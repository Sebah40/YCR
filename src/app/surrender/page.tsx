import Link from "next/link";
import { AlertTriangle, Check } from "lucide-react";
import ThemedDecorativeImage from "@/components/ThemedDecorativeImage";

export const metadata = { title: "Surrender" };

const requirements = [
  "Have no history of inappropriate aggression or biting.",
  "Pass a temperament evaluation.",
  "Look reasonably like a Chihuahua and be 10 pounds or under.",
  "Be surrendered with a signed surrender contract, giving YCRAA ownership of the dog.",
];

const steps = [
  "Owner completes our foster dog intake form which helps us to assess the dog.",
  "YCRAA Coordinator in your state receives and reviews the form and calls the owner to get further details on the dog and the situation. During the conversation, the YCRAA volunteer may suggest solutions to short term problems or alternatives to surrender.",
  "If the YCRAA believes the dog is a candidate for surrender, the state coordinator will contact a local evaluator with the dog's information and request an evaluation.",
  "The evaluator schedules and performs a temperament evaluation and passes the information back to the YCRAA Board of Directors, who reviews the results and determines if the dog should be accepted for foster care.",
  "If immediate foster care is available, the state coordinator informs the owner and asks them to prepare for the surrender.",
  "If foster care will be available in the next couple of months, the state coordinator works with the owner to determine if they might wait.",
  "If suitable foster care is not available, the state coordinator will work with the owner to find alternative solutions. There are times when we cannot accept a dog because we have too many fosters already. It is always best to discuss a surrender with YCR well in advance of any immediate need to surrender a dog.",
  "At surrender time, the dog is surrendered to a YCRAA volunteer with a signed surrender contract.",
];

export default function SurrenderPage() {
  return (
    <div className="bg-cream">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-warm-100 to-cream pb-8 pt-14 sm:pb-10 sm:pt-16">
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">
            Surrendering your Chihuahua
          </h1>
        </div>
      </section>

      {/* ID Badge Warning */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-xl border-2 border-coral-300 bg-coral-50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral-200">
                <AlertTriangle className="h-5 w-5 text-coral-700" strokeWidth={2} />
              </div>
              <div className="space-y-2.5 text-coral-800">
                <p>
                  We at Yankee Chihuahua Rescue display a Rescue Photo I.D. Badge while
                  conducting rescues, home visits and/or general rescue business.
                </p>
                <p className="font-bold">
                  Please do not surrender a dog to anyone who is not part of YCRAA
                </p>
                <p>
                  Every YCRAA volunteer will have and display a photo I.D. badge with the
                  YCRAA logo on it
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-5 text-base leading-relaxed text-warm-700 sm:text-lg">
            <ThemedDecorativeImage
              slot="surrender-top"
              width={180}
              height={200}
              className="float-right ml-6 mb-4 hidden h-auto w-36 sm:block sm:w-44"
            />
            <p>
              The decision to re-home your Chihuahua can be a difficult decision and not taken
              lightly. Giving up a dog is often due to issues such as housing options,
              allergies, behavioral issues, divorce, moving, a death or injury or illness in
              the family. Surrendering a dog means entrusting someone else with their care and
              well-being. It is a difficult and emotional time. Consider all the issues and
              possible solutions before you finalize the decision. If you decide that giving up
              your Chihuahua is best, YCRAA is here to support your decision.
            </p>
            <p>
              Surrendering your Chihuahua to YCRAA gives them the best opportunity for another
              happy life. It may be a difficult choice but it is also a gift of kindness and
              understanding.
            </p>
          </div>
        </div>
      </section>

      {/* What Happens */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-warm-900 sm:text-4xl">
            What happens when I surrender my dog to rescue?
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-amber-400" />
          <div className="mt-6 space-y-5 text-base leading-relaxed text-warm-700">
            <ThemedDecorativeImage
              slot="surrender-mid"
              width={150}
              height={170}
              className="float-right ml-6 mb-4 hidden h-auto w-32 sm:block sm:w-36"
            />
            <p>
              Upon surrendering your Chihuahua to YCRAA, the dog will be brought up to date on
              vaccinations, treated for any injuries or medical conditions and if needed,
              spayed/neutered. The dog will be heartworm tested and started on heartworm
              treatment. Sometimes the dogs are in rescue for weeks or even months before being
              placed. During that time, they live in foster homes where they are fed
              high-quality food. We do our best to provide socialization and obedience training
              for the dogs in our care. All of these expenditures far exceed our requested
              adoption donation. Therefore, donations from the former owner are much
              appreciated.
            </p>
            <p>
              You will be asked to sign a surrender agreement. In signing the surrender
              agreement, you must have the understanding that you have relinquished all rights
              to the dog and may not re-claim the dog. However, you are welcome to contact us
              and we will be glad to let you know about your dog&apos;s new home. It is helpful
              if you can give YCRAA all medical records, registration papers, micro-chip info
              and forms, and any other paperwork you may have for the dog.
            </p>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-warm-900 sm:text-4xl">
            The surrendered dogs must
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-amber-400" />
          <ul className="mx-auto mt-8 max-w-2xl space-y-3">
            {requirements.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                </span>
                <span className="text-warm-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Surrender Process */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-bold text-warm-900 sm:text-4xl">
            The Surrender Process
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-coral-400" />
          <div className="relative mt-12">
            <div aria-hidden="true" className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-warm-300 via-amber-300 to-warm-300 sm:left-8 md:block" />
            <ol className="space-y-8 md:space-y-10">
              {steps.map((step, idx) => (
                <li key={idx} className="relative md:pl-24">
                  <div className="mb-3 flex items-start gap-4 md:mb-0">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-warm-400 to-amber-400 text-lg font-bold text-white shadow-sm ring-2 ring-cream sm:h-16 sm:w-16 sm:text-xl md:absolute md:left-0 md:top-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1 rounded-xl border border-warm-100 bg-white/80 p-5 shadow-sm sm:p-6">
                      <p className="leading-relaxed text-warm-600">{step}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Take the Time */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold text-warm-900 sm:text-3xl">
            Take the time to be sure surrender is the right thing to do for your dog and
            yourself
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-warm-700">
            <div className="rounded-xl border-2 border-coral-300 bg-coral-50 p-6">
              <p>
                We at Yankee Chihuahua Rescue and Adoption display a Rescue Photo I.D. Badge
                while conducting rescues, home visits and/or general rescue business.{" "}
                <strong>
                  Please don&apos;t surrender a dog to anyone unless the volunteer displays a
                  badge with the YCRAA logo and photo I.D.
                </strong>
              </p>
            </div>
            <p>
              We do have an online{" "}
              <Link href="/surrender/intake" className="font-semibold text-coral-600 underline">
                foster dog intake form
              </Link>
              . If you&apos;d like to submit one, our Intake Coordinator will get back to you.
              Sending us a form does not commit you to anything, it just gives us more
              information about your dog.
            </p>
            <p>
              We&apos;d be happy to talk with you about your options. For more information or
              to surrender a dog, contact:{" "}
              <a
                href="mailto:info@yankeechihuahuarescue.org"
                className="font-semibold text-coral-600 underline"
              >
                info@YankeeChihuahuaRescue.org
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
