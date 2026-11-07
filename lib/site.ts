// Single source of truth for school contact details and navigation.
// Phone numbers are from the footer of the school's official site (shatabdigaya.in, Dec 2025).
export const SCHOOL = {
  name: "Shatabdi Public School",
  phone: "+918936846757",
  // Labels use non-breaking spaces ( ) so a number never wraps onto two lines.
  phoneLabel: "+91 89368 46757",
  principalMobile: "+918986280501",
  principalMobileLabel: "+91 89862 80501",
  mobile: "916314002835",
  mobileLabel: "+91 63140 02835",
  // School office mobile for WhatsApp and calls.
  whatsapp: "918936846757",
  whatsappLabel: "+91 89368 46757",
  email: "info@shatabdigaya.com",
  // Older Gmail address, still monitored; shown as a backup and copied on enquiry emails.
  emailBackup: "shatabdi.public@gmail.com",
  facebook: "https://www.facebook.com/spsgayaofficial/",
  instagram: "https://www.instagram.com/_shatabdi.p.s.official_/",
  youtube: "https://www.youtube.com/@shatabdipublicschoolgaya1753",
  address: "Katari Hill Road, Aliganj, Gaya Ji, Bihar 823001",
  cbseRecord: "https://saras.cbse.gov.in/SARAS/AffiliatedList/AfflicationDetails/330113",
  erp: "http://101.53.157.220:7122/shatabdi/",
  minorityCertificate: "/documents/minority-certificate.pdf",
  feeStructure: "/documents/Fees-Structure-2026-27.pdf",
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
