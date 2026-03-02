import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Volunteering by Cheryl" };

export default function VolunteeringByCherylPage() {
  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-b from-amber-100 to-cream px-6 pb-8 pt-14 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">
            Volunteering
          </h1>
          <p className="mt-4 text-warm-500">by Cheryl &ldquo;2009&rdquo;</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-24">
        <article className="py-10">
          <div className="space-y-6 text-base leading-relaxed text-warm-700">
            <p>
              In Nov of 2007, I had received an e-mail from the Chihuahua meet ups group of NH
              that caught my attention. It said something like &ldquo;YCRAA is looking for a few
              good Volunteers!&rdquo; The e-mail immediately grabbed my attention and I applied
              to volunteer. I had a home visit scheduled and was approved right away, I jumped in
              and got my first foster immediately. Then early 2008 it was uncertain if YCRAA
              would remain to rescue Chihuahua&apos;s but in late spring 2008 we re-established
              and began rescuing again&hellip; Soon after the re start up, I was nominated as a
              Board of Director&apos;s and gladly accepted the position..
            </p>

            <Image
              src="/images/articles/v-birtha.png"
              alt="Chihuahua"
              width={105}
              height={107}
              className="float-left mr-4 mb-2 rounded-lg"
            />

            <p>
              I am currently doing many home visits, both for volunteers and adoption applicants,
              meeting lots of wonderful people who enjoy the same interests, taking in dogs from
              shelters or owner surrenders, vet visits, fostering and placements.. Many people
              ask me &ldquo;Isn&apos;t it hard to foster or to spend time with the dogs just to
              see them go?&rdquo; and ironically, it&apos;s almost more rewarding. To get that
              first email from the new adopters knowing that the chi has made it through the
              night in their new homes and have their own &ldquo;spot&rdquo; is great, and many
              updates following how special the dog is to them, not to mention you get to
              &ldquo;give another chi that second chance&rdquo;.
            </p>

            <Image
              src="/images/articles/v-molly.png"
              alt="Chihuahua"
              width={107}
              height={135}
              className="float-right ml-4 mb-2 rounded-lg"
            />

            <p>
              Yankee Chihuahua Rescue is a wonderful and loving group of people who all have
              great compassion for Chihuahuas. There are so many Chi&apos;s that would have been
              euthanized if it weren&apos;t for these volunteers who have provided their time,
              homes, blood sweat and tears to help these Chi-pups out. I have been lucky to meet
              some of the terrific dogs that would not be with us today if it were not for YCRAA.
              I am proud to be a member of this great organization and hope that we continue to
              attract more astonishing volunteers in the future. Volunteering for this rescue was
              the best decision I ever made.
            </p>
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
