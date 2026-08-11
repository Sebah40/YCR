"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Records one page view per navigation. Uses the browser Beacon API so the
 * request doesn't delay the page. Admin routes are excluded so the owner's
 * own visits don't inflate the numbers.
 */
export default function VisitorTracker() {
  const pathname = usePathname();
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    if (last.current === pathname) return; // guard against double-fire
    last.current = pathname;

    const payload = JSON.stringify({ path: pathname, ref: document.referrer || "" });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
      } else {
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Never let analytics surface an error to the visitor.
    }
  }, [pathname]);

  return null;
}
