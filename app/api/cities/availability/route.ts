import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { getCache, setCache } from "@/lib/availabilityCache";

/*
 * GET /api/cities/availability?cities=[{"city":"Austin","state":"TX"}]
 *
 * Returns which of the requested cities already have their Featured
 * Placement slot sold: { takenSlots: ["City|ST", ...] }.
 *
 * Source of truth is the BFF featured_claims API (the directory's real
 * claims). Falls back to the legacy "Featured-Placement-City" Google Sheet
 * tab when BIG_SWING_BFF_URL is unset or the BFF call fails — same "fail
 * open toward availability" behavior either way.
 */

const TAB = "Featured-Placement-City";
const CACHE_KEY = "taken-cities";

async function getTakenFromBff(): Promise<{ state: string; city: string }[] | null> {
  const base = process.env.BIG_SWING_BFF_URL;
  const platformId = process.env.BIG_SWING_PLATFORM_ID;
  if (!base || !platformId) return null;
  try {
    const res = await fetch(
      `${base.replace(/\/+$/, "")}/api/v1/featured-claims?platform_id=${Number(platformId)}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return (data.items ?? []).map((i: { city: string; state: string }) => ({
      state: (i.state ?? "").toString().trim(),
      city: (i.city ?? "").toString().trim(),
    }));
  } catch {
    return null;
  }
}

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  const credentials = JSON.parse(Buffer.from(raw, "base64").toString("utf-8"));
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
}

async function getTakenFromSheet(): Promise<{ state: string; city: string }[]> {
  const auth = getAuth();
  const sheetId = process.env.LEADS_SHEET_ID;
  if (!auth || !sheetId) return [];

  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client as never });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${TAB}!A:E`,
  });

  const rows = res.data.values ?? [];
  // Columns: A=state, B=city, C=status
  return rows
    .slice(1)
    .filter((r) => r[0] && r[1] && r[2] !== "cancelled")
    .map((r) => ({
      state: (r[0] ?? "").toString().trim(),
      city: (r[1] ?? "").toString().trim(),
    }));
}

async function getTakenCitiesCached(): Promise<{ state: string; city: string }[]> {
  const cached = getCache(CACHE_KEY);
  if (cached) return JSON.parse(cached.join("")) as { state: string; city: string }[];

  const fromBff = await getTakenFromBff();
  const taken = fromBff ?? (await getTakenFromSheet());

  setCache(CACHE_KEY, [JSON.stringify(taken)]);
  return taken;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const citiesParam = searchParams.get("cities");

  let requestedCities: { city: string; state: string }[] = [];
  try {
    requestedCities = citiesParam ? JSON.parse(citiesParam) : [];
  } catch {
    requestedCities = [];
  }

  try {
    const taken = await getTakenCitiesCached();
    const takenSlots = requestedCities
      .filter((rc) =>
        taken.some(
          (t) =>
            t.state.toLowerCase() === rc.state.toLowerCase() &&
            t.city.toLowerCase() === rc.city.toLowerCase(),
        ),
      )
      .map((rc) => `${rc.city}|${rc.state}`);
    return NextResponse.json({ takenSlots });
  } catch (err) {
    console.error("[availability] read failed:", err);
    // Fail open — don't block the form if the source is unreachable
    return NextResponse.json({ takenSlots: [] });
  }
}
