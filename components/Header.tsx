"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SCHOOL } from "@/lib/site";
import { Arrow, Mail, Moon, Phone, Pin, Sun } from "./Icons";

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

  // Close the drawer after navigating
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setStuck(window.scrollY > 40);
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

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
      <header className={`nav${stuck ? " is-stuck" : ""}${open ? " is-open" : ""}`}>
        <div className="wrap nav__in">
          <Link className="brand" href="/">
            <img src="/logo-orange-sm.png" alt="" width={53} height={58} />
            <span>
              <span className="brand__name">Shatabdi Public School</span>
              <span className="brand__tag">Gaya · CBSE 330113</span>
            </span>
          </Link>
          <nav aria-label="Main" className="nav__desktop">
            <ul className="nav__menu">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={isActive(item.href) ? "is-active" : undefined} aria-current={isActive(item.href) ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav__actions">
            <ThemeSwitch />
            <Link className="btn btn--gold btn--sm nav__cta" href="/admissions#enquiry">Apply Now</Link>
            <button
              className={`burger${open ? " is-open" : ""}`}
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <i /><i /><i />
            </button>
          </div>
        </div>
        <span className="nav__progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      </header>

      <div className={`mobile-menu${open ? " is-open" : ""}`} id="mobile-menu" aria-hidden={!open} inert={!open}>
        <div className="mobile-menu__body">
          <nav aria-label="Mobile">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className={isActive(item.href) ? "is-active" : undefined}>
                {item.label}
                <Arrow className="mobile-menu__arrow" />
              </Link>
            ))}
          </nav>
          <div className="mobile-menu__foot">
            <Link className="btn btn--gold mobile-menu__cta" href="/admissions#enquiry">Apply for admission <Arrow /></Link>
            <div className="mobile-menu__contacts">
              <a href={`tel:${SCHOOL.phone}`}><Phone />{SCHOOL.phoneLabel}</a>
              <a href={`tel:+${SCHOOL.mobile}`}><Phone />{SCHOOL.mobileLabel} (Reception)</a>
              <a href={`mailto:${SCHOOL.email}`}><Mail />{SCHOOL.email}</a>
            </div>
            <p><Pin />Katari Hill Road, Aliganj, Gaya 823001</p>
          </div>
        </div>
      </div>
    </>
  );
}
