import Image from "next/image";
import Link from "next/link";
import { Check, Heart } from "lucide-react";
import ThemedDecorativeImage from "@/components/ThemedDecorativeImage";

export const metadata = { title: "Adoption" };

const fees = [
  { age: "0 – 6 months", donation: "To be determined (per dog)", medical: "To be determined if any" },
  { age: "6 mos – 2 yrs", donation: "$250", medical: "To be determined if any" },
  { age: "2 – 4 years", donation: "$200", medical: "To be determined if any" },
  { age: "4 – 6 years", donation: "$250", medical: "To be determined if any" },
  { age: "6 – 8 years", donation: "$200", medical: "To be determined if any" },
  { age: "8 – 10 years", donation: "$100", medical: "To be determined if any" },
  { age: "Over 10 years", donation: "$75 or negotiable to a great home", medical: "To be determined if any" },
];

const policies = [
  "We serve the six New England states (New Hampshire, Vermont, Massachusetts, Maine, Connecticut, and Rhode Island) only.",
  "We cannot rescue dogs nor can we offer them for adoption to you if you do not live within New England.",
  "Please note: We cannot place dogs outside of these areas. Contact Chihuahua Rescue and Transport (CRT) for information about adoption in your area.",
  "YCRAA offers dogs for adoption only to households in which there are no children under 10 years of age without special approval of the YCRAA Board of Directors.",
  "All adult dogs are neutered before placement.",
  "YCRAA offers dogs for adoption only to households in which there are NO intact dogs.",
  "All dogs under 6 months require a signed Spay/Neuter Contract and a signed receipt from the adopter's veterinarian stating that spay/neuter surgery has been paid in full by the adopter.",
  "All dogs are microchipped and registered with YCRAA as the primary contact.",
];

const seniorReasons = [
  "Senior dogs love to sleep and cuddle the day away.",
  "They enjoy a brisk daily walk, but the best part of the day is the nap.",
  "They love for you to join them. Senior dogs have a tremendous amount of love to give.",
  "When you rescue a senior dog, you have a best friend for life.",
  "Senior dogs reward your care with an unwavering devotion.",
  "Nothing matches the love of a senior dog for his family.",
  "Senior dogs have learned many of life's lessons. They know, for example, that shoes are for walking and bones are for chewing. Senior dogs know that great outdoors is for eliminating and the house is for relaxing. Your carpet will last longer with a senior dog.",
  "Senior dogs can learn new tricks and be valuable family and community members.",
  "They make excellent therapy dogs.",
  "Senior dogs often fit into your household with ease.",
  "They find the softest, warmest spot in the house and claim it for their own, but they will share with you, too.",
  "Senior dogs make excellent companions for everyone, especially senior people.",
  "Senior dogs are often the first to be killed in area shelters.",
  "Passed over for cute and cuddly puppies, they often do not have a chance and must go to make space for more puppies.",
  "Adopting a senior dog saves a life!",
];

const unneuteredBehaviors = [
  "Wanderers & roamers",
  "Noisy, Baying, howling, overbearing, barking & lunging at passersby",
  "Tend toward fighting, lunging & barking at and fighting with other male dogs",
  "Non-compliant; pushy and bossy attitude towards caretakers and strangers",
  "Uncooperative, Resistant; an unwillingness to obey commands",
  "Excessive sniffers have sexual frustration; mounting other dogs, people, toys",
  "Excessive grooming of genital area",
  "Offensive growling, snapping, biting",
  "A heightened sense of territoriality, marking with urine indoors",
  "Excessive marking on outdoor scent posts",
  "Intolerant; possessive/overprotective behavior; growling/snapping around food or toys.",
];

const states = [
  "Connecticut",
  "Maine",
  "Massachusetts",
  "New Hampshire",
  "Rhode Island",
  "Vermont",
];

export default function AdoptionPage() {
  return (
    <div className="bg-cream">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-cream pb-8 pt-14 sm:pb-10 sm:pt-16">
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl lg:text-6xl">
            Adopting a Yankee Chihuahua
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex gap-6">
            <Image
              src="/images/Joey-Transparent.png"
              alt="Joey the Chihuahua"
              width={150}
              height={200}
              className="hidden h-auto w-32 shrink-0 self-start rounded-lg sm:block"
            />
            <div className="space-y-5 text-base leading-relaxed text-warm-700 sm:text-lg">
              <p>
                YCRAA Chihuahuas have all found themselves homeless through no fault of their own.
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Some are released to us by their owners due to changes in family circumstances</li>
                <li>Some are from owners realizing that a Chihuahua is not a good match for them</li>
                <li>Some are strays from animal shelters and humane societies</li>
                <li>A few come from puppy mills and backyard breeders.</li>
              </ul>
              <p>
                Our adult Chihuahuas are spayed/neutered, tested and if necessary, treated, for
                heartworm and other parasites. All Chihuahuas are brought up to date on their
                inoculations prior to their placement in loving forever homes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Adoption Process */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold tracking-tight text-warm-900 sm:text-4xl">
            Adoption Process
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-coral-400" />
          <div className="mt-6 flex gap-6">
            <div className="space-y-5 text-base leading-relaxed text-warm-700 sm:text-lg">
              <p>
                The first step in adoption is to fill out an <Link href="/adoption/apply" className="font-semibold text-coral-600 underline">Adoption Application</Link>. This form
                gives basic information about the type of Chihuahua that will best fit into your
                family. Once the application is received and reviewed to ensure it is complete and
                meets our adoption criteria, a YCRAA volunteer will then contact you for a phone
                interview and arrange for a home visit. When there is a particular YCRAA dog you
                may be interested in then the Foster Mom will also contact you to talk about
                their foster. We do not have a shelter or facility where the Chihuahuas may be
                visited, we are a network of foster homes here in New England. Foster parents
                volunteer their time and put a lot into evaluating and rehabilitating YCRAA
                Chihuahuas until they are ready for placement.
              </p>
              <p>
                If it seems like a good match then a visit is arranged to meet the dog. Sometimes
                a home is approved to adopt a YCRAA Chihuahua but it is not the best match for
                the particular dog requested. The application then remains on file as a
                &ldquo;Pre-approved Home&rdquo; until the right dog comes along. We often have
                dogs that have just come in and are not listed yet, but the Adoption Coordinator
                will know about them. Many of our YCRAA Chihuahuas get matched to applicants that
                are waiting on our &ldquo;Approved Homes&rdquo; list. Becoming an Approved Home
                is the best way to be matched with a YCRAA dog.
              </p>
            </div>
            <ThemedDecorativeImage
              slot="adoption-aside"
              width={160}
              height={180}
              className="hidden h-auto w-32 shrink-0 self-start sm:block sm:w-40"
            />
          </div>
        </div>
      </section>

      {/* Cost of Adoption */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold tracking-tight text-warm-900 sm:text-4xl">
            Cost of an Adoption
          </h2>
          <p className="mt-1 text-sm font-medium text-warm-500">(donation plus applicable medical)</p>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-amber-400" />
          <div className="mt-6 space-y-5 text-base leading-relaxed text-warm-700">
            <p>
              Adoption cost is based on age (donation) plus any/all applicable medical
              expenses. YCRAA willingly accepts Chihuahuas and Chi mixes young and old. Any
              one dog may need expensive veterinary treatment to fulfill quality of life
              standards. Adoption donations do not cover any veterinary/medical costs. Be aware
              that there may be additional medical expenses added to the adoption donation as
              the final cost for adoption.
            </p>
            <p>
              When dogs are not suitable for adoption, then they live out their lives with a
              volunteer as part of our &ldquo;Special Needs&rdquo; program. We depend on
              private donations and the sale of items from our web site to supplement the
              adoption donations.
            </p>
          </div>

          <div className="mt-8 flex items-start gap-6">
            <h3 className="text-lg font-semibold text-warm-800">
              The requested adoption donation of a Chihuahua based on age is as follows:
            </h3>
            <Image
              src="/images/articles/chi-fawn3.gif"
              alt="Chihuahua"
              width={100}
              height={110}
              className="hidden h-auto w-20 shrink-0 rounded-lg sm:block"
            />
          </div>
          <div className="mt-5 overflow-hidden rounded-xl border border-warm-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-warm-200 bg-warm-50">
                  <th className="px-5 py-3 font-semibold text-warm-800">Age</th>
                  <th className="px-5 py-3 font-semibold text-warm-800">Donation</th>
                  <th className="hidden px-5 py-3 font-semibold text-warm-800 sm:table-cell">Medical Expenses</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((row) => (
                  <tr key={row.age} className="border-b border-warm-100 last:border-0">
                    <td className="px-5 py-3 font-medium text-warm-800">{row.age}</td>
                    <td className="px-5 py-3 text-warm-600">{row.donation}</td>
                    <td className="hidden px-5 py-3 text-warm-500 sm:table-cell">{row.medical}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-warm-700">
            <p>
              For puppies, YCRAA requires adopters to sign a spay/neuter contract and to
              submit a pre-paid receipt from a veterinarian for spay/neuter surgery (adopter
              pre-paid expense).
            </p>
            <p>
              For older dogs, e.g. Chihuahuas with a known health issue, then the donation
              amount requested may be reduced but still may include applicable medical expenses
              e.g. medications that go with the adoption.
            </p>
          </div>
        </div>
      </section>

      {/* Adoption Policies */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold tracking-tight text-warm-900 sm:text-4xl">
            Adoption Policies of YCRAA
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-coral-400" />
          <ul className="mt-6 space-y-3">
            {policies.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral-100 text-coral-600">
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                </span>
                <span className="text-warm-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why We Do Not Place with Intact Animals */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold tracking-tight text-warm-900 sm:text-3xl">
            Why we do not place dogs in homes with intact animals.
          </h2>
          <div className="mt-6 flex gap-6">
            <Image
              src="/images/articles/chi-fawn2.gif"
              alt="Chihuahua"
              width={120}
              height={110}
              className="hidden h-auto w-24 shrink-0 self-start rounded-lg sm:block"
            />
            <div className="space-y-5 text-base leading-relaxed text-warm-700">
              <p>
                We are often asked, &ldquo;Why will you not place a Yankee Chihuahua in a home
                with dogs that have not been neutered?&rdquo;
              </p>
              <p>
                The main reason we will not place a Yankee Chihuahua in a home where the current
                pets have not been neutered, is because we want to place our Chihuahuas in homes
                with responsible owners. Responsible owners take good care of their pets and do
                the best thing for them -- which includes Neutering.
              </p>
            </div>
          </div>
          <div className="mt-5 space-y-5 text-base leading-relaxed text-warm-700">
            <p className="font-semibold text-warm-800">
              There are several health benefits to neutering.
            </p>
            <p>
              One of the most important concerns the prostate gland, which under the influence
              of testosterone will gradually enlarge over the course of the dog&apos;s life. In
              age, it is likely to become uncomfortable, possibly being large enough to
              interfere with defecation. The prostate under the influence of testosterone is
              also predisposed to infection which is almost impossible to clear up without
              neutering. Neutering causes the prostate to shrink into insignificance thus
              preventing both prostatitis (an infection, usually caused by bacteria) as well as
              the uncomfortable benign hyperplasia (enlargement) that occurs with aging. It is
              often erroneously held that neutering prevents prostate cancer but this is not
              true.
            </p>
            <p>
              Other health benefits of neutering include the prevention of certain types of
              hernias and tumors of the testicles and anus. Excessive prepuce/penis discharge
              is also reduced by neutering.
            </p>
            <p>
              The behavior of other dogs in homes our fosters go into is a huge concern of
              YCRAA. Un-neutered dogs have natural biological needs. If the dog doesn&apos;t
              fulfill those needs, he will build up frustration, anxiety, and may even develop
              obsessive tendencies.
            </p>
            <p className="font-semibold text-warm-800">Un-neutered dogs often are:</p>
            <ul className="ml-6 list-disc space-y-1 text-warm-600">
              {unneuteredBehaviors.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="font-semibold text-warm-800">
              Not the type of circumstances we want our fosters to go into.
            </p>
            <p>
              The only behavior changes after neutering relate to behaviors influenced by male
              hormones. Playfulness, friendliness, and socialization with humans are not
              changed. Activity level and appetite do not change with neutering. A male dog
              should not gain weight or become less interested in activity post neuter.
            </p>
            <p>
              With Neutering, the interest in roaming is eliminated in 90 percent of neutered
              dogs. Aggressive behavior against other dogs is eliminated in 60 percent of
              neutered dogs. Urine marking is eliminated in 50 percent of neutered male dogs.
              Inappropriate mounting is eliminated in 70 percent of neutered dogs. In other
              words, they are much better behaved.
            </p>
            <p className="font-semibold text-warm-800">
              Well-behaved companions are what a Yankee Chihuahua deserves.
            </p>
          </div>
        </div>
      </section>

      {/* Senior Dogs */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold tracking-tight text-warm-900 sm:text-4xl">
            Senior Dogs &mdash; &ldquo;Golden Oldies&rdquo;
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-amber-400" />
          <div className="mt-6 flex gap-6">
            <div className="space-y-5 text-base leading-relaxed text-warm-700">
              <p>
                Adopting a senior dog can be an extremely rewarding experience. It is not for
                everyone, but those who have the time and the heart to take in a senior are
                usually richly rewarded. Many of these dogs lost loving homes when an owner died
                or became too ill to care for them. A few were discarded when they developed
                health problems, and no one cared enough to get treatment for them.
              </p>
              <p>
                Others are casualties of a divorce or a move to a place where dogs are not
                allowed. They are often frightened at first, and confused by the loss of a
                long-familiar home. It can take a little extra time and patience to convince them
                that they can be safe and loved again. Once they feel secure, though, they seem
                to know they&apos;ve been given a second chance at life. They don&apos;t ask for
                much: just a warm place to sleep, good meals, and plenty of love. They will not
                be with you as long as a younger dog - but you will have given them years of love
                in place of fear, confusion, and a premature death. And the love and gratitude
                they give in return is a very special thing.
              </p>
              <p>
                If you would consider adopting an older dog, please fill in an application. Often
                these wonderful dogs need a new home quickly. If we have your application and are
                on our waiting list they can be adopted right to you and the trauma of losing
                their home is greatly reduced.
              </p>
            </div>
            <Image
              src="/images/articles/chi-older.gif"
              alt="Senior Chihuahua"
              width={130}
              height={160}
              className="hidden h-auto w-24 shrink-0 self-start rounded-lg sm:block"
            />
          </div>

          <h3 className="mt-8 text-lg font-semibold text-warm-800">
            Reasons to Adopt a Senior Dog
          </h3>
          <ul className="mt-5 space-y-2.5">
            {seniorReasons.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <Heart className="h-3 w-3" strokeWidth={2} fill="currentColor" />
                </span>
                <span className="text-warm-700">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* State Coordinators */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold tracking-tight text-warm-900 sm:text-3xl">
            Contact Your State Coordinator
          </h2>
          <p className="mt-4 text-warm-700">
            For more information having anything to do with Yankee Chihuahua Rescue And
            Adoption, Inc., please find your state below. You may write concerning adoptions,
            surrendering, volunteering, specific dogs.
          </p>
          <p className="mt-2 text-warm-600 italic">
            ...all the information you need is just a click away.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {states.map((state) => (
              <a
                key={state}
                href="mailto:info@yankeechihuahuarescue.org"
                className="rounded-full border border-amber-200 bg-white px-5 py-2 text-sm font-medium text-amber-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                {state}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Past Adoptions Info */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold tracking-tight text-warm-900 sm:text-3xl">
            Information about Past Yankee Chihuahua Adoptions
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-warm-700">
            <p>
              Through the past years some of the information about past YCRAA adoptions has
              been lost. If you have any information about any of Yankee Chihuahua Rescue past
              adoptions or current pictures you&apos;d like displayed, please drop an email to:{" "}
              <a
                href="mailto:YankeeChiRescue@gmail.com?subject=New information about YCR past adoption"
                className="font-semibold text-coral-600 underline"
              >
                YankeeChiRescue@gmail.com
              </a>
            </p>
            <p>Thanks so much!</p>
          </div>
          <p className="mt-5 text-sm text-warm-500">
            If you experience problems with the online form please request an Adoption
            Application by email to:{" "}
            <a href="mailto:YankeeChiRescue@gmail.com" className="text-amber-600 underline">
              YankeeChiRescue@gmail.com
            </a>
          </p>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-gradient-to-br from-warm-800 to-warm-900 py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Image
            src="/images/articles/chi-wh-lt.gif"
            alt="Chihuahua"
            width={120}
            height={140}
            className="mx-auto mb-5 rounded-lg"
          />
          <blockquote className="text-xl italic leading-relaxed text-amber-100 sm:text-2xl">
            &ldquo;Blessed is the person who has earned the love of an old dog.&rdquo;
          </blockquote>
          <p className="mt-4 text-warm-300">~Sydney Jeanne Seward</p>
        </div>
      </section>
    </div>
  );
}
