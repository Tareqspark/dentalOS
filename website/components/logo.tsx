import clsx from "clsx";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={clsx("flex items-center gap-2", className)}>
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2a78d6" />
            <stop offset="100%" stopColor="#6d5ce0" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="28" height="28" rx="9" fill="url(#logo-g)" />
        {/* stylized tooth */}
        <path
          d="M16 8.6c-1.5-1.2-3.9-1.3-5.3.2-1.5 1.6-1.3 4 .1 6.2 1 1.6 1.5 3.4 1.8 5.5.1.9.4 2.9 1.6 2.9 1.4 0 .9-3.2 1.8-3.2s.4 3.2 1.8 3.2c1.2 0 1.5-2 1.6-2.9.3-2.1.8-3.9 1.8-5.5 1.4-2.2 1.6-4.6.1-6.2-1.4-1.5-3.8-1.4-5.3-.2z"
          fill="white"
        />
        {/* AI spark */}
        <circle cx="23.5" cy="9" r="2" fill="white" opacity="0.9" />
      </svg>
      <span className="text-lg font-bold tracking-tight">
        Dental<span className="text-brand-600 dark:text-brand-400">OS</span>
      </span>
    </span>
  );
}
