export interface DetailingService {
  id: string;
  label: string;
  description: string;
  specialties: string[];
}

export const detailingServices: DetailingService[] = [
  {
    id: "wash-wax",
    label: "Wash & Wax Services",
    description: "Complete exterior washing and hand-wax treatments to protect and shine",
    specialties: [
      "Hand Wash & Rinse",
      "Boat Waxing",
      "Hull Polishing",
      "Fiberglass Cleaning",
      "Topside Detailing",
    ],
  },
  {
    id: "full-detailing",
    label: "Full Boat Detailing",
    description: "Comprehensive interior and exterior detailing packages",
    specialties: [
      "Interior & Exterior Package",
      "Deep Cleaning",
      "Decontamination Treatment",
      "Surface Inspection",
      "Detailing Documentation",
    ],
  },
  {
    id: "yacht-detailing",
    label: "Yacht Detailing",
    description: "Premium detailing services tailored for larger vessels and yachts",
    specialties: [
      "Superyacht Detailing",
      "Motor Yacht Services",
      "Sailing Yacht Detailing",
      "Multi-Day Detail Projects",
      "Marina & Boatyard Service",
    ],
  },
  {
    id: "gel-coat",
    label: "Gel Coat Restoration",
    description: "Restoring oxidized and faded gel coat to a like-new finish",
    specialties: [
      "Oxidation Removal",
      "Gel Coat Compounding",
      "Color Restoration",
      "Scratch & Swirl Removal",
      "Protective Sealant Application",
    ],
  },
  {
    id: "ceramic-coatings",
    label: "Ceramic Coatings",
    description: "Long-lasting ceramic protection for hull, deck, and surfaces",
    specialties: [
      "Marine Ceramic Coating",
      "Hull Protection",
      "Deck Surface Coating",
      "UV Protection Treatment",
      "Hydrophobic Coatings",
    ],
  },
  {
    id: "paint-correction",
    label: "Paint Correction",
    description: "Multi-stage machine polishing to remove defects and restore gloss",
    specialties: [
      "Single-Stage Correction",
      "Multi-Stage Polishing",
      "Swirl Mark Removal",
      "Water Spot Removal",
      "Gloss Enhancement",
    ],
  },
  {
    id: "teak",
    label: "Teak Cleaning & Restoration",
    description: "Specialized care for teak decks, trim, and woodwork",
    specialties: [
      "Teak Deck Cleaning",
      "Teak Brightening",
      "Teak Sealing & Oiling",
      "Teak Rail Restoration",
      "Mold & Mildew Treatment",
    ],
  },
  {
    id: "metal-polishing",
    label: "Metal Polishing",
    description: "Polishing and restoring stainless steel, chrome, and aluminum",
    specialties: [
      "Stainless Steel Polishing",
      "Chrome Restoration",
      "Aluminum Brightening",
      "Cleat & Hardware Polishing",
      "Metal Protective Coating",
    ],
  },
  {
    id: "interior-detailing",
    label: "Interior Detailing",
    description: "Full interior cleaning, upholstery care, and surface protection",
    specialties: [
      "Upholstery Cleaning",
      "Vinyl Conditioning",
      "Carpet & Floor Cleaning",
      "Cabin Deep Cleaning",
      "Odor Elimination",
    ],
  },
  {
    id: "engine-compartment",
    label: "Engine Compartment Cleaning",
    description: "Safe degreasing and detailing of engine bays and mechanical spaces",
    specialties: [
      "Engine Bay Degreasing",
      "Bilge Cleaning",
      "Mechanical Space Detailing",
      "Corrosion Prevention",
      "Engine Compartment Protection",
    ],
  },
  {
    id: "bottom-cleaning",
    label: "Bottom Cleaning",
    description: "Underwater hull cleaning to remove growth and maintain performance",
    specialties: [
      "Underwater Hull Scrubbing",
      "Antifouling Treatment",
      "Running Gear Cleaning",
      "Prop & Shaft Cleaning",
      "Zinc Inspection",
    ],
  },
  {
    id: "mobile-detailing",
    label: "Mobile & Dockside Detailing",
    description: "On-location service at your marina, dock, or storage facility",
    specialties: [
      "Dockside Service",
      "Marina-Based Detailing",
      "Dry Storage Detailing",
      "On-Demand Mobile Service",
      "Monthly Maintenance Programs",
    ],
  },
];

export const allServiceIds: string[] = detailingServices.map((s) => s.id);
export const allServiceLabels: string[] = detailingServices.map((s) => s.label);
