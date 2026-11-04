"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SCHOOL } from "@/lib/site";
import { Arrow, Mail, Phone, WhatsApp } from "./Icons";

// Floating "Enquire" button that opens a card of ways to reach the school office.
export default function HelpWidget() {
  const [open, setOpen] = useState(false);
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

  // Move focus into the card when it opens so keyboard users land on the options.
  useEffect(() => {
    if (open) panel.current?.querySelector<HTMLElement>(".enquire-opt")?.focus();
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className={`enquire${open ? " is-open" : ""}`} ref={ref}>
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
