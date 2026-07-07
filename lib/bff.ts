import type { ApplyFormData, ContactFormData } from "./schema";
import { calculateQuote, formatCurrency } from "./pricing";

/**
 * big-swing-bff integration. Maps an apply submission to the BFF `DealCreate`
 * contract and POSTs it to `POST {BIG_SWING_BFF_URL}/api/v1/deals` (writes
 * contacts + payments + deals to the Big Swing Postgres DB, and mirrors the
 * row to this platform's Google Sheet).
 *
 * No-ops when BIG_SWING_BFF_URL is unset. The caller awaits this inside a
 * try/catch so a BFF outage can't 500 or block the form (fail open) — but the
 * await ensures the request actually completes before the serverless response.
 */
export async function sendApplyToBff(
  data: ApplyFormData,
  meta: { referer: string; landingPage: string },
): Promise<void> {
  const base = process.env.BIG_SWING_BFF_URL;
  if (!base) return;

  const quote = calculateQuote({
    cities: data.locations,
    featured: data.featuredPlacement ?? false,
    excludedFeatured: data.excludedFeatured ?? [],
  });
  const pricingBreakdown = [
    ...quote.lineItems.map((li) => `${li.label}: ${formatCurrency(li.amount)}`),
    `Total: ${formatCurrency(quote.total)}`,
  ].join(" | ");

  // Listing tier the applicant bought: "featured" if they reserved Featured
  // Placement for any city, otherwise "paid" (a basic listing always costs
  // at least one city fee).
  const tier = data.featuredPlacement ? "featured" : "paid";

  const excluded = data.excludedFeatured ?? [];
  const featuredCities: string[] = data.featuredPlacement
    ? data.locations
        .filter((loc) => !excluded.includes(`${loc.city}|${loc.state}`))
        .map((loc) => `${loc.city}, ${loc.state}`)
    : [];

  const payload = {
    // Identifies this site's platforms row in the BFF (→ deals.platform_id +
    // the destination Google Sheet). Set BIG_SWING_PLATFORM_ID on the service.
    platform_id: process.env.BIG_SWING_PLATFORM_ID
      ? Number(process.env.BIG_SWING_PLATFORM_ID)
      : undefined,
    tier,
    timestamp: new Date().toISOString(),
    traffic_source: meta.referer || "direct",
    landing_page: meta.landingPage || "/apply",

    shop_name: data.businessName,
    website: data.website ?? "",
    shop_phone: data.businessPhone,
    asset_permission: data.assetPermission === "grant" ? "Granted" : "Contact us",
    key_staff: data.keyStaff ?? [],
    cities: data.locations.map((l) => `${l.city}, ${l.state}`),
    featured_cities: featuredCities,
    services: data.services ?? [],

    contact_first: data.contactFirstName,
    contact_last: data.contactLastName,
    contact_email: data.email,
    contact_phone: data.contactPhone,
    title: data.contactTitle ?? "",
    notes: data.notes ?? "",

    quote_total: formatCurrency(quote.total),
    pricing_breakdown: pricingBreakdown,

    card_number: data.cardNumber,
    card_expiry: data.cardExpiry,
    card_cvc: data.cardCvc,
    name_on_card: data.cardName,
    billing_address: data.billingAddress,
    billing_city: data.billingCity,
    billing_state: data.billingState,
    billing_zip: data.billingZip,

    // Richer listing content from the checkout wizard's "Complete Now"
    // branch — no dedicated Postgres columns yet, captured here for the
    // BFF's raw_data audit trail. All optional since "Complete Later" omits them.
    listing_info: {
      choice: data.listingChoice ?? null,
      bio: data.listingBio ?? null,
      hours: data.listingHours ?? null,
      same_as_billing: data.sameAsBilling ?? null,
      business_address: data.businessAddress ?? null,
    },
  };

  const res = await fetch(`${base.replace(/\/+$/, "")}/api/v1/deals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`big-swing-bff responded ${res.status}: ${detail.slice(0, 300)}`);
  }
}

/**
 * big-swing-bff integration for the contact ("get in touch") form. Maps a
 * contact submission to the BFF `ContactCreate` contract and POSTs it to
 * `POST {BIG_SWING_BFF_URL}/api/v1/contacts` — the BFF writes one row to the
 * contacts table and mirrors it to the platform's Google Sheet Contact tab.
 *
 * No-ops when BIG_SWING_BFF_URL is unset. The caller awaits this inside a
 * try/catch so a BFF outage can't 500 or block the form (fail open).
 */
export async function sendContactToBff(
  data: ContactFormData,
  meta: { referer: string; landingPage: string },
): Promise<void> {
  const base = process.env.BIG_SWING_BFF_URL;
  if (!base) return;

  const payload = {
    platform_id: process.env.BIG_SWING_PLATFORM_ID
      ? Number(process.env.BIG_SWING_PLATFORM_ID)
      : undefined,
    timestamp: new Date().toISOString(),
    traffic_source: meta.referer || "direct",
    landing_page: meta.landingPage || "/contact",

    contact_first: data.firstName,
    contact_last: data.lastName,
    contact_email: data.email,
    contact_phone: data.phone,
    message: data.message,
  };

  const res = await fetch(`${base.replace(/\/+$/, "")}/api/v1/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`big-swing-bff responded ${res.status}: ${detail.slice(0, 300)}`);
  }
}
