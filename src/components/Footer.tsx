import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-warm-800 text-warm-100">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/Yankee-Chi-Logo-transparent.png"
                alt="Yankee Chihuahua Rescue logo"
                width={44}
                height={44}
                className="h-11 w-11"
              />
              <div>
                <span className="text-lg font-bold text-white">Yankee Chihuahua</span>
                <span className="block text-xs text-warm-300 -mt-1">Rescue & Adoption</span>
              </div>
            </div>
            <p className="text-sm text-warm-300 leading-relaxed">
              A 501(c)(3) nonprofit charity serving the six New England states since 2000.
              All-volunteer organization dedicated to rescuing homeless Chihuahuas and mixes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-400">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/about", label: "About Us" },
                { href: "/chihuahua-info", label: "Chihuahua Info" },
                { href: "/volunteer", label: "Volunteer" },
                { href: "/adoption", label: "Adopt" },
                { href: "/surrender", label: "Surrender" },
                { href: "/happy-endings", label: "Happy Endings" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-300 transition-colors hover:text-amber-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-400">
              Get Involved
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/volunteer" className="text-sm text-warm-300 transition-colors hover:text-amber-400">
                  Become a Volunteer
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-sm text-warm-300 transition-colors hover:text-amber-400">
                  Foster a Chihuahua
                </Link>
              </li>
              <li>
                <Link href="/adoption" className="text-sm text-warm-300 transition-colors hover:text-amber-400">
                  Adopt a Chihuahua
                </Link>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/groups/YankeeChihuahua/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-warm-300 transition-colors hover:text-amber-400"
                >
                  Facebook Community
                </a>
              </li>
            </ul>
            <a
              href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=S69AP6GHFKRUS"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/scraped/images/paypal-donate/paypal-donate.png"
                alt="Donate via PayPal"
                width={120}
                height={80}
                className="h-auto w-28"
              />
            </a>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-400">
              Contact Us
            </h3>
            <ul className="space-y-2.5 text-sm text-warm-300">
              <li>
                <a href="mailto:info@yankeechihuahuarescue.org" className="transition-colors hover:text-amber-400">
                  info@yankeechihuahuarescue.org
                </a>
              </li>
              <li>
                <a href="mailto:volunteer@yankeechihuahuarescue.org" className="transition-colors hover:text-amber-400">
                  volunteer@yankeechihuahuarescue.org
                </a>
              </li>
              <li className="pt-2 text-warm-400">
                Serving CT, MA, ME, NH, RI & VT
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-warm-700 pt-8 text-center">
          <p className="text-sm text-warm-400">
            &copy; {new Date().getFullYear()} Yankee Chihuahua Rescue and Adoption, Inc. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-warm-500 italic">
            &ldquo;If you want the best seat in the house, you&apos;ve got to move the Chihuahua.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
