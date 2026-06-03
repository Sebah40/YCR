#!/usr/bin/env python3
"""
Read the old PHP guestbook flat file (guest/_gbook.txt) and produce a JSON
list of entries ready to be inserted via lib/guestbook.bulkImport().

Old format (tab-separated, 9 columns):
  name | from(location) | email | url | comment | added(date) | isprivate | reply | ip

The comment field may contain HTML and `##GBOOK_TEMPLATE##images/emoticons/*.gif`
tokens. Emails and other characters were HTML-entity-escaped for spam protection
(e.g. `&#64;` for `@`, `&#46;` for `.`).

This script:
  * Decodes the HTML entities so the stored value is clean text.
  * Strips ##GBOOK_TEMPLATE## image tags (they reference assets we no longer host).
  * Parses the textual date into ISO 8601 so entries sort correctly.
  * Marks every imported entry as approved=True, deleted=False — they all made
    it through the original manual moderation, so they're trusted.

Output: scripts/extracted/guestbook_import.json
"""

import html
import json
import re
import uuid
from datetime import datetime, timezone
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SRC = REPO / "guest" / "_gbook.txt"
OUT = REPO / "scripts" / "extracted" / "guestbook_import.json"

DATE_FORMATS = [
    "%B %d, %Y",       # "December 4, 2018"
    "%b %d, %Y",       # "Dec 4, 2018"
    "%d %B %Y",
]


def parse_date(s: str) -> str:
    s = s.strip()
    for fmt in DATE_FORMATS:
        try:
            dt = datetime.strptime(s, fmt).replace(tzinfo=timezone.utc, hour=12)
            return dt.isoformat()
        except ValueError:
            continue
    # Fall back to today if unparseable; preserve original in name field marker.
    return datetime.now(timezone.utc).isoformat()


_ALT_RE = re.compile(r'alt="([^"]*)"', re.IGNORECASE)
_TITLE_RE = re.compile(r'title="([^"]*)"', re.IGNORECASE)
_IMG_RE = re.compile(r"<img\b[^>]*/?>", re.IGNORECASE)


def _emoticon_replace(match: re.Match[str]) -> str:
    """Try to replace an old emoticon <img> tag with a meaningful emoji
    or its alt/title text. Falls back to nothing if we can't tell."""
    tag = match.group(0)
    alt = (_ALT_RE.search(tag) or [""])[1] if _ALT_RE.search(tag) else ""
    title = (_TITLE_RE.search(tag) or [""])[1] if _TITLE_RE.search(tag) else ""
    hint = (alt or title or "").strip().lower()
    # Common mappings; the old guestbook used these alt strings.
    emoji_map = {
        ":d": "😃", ":-d": "😃",
        ":)": "🙂", ":-)": "🙂", "smile": "🙂",
        ":(": "🙁", ":-(": "🙁",
        ";)": "😉", ";-)": "😉", "wink": "😉",
        ":p": "😛", ":-p": "😛",
        ":o": "😮", ":-o": "😮",
        "<3": "❤️", "heart": "❤️",
        "bigsmile": "😄",
    }
    if hint in emoji_map:
        return emoji_map[hint]
    # Path-based heuristic: icon_smile.gif -> smile -> 🙂
    src_match = re.search(r'src="([^"]*)"', tag, re.IGNORECASE)
    if src_match:
        path = src_match.group(1).lower()
        for k, v in emoji_map.items():
            if k in path:
                return v
    return alt  # last resort: keep the alt text, or empty


def clean_message(msg: str) -> str:
    # 1) Replace any <img> tag (old-template emoticon OR plain emoticon path)
    #    with a unicode emoji or its alt text. We never want unresolved <img>
    #    tags pointing at long-dead asset paths to make it into the new site.
    msg = _IMG_RE.sub(_emoticon_replace, msg)
    # 2) Decode HTML entities (the old guestbook escaped these for spam protection).
    msg = html.unescape(msg)
    # 3) Normalize <br /> tags to newlines so the message stays readable as plain text.
    msg = re.sub(r"<br\s*/?>", "\n", msg, flags=re.IGNORECASE)
    # 4) Collapse runs of whitespace at line ends.
    msg = re.sub(r"[ \t]+\n", "\n", msg)
    return msg.strip()


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Source file not found: {SRC}")

    entries: list[dict] = []
    raw = SRC.read_text(encoding="utf-8", errors="replace")

    for line_no, line in enumerate(raw.splitlines(), start=1):
        if not line.strip():
            continue
        parts = line.split("\t")
        if len(parts) < 8:
            print(f"  WARN line {line_no}: only {len(parts)} columns, skipping")
            continue

        name, location, email, _url, comment, added, _isprivate, reply = parts[:8]

        entry = {
            "id": str(uuid.uuid4()),
            "createdAt": parse_date(added),
            "name": html.unescape(name).strip(),
            "location": html.unescape(location).strip(),
            "email": html.unescape(email).strip(),
            "message": clean_message(comment),
            "reply": clean_message(reply) if reply and reply.strip() not in {"0", ""} else "",
            "approved": True,
            "deleted": False,
        }
        entries.append(entry)

    # Sort newest-first so the importer writes them in chronological order
    # (Sheets appends to the bottom; importing oldest-first feels nicer when
    # the admin views the sheet manually).
    entries.sort(key=lambda e: e["createdAt"])

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(entries, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {len(entries)} entries to {OUT.relative_to(REPO)}")
    print(f"Oldest: {entries[0]['createdAt']} — {entries[0]['name']}")
    print(f"Newest: {entries[-1]['createdAt']} — {entries[-1]['name']}")


if __name__ == "__main__":
    main()
