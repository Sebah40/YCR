import Link from "next/link";

export const metadata = { title: "TeaCup Chihuahuas - Fact or Fiction?" };

export default function TeacupChihuahuasPage() {
  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-b from-amber-100 to-cream px-6 pb-8 pt-14 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">
            TeaCup Chihuahuas
          </h1>
          <p className="mt-4 text-xl text-warm-600">Fact or Myth?</p>
          <p className="mt-2 text-sm text-warm-500">
            Sponsored by The Chihuahua Club of America
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-24">
        <article className="py-10">
          <div className="space-y-6 text-base leading-relaxed text-warm-700">
            <p>
              The official A.K.C. Breed Standard describes the Chihuahua as a small dog that
              comes in two varieties or coat types. The difference in coat type (the Long Coat or
              the Smooth Coat) is the only official description used to identify a difference
              within this breed. Our Standard does not categorize the Chihuahua by size.
            </p>

            <p>
              For the purpose of showing and record keeping, the American Kennel Club includes
              the Chihuahua (along with 16 other breeds) in the Toy Group. Therefore,
              irrespective of their weight or physical stature, ALL Chihuahuas registered with
              A.K.C. are considered to be a toy breed of dog.
            </p>

            <p>
              As with all living things, there will be a size variance between individual dogs
              within this breed. Within the human family, brothers and sisters will differ in
              height and in weight, as well as other physical attributes. They are described as
              humans, male or female, and there is seldom if ever a need to break the description
              down further. The same holds true in regard to the Chihuahua; they are
              Chihuahuas-Long Coat/Smooth Coat, Male/Female.
            </p>

            <p>
              Unfortunately, the additional adjectives used to describe the size difference and
              physical appearances are many; and have been misused for so long they now seem
              legitimate. Tea-cup, Pocket Size, Tiny Toy, Miniature or Standard - are just a few
              of the many tags and labels that have been attached to this breed over the years.
              The Chihuahua Club of America is concerned that these terms may be used to entice
              prospective buyers into thinking that puppies described in this way are of greater
              monetary value. They are not; and the use of these terms is incorrect and
              misleading.
            </p>

            <p>
              Occasionally, within a litter, there may be a puppy that is unusually small. That
              puppy is a small Chihuahua and any other breakdown in description is not correct.
              To attach any of these additional labels to a particular pup is to misrepresent
              that animal as something that is rare or exceptional and causes a great deal of
              confusion among those fanciers who are looking for a Chihuahua.
            </p>

            <p>
              The Chihuahua Club of America does not endorse or condone the use of any of these
              terms and would caution the prospective puppy buyer not to be misled by them.
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
