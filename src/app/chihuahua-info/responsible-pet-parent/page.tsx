import Link from "next/link";

export const metadata = { title: "Are You a Responsible Pet Parent?" };

const questions = [
  {
    question: "Where did you get your dog?",
    answers: [
      "A pet shop that sells puppies.",
      'The Wal-Mart Parking lot (some guy in a van, giving away free puppies).',
      "I saw an ad in the newspaper.",
      "I found my dog roaming as a stray, or my dog found me.",
      "From a responsible, well-known and reputable breeder.",
      "From a rescue organization or shelter that interviewed me to make sure I got the right dog for me.",
      "From a person who raised the litter with much daily human contact, and did not release them until after 8-9 weeks of age.",
    ],
  },
  {
    question: "On what basis did you choose your dog (or, what made you decide to get this dog)?",
    answers: [
      "Impulse. I saw him in one of the locations in the previous question, and couldn't resist his cute self.",
      'Pity. I wanted to "save" the poor puppy from the evil pet shop that had him for sale.',
      "I needed a last-minute birthday/Christmas/anniversary gift for the spouse/kids.",
      "The kids needed a dog to teach them some responsibility. Plus, they've been begging for a dog.",
      'When I found the dog as a stray, I put up flyers and notified vets and shelters to try to find his owner. I took him to a vet to have him scanned for a microchip and checked for health problems. When no owner came forward, knowing I was able to take on the responsibility of caring for and training the dog, I kept him and he is now a member of the family.',
      'We put a lot of thought into it, waited until the kids were grown up enough to handle the responsibility and not torment the dog, researched various breed types thoroughly, decided on the type of dog we wanted (like, terrier, herding breed, etc.). And looked for a good breeder of this kind of dog, or went to the breed rescue, petfinder.com or other place where I might find a pure or mixed breed with these qualities, and correct temperament for my family.',
      'Add to #5 that I asked many questions about the sire and dam, and inquired of any potential hereditary defects, like hip dysplasia, deafness, retinal atrophy, etc. and asked how the puppies were housed/raised up until they were old enough to find homes. Or, if a rescue or adult dog, I asked to find out what kind of socialization the dog had during critical socialization periods.',
    ],
  },
  {
    question: "Where does your dog stay?",
    answers: [
      "He has free run of the yard, but usually stays around the house or on the porch.",
      "On a chain in the yard with an insulated, dry doghouse.",
      "In a fenced yard with someplace to go to get out of the elements (doghouse, porch, shed...)",
      "In a kennel run with an insulated, dry doghouse or access to the indoors (house, shed, barn)",
      "My dog is always with me. I leave him in the car when I go to the store; in the house when I'm home.",
      "In the garage or basement while we're at work and at night; gets to come in to spend time with us in the evenings.",
      "In the house in his room or a crate (or where ever his bed is), while we're gone, and loose with us in the home when we're there.",
      "My dog accompanies me to places where he is welcome and if he can't come with me, he has a climate controlled house to stay in with access to a doggie door and a fully fenced private yard.",
      "At doggie day care while we're at work, and in the house with us in the evenings and nights.",
    ],
  },
  {
    question: "What does your dog do for fun and exercise on a regular basis?",
    answers: [
      "Digs holes in the back yard, chases squirrels and barks at the mailman.",
      "Seasonal activities, like hunting, or dog sled racing only.",
      "Goes on daily walks through the neighborhood on leash with some off-leash running at a park or back yard.",
      "Plays fetch, Frisbee, or other games in the yard.",
      "Belongs to doggie organizations, like a flyball team, agility club, Dog Scout troop, or Therapy group.",
      "You name it: Frisbee, Dock Diving, Agility, Herding, Sledding, Flyball, Rally Obedience, Hiking... If you can do it with a dog, count us IN!",
    ],
  },
  {
    question: "Where does your dog get to go with you?",
    answers: [
      "Nowhere. My dog is too ill-behaved to take anywhere in public.",
      "My relatives' homes and rides in the car when I go to town.",
      "Anywhere dogs are allowed: ball games, fairs, pet stores, camping, my work place...",
      "Everywhere I can take my dog, plus vacations, camping and special dog activity camps.",
      "Number 3 plus Dog Scout Troop functions, dog club activities, various competitions for fun, vacations.",
    ],
  },
  {
    question: "What does your dog eat?",
    answers: [
      "Table Scraps and leftovers.",
      "The cheapest food I can find. I've never really read the labels (I assumed it's all the same.)",
      "Canned dog food from the supermarket.",
      "Dry dog food from the supermarket.",
      "The best food I can afford that is complete and balanced for my dog's age and needs.",
      "Quality meat, higher cost, processed dog food from a distributor or pet store chain.",
      "Meat based raw-food diet prepared especially for the dog by me, following dietary recommendations or a frozen or freeze dried variety from a respected company.",
      "A meat based, all natural, all organic, Kosher, or other special diet that I know, because of the research I have done, is best for my dog.",
    ],
  },
  {
    question: "How many words (cues) does your dog know and understand?",
    answers: [
      "Not many. I'm not sure he even knows what his name is.",
      "A few \"survival\" commands: Sit, Come, Stay.",
      "Basic Obedience: Heel, Sit, Down, Come, Stay, Stand, Good Dog.",
      'All of #3, plus "good manners" cues, like: Off, Wait, Go to your Place, Quiet, Leave-it.',
      "All of #4, plus an array of cute tricks, like: Shake, Roll Over, Speak...",
      "Add to #5 more advanced tricks, like retrieve, scent discrimination, etc.",
      "Including #6, an arsenal of cues used to do the many sports and activities we pursue, like agility cues, herding cues, tracking, Frisbee, flyball, sledding, therapy work, or other interests.",
    ],
  },
];

const scoring = [
  "If you found your answers in the first few choices, you could likely improve your knowledge or responsibility in those areas. Your dog will be happier and you will feel better.",
  "If your answers tended to be in the middle of the choices, you might be doing OK, or you might want to increase your education about why the higher numbered answers could be better for your dog.",
  "If your answers were the higher numbered choices, way to go! You have a very lucky dog! Your responsibility can be an example for others who are not as aware of the above situations as you.",
];

export default function ResponsiblePetParentPage() {
  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-b from-amber-100 to-cream px-6 pb-8 pt-14 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">
            Are You a Responsible Pet Parent?
          </h1>
          <p className="mt-4 text-lg text-warm-600">
            Take this quiz and see how you score on the dog-savvy meter!
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-24">
        <div className="space-y-12 py-10">
          {questions.map((q, qIdx) => (
            <div key={qIdx}>
              <h2 className="text-xl font-bold text-warm-900">
                {qIdx + 1}. {q.question}
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-amber-400" />
              <ol className="mt-6 space-y-3">
                {q.answers.map((a, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-warm-100 text-xs font-bold text-warm-600">
                      {aIdx + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-warm-700">{a}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}

          <div className="space-y-4 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-warm-50 p-8">
            <h2 className="text-xl font-bold text-warm-900">Scoring</h2>
            {scoring.map((s, idx) => (
              <p key={idx} className="text-warm-700">
                {s}
              </p>
            ))}
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
