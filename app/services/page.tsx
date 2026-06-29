import type { Metadata } from "next";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import { detailingServices } from "@/content/services";

export const metadata: Metadata = {
  title: "Highlighted Services",
  description: "Browse the marine detailing service specialties available on BoatDetailers.com — from wash & wax and ceramic coatings to gel coat restoration and yacht detailing.",
};

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-navy py-14">
        <Container>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">Detailing Services</h1>
          <p className="text-white/70 text-lg max-w-lg leading-relaxed">
            BoatDetailers.com covers the full spectrum of marine detailing services — so boat owners can find a
            professional who matches their exact needs.
          </p>
        </Container>
      </div>

      <Container>
        <div className="py-16 lg:py-20">
          <FadeIn>
            <p className="text-muted text-lg leading-relaxed max-w-2xl mb-14">
              When you apply, select all the services your business offers. These appear on your listing
              and help boat owners instantly understand your specialties. Your service selections do not
              affect pricing — the basic listing fee covers all specialties.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {detailingServices.map((service, i) => (
              <FadeIn key={service.id} delay={i * 0.05}>
                <div className="rounded-2xl border border-sky-dark bg-sky p-6 h-full">
                  <h2 className="font-display text-xl font-bold text-navy mb-2">{service.label}</h2>
                  <p className="text-sm text-muted mb-4 leading-relaxed">{service.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.specialties.map((s) => (
                      <span key={s} className="text-xs bg-white border border-sky-dark text-navy px-2.5 py-1 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="rounded-2xl bg-navy p-8 text-center">
              <h2 className="font-display text-2xl font-bold text-white mb-3">Ready to Get Listed?</h2>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                Select your service specialties when you apply. Every qualifying business is accepted.
              </p>
              <Button href="/apply" variant="primary" size="lg">Apply Now</Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </div>
  );
}
