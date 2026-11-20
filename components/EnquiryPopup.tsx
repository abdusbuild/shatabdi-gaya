"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import EnquiryForm, { NameInput, PhoneInput } from "./EnquiryForm";

const CLASSES = ["PP-1", "PP-2", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "XI – Science", "XI – Commerce"];
const DELAY = 30000; // 30 s into the visit
const SCROLL = 0.5; // or once half of the current page has been scrolled, whichever comes first
const KEY = "sps-enquiry-popup";
// Pages that already carry an enquiry form: the popup never shows there
const EXCLUDED = ["/admissions", "/contact"];
const excluded = (path: string) => EXCLUDED.some((p) => path === p || path.startsWith(p + "/"));

// "Get in touch" card that opens on its own once per browser session: 30 seconds into the visit or
// when the visitor has scrolled half way down a page, whichever comes first. Never on /admissions or
// /contact, and it waits while the phone menu or another dialog (photo viewer) is open. A native
// <dialog> gives Esc-to-close and focus handling.
export default function EnquiryPopup() {
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (excluded(pathname)) {
      // e.g. the visitor pressed Back into /admissions while it was open
      if (ref.current?.open) ref.current.close();
      return;
    }
    const seen = () => { try { return !!sessionStorage.getItem(KEY); } catch { return true; } };
    if (seen()) return;

    let retry: ReturnType<typeof setTimeout> | undefined;
    const stop = () => { clearTimeout(timer); clearTimeout(retry); window.removeEventListener("scroll", onScroll); };
    const tryOpen = () => {
      if (retry || seen()) return;
      const busy = document.querySelector("dialog[open]") || document.querySelector(".mobile-menu.is-open");
      if (busy) { retry = setTimeout(() => { retry = undefined; tryOpen(); }, 4000); return; }
      stop();
      try { sessionStorage.setItem(KEY, "1"); } catch {}
      ref.current?.showModal();
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= SCROLL) tryOpen();
    };
    // performance.now() counts from the first page load and keeps counting across in-site
    // navigation, so moving between pages does not restart the 30 s.
    const timer = setTimeout(tryOpen, Math.max(0, DELAY - performance.now()));
    window.addEventListener("scroll", onScroll, { passive: true });
    return stop;
  }, [pathname]);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      className="enq-pop"
      aria-labelledby="enq-pop-title"
      // A click on the dimmed backdrop lands on the dialog element itself
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className="enq-pop__card">
        <button type="button" className="enq-pop__close" onClick={close} aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <h2 id="enq-pop-title" className="enq-pop__title">Get in touch</h2>
        <span className="enq-pop__rule" />
        <p className="enq-pop__sub">Share your details for a quick admission enquiry.</p>
        <EnquiryForm subject="Admission enquiry from website" submitLabel="Send enquiry" via="whatsapp" className="enq-pop__form">
          <label>Parent&rsquo;s name
            <span className="enq-pop__field">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>
              <NameInput name="Parent name" required placeholder="Enter your name" />
            </span>
          </label>
          <label>Phone number
            <span className="enq-pop__field">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
              <PhoneInput name="Phone" required placeholder="10-digit mobile number" />
            </span>
          </label>
          <label><span>Class sought <small>(optional)</small></span>
            <span className="enq-pop__field">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c3 2 9 2 12 0v-5" /></svg>
              <select name="Class sought" defaultValue="">
                <option value="">Select class</option>
                {CLASSES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </span>
          </label>
        </EnquiryForm>
        <p className="enq-pop__note">Opens WhatsApp with your enquiry, ready to send to the school office.</p>
      </div>
    </dialog>
  );
}
