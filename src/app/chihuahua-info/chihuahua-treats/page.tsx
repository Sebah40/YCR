import Link from "next/link";

export const metadata = { title: "Chihuahua Treats" };

const badTreats = [
  {
    name: "Grapes and Raisins",
    desc: "Grapes and raisins can cause kidney failure in dogs. As little as a single serving of raisins can kill a dog.",
  },
  {
    name: "Onions",
    desc: "Onions destroy red blood cells and can cause anemia.",
  },
  {
    name: "Chocolate",
    desc: "Chocolate can cause seizures, coma and death. Baker's chocolate or dark chocolate are the most dangerous. A dog can consume milk chocolate and appear to be fine because it is not as concentrated, but it is still dangerous.",
  },
  {
    name: "Coffee, coffee grounds, tea and tea bags",
    desc: "Drinks/foods containing caffeine cause many of the same symptoms chocolate causes.",
  },
  {
    name: "Macadamia nuts and walnuts",
    desc: "Macadamia nuts can cause weakness, muscle tremor and paralysis. Limit all other nuts, as they are not good for dogs in general. Their high phosphorous content is said to be a possible contributor to bladder stones. Peanut butter is not made from a nut. Peanuts are legumes and fine for dogs. Always use salt- and sugar-free peanut butter (sugar encourages cancer growth). Use only ORGANIC peanut butter as regular peanut butter has potentially harmful chemicals and may contain pesticides.",
  },
  {
    name: "Animal fat and fried foods",
    desc: "Excessive fat can cause pancreatitis, so it's best to avoid fatty treats. Limit fat to what's provided by your dog's regular food.",
  },
  {
    name: "Bones",
    desc: "Cooked bones are brittle and can splinter and damage a dog's internal organs. Raw bones offer a good natural way to clean teeth, but should always be given under supervision, since small chunks can cause problems, if swallowed whole. Try frozen oxtails or frozen knucklebones, and take the bone away before the dog can swallow a final small piece whole.",
  },
  {
    name: "Tomatoes",
    desc: "Tomatoes can cause tremors and heart arrhythmia. Tomato plants are the most toxic, but tomatoes themselves are also unsafe.",
  },
  {
    name: "Avocados",
    desc: "The fruit, pit and plant are all toxic. They can cause difficulty breathing and fluid accumulation in the chest, abdomen and heart.",
  },
  {
    name: "Nutmeg",
    desc: "Nutmeg can cause tremors, seizures and death.",
  },
  {
    name: "Fruit Seeds",
    desc: "The flesh of Apples, Cherries, Peaches and similar fruit is fine for your dog. HOWEVER, the seeds of these fruits contain cyanide, which is poisonous to dogs as well as humans. Unlike humans, dogs do not know to stop eating at the pit and can easily ingest them. It can also become lodged in the intestines and kill the dog in 24 hours with no warning.",
  },
  {
    name: "Raw eggs",
    desc: "Raw eggs can cause salmonella poisoning in dogs. Dogs have a shorter digestive tract than humans and are less likely to suffer from food poisoning, but it is still possible. BEST to use ORGANIC EGGS if you do raw. Scrambled lightly is best!",
  },
  {
    name: "Salt",
    desc: "Excessive salt intake can cause kidney problems. Avoid salty treats.",
  },
  {
    name: "Mushrooms and toadstools",
    desc: 'Can be deadly. Never let your pets chew on mushrooms found in your yard. Allow only safe, "food" mushrooms such as shiitake, and maitake.',
  },
];

const goodTreats = [
  "Peanut Butter (natural)",
  "Baby carrots",
  "Broccoli",
  "Chicken",
  "Scrambled eggs",
  "Mashed Potatoes (very small portions)",
  "Cut up asparagus",
  "Green Beans",
  "Peas (mine love them frozen!)",
  "Cheese (it's fine)",
  "Apple cut up (watch out- the core and the seeds are toxic!)",
  "Cheerios (they're great for training)",
  "Banana",
  "Cantaloupe",
];

export default function ChihuahuaTreatsPage() {
  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-b from-amber-100 to-cream px-6 pb-16 pt-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">
            Chihuahua Treats
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-24">
        {/* Bad Treats */}
        <section className="py-16">
          <h2 className="text-2xl font-bold text-warm-900 sm:text-3xl">
            Treats to AVOID giving your Chihuahua
          </h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-coral-400" />
          <p className="mt-6 text-warm-700">
            While some of these foods, if given in very small amounts, cause no harm to many
            dogs, remember that the Chihuahua is a very small dog and should not get ANY of
            these.
          </p>
          <div className="mt-8 space-y-6">
            {badTreats.map((t) => (
              <div key={t.name} className="rounded-xl border border-coral-100 bg-white p-6">
                <h3 className="font-semibold text-coral-700">{t.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-warm-600">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Good Treats */}
        <section className="py-16">
          <h2 className="text-2xl font-bold text-warm-900 sm:text-3xl">
            Treats that are fine for your Chihuahua
          </h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-amber-400" />
          <p className="mt-6 text-warm-700">
            Remember that even healthy treats should be given in relatively small amounts. A
            good rule of thumb is that 90% of your dog&apos;s diet should come from its regular
            well-balanced food.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {goodTreats.map((t) => (
              <div key={t} className="flex items-center gap-3 rounded-xl border border-amber-100 bg-white p-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <svg
                    className="h-4 w-4"
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
                <span className="text-sm font-medium text-warm-700">{t}</span>
              </div>
            ))}
          </div>
        </section>

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
