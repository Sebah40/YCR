import type { MetadataRoute } from "next";

const SITE_URL = "https://www.yankeechihuahuarescue.org";

// All public, non-form pages on the site. Form-submission pages
// (/*/apply, /*/intake, /guestbook/sign) are intentionally excluded —
// crawlers shouldn't index them as standalone landing pages.
const PATHS: Array<{ path: string; priority: number; changeFreq: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "/", priority: 1.0, changeFreq: "weekly" },
  { path: "/about", priority: 0.9, changeFreq: "monthly" },
  { path: "/adoption", priority: 0.95, changeFreq: "weekly" },
  { path: "/surrender", priority: 0.8, changeFreq: "monthly" },
  { path: "/volunteer", priority: 0.85, changeFreq: "monthly" },
  { path: "/events", priority: 0.7, changeFreq: "weekly" },
  { path: "/happy-endings", priority: 0.8, changeFreq: "monthly" },
  { path: "/donate", priority: 0.7, changeFreq: "monthly" },
  { path: "/guestbook", priority: 0.7, changeFreq: "weekly" },
  { path: "/chihuahua-info", priority: 0.8, changeFreq: "monthly" },
  { path: "/chihuahua-info/the-chihuahua", priority: 0.6, changeFreq: "yearly" },
  { path: "/chihuahua-info/breed-standard", priority: 0.6, changeFreq: "yearly" },
  { path: "/chihuahua-info/versatile-chihuahua", priority: 0.6, changeFreq: "yearly" },
  { path: "/chihuahua-info/bill-of-rights", priority: 0.6, changeFreq: "yearly" },
  { path: "/chihuahua-info/teacup-chihuahuas", priority: 0.6, changeFreq: "yearly" },
  { path: "/chihuahua-info/famous-chihuahuas", priority: 0.5, changeFreq: "yearly" },
  { path: "/chihuahua-info/ycraa-the-beginning", priority: 0.5, changeFreq: "yearly" },
  { path: "/chihuahua-info/volunteering-by-cheryl", priority: 0.5, changeFreq: "yearly" },
  { path: "/chihuahua-info/tips-for-new-adopters", priority: 0.7, changeFreq: "yearly" },
  { path: "/chihuahua-info/responsible-pet-parent", priority: 0.6, changeFreq: "yearly" },
  { path: "/chihuahua-info/benefits-of-neutering", priority: 0.6, changeFreq: "yearly" },
  { path: "/chihuahua-info/why-no-intact-animals", priority: 0.5, changeFreq: "yearly" },
  { path: "/chihuahua-info/chihuahua-treats", priority: 0.6, changeFreq: "yearly" },
  { path: "/chihuahua-info/chocolate-poisoning", priority: 0.6, changeFreq: "yearly" },
  { path: "/chihuahua-info/crate-training", priority: 0.6, changeFreq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Use a stable lastModified per build so re-deploys don't churn the dates.
  const lastModified = new Date();
  return PATHS.map(({ path, priority, changeFreq }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: changeFreq,
    priority,
  }));
}
