import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen py-16">
      <Container>
        <div className="max-w-3xl prose prose-sm prose-headings:font-display prose-headings:text-navy prose-a:text-teal">
          <h1 className="font-display text-3xl font-bold text-navy mb-2">Terms of Service</h1>
          <p className="text-muted text-sm mb-8">Last updated: June 2026</p>

          <h2>1. Agreement</h2>
          <p>By submitting a listing application to BoatDetailers.com, you agree to these Terms of Service. These terms govern your listing on the BoatDetailers.com directory.</p>

          <h2>2. Eligibility</h2>
          <p>You must be an active, professional marine detailing business in good standing in the state(s) where you operate. By applying, you represent that this is true and that all information provided is accurate.</p>

          <h2>3. Listing Term and Fees</h2>
          <p>All listings are annual (12 months from the August 2026 launch date). Fees are non-refundable once your listing is confirmed. Featured Listing fees follow the same terms.</p>

          <h2>4. Featured Listing</h2>
          <p>Featured Listing is limited to one business per city on a first-come, first-served basis. If a Featured Listing slot becomes unavailable after your application, we will contact you to discuss alternative arrangements or a refund of the Featured Listing portion.</p>

          <h2>5. Listing Content</h2>
          <p>You grant BoatDetailers.com a non-exclusive license to use your submitted content, photos, and website assets for your listing. We may edit or format your listing for consistency with the directory&apos;s standards.</p>

          <h2>6. Conduct</h2>
          <p>You agree not to provide false information, misrepresent your business, services, or credentials, or engage in any activity that would violate applicable law or regulation.</p>

          <h2>7. Renewal</h2>
          <p>Listings auto-renew annually at the then-current rate unless you cancel at least 30 days before your renewal date. We will send a renewal notice at least 60 days prior.</p>

          <h2>8. Limitation of Liability</h2>
          <p>BoatDetailers.com is not responsible for the actions or omissions of any listed business. The directory is provided for informational purposes only.</p>

          <h2>9. Changes to Terms</h2>
          <p>We may update these terms. Material changes will be communicated by email. Continued use of your listing after the effective date constitutes acceptance.</p>

          <h2>10. Contact</h2>
          <p>Questions? Email us at <a href="mailto:info@boatdetailers.com">info@boatdetailers.com</a>.</p>
        </div>
      </Container>
    </div>
  );
}
