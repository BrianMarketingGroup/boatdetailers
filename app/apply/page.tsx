import type { Metadata } from "next";
import CheckoutWizard from "@/components/checkout/CheckoutWizard";
import { boatDetailersConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Apply to Be Listed",
  description: "Apply to be listed on BoatDetailers.com. Reach boat owners actively searching for professional marine detailing services in your city.",
};

export default function ApplyPage() {
  return <CheckoutWizard config={boatDetailersConfig} />;
}
