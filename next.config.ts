import type { NextConfig } from "next";

// Basic hardening for a static public site. frame-ancestors (and X-Frame-Options for older
// browsers) stop other sites from showing these pages inside an iframe (clickjacking).
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
];

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
    ];
  },
};

export default nextConfig;
