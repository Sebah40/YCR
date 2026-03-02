import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Chihuahua Bill of Rights" };

const rights = [
  "I have the right to give and receive unconditional love.",
  "I have the right to be a full family member.",
  "I need to be in the house with you where I can learn how to behave. My sense of security and well being depends on being close to you.",
  "I have the right to have an adult human to be my principal caretaker and teacher.",
  "I have the right to social stimulation. I need to go places of interest and learn new things and meet new people, so that I don\u2019t become fearful or aggressive - or depressed.",
  "I have the right to adequate food and good nutrition.",
  "I have the right to appropriate medical care.",
  "I have the right to regular exercise. I thrive on play and activity and it helps Me to be healthy and young.",
  "I have the right to be trained so that I do not become the prisoner of my misbehavior. Without training I can become confused, fearful and aggressive and become a danger to ourselves and to you! I am not happy unless I know what the rules are.",
  "I have the right to make mistakes. No matter how well we are trained or how old I get, sometimes I just do things wrong...it is nature. It won\u2019t happen often if I am properly trained.",
  "I have the right to be myself. My heritage influences who I am-my training helps shape us but some characteristics will remain. Please understand this when choosing me.",
  "I have the right to move with my family. I am the only family member that can be rejected by current laws. I need you to fight for me and to change those laws so that the family can stay together.",
  "I have the right to live with dignity and to die with dignity. Please do not keep me alive for selfish reasons. Go with me on difficult journeys. Everything is easier for me if you are there.",
];

// Images placed at specific points in the rights list, matching the original layout
const imagePositions: Record<number, { src: string; alt: string }> = {
  1: { src: "/images/articles/r-chi5.png", alt: "Chihuahua" },
  6: { src: "/images/articles/r-chi1.png", alt: "Chihuahua" },
  10: { src: "/images/articles/r-chi2.png", alt: "Chihuahua" },
};

export default function BillOfRightsPage() {
  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-b from-amber-100 to-cream px-6 pb-16 pt-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">
            Chihuahua Bill of Rights
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-24">
        <div className="py-16">
          <ul className="space-y-6">
            {rights.map((right, idx) => (
              <li key={idx} className="flex items-start gap-4">
                {imagePositions[idx] && (
                  <Image
                    src={imagePositions[idx].src}
                    alt={imagePositions[idx].alt}
                    width={90}
                    height={90}
                    className="hidden shrink-0 rounded-lg sm:block"
                  />
                )}
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                  {idx + 1}
                </span>
                <p className="text-lg leading-relaxed text-warm-700">{right}</p>
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-col items-center gap-6 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-warm-50 p-10 shadow-sm">
            <p className="text-2xl font-bold italic text-warm-800">
              Remember - I love you!
            </p>
            <Image
              src="/images/articles/r-chi4.png"
              alt="Chihuahua"
              width={93}
              height={113}
              className="rounded-lg"
            />
          </div>
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
