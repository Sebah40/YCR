#!/usr/bin/env node
// One-shot importer. Reads scripts/extracted/guestbook_import.json and pushes
// every entry into the Google Sheet via lib/guestbook.bulkImport().
//
// Run from project root after .env.local is populated:
//   node --env-file=.env.local scripts/import_guestbook.mjs
//
// Idempotency: the importer will fail loudly if the sheet already has rows,
// to avoid accidental duplicate inserts. Pass --force to import anyway.

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// Loaded via `node --import tsx --env-file=.env.local scripts/import_guestbook.mjs`
const { ensureHeader, listAllEntries, bulkImport } = await import(
  resolve(root, "src/lib/guestbook.ts")
);

const FORCE = process.argv.includes("--force");

const data = JSON.parse(
  readFileSync(resolve(root, "scripts/extracted/guestbook_import.json"), "utf8")
);

console.log(`Loaded ${data.length} entries from JSON.`);

console.log("Ensuring header row...");
await ensureHeader();

console.log("Reading existing entries from sheet...");
const existing = await listAllEntries();
console.log(`Sheet currently has ${existing.length} entries.`);

if (existing.length > 0 && !FORCE) {
  console.error(
    "Refusing to import: sheet already has entries. Pass --force to import anyway."
  );
  process.exit(1);
}

console.log("Importing...");
const n = await bulkImport(data);
console.log(`Imported ${n} entries.`);
