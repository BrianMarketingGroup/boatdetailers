import type { Metadata } from "next";
import { Target, ShieldCheck, Globe } from "lucide-react";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about BoatDetailers.com — the premier directory connecting boat owners with professional marine detailing businesses nationwide.",
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-navy py-14">
        <Container>
          <div className="text-center">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              About BoatDetailers.com
            </h1>
            <p className="text-white/70 text-lg max-w-xl leading-relaxed mx-auto">
              BoatDetailers.com was founded to connect boat owners with trusted, professional marine detailing businesses across the United States.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-16 lg:py-24 max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-muted text-lg leading-relaxed mb-5">
              Launching in 2026, we are building the most comprehensive marine detailing directory in the country — one that detailing businesses are proud to be part of and boat owners can rely on when it matters most.
            </p>
            <p className="text-muted text-lg leading-relaxed mb-12">
              Our mission is simple: recognize excellence, elevate professional marine detailers, and help boat owners find the right service provider.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Target,
                title: "Our Mission",
                body: "Connect boat owners with trusted, professional marine detailers across every service specialty and major U.S. city.",
              },
              {
                icon: ShieldCheck,
                title: "Our Standards",
                body: "Every listed business undergoes a review process. Only professional, active marine detailing businesses are accepted.",
              },
              {
                icon: Globe,
                title: "Our Reach",
                body: "All 50 states. Every major marina market. Launching to the public in August 2026.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <FadeIn key={title}>
                <div className="text-center p-6 rounded-2xl border border-sky-dark bg-sky h-full">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal/10 border border-teal/20 mb-4">
                    <Icon className="h-6 w-6 text-teal" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-navy mb-2">{title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="rounded-2xl border border-sky-dark bg-sky px-8 py-10 text-center">
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                Full team and company details coming soon.
              </h2>
              <p className="text-muted text-base leading-relaxed mb-8 max-w-xl mx-auto">
                We are focused on building the best marine detailing directory in the country. In the meantime, learn about how the listing process works.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button href="/how-it-works" variant="secondary" size="lg">
                  How It Works
                </Button>
                <Button href="/apply" variant="primary" size="lg">
                  Apply to be Listed
                </Button>
                <a
                  href="tel:+18664504873"
                  className="inline-flex items-center gap-2 rounded-xl border border-navy/20 bg-white px-6 py-3 text-base font-semibold text-navy hover:border-teal/40 hover:text-teal transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
                  </svg>
                  (866) 450-4873
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </div>
  );
}
