import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import DirectoryPreview from "@/components/DirectoryPreview";
import Pricing from "@/components/Pricing";
import TopBanner from "@/components/TopBanner";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import { faqItems } from "@/content/faq";

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProps />
      <DirectoryPreview />
      <Pricing />
      <Faq items={faqItems} />
      <TopBanner />
      <FinalCta />
    </>
  );
}
