"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

/* Chart colors come from CSS custom properties set in globals.css
   (validated palette: blue series-1, aqua series-2, violet AI accent),
   so light/dark swap automatically with the theme class. */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const PRODUCTION = [58, 62, 60, 71, 68, 76, 74, 83, 80, 88, 92, 97]; // $k
const COLLECTIONS = [52, 57, 56, 65, 64, 70, 70, 77, 76, 83, 87, 93];

function toPath(values: number[], w: number, h: number, max: number, pad = 4) {
  const stepX = w / (values.length - 1);
  return values
    .map((v, i) => `${i === 0 ? "M" : "L"}${(i * stepX).toFixed(1)},${(h - pad - (v / max) * (h - pad * 2)).toFixed(1)}`)
    .join(" ");
}

/** Revenue area chart with crosshair hover tooltip. Single axis, two series, legend. */
export function RevenueChart() {
  const [hover, setHover] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const W = 560;
  const H = 190;
  const max = 110;
  const stepX = W / (PRODUCTION.length - 1);
  const yFor = (v: number) => H - 4 - (v / max) * (H - 8);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-[var(--ink-muted)]">Revenue · last 12 months</p>
          <p className="text-xl font-bold tracking-tight">$927,400</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-[var(--ink-2)]">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: "var(--series-1)" }} />
            Production
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: "var(--series-2)" }} />
            Collections
          </span>
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          role="img"
          aria-label="Line chart of monthly production and collections, both trending upward across the year"
          onMouseLeave={() => setHover(null)}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * W;
            setHover(Math.max(0, Math.min(11, Math.round(x / stepX))));
          }}
        >
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--series-1)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--series-1)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="var(--grid-line)" strokeWidth="1" />
          ))}

          <motion.path
            d={`${toPath(PRODUCTION, W, H, max)} L${W},${H} L0,${H} Z`}
            fill="url(#areaFill)"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          />
          <motion.path
            d={toPath(PRODUCTION, W, H, max)}
            fill="none"
            stroke="var(--series-1)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={reduced ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          <motion.path
            d={toPath(COLLECTIONS, W, H, max)}
            fill="none"
            stroke="var(--series-2)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={reduced ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.15 }}
          />

          {hover !== null && (
            <g>
              <line x1={hover * stepX} x2={hover * stepX} y1="0" y2={H} stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx={hover * stepX} cy={yFor(PRODUCTION[hover])} r="4" fill="var(--series-1)" stroke="var(--surface)" strokeWidth="2" />
              <circle cx={hover * stepX} cy={yFor(COLLECTIONS[hover])} r="4" fill="var(--series-2)" stroke="var(--surface)" strokeWidth="2" />
            </g>
          )}
        </svg>

        {hover !== null && (
          <div
            className="pointer-events-none absolute -top-2 z-10 -translate-x-1/2 rounded-lg border border-[var(--hairline)] bg-[var(--surface)] px-3 py-2 text-xs shadow-premium"
            style={{ left: `${(hover / 11) * 100}%` }}
          >
            <p className="font-semibold">{MONTHS[hover]}</p>
            <p className="text-[var(--ink-2)]">Production ${PRODUCTION[hover]}k</p>
            <p className="text-[var(--ink-2)]">Collections ${COLLECTIONS[hover]}k</p>
          </div>
        )}
      </div>

      <div className="mt-1 flex justify-between text-[10px] text-[var(--ink-muted)]" style={{ fontVariantNumeric: "tabular-nums" }}>
        {MONTHS.filter((_, i) => i % 2 === 0).map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

/** Chair utilization — thin rounded bars, one hue, per-bar hover. */
export function UtilizationBars() {
  const data = [
    { label: "Op 1", value: 92 },
    { label: "Op 2", value: 84 },
    { label: "Op 3", value: 76 },
    { label: "Op 4", value: 88 },
    { label: "Hyg 1", value: 95 },
    { label: "Hyg 2", value: 71 },
  ];
  const reduced = useReducedMotion();
  return (
    <div>
      <p className="mb-3 text-xs font-medium text-[var(--ink-muted)]">Chair utilization · today</p>
      <div className="space-y-2.5">
        {data.map((d, i) => (
          <div key={d.label} className="group flex items-center gap-3" title={`${d.label}: ${d.value}% utilized`}>
            <span className="w-10 text-[11px] text-[var(--ink-2)]">{d.label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--grid-line)]">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--series-1)" }}
                initial={reduced ? { width: `${d.value}%` } : { width: 0 }}
                whileInView={{ width: `${d.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
              />
            </div>
            <span className="w-8 text-right text-[11px] font-semibold" style={{ fontVariantNumeric: "tabular-nums" }}>
              {d.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Tiny sparkline for stat tiles. */
export function Sparkline({ values, color = "var(--series-1)" }: { values: number[]; color?: string }) {
  const max = Math.max(...values);
  return (
    <svg viewBox="0 0 80 24" className="h-6 w-20" aria-hidden="true">
      <path d={toPath(values, 80, 24, max, 2)} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Donut gauge for a single percentage. */
export function DonutGauge({ value, label, color = "var(--series-1)" }: { value: number; label: string; color?: string }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const reduced = useReducedMotion();
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 64 64" className="h-14 w-14 -rotate-90" role="img" aria-label={`${label}: ${value}%`}>
        <circle cx="32" cy="32" r={r} fill="none" stroke="var(--grid-line)" strokeWidth="7" />
        <motion.circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={reduced ? { strokeDashoffset: c * (1 - value / 100) } : { strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * (1 - value / 100) }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div>
        <p className="text-lg font-bold leading-none" style={{ fontVariantNumeric: "tabular-nums" }}>
          {value}%
        </p>
        <p className="mt-1 text-[11px] text-[var(--ink-muted)]">{label}</p>
      </div>
    </div>
  );
}
