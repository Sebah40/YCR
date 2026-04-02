import { Redis } from "@upstash/redis";
import type { ThemeId } from "./themes";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const THEME_KEY = "ycr:active-theme";
const DEFAULT_THEME: ThemeId = "st-patricks";

export async function getTheme(): Promise<ThemeId> {
  const theme = await redis.get<string>(THEME_KEY);
  return (theme as ThemeId) || DEFAULT_THEME;
}

export async function setTheme(theme: ThemeId): Promise<void> {
  await redis.set(THEME_KEY, theme);
}
