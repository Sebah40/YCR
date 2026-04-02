"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

const stateOptions = ["ME", "NH", "VT", "MA", "CT", "RI"] as const;

const ic =
  "mt-1.5 block w-full rounded-lg border border-warm-200 bg-white px-4 py-2.5 text-warm-800 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200";
const tc = `${ic} min-h-[70px]`;
const rc = "h-4 w-4 border-warm-300 text-amber-500 focus:ring-amber-300";
const chk = "mt-0.5 h-4 w-4 rounded border-warm-300 text-amber-500 focus:ring-amber-300";

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

function YesNo({ name, required, onChange }: { name: string; required?: boolean; onChange?: (v: string) => void }) {
  return (
    <div className="mt-2 flex gap-6">
      <label className="flex items-center gap-2 text-sm text-warm-700">
        <input type="radio" name={name} value="No" required={required} onChange={onChange && ((e) => onChange(e.target.value))} className={rc} /> No
      </label>
      <label className="flex items-center gap-2 text-sm text-warm-700">
        <input type="radio" name={name} value="Yes" onChange={onChange && ((e) => onChange(e.target.value))} className={rc} /> Yes
      </label>
    </div>
  );
}

export default function AdoptionApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [ownedDog, setOwnedDog] = useState("");
  const [homeType, setHomeType] = useState("");
  const [ownRent, setOwnRent] = useState("");
  const [healthProblems, setHealthProblems] = useState("");

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
        <section className="bg-gradient-to-b from-amber-50 to-cream px-6 pb-6 pt-12 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">Thank You!</h1>
          </div>
        </section>
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <p className="text-xl text-warm-700">Your adoption application has been submitted. A YCRAA volunteer will contact you.</p>
          <Link href="/" className="mt-8 inline-flex items-center rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-600">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-b from-amber-50 to-cream px-6 pb-6 pt-12 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">Application for Adoption</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-warm-600">Yankee Chihuahua Rescue and Adoption, Inc (YCRAA)</p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-6 pb-16 pt-8">
        <p className="mb-4 text-sm text-warm-600">
          Please complete all required fields marked with <span className="text-coral-500">*</span>. Only residents of Maine, New Hampshire, Vermont, Massachusetts, Connecticut, and Rhode Island. Proof of residency is required. You must be 25 years or older with a valid ID.
        </p>
        <p className="mb-6 text-sm font-semibold text-warm-700">
          Complete this entire form. Missing information and incomplete applications will not be considered.
        </p>

        <form action="https://formspree.io/f/mzbypaby" method="POST" onSubmit={handleSubmit} className="space-y-5">
          <input type="hidden" name="_subject" value="Adoption Application" />

          {/* ── Personal Information ── */}
          <SectionHeading>Personal Information</SectionHeading>

          <div>
            <Label htmlFor="Name" required>First and Last Name</Label>
            <input type="text" id="Name" name="Name" required className={ic} />
          </div>

          <div>
            <Label htmlFor="Age_over_25" required>Your Age</Label>
            <p className="text-xs text-warm-500">You must be 25 years or older. A valid ID is required.</p>
            <select id="Age_over_25" name="Age_over_25" required className={ic}>
              <option value="">Select age</option>
              {Array.from({ length: 75 }, (_, i) => i + 25).map((age) => (
                <option key={age} value={String(age)}>{age}</option>
              ))}
            </select>
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
              <Label htmlFor="SecondaryPhone">Secondary Phone</Label>
              <input type="tel" id="SecondaryPhone" name="SecondaryPhone" pattern="[0-9]{10}" maxLength={10} title="Enter 10 digits, numbers only" className={ic} />
            </div>
            <div>
              <Label htmlFor="Call_Time">Best time to call</Label>
              <input type="text" id="Call_Time" name="Call_Time" maxLength={10} className={ic} />
            </div>
          </div>

          <div>
            <Label htmlFor="Email" required>Email Address (preferred contact method)</Label>
            <input type="email" id="Email" name="Email" required className={ic} />
          </div>

          {/* ── Employment & Household ── */}
          <SectionHeading>Employment &amp; Household</SectionHeading>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="Occupation" required>Occupation</Label>
              <input type="text" id="Occupation" name="Occupation" required className={ic} />
            </div>
            <div>
              <Label htmlFor="Hours-Work" required>Hours worked outside home/week</Label>
              <input type="text" id="Hours-Work" name="Hours-Work" required maxLength={5} className={ic} />
            </div>
          </div>

          <div>
            <Label htmlFor="Home_During_Day" required>Who will be home during the day?</Label>
            <input type="text" id="Home_During_Day" name="Home_During_Day" required className={ic} />
          </div>

          <div>
            <Label htmlFor="Why_Adopt" required>Why do you want to adopt a Chihuahua?</Label>
            <textarea id="Why_Adopt" name="Why_Adopt" required rows={3} className={tc} />
          </div>

          <div>
            <Label htmlFor="For_Whom" required>For whom are you adopting a Chihuahua? Who will the Chihuahua be primarily in contact with?</Label>
            <input type="text" id="For_Whom" name="For_Whom" required className={ic} />
          </div>

          {/* ── Household Knowledge & Consent ── */}
          <SectionHeading>Household Knowledge &amp; Consent</SectionHeading>

          <label className="flex items-start gap-2.5 text-sm text-warm-700">
            <input type="checkbox" name="Everyone_Know" value="Yes Everyone in Household knows." required className={chk} />
            <span><span className="text-coral-500">* </span>Yes, everyone in the household knows I am applying to adopt a Yankee Chihuahua</span>
          </label>

          <label className="flex items-start gap-2.5 text-sm text-warm-700">
            <input type="checkbox" name="Everyone_Want" value="Yes, everyone ine the household wants a Yankee Chihuahua" required className={chk} />
            <span><span className="text-coral-500">* </span>Yes, everyone in the household wants to live with a Yankee Chihuahua</span>
          </label>

          {/* ── Health & Pets ── */}
          <SectionHeading>Health &amp; Pets</SectionHeading>

          <div>
            <Label htmlFor="Allergies" required>Does anyone in the household have allergies? (e.g. animal dander) List all.</Label>
            <input type="text" id="Allergies" name="Allergies" required className={ic} />
          </div>

          <div>
            <Label htmlFor="Current_Pets" required>Describe any/all pets that are currently living with you (type/breed, age, sex, altered status, etc.)</Label>
            <textarea id="Current_Pets" name="Current_Pets" required rows={3} className={tc} />
          </div>

          <fieldset>
            <Label required>Have you ever owned a dog before?</Label>
            <YesNo name="Owned_DogYN" required onChange={setOwnedDog} />
          </fieldset>

          {ownedDog === "Yes" && (
            <div>
              <Label htmlFor="Owned_Dog" required>How many and what breeds in the past 10 years?</Label>
              <input type="text" id="Owned_Dog" name="Owned_Dog" required className={ic} />
            </div>
          )}

          <fieldset>
            <Label required>Have you ever owned a Chihuahua before?</Label>
            <YesNo name="Owned_Chihuahua" required />
          </fieldset>

          <div>
            <Label htmlFor="Why_Chi" required>Why did you choose to adopt a Chihuahua (or Chihuahua/mix) rather than any other breed?</Label>
            <textarea id="Why_Chi" name="Why_Chi" required rows={3} className={tc} />
          </div>

          <div>
            <Label htmlFor="Past_Pets" required>Describe any/all previous pets that are no longer with you and why (deceased, kids took it, moved to pet-free home, ...)</Label>
            <textarea id="Past_Pets" name="Past_Pets" required rows={3} className={tc} />
          </div>

          {/* ── Household Composition ── */}
          <SectionHeading>Household Composition</SectionHeading>

          <div>
            <Label htmlFor="Adults" required>List all adults in household, including yourself, their ages and relationship to you (include all residents and housemates whether related or unrelated)</Label>
            <textarea id="Adults" name="Adults" required rows={3} className={tc} />
          </div>

          <div>
            <Label htmlFor="Children" required>List all children in household and their ages; if none please state so</Label>
            <textarea id="Children" name="Children" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Responsible" required>Who will be responsible for feeding, housebreaking / training?</Label>
            <textarea id="Responsible" name="Responsible" required rows={2} className={tc} />
          </div>

          {/* ── Housing ── */}
          <SectionHeading>Housing Information</SectionHeading>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-warm-700">
            If you live in an apartment, a condo, assisted care facility, senior housing, or any other type of rental/leased home that you do not own, then you must provide a letter (on letterhead paper) from management stating they approve that you may adopt a dog from us. If you rent/lease, then you must bring your rental/lease agreement which states the type of pet you are interested in is approved or permitted in the home. You must also provide the landlord&apos;s name and telephone for verification.
          </div>

          <fieldset>
            <Label required>What type of home do you live in?</Label>
            <div className="mt-2 flex flex-wrap gap-4">
              {["Single Family", "Multi-Family", "Condo", "Apartment", "Other"].map((t) => (
                <label key={t} className="flex items-center gap-1.5 text-sm text-warm-700">
                  <input type="radio" name="Home_Type" value={t} required onChange={(e) => setHomeType(e.target.value)} className={rc} /> {t}
                </label>
              ))}
            </div>
          </fieldset>

          {homeType === "Other" && (
            <div>
              <Label htmlFor="Home_Type_Other" required>Please specify</Label>
              <input type="text" id="Home_Type_Other" name="Home_Type" required className={ic} />
            </div>
          )}

          <fieldset>
            <Label required>Do you own or rent your residence?</Label>
            <div className="mt-2 flex gap-6">
              <label className="flex items-center gap-2 text-sm text-warm-700">
                <input type="radio" name="Own_Rent" value="Own" required onChange={(e) => setOwnRent(e.target.value)} className={rc} /> Own
              </label>
              <label className="flex items-center gap-2 text-sm text-warm-700">
                <input type="radio" name="Own_Rent" value="Rent" onChange={(e) => setOwnRent(e.target.value)} className={rc} /> Rent
              </label>
            </div>
          </fieldset>

          {ownRent === "Rent" && (
            <div>
              <Label htmlFor="Landlord" required>Landlord name, address, and phone number</Label>
              <input type="text" id="Landlord" name="Landlord" required className={ic} />
            </div>
          )}

          {/* ── Dog Care ── */}
          <SectionHeading>Dog Care</SectionHeading>

          <div>
            <Label htmlFor="Night_Plans" required>Where will the dog sleep when you retire for the day?</Label>
            <textarea id="Night_Plans" name="Night_Plans" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Outside_Time" required>How much time will you be able to spend outside with the dog?</Label>
            <textarea id="Outside_Time" name="Outside_Time" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Hours_Alone" required>How many hours a day will the dog be left unattended? Where will they stay?</Label>
            <textarea id="Hours_Alone" name="Hours_Alone" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Vacation" required>How frequently will you be gone away from home on business, vacation, or trips?</Label>
            <input type="text" id="Vacation" name="Vacation" required className={ic} />
          </div>

          <div>
            <Label htmlFor="Vacation_Plan" required>When you are on vacation where will the dog be kept?</Label>
            <textarea id="Vacation_Plan" name="Vacation_Plan" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Feed" required>What do you intend to feed the dog?</Label>
            <input type="text" id="Feed" name="Feed" required className={ic} />
          </div>

          <div>
            <Label htmlFor="Housetrain" required>How will you house train the dog? Enter as much detail as possible.</Label>
            <textarea id="Housetrain" name="Housetrain" required rows={3} className={tc} />
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-warm-700">
            We crate train. It helps the dog adapt more quickly and with less stress when they find their forever homes.
          </div>

          <div>
            <Label htmlFor="Crate_Training" required>Are you familiar with crate training?</Label>
            <textarea id="Crate_Training" name="Crate_Training" required rows={2} className={tc} />
          </div>

          {/* ── Dog Preferences ── */}
          <SectionHeading>Dog Preferences</SectionHeading>

          <div>
            <Label htmlFor="Preferences">If applicable, enter the name(s) of any dog(s) on our web site that interest you</Label>
            <textarea id="Preferences" name="Preferences" rows={2} className={tc} />
          </div>

          <p className="text-xs text-warm-500">If no selections are made then &quot;No Preference&quot; will be assumed.</p>

          <div className="grid gap-4 sm:grid-cols-3">
            <fieldset>
              <legend className="text-sm font-semibold text-warm-800">Age</legend>
              <div className="mt-2 space-y-2">
                <label className="flex items-center gap-2 text-sm text-warm-700">
                  <input type="checkbox" name="Age1" value="up to 6 years" className={chk} /> Up to 6 years
                </label>
                <label className="flex items-center gap-2 text-sm text-warm-700">
                  <input type="checkbox" name="Age2" value="6 years or older" className={chk} /> 6 years or older
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold text-warm-800">Sex</legend>
              <div className="mt-2 space-y-2">
                <label className="flex items-center gap-2 text-sm text-warm-700">
                  <input type="checkbox" name="Male" value="Male" className={chk} /> (Neutered) Male
                </label>
                <label className="flex items-center gap-2 text-sm text-warm-700">
                  <input type="checkbox" name="Female" value="Female" className={chk} /> (Spayed) Female
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold text-warm-800">Size</legend>
              <div className="mt-2 space-y-2">
                <label className="flex items-center gap-2 text-sm text-warm-700">
                  <input type="checkbox" name="-6_lbs" value="up to 6 lbs" className={chk} /> Up to 6 lbs
                </label>
                <label className="flex items-center gap-2 text-sm text-warm-700">
                  <input type="checkbox" name="6-10_lbs" value="up to 10 lbs" className={chk} /> 6 to 10 lbs
                </label>
                <label className="flex items-center gap-2 text-sm text-warm-700">
                  <input type="checkbox" name="+10_lbs" value="over 10 lbs" className={chk} /> Over 10 lbs
                </label>
              </div>
            </fieldset>
          </div>

          <fieldset>
            <Label required>Please consider me for an adoption of a Special Needs Dog</Label>
            <YesNo name="Special_Needs" required />
          </fieldset>

          <fieldset>
            <Label required>Please consider me for an adoption of a Senior Dog</Label>
            <YesNo name="Senior_Dog" required />
          </fieldset>

          <fieldset>
            <Label required>Are you willing to adopt an animal that has health problems?</Label>
            <YesNo name="Health_Problems" required onChange={setHealthProblems} />
          </fieldset>

          {healthProblems === "Yes" && (
            <div>
              <Label htmlFor="Health_Specifics">Is there any specific health problem(s) that will not be accepted?</Label>
              <textarea id="Health_Specifics" name="Health_Specifics" rows={2} className={tc} />
            </div>
          )}

          <div>
            <Label htmlFor="Specifics">Please list any other specifics that would help us match a Chihuahua</Label>
            <textarea id="Specifics" name="Specifics" rows={2} className={tc} />
          </div>

          {/* ── Agreements ── */}
          <SectionHeading>Spay/Neuter &amp; Legal Requirements</SectionHeading>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-warm-700">
            YCRAA will not be able to place a Chihuahua with you if you are looking to adopt an unaltered pet. All adult Chihuahuas are altered prior to placement. All puppies are required to be spayed or neutered at the adopter&apos;s expense. A Spay/Neuter Contract and Paid In Full receipt from their veterinarian will be required.
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-2.5 text-sm text-warm-700">
              <input type="checkbox" name="Neuter" value="Yes , I under stand Yankee Chihuahua Rescue does not place unaltered Chihuahuas. " required className={chk} />
              <span><span className="text-coral-500">* </span>Yes, I understand Yankee Chihuahua Rescue does not place unaltered Chihuahuas. I also understand Yankee Chihuahua Rescue does not place Chihuahuas in households with intact dogs.</span>
            </label>

            <label className="flex items-start gap-2.5 text-sm text-warm-700">
              <input type="checkbox" name="licensed" value="Yes , I under stand Yankee Chihuahua Rescue requires the dog be licensed and wear an ID at all times." required className={chk} />
              <span><span className="text-coral-500">* </span>Yes, I understand Yankee Chihuahua Rescue requires the dog be licensed and for it to wear an ID at all times.</span>
            </label>

            <label className="flex items-start gap-2.5 text-sm text-warm-700">
              <input type="checkbox" name="No_Longer_Keep" value="Yes I agree to contact YCR if I can no longer keep this dog." required className={chk} />
              <span><span className="text-coral-500">* </span>Yes, I agree to contact YCR if I can no longer keep this dog &mdash; to surrender it to YCR only.</span>
            </label>

            <label className="flex items-start gap-2.5 text-sm text-warm-700">
              <input type="checkbox" name="Home_Visit" value="Yes I will allow a representative of YCR to visit my home" required className={chk} />
              <span><span className="text-coral-500">* </span>Yes, I will permit a representative of YCR to visit my home.</span>
            </label>
            <p className="ml-7 text-xs text-warm-500">YCRAA cannot adopt to homes without a Home Visit.</p>
          </div>

          {/* ── Veterinary & References ── */}
          <SectionHeading>Veterinary &amp; Reference Information</SectionHeading>

          <p className="text-xs text-warm-500">The typical adoption fee is specified on the adoption page (includes microchip). This adoption fee helps defray the veterinary costs incurred for spaying/neutering, immunizations, heartworm and fecal testing, microchip and other medical needs.</p>

          <div>
            <Label htmlFor="Veterinarian" required>Name &amp; address of the veterinarian you&apos;ll use for this dog</Label>
            <input type="text" id="Veterinarian" name="Veterinarian" required className={ic} />
          </div>

          <div>
            <Label htmlFor="Veterinarian_Phone" required>Veterinarian Phone Number</Label>
            <input type="text" id="Veterinarian_Phone" name="Veterinarian_Phone" required className={ic} />
          </div>

          <p className="text-xs text-warm-500">Please remember to contact your Veterinarian to provide your stated approval for YCRAA to contact for reference.</p>

          <p className="text-xs text-warm-500">Personal Reference: If you have a dog that attends Doggie Day Care or a Dog Walker please provide their information. (Not required, but recommended.)</p>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="Reference">Reference / Business Name</Label>
              <input type="text" id="Reference" name="Reference" className={ic} />
            </div>
            <div>
              <Label htmlFor="ReferenceAddress">Address, City, State, Zip</Label>
              <input type="text" id="ReferenceAddress" name="ReferenceAddress" className={ic} />
            </div>
            <div>
              <Label htmlFor="ReferencePhone">Phone</Label>
              <input type="text" id="ReferencePhone" name="ReferencePhone" className={ic} />
            </div>
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

          <p className="text-xs font-semibold text-warm-600">Incomplete applications will not be considered. Please provide as much detail as possible.</p>

          {/* Submit */}
          <div className="flex items-center gap-4 pt-2">
            <button type="submit" disabled={submitting} className="inline-flex items-center rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600 disabled:opacity-50">
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
            <button type="reset" className="text-sm font-medium text-warm-500 hover:text-warm-700">Reset Form</button>
            <Link href="/adoption" className="text-sm font-medium text-warm-500 hover:text-warm-700">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
