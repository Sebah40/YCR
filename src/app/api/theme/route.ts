import { NextResponse } from "next/server";
import { getTheme, setTheme } from "@/lib/theme-store";
import { isAuthenticated } from "@/lib/auth";
import { themeIds, type ThemeId } from "@/lib/themes";

export async function GET() {
  const theme = await getTheme();
  return NextResponse.json({ theme });
}

export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const theme = body.theme as string;

  if (!themeIds.includes(theme as ThemeId)) {
    return NextResponse.json({ error: "Invalid theme" }, { status: 400 });
  }

  await setTheme(theme as ThemeId);
  return NextResponse.json({ theme });
}
