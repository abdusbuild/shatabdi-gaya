import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HelpWidget from "@/components/HelpWidget";
import Preloader from "@/components/Preloader";
import EnquiryPopup from "@/components/EnquiryPopup";
import { fontVariables } from "@/lib/fonts";
import { SCHOOL, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shatabdi Public School, Gaya | CBSE Senior Secondary School",
    template: "%s | Shatabdi Public School, Gaya",
  },
  description:
    "Shatabdi Public School, Gaya — an English-medium, co-educational CBSE senior secondary school (Affiliation No. 330113) on Katari Hill Road, run by the Shatabdi Foundation since 2000.",
  icons: { icon: "/logo-light.png", apple: "/logo-light.png" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Shatabdi Public School, Gaya",
    images: [{ url: "/images/campus-main-building.webp", width: 1779, height: 884, alt: "The main building of Shatabdi Public School, Gaya" }],
  },
  twitter: { card: "summary_large_image" },
};

// Structured data so search engines can show the school's address, phone and profiles.
const schoolJsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: SCHOOL.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-light.png`,
  image: `${SITE_URL}/images/campus-main-building.webp`,
  telephone: SCHOOL.phone,
  email: SCHOOL.email,
  foundingDate: "2000-10-26",
  address: { "@type": "PostalAddress", streetAddress: "Katari Hill Road, Aliganj", addressLocality: "Gaya", addressRegion: "Bihar", postalCode: "823001", addressCountry: "IN" },
  sameAs: [SCHOOL.facebook, SCHOOL.instagram, SCHOOL.youtube],
};

// Applies the saved/system theme before paint to avoid a flash, and flags that JS is running.
// Also decides whether the opening crest screen (Preloader) plays: once per visit, and never for
// reduced-motion users.
const themeScript = `var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("sps-theme");d.setAttribute("data-theme",t||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"))}catch(e){}try{if(sessionStorage.getItem("sps-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("intro-seen");else sessionStorage.setItem("sps-intro","1")}catch(e){d.classList.add("intro-seen")}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd) }} />
      </head>
      <body>
        <Preloader />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <HelpWidget />
        <EnquiryPopup />
      </body>
    </html>
  );
}
