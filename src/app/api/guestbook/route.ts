import { NextResponse, type NextRequest } from "next/server";
import { Redis } from "@upstash/redis";
import { submitEntry, type GuestbookEntry } from "@/lib/guestbook";

// Use Node runtime so googleapis (and its native deps) work.
export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_SECONDS = 60 * 60; // 1 hour
const RATE_LIMIT_MAX = 3; // max 3 submissions per IP per hour

// Formspree email-keyed endpoint — first POST triggers a confirmation email
// to info@, someone with inbox access clicks the link once, all future POSTs
// are forwarded there.
const NOTIFY_URL =
  "https://formspree.io/f/info@yankeechihuahuarescue.org";

async function notifyAdmin(entry: GuestbookEntry, requestUrl: string): Promise<void> {
  try {
    const adminUrl = new URL("/admin/guestbook", requestUrl).toString();
    const payload = {
      _subject: `New Guest Book entry from ${entry.name}`,
      Name: entry.name,
      Location: entry.location || "(not provided)",
      Email: entry.email || "(not provided)",
      Submitted: new Date(entry.createdAt).toLocaleString("en-US", {
        timeZone: "America/New_York",
      }),
      Message: entry.message,
      "Moderate at": adminUrl,
    };
    await fetch(NOTIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    // Swallow — never let a flaky email service block a real submission.
  }
}

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

async function rateLimit(ip: string): Promise<boolean> {
  try {
    const redis = Redis.fromEnv();
    const key = `guestbook:rl:${ip}`;
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, RATE_LIMIT_WINDOW_SECONDS);
    }
    return count <= RATE_LIMIT_MAX;
  } catch {
    // If Redis is down, fail open — better to accept legitimate entries than block everyone.
    return true;
  }
}

export async function POST(req: NextRequest) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  // Honeypot — bots fill every field. Real users never see this one.
  if ((form.get("website") as string)?.trim()) {
    // Pretend success so bots don't retry.
    return NextResponse.json({ ok: true });
  }

  const name = (form.get("name") as string | null)?.trim() ?? "";
  const message = (form.get("message") as string | null)?.trim() ?? "";
  const location = (form.get("location") as string | null)?.trim() ?? "";
  const email = (form.get("email") as string | null)?.trim() ?? "";

  if (!name || name.length > 120) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!message || message.length > 2000) {
    return NextResponse.json({ error: "Please enter a message (max 2000 characters)." }, { status: 400 });
  }
  if (location.length > 120) {
    return NextResponse.json({ error: "Location too long." }, { status: 400 });
  }
  if (email.length > 200) {
    return NextResponse.json({ error: "Email too long." }, { status: 400 });
  }

  const ip = getClientIp(req);
  const allowed = await rateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const entry = await submitEntry({ name, location, email, message });
    // Don't await — fire-and-forget so a slow Formspree doesn't delay the response.
    void notifyAdmin(entry, req.url);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Submission failed.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
