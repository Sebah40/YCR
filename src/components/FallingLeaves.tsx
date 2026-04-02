"use client";

import { useTheme } from "@/components/ThemeProvider";
import {
  Clover,
  Flower2,
  Sun,
  Star,
  Moon,
  Leaf,
  Snowflake,
  Sparkles,
  Heart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ThemeId } from "@/lib/themes";

const iconMap: Record<string, LucideIcon> = {
  Clover,
  Egg: Flower2, // fallback since Egg may not exist
  Flower2,
  Sun,
  Star,
  Moon,
  Leaf,
  Snowflake,
  Sparkles,
  Heart,
};

const themeIconName: Record<ThemeId, string> = {
  "st-patricks": "Clover",
  easter: "Flower2",
  spring: "Flower2",
  summer: "Sun",
  "4th-of-july": "Star",
  halloween: "Moon",
  fall: "Leaf",
  thanksgiving: "Leaf",
  christmas: "Snowflake",
  "new-years": "Sparkles",
  valentines: "Heart",
};

const particles = [
  { id: 0, left: 5, delay: 0, duration: 14, size: 32, opacity: 0.1, drift: 25 },
  { id: 1, left: 15, delay: 3, duration: 16, size: 28, opacity: 0.09, drift: -20 },
  { id: 2, left: 25, delay: 7, duration: 12, size: 40, opacity: 0.12, drift: 35 },
  { id: 3, left: 35, delay: 1, duration: 18, size: 26, opacity: 0.08, drift: -15 },
  { id: 4, left: 45, delay: 5, duration: 13, size: 36, opacity: 0.11, drift: 20 },
  { id: 5, left: 55, delay: 2, duration: 15, size: 30, opacity: 0.1, drift: -30 },
  { id: 6, left: 65, delay: 6, duration: 17, size: 44, opacity: 0.13, drift: 15 },
  { id: 7, left: 75, delay: 4, duration: 11, size: 34, opacity: 0.09, drift: -25 },
  { id: 8, left: 85, delay: 1.5, duration: 14, size: 28, opacity: 0.1, drift: 30 },
  { id: 9, left: 92, delay: 5.5, duration: 16, size: 38, opacity: 0.12, drift: -10 },
  { id: 10, left: 10, delay: 4.5, duration: 13, size: 30, opacity: 0.08, drift: 18 },
  { id: 11, left: 50, delay: 7.5, duration: 15, size: 42, opacity: 0.11, drift: -22 },
];

export default function FallingLeaves() {
  const { themeId } = useTheme();
  const iconName = themeIconName[themeId] || "Clover";
  const Icon = iconMap[iconName] || Clover;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute -top-12"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            animationName: "fall",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          <Icon
            style={{
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDuration: `${3 + (p.id % 3)}s`,
              animationDelay: `${p.delay}s`,
              animationName: "sway",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDirection: "alternate",
              // @ts-expect-error CSS custom property for drift
              "--drift": `${p.drift}px`,
            }}
            className="text-warm-500"
            strokeWidth={1.5}
          />
        </div>
      ))}
    </div>
  );
}
