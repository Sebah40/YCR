import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "AKC Chihuahua Breed Standard" };

const sections = [
  {
    title: "General Appearance",
    text: "A graceful, alert, swift-moving compact little dog with saucy expression, and with terrier-like qualities of temperament.",
  },
  {
    title: "Size, Proportion, Substance",
    items: [
      "Weight \u2013 A well balanced little dog not to exceed 6 pounds.",
      "Proportion \u2013 The body is off-square; hence, slightly longer when measured from point of shoulder to point of buttocks, than height at the withers. Somewhat shorter bodies are preferred in males.",
      "Disqualification \u2013 Any dog over 6 pounds in weight.",
    ],
  },
  {
    title: "Head",
    items: [
      'A well rounded "apple dome" skull, with or without molera.',
      "Expression \u2013 Saucy.",
      "Eyes \u2013 Full, round, but not protruding, balanced, set well apart-luminous dark or luminous ruby. Light eyes in blond or white-colored dogs permissible. Blue eyes or a difference in the color of the iris in the two eyes, or two different colors within one iris should be considered a serious fault.",
      "Ears \u2013 Large, erect type ears, held more upright when alert, but flaring to the sides at a 45 degree angle when in repose, giving breadth between the ears.",
      "Stop \u2013 Well defined. When viewed in profile, it forms a near 90 degree angle where muzzle joins skull.",
      "Muzzle \u2013 Moderately short, slightly pointed. Cheeks and jaws lean.",
      "Nose \u2013 Self-colored in blond types, or black. In moles, blues, and chocolates, they are self-colored. In blond types, pink noses permissible.",
      "Bite \u2013 Level or scissors. Overshot or undershot, or any distortion of the bite or jaw, should be penalized as a serious fault. A missing tooth or two is permissible.",
      "Disqualifications \u2013 Broken down or cropped ears.",
    ],
  },
  {
    title: "Neck, Topline, Body",
    items: [
      "Neck \u2013 Slightly arched, gracefully sloping into lean shoulders.",
      'Topline \u2013 Level. Body \u2013 Ribs rounded and well sprung (but not too much "barrel-shaped").',
      "Tail \u2013 Moderately long, carried sickle either up or out, or in a loop over the back with tip just touching the back. (Never tucked between legs.)",
      "Disqualifications \u2013 Docked tail, bobtail.",
    ],
  },
  {
    title: "Forequarters",
    items: [
      "Shoulders \u2013 Lean, sloping into a slightly broadening support above straight forelegs that set well under, giving free movement at the elbows. Shoulders should be well up, giving balance and soundness, sloping into a level back (never down or low). This gives a well developed chest and strength of forequarters.",
      "Feet \u2013 A small, dainty foot with toes well split up but not spread, pads cushioned. (Neither the hare nor the cat foot.) Dewclaws may be removed.",
      "Pasterns \u2013 Strong.",
    ],
  },
  {
    title: "Hindquarters",
    text: "Muscular, with hocks well apart, neither out nor in, well let down, firm and sturdy. Angulation \u2013 Should equal that of forequarters. The feet are as in front. Dewclaws may be removed.",
  },
  {
    title: "Coat",
    items: [
      "In the Smooth Coats, the coat should be of soft texture, close and glossy. (Heavier coats with undercoats permissible.) Coat placed well over body with ruff on neck preferred, and more scanty on head and ears. Hair on tail preferred furry.",
      "In Long Coats, the coat should be of a soft texture, either flat or slightly wavy, with undercoat preferred.",
      "Ears \u2013 Fringed.",
      "Tail \u2013 Full and long (as a plume). Feathering on feet and legs, pants on hind legs and large ruff on the neck desired and preferred. (The Chihuahua should be groomed only to create a neat appearance.)",
      "Disqualification \u2013 In Long Coats, too thin coat that resembles bareness.",
    ],
  },
  {
    title: "Color",
    text: "Any color - Solid, marked or splashed.",
  },
  {
    title: "Gait",
    text: "The Chihuahua should move swiftly with a firm, sturdy action, with good reach in front equal to the drive from the rear. From the rear, the hocks remain parallel to each other, and the foot fall of the rear legs follows directly behind that of the forelegs. The legs, both front and rear, will tend to converge slightly toward a central line of gravity as speed increases. The side view shows good, strong drive in the rear and plenty of reach in the front, with head carried high. The topline should remain firm and the backline level as the dog moves.",
  },
  {
    title: "Temperament",
    text: "Alert, projecting the \u2018terrier-like\u2019 attitudes of self importance, confidence, self-reliance.",
  },
];

const disqualifications = [
  "Broken down or cropped ears.",
  "Docked tail, bobtail.",
  "In Long Coats, too thin coat that resembles bareness.",
];

export default function BreedStandardPage() {
  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-b from-amber-100 to-cream px-6 pb-8 pt-14 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">
            AKC - Chihuahua Breed Standard
          </h1>
          <p className="mt-4 text-warm-500">Toy Group</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-24">
        <div className="mt-12 flex justify-center gap-8">
          <div className="text-center">
            <Image
              src="/images/articles/chi-standard-sc.gif"
              alt="Chihuahua Smooth Coat"
              width={187}
              height={199}
              className="rounded-xl"
            />
            <p className="mt-2 text-sm font-medium text-warm-600">Smooth Coat</p>
          </div>
          <div className="text-center">
            <Image
              src="/images/articles/chi-standard-lc.gif"
              alt="Chihuahua Long Coat"
              width={190}
              height={190}
              className="rounded-xl"
            />
            <p className="mt-2 text-sm font-medium text-warm-600">Long Coat</p>
          </div>
        </div>

        <div className="space-y-12 py-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-bold text-warm-900">{section.title}</h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-amber-400" />
              {"text" in section && section.text && (
                <p className="mt-4 leading-relaxed text-warm-700">{section.text}</p>
              )}
              {"items" in section && section.items && (
                <ul className="mt-4 space-y-3">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                      <span className="leading-relaxed text-warm-700">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div>
            <h2 className="text-xl font-bold text-warm-900">Disqualifications</h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-coral-400" />
            <ul className="mt-4 space-y-2">
              {disqualifications.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-400" />
                  <span className="text-warm-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm text-warm-500">
            Approved August 12, 2008 &middot; Effective October 1, 2008
          </p>
        </div>

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
