"use client";

import Image from "next/image";
import HeroLogo from "@/components/HeroLogo";
import { useTheme } from "@/components/ThemeProvider";
import type { ThemeId } from "@/lib/themes";

interface FlankImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
}

interface Flank {
  left?: FlankImage;
  right?: FlankImage;
}

// Graduation Chihuahuas keep their original portrait footprint.
const GRAD_CLASS = "h-auto w-16 sm:w-24 md:w-28";
// Themed hero images are sized to match the Yankee Chihuahua heart logo's HEIGHT.
// The logo is 212x171 at w-36 / sm:w-44 / lg:w-48 -> ~116 / 142 / 155px tall.
const LOGO_HEIGHT_CLASS = "h-[116px] w-auto sm:h-[142px] lg:h-[155px]";
// Slightly larger, for text-heavy images that need to stay readable.
const LOGO_HEIGHT_LG = "h-[135px] w-auto sm:h-[165px] lg:h-[180px]";

// Default hero: the two graduation Chihuahuas flanking the Yankee Chihuahua logo.
const DEFAULT_FLANK: Flank = {
  left: {
    src: "/images/scraped/images/seasons/graduation/gradchicoolglasses.png",
    alt: "Graduation Chihuahua with cool glasses",
    width: 160,
    height: 160,
    className: GRAD_CLASS,
  },
  right: {
    src: "/images/scraped/images/seasons/graduation/gradchistud.png",
    alt: "Graduation Chihuahua stud",
    width: 160,
    height: 240,
    className: GRAD_CLASS,
  },
};

// Themes that replace the grad Chihuahuas with their own image(s) flanking the
// logo. Each themed image is sized to the logo's height and centered as a group.
const FLANK_BY_THEME: Partial<Record<ThemeId, Flank>> = {
  fall: {
    right: {
      src: "/images/scraped/images/seasons/fall/chihuahua-word-cloud.png",
      alt: "Chihuahua word cloud",
      width: 494,
      height: 181,
      className: LOGO_HEIGHT_CLASS,
    },
  },
  winter: {
    right: {
      src: "/images/scraped/images/seasons/winter/winter-trees.png",
      alt: "Snowy winter trees",
      width: 250,
      height: 142,
      className: LOGO_HEIGHT_CLASS,
    },
  },
  christmas: {
    right: {
      src: "/images/scraped/images/holidays/christmas/ornaments.png",
      alt: "Christmas ornaments",
      width: 232,
      height: 137,
      className: LOGO_HEIGHT_CLASS,
    },
  },
  valentines: {
    left: {
      src: "/images/scraped/images/holidays/valentines/red-heart-icon.png",
      alt: "Red heart",
      width: 113,
      height: 108,
      className: LOGO_HEIGHT_CLASS,
    },
    right: {
      src: "/images/scraped/images/holidays/valentines/red-heart-icon.png",
      alt: "Red heart",
      width: 113,
      height: 108,
      className: LOGO_HEIGHT_CLASS,
    },
  },
  "4th-of-july": {
    left: {
      src: "/images/scraped/images/holidays/july-4/july4-chi-warning1.jpg",
      alt: "July 4th pet safety warning",
      width: 394,
      height: 381,
      className: LOGO_HEIGHT_LG,
    },
    right: {
      src: "/images/scraped/images/holidays/july-4/july4-chi-warning2.jpg",
      alt: "July 4th pet safety warning",
      width: 368,
      height: 368,
      className: LOGO_HEIGHT_LG,
    },
  },
  "new-years": {
    right: {
      src: "/images/scraped/images/holidays/new-year/hnybanner.jpg",
      alt: "Happy New Year banner",
      width: 612,
      height: 175,
      className: LOGO_HEIGHT_CLASS,
    },
  },
};

export default function HeroBanner() {
  const { themeId } = useTheme();
  const flank = FLANK_BY_THEME[themeId] ?? DEFAULT_FLANK;

  return (
    <div className="flex items-center justify-center gap-6 pb-3 sm:gap-12 lg:gap-16">
      {flank.left && (
        <Image
          src={flank.left.src}
          alt={flank.left.alt}
          width={flank.left.width}
          height={flank.left.height}
          className={flank.left.className}
        />
      )}
      <HeroLogo />
      {flank.right && (
        <Image
          src={flank.right.src}
          alt={flank.right.alt}
          width={flank.right.width}
          height={flank.right.height}
          className={flank.right.className}
        />
      )}
    </div>
  );
}
