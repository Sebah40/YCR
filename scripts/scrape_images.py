#!/usr/bin/env python3
"""
Scrape all images from every page of yankeechihuahuarescue.org.
Downloads them preserving directory structure under public/images/scraped/.
"""

import os
import re
import urllib.request
import urllib.parse
import urllib.error
from html.parser import HTMLParser
from pathlib import Path
from collections import defaultdict

BASE_URL = "https://www.yankeechihuahuarescue.org"
PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = PROJECT_ROOT / "public" / "images" / "scraped"

# All known pages on the site
PAGES = [
    "/index.html",
    "/m-about.html",
    "/m-adopt.html",
    "/m-info.html",
    "/m-surrender.html",
    "/m-volunteer.html",
    "/convol.html",
    "/m-convol.html",
    "/i-breed.html",
    "/i-chihuahua.html",
    "/i-akc.html",
    "/i-versatile.html",
    "/i-rights.html",
    "/i-teacup.html",
    "/i-famous.html",
    "/i-beginning.html",
    "/i-cheryl.html",
    "/i-tips.html",
    "/i-responsible.html",
    "/i-neutering.html",
    "/i-why.html",
    "/i-treats.html",
    "/i-chocolate.html",
    "/i-cratetraining.html",
    "/happyendings.html",
    "/convol-events.html",
    "/convol-convol.html",
]


class ImageExtractor(HTMLParser):
    """Extract all image sources from HTML."""

    def __init__(self):
        super().__init__()
        self.images = set()

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == "img" and "src" in attrs_dict:
            self.images.add(attrs_dict["src"])
        # Also check for background images in style attributes
        style = attrs_dict.get("style", "")
        if style:
            bg_matches = re.findall(r'url\(["\']?([^"\')\s]+)["\']?\)', style)
            for match in bg_matches:
                if any(match.lower().endswith(ext) for ext in (".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp", ".ico")):
                    self.images.add(match)

    def handle_data(self, data):
        pass


def fetch_page(url):
    """Fetch a page and return its HTML content."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"  ERROR fetching {url}: {e}")
        return None


def resolve_url(base_url, page_url, img_src):
    """Resolve a possibly relative image URL to an absolute URL."""
    # Already absolute
    if img_src.startswith("http://") or img_src.startswith("https://"):
        return img_src
    # Protocol-relative
    if img_src.startswith("//"):
        return "https:" + img_src
    # Absolute path
    if img_src.startswith("/"):
        parsed = urllib.parse.urlparse(base_url)
        return f"{parsed.scheme}://{parsed.netloc}{img_src}"
    # Relative path - resolve relative to the page's directory
    page_dir = page_url.rsplit("/", 1)[0]
    return page_dir + "/" + img_src


def download_image(url, output_path):
    """Download an image to the given path."""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    if output_path.exists():
        print(f"  SKIP (exists): {output_path.name}")
        return True
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
            if len(data) < 100:
                print(f"  SKIP (too small, {len(data)} bytes): {url}")
                return False
            with open(output_path, "wb") as f:
                f.write(data)
            print(f"  OK ({len(data):,} bytes): {output_path.relative_to(PROJECT_ROOT)}")
            return True
    except Exception as e:
        print(f"  ERROR downloading {url}: {e}")
        return False


def url_to_local_path(img_url):
    """Convert an image URL to a local file path under OUTPUT_DIR."""
    parsed = urllib.parse.urlparse(img_url)
    # Decode URL-encoded characters
    path = urllib.parse.unquote(parsed.path)
    # Remove leading slash
    path = path.lstrip("/")
    # Sanitize: replace spaces with underscores, remove special chars
    # But preserve directory structure
    parts = path.split("/")
    sanitized = []
    for part in parts:
        # Replace spaces with hyphens, lowercase
        part = part.replace(" ", "-").lower()
        # Remove any characters that aren't alphanumeric, hyphen, underscore, or dot
        part = re.sub(r'[^a-z0-9._-]', '', part)
        if part:
            sanitized.append(part)
    if not sanitized:
        return None
    return OUTPUT_DIR / "/".join(sanitized)


def main():
    print("=" * 70)
    print("YCR Image Scraper")
    print("=" * 70)

    # Collect all images from all pages
    all_images = defaultdict(set)  # img_url -> set of pages it appears on
    page_images = {}  # page -> set of image URLs

    for page_path in PAGES:
        page_url = BASE_URL + page_path
        print(f"\nFetching: {page_url}")
        html = fetch_page(page_url)
        if not html:
            continue

        extractor = ImageExtractor()
        extractor.feed(html)

        # Also search for images in inline styles and CSS
        # Look for url() references
        css_images = re.findall(r'url\(["\']?([^"\')\s]+)["\']?\)', html)
        for img in css_images:
            if any(img.lower().endswith(ext) for ext in (".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp", ".ico")):
                extractor.images.add(img)

        # Also look for direct href links to images
        href_images = re.findall(r'href=["\']([^"\']+\.(?:jpg|jpeg|png|gif|webp|svg|bmp|ico))["\']', html, re.IGNORECASE)
        for img in href_images:
            extractor.images.add(img)

        resolved = set()
        for img_src in extractor.images:
            abs_url = resolve_url(BASE_URL, page_url, img_src)
            # Only download images from this domain
            if "yankeechihuahuarescue.org" in abs_url:
                resolved.add(abs_url)
                all_images[abs_url].add(page_path)

        page_images[page_path] = resolved
        print(f"  Found {len(resolved)} images")

    # Summary
    print("\n" + "=" * 70)
    print(f"TOTAL UNIQUE IMAGES: {len(all_images)}")
    print("=" * 70)

    # Print per-page summary
    for page_path in PAGES:
        if page_path in page_images:
            imgs = page_images[page_path]
            if imgs:
                print(f"\n  {page_path}: {len(imgs)} images")
                for img in sorted(imgs):
                    print(f"    - {img}")

    # Download all images
    print("\n" + "=" * 70)
    print("DOWNLOADING IMAGES")
    print("=" * 70)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    success = 0
    failed = 0
    skipped = 0

    for img_url in sorted(all_images.keys()):
        local_path = url_to_local_path(img_url)
        if local_path is None:
            print(f"  SKIP (bad path): {img_url}")
            skipped += 1
            continue
        if download_image(img_url, local_path):
            success += 1
        else:
            failed += 1

    print("\n" + "=" * 70)
    print(f"DONE: {success} downloaded, {failed} failed, {skipped} skipped")
    print(f"Images saved to: {OUTPUT_DIR}")
    print("=" * 70)

    # Write a mapping file for reference
    mapping_file = PROJECT_ROOT / "scripts" / "image_mapping.txt"
    with open(mapping_file, "w") as f:
        f.write("# Image mapping: original URL -> local path -> pages using it\n\n")
        for img_url in sorted(all_images.keys()):
            local_path = url_to_local_path(img_url)
            pages = sorted(all_images[img_url])
            f.write(f"URL: {img_url}\n")
            if local_path:
                f.write(f"LOCAL: {local_path.relative_to(PROJECT_ROOT)}\n")
            f.write(f"PAGES: {', '.join(pages)}\n\n")

    print(f"Mapping file: {mapping_file}")


if __name__ == "__main__":
    main()
