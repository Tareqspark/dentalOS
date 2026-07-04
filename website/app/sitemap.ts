import type { MetadataRoute } from "next";
import { modules } from "@/lib/modules";
import { solutions } from "@/lib/solutions";

const base = "https://www.dentalos.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/features`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/security`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/integrations`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...modules.map((m) => ({
      url: `${base}/features/${m.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...solutions.map((s) => ({
      url: `${base}/solutions/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
