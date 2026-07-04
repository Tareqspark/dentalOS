import { Star } from "lucide-react";
import { Badge, Container, SectionHeading } from "../ui/primitives";
import { Stagger, StaggerItem } from "../ui/reveal";
import { testimonials } from "@/lib/data";

export function TestimonialsSection() {
  return (
    <section className="bg-[var(--surface)] py-24 md:py-32" id="testimonials">
      <Container>
        <SectionHeading
          badge={<Badge>Loved by practices</Badge>}
          title="Dentists don't switch software lightly. Then they see this."
          subtitle="Real results from independent practices across the country."
        />

        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name} className="h-full">
              <figure className="card flex h-full flex-col rounded-2xl p-6 transition-shadow duration-300 hover:shadow-premium-lg">
                <div className="flex text-amber-500" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[var(--ink-2)]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <span className="mt-5 inline-flex w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                  {t.metric}
                </span>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-[var(--hairline)] pt-5">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white ${t.hue}`}
                  >
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-[var(--ink-muted)]">
                      {t.role} · {t.practice}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
