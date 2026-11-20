"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SCHOOL } from "@/lib/site";
import { Arrow, Mail, Phone, WhatsApp } from "./Icons";

// Floating "Enquire" button (bottom right) that opens a card of ways to reach the school office.
export default function HelpWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false); // phones only; see the effect below
  const [yieldToHero, setYieldToHero] = useState(false); // every width; see the effect below
  const [overText, setOverText] = useState(false); // every width; see the effect below
  const ref = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !ref.current?.contains(document.activeElement)) return;
      setOpen(false);
      toggle.current?.focus();
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("click", onClick); document.removeEventListener("keydown", onKey); };
  }, []);

  // On phones text runs the full width, so wherever the button sits it covers some of it. It stays
  // out of sight on the first screen (CSS hides it from the first paint, so it never flashes over
  // text), slides in when the visitor scrolls back up or reaches the end of the page, and slides out
  // again while they scroll down to read. On every width it also keeps clear of text and of the home
  // carousel controls (the two effects below).
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const atEnd = y + window.innerHeight >= document.documentElement.scrollHeight - 80;
      if (y < 120) setShown(false);
      else if (atEnd) setShown(true);
      else if (y > lastY + 8) setShown(false);
      else if (y < lastY - 8) setShown(true);
      if (Math.abs(y - lastY) > 8) lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The button never rests on top of text. When scrolling stops (and after a page change, a resize or
  // a reveal animation) it checks the real positions of the text lines under its corner; if any are
  // there it stays out of sight until the corner is clear again: between sections, beside photos, at
  // the end of the page.
  useEffect(() => {
    let settle: ReturnType<typeof setTimeout> | undefined;
    const check = () => {
      const box = ref.current, btn = toggle.current;
      if (!box || !btn) return;
      // Where the button sits when shown (offset sizes ignore the slide-out translate)
      const cs = getComputedStyle(box);
      const right = window.innerWidth - parseFloat(cs.right), bottom = window.innerHeight - parseFloat(cs.bottom);
      const r = { left: right - btn.offsetWidth - 4, right: right + 4, top: bottom - btn.offsetHeight - 4, bottom: bottom + 4 };
      const points: [number, number][] = [[r.left, r.top], [r.right, r.top], [r.left, r.bottom], [r.right, r.bottom], [(r.left + r.right) / 2, (r.top + r.bottom) / 2]];
      const seen = new Set<Element>();
      let covered = false;
      for (const [x, y] of points) {
        const hit = document.elementsFromPoint(Math.min(Math.max(x, 0), window.innerWidth - 1), Math.min(Math.max(y, 0), window.innerHeight - 1)).find((e) => !box.contains(e));
        // Search the whole section there: some captions ignore pointer events, so the hit alone can miss them
        const el = hit?.closest("section, footer, header") ?? hit;
        if (!el || seen.has(el)) continue;
        seen.add(el);
        const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        for (let n = walk.nextNode(); n && !covered; n = walk.nextNode()) {
          if (!n.textContent?.trim() || n.parentElement?.closest("[aria-hidden=true], .sr-only")) continue;
          const range = document.createRange();
          range.selectNodeContents(n);
          for (const q of range.getClientRects()) {
            if (q.width && q.right > r.left && q.left < r.right && q.bottom > r.top && q.top < r.bottom) { covered = true; break; }
          }
        }
        if (covered) break;
      }
      setOverText(covered);
    };
    const later = () => { clearTimeout(settle); settle = setTimeout(check, 150); };
    later();
    window.addEventListener("scroll", later, { passive: true });
    window.addEventListener("resize", later);
    // Sections rise into place as they are revealed, so look again when an animation finishes
    document.addEventListener("animationend", later, true);
    return () => {
      clearTimeout(settle);
      window.removeEventListener("scroll", later);
      window.removeEventListener("resize", later);
      document.removeEventListener("animationend", later, true);
    };
  }, [pathname]);

  // The home hero has its own carousel control bar in the same corner (and its own "Enquire now"
  // button), so the floating button steps aside while that bar is on screen.
  useEffect(() => {
    const bar = document.querySelector(".hero-slider__bar");
    if (!bar) return;
    const io = new IntersectionObserver(([e]) => setYieldToHero(e.isIntersecting));
    io.observe(bar);
    // Leaving the home page: stop yielding
    return () => { io.disconnect(); setYieldToHero(false); };
  }, [pathname]);

  // Move focus into the card when it opens so keyboard users land on the options.
  useEffect(() => {
    if (open) panel.current?.querySelector<HTMLElement>(".enquire-opt")?.focus();
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className={`enquire${open ? " is-open" : ""}${shown ? " is-shown" : ""}${yieldToHero || overText ? " is-yielding" : ""}`} ref={ref}>
      <div className="enquire-panel" id="enquire-panel" role="dialog" aria-labelledby="enquire-title" ref={panel} inert={!open}>
        <button type="button" className="enquire-panel__close" aria-label="Close" onClick={() => { close(); toggle.current?.focus(); }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
        <strong className="enquire-panel__title" id="enquire-title">Need help?</strong>
        <p className="enquire-panel__lede">Choose how you&rsquo;d like to reach us:</p>
        <div className="enquire-panel__list">
          <a className="enquire-opt" href={`tel:${SCHOOL.phone}`}>
            <span className="enquire-opt__icon enquire-opt__icon--call"><Phone /></span>
            <span className="enquire-opt__copy"><strong>Call the office</strong><small>{SCHOOL.phoneLabel}</small></span>
          </a>
          <a className="enquire-opt" href={`https://wa.me/${SCHOOL.whatsapp}`} target="_blank" rel="noopener">
            <span className="enquire-opt__icon enquire-opt__icon--whatsapp"><WhatsApp /></span>
            <span className="enquire-opt__copy"><strong>WhatsApp</strong><small>Chat with reception</small></span>
          </a>
          <a className="enquire-opt" href={`mailto:${SCHOOL.email}`}>
            <span className="enquire-opt__icon enquire-opt__icon--mail"><Mail /></span>
            <span className="enquire-opt__copy"><strong>Email us</strong><small>{SCHOOL.email}</small></span>
          </a>
          <Link className="enquire-opt" href="/admissions#enquiry" onClick={close}>
            <span className="enquire-opt__icon enquire-opt__icon--form"><Arrow /></span>
            <span className="enquire-opt__copy"><strong>Admission enquiry</strong><small>Fill in the online form</small></span>
          </Link>
        </div>
        <span className="enquire-panel__foot">We&rsquo;re here to help.</span>
      </div>
      <button
        ref={toggle}
        type="button"
        className="enquire__toggle"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="enquire-panel"
        aria-label={open ? "Close contact options" : "Enquire: contact options"}
        onClick={() => setOpen((o) => !o)}
      >
        <Phone aria-hidden="true" />
        <span>Enquire</span>
      </button>
    </div>
  );
}
