import type { NextConfig } from "next";

// Basic hardening for a static public site. frame-ancestors (and X-Frame-Options for older
// browsers) stop other sites from showing these pages inside an iframe (clickjacking).
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  // A full policy in report-only mode: browsers log what it would block (in the console) but block
  // nothing, so it can be watched before it is enforced. 'unsafe-inline' scripts are needed for the
  // theme script, JSON-LD and Next.js's inline bootstrap until nonces are added.
  { key: "Content-Security-Policy-Report-Only", value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
    "connect-src 'self' https://cloudflareinsights.com",
    "img-src 'self' data: https://i.ytimg.com",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "frame-src https://www.youtube-nocookie.com https://www.youtube.com https://maps.google.com https://www.google.com",
    "media-src 'self'",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
  ].join("; ") },
];

// Files in /public are served with max-age=0 by default. Images and icons rarely change, so let
// browsers keep them for a week and revalidate in the background after that. PDFs get a day, since
// the fee structure and certificates can be replaced under the same name.
const week = "public, max-age=604800, stale-while-revalidate=86400";
const day = "public, max-age=86400, stale-while-revalidate=86400";

const nextConfig: NextConfig = {
  // Keep the dev-only Next.js badge clear of the floating Enquire button (bottom left).
  devIndicators: { position: "bottom-right" },
  // The photos are video stills, so resized copies use a higher quality than the default 75
  // to avoid stacking a second round of compression on top. AVIF first, WebP as fallback.
  images: { qualities: [75, 80, 85], formats: ["image/avif", "image/webp"] },
  experimental: { agentUpgrade: "security" },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/:dir(images|hero|library|og)/:file*", headers: [{ key: "Cache-Control", value: week }] },
      { source: "/:file(logo.png|logo-lg.webp|logo-nav.webp|logo-sm.webp|icon-192.png|icon-512.png|icon-maskable-512.png)", headers: [{ key: "Cache-Control", value: week }] },
      { source: "/documents/:file*", headers: [{ key: "Cache-Control", value: day }] },
    ];
  },
};

export default nextConfig;
