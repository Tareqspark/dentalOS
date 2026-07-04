import { ArrowRight } from "lucide-react";
import { Button, Container } from "../ui/primitives";
import { Reveal } from "../ui/reveal";

export function FinalCTA() {
  return (
    <section className="py-24 md:py-32" id="contact">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-700 via-brand-600 to-ai-700 px-6 py-20 text-center text-white shadow-premium-lg md:px-16 md:py-24">
            {/* animated background accents */}
            <div className="bg-dots absolute inset-0 opacity-15" />
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-ai-400/30 blur-3xl" />

            <div className="relative">
              <h2 className="mx-auto max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl md:leading-[1.12]">
                Your competitors' phones ring to voicemail. Yours won't.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-white/80">
                See DentalOS on your own practice's numbers. A 30-minute demo, your data migrated free, and a team
                that's live in weeks — not months.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Button
                  href="mailto:hello@dentalos.com?subject=Demo%20request"
                  variant="secondary"
                  size="lg"
                  className="!bg-white !text-brand-700 hover:!bg-brand-50"
                >
                  Book a Demo <ArrowRight size={17} />
                </Button>
                <Button
                  href="#pricing"
                  size="lg"
                  className="!bg-white/10 !text-white !shadow-none ring-1 ring-white/30 hover:!bg-white/20"
                >
                  Start Free Trial
                </Button>
                <Button href="mailto:sales@dentalos.com" variant="ghost" size="lg" className="!text-white/80 hover:!text-white">
                  Contact Sales
                </Button>
              </div>
              <p className="mt-7 text-sm text-white/60">
                No credit card required · Free migration · Cancel anytime
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
