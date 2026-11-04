"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SCHOOL } from "@/lib/site";
import { Facebook, Instagram, Mail, Moon, Phone, Pin, Sun, WhatsApp, YouTube } from "./Icons";

// Link groups in the full-screen menu: an orange heading (itself a link) over its sub-pages.
const MENU_GROUPS = [
  { title: "About Us", href: "/about", links: [
    { href: "/about", label: "About the school" },
    { href: "/about#principal", label: "Principal's message" },
    { href: "/about#foundation", label: "Shatabdi Foundation" },
  ] },
  { title: "Academics", href: "/academics", links: [
    { href: "/academics", label: "Curriculum & streams" },
    { href: "/campus", label: "Labs & library" },
  ] },
  { title: "Campus & Life", href: "/campus", links: [
    { href: "/campus", label: "Campus & facilities" },
    { href: "/campus#gallery", label: "Photo gallery" },
  ] },
  { title: "Admissions", href: "/admissions", links: [
    { href: "/admissions", label: "Admission process" },
    { href: "/admissions#documents", label: "Documents required" },
    { href: "/admissions#fees", label: "Fee structure" },
    { href: "/admissions#faq", label: "Admission FAQs" },
    { href: "/admissions#enquiry", label: "Enquiry form" },
  ] },
];
// Columns of the full-screen menu, left to right: About + Academics, Campus, Admissions, then the plain links.
const MENU_COLUMNS = [[MENU_GROUPS[0], MENU_GROUPS[1]], [MENU_GROUPS[2]], [MENU_GROUPS[3]]];
const MENU_PLAIN: { href: string; label: string; external?: boolean }[] = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact Us" },
  { href: "/public-disclosure", label: "Mandatory Disclosure" },
  { href: SCHOOL.cbseRecord, label: "CBSE Affiliation", external: true },
];

function ThemeSwitch() {
  const [dark, setDark] = useState(false);

  // The inline script in layout.tsx sets data-theme before paint; mirror it here.
  useEffect(() => setDark(document.documentElement.getAttribute("data-theme") === "dark"), []);

  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("sps-theme", next); } catch {}
    setDark(!dark);
  };

  return (
    <button className="theme-switch" type="button" role="switch" aria-checked={dark} aria-label="Dark mode" onClick={toggle}>
      <span className="theme-switch__track">
        <Sun className="theme-switch__icon theme-switch__icon--sun" />
        <Moon className="theme-switch__icon theme-switch__icon--moon" />
        <span className="theme-switch__knob" />
      </span>
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Close the drawer after navigating
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    // Move focus into the menu when it opens, and back to the hamburger when it closes
    if (open) closeRef.current?.focus();
    else if (wasOpen.current) burgerRef.current?.focus();
    wasOpen.current = open;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    // Hide the bar while scrolling down, bring it back as soon as the page scrolls up
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (y < 160) setHidden(false);
      else if (y > lastY + 6) setHidden(true);
      else if (y < lastY - 6) setHidden(false);
      if (Math.abs(y - lastY) > 6 || y < 160) lastY = y;
      setStuck(y > 40);
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  // The bar sits transparent over the home page hero until the page scrolls.
  const over = pathname === "/" && !stuck && !open;

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <div className="topbar">
        <div className="wrap">
          <p><span className="pulse" />Admissions open · Std I – IX entrance test in December</p>
          <div className="topbar__links">
            <a href={`tel:${SCHOOL.phone}`}><Phone width={14} height={14} />{SCHOOL.phoneLabel}</a>
            <a href={`mailto:${SCHOOL.email}`}><Mail width={14} height={14} />{SCHOOL.email}</a>
          </div>
        </div>
      </div>
      <header className={`nav${stuck ? " is-stuck" : ""}${open ? " is-open" : ""}${hidden && !open ? " is-hidden" : ""}${over ? " nav--over" : ""}`} onFocus={() => setHidden(false)}>
        <div className="wrap nav__in">
          <Link className="brand" href="/">
            <img className="brand__logo" src="/logo-nav.webp" alt="" width={66} height={78} />
            <span>
              <span className="brand__name">Shatabdi Public School</span>
              <span className="brand__info">
                <span>(A Senior Secondary School)</span>
                <span>AFFILIATED TO C.B.S.E., DELHI</span>
                <span>Katari Hill Road, Gaya Ji – 823001 (Bihar).</span>
              </span>
            </span>
          </Link>
          <div className="nav__actions">
            <Link className="navpill navpill--gold nav__pill" href="/admissions"><span>Admissions</span></Link>
            <Link className="navpill navpill--light nav__pill" href="/admissions#enquiry"><span>Enquiry Now</span></Link>
            <a className="navpill navpill--light nav__erp" href={SCHOOL.erp} target="_blank" rel="noopener" aria-label="School ERP login (opens in a new tab)">
              <span><span className="nav__erp-full">ERP Login</span><span className="nav__erp-short" aria-hidden="true">ERP</span></span>
            </a>
            <button
              ref={burgerRef}
              className="burger"
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
            </button>
          </div>
        </div>
        <span className="nav__progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      </header>

      <div className={`mobile-menu${open ? " is-open" : ""}`} id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open} inert={!open} onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setOpen(false); }}>
        <div className="mobile-menu__top">
          <Link className="brand mobile-menu__brand" href="/">
            <img src="/logo-nav.webp" alt="" width={54} height={64} />
            <span>
              <span className="brand__name">Shatabdi Public School</span>
              <span className="brand__tag">Gaya Ji · CBSE 330113</span>
            </span>
          </Link>
          <div className="mobile-menu__tools">
            <ThemeSwitch />
            <button ref={closeRef} className="mobile-menu__close" type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
        </div>
        <div className="mobile-menu__body">
          <div className="mobile-menu__grid">
            {MENU_COLUMNS.map((col, i) => (
              <div className="mobile-menu__col" key={i}>
                {col.map((g) => (
                  <div className="mobile-menu__group" key={g.title}>
                    <Link className="mobile-menu__head" href={g.href}>{g.title}</Link>
                    <ul>
                      {g.links.map((l) => (
                        <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
            <div className="mobile-menu__group mobile-menu__group--plain">
              {MENU_PLAIN.map((l) =>
                l.external ? (
                  <a key={l.href} className="mobile-menu__head" href={l.href} target="_blank" rel="noopener">{l.label}</a>
                ) : (
                  <Link key={l.href} className="mobile-menu__head" href={l.href}>{l.label}</Link>
                ),
              )}
              <a className="navpill navpill--gold mobile-menu__erp" href={SCHOOL.erp} target="_blank" rel="noopener" aria-label="School ERP login (opens in a new tab)">
                <span>ERP Login</span>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
              </a>
            </div>
          </div>
          <div className="mobile-menu__foot">
            <div className="mobile-menu__contacts">
              <a href={`tel:${SCHOOL.phone}`}><Phone />{SCHOOL.phoneLabel}</a>
              <a href={`mailto:${SCHOOL.email}`}><Mail />{SCHOOL.email}</a>
              <span><Pin />Katari Hill Road, Aliganj, Gaya Ji 823001</span>
            </div>
            <div className="mobile-menu__social">
              <a href={SCHOOL.facebook} target="_blank" rel="noopener" aria-label="Facebook"><Facebook /></a>
              <a href={SCHOOL.instagram} target="_blank" rel="noopener" aria-label="Instagram"><Instagram /></a>
              <a href={SCHOOL.youtube} target="_blank" rel="noopener" aria-label="YouTube"><YouTube /></a>
              <a href={`https://wa.me/${SCHOOL.whatsapp}`} target="_blank" rel="noopener" aria-label="WhatsApp"><WhatsApp /></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
