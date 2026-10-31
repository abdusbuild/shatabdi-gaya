import { Noto_Sans_Devanagari, Noto_Serif_Devanagari, Outfit, Plus_Jakarta_Sans } from "next/font/google";

// Self-hosted by next/font. The CSS variable names are deliberately different from the
// theme tokens in globals.css (--font-heading / --font-sans) so the tokens never self-reference.
// Outfit + Plus Jakarta Sans: free geometric sans pair in the spirit of Gilroy.

export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-display",
});

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-body",
});

// Hindi fallbacks: only downloaded when Devanagari text actually appears on a page.
export const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "600"],
  display: "swap",
  preload: false,
  variable: "--font-hi-sans",
});

export const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["600"],
  display: "swap",
  preload: false,
  variable: "--font-hi-serif",
});

export const fontVariables = [outfit, jakarta, notoSansDevanagari, notoSerifDevanagari].map((f) => f.variable).join(" ");
