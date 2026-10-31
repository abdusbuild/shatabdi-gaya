import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the dev-only Next.js badge clear of the floating Enquire button (bottom left).
  devIndicators: { position: "bottom-right" },
  // The photos are video stills, so resized copies use a higher quality than the default 75
  // to avoid stacking a second round of compression on top. AVIF first, WebP as fallback.
  images: { qualities: [75, 85], formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
