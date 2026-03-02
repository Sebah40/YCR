"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/Yankee-Chi-Logo-transparent.png"
            alt="Yankee Chihuahua Rescue logo"
            width={44}
            height={44}
            className="h-11 w-11"
          />
          <div className="hidden sm:block">
            <span className="text-lg font-bold text-warm-800">Yankee Chihuahua</span>
            <span className="block text-xs text-warm-500 -mt-1">Rescue & Adoption</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden xl:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium text-warm-700 transition-colors hover:bg-amber-50 hover:text-amber-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="ml-2">
            <a
              href="https://www.yankeechihuahuarescue.org/guest/index.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex whitespace-nowrap items-center gap-1.5 rounded-full border-2 border-amber-400 px-3 py-1.5 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-50"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Guest Book
            </a>
          </li>
          <li className="ml-1">
            <Link
              href="/adoption"
              className="rounded-full bg-coral-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-coral-600"
            >
              Adopt Today
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden rounded-lg p-2 text-warm-700 hover:bg-amber-50"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-amber-100 bg-white px-6 pb-4">
          <ul className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-warm-700 transition-colors hover:bg-amber-50 hover:text-amber-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="https://www.yankeechihuahuarescue.org/guest/index.php"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full border-2 border-amber-400 px-5 py-2.5 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-50"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
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
