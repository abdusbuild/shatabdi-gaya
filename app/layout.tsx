import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HelpWidget from "@/components/HelpWidget";
import Preloader from "@/components/Preloader";
import RevealObserver from "@/components/RevealObserver";
import EnquiryPopup from "@/components/EnquiryPopup";
import { fontVariables } from "@/lib/fonts";
import { SCHOOL, SITE_URL } from "@/lib/site";
import { OPEN_GRAPH } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shatabdi Public School, Gaya Ji | CBSE Senior Secondary School",
    template: "%s | Shatabdi Public School, Gaya Ji",
  },
  description:
    "Shatabdi Public School, Gaya Ji — an English-medium, co-educational CBSE senior secondary school (Affiliation No. 330113) on Katari Hill Road, run by the Shatabdi Foundation since 2000.",
  openGraph: { ...OPEN_GRAPH, url: "/" },
  twitter: { card: "summary_large_image" },
  applicationName: "Shatabdi Public School, Gaya Ji",
  authors: [{ name: "Shatabdi Public School, Gaya Ji", url: SITE_URL }],
  category: "education",
  formatDetection: { telephone: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

// Browser UI colour (address bar on phones) to match the site in each theme.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#16204d" },
  ],
};

// Structured data so search engines can show the school's address, phone and profiles.
const schoolJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "School",
      "@id": `${SITE_URL}/#school`,
      name: SCHOOL.name,
      alternateName: ["Shatabdi Public School Gaya Ji", "Shatabdi Public School Gaya", "SPS Gaya"],
      description: "English-medium, co-educational CBSE senior secondary school (Affiliation No. 330113) on Katari Hill Road, Gaya Ji, run by the Shatabdi Foundation since 2000.",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}/og/home.jpg`,
      telephone: SCHOOL.phone,
      email: SCHOOL.email,
      foundingDate: "2000-10-26",
      address: { "@type": "PostalAddress", streetAddress: "Katari Hill Road, Aliganj", addressLocality: "Gaya Ji", addressRegion: "Bihar", postalCode: "823001", addressCountry: "IN" },
      areaServed: { "@type": "City", name: "Gaya Ji" },
      identifier: { "@type": "PropertyValue", propertyID: "CBSE Affiliation No.", value: "330113" },
      parentOrganization: { "@type": "Organization", name: "Shatabdi Foundation, Gaya Ji" },
      sameAs: [SCHOOL.facebook, SCHOOL.instagram, SCHOOL.youtube],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Shatabdi Public School, Gaya Ji",
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#school` },
    },
  ],
};

// Applies the saved/system theme before paint to avoid a flash, and flags that JS is running.
// Also decides whether the opening crest screen (Preloader) plays: once per visit, and never for
// reduced-motion users.
const themeScript = `var d=document.documentElement;d.classList.add("js");if("IntersectionObserver" in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("rv");setTimeout(function(){if(!d.classList.contains("rv-ready"))d.classList.remove("rv")},5000)}try{var t=localStorage.getItem("sps-theme");d.setAttribute("data-theme",t||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"))}catch(e){}try{if(sessionStorage.getItem("sps-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("intro-seen");else sessionStorage.setItem("sps-intro","1")}catch(e){d.classList.add("intro-seen")}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd) }} />
      </head>
      <body>
        <Preloader />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
        <HelpWidget />
        <EnquiryPopup />
      </body>
    </html>
  );
}
