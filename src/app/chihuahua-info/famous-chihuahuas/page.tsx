import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Famous Chihuahuas" };

const famousChihuahuas = [
  { name: "Coco", desc: "Featured in the television series Dog Whisperer and owned by Cesar Millan.", img: "/images/articles/f-coco.png" },
  { name: "Dinky", desc: "The first Taco Bell Chihuahua." },
  { name: "Gidget", desc: "The second Taco Bell Chihuahua and the actress who played Bruiser's mom in Legally Blonde 2.", img: "/images/articles/f-gidget.png" },
  { name: "Moonie", desc: "The actor who played Bruiser, Elle Woods' companion in the Legally Blonde movies.", img: "/images/articles/f-moonie.png" },
  { name: "Pepito", desc: "Xavier Cugat's Chihuahua in the children's book Pepito the Little Dancing Dog: The Story of Xavier Cugat's Chihuahua." },
  { name: "Tinkerbell and Bambi", desc: 'Companions of Paris Hilton. Tinkerbell is the "author" of "Tinkerbell Hilton Diaries".' },
  { name: "Wheely Willy", desc: "A paraplegic Chihuahua from Long Beach, California who has become a celebrity as the subject of two bestselling children's books.", img: "/images/articles/f-willy.png" },
  { name: "Lou", desc: "A Chihuahua that appears on every episode of The Soup on the E! network." },
  { name: "Chloe", desc: "Played by Angel, co-star of the film Beverly Hills Chihuahua." },
  { name: "Enrique", desc: "Hector Con Carne's pet Chihuahua from Evil Con Carne." },
  { name: "Geraldo", desc: "Max Shreck's Chihuahua in Batman Returns." },
  { name: "Madame Shirley the Medium", desc: "An old fortune-teller Chihuahua featured in the TV Show Cartoon, Courage the Cowardly Dog." },
  { name: "Mammoth Mutt", desc: "From the cartoon series Krypto the Superdog." },
  { name: "Mojo", desc: "Samuel Witwicky's Chihuahua from Transformers.", img: "/images/articles/f-mojo.png" },
  { name: "Papi", desc: "Played by Rusco, the other co-star of Beverly Hills Chihuahua.", img: "/images/articles/f-papi.png" },
  { name: "Chip", desc: "Sonic's aide in Sonic Unleashed.", img: "/images/articles/f-chip.png" },
  { name: "Ren H\u00f6ek", desc: "Of Ren and Stimpy fame." },
  { name: "The Spooky Chihuahua", desc: "From Invader Zim." },
  { name: "Lilly", desc: "Megan Hauserman's dog from I Love Money, Rock of Love Charm School, and Beauty and the Geek.", img: "/images/articles/f-lilly-h.png" },
];

export default function FamousChihuahuasPage() {
  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-b from-amber-100 to-cream px-6 pb-8 pt-14 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">
            Famous Chihuahuas
          </h1>
          <p className="mt-4 text-warm-500">For Fun</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-24">
        <div className="py-10">
          <ul className="space-y-6">
            {famousChihuahuas.map((chi, idx) => (
              <li key={idx} className="flex items-start gap-4 rounded-xl border border-warm-100 bg-white p-5 shadow-sm">
                {chi.img && (
                  <Image
                    src={chi.img}
                    alt={chi.name}
                    width={100}
                    height={100}
                    className="shrink-0 rounded-lg object-contain"
                  />
                )}
                <div>
                  <span className="font-semibold text-warm-900">{chi.name}</span>
                  <span className="ml-1 text-warm-600"> &ndash; {chi.desc}</span>
                </div>
              </li>
            ))}
          </ul>
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
