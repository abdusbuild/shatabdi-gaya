// Shared social-preview settings. A page that sets its own `openGraph` replaces the layout's
// whole object, so pages spread OPEN_GRAPH and add their own url and preview image.
// The branded 1200x630 preview images live in public/og/ (one per page).
export const ogImage = (slug: string, alt: string) => ({ url: `/og/${slug}.jpg`, width: 1200, height: 630, alt, type: "image/jpeg" });

export const OG_IMAGE = ogImage("home", "Shatabdi Public School, Gaya: English-medium CBSE school since 2000");

export const OPEN_GRAPH = {
  type: "website" as const,
  locale: "en_IN",
  siteName: "Shatabdi Public School, Gaya",
  images: [OG_IMAGE],
};

// Page path -> preview image slug, also used by the sitemap
export const OG_SLUGS: Record<string, string> = {
  "/": "home",
  "/about": "about",
  "/academics": "academics",
  "/admissions": "admissions",
  "/campus": "campus",
  "/contact": "contact",
  "/privacy-policy": "privacy-policy",
  "/terms-and-conditions": "terms-and-conditions",
  "/public-disclosure": "public-disclosure",
};
