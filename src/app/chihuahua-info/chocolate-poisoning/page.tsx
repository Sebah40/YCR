import Link from "next/link";

export const metadata = { title: "Chocolate Poisoning" };

const toxicityLevels = [
  { type: "Milk chocolate", ratio: "1 oz. to 1 lb. of dog's weight" },
  { type: "Semisweet chocolate", ratio: "1 oz. to 3 lbs. of dog's weight" },
  { type: "Baker's and dark chocolate", ratio: "1 oz. to 9 lbs. of dog's weight" },
  {
    type: "Cocoa powder",
    ratio:
      "Contains the highest level of theobromine and can vary based on manufacturer and quality of the beans. Special precaution should be taken with the storage of this product, and it should be approached with the same concern as would be cleaning chemicals/children.",
  },
];

export default function ChocolatePoisoningPage() {
  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-b from-amber-100 to-cream px-6 pb-8 pt-14 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">
            Chocolate Poisoning
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-24">
        <article className="py-10">
          <div className="space-y-6 text-base leading-relaxed text-warm-700">
            <p>
              The National Animal Control Center reports chocolate is one of its most encountered
              toxins when it come to dogs. What makes chocolate a poison? The answer is in a
              chemical compound called theobromine in the chocolate.
            </p>

            <p>
              This chemical compound acts as a heart stimulant, which leads to irregular and
              racing heartbeats. If this issue is aggravated enough, your dog could suffer heart
              failure and die. Weight and metabolism rates allow humans to break this compound
              down quicker, thus making &ldquo;death by chocolate&rdquo; much more unlikely. The
              following is a breakdown of which kind and how much of various chocolates are toxic
              to dogs. Because white chocolate has little to no cocoa (where most theobromine
              comes from), it has little if any toxicity.
            </p>

            <h2 className="!mt-10 text-xl font-bold text-warm-900">Toxicity Levels</h2>
            <div className="h-1 w-12 rounded-full bg-coral-400" />

            <div className="mt-6 space-y-4">
              {toxicityLevels.map((level) => (
                <div
                  key={level.type}
                  className="rounded-xl border border-coral-100 bg-white p-5"
                >
                  <h3 className="font-semibold text-coral-700">{level.type}</h3>
                  <p className="mt-1 text-sm text-warm-600">{level.ratio}</p>
                </div>
              ))}
            </div>

            <div className="!mt-10 rounded-2xl border-2 border-coral-300 bg-coral-50 p-8">
              <p className="font-semibold text-coral-800">
                Although this is a simple chart to help you understand the small amounts of
                chocolate that a Chihuahua could ingest before dying, it is important to
                understand that NO AMOUNT of chocolate is good for your dog. These levels are
                given under the assumption that the dog ingesting the chocolate is in perfect
                health. Health problems, especially cardiovascular disease, can reduce these
                ratios considerably.
              </p>
            </div>

            <p>
              If you think that you can hide chocolate from your dog, or trust your dog not to
              ingest it, you would be wise to rethink this notion. If you find chewed-up
              chocolate wrappers, missing chocolate, or your dog exhibits vomiting, diarrhea,
              excessive urination and thirst, rapid breathing, or hyperactivity, these are all
              signs of an increased heart rate and potential poisoning. Later symptoms can be
              depression, seizures, coma, and death.{" "}
              <strong>
                If chocolate poisoning is suspected, you should visit your vet immediately!
              </strong>
            </p>

            <p>
              Symptoms begin fairly soon after ingestion, and may last for up to 24 hours as the
              chemical becomes metabolized. The sooner you see your vet, the better the odds are
              for your dog&apos;s survival.
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
