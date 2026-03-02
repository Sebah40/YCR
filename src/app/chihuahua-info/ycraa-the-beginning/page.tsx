import Link from "next/link";

export const metadata = { title: "YCRAA - The Beginning" };

export default function YcraaTheBeginningPage() {
  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-b from-amber-100 to-cream px-6 pb-8 pt-14 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">
            YCRAA - The Beginning
          </h1>
          <p className="mt-4 text-warm-500">
            By Corinne Joly, one of YCR&apos;s original founders
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-24">
        <article className="py-10">
          <div className="space-y-6 text-base leading-relaxed text-warm-700">
            <p>
              When I moved to New Ipswich, NH at the end of 1998, I contacted CRT (Chihuahua
              Rescue and Transport) about volunteering. There were so few CRT New England
              volunteers that a member of Northeast Rottweiler Rescue did my home visit. In
              retrospect, I think that the person who does home visits should have experience
              with the breed that they are qualifying the applicant to adopt/foster. There are
              myriad differences between the needs of a Chihuahua and a Rottweiler.
            </p>

            <p>
              However, we were approved and I soon had my first &ldquo;foster.&rdquo; She was an
              ancient little girl, with a huge hernia and a severe heart murmur, who had
              obviously been bred for years and then dumped in downtown Springfield, MA. CRT
              approved her medical needs and she spent the rest of her life as a much loved
              member of our family.
            </p>

            <p>
              This was not what I had expected when I volunteered; but I soon found that I was
              doing a lot of transports, pulling dogs from shelters, fostering, home visits, and
              placements. I was in constant contact with another New England volunteer, and since
              she didn&apos;t drive much, she was primarily the &ldquo;paperwork&rdquo; person,
              while I was more hands on.
            </p>

            <p>
              Soon we started talking about going &ldquo;on our own&rdquo; since CRT seemed to
              be focused primarily on the Southern US. I would be the New England Coordinator and
              we chose the name Yankee Chihuahua Rescue and Adoption. Soon however, I was a
              Co-President with Terri Wakefield of Maine.
            </p>

            <p>
              It was always about the dogs for me. We applied for our non-profit status, kept
              track of donations and expenses, and worked hard at placing dogs in the right
              homes. I took care of medical expenses for the dogs I fostered, and considered it a
              donation. I usually did the home visits for my foster dogs, or at least had the
              final say on who adopted them. As the group got larger, we experienced the usual
              growing pains. Occasional members left because of divergent philosophies. Some
              volunteers became attached to, and kept, their first fosters and then were no
              longer available to foster for the group. I often took multiple fosters, but still
              there were some worthy little ones that we just couldn&apos;t save. I had to step
              down as a YCRAA board member because of serious medical issues, but remained a
              member. When I could, I still did Home Visits, and occasionally fostered and placed
              dogs. I stayed in touch over the years and was saddened when it looked as though
              YCRAA might cease to exist early in 2008. I am happy to know that it is being
              reborn, and that the group will continue to help many more little Chihuahuas to
              have a bright future.
            </p>
          </div>
        </article>

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
