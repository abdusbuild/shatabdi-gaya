import type { MetadataRoute } from "next";
import { NAV, SITE_URL } from "@/lib/site";
import { OG_SLUGS } from "@/lib/seo";

// Each entry also lists its preview image so image search can pick it up
const image = (href: string) => (OG_SLUGS[href] ? [`${SITE_URL}/og/${OG_SLUGS[href]}.jpg`] : undefined);

const LEGAL = ["/privacy-policy", "/terms-and-conditions"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    ...NAV.map(({ href }) => ({ url: `${SITE_URL}${href === "/" ? "" : href}`, lastModified, images: image(href), changeFrequency: "monthly" as const, priority: href === "/" ? 1 : 0.8 })),
    ...LEGAL.map((href) => ({ url: `${SITE_URL}${href}`, lastModified, images: image(href), changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
