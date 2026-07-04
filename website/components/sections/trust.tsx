import { Cloud, Headset, Lock, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "../ui/primitives";
import { Reveal } from "../ui/reveal";

const items = [
  { icon: ShieldCheck, label: "HIPAA Ready" },
  { icon: Cloud, label: "Cloud Based" },
  { icon: Lock, label: "Bank-Grade Security" },
  { icon: Sparkles, label: "AI Powered" },
  { icon: Rocket, label: "Live in 2–4 Weeks" },
  { icon: Headset, label: "24/7 Support" },
];

export function TrustBar() {
  return (
    <section className="border-y border-[var(--hairline)] bg-[var(--surface)] py-8">
      <Container>
        <Reveal>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
            {items.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center justify-center gap-2.5 text-sm font-medium text-[var(--ink-2)]">
                <Icon size={18} className="shrink-0 text-brand-600 dark:text-brand-400" />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
