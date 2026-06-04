import type { NextConfig } from "next";

// Permanent (301) redirects from the legacy PHP-era URL scheme to the new
// Next.js routes. Google's index, bookmarks, Facebook posts and external
// directories all still point at /index.html, /m-about.html, /i-thechi.html,
// etc. Without these the new site returns 404 for any of those paths.
const LEGACY_REDIRECTS: Array<{ source: string; destination: string }> = [
  // Main pages
  { source: "/index.html", destination: "/" },
  { source: "/index.htm", destination: "/" },
  { source: "/m-about.html", destination: "/about" },
  { source: "/m-adopt.html", destination: "/adoption" },
  { source: "/m-info.html", destination: "/chihuahua-info" },
  { source: "/m-surrender.html", destination: "/surrender" },
  { source: "/m-volunteer.html", destination: "/volunteer" },
  { source: "/events.html", destination: "/events" },
  { source: "/happydogs/reconstruction.html", destination: "/happy-endings" },

  // Donate / iGive (both old extensions)
  { source: "/i-give.html", destination: "/donate" },
  { source: "/i-give.htm", destination: "/donate" },

  // Chihuahua Info articles
  { source: "/i-thechi.html", destination: "/chihuahua-info/the-chihuahua" },
  { source: "/i-standard.html", destination: "/chihuahua-info/breed-standard" },
  { source: "/i-jobs.html", destination: "/chihuahua-info/versatile-chihuahua" },
  { source: "/i-rights.html", destination: "/chihuahua-info/bill-of-rights" },
  { source: "/i-teacup.html", destination: "/chihuahua-info/teacup-chihuahuas" },
  { source: "/i-famous.html", destination: "/chihuahua-info/famous-chihuahuas" },
  { source: "/v-start.html", destination: "/chihuahua-info/ycraa-the-beginning" },
  { source: "/v-cher.html", destination: "/chihuahua-info/volunteering-by-cheryl" },
  { source: "/i-tips.html", destination: "/chihuahua-info/tips-for-new-adopters" },
  { source: "/i-responsible.html", destination: "/chihuahua-info/responsible-pet-parent" },
  { source: "/i-neutering.html", destination: "/chihuahua-info/benefits-of-neutering" },
  { source: "/i-why.html", destination: "/chihuahua-info/why-no-intact-animals" },
  { source: "/i-treats.html", destination: "/chihuahua-info/chihuahua-treats" },
  { source: "/i-tre-choc.html", destination: "/chihuahua-info/chocolate-poisoning" },
  { source: "/i-cratetraining.html", destination: "/chihuahua-info/crate-training" },

  // Form pages — the four Formspree-backed forms moved to /adoption/apply,
  // /volunteer/apply, /volunteer/foster, /surrender/intake.
  { source: "/form/appi-adoption-formspree.html", destination: "/adoption/apply" },
  { source: "/form/appi-adoption-formspreeCAPTCHA.html", destination: "/adoption/apply" },
  { source: "/form/appi-volunteer-formspree.html", destination: "/volunteer/apply" },
  { source: "/form/appi-foster-formspree.html", destination: "/volunteer/foster" },
  { source: "/form/appi-intake-formspree.html", destination: "/surrender/intake" },

  // Guest book — old PHP guest book lived at /guest/. Any path under there
  // now lands on the new guest book.
  { source: "/guest/index.php", destination: "/guestbook" },
  { source: "/guest", destination: "/guestbook" },
  { source: "/guest/:path*", destination: "/guestbook" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return LEGACY_REDIRECTS.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true, // 301 — tells crawlers to update their index
    }));
  },
};

export default nextConfig;
