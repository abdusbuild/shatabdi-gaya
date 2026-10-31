"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Arrow } from "./Icons";

// Horizontal, snap-scrolling strip of review cards with prev/next buttons.
export default function ReviewScroller({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="reviews-scroll reveal">
      <div className="reviews-scroll__track" ref={track} tabIndex={0} role="region" aria-label="Reviews, scroll horizontally">
        {children}
      </div>
      <div className="reviews-scroll__nav">
        <button type="button" className="reviews-scroll__btn" onClick={() => go(-1)} disabled={edge.start} aria-label="Previous reviews">
          <Arrow width={18} height={18} style={{ transform: "scaleX(-1)" }} />
        </button>
        <button type="button" className="reviews-scroll__btn" onClick={() => go(1)} disabled={edge.end} aria-label="Next reviews">
          <Arrow width={18} height={18} />
        </button>
      </div>
    </div>
  );
}
