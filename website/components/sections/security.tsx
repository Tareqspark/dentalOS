import Link from "next/link";
import {
  ArrowRight,
  DatabaseBackup,
  FileSearch,
  KeyRound,
  Lock,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import { Badge, Container, SectionHeading } from "../ui/primitives";
import { Stagger, StaggerItem } from "../ui/reveal";
import { securityItems } from "@/lib/data";

const icons = [ShieldCheck, Lock, UserCog, DatabaseBackup, FileSearch, KeyRound];
const anchors = ["hipaa", "encryption", "access", "backups", "audit", "enterprise"];

export function SecuritySection() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          badge={<Badge>Security & compliance</Badge>}
          title="Patient data protected like it's your license on the line. Because it is."
          subtitle="HIPAA isn't a checkbox at DentalOS — it's the architecture. Click any pillar for the full detail."
        />

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {securityItems.map((item, i) => {
            const Icon = icons[i];
            return (
              <StaggerItem key={item.title} className="h-full">
                <Link href={`/security#${anchors[i]}`} className="block h-full">
                  <div className="card group flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-premium dark:hover:border-brand-800">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-950/60 dark:text-brand-300">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-4 font-semibold">{item.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-2)]">{item.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-brand-400">
                      Full details <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
