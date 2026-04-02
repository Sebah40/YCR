export type ThemeId =
  | "st-patricks"
  | "easter"
  | "spring"
  | "summer"
  | "4th-of-july"
  | "halloween"
  | "fall"
  | "thanksgiving"
  | "christmas"
  | "new-years"
  | "valentines";

export interface ThemeColors {
  warm: Record<string, string>;
  coral: Record<string, string>;
  amber: Record<string, string>;
  cream: string;
  creamDark: string;
}

export interface SeasonalImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type DecorativeSlot =
  | "about-float"
  | "about-quote"
  | "volunteer-aside"
  | "events-hero"
  | "adoption-aside"
  | "chiinfo-breed"
  | "chiinfo-articles"
  | "surrender-top"
  | "surrender-mid";

export interface DecorativeImage {
  src: string;
  alt: string;
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  icon: string; // lucide icon name
  preview: string; // primary color for UI preview
  colors: ThemeColors;
  seasonalImages: SeasonalImage[];
  decorativeImages: Record<DecorativeSlot, DecorativeImage>;
}

// Default decorative images (St. Patrick's) used by themes that don't have their own
const defaultDecorativeImages: Record<DecorativeSlot, DecorativeImage> = {
  "about-float": { src: "/images/scraped/images/holidays/st-patrick/chi-st-patrick-lucky-charm.png", alt: "Chihuahua - Lucky Charm" },
  "about-quote": { src: "/images/scraped/images/holidays/st-patrick/chi-st-patrick-lucky-dog.gif", alt: "Lucky Dog" },
  "volunteer-aside": { src: "/images/scraped/images/holidays/st-patrick/chix2---happy-st-patrick-day.jpg", alt: "Happy Chihuahuas" },
  "events-hero": { src: "/images/scraped/images/holidays/st-patrick/st-patrick-rainbow-archway.png", alt: "Rainbow archway" },
  "adoption-aside": { src: "/images/scraped/images/holidays/st-patrick/chi-st-patrick-shamrock.png", alt: "Chihuahua with shamrock" },
  "chiinfo-breed": { src: "/images/scraped/images/holidays/st-patrick/chi-st-patrick-pub.jpg", alt: "Chihuahua at the pub" },
  "chiinfo-articles": { src: "/images/scraped/images/holidays/st-patrick/chi-hat-graphic02.png", alt: "Chihuahua with hat" },
  "surrender-top": { src: "/images/scraped/images/holidays/st-patrick/chi-st-partrick-sleep-in-hat.png", alt: "Chihuahua sleeping in hat" },
  "surrender-mid": { src: "/images/scraped/images/holidays/st-patrick/chi-irish-heart-leaf.png", alt: "Chihuahua with heart leaf" },
};

const themes: Record<ThemeId, ThemeConfig> = {
  "st-patricks": {
    id: "st-patricks",
    name: "St. Patrick's Day",
    icon: "Clover",
    preview: "#2f8259",
    colors: {
      warm: {
        "50": "#f6faf7", "100": "#eaf1ec", "200": "#cedbd3", "300": "#8baa97",
        "400": "#5e8a71", "500": "#3e705a", "600": "#2e5844", "700": "#204234",
        "800": "#163027", "900": "#0d1f17",
      },
      coral: {
        "50": "#f0f6f2", "100": "#dbeae1", "200": "#b3d5c1", "300": "#7dba97",
        "400": "#4a9e72", "500": "#2f8259", "600": "#246a48", "700": "#1c5439",
        "800": "#16422e", "900": "#103323",
      },
      amber: {
        "50": "#fdfcf5", "100": "#faf5de", "200": "#f3e9b0", "300": "#e8d36e",
        "400": "#d9b83a", "500": "#c49e18", "600": "#a38312", "700": "#7a620e",
        "800": "#5c4a0b", "900": "#3d3108",
      },
      cream: "#f6faf7",
      creamDark: "#eaf1ec",
    },
    seasonalImages: [
      { src: "/images/scraped/images/holidays/st-patrick/chi-st-patrick-glasses.png", alt: "Chihuahua with St. Patrick's glasses", width: 160, height: 160 },
      { src: "/images/scraped/images/holidays/st-patrick/chi-4-leaf-clover.png", alt: "Chihuahua with four-leaf clover", width: 140, height: 140 },
      { src: "/images/scraped/images/holidays/st-patrick/chi-st-patrick-kiss-me.png", alt: "Chihuahua - Kiss me I'm Irish", width: 160, height: 160 },
    ],
    decorativeImages: {
      "about-float": { src: "/images/scraped/images/holidays/st-patrick/chi-st-patrick-lucky-charm.png", alt: "Chihuahua - Lucky Charm" },
      "about-quote": { src: "/images/scraped/images/holidays/st-patrick/chi-st-patrick-lucky-dog.gif", alt: "Lucky Dog" },
      "volunteer-aside": { src: "/images/scraped/images/holidays/st-patrick/chix2---happy-st-patrick-day.jpg", alt: "Happy St. Patrick's Day Chihuahuas" },
      "events-hero": { src: "/images/scraped/images/holidays/st-patrick/st-patrick-rainbow-archway.png", alt: "St. Patrick's Day rainbow archway" },
      "adoption-aside": { src: "/images/scraped/images/holidays/st-patrick/chi-st-patrick-shamrock.png", alt: "Chihuahua with shamrock" },
      "chiinfo-breed": { src: "/images/scraped/images/holidays/st-patrick/chi-st-patrick-pub.jpg", alt: "Chihuahua at the pub" },
      "chiinfo-articles": { src: "/images/scraped/images/holidays/st-patrick/chi-hat-graphic02.png", alt: "Chihuahua with hat" },
      "surrender-top": { src: "/images/scraped/images/holidays/st-patrick/chi-st-partrick-sleep-in-hat.png", alt: "Chihuahua sleeping in hat" },
      "surrender-mid": { src: "/images/scraped/images/holidays/st-patrick/chi-irish-heart-leaf.png", alt: "Chihuahua with heart leaf" },
    },
  },
  easter: {
    id: "easter",
    name: "Easter",
    icon: "Egg",
    preview: "#a855f7",
    colors: {
      warm: {
        "50": "#faf5ff", "100": "#f3e8ff", "200": "#e9d5ff", "300": "#c4a5de",
        "400": "#a07cc4", "500": "#7e57a8", "600": "#654490", "700": "#4e3475",
        "800": "#3a275a", "900": "#27193d",
      },
      coral: {
        "50": "#fdf2f8", "100": "#fce7f3", "200": "#fbcfe8", "300": "#f9a8d4",
        "400": "#f472b6", "500": "#ec4899", "600": "#db2777", "700": "#be185d",
        "800": "#9d174d", "900": "#831843",
      },
      amber: {
        "50": "#fefce8", "100": "#fef9c3", "200": "#fef08a", "300": "#fde047",
        "400": "#facc15", "500": "#eab308", "600": "#ca8a04", "700": "#a16207",
        "800": "#854d0e", "900": "#713f12",
      },
      cream: "#faf5ff",
      creamDark: "#f3e8ff",
    },
    seasonalImages: [
      { src: "/images/scraped/images/holidays/easter/Chi-CartoonBunny.png", alt: "Chihuahua in bunny costume", width: 160, height: 160 },
      { src: "/images/scraped/images/holidays/easter/Chi-SpringFlowers.png", alt: "Chihuahua with spring flowers", width: 160, height: 160 },
      { src: "/images/scraped/images/holidays/easter/Chi-HappyEasterPin-Transparent.png", alt: "Happy Easter chihuahuas", width: 160, height: 160 },
    ],
    decorativeImages: {
      "about-float": { src: "/images/scraped/images/holidays/easter/Chi-EasterBasket.png", alt: "Chihuahua in Easter basket" },
      "about-quote": { src: "/images/scraped/images/holidays/easter/Chi-EasterChi01.png", alt: "Easter bunny chihuahua" },
      "volunteer-aside": { src: "/images/scraped/images/holidays/easter/chi-helping-bunny.png", alt: "Chihuahua helping the Easter bunny" },
      "events-hero": { src: "/images/scraped/images/holidays/easter/easter-basket-chi.jpg", alt: "Chihuahua in Easter basket" },
      "adoption-aside": { src: "/images/scraped/images/holidays/easter/Chi-Easter.png", alt: "Chihuahua with Easter eggs" },
      "chiinfo-breed": { src: "/images/scraped/images/holidays/easter/Chi-Peeps.jpg", alt: "Chihuahua with Peeps" },
      "chiinfo-articles": { src: "/images/scraped/images/holidays/easter/Chi-EasterChi02.png", alt: "Easter bunny chihuahua" },
      "surrender-top": { src: "/images/scraped/images/holidays/easter/Chi-BasketBunny.jpg", alt: "Chihuahua in bunny basket" },
      "surrender-mid": { src: "/images/scraped/images/holidays/easter/Chi-CartoonBunny.png", alt: "Cartoon Easter chihuahua" },
    },
  },
  spring: {
    id: "spring",
    name: "Spring",
    icon: "Flower2",
    preview: "#059669",
    colors: {
      warm: {
        "50": "#f0fdf4", "100": "#dcfce7", "200": "#bbf7d0", "300": "#86efac",
        "400": "#4ade80", "500": "#22c55e", "600": "#16a34a", "700": "#15803d",
        "800": "#166534", "900": "#14532d",
      },
      coral: {
        "50": "#fff1f2", "100": "#ffe4e6", "200": "#fecdd3", "300": "#fda4af",
        "400": "#fb7185", "500": "#f43f5e", "600": "#e11d48", "700": "#be123c",
        "800": "#9f1239", "900": "#881337",
      },
      amber: {
        "50": "#fffbeb", "100": "#fef3c7", "200": "#fde68a", "300": "#fcd34d",
        "400": "#fbbf24", "500": "#f59e0b", "600": "#d97706", "700": "#b45309",
        "800": "#92400e", "900": "#78350f",
      },
      cream: "#f0fdf4",
      creamDark: "#dcfce7",
    },
    seasonalImages: [],
    decorativeImages: defaultDecorativeImages,
  },
  summer: {
    id: "summer",
    name: "Summer",
    icon: "Sun",
    preview: "#0284c7",
    colors: {
      warm: {
        "50": "#f0f9ff", "100": "#e0f2fe", "200": "#bae6fd", "300": "#7dd3fc",
        "400": "#38bdf8", "500": "#0ea5e9", "600": "#0284c7", "700": "#0369a1",
        "800": "#075985", "900": "#0c4a6e",
      },
      coral: {
        "50": "#fff7ed", "100": "#ffedd5", "200": "#fed7aa", "300": "#fdba74",
        "400": "#fb923c", "500": "#f97316", "600": "#ea580c", "700": "#c2410c",
        "800": "#9a3412", "900": "#7c2d12",
      },
      amber: {
        "50": "#fefce8", "100": "#fef9c3", "200": "#fef08a", "300": "#fde047",
        "400": "#facc15", "500": "#eab308", "600": "#ca8a04", "700": "#a16207",
        "800": "#854d0e", "900": "#713f12",
      },
      cream: "#f0f9ff",
      creamDark: "#e0f2fe",
    },
    seasonalImages: [],
    decorativeImages: defaultDecorativeImages,
  },
  "4th-of-july": {
    id: "4th-of-july",
    name: "4th of July",
    icon: "Star",
    preview: "#1e40af",
    colors: {
      warm: {
        "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd",
        "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8",
        "800": "#1e40af", "900": "#1e3a8a",
      },
      coral: {
        "50": "#fef2f2", "100": "#fee2e2", "200": "#fecaca", "300": "#fca5a5",
        "400": "#f87171", "500": "#ef4444", "600": "#dc2626", "700": "#b91c1c",
        "800": "#991b1b", "900": "#7f1d1d",
      },
      amber: {
        "50": "#fafafa", "100": "#f5f5f5", "200": "#e5e5e5", "300": "#d4d4d4",
        "400": "#a3a3a3", "500": "#737373", "600": "#525252", "700": "#404040",
        "800": "#262626", "900": "#171717",
      },
      cream: "#eff6ff",
      creamDark: "#dbeafe",
    },
    seasonalImages: [],
    decorativeImages: defaultDecorativeImages,
  },
  halloween: {
    id: "halloween",
    name: "Halloween",
    icon: "Moon",
    preview: "#9333ea",
    colors: {
      warm: {
        "50": "#faf5ff", "100": "#f3e8ff", "200": "#e2d0f0", "300": "#bf9edb",
        "400": "#9b6fc4", "500": "#7e4fb0", "600": "#6a3d9a", "700": "#553080",
        "800": "#3f2460", "900": "#2a1740",
      },
      coral: {
        "50": "#fff7ed", "100": "#ffedd5", "200": "#fed7aa", "300": "#fdba74",
        "400": "#fb923c", "500": "#f97316", "600": "#ea580c", "700": "#c2410c",
        "800": "#9a3412", "900": "#7c2d12",
      },
      amber: {
        "50": "#fffbeb", "100": "#fef3c7", "200": "#fde68a", "300": "#fcd34d",
        "400": "#fbbf24", "500": "#f59e0b", "600": "#d97706", "700": "#b45309",
        "800": "#92400e", "900": "#78350f",
      },
      cream: "#faf5ff",
      creamDark: "#f3e8ff",
    },
    seasonalImages: [],
    decorativeImages: defaultDecorativeImages,
  },
  fall: {
    id: "fall",
    name: "Fall",
    icon: "Leaf",
    preview: "#b45309",
    colors: {
      warm: {
        "50": "#fdf8f0", "100": "#f8ead5", "200": "#f0d4a8", "300": "#ddb476",
        "400": "#c4914c", "500": "#a87636", "600": "#8c5f2a", "700": "#6d4a21",
        "800": "#523819", "900": "#382612",
      },
      coral: {
        "50": "#fef5ee", "100": "#fce8d5", "200": "#f9cdaa", "300": "#f4a973",
        "400": "#ee7d3a", "500": "#ea5c14", "600": "#db430a", "700": "#b6310b",
        "800": "#912810", "900": "#752310",
      },
      amber: {
        "50": "#fefce8", "100": "#fef9c3", "200": "#fef08a", "300": "#fde047",
        "400": "#facc15", "500": "#eab308", "600": "#ca8a04", "700": "#a16207",
        "800": "#854d0e", "900": "#713f12",
      },
      cream: "#fdf8f0",
      creamDark: "#f8ead5",
    },
    seasonalImages: [],
    decorativeImages: defaultDecorativeImages,
  },
  thanksgiving: {
    id: "thanksgiving",
    name: "Thanksgiving",
    icon: "Leaf",
    preview: "#92400e",
    colors: {
      warm: {
        "50": "#faf6f1", "100": "#f0e4d5", "200": "#dfc7a8", "300": "#c8a074",
        "400": "#ae7d4e", "500": "#96643a", "600": "#7c4f2c", "700": "#603d22",
        "800": "#482e1a", "900": "#311f12",
      },
      coral: {
        "50": "#fdf2f0", "100": "#fce0da", "200": "#f9bdb2", "300": "#f3907e",
        "400": "#ea6550", "500": "#d94a35", "600": "#b93929", "700": "#962e22",
        "800": "#78261e", "900": "#63221c",
      },
      amber: {
        "50": "#fdfaeb", "100": "#faf2c7", "200": "#f5e38a", "300": "#edce4d",
        "400": "#e0b724", "500": "#cfa008", "600": "#af8004", "700": "#886007",
        "800": "#6e4c0c", "900": "#5c3e10",
      },
      cream: "#faf6f1",
      creamDark: "#f0e4d5",
    },
    seasonalImages: [
      { src: "/images/scraped/images/holidays/thanksgiving/wavingturkey.png", alt: "Waving turkey", width: 160, height: 160 },
    ],
    decorativeImages: defaultDecorativeImages,
  },
  christmas: {
    id: "christmas",
    name: "Christmas",
    icon: "Snowflake",
    preview: "#dc2626",
    colors: {
      warm: {
        "50": "#f0fdf2", "100": "#dbf9e0", "200": "#b9f2c4", "300": "#84e599",
        "400": "#48cf6a", "500": "#22b348", "600": "#1a9439", "700": "#17742f",
        "800": "#185c29", "900": "#164c24",
      },
      coral: {
        "50": "#fef2f2", "100": "#fee2e2", "200": "#fecaca", "300": "#fca5a5",
        "400": "#f87171", "500": "#ef4444", "600": "#dc2626", "700": "#b91c1c",
        "800": "#991b1b", "900": "#7f1d1d",
      },
      amber: {
        "50": "#fdfcf0", "100": "#faf5d0", "200": "#f3e8a0", "300": "#e8d366",
        "400": "#d9b83a", "500": "#c49e18", "600": "#a38312", "700": "#7a620e",
        "800": "#5c4a0b", "900": "#3d3108",
      },
      cream: "#f0fdf2",
      creamDark: "#dbf9e0",
    },
    seasonalImages: [],
    decorativeImages: defaultDecorativeImages,
  },
  "new-years": {
    id: "new-years",
    name: "New Year's",
    icon: "Sparkles",
    preview: "#1e293b",
    colors: {
      warm: {
        "50": "#f8fafc", "100": "#f1f5f9", "200": "#e2e8f0", "300": "#cbd5e1",
        "400": "#94a3b8", "500": "#64748b", "600": "#475569", "700": "#334155",
        "800": "#1e293b", "900": "#0f172a",
      },
      coral: {
        "50": "#f8f8f8", "100": "#f0f0f0", "200": "#dcdcdc", "300": "#bfbfbf",
        "400": "#a0a0a0", "500": "#808080", "600": "#606060", "700": "#484848",
        "800": "#303030", "900": "#202020",
      },
      amber: {
        "50": "#fdfcf0", "100": "#faf5d0", "200": "#f3e8a0", "300": "#e8d366",
        "400": "#d9b83a", "500": "#c49e18", "600": "#a38312", "700": "#7a620e",
        "800": "#5c4a0b", "900": "#3d3108",
      },
      cream: "#f8fafc",
      creamDark: "#f1f5f9",
    },
    seasonalImages: [
      { src: "/images/scraped/images/holidays/new-year/chi-synth02.png", alt: "Chihuahua celebrating New Year's", width: 160, height: 160 },
    ],
    decorativeImages: defaultDecorativeImages,
  },
  valentines: {
    id: "valentines",
    name: "Valentine's Day",
    icon: "Heart",
    preview: "#e11d48",
    colors: {
      warm: {
        "50": "#fff1f3", "100": "#ffe0e5", "200": "#ffc7d1", "300": "#ffa0b3",
        "400": "#fd708e", "500": "#f6436b", "600": "#e11d52", "700": "#be1244",
        "800": "#9f1240", "900": "#88133e",
      },
      coral: {
        "50": "#fdf2f8", "100": "#fce7f3", "200": "#fbcfe8", "300": "#f9a8d4",
        "400": "#f472b6", "500": "#ec4899", "600": "#db2777", "700": "#be185d",
        "800": "#9d174d", "900": "#831843",
      },
      amber: {
        "50": "#fff1f3", "100": "#ffe4e8", "200": "#fecdd5", "300": "#fda4b4",
        "400": "#fb7190", "500": "#f43f6b", "600": "#e11d50", "700": "#be1241",
        "800": "#9f123c", "900": "#881339",
      },
      cream: "#fff1f3",
      creamDark: "#ffe0e5",
    },
    seasonalImages: [],
    decorativeImages: defaultDecorativeImages,
  },
};

export const themeIds = Object.keys(themes) as ThemeId[];

export function getThemeConfig(id: ThemeId): ThemeConfig {
  return themes[id] ?? themes["st-patricks"];
}

export function getAllThemes(): ThemeConfig[] {
  return Object.values(themes);
}
