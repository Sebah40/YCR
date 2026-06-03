import { NextResponse, type NextRequest } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  approveEntry,
  unapproveEntry,
  deleteEntry,
  restoreEntry,
  setReply,
} from "@/lib/guestbook";

export const runtime = "nodejs";

type Action = "approve" | "unapprove" | "delete" | "restore" | "reply";

interface Body {
  id?: string;
  action?: Action;
  reply?: string;
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const id = (body.id ?? "").trim();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    let updated;
    switch (body.action) {
      case "approve":
        updated = await approveEntry(id);
        break;
      case "unapprove":
        updated = await unapproveEntry(id);
        break;
      case "delete":
        updated = await deleteEntry(id);
        break;
      case "restore":
        updated = await restoreEntry(id);
        break;
      case "reply":
        updated = await setReply(id, (body.reply ?? "").trim());
        break;
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
    if (!updated) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, entry: updated });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Action failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
