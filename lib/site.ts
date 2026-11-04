// Single source of truth for school contact details and navigation.
// Phone numbers are from the footer of the school's official site (shatabdigaya.in, Dec 2025).
export const SCHOOL = {
  name: "Shatabdi Public School",
  phone: "+918936846757",
  phoneLabel: "+91 89368 46757",
  principalMobile: "+918986280501",
  principalMobileLabel: "+91 89862 80501",
  mobile: "916314002835",
  mobileLabel: "+91 63140 02835",
  // School office mobile for WhatsApp and calls.
  whatsapp: "919852218788",
  whatsappLabel: "+91 98522 18788",
  email: "info@shatabdigaya.com",
  // Older Gmail address, still monitored; shown as a backup and copied on enquiry emails.
  emailBackup: "shatabdi.public@gmail.com",
  facebook: "https://www.facebook.com/spsgayaofficial/",
  instagram: "https://www.instagram.com/_shatabdi.p.s.official_/",
  youtube: "https://www.youtube.com/@shatabdipublicschoolgaya1753",
  address: "Katari Hill Road, Aliganj, Gaya, Bihar 823001",
  cbseRecord: "https://saras.cbse.gov.in/SARAS/AffiliatedList/AfflicationDetails/330113",
  erp: "http://101.53.157.220:7122/shatabdi/",
  minorityCertificate: "/documents/minority-certificate.pdf",
};

// Public origin used for canonical URLs, the sitemap and social previews.
// Set NEXT_PUBLIC_SITE_URL when deploying to a different domain.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shatabdigaya.com";

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/campus", label: "Campus & Life" },
  { href: "/admissions", label: "Admissions" },
  { href: "/public-disclosure", label: "Disclosure" },
  { href: "/contact", label: "Contact" },
];
