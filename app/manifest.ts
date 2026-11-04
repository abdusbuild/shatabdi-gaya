import type { MetadataRoute } from "next";

// Web app manifest: name, colours and icons used when the site is added to a phone's home screen.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shatabdi Public School, Gaya Ji",
    short_name: "Shatabdi School",
    description: "English-medium, co-educational CBSE senior secondary school on Katari Hill Road, Gaya Ji, since 2000.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#16204d",
    lang: "en-IN",
    categories: ["education"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
