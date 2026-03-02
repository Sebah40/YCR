import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Happy Endings" };

const adoptedDogs: { name: string; file: string }[] = [
  { name: "Zoe", file: "zoe.jpg" },
  { name: "Versace", file: "versace.jpg" },
  { name: "Twink", file: "twink.jpg" },
  { name: "Tudy", file: "tudy.jpg" },
  { name: "Trixi", file: "trixi.jpg" },
  { name: "Tootsie", file: "tootsie.jpg" },
  { name: "Tony", file: "tony.jpg" },
  { name: "Tiz", file: "tiz.jpg" },
  { name: "Tiny", file: "tiny.jpg" },
  { name: "Tiger", file: "tiger.jpg" },
  { name: "Tico", file: "tico.jpg" },
  { name: "Tia", file: "tia.jpg" },
  { name: "Tequila", file: "tequila.jpg" },
  { name: "Taz", file: "taz.jpg" },
  { name: "Taco", file: "taco.jpg" },
  { name: "Sweetie", file: "sweetie.jpg" },
  { name: "Sunshine", file: "sunshine.jpg" },
  { name: "Sunny", file: "sunny.jpg" },
  { name: "Stryder", file: "stryder.jpg" },
  { name: "Stink", file: "stink.jpg" },
  { name: "Starr", file: "starr.jpg" },
  { name: "Sprite", file: "sprite.jpg" },
  { name: "Spikey", file: "spikey.jpg" },
  { name: "Spike", file: "spike.jpg" },
  { name: "Sparky", file: "sparky.jpg" },
  { name: "Spanky", file: "spanky.jpg" },
  { name: "Sophie", file: "sophie.jpg" },
  { name: "Skipper", file: "skipper.jpg" },
  { name: "Santos", file: "santos.jpg" },
  { name: "Sancha", file: "sancha.jpg" },
  { name: "Sammy", file: "sammy.jpg" },
  { name: "Ruby", file: "ruby.jpg" },
  { name: "Roxie", file: "roxie.jpg" },
  { name: "Rosie", file: "rosie.jpg" },
  { name: "Romeo", file: "romeo.jpg" },
  { name: "Rocky", file: "rocky.jpg" },
  { name: "Ringo", file: "ringo.jpg" },
  { name: "Rico", file: "rico.jpg" },
  { name: "Ricky", file: "ricky.jpg" },
  { name: "Reggie", file: "reggie.jpg" },
  { name: "Reba", file: "reba.jpg" },
  { name: "Princess", file: "princess.jpg" },
  { name: "Prancer", file: "prancer.jpg" },
  { name: "Pippa", file: "pippa.jpg" },
  { name: "Pierre", file: "pierre.jpg" },
  { name: "Phoebe", file: "phoebe.jpg" },
  { name: "Persey", file: "persey.jpg" },
  { name: "Pepper", file: "pepper.jpg" },
  { name: "Peewee", file: "peewee.jpg" },
  { name: "Peeps", file: "peeps.jpg" },
  { name: "Peeka", file: "peeka.jpg" },
  { name: "Pedro", file: "pedro.jpg" },
  { name: "Pearl", file: "pearl.jpg" },
  { name: "Peanut", file: "peanut.jpg" },
  { name: "Patches", file: "patches.jpg" },
  { name: "Paco", file: "paco.jpg" },
  { name: "Junior", file: "junior.jpg" },
  { name: "Odie", file: "odie.jpg" },
  { name: "Nola", file: "nola.jpg" },
  { name: "Nita", file: "nita.jpg" },
  { name: "Niko", file: "niko.jpg" },
  { name: "Newbie", file: "newbie.jpg" },
  { name: "Muffin", file: "muffin.jpg" },
  { name: "Mojo", file: "mojo.jpg" },
  { name: "Mocha", file: "mocha.jpg" },
  { name: "Mini", file: "mini.jpg" },
  { name: "Meg", file: "meg.jpg" },
  { name: "Max", file: "max.jpg" },
  { name: "Marty", file: "marty.jpg" },
  { name: "Markie", file: "markie.jpg" },
  { name: "Mandy", file: "mandy.jpg" },
  { name: "Maddie", file: "maddie.jpg" },
  { name: "Luna", file: "luna.jpg" },
  { name: "Lucy", file: "lucy.jpg" },
  { name: "Lucky", file: "lucky.jpg" },
  { name: "Linus", file: "linus.jpg" },
  { name: "Link", file: "link_dog.jpg" },
  { name: "Lily", file: "lily.jpg" },
  { name: "Libby", file: "libby.jpg" },
  { name: "Kissey", file: "kissey.jpg" },
  { name: "Kirby", file: "kirby.jpg" },
  { name: "Kiki", file: "kiki.jpg" },
  { name: "Katy", file: "katy.jpg" },
  { name: "Jewel", file: "jewel.jpg" },
  { name: "Jasper", file: "jasper.jpg" },
  { name: "Jake", file: "jake.jpg" },
  { name: "Jack", file: "jack.jpg" },
  { name: "Isa", file: "isa.jpg" },
  { name: "Honey", file: "honey.jpg" },
  { name: "Goldie", file: "goldie.jpg" },
  { name: "George", file: "george.jpg" },
  { name: "Gemma", file: "gemma.jpg" },
  { name: "Gabby", file: "gabby.jpg" },
  { name: "Frosty", file: "frosty.jpg" },
  { name: "Frida", file: "frida.jpg" },
  { name: "Freddie", file: "freddie.jpg" },
  { name: "Frankie", file: "frankie.jpg" },
  { name: "Fanny", file: "fanny.jpg" },
  { name: "Eva", file: "eva.jpg" },
  { name: "Elvis", file: "elvis.jpg" },
  { name: "Elvie", file: "elvie.jpg" },
  { name: "Dutchess", file: "dutchess.jpg" },
  { name: "Dior", file: "dior.jpg" },
  { name: "Diesel", file: "diesel.jpg" },
  { name: "Diamond", file: "diamond.jpg" },
  { name: "Daisybug", file: "daisybug.jpg" },
  { name: "Cookie", file: "cookie.jpg" },
  { name: "Cody", file: "cody.jpg" },
  { name: "Coco", file: "coco.jpg" },
  { name: "Cindy", file: "cindy.jpg" },
  { name: "Chucky", file: "chucky.jpg" },
  { name: "Choco", file: "choco.jpg" },
  { name: "Chiquita", file: "chiquita.jpg" },
  { name: "Chipper", file: "chipper.jpg" },
  { name: "Chip", file: "chip.jpg" },
  { name: "Chino", file: "chino.jpg" },
  { name: "Chewey", file: "chewey.jpg" },
  { name: "Chester", file: "chester.jpg" },
  { name: "Chelsea", file: "chelsea.jpg" },
  { name: "Chaun", file: "chaun.jpg" },
  { name: "Chachi", file: "chachi.jpg" },
  { name: "Cassie", file: "cassie.jpg" },
  { name: "Caramia", file: "caramia.jpg" },
  { name: "Cappy", file: "cappy.jpg" },
  { name: "Butterfly", file: "butterfly.jpg" },
  { name: "Buffy", file: "buffy.jpg" },
  { name: "Buddy", file: "buddy.jpg" },
  { name: "Bud", file: "bud.jpg" },
  { name: "Blackie", file: "blackie.jpg" },
  { name: "Billy", file: "billy.jpg" },
  { name: "Biji", file: "biji.jpg" },
  { name: "Bicho", file: "bicho.jpg" },
  { name: "Benny", file: "benny.jpg" },
  { name: "Belle", file: "belle.jpg" },
  { name: "Becky", file: "becky.jpg" },
  { name: "Beau", file: "beau.jpg" },
  { name: "Baylee", file: "baylee.jpg" },
  { name: "Bandit", file: "bandit.jpg" },
  { name: "Bambi", file: "bambi.jpg" },
  { name: "Bailey", file: "bailey.jpg" },
  { name: "Aster", file: "aster.jpg" },
  { name: "Chanel", file: "chanel.jpg" },
  { name: "Bentley", file: "bentley.jpg" },
  { name: "Ziggy", file: "ziggy.jpg" },
  { name: "Poncho", file: "poncho.jpg" },
  { name: "Montie", file: "montie.jpg" },
  { name: "Wilbur", file: "wilbur.jpg" },
  { name: "Tippy", file: "tippy.jpg" },
  { name: "Mr. Goodbar", file: "mrgoodbar.jpg" },
  { name: "Mollie", file: "mollie.jpg" },
  { name: "Marley", file: "marley.jpg" },
  { name: "Lovie", file: "lovie.jpg" },
  { name: "Gus", file: "gus.jpg" },
  { name: "Duke", file: "duke.jpg" },
  { name: "Dozer", file: "dozer.jpg" },
  { name: "Rufus", file: "rufus.jpg" },
  { name: "Penny", file: "penny.jpg" },
  { name: "Paddy", file: "paddy.png" },
  { name: "Owen", file: "owen.jpg" },
  { name: "Maisey", file: "maisey.jpg" },
  { name: "Kenny", file: "kenny.jpg" },
  { name: "Hunter", file: "hunter.jpg" },
  { name: "Gizmo", file: "gizmo.jpg" },
  { name: "Chedda", file: "chedda.jpg" },
  { name: "Bear", file: "bear.jpg" },
  { name: "BamBam", file: "bambam.png" },
  { name: "Annie", file: "annie.png" },
  { name: "Sandy", file: "sandy.jpg" },
  { name: "Petey", file: "petey.jpg" },
  { name: "Penelope", file: "penelope.jpg" },
  { name: "Mitsie", file: "mitsie.jpg" },
  { name: "Minni", file: "minni.jpg" },
  { name: "Kisses", file: "kisses.jpg" },
  { name: "Hazelnut", file: "hazelnut.jpg" },
  { name: "Flower", file: "flower.jpg" },
  { name: "Dito", file: "dito.jpg" },
  { name: "Dante", file: "dante.jpg" },
  { name: "Cocoa", file: "cocoa.jpg" },
  { name: "Chilli", file: "chilli.jpg" },
  { name: "Casper", file: "casper.jpg" },
  { name: "Butch", file: "butch.jpg" },
  { name: "Brooklyn", file: "brooklyn.jpg" },
  { name: "Braeden", file: "braeden.jpg" },
  { name: "Bootz", file: "bootz.jpg" },
  { name: "Angelina", file: "angelina.jpg" },
  { name: "Addie", file: "addie.jpg" },
  { name: "Wee", file: "wee.jpg" },
  { name: "Trixie", file: "trixie.jpg" },
  { name: "Stella", file: "stella.jpg" },
  { name: "Sparkles", file: "sparkles.jpg" },
  { name: "Scotch", file: "scotch.jpg" },
  { name: "Onyx", file: "onyx.jpg" },
  { name: "Mystique", file: "mystique.jpg" },
  { name: "Latte", file: "latte.jpg" },
  { name: "Izzy", file: "izzy.jpg" },
  { name: "Greta", file: "greta.jpg" },
  { name: "Gina", file: "gina.jpg" },
  { name: "Dioge", file: "dioge.jpg" },
  { name: "Deliah", file: "deliah.jpg" },
  { name: "Bruiser", file: "bruiser.jpg" },
  { name: "Brock", file: "brock.jpg" },
  { name: "Amber", file: "amber.jpg" },
  { name: "Angel", file: "angel.jpg" },
  { name: "Wanda", file: "wanda.jpg" },
  { name: "Molly", file: "molly.jpg" },
  { name: "Maya", file: "maya.jpg" },
  { name: "Lacey", file: "lacey.jpg" },
  { name: "Katey", file: "katey.jpg" },
  { name: "Hazel", file: "hazel.jpg" },
  { name: "Candy", file: "candy.jpg" },
  { name: "Hanna", file: "hanna.jpg" },
  { name: "Domino", file: "domino.jpg" },
  { name: "Cosmo", file: "cosmo.jpg" },
  { name: "Chico", file: "chico.jpg" },
  { name: "Birtha", file: "birtha.jpg" },
  { name: "Bandito", file: "bandito.jpg" },
  { name: "Morgan", file: "morgan.jpg" },
  { name: "Webster", file: "webster.jpg" },
  { name: "Skeeter", file: "skeeter.jpg" },
];

export default function HappyEndingsPage() {
  return (
    <div className="bg-cream">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-cream pb-16 pt-20 text-center">
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-coral-100 px-5 py-2 text-sm font-medium text-coral-700">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            Celebrating Forever Homes
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl lg:text-6xl">
            Happy Endings
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-warm-600 sm:text-xl">
            Every rescue story deserves a happy ending. Here we celebrate the chihuahuas who
            found their forever homes and the families who opened their hearts.
          </p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-amber-500">
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-4 px-6 py-8 text-center">
          <svg className="h-10 w-10 shrink-0 text-amber-100" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <p className="text-2xl font-bold text-white sm:text-3xl">{adoptedDogs.length}+ dogs placed in loving homes</p>
          <svg className="h-10 w-10 shrink-0 text-amber-100" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </section>

      {/* Success Stories Intro */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-warm-900 sm:text-4xl">Our Success Stories</h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-coral-400" />
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-warm-600">
          Each face below represents a life transformed &mdash; a scared or abandoned pup
          who now knows the warmth of a loving home. These happy endings are possible because
          of our incredible adopters, foster families, and volunteers.
        </p>
      </section>

      {/* Photo Gallery */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-warm-500">
          Every face, a life changed
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {adoptedDogs.map((dog, index) => (
            <div
              key={`${dog.name}-${index}`}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-warm-200/50 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={`/images/dogs/${dog.file}`}
                  alt={`${dog.name} - adopted chihuahua`}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="px-3 py-2 text-center">
                <p className="text-sm font-semibold text-warm-800">{dog.name}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-warm-500">
          &hellip;and many more whose stories continue to inspire us every day.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-cream to-amber-50 px-6 pb-24 pt-8">
        <div className="mx-auto max-w-2xl text-center">
          <svg className="mx-auto mb-6 h-12 w-12 text-coral-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <h2 className="text-3xl font-bold text-warm-900 sm:text-4xl">
            Want to add a happy ending?
          </h2>
          <p className="mt-4 text-lg text-warm-600">
            Start the adoption process today and give a chihuahua the loving home they deserve.
          </p>
          <Link
            href="/adoption"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-coral-500 px-8 py-3.5 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-coral-600"
          >
            Start the Adoption Process
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
