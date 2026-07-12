"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { themeIds, type ThemeId, type ThemeConfig } from "@/lib/themes";

interface ThemeContextValue {
  themeId: ThemeId;
  setThemeId: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  themeId: "st-patricks",
  setThemeId: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

// We import theme configs dynamically on the client to apply CSS variables
async function fetchThemeConfig(id: ThemeId): Promise<ThemeConfig> {
  const { getThemeConfig } = await import("@/lib/themes");
  return getThemeConfig(id);
}

function applyCssVariables(config: ThemeConfig) {
  const root = document.documentElement;
  const { colors } = config;

  for (const [shade, value] of Object.entries(colors.warm)) {
    root.style.setProperty(`--t-warm-${shade}`, value);
  }
  for (const [shade, value] of Object.entries(colors.coral)) {
    root.style.setProperty(`--t-coral-${shade}`, value);
  }
  for (const [shade, value] of Object.entries(colors.amber)) {
    root.style.setProperty(`--t-amber-${shade}`, value);
  }
  root.style.setProperty("--t-cream", colors.cream);
  root.style.setProperty("--t-cream-dark", colors.creamDark);
}

export default function ThemeProvider({
  initialTheme,
  children,
}: {
  initialTheme: ThemeId;
  children: React.ReactNode;
}) {
  const [themeId, setThemeIdState] = useState<ThemeId>(initialTheme);

  const setThemeId = useCallback((id: ThemeId) => {
    setThemeIdState(id);
  }, []);

  // DEV-ONLY preview override: visit any page with ?theme=winter (or fall, etc.)
  // to preview a theme locally without changing the stored (production) theme.
  // Guarded to non-production so it can never take effect on the live site.
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const override = new URLSearchParams(window.location.search).get("theme");
    if (override && (themeIds as string[]).includes(override)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- dev-only preview override, removed before shipping
      setThemeIdState(override as ThemeId);
    }
  }, []);

  useEffect(() => {
    fetchThemeConfig(themeId).then(applyCssVariables);
  }, [themeId]);

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}
