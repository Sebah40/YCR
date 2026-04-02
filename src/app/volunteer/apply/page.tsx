"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

const states = ["ME", "NH", "VT", "MA", "CT", "RI"] as const;

const workTypes = [
  { name: "Adoption_Interviews_HV", label: "Adoption interviews and home checks" },
  { name: "Adoption_Contact_Info", label: "Contact person and dissemination of adoption procedures to adoption applicants" },
  { name: "Volunteer_Contact_Info", label: "Contact person and dissemination of volunteer procedures to new applicants" },
  { name: "Database", label: "Database maintenance" },
  { name: "Fund-raising", label: "Fund-raising" },
  { name: "Booth", label: "Manning YCR booth at fairs and shows" },
  { name: "Contact_Shelters", label: "Resource contact for shelters and other rescue organizations" },
  { name: "Transportation", label: "Transportation of YCR dogs" },
  { name: "WebSite", label: "Web site support" },
];

const inputClass =
  "mt-1.5 block w-full rounded-lg border border-warm-200 bg-white px-4 py-2.5 text-warm-800 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200";

export default function VolunteerApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [previousVolunteer, setPreviousVolunteer] = useState("");

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
            <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">
              Thank You!
            </h1>
          </div>
        </section>
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <p className="text-xl text-warm-700">
            Your volunteer application has been submitted. We&apos;ll be in touch soon!
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-b from-amber-50 to-cream px-6 pb-6 pt-12 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">
            Volunteer Application
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-warm-600">
            Yankee Chihuahua Rescue and Adoption, Inc (YCRAA)
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-6 pb-16 pt-8">
        <p className="mb-8 text-sm text-warm-600">
          Please complete all required fields marked with{" "}
          <span className="text-coral-500">*</span>
        </p>

        <form
          action="https://formspree.io/f/volunteer@yankeechihuahuarescue.org"
          method="POST"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <input type="hidden" name="_subject" value="Volunteer Application" />

          {/* Name */}
          <div>
            <label htmlFor="Name" className="block text-sm font-semibold text-warm-800">
              First and Last Name <span className="text-coral-500">*</span>
            </label>
            <input type="text" id="Name" name="Name" required className={inputClass} />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="Address" className="block text-sm font-semibold text-warm-800">
              Home Street Address <span className="text-coral-500">*</span>
            </label>
            <input type="text" id="Address" name="Address" required className={inputClass} />
          </div>

          {/* City, Zip */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="TownCity" className="block text-sm font-semibold text-warm-800">
                City/Town <span className="text-coral-500">*</span>
              </label>
              <input type="text" id="TownCity" name="TownCity" required className={inputClass} />
            </div>
            <div>
              <label htmlFor="ZipPostalCode" className="block text-sm font-semibold text-warm-800">
                Zip Code <span className="text-coral-500">*</span>
              </label>
              <input
                type="text"
                id="ZipPostalCode"
                name="ZipPostalCode"
                required
                pattern="[0-9]{5,6}"
                maxLength={6}
                className={inputClass}
              />
            </div>
          </div>

          {/* State - radio buttons */}
          <fieldset>
            <legend className="text-sm font-semibold text-warm-800">
              State <span className="text-coral-500">*</span>
            </legend>
            <div className="mt-2 flex flex-wrap gap-4">
              {states.map((st) => (
                <label key={st} className="flex items-center gap-1.5 text-sm text-warm-700">
                  <input
                    type="radio"
                    name="State"
                    value={st}
                    required
                    className="h-4 w-4 border-warm-300 text-amber-500 focus:ring-amber-300"
                  />
                  {st}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Mailing Address */}
          <div>
            <label htmlFor="Mailing" className="block text-sm font-semibold text-warm-800">
              Mailing Address <span className="text-xs font-normal text-warm-500">(if different)</span>
            </label>
            <textarea id="Mailing" name="Mailing" rows={2} className={inputClass} />
          </div>

          {/* Phones + best time */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="PrimaryPhone" className="block text-sm font-semibold text-warm-800">
                Primary Phone <span className="text-coral-500">*</span>
              </label>
              <input
                type="tel"
                id="PrimaryPhone"
                name="PrimaryPhone"
                required
                placeholder="1234567890"
                pattern="[0-9]{10}"
                maxLength={10}
                title="Enter 10 digits, numbers only"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="SecondaryPhone" className="block text-sm font-semibold text-warm-800">
                Secondary Phone
              </label>
              <input
                type="tel"
                id="SecondaryPhone"
                name="SecondaryPhone"
                pattern="[0-9]{10}"
                maxLength={10}
                title="Enter 10 digits, numbers only"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="Call_Time" className="block text-sm font-semibold text-warm-800">
                Best time to call
              </label>
              <input type="text" id="Call_Time" name="Call_Time" maxLength={10} className={inputClass} />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="Email" className="block text-sm font-semibold text-warm-800">
              Email Address <span className="text-coral-500">*</span>
            </label>
            <input type="email" id="Email" name="Email" required className={inputClass} />
          </div>

          {/* Occupation and hours */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="Occupation" className="block text-sm font-semibold text-warm-800">
                Occupation <span className="text-coral-500">*</span>
              </label>
              <input type="text" id="Occupation" name="Occupation" required className={inputClass} />
            </div>
            <div>
              <label htmlFor="Hours-Work" className="block text-sm font-semibold text-warm-800">
                Hours worked outside home/week <span className="text-coral-500">*</span>
              </label>
              <input type="text" id="Hours-Work" name="Hours-Work" required maxLength={5} className={inputClass} />
            </div>
          </div>

          {/* Types of work */}
          <fieldset>
            <legend className="text-sm font-semibold text-warm-800">
              What types of work are you interested in performing for YCR?
            </legend>
            <p className="mt-1 text-xs text-warm-500">
              If interested in fostering, please also complete the{" "}
              <Link href="/volunteer/foster" className="text-coral-600 underline">
                Foster Home Application form
              </Link>.
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {workTypes.map((wt) => (
                <label
                  key={wt.name}
                  className="flex items-start gap-2.5 rounded-lg border border-warm-100 bg-white px-4 py-2.5 text-sm text-warm-700 transition-colors hover:border-amber-300 has-[:checked]:border-amber-400 has-[:checked]:bg-amber-50"
                >
                  <input
                    type="checkbox"
                    name={wt.name}
                    value="Yes"
                    className="mt-0.5 h-4 w-4 rounded border-warm-300 text-amber-500 focus:ring-amber-300"
                  />
                  {wt.label}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Previous volunteer experience */}
          <fieldset>
            <legend className="text-sm font-semibold text-warm-800">
              Previous volunteer experience with animal rescue? <span className="text-coral-500">*</span>
            </legend>
            <div className="mt-2 flex gap-6">
              <label className="flex items-center gap-2 text-sm text-warm-700">
                <input
                  type="radio"
                  name="PreviousVolunteering"
                  value="No"
                  required
                  onChange={(e) => setPreviousVolunteer(e.target.value)}
                  className="h-4 w-4 border-warm-300 text-amber-500 focus:ring-amber-300"
                />
                No
              </label>
              <label className="flex items-center gap-2 text-sm text-warm-700">
                <input
                  type="radio"
                  name="PreviousVolunteering"
                  value="Yes"
                  onChange={(e) => setPreviousVolunteer(e.target.value)}
                  className="h-4 w-4 border-warm-300 text-amber-500 focus:ring-amber-300"
                />
                Yes
              </label>
            </div>
          </fieldset>

          {/* Previous org details (conditional) */}
          {previousVolunteer === "Yes" && (
            <div>
              <label htmlFor="Other_Rescue_Contact" className="block text-sm font-semibold text-warm-800">
                Organization name and details <span className="text-coral-500">*</span>
              </label>
              <input
                type="text"
                id="Other_Rescue_Contact"
                name="Other_Rescue_Contact"
                required
                className={inputClass}
              />
            </div>
          )}

          {/* Signature */}
          <div>
            <label htmlFor="Signature" className="block text-sm font-semibold text-warm-800">
              E-Signature (type full name) <span className="text-coral-500">*</span>
            </label>
            <input
              type="text"
              id="Signature"
              name="Signature"
              required
              className={`${inputClass} font-serif italic`}
            />
          </div>

          {/* Comments */}
          <div>
            <label htmlFor="Comments" className="block text-sm font-semibold text-warm-800">
              Where did you hear about us? / Comments
            </label>
            <textarea id="Comments" name="Comments" rows={3} className={inputClass} />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
            <button
              type="reset"
              className="text-sm font-medium text-warm-500 hover:text-warm-700"
            >
              Reset Form
            </button>
            <Link
              href="/volunteer"
              className="text-sm font-medium text-warm-500 hover:text-warm-700"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
