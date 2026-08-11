import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getStats } from "@/lib/stats";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const stats = await getStats();
    return NextResponse.json(stats);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to load stats";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
