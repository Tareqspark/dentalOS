import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const siteUrl = "https://www.dentalos.com"; // TODO: replace with production domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DentalOS — The AI-Powered Dental Practice Management Platform",
    template: "%s · DentalOS",
  },
  description:
    "DentalOS replaces your PMS, phones, billing, and marketing stack with one AI-powered platform. 24/7 AI receptionist, insurance automation, clinical notes, and analytics for independent dental practices.",
  keywords: [
    "dental practice management software",
    "AI dental receptionist",
    "dental PMS",
    "dental billing software",
    "dental insurance automation",
    "cloud dental software",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "DentalOS",
    title: "DentalOS — Your dental practice, run by intelligence",
    description:
      "One AI-powered platform for scheduling, clinical records, insurance, billing, and growth. Built for independent dental practices.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DentalOS — The AI-Powered Dental Practice Platform",
    description:
      "AI answers every call, fills every chair, and files every claim. See why practices are switching.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "DentalOS",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      description:
        "AI-powered dental practice management platform: scheduling, EDR, insurance automation, billing, AI receptionist, and analytics.",
      offers: { "@type": "Offer", price: "349", priceCurrency: "USD" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "2300" },
    },
    {
      "@type": "Organization",
      name: "DentalOS, Inc.",
      url: "https://www.dentalos.com",
      logo: "https://www.dentalos.com/icon.svg",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Set theme before paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
