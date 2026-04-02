"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

const stateOptions = ["ME", "NH", "VT", "MA", "CT", "RI"] as const;

const volunteerTypes = [
  { id: "Adoption_Interviews_HV", label: "Adoption interviews and home checks" },
  { id: "Adoption_Contact_Info", label: "Contact person and dissemination of adoption procedures to adoption applicants" },
  { id: "Volunteer_Contact_Info", label: "Contact person and dissemination of volunteer procedures to volunteering applicants" },
  { id: "Database", label: "Database maintenance" },
  { id: "EmergencyFostering", label: "Emergency, short term foster" },
  { id: "Fostering", label: "Fostering", checked: true, disabled: true },
  { id: "Fund-raising", label: "Fund-raising" },
  { id: "Booth", label: "Manning YCR booths at fairs and shows" },
  { id: "Contact_Shelters", label: "Resource contact for shelters and other rescue organizations" },
  { id: "Transportation", label: "Transportation of YCR dogs" },
  { id: "WebSite", label: "Website support" },
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

export default function FosterApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [previousVol, setPreviousVol] = useState("");
  const [homeType, setHomeType] = useState("");
  const [ownRent, setOwnRent] = useState("");
  const [walks, setWalks] = useState("");
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
          <p className="text-xl text-warm-700">Your foster home application has been submitted. A YCR volunteer will reach out to you with an update on the status of your application.</p>
          <Link href="/" className="mt-8 inline-flex items-center rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-600">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-b from-amber-50 to-cream px-6 pb-6 pt-12 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">Foster Home Application</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-warm-600">Yankee Chihuahua Rescue and Adoption, Inc (YCRAA)</p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-6 pb-16 pt-8">
        <p className="mb-6 text-sm text-warm-600">
          Please complete all required fields marked with <span className="text-coral-500">*</span>. Incomplete applications will not be considered.
        </p>

        <form action="https://formspree.io/f/volunteer@yankeechihuahuarescue.org" method="POST" onSubmit={handleSubmit} className="space-y-5">
          <input type="hidden" name="_subject" value="Foster Application" />

          {/* ── Personal Information ── */}
          <SectionHeading>Personal Information</SectionHeading>

          <div>
            <Label htmlFor="Name" required>First and Last Name</Label>
            <input type="text" id="Name" name="Name" required className={ic} />
          </div>

          <div>
            <Label htmlFor="Age_over_25" required>Your Age</Label>
            <p className="text-xs text-warm-500">You must be 25 years or older to foster an animal. A valid ID is required.</p>
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
            <p className="text-xs text-warm-500">We cannot foster dogs outside of these areas.</p>
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

          {/* ── Employment & Volunteer Interests ── */}
          <SectionHeading>Employment &amp; Volunteer Interests</SectionHeading>

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

          <fieldset>
            <legend className="text-sm font-semibold text-warm-800">What other types of work might you be interested in performing for YCR?</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {volunteerTypes.map((wt) => (
                <label key={wt.id} className="flex items-start gap-2.5 rounded-lg border border-warm-100 bg-white px-4 py-2.5 text-sm text-warm-700 transition-colors hover:border-amber-300 has-[:checked]:border-amber-400 has-[:checked]:bg-amber-50">
                  <input
                    type="checkbox"
                    name="VolunteerType"
                    id={wt.id}
                    value="Yes"
                    defaultChecked={wt.checked}
                    disabled={wt.disabled}
                    className="mt-0.5 h-4 w-4 rounded border-warm-300 text-amber-500 focus:ring-amber-300"
                  />
                  {wt.label}
                </label>
              ))}
            </div>
          </fieldset>

          {/* ── Rescue & Fostering Experience ── */}
          <SectionHeading>Rescue &amp; Fostering Experience</SectionHeading>

          <fieldset>
            <Label required>Are you now, or have you previously volunteered with a rescue group?</Label>
            <YesNo name="PreviousVolunteering" required onChange={setPreviousVol} />
          </fieldset>

          {previousVol === "Yes" && (
            <div>
              <Label htmlFor="Other_Rescue_Contact" required>Organization&apos;s name and contact information</Label>
              <input type="text" id="Other_Rescue_Contact" name="Other_Rescue_Contact" required className={ic} />
            </div>
          )}

          <fieldset>
            <Label required>Have you fostered previously?</Label>
            <YesNo name="fostered_previously" required />
          </fieldset>

          <div>
            <Label htmlFor="Why_Foster" required>Why do you want to foster a Chihuahua?</Label>
            <textarea id="Why_Foster" name="Why_Foster" required rows={3} className={tc} />
          </div>

          {/* ── Household ── */}
          <SectionHeading>Household</SectionHeading>

          <fieldset>
            <Label required>Does everyone in your household know that you are applying to foster a Chihuahua?</Label>
            <YesNo name="Everyone_Know" required />
          </fieldset>

          <fieldset>
            <Label required>Does every member of your household want to foster a dog?</Label>
            <YesNo name="Everyone_Want" required />
          </fieldset>

          <div>
            <Label htmlFor="Current_Pets" required>Describe any/all pets that are currently living with you (type/breed, age, sex, altered status, etc.)</Label>
            <textarea id="Current_Pets" name="Current_Pets" required rows={3} className={tc} />
          </div>

          <div>
            <Label htmlFor="Past_Pets" required>Please describe those pets that are no longer with you and why</Label>
            <textarea id="Past_Pets" name="Past_Pets" required rows={3} className={tc} />
          </div>

          <div>
            <Label htmlFor="Allergies" required>Does anyone in the household have allergies? (e.g. animal dander) List all.</Label>
            <input type="text" id="Allergies" name="Allergies" required className={ic} />
          </div>

          <div>
            <Label htmlFor="Adults" required>List all adults in household, including yourself, their ages and relationship to applicant (include all residents and housemates whether related or unrelated)</Label>
            <textarea id="Adults" name="Adults" required rows={3} className={tc} />
          </div>

          <div>
            <Label htmlFor="Children" required>List all children in household and their ages; if none please state &quot;none&quot;</Label>
            <textarea id="Children" name="Children" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Child_Supervision" required>How much adult supervision will the dog and child be provided?</Label>
            <textarea id="Child_Supervision" name="Child_Supervision" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Neighbor_Children" required>Do you have neighborhood children? How old are the neighbor&apos;s children?</Label>
            <textarea id="Neighbor_Children" name="Neighbor_Children" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Neighbor-Interaction" required>Will the dog have interaction with neighborhood children?</Label>
            <textarea id="Neighbor-Interaction" name="Neighbor-Interaction" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Visitor-Interaction" required>How much interaction will the dog have with visitors?</Label>
            <input type="text" id="Visitor-Interaction" name="Visitor-Interaction" required className={ic} />
          </div>

          <div>
            <Label htmlFor="activity_level" required>What is the level of activity in your household? (laid back, on the go, athletic)</Label>
            <input type="text" id="activity_level" name="activity_level" required className={ic} />
          </div>

          {/* ── Housing ── */}
          <SectionHeading>Housing Details</SectionHeading>

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

          <div>
            <Label htmlFor="Safety_Aspects" required>Is there any aspect of your home that a foster could affect? Are there any safety hazards? Please detail.</Label>
            <textarea id="Safety_Aspects" name="Safety_Aspects" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Yard" required>Is there a fenced yard? If so what type fencing and what size? What sort of outdoor area is there?</Label>
            <input type="text" id="Yard" name="Yard" required className={ic} />
          </div>

          {/* ── Dog Care ── */}
          <SectionHeading>Dog Care &amp; Management</SectionHeading>

          <div>
            <Label htmlFor="Night" required>Where will the dog sleep when you retire for the day?</Label>
            <textarea id="Night" name="Night" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Outside" required>How much time will the dog get to spend outside?</Label>
            <textarea id="Outside" name="Outside" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Alone" required>How many hours a day will the dog be left unattended? Where will they stay?</Label>
            <textarea id="Alone" name="Alone" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Vacation" required>How frequently will you be gone away from home on business, vacation, or trips?</Label>
            <textarea id="Vacation" name="Vacation" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Vacation_Plans" required>When you are away where will the dog be kept?</Label>
            <textarea id="Vacation_Plans" name="Vacation_Plans" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Long_Range_Plans" required>Are there currently any long range plans that will change your living situation within the next year?</Label>
            <textarea id="Long_Range_Plans" name="Long_Range_Plans" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Feed" required>What do you intend to feed the dog?</Label>
            <input type="text" id="Feed" name="Feed" required className={ic} />
          </div>

          {/* ── Training & Behavior ── */}
          <SectionHeading>Training &amp; Behavior</SectionHeading>

          <div>
            <Label htmlFor="HouseTraining" required>How will you house train the dog? Enter as much detail as possible.</Label>
            <textarea id="HouseTraining" name="HouseTraining" required rows={3} className={tc} />
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-warm-700">
            We crate train. It helps the dog adapt more quickly and with less stress when they find their forever homes.
          </div>

          <div>
            <Label htmlFor="Crate_Training" required>Are you familiar with crate training?</Label>
            <textarea id="Crate_Training" name="Crate_Training" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Safety" required>How will you ensure the safety of your foster dog?</Label>
            <textarea id="Safety" name="Safety" required rows={2} className={tc} />
          </div>

          <fieldset>
            <Label required>Are you willing to groom the animal and trim nails?</Label>
            <YesNo name="Groom" required />
          </fieldset>

          <div>
            <Label htmlFor="Behavior_Modification" required>Are you willing to work with a foster on obedience training or provide behavior modification?</Label>
            <input type="text" id="Behavior_Modification" name="Behavior_Modification" required className={ic} />
          </div>

          <fieldset>
            <Label required>Will you provide leashed walks?</Label>
            <YesNo name="Walks" required onChange={setWalks} />
          </fieldset>

          {walks === "No" && (
            <div>
              <Label htmlFor="Why_no_walks" required>Please explain</Label>
              <input type="text" id="Why_no_walks" name="Why_no_walks" required className={ic} />
            </div>
          )}

          <div>
            <Label htmlFor="Reinforce_Behavior" required>How would you encourage or reinforce the foster dog&apos;s appropriate (&quot;good&quot;) behavior?</Label>
            <textarea id="Reinforce_Behavior" name="Reinforce_Behavior" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Manage-Inappropriate_Behavior" required>How would you prevent, modify or manage the foster dog&apos;s inappropriate behavior?</Label>
            <textarea id="Manage-Inappropriate_Behavior" name="Manage-Inappropriate_Behavior" required rows={2} className={tc} />
          </div>

          {/* ── Transport & Commitment ── */}
          <SectionHeading>Transport &amp; Commitment</SectionHeading>

          <div>
            <Label htmlFor="Transport" required>Are you willing to travel to pick up a dog? How far are you willing to travel?</Label>
            <textarea id="Transport" name="Transport" required rows={2} className={tc} />
          </div>

          <div>
            <Label htmlFor="Length_of_Foster" required>Are you prepared to possibly keep the foster dog indefinitely &mdash; until the dog can be placed at an approved home?</Label>
            <input type="text" id="Length_of_Foster" name="Length_of_Foster" required className={ic} />
          </div>

          {/* ── Dog Preferences ── */}
          <SectionHeading>Dog Preferences</SectionHeading>

          <p className="text-xs text-warm-500">If no selections are made then &quot;No Preference&quot; will be assumed.</p>

          <div className="grid gap-4 sm:grid-cols-3">
            <fieldset>
              <legend className="text-sm font-semibold text-warm-800">Age</legend>
              <div className="mt-2 space-y-2">
                <label className="flex items-center gap-2 text-sm text-warm-700">
                  <input type="checkbox" name="Age1" value="up to 6 years" className="h-4 w-4 rounded border-warm-300 text-amber-500 focus:ring-amber-300" /> Up to 6 years
                </label>
                <label className="flex items-center gap-2 text-sm text-warm-700">
                  <input type="checkbox" name="Age2" value="6 years or older" className="h-4 w-4 rounded border-warm-300 text-amber-500 focus:ring-amber-300" /> 6 years or older
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold text-warm-800">Sex</legend>
              <div className="mt-2 space-y-2">
                <label className="flex items-center gap-2 text-sm text-warm-700">
                  <input type="checkbox" name="Male" value="Male" className="h-4 w-4 rounded border-warm-300 text-amber-500 focus:ring-amber-300" /> (Neutered) Male
                </label>
                <label className="flex items-center gap-2 text-sm text-warm-700">
                  <input type="checkbox" name="Female" value="Female" className="h-4 w-4 rounded border-warm-300 text-amber-500 focus:ring-amber-300" /> (Spayed) Female
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold text-warm-800">Size</legend>
              <div className="mt-2 space-y-2">
                <label className="flex items-center gap-2 text-sm text-warm-700">
                  <input type="checkbox" name="-6_lbs" value="up to 6 lbs" className="h-4 w-4 rounded border-warm-300 text-amber-500 focus:ring-amber-300" /> Up to 6 lbs
                </label>
                <label className="flex items-center gap-2 text-sm text-warm-700">
                  <input type="checkbox" name="6-10_lbs" value="up to 10 lbs" className="h-4 w-4 rounded border-warm-300 text-amber-500 focus:ring-amber-300" /> 6 to 10 lbs
                </label>
                <label className="flex items-center gap-2 text-sm text-warm-700">
                  <input type="checkbox" name="+10_lbs" value="over 10 lbs" className="h-4 w-4 rounded border-warm-300 text-amber-500 focus:ring-amber-300" /> Over 10 lbs
                </label>
              </div>
            </fieldset>
          </div>

          <fieldset>
            <Label required>Please consider me for fostering a Special Needs Dog</Label>
            <YesNo name="Special_Needs" required />
          </fieldset>

          <fieldset>
            <Label required>Please consider me for fostering a Senior Dog</Label>
            <YesNo name="Senior_Dog" required />
          </fieldset>

          <fieldset>
            <Label required>Are you willing to foster an animal that has health problems?</Label>
            <YesNo name="Health_Problems" required onChange={setHealthProblems} />
          </fieldset>

          {healthProblems === "Yes" && (
            <div>
              <Label htmlFor="Health_Specifics">Is there any specific health problem(s) that will not be accepted?</Label>
              <textarea id="Health_Specifics" name="Health_Specifics" rows={2} className={tc} />
            </div>
          )}

          {/* ── Home Visit & Agreements ── */}
          <SectionHeading>Home Visit &amp; Agreements</SectionHeading>

          <fieldset>
            <Label required>Will you allow a representative of YCR to visit your home?</Label>
            <YesNo name="Home_Visit" required />
          </fieldset>

          <div className="space-y-3">
            <label className="flex items-start gap-2.5 text-sm text-warm-700">
              <input type="checkbox" name="Approval_HomeCheck" value="Yes I Understand I must be approved." required className="mt-0.5 h-4 w-4 rounded border-warm-300 text-amber-500 focus:ring-amber-300" />
              <span><span className="text-coral-500">* </span>Yes, I understand I must be approved first and I will permit the required home check</span>
            </label>
            <label className="flex items-start gap-2.5 text-sm text-warm-700">
              <input type="checkbox" name="No_Adopt_first_Foster" value="Yes I Understand" required className="mt-0.5 h-4 w-4 rounded border-warm-300 text-amber-500 focus:ring-amber-300" />
              <span><span className="text-coral-500">* </span>Yes, I understand I cannot adopt my first Chihuahua foster</span>
            </label>
          </div>

          {/* ── Veterinary & References ── */}
          <SectionHeading>Veterinary &amp; Reference Information</SectionHeading>

          <div>
            <Label htmlFor="Veterinarian" required>Name &amp; address of the veterinarian you&apos;ll use for this dog</Label>
            <input type="text" id="Veterinarian" name="Veterinarian" required className={ic} />
          </div>

          <div>
            <Label htmlFor="Veterinarian_Phone" required>Veterinarian Phone Number</Label>
            <input type="text" id="Veterinarian_Phone" name="Veterinarian_Phone" required className={ic} />
          </div>

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
            <Label htmlFor="Comments">Where did you hear about us? Comments?</Label>
            <textarea id="Comments" name="Comments" rows={3} className={tc} />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4 pt-2">
            <button type="submit" disabled={submitting} className="inline-flex items-center rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600 disabled:opacity-50">
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
            <button type="reset" className="text-sm font-medium text-warm-500 hover:text-warm-700">Reset Form</button>
            <Link href="/volunteer" className="text-sm font-medium text-warm-500 hover:text-warm-700">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
