"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import type { ThemeId } from "@/lib/themes";

interface FrameConfig {
  left?: string;
  right?: string;
  // A horizontal strip hung directly under the top nav (winter icicles / christmas lights).
  icicles?: string;
}

// Themes with decorative edge borders and/or a strip strung under the nav.
const FRAMES: Partial<Record<ThemeId, FrameConfig>> = {
  fall: {
    left: "/images/scraped/images/seasons/fall/fall-leaves1-falling-blowing.gif",
    right: "/images/scraped/images/seasons/fall/fall-leaves1-falling-blowing2.gif",
  },
  winter: {
    left: "/images/scraped/images/seasons/winter/winter-snowborder-left.gif",
    right: "/images/scraped/images/seasons/winter/winter-snowborder-right.gif",
    icicles: "/images/scraped/images/seasons/winter/winter-hangingicicles.gif",
  },
  christmas: {
    // Lights strung under the top menu; no side rails.
    icicles: "/images/scraped/images/holidays/christmas/christmas-lights.png",
  },
  valentines: {
    left: "/images/scraped/images/holidays/valentines/valentineborderleft.png",
    right: "/images/scraped/images/holidays/valentines/valentineborderright.png",
  },
};

export default function SeasonalBorders() {
  const { themeId } = useTheme();
  const frame = FRAMES[themeId];
  const [navHeight, setNavHeight] = useState(64);

  // Keep the icicles pinned just under the sticky header, whatever its height.
  useEffect(() => {
    if (!frame?.icicles) return;
    const header = document.querySelector("header");
    if (!header) return;
    const update = () => setNavHeight(header.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, [frame?.icicles]);

  if (!frame) return null;

  return (
    <div className="seasonal-frame" aria-hidden="true">
      {frame.left && (
        <div
          className="seasonal-rail seasonal-rail--left"
          style={{ backgroundImage: `url('${frame.left}')` }}
        />
      )}
      {frame.right && (
        <div
          className="seasonal-rail seasonal-rail--right"
          style={{ backgroundImage: `url('${frame.right}')` }}
        />
      )}
      {frame.icicles && (
        <div
          className="seasonal-icicles"
          style={{ top: navHeight, backgroundImage: `url('${frame.icicles}')` }}
        />
      )}
    </div>
  );
}
