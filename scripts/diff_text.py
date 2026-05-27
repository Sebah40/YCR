#!/usr/bin/env python3
"""
Re-crawl yankeechihuahuarescue.org and diff against previously extracted text
in scripts/extracted/. Writes per-page diffs to scripts/diffs/ and a summary.

Uses the same extraction logic as extract_all.py so diffs reflect real text
changes, not formatting drift.
"""

import difflib
import re
import urllib.request
from html.parser import HTMLParser
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_URL = "https://www.yankeechihuahuarescue.org"
PROJECT_ROOT = Path(__file__).resolve().parent.parent
EXTRACTED_DIR = PROJECT_ROOT / "scripts" / "extracted"
DIFF_DIR = PROJECT_ROOT / "scripts" / "diffs"
TIMEOUT = 15

PAGES = {
    "index": "/index.html",
    "about": "/m-about.html",
    "adopt": "/m-adopt.html",
    "info": "/m-info.html",
    "surrender": "/m-surrender.html",
    "volunteer": "/m-volunteer.html",
    "events": "/events.html",
    "igive": "/i-give.html",
    "the-chihuahua": "/i-thechi.html",
    "breed-standard": "/i-standard.html",
    "versatile": "/i-jobs.html",
    "bill-of-rights": "/i-rights.html",
    "teacup": "/i-teacup.html",
    "famous": "/i-famous.html",
    "ycraa-beginning": "/v-start.html",
    "volunteering-cheryl": "/v-cher.html",
    "tips-adopters": "/i-tips.html",
    "responsible-parent": "/i-responsible.html",
    "neutering": "/i-neutering.html",
    "why-no-intact": "/i-why.html",
    "treats": "/i-treats.html",
    "chocolate": "/i-tre-choc.html",
    "crate-training": "/i-cratetraining.html",
    "happy-endings": "/happydogs/reconstruction.html",
}


class ContentExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.output = []
        self.skip_tags = {"script", "style", "head", "nav", "noscript"}
        self.skip_depth = 0
        self.in_body = False
        self.images = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "body":
            self.in_body = True
        if tag in self.skip_tags:
            self.skip_depth += 1
            return
        if not self.in_body or self.skip_depth > 0:
            return

        if tag == "img" and "src" in d:
            self.images.append({
                "src": d["src"],
                "alt": d.get("alt", ""),
                "align": d.get("align", ""),
                "width": d.get("width", ""),
            })
            self.output.append(
                f"\n[IMAGE: {d['src']} | alt=\"{d.get('alt','')}\" | "
                f"align={d.get('align','')} | width={d.get('width','')}]\n"
            )

        if tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self.output.append(f"\n{'#' * int(tag[1])} ")
        elif tag == "p":
            self.output.append("\n\n")
        elif tag == "br":
            self.output.append("\n")
        elif tag == "li":
            self.output.append("\n- ")
        elif tag in ("ul", "ol"):
            self.output.append("\n")
        elif tag == "table":
            self.output.append("\n[TABLE]\n")
        elif tag == "tr":
            self.output.append("\n| ")
        elif tag in ("td", "th"):
            self.output.append(" | ")
        elif tag == "hr":
            self.output.append("\n---\n")
        elif tag == "a":
            href = d.get("href", "")
            if href and not href.startswith(("#", "javascript:")):
                self.output.append(f"[LINK:{href}]")
        elif tag == "blockquote":
            self.output.append("\n> ")

    def handle_endtag(self, tag):
        if tag in self.skip_tags:
            self.skip_depth -= 1
            return
        if tag == "table":
            self.output.append("\n[/TABLE]\n")
        elif tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self.output.append("\n")
        elif tag == "p":
            self.output.append("\n")

    def handle_data(self, data):
        if self.skip_depth > 0 or not self.in_body:
            return
        text = data.strip()
        if text:
            self.output.append(re.sub(r"\s+", " ", text))

    def get_text(self):
        raw = "".join(self.output)
        raw = re.sub(r"\n{3,}", "\n\n", raw)
        return raw.strip()


def fetch(url):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
            return r.read().decode("utf-8", errors="replace")
    except Exception as e:
        return None


def strip_header(text):
    """Strip the '# Page:' / '# Source:' / IMAGES block from saved .txt files
    so we only diff the actual page content section."""
    marker = "## PAGE CONTENT:"
    idx = text.find(marker)
    if idx == -1:
        return text.strip()
    return text[idx + len(marker):].strip()


def strip_markup(text):
    """Remove [IMAGE: ...] blocks and [LINK:...] markers, leaving prose only.
    This isolates real proofreading edits from layout/asset churn."""
    text = re.sub(r"\[IMAGE:[^\]]*\]", "", text)
    text = re.sub(r"\[LINK:[^\]]*\]", "", text)
    text = re.sub(r"\[/?TABLE\]", "", text)
    return text


def normalize_for_diff(text, prose_only=False):
    """Light normalization: collapse runs of blank lines and trim trailing
    whitespace per line so cosmetic re-flows don't pollute the diff."""
    if prose_only:
        text = strip_markup(text)
    lines = [ln.rstrip() for ln in text.splitlines()]
    out = []
    blank = 0
    for ln in lines:
        if not ln.strip():
            blank += 1
            if blank <= 1:
                out.append("")
        else:
            blank = 0
            out.append(ln)
    return "\n".join(out).strip()


def process(name, path):
    url = BASE_URL + path
    saved_path = EXTRACTED_DIR / f"{name}.txt"
    if not saved_path.exists():
        return name, "missing-saved", None, None

    html = fetch(url)
    if html is None:
        return name, "fetch-failed", None, None

    ext = ContentExtractor()
    ext.feed(html)
    live_raw = ext.get_text()
    saved_raw = strip_header(saved_path.read_text())

    live_full = normalize_for_diff(live_raw)
    saved_full = normalize_for_diff(saved_raw)
    live_prose = normalize_for_diff(live_raw, prose_only=True)
    saved_prose = normalize_for_diff(saved_raw, prose_only=True)

    if live_prose == saved_prose:
        return name, "unchanged", (saved_full, saved_prose), (live_full, live_prose)
    return name, "changed", (saved_full, saved_prose), (live_full, live_prose)


def write_diff(name, saved, live, suffix=""):
    diff = difflib.unified_diff(
        saved.splitlines(),
        live.splitlines(),
        fromfile=f"saved/{name}.txt",
        tofile=f"live/{name}",
        lineterm="",
        n=3,
    )
    out = DIFF_DIR / f"{name}{suffix}.diff"
    out.write_text("\n".join(diff))
    return out


def main():
    DIFF_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Diffing {len(PAGES)} pages against {EXTRACTED_DIR}\n", flush=True)

    changed, unchanged, failed = [], [], []
    with ThreadPoolExecutor(max_workers=10) as pool:
        futures = {pool.submit(process, n, p): n for n, p in PAGES.items()}
        for f in as_completed(futures):
            name, status, saved, live = f.result()
            if status == "changed":
                saved_full, saved_prose = saved
                live_full, live_prose = live
                write_diff(name, saved_full, live_full, suffix=".full")
                out = write_diff(name, saved_prose, live_prose, suffix=".prose")
                changed.append(name)
                d = list(difflib.ndiff(saved_prose.splitlines(), live_prose.splitlines()))
                adds = sum(1 for ln in d if ln.startswith("+ "))
                dels = sum(1 for ln in d if ln.startswith("- "))
                print(f"  CHANGED: {name} prose +{adds} -{dels}  → {out.relative_to(PROJECT_ROOT)}", flush=True)
            elif status == "unchanged":
                unchanged.append(name)
                print(f"  same (prose):    {name}", flush=True)
            else:
                failed.append((name, status))
                print(f"  FAIL:    {name} ({status})", flush=True)

    summary = DIFF_DIR / "SUMMARY.md"
    with open(summary, "w") as f:
        f.write("# Text diff summary\n\n")
        f.write(f"- Changed: {len(changed)}\n")
        f.write(f"- Unchanged: {len(unchanged)}\n")
        f.write(f"- Failed: {len(failed)}\n\n")
        if changed:
            f.write("## Changed pages (prose only)\n\n")
            for n in sorted(changed):
                f.write(f"- [{n}]({n}.prose.diff) — `{PAGES[n]}` (full: `{n}.full.diff`)\n")
        if failed:
            f.write("\n## Failed pages\n\n")
            for n, why in failed:
                f.write(f"- {n}: {why}\n")

    print(f"\nChanged: {len(changed)}, Unchanged: {len(unchanged)}, Failed: {len(failed)}")
    print(f"Summary: {summary.relative_to(PROJECT_ROOT)}")


if __name__ == "__main__":
    main()
