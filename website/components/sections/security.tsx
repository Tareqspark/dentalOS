import { DatabaseBackup, FileSearch, KeyRound, Lock, ShieldCheck, UserCog } from "lucide-react";
import { Badge, Container, SectionHeading } from "../ui/primitives";
import { Stagger, StaggerItem } from "../ui/reveal";
import { securityItems } from "@/lib/data";

const icons = [ShieldCheck, Lock, UserCog, DatabaseBackup, FileSearch, KeyRound];

export function SecuritySection() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          badge={<Badge>Security & compliance</Badge>}
          title="Patient data protected like it's your license on the line. Because it is."
          subtitle="HIPAA isn't a checkbox at DentalOS — it's the architecture. Every layer is built for healthcare from day one."
        />

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {securityItems.map((item, i) => {
            const Icon = icons[i];
            return (
              <StaggerItem key={item.title}>
                <div className="card group h-full rounded-2xl p-6 transition-all duration-300 hover:border-brand-300 hover:shadow-premium dark:hover:border-brand-800">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-950/60 dark:text-brand-300">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-2)]">{item.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
