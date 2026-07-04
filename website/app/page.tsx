import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust";
import { ProblemSection } from "@/components/sections/problem";
import { SolutionSection } from "@/components/sections/solution";
import { FeaturesSection } from "@/components/sections/features";
import { DashboardShowcase } from "@/components/sections/dashboard-showcase";
import { AISection } from "@/components/sections/ai-section";
import { WorkflowSection } from "@/components/sections/workflow";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { StatsSection } from "@/components/sections/stats";
import { PricingSection } from "@/components/sections/pricing";
import { IntegrationsSection } from "@/components/sections/integrations";
import { SecuritySection } from "@/components/sections/security";
import { FAQSection } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { faqs } from "@/lib/data";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Nav />
      <main id="main">
        <Hero />
        <TrustBar />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <DashboardShowcase />
        <AISection />
        <WorkflowSection />
        <TestimonialsSection />
        <StatsSection />
        <PricingSection />
        <IntegrationsSection />
        <SecuritySection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
