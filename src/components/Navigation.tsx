"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/chihuahua-info", label: "Chi Info" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/adoption", label: "Adoption" },
  { href: "/surrender", label: "Surrender" },
  { href: "/happy-endings", label: "Happy Endings" },
  { href: "/events", label: "Events" },
  { href: "/donate", label: "Donate" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/Yankee-Chi-Logo-transparent.png"
            alt="Yankee Chihuahua Rescue logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <div className="hidden sm:block">
            <span className="text-base font-semibold text-warm-800">
              Yankee Chihuahua
            </span>
            <span className="-mt-0.5 block text-[11px] font-medium tracking-wide text-warm-400">
              Rescue & Adoption
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="whitespace-nowrap rounded-lg px-3 py-2 text-[13px] font-medium text-warm-600 transition-colors hover:bg-warm-50 hover:text-warm-800"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="ml-3">
            <a
              href="https://www.yankeechihuahuarescue.org/guest/index.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex whitespace-nowrap items-center gap-1.5 rounded-full border border-warm-200 px-3.5 py-1.5 text-[13px] font-medium text-warm-600 transition-colors hover:border-warm-300 hover:text-warm-800"
            >
              <BookOpen className="h-3.5 w-3.5" strokeWidth={2} />
              Guest Book
            </a>
          </li>
          <li className="ml-2">
            <Link
              href="/adoption"
              className="rounded-full bg-coral-500 px-5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-coral-600"
            >
              Adopt Today
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden rounded-lg p-2 text-warm-600 hover:bg-warm-50"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" strokeWidth={2} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={2} />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-warm-100 bg-white px-6 pb-5">
          <ul className="flex flex-col gap-0.5 pt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-warm-600 transition-colors hover:bg-warm-50 hover:text-warm-800"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-3">
              <a
                href="https://www.yankeechihuahuarescue.org/guest/index.php"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full border border-warm-200 px-5 py-2.5 text-sm font-medium text-warm-600 transition-colors hover:border-warm-300"
              >
                <BookOpen className="h-4 w-4" strokeWidth={2} />
                Guest Book
              </a>
            </li>
            <li className="mt-2">
              <Link
                href="/adoption"
                onClick={() => setMobileOpen(false)}
                className="block rounded-full bg-coral-500 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-coral-600"
              >
                Adopt Today
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
