"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SCHOOL } from "@/lib/site";
import { Facebook, Instagram, Mail, Phone, Pin, WhatsApp, YouTube } from "./Icons";

type FooterLink = { href: string; label: string; external?: boolean };

const groups: { title: string; links: FooterLink[] }[] = [
  {
    title: "Explore",
    links: [
      { href: "/about", label: "About the school" },
      { href: "/academics", label: "Academics" },
      { href: "/campus", label: "Campus & facilities" },
      { href: "/campus#gallery", label: "Photo gallery" },
      { href: "/about#principal", label: "Principal's message" },
      { href: "/about#faculty", label: "Our teachers" },
      { href: "/about#foundation", label: "Shatabdi Foundation" },
    ],
  },
  {
    title: "For parents",
    links: [
      { href: "/admissions", label: "Admission process" },
      { href: "/admissions#documents", label: "Documents required" },
      { href: "/admissions#fees", label: "Fee structure" },
      { href: "/admissions#faq", label: "Admission FAQs" },
      { href: "/admissions#enquiry", label: "Enquiry form" },
      { href: "/contact", label: "Contact the office" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy policy" },
      { href: "/terms-and-conditions", label: "Terms & conditions" },
      { href: "/public-disclosure", label: "Mandatory public disclosure" },
      { href: SCHOOL.minorityCertificate, label: "Minority certificate", external: true },
      { href: SCHOOL.cbseRecord, label: "CBSE affiliation record", external: true },
    ],
  },
];

export default function Footer() {
  // Link groups are accordions on phones and always open on wider screens.
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 861px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__about">
            <Link className="brand" href="/">
              <img src="/logo-sm.webp" alt="" width={48} height={56} loading="lazy" />
              <span><span className="brand__name">Shatabdi Public School</span><span className="brand__tag">Gaya Ji · Est. 2000</span></span>
            </Link>
            <p>An English-medium, co-educational senior secondary school affiliated to CBSE, New Delhi, run by the Shatabdi Foundation on a non-commercial basis since 2000.</p>
            <div className="socials">
              <a href={SCHOOL.facebook} target="_blank" rel="noopener" aria-label="Facebook"><Facebook /></a>
              <a href={SCHOOL.instagram} target="_blank" rel="noopener" aria-label="Instagram"><Instagram /></a>
              <a href={SCHOOL.youtube} target="_blank" rel="noopener" aria-label="YouTube"><YouTube /></a>
              <a href={`https://wa.me/${SCHOOL.whatsapp}`} target="_blank" rel="noopener" aria-label="WhatsApp"><WhatsApp /></a>
              <a href={`mailto:${SCHOOL.email}`} aria-label="Email"><Mail /></a>
            </div>
          </div>

          {groups.map((g) => (
            <details className="footer-acc" key={g.title} open={wide || undefined}>
              <summary tabIndex={wide ? -1 : undefined} onClick={(e) => wide && e.preventDefault()}>
                {g.title}<i aria-hidden="true" />
              </summary>
              <ul className="footer-acc__body">
                {g.links.map((l) => (
                  <li key={l.href}>
                    {l.external ? (
                      <a href={l.href} target="_blank" rel="noopener">{l.label}</a>
                    ) : (
                      <Link href={l.href}>{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          ))}

          <div className="footer__reach">
            <h4>Reach us</h4>
            <ul>
              <li><Pin />{SCHOOL.address}</li>
              <li><Phone /><span>Principal&rsquo;s office: <a href={`tel:${SCHOOL.phone}`}>{SCHOOL.phoneLabel}</a></span></li>
              <li><Phone /><span>Reception: <a href={`tel:+${SCHOOL.mobile}`}>{SCHOOL.mobileLabel}</a></span></li>
              <li><Phone /><span>WhatsApp &amp; call: <a href={`tel:+${SCHOOL.whatsapp}`}>{SCHOOL.whatsappLabel}</a></span></li>
              <li><Mail /><a href={`mailto:${SCHOOL.email}`}>{SCHOOL.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Shatabdi Public School, Gaya Ji · A unit of Shatabdi Foundation · CBSE Affiliation No. 330113</span>
          <nav aria-label="Legal" className="footer__legal">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms-and-conditions">Terms</Link>
            <Link href="/public-disclosure">Public disclosure</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
