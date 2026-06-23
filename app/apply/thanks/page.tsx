import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Application Received",
};

export default function ThanksPage() {
  return (
    <div className="bg-sky min-h-screen py-24">
      <Container>
        <div className="max-w-lg mx-auto text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-teal/20 border-2 border-teal/30 mb-6 mx-auto">
            <CheckCircle2 className="h-10 w-10 text-teal" />
          </div>
          <h1 className="font-display text-3xl font-bold text-navy mb-4">
            Application Received!
          </h1>
          <p className="text-muted text-lg leading-relaxed mb-8">
            Thank you for applying to BoatDetailers.com. If we need anything to finalize your listing, we&apos;ll reach out. In the meantime, call us anytime at{" "}
            <a href="tel:+18664504873" className="text-teal font-semibold hover:underline">(866) 450-4873</a>.
          </p>
          <div className="rounded-xl border border-navy/10 bg-navy/5 p-6 text-left mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/sailing-boat.svg" alt="" width={20} height={20} className="h-5 w-5 flex-shrink-0" />
              <p className="font-semibold text-navy text-sm">What happens next</p>
            </div>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-teal mt-0.5 flex-shrink-0" /> Our team reviews your application</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-teal mt-0.5 flex-shrink-0" /> We confirm your listing details and Featured Listing selection</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-teal mt-0.5 flex-shrink-0" /> Your listing is finalized and ready for launch</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-teal mt-0.5 flex-shrink-0" /> All listings go live at the August 2026 national launch</li>
            </ul>
          </div>
          <Link href="/" className="text-teal font-medium text-sm hover:underline">
            ← Back to BoatDetailers.com
          </Link>
        </div>
      </Container>
    </div>
  );
}
