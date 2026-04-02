"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

const stateOptions = ["ME", "NH", "VT", "MA", "CT", "RI"] as const;

const behaviorAtHome = [
  { name: "MembersOfHome", label: "Members of house / Roommates?" },
  { name: "Men_Women", label: "Men vs. Women?" },
  { name: "Children_Adults", label: "Children vs. Adults?" },
  { name: "Friends_Family", label: "Visiting friends and family?" },
  { name: "Strangers_house", label: "Strangers coming into the house?" },
  { name: "Other_dogs-house", label: "Other dogs living in the house?" },
  { name: "Cats", label: "Cats?" },
  { name: "Other_animals_Indoors", label: "Other animals in home (specify)?" },
];

const behaviorOnWalks = [
  { name: "Strangers_walks", label: "Strangers met on walks?" },
  { name: "Other_dogs-walks", label: "Other dogs met on walks?" },
  { name: "Other_dogs-sex", label: "Male dogs vs. Female dogs?" },
  { name: "Other_dogs-size", label: "Big dogs vs. Small dogs?" },
  { name: "Other_animals_Outdoors", label: "Other animals during walk? (cats, birds, squirrels/chipmunks)" },
];

const behaviorProfessional = [
  { name: "WithVets", label: "At the veterinarian?" },
  { name: "WithGroomers", label: "At the groomer's or boarding kennel?" },
  { name: "WithGrooming_Nails", label: "When groomed, nail trimming, bathing?" },
];

const behaviorTemperament = [
  { name: "Obedience", label: "Response to commands / Obedience?" },
  { name: "Likes", label: "What does the dog especially like / enjoy?" },
  { name: "Fears", label: "What does the dog dislike or fear?" },
];

const ic =
  "mt-1.5 block w-full rounded-lg border border-warm-200 bg-white px-4 py-2.5 text-warm-800 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200";
const tc = `${ic} min-h-[70px]`;
const rc = "h-4 w-4 border-warm-300 text-amber-500 focus:ring-amber-300";

function Label({ htmlFor, required, children }: { htmlFor?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-warm-800">
      {required && <span className="text-coral-500">* </span>}
      {children}
    </label>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="border-b border-warm-200 pb-2 pt-4 text-lg font-bold text-warm-900">{children}</h2>;
}

function BehaviorTable({ title, items }: { title: string; items: { name: string; label: string }[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-warm-800">{title}</p>
      <div className="mt-2 space-y-3">
        {items.map((item) => (
          <div key={item.name}>
            <label htmlFor={item.name} className="block text-sm text-warm-600">{item.label}</label>
            <input type="text" id={item.name} name={item.name} className={ic} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function IntakeFormPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setSubmitting(true);
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-cream">
        <section className="bg-gradient-to-b from-warm-100 to-cream px-6 pb-6 pt-12 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">Thank You!</h1>
          </div>
        </section>
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <p className="text-xl text-warm-700">Your intake form has been submitted. Our Intake Coordinator will get back to you.</p>
          <Link href="/" className="mt-8 inline-flex items-center rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-600">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-b from-warm-100 to-cream px-6 pb-6 pt-12 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">Foster Dog Intake Form</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-warm-600">Yankee Chihuahua Rescue and Adoption, Inc (YCRAA)</p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-6 pb-16 pt-8">
        <p className="mb-4 text-sm text-warm-600">
          Please complete all required fields marked with <span className="text-coral-500">*</span>. Only residents of Maine, New Hampshire, Vermont, Massachusetts, Connecticut, and Rhode Island.
        </p>

        <div className="mb-6 rounded-lg border-2 border-coral-300 bg-coral-50 p-4 text-sm font-semibold text-coral-800">
          We cannot / will not take in aggressive dogs or dogs that bite.
        </div>

        <form action="https://formspree.io/f/meqvjlqn" method="POST" onSubmit={handleSubmit} className="space-y-5">
          <input type="hidden" name="_subject" value="Intake Application" />

          {/* ── Contact Information ── */}
          <SectionHeading>Contact Information</SectionHeading>

          <div>
            <Label htmlFor="Name" required>First and Last Name</Label>
            <input type="text" id="Name" name="Name" required className={ic} />
          </div>

          <div>
            <Label htmlFor="Address" required>Home Street Address</Label>
            <input type="text" id="Address" name="Address" required className={ic} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="TownCity" required>City/Town</Label>
              <input type="text" id="TownCity" name="TownCity" required className={ic} />
            </div>
            <div>
              <Label htmlFor="ZipPostalCode" required>Zip Code</Label>
              <input type="text" id="ZipPostalCode" name="ZipPostalCode" required pattern="[0-9]{5,6}" maxLength={6} className={ic} />
            </div>
          </div>

          <fieldset>
            <Label required>State</Label>
            <div className="mt-2 flex flex-wrap gap-4">
              {stateOptions.map((st) => (
                <label key={st} className="flex items-center gap-1.5 text-sm text-warm-700">
                  <input type="radio" name="State" value={st} required className={rc} /> {st}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <Label htmlFor="Mailing">Mailing Address <span className="text-xs font-normal text-warm-500">(if different)</span></Label>
            <textarea id="Mailing" name="Mailing" rows={2} className={ic} />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="PrimaryPhone" required>Primary Phone</Label>
              <input type="tel" id="PrimaryPhone" name="PrimaryPhone" required placeholder="1234567890" pattern="[0-9]{10}" maxLength={10} title="Enter 10 digits, numbers only" className={ic} />
            </div>
            <div>
              <Label htmlFor="Email" required>Email Address</Label>
              <input type="email" id="Email" name="Email" required className={ic} />
            </div>
            <div>
              <Label htmlFor="SecondaryPhone">Secondary Phone</Label>
              <input type="tel" id="SecondaryPhone" name="SecondaryPhone" pattern="[0-9]{10}" maxLength={10} title="Enter 10 digits, numbers only" className={ic} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="DogsName" required>Dog&apos;s Name</Label>
              <input type="text" id="DogsName" name="DogsName" required className={ic} />
            </div>
            <div>
              <Label htmlFor="Call_Time" required>Best time to call</Label>
              <input type="text" id="Call_Time" name="Call_Time" required maxLength={10} className={ic} />
            </div>
          </div>

          {/* ── Dog's History ── */}
          <SectionHeading>Dog&apos;s History</SectionHeading>

          <div>
            <Label htmlFor="Origin" required>Where did the dog originally come from?</Label>
            <input type="text" id="Origin" name="Origin" required className={ic} />
          </div>

          <div>
            <Label htmlFor="Pedigree" required>Is the dog registered with AKC or CKC? Registration papers available?</Label>
            <textarea id="Pedigree" name="Pedigree" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Who_releasing" required>Who is surrendering/releasing the dog?</Label>
            <textarea id="Who_releasing" name="Who_releasing" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Surrender_Reason" required>Reason for surrender/release?</Label>
            <textarea id="Surrender_Reason" name="Surrender_Reason" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Other_info" required>Other information (previous homes, family type, etc.)</Label>
            <textarea id="Other_info" name="Other_info" required rows={2} className={tc} />
          </div>

          {/* ── Physical Description ── */}
          <SectionHeading>Dog&apos;s Physical Description</SectionHeading>

          <div>
            <Label htmlFor="Age-Sex" required>Age, Sex, When Spayed/Neutered</Label>
            <textarea id="Age-Sex" name="Age-Sex" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Size" required>Size (height/weight)</Label>
            <textarea id="Size" name="Size" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Coat" required>Color, Markings, Coat Type (short or long hair)</Label>
            <textarea id="Coat" name="Coat" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="identification" required>Any permanent identification? (ID, tattoo, microchip, tag)</Label>
            <textarea id="identification" name="identification" required rows={2} className={tc} />
          </div>

          {/* ── Medical/Health ── */}
          <SectionHeading>Dog&apos;s Medical / Health Issues</SectionHeading>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="Last_Vaccination" required>Date of last vaccinations</Label>
              <input type="date" id="Last_Vaccination" name="Last_Vaccination" required className={ic} />
            </div>
            <div>
              <Label htmlFor="Last_Vet_Visit" required>Date of last veterinarian visit</Label>
              <input type="date" id="Last_Vet_Visit" name="Last_Vet_Visit" required className={ic} />
            </div>
          </div>

          <div>
            <Label htmlFor="Vaccination_List" required>List of current vaccinations and dates</Label>
            <textarea id="Vaccination_List" name="Vaccination_List" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Reason_for_visit" required>Reason for last veterinarian visit</Label>
            <textarea id="Reason_for_visit" name="Reason_for_visit" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Other_Illnesses" required>List any current/past allergies, chronic illnesses, diseases</Label>
            <textarea id="Other_Illnesses" name="Other_Illnesses" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Veterinarian" required>Veterinarian name, address, telephone</Label>
            <textarea id="Veterinarian" name="Veterinarian" required rows={2} className={tc} />
          </div>

          {/* ── Behavior / Temperament ── */}
          <SectionHeading>Dog&apos;s Behavior (Temperament)</SectionHeading>

          <div>
            <Label htmlFor="behavior" required>General description of behavior</Label>
            <p className="text-xs text-warm-500">Confident/shy? Friendly/reserved? Fearful? High/low activity level? Submissive? Aggressive? Quiet/noisy?</p>
            <textarea id="behavior" name="behavior" required rows={3} className={tc} />
          </div>

          <fieldset>
            <Label required>Is the dog house trained?</Label>
            <div className="mt-2 flex gap-6">
              <label className="flex items-center gap-2 text-sm text-warm-700">
                <input type="radio" name="house_trained" value="Yes" required className={rc} /> Yes
              </label>
              <label className="flex items-center gap-2 text-sm text-warm-700">
                <input type="radio" name="house_trained" value="No" className={rc} /> No
              </label>
            </div>
          </fieldset>

          <div>
            <Label htmlFor="AdditionalComments">Additional comments about the dog</Label>
            <textarea id="AdditionalComments" name="AdditionalComments" rows={2} className={tc} />
          </div>

          {/* Behavioral response tables */}
          <SectionHeading>How does the dog typically respond to:</SectionHeading>

          <BehaviorTable title="At home" items={behaviorAtHome} />
          <BehaviorTable title="During walks" items={behaviorOnWalks} />
          <BehaviorTable title="With professionals" items={behaviorProfessional} />
          <BehaviorTable title="Temperament" items={behaviorTemperament} />

          {/* Aggression */}
          <SectionHeading>Aggression Assessment</SectionHeading>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-warm-700">
            &quot;Aggression&quot; refers to hostile or threatening behavior &mdash; including lunging, growling, barking, snapping, or biting.
          </div>

          <div>
            <Label htmlFor="Aggression_People" required>Has the dog shown aggression toward people/children?</Label>
            <input type="text" id="Aggression_People" name="Aggression_People" required className={ic} />
          </div>

          <div>
            <Label htmlFor="Aggression_Animals" required>Has the dog shown aggression toward other animals?</Label>
            <input type="text" id="Aggression_Animals" name="Aggression_Animals" required className={ic} />
          </div>

          <div>
            <Label htmlFor="Damage_Done" required>If yes, detail all circumstances</Label>
            <textarea id="Damage_Done" name="Damage_Done" required rows={4} className={tc} />
          </div>

          {/* Items */}
          <div>
            <Label htmlFor="Items_Sent">Equipment, toys, or other items sent with dog</Label>
            <input type="text" id="Items_Sent" name="Items_Sent" className={ic} />
          </div>

          {/* ── Signature ── */}
          <SectionHeading>Signature</SectionHeading>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-warm-700">
            By typing your full name in the signature field below, you acknowledge that your typed name holds the same legal standing as your handwritten signature. By e-signing this form, you confirm that the information provided is accurate to the best of your knowledge and belief. Furthermore, your e-signature authorizes us to verify this information, including contacting your references and veterinarian. You also consent to your veterinarian sharing information about the health records of your current or past pets with our organization.
          </div>

          <div>
            <Label htmlFor="Signature" required>Signature</Label>
            <input type="text" id="Signature" name="Signature" required className={`${ic} font-serif italic`} />
          </div>

          <div>
            <Label htmlFor="comments">Where did you hear about us? Comments?</Label>
            <textarea id="comments" name="comments" rows={3} className={tc} />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4 pt-2">
            <button type="submit" disabled={submitting} className="inline-flex items-center rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600 disabled:opacity-50">
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
            <button type="reset" className="text-sm font-medium text-warm-500 hover:text-warm-700">Reset Form</button>
            <Link href="/surrender" className="text-sm font-medium text-warm-500 hover:text-warm-700">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
