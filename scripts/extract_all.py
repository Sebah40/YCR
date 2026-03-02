#!/usr/bin/env python3
"""
Extract text content and image context from every page on the old YCR site.
Outputs structured text files per page for rebuilding in the new site.
"""

import re
import urllib.request
import urllib.parse
from html.parser import HTMLParser
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_URL = "https://www.yankeechihuahuarescue.org"
PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = PROJECT_ROOT / "scripts" / "extracted"
TIMEOUT = 10

# All content pages (skip forms, guestbook, duplicates)
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
    """Extract text content with image placement markers."""

    def __init__(self):
        super().__init__()
        self.output = []
        self.current_tag = None
        self.skip_tags = {"script", "style", "head", "nav", "noscript"}
        self.skip_depth = 0
        self.in_body = False
        self.images = []  # (src, alt, context)
        self.current_text_block = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)

        if tag == "body":
            self.in_body = True

        if tag in self.skip_tags:
            self.skip_depth += 1
            return

        if not self.in_body or self.skip_depth > 0:
            return

        self.current_tag = tag

        if tag == "img" and "src" in d:
            src = d["src"]
            alt = d.get("alt", "")
            style = d.get("style", "")
            align = d.get("align", "")
            width = d.get("width", "")
            self.images.append({
                "src": src,
                "alt": alt,
                "style": style,
                "align": align,
                "width": width,
            })
            self.output.append(f"\n[IMAGE: {src} | alt=\"{alt}\" | align={align} | width={width}]\n")

        if tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self.output.append(f"\n{'#' * int(tag[1])} ")
        elif tag == "p":
            self.output.append("\n\n")
        elif tag == "br":
            self.output.append("\n")
        elif tag == "li":
            self.output.append("\n- ")
        elif tag == "ul" or tag == "ol":
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
            # Collapse whitespace
            text = re.sub(r'\s+', ' ', text)
            self.output.append(text)

    def get_text(self):
        raw = "".join(self.output)
        # Clean up excessive blank lines
        raw = re.sub(r'\n{3,}', '\n\n', raw)
        return raw.strip()


def fetch(url):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        return None


def process_page(name, path):
    url = BASE_URL + path
    html = fetch(url)
    if not html:
        return name, None, None

    extractor = ContentExtractor()
    extractor.feed(html)

    text = extractor.get_text()
    images = extractor.images

    return name, text, images


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print("Extracting text + images from all pages...\n", flush=True)

    with ThreadPoolExecutor(max_workers=10) as pool:
        futures = {pool.submit(process_page, name, path): name for name, path in PAGES.items()}
        for future in as_completed(futures):
            name, text, images = future.result()
            if text is None:
                print(f"  FAIL: {name}", flush=True)
                continue

            # Write text file
            out_file = OUTPUT_DIR / f"{name}.txt"
            with open(out_file, "w") as f:
                f.write(f"# Page: {name}\n")
                f.write(f"# Source: {PAGES[name]}\n\n")

                # Image summary
                f.write("## IMAGES ON THIS PAGE:\n")
                for img in images:
                    src = img["src"]
                    # Skip nav/layout images
                    if any(x in src.lower() for x in ["button6", "button7", "button8", "logo/",
                                                       "find_us_on_facebook"]):
                        continue
                    f.write(f"  - src: {src}\n")
                    f.write(f"    alt: {img['alt']}\n")
                    if img['align']:
                        f.write(f"    align: {img['align']}\n")
                    if img['width']:
                        f.write(f"    width: {img['width']}\n")
                f.write("\n")

                # Full text
                f.write("## PAGE CONTENT:\n\n")
                f.write(text)

            content_images = [i for i in images if not any(
                x in i["src"].lower() for x in ["button6", "button7", "button8", "logo/",
                                                  "find_us_on_facebook"])]
            print(f"  OK: {name} ({len(text)} chars, {len(content_images)} content images)", flush=True)

    print(f"\nExtracted to: {OUTPUT_DIR}", flush=True)


if __name__ == "__main__":
    main()
