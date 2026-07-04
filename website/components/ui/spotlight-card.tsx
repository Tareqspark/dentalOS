"use client";

import clsx from "clsx";
import type { ReactNode, MouseEvent } from "react";

/** Card whose background spotlights toward the cursor. */
export function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <div onMouseMove={onMove} className={clsx("spotlight card rounded-2xl", className)}>
      {children}
    </div>
  );
}
