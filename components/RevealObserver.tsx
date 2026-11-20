"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// One-shot reveal animations: each element rises into place once, the first time it comes into view.
//
// The script only ever sets a data-inview attribute, never className, so React re-renders cannot undo it.
// Elements stay offset only while <html> carries the "rv" class, which the head script in layout.tsx adds
// and removes again after a few seconds if this component never starts, so content can't stay out of place.
const SELECTOR = [
  ".reveal",
  ".slide-title",
  ".img-reveal",
  ".rule:not(.rule--hero)",
  ".pill",
  ".title-row h2",
  ".section-head h2",
  ".band__title",
].join(",");

// This component lives in the root layout, and the page content may still be hydrating when it
// mounts. Adding data-inview to an element React is still hydrating causes a hydration
// mismatch, so nothing starts until the main thread goes idle, which React only lets happen once
// hydration has finished.
const whenIdle = (fn: () => void) => {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(fn, { timeout: 4000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(fn, 300);
  return () => clearTimeout(id);
};

export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("rv")) return;
    root.classList.add("rv-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-inview", "");
          io.unobserve(e.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );

    const scan = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (!el.hasAttribute("data-inview")) io.observe(el);
      });
    };

    let mo: MutationObserver | undefined;
    const start = () => {
      scan();
      // Catch content that mounts later (lazy sections, client-side page changes), at most once a frame
      let queued = 0;
      mo = new MutationObserver(() => {
        if (queued) return;
        queued = requestAnimationFrame(() => { queued = 0; scan(); });
      });
      mo.observe(document.body, { childList: true, subtree: true });
    };
    const cancelIdle = whenIdle(start);

    return () => {
      cancelIdle();
      io.disconnect();
      mo?.disconnect();
    };
  }, [pathname]);

  return null;
}
