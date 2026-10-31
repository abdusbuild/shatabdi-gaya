"use client";

import { useEffect, useState } from "react";

// "On this page" list that highlights the section currently being read.
export default function LegalToc({ sections }: { sections: { id: string; title: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      // At the very bottom the last sections may never reach the top, so pick the last one.
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) return setActive(sections[sections.length - 1]?.id);
      // Otherwise: the last section whose heading has passed the line just under the sticky nav.
      const line = (document.querySelector(".nav")?.getBoundingClientRect().bottom ?? 0) + 40;
      let current = sections[0]?.id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(frame); };
  }, [sections]);

  return (
    <aside className="legal__toc" aria-label="On this page">
      <span className="legal__toc-title">On this page</span>
      <ol>
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className={s.id === active ? "is-active" : undefined} aria-current={s.id === active ? "location" : undefined}>{s.title}</a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
