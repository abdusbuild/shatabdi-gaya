"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// One-shot reveal animations: each element plays its entrance once, the first time it comes into view
// (text slides in from the left, photos and buttons from the right, everything else rises and fades in).
//
// The script only ever sets a data-inview attribute, never className, so React re-renders cannot undo it.
// Elements stay hidden only while <html> carries the "rv" class, which the head script in layout.tsx adds
// and removes again after a few seconds if this component never starts, so content can't stay invisible.
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

    // Wait for the opening screen to lift, so the first sections animate where people can see them
    let mo: MutationObserver | undefined;
    const introOver = () => root.classList.contains("intro-seen") || root.classList.contains("intro-done");
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
    let waitIntro: MutationObserver | undefined;
    if (introOver()) start();
    else {
      waitIntro = new MutationObserver(() => {
        if (!introOver()) return;
        waitIntro?.disconnect();
        start();
      });
      waitIntro.observe(root, { attributes: true, attributeFilter: ["class"] });
    }

    return () => {
      io.disconnect();
      mo?.disconnect();
      waitIntro?.disconnect();
    };
  }, [pathname]);

  return null;
}
