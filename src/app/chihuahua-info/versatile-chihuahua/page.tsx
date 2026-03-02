import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "The Versatile Chihuahua" };

export default function VersatileChihuahuaPage() {
  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-b from-amber-100 to-cream px-6 pb-16 pt-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">
            The Versatile Chihuahua
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-24">
        <article className="py-16">
          <div className="space-y-6 text-base leading-relaxed text-warm-700">
            <p>
              Cheeky, extrovert, and full of life, the Chihuahua may be the smallest breed in
              the world, but it has the biggest personality! Many people make the mistake of
              thinking that toy dogs cannot be trained, but how false this idea is. Agility,
              Competitive Obedience, Fly Ball, Therapy Dog, Service Dog, Show Dog.
            </p>

            <h2 className="!mt-12 text-2xl font-bold text-warm-900">Therapy Chihuahuas</h2>
            <div className="h-1 w-12 rounded-full bg-amber-400" />

            <p>
              A therapy dog is a dog trained and certified to provide affection and comfort to
              people in hospitals, retirement homes, nursing homes, mental institutions, schools,
              and stressful situations such as disaster areas. Institutions may invite, limit, or
              prohibit access by therapy dogs. If allowed, many institutions have rigorous
              requirements for therapy dogs.
            </p>

            <div className="float-right ml-6 mb-4">
              <Image
                src="/images/articles/chi-therapy-300.jpg"
                alt="Therapy Chihuahua"
                width={300}
                height={227}
                className="rounded-xl shadow-md"
              />
            </div>

            <p>
              The most important characteristic of a therapy dog is its temperament. A good
              therapy dog must be friendly, patient, confident, at ease in all situations, and
              gentle. They must enjoy human contact and be content to be petted and handled,
              sometimes clumsily. A therapy dog&apos;s primary job is to allow unfamiliar people
              to make physical contact with it and to enjoy that contact. Children in particular
              enjoy hugging animals; adults usually enjoy simply petting the dog. Many dogs
              contribute to the visiting experience by performing small tricks for their
              audiences or by playing carefully structured games.
            </p>

            <p>
              Many organizations provide testing and accreditation for therapy dogs. Most require
              that a dog pass the equivalent of the American Kennel Club&apos;s Canine Good
              Citizen test, and then add further requirements specific to the environments in
              which the dogs will be working. Typical tests might ensure that a dog can handle
              sudden loud or strange noises, can walk on assorted unfamiliar surfaces
              comfortably, are not frightened by people with canes, wheelchairs, or unusual
              styles of walking or moving, get along well with children and with the elderly, and
              so on.
            </p>

            <p>
              Pet Therapy is a more inclusive terminology regarding the benefits from having a
              &ldquo;therapy dog&rdquo;, or other &ldquo;therapy animals&rdquo; such as cats and
              rabbits.
            </p>

            <h2 className="!mt-12 text-2xl font-bold text-warm-900">In the News</h2>
            <div className="h-1 w-12 rounded-full bg-coral-400" />

            <h3 className="!mt-6 text-lg font-semibold text-warm-800">
              Three little dogs help HUB users in Dover
            </h3>
            <p className="text-sm text-warm-500">
              By Hiroko Sato, Democrat Staff Writer, Dover NH
            </p>

            <p>
              DOVER &mdash; For hundreds of local residents who use the HUB Family Resource
              Center&apos;s transportation service, three little dogs that accompany the driver
              are more than just cuddly pets. They are therapeutic dogs, bringing smiles to the
              faces of 185 families who ride the van to medical and social service appointments,
              according to Monica Zulauf. Zulauf, director of family services for the resource
              center on Atkinson Street, knows many of those who ride the van have a tough life.
              Because of that, the atmosphere in the 15-passenger vehicle can be not so cheerful.
            </p>

            <p>
              That notion began to change, however, about two years ago, shortly after Martha
              Bonney took her position as a driver and coordinator of the transportation service.
              Passengers began to show their affection toward Bonney&apos;s two little
              &ldquo;Chiwawas&rdquo; and one Maltese, which sit on the passenger seats, and the
              conversation started to pick up. Zulauf saw a woman to whom she provides
              home-visiting service smiling for the first time when she was talking about the
              dogs. Dogs seemed to have a relaxing effect on adults and can calm down children
              who are on their way to medical appointments, Zulauf said.
            </p>

            <p>
              She said she didn&apos;t know what to make of it when she first saw Bonney driving
              with Thomas, Trance and Harmond. But they turned out to be &ldquo;happy
              accidents,&rdquo; which now serve as &ldquo;charming additions&rdquo; to the family
              resource center&apos;s program, she said. HUB Family Resource Center provides
              family education and transportation services to about 800 area families. It
              operates the van service using money provided under the state Health Care Community
              Grant.
            </p>

            <div className="!mt-12 clear-both" />

            <h2 className="text-2xl font-bold text-warm-900">Fly Ball</h2>
            <div className="h-1 w-12 rounded-full bg-amber-400" />
            <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row">
              <Image
                src="/images/articles/j-flyball.jpg"
                alt="Chihuahua Fly Ball"
                width={249}
                height={285}
                className="shrink-0 rounded-xl shadow-md"
              />
              <div>
                <p>
                  Susan Fletcher&apos;s Red Chihuahua Speedy jumps hurdles.
                </p>
                <p className="mt-2 text-sm italic text-warm-500">Photo by Leah Nash</p>
              </div>
            </div>

            <h2 className="!mt-12 text-2xl font-bold text-warm-900">Agility</h2>
            <div className="h-1 w-12 rounded-full bg-amber-400" />
            <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row-reverse">
              <Image
                src="/images/articles/j-max.jpg"
                alt="Max, AKC Top Dog Agility Chihuahua"
                width={300}
                height={200}
                className="shrink-0 rounded-xl shadow-md"
              />
              <div>
                <p>
                  Max; AKC Top Dog Agility Chihuahua for 2001 and 2002. Max is 6 years young and
                  stands 9.75 inches tall.
                </p>
              </div>
            </div>

            <h2 className="!mt-12 text-2xl font-bold text-warm-900">Wagon Pulling...?</h2>
            <div className="h-1 w-12 rounded-full bg-amber-400" />
            <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row">
              <Image
                src="/images/articles/j-wagon.jpg"
                alt="Chihuahua pulling wagon"
                width={300}
                height={290}
                className="shrink-0 rounded-xl shadow-md"
              />
              <div>
                <p>Very handy on market day.</p>
                <p className="mt-2 text-sm italic text-warm-500">Photo by AP</p>
              </div>
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
