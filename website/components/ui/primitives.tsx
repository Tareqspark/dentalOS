import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "ai";
  size?: "md" | "lg";
  children: ReactNode;
  className?: string;
};

export function Button({ href, variant = "primary", size = "md", children, className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "btn-sheen inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.97]",
        size === "lg" ? "px-7 py-3.5 text-base" : "px-5 py-2.5 text-sm",
        variant === "primary" &&
          "bg-brand-600 text-white shadow-glow hover:bg-brand-500 hover:shadow-premium-lg",
        variant === "ai" &&
          "bg-gradient-to-r from-brand-600 to-ai-600 text-white shadow-glow-ai hover:brightness-110",
        variant === "secondary" &&
          "card text-[var(--ink)] shadow-premium hover:border-brand-300 dark:hover:border-brand-800",
        variant === "ghost" && "text-[var(--ink-2)] hover:text-[var(--ink)]",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold tracking-wide text-brand-700",
        "dark:border-brand-800 dark:bg-brand-950/50 dark:text-brand-300",
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
}: {
  badge?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div className={clsx("mb-12 max-w-3xl md:mb-16", align === "center" ? "mx-auto text-center" : "text-left")}>
      {badge && <div className="mb-4">{badge}</div>}
      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-balance text-base leading-relaxed text-[var(--ink-2)] sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
