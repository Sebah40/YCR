"use client";

import { useEffect, useState, type ReactNode } from "react";

interface Props {
  /** Base64-encoded "user@domain.tld". The plain address never appears in the
   * server-rendered HTML, so simple spam crawlers can't pattern-match it. */
  enc: string;
  /** Optional pre-filled mailto subject. */
  subject?: string;
  /** Visible link text. If a string and it matches the email shape, it would
   * defeat the obfuscation — so for those cases, pass `display="auto"` to render
   * the decoded address only after JS mounts. */
  display?: ReactNode | "auto";
  className?: string;
}

export default function ObfuscatedEmail({ enc, subject, display, className }: Props) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    try {
      setEmail(atob(enc));
    } catch {
      // Bad input; leave inert.
    }
  }, [enc]);

  const href = email
    ? `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`
    : undefined;

  const text =
    display === "auto" || display === undefined ? email ?? "…" : display;

  // Without an href the element is non-clickable. Crawlers that don't run JS
  // see no usable address; users see the decoded email once hydration runs.
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (!href) e.preventDefault();
      }}
    >
      {text}
    </a>
  );
}
