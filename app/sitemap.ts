import type { MetadataRoute } from "next";
import { NAV, SITE_URL } from "@/lib/site";

const LEGAL = ["/privacy-policy", "/terms-and-conditions", "/public-disclosure"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...NAV.map(({ href }) => ({ url: `${SITE_URL}${href === "/" ? "" : href}`, changeFrequency: "monthly" as const, priority: href === "/" ? 1 : 0.8 })),
    ...LEGAL.map((href) => ({ url: `${SITE_URL}${href}`, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
