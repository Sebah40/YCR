import { google, type sheets_v4 } from "googleapis";
import { randomUUID } from "node:crypto";

/**
 * Guestbook entries are stored in a single Google Sheet tab.
 *
 * Sheet layout (row 1 is the header row):
 *   A   B          C     D         E      F        G      H         I
 *   id  createdAt  name  location  email  message  reply  approved  deleted
 *
 * `approved` and `deleted` are TRUE/FALSE booleans (Sheets renders them as
 * checkboxes if the column is formatted that way; we accept either the
 * string "TRUE"/"FALSE" or actual booleans on read).
 */

const TAB_NAME = "Guestbook";
const HEADER_RANGE = `${TAB_NAME}!A1:I1`;
const DATA_RANGE = `${TAB_NAME}!A2:I`;

export interface GuestbookEntry {
  id: string;
  createdAt: string; // ISO 8601
  name: string;
  location: string;
  email: string;
  message: string;
  reply: string; // admin response, empty string if none
  approved: boolean;
  deleted: boolean;
}

export interface SubmitInput {
  name: string;
  location?: string;
  email?: string;
  message: string;
}

let cachedSheets: sheets_v4.Sheets | null = null;

function getEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

function getSheetId(): string {
  return getEnv("GUESTBOOK_SHEET_ID");
}

function getServiceAccountCredentials(): { client_email: string; private_key: string } {
  const raw = getEnv("GOOGLE_SERVICE_ACCOUNT_JSON");
  let parsed: { client_email?: string; private_key?: string };
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON");
  }
  if (!parsed.client_email || !parsed.private_key) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON missing client_email or private_key");
  }
  // Vercel env vars escape newlines; restore them for the PEM block.
  return {
    client_email: parsed.client_email,
    private_key: parsed.private_key.replace(/\\n/g, "\n"),
  };
}

async function getSheetsClient(): Promise<sheets_v4.Sheets> {
  if (cachedSheets) return cachedSheets;
  const creds = getServiceAccountCredentials();
  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  cachedSheets = google.sheets({ version: "v4", auth });
  return cachedSheets;
}

function rowToEntry(row: unknown[]): GuestbookEntry | null {
  if (!row || row.length === 0) return null;
  const [id, createdAt, name, location, email, message, reply, approved, deleted] = row as string[];
  if (!id) return null;
  return {
    id: String(id),
    createdAt: String(createdAt ?? ""),
    name: String(name ?? ""),
    location: String(location ?? ""),
    email: String(email ?? ""),
    message: String(message ?? ""),
    reply: String(reply ?? ""),
    approved: toBool(approved),
    deleted: toBool(deleted),
  };
}

function toBool(v: unknown): boolean {
  if (typeof v === "boolean") return v;
  if (typeof v === "string") return v.toUpperCase() === "TRUE";
  return false;
}

function entryToRow(e: GuestbookEntry): (string | boolean)[] {
  return [e.id, e.createdAt, e.name, e.location, e.email, e.message, e.reply, e.approved, e.deleted];
}

/** Read every entry from the sheet. Filters out blank rows. */
export async function listAllEntries(): Promise<GuestbookEntry[]> {
  const sheets = await getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: getSheetId(),
    range: DATA_RANGE,
    valueRenderOption: "UNFORMATTED_VALUE",
  });
  const rows = res.data.values ?? [];
  return rows.map(rowToEntry).filter((e): e is GuestbookEntry => e !== null);
}

/** Entries shown on the public /guestbook page. */
export async function listApprovedEntries(): Promise<GuestbookEntry[]> {
  const all = await listAllEntries();
  return all
    .filter((e) => e.approved && !e.deleted)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Entries shown in admin moderation. */
export async function listPendingEntries(): Promise<GuestbookEntry[]> {
  const all = await listAllEntries();
  return all
    .filter((e) => !e.approved && !e.deleted)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

/** Append a new entry (unapproved). Returns the created entry. */
export async function submitEntry(input: SubmitInput): Promise<GuestbookEntry> {
  const entry: GuestbookEntry = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name: input.name.trim(),
    location: (input.location ?? "").trim(),
    email: (input.email ?? "").trim(),
    message: input.message.trim(),
    reply: "",
    approved: false,
    deleted: false,
  };
  const sheets = await getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: getSheetId(),
    range: DATA_RANGE,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [entryToRow(entry)] },
  });
  return entry;
}

/**
 * Find the row number (1-indexed including header) for an entry id, then
 * write the patched values back. Returns null if not found.
 */
async function updateEntry(
  id: string,
  patch: Partial<Pick<GuestbookEntry, "approved" | "deleted" | "reply">>
): Promise<GuestbookEntry | null> {
  const sheets = await getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: getSheetId(),
    range: DATA_RANGE,
    valueRenderOption: "UNFORMATTED_VALUE",
  });
  const rows = res.data.values ?? [];
  const idx = rows.findIndex((row) => String(row?.[0] ?? "") === id);
  if (idx === -1) return null;

  const current = rowToEntry(rows[idx]);
  if (!current) return null;
  const next: GuestbookEntry = { ...current, ...patch };

  // +2 because rows[] is 0-indexed and the data starts at sheet row 2 (after the header).
  const sheetRow = idx + 2;
  await sheets.spreadsheets.values.update({
    spreadsheetId: getSheetId(),
    range: `${TAB_NAME}!A${sheetRow}:I${sheetRow}`,
    valueInputOption: "RAW",
    requestBody: { values: [entryToRow(next)] },
  });
  return next;
}

export function setReply(id: string, reply: string) {
  return updateEntry(id, { reply });
}

export function approveEntry(id: string) {
  return updateEntry(id, { approved: true });
}

export function unapproveEntry(id: string) {
  return updateEntry(id, { approved: false });
}

/** Soft delete — flips the deleted flag, doesn't remove the row. */
export function deleteEntry(id: string) {
  return updateEntry(id, { deleted: true });
}

export function restoreEntry(id: string) {
  return updateEntry(id, { deleted: false });
}

/**
 * One-time bulk import. Appends many entries at once. Each entry should be
 * fully formed with id + createdAt + approved flag set as desired.
 */
export async function bulkImport(entries: GuestbookEntry[]): Promise<number> {
  if (entries.length === 0) return 0;
  const sheets = await getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: getSheetId(),
    range: DATA_RANGE,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: entries.map(entryToRow) },
  });
  return entries.length;
}

/**
 * Ensure the Guestbook tab exists with the correct header row. Safe to call
 * on every cold start. Creates the tab if it doesn't exist; writes the header
 * row if it's missing.
 */
export async function ensureHeader(): Promise<void> {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSheetId();

  // Step 1: check whether the Guestbook tab exists.
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const tab = meta.data.sheets?.find((s) => s.properties?.title === TAB_NAME);

  if (!tab) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: TAB_NAME } } }],
      },
    });
  }

  // Step 2: write header row if it's missing.
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: HEADER_RANGE,
  });
  const existing = res.data.values?.[0] ?? [];
  if (existing.length >= 9) return;
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: HEADER_RANGE,
    valueInputOption: "RAW",
    requestBody: {
      values: [
        ["id", "createdAt", "name", "location", "email", "message", "reply", "approved", "deleted"],
      ],
    },
  });
}
