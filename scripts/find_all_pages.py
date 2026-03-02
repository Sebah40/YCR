#!/usr/bin/env python3
"""
Crawl yankeechihuahuarescue.org starting from index.html.
Follow internal links, discover all pages, download all images.
Normalizes URLs to prevent infinite ../../../ loops.
"""

import re
import urllib.request
import urllib.parse
from html.parser import HTMLParser
from pathlib import Path
from posixpath import normpath
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_URL = "https://www.yankeechihuahuarescue.org"
PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = PROJECT_ROOT / "public" / "images" / "scraped"
TIMEOUT = 10
MAX_WORKERS = 10

# Skip these path prefixes (guestbook, php scripts, etc)
SKIP_PREFIXES = ("/guest/", "/file:", "file:")
# Only follow .html and .htm pages
PAGE_EXTENSIONS = (".html", ".htm", ".php")
IMAGE_EXTENSIONS = (".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp", ".ico")


class LinkAndImageExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = set()
        self.images = set()

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "a" and "href" in d:
            self.links.add(d["href"])
        if tag == "img" and "src" in d:
            self.images.add(d["src"])
        # <input type="image" src="..."> (e.g. PayPal donate buttons)
        if tag == "input" and d.get("type", "").lower() == "image" and "src" in d:
            self.images.add(d["src"])
        # <video poster="...">, <source src="...">, <embed src="...">
        if tag in ("video", "source", "embed") and "src" in d:
            src = d["src"]
            if is_image(src):
                self.images.add(src)
        if tag == "video" and "poster" in d:
            self.images.add(d["poster"])
        # background-image in style attributes
        style = d.get("style", "")
        if style:
            for m in re.findall(r'url\(["\']?([^"\')\s]+)["\']?\)', style):
                if is_image(m):
                    self.images.add(m)


def is_image(path):
    return any(path.lower().endswith(e) for e in IMAGE_EXTENSIONS)


def normalize_url(url):
    """Normalize a URL: resolve ../, force https, strip fragments."""
    if not url:
        return None
    parsed = urllib.parse.urlparse(url)
    # Force https
    scheme = "https"
    host = parsed.netloc.lower()
    if not host:
        return None
    # Normalize path: resolve ../ and ./
    path = normpath(parsed.path) if parsed.path else "/"
    if not path.startswith("/"):
        path = "/" + path
    return f"{scheme}://{host}{path}"


def resolve_and_normalize(page_url, href):
    """Resolve relative href against page_url, then normalize."""
    if not href or href.startswith(("mailto:", "javascript:", "#")):
        return None
    if href.startswith(("http://", "https://")):
        raw = href
    elif href.startswith("//"):
        raw = "https:" + href
    elif href.startswith("/"):
        parsed = urllib.parse.urlparse(page_url)
        raw = f"{parsed.scheme}://{parsed.netloc}{href}"
    else:
        page_dir = page_url.rsplit("/", 1)[0]
        raw = page_dir + "/" + href
    return normalize_url(raw)


def is_internal_page(url):
    if not url:
        return False
    parsed = urllib.parse.urlparse(url)
    if "yankeechihuahuarescue.org" not in parsed.netloc:
        return False
    path = parsed.path.lower()
    # Skip guestbook, file:// links, etc.
    for prefix in SKIP_PREFIXES:
        if prefix in path:
            return False
    # Must be a page extension (or no extension for root)
    return any(path.endswith(e) for e in PAGE_EXTENSIONS) or path == "/" or path.endswith("/")


def is_internal_image(url):
    if not url:
        return False
    parsed = urllib.parse.urlparse(url)
    return "yankeechihuahuarescue.org" in parsed.netloc and is_image(parsed.path)


def fetch(url):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            return resp.read()
    except Exception:
        return None


def url_to_local_path(img_url):
    parsed = urllib.parse.urlparse(img_url)
    path = urllib.parse.unquote(parsed.path).lstrip("/")
    parts = path.split("/")
    sanitized = []
    for part in parts:
        part = part.replace(" ", "-").lower()
        part = re.sub(r'[^a-z0-9._-]', '', part)
        if part:
            sanitized.append(part)
    return OUTPUT_DIR / "/".join(sanitized) if sanitized else None


def main():
    print("=" * 70, flush=True)
    print("YCR Crawler (parallel, normalized URLs)", flush=True)
    print("=" * 70, flush=True)

    visited = set()
    queue = [BASE_URL + "/index.html"]
    all_images = defaultdict(set)
    page_images = {}

    while queue:
        batch = []
        for url in queue:
            n = normalize_url(url)
            if n and n not in visited:
                visited.add(n)
                batch.append(n)
        queue = []
        if not batch:
            break

        print(f"\nBatch: {len(batch)} pages", flush=True)

        results = {}
        with ThreadPoolExecutor(max_workers=MAX_WORKERS) as pool:
            futures = {pool.submit(fetch, u): u for u in batch}
            for f in as_completed(futures):
                u = futures[f]
                data = f.result()
                if data:
                    results[u] = data.decode("utf-8", errors="replace")
                    print(f"  OK: {u.replace(BASE_URL, '')}", flush=True)
                else:
                    print(f"  FAIL: {u.replace(BASE_URL, '')}", flush=True)

        for url, html in results.items():
            ext = LinkAndImageExtractor()
            ext.feed(html)

            # Also find url() and href images
            for m in re.findall(r'url\(["\']?([^"\')\s]+)["\']?\)', html):
                if is_image(m):
                    ext.images.add(m)
            for m in re.findall(r'href=["\']([^"\']+\.(?:jpg|jpeg|png|gif|webp|svg|bmp|ico))["\']', html, re.IGNORECASE):
                ext.images.add(m)

            resolved = set()
            for src in ext.images:
                abs_url = resolve_and_normalize(url, src)
                if abs_url and is_internal_image(abs_url):
                    resolved.add(abs_url)
                    all_images[abs_url].add(url)
            page_images[url] = resolved

            for href in ext.links:
                abs_link = resolve_and_normalize(url, href)
                if abs_link and is_internal_page(abs_link) and abs_link not in visited:
                    queue.append(abs_link)

    # Summary
    print(f"\n{'=' * 70}", flush=True)
    print(f"Crawled {len(visited)} pages, found {len(all_images)} unique images", flush=True)
    print("=" * 70, flush=True)

    # Categorize
    nav, holiday, content = set(), set(), set()
    for img in all_images:
        p = urllib.parse.urlparse(img).path.lower()
        if any(x in p for x in ["button6", "button7", "button8", "logo/",
                                  "find_us_on_facebook"]):
            nav.add(img)
        elif "holiday" in p:
            holiday.add(img)
        else:
            content.add(img)

    print(f"\n  Nav/UI: {len(nav)}, Holiday: {len(holiday)}, Content: {len(content)}")

    for label, group in [("CONTENT", content), ("HOLIDAY", holiday), ("NAV/UI", nav)]:
        print(f"\n  {label}:")
        for img in sorted(group):
            pages = [p.replace(BASE_URL, "") for p in sorted(all_images[img])]
            print(f"    {img.replace(BASE_URL, '')}")
            print(f"      Pages: {', '.join(pages)}")

    # Download
    print(f"\n{'=' * 70}", flush=True)
    print("DOWNLOADING", flush=True)
    print("=" * 70, flush=True)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    to_dl = []
    for img_url in sorted(all_images):
        lp = url_to_local_path(img_url)
        if lp and not lp.exists():
            to_dl.append((img_url, lp))

    print(f"  {len(all_images)} total, {len(to_dl)} new", flush=True)

    def dl(item):
        url, path = item
        path.parent.mkdir(parents=True, exist_ok=True)
        data = fetch(url)
        if data and len(data) >= 100:
            with open(path, "wb") as f:
                f.write(data)
            return ("ok", url, len(data))
        return ("fail", url, 0)

    ok = fail = 0
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as pool:
        for status, url, size in pool.map(dl, to_dl):
            if status == "ok":
                ok += 1
                print(f"  NEW ({size:,}b): {url.replace(BASE_URL, '')}", flush=True)
            else:
                fail += 1
                print(f"  FAIL: {url.replace(BASE_URL, '')}", flush=True)

    print(f"\n  New: {ok}, Existed: {len(all_images) - len(to_dl)}, Failed: {fail}", flush=True)

    # Mapping file
    mapping = PROJECT_ROOT / "scripts" / "image_mapping.txt"
    with open(mapping, "w") as f:
        f.write("# Image mapping\n\n")
        for img in sorted(all_images):
            lp = url_to_local_path(img)
            pages = [p.replace(BASE_URL, "") for p in sorted(all_images[img])]
            f.write(f"URL: {img}\n")
            if lp:
                f.write(f"LOCAL: {lp.relative_to(PROJECT_ROOT)}\n")
            f.write(f"PAGES: {', '.join(pages)}\n\n")
    print(f"\nMapping: {mapping}", flush=True)


if __name__ == "__main__":
    main()
