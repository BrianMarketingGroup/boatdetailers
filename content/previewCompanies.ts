import { IMAGES } from "./images";

export interface PreviewCompany {
  id: number;
  name: string;
  services: string[];
  rating: number;
  reviewCount: number;
  phone: string;
  location: string;
  servingArea: string;
  imageUrl: string;
  featured?: boolean;
  rank?: number;
}

export const previewCompanies: PreviewCompany[] = [
  {
    id: 1,
    name: "Coastal Marine Detailing",
    services: ["Ceramic Coatings", "Gel Coat Restoration", "Full Boat Detailing"],
    rating: 5.0,
    reviewCount: 184,
    phone: "(813) 555-2200",
    location: "Tampa, FL",
    servingArea: "Tampa Bay & Gulf Coast",
    imageUrl: IMAGES.companyFeatured,
    featured: true,
  },
  {
    id: 2,
    name: "BlueWave Boat Care",
    services: ["Wash & Wax Services", "Teak Cleaning & Restoration", "Interior Detailing"],
    rating: 4.9,
    reviewCount: 247,
    phone: "(813) 444-7700",
    location: "Tampa, FL",
    servingArea: "Serving Tampa Bay",
    imageUrl: IMAGES.companyOne,
    rank: 1,
  },
  {
    id: 3,
    name: "Precision Marine Services",
    services: ["Paint Correction", "Ceramic Coatings", "Yacht Detailing"],
    rating: 4.8,
    reviewCount: 163,
    phone: "(813) 310-4400",
    location: "Tampa, FL",
    servingArea: "Serving Tampa Bay",
    imageUrl: IMAGES.companyTwo,
    rank: 2,
  },
  {
    id: 4,
    name: "Harbor Shine Detailing",
    services: ["Mobile & Dockside Detailing", "Gel Coat Restoration", "Metal Polishing"],
    rating: 4.7,
    reviewCount: 119,
    phone: "(813) 555-8800",
    location: "Tampa, FL",
    servingArea: "Serving Tampa Bay",
    imageUrl: IMAGES.companyThree,
    rank: 3,
  },
];
