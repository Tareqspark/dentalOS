import type { MetadataRoute } from "next";
import { modules } from "@/lib/modules";

const base = "https://www.dentalos.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/features`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...modules.map((m) => ({
      url: `${base}/features/${m.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
