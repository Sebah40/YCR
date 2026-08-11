import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SeasonalBorders from "@/components/SeasonalBorders";
import VisitorTracker from "@/components/VisitorTracker";
import ThemeProvider from "@/components/ThemeProvider";
import { getTheme } from "@/lib/theme-store";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://www.yankeechihuahuarescue.org";
const OG_IMAGE = `${SITE_URL}/images/Yankee-Chi-Logo-transparent.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yankee Chihuahua Rescue & Adoption",
    template: "%s | Yankee Chihuahua Rescue",
  },
  description:
    "A 501(c)(3) nonprofit rescuing homeless Chihuahuas and mixes across New England since 2000. Adopt, volunteer, or donate today.",
  keywords: [
    "Chihuahua rescue",
    "Chihuahua adoption",
    "New England dog rescue",
    "YCRAA",
    "501(c)(3) animal rescue",
    "foster Chihuahua",
    "Yankee Chihuahua Rescue",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Yankee Chihuahua Rescue & Adoption",
    description:
      "A 501(c)(3) nonprofit rescuing homeless Chihuahuas across New England since 2000. Adopt, foster, volunteer, or donate today.",
    siteName: "Yankee Chihuahua Rescue & Adoption",
    images: [
      {
        url: OG_IMAGE,
        width: 212,
        height: 171,
        alt: "Yankee Chihuahua Rescue logo",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Yankee Chihuahua Rescue & Adoption",
    description:
      "Rescuing homeless Chihuahuas across New England since 2000. Adopt, foster, volunteer, or donate.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": ["NGO", "AnimalShelter"],
  name: "Yankee Chihuahua Rescue and Adoption, Inc.",
  alternateName: "YCRAA",
  url: SITE_URL,
  logo: OG_IMAGE,
  description:
    "A 501(c)(3) public-charity nonprofit founded in 2000, dedicated to rescuing homeless Chihuahuas and Chihuahua mixes across the six New England states.",
  foundingDate: "2000",
  areaServed: [
    { "@type": "State", name: "Connecticut" },
    { "@type": "State", name: "Maine" },
    { "@type": "State", name: "Massachusetts" },
    { "@type": "State", name: "New Hampshire" },
    { "@type": "State", name: "Rhode Island" },
    { "@type": "State", name: "Vermont" },
  ],
  knowsAbout: ["Chihuahua adoption", "Chihuahua fostering", "dog rescue"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "general inquiries",
      email: "info@yankeechihuahuarescue.org",
      areaServed: "US-NE",
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      contactType: "volunteer inquiries",
      email: "volunteer@yankeechihuahuarescue.org",
      areaServed: "US-NE",
      availableLanguage: ["English"],
    },
  ],
  sameAs: ["https://www.facebook.com/groups/YankeeChihuahua/"],
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          // The JSON is built from a typed object at build time; safe to inline.
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider initialTheme={theme}>
          <VisitorTracker />
          <Navigation />
          <SeasonalBorders />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
