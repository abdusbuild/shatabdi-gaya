"use client";

import { useEffect, useRef, useState } from "react";

const format = (value: number, decimals: boolean) => (decimals ? value.toFixed(2) : Math.round(value).toLocaleString("en-IN"));

// A statistic that counts up from zero the first time it scrolls into view.
// The server renders the final number, so it is correct without JavaScript and for search engines.
export default function CountUp({ value, suffix = "", className }: { value: string; suffix?: string; className?: string }) {
  const target = parseFloat(value);
  const decimals = target % 1 !== 0;
  const [shown, setShown] = useState(target);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / 1400, 1);
        setShown(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); };
  }, [target]);

  return <div ref={ref} className={className}>{format(shown, decimals)}{suffix}</div>;
}
