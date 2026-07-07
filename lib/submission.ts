import type { ApplyFormData } from "@/lib/schema";
import type { SiteConfig } from "@/lib/config";
import type { SelectedMarket } from "@/lib/checkoutMarkets";
import type { ContactInfo, PaymentInfo, ListingInfo } from "@/lib/store/checkoutStore";

/**
 * Maps the checkout wizard's store state into boatdetailers' existing
 * ApplyFormData shape, so it can be POSTed straight to the existing
 * /api/apply route (which validates against applySchema and calls the BFF
 * via lib/bff.ts — this function does not talk to the BFF directly).
 */
export function buildApplyPayload(params: {
  config: SiteConfig;
  selectedMarkets: SelectedMarket[];
  specialtyIds: string[];
  contact: ContactInfo;
  payment: PaymentInfo;
  listingChoice: "now" | "later";
  listingInfo: ListingInfo | null;
}): ApplyFormData {
  const serviceOptions = params.config.specialty?.options ?? [];
  const serviceLabels = serviceOptions
    .filter((o) => params.specialtyIds.includes(o.id))
    .map((o) => o.label);

  const excludedFeatured = params.selectedMarkets
    .filter((m) => !m.featured)
    .map((m) => `${m.city}|${m.state}`);
  const featuredPlacement = params.selectedMarkets.some((m) => m.featured);

  return {
    type: "apply",
    businessName: params.listingInfo?.businessName || params.contact.company,
    website: params.listingInfo?.website ?? "",
    businessPhone: params.listingInfo?.listingPhone || params.contact.phone,
    assetPermission: (params.listingInfo?.assetPermission ?? true) ? "grant" : "support",
    locations: params.selectedMarkets.map((m) => ({ city: m.city, state: m.state })),
    services: serviceLabels,
    featuredPlacement,
    excludedFeatured,
    contactFirstName: params.contact.firstName,
    contactLastName: params.contact.lastName,
    email: params.contact.email,
    contactPhone: params.contact.phone,
    contactTitle: params.contact.title,
    notes: params.contact.notes,
    cardNumber: params.payment.cardNumber,
    cardExpiry: params.payment.expiry,
    cardCvc: params.payment.cvv,
    cardName: params.payment.cardholderName,
    billingAddress: params.payment.billingAddress,
    billingCity: params.payment.billingCity,
    billingState: params.payment.billingState,
    billingZip: params.payment.billingZip,
    consentToTerms: true,

    listingChoice: params.listingChoice,
    listingBio: params.listingInfo?.bio,
    listingHours: params.listingInfo?.hours,
    sameAsBilling: params.listingInfo?.sameAsBilling,
    businessAddress: params.listingInfo?.businessAddress ?? null,
    keyStaff: params.listingInfo?.people
      ? params.listingInfo.people.split(",").map((s) => s.trim()).filter(Boolean)
      : [],
  };
}
