"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "./Icons";
import { SkeletonImage } from "./Skeleton";
import { Photo } from "./ui";

type Item = [src: string, label: string];

// Photo grid that opens a full-screen viewer. The viewer is a native <dialog> (Esc, focus
// handling) holding a scroll-snap strip, so phones swipe between photos with native momentum;
// arrow buttons and arrow keys scroll the same strip on desktop.
export default function Gallery({ items }: { items: Item[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const show = (i: number) => {
    setIndex(i);
    setOpen(true);
    dialog.current?.showModal();
    // Jump straight to the clicked photo once the strip has a width.
    requestAnimationFrame(() => {
      const el = track.current;
      if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "instant" });
    });
  };

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="gallery">
        {items.map(([src, label], i) => (
          <button type="button" key={src} className="gallery__item reveal" onClick={() => show(i)} aria-label={`Open photo: ${label}`}>
            <Photo src={src} label={label} sizes={i % 7 === 0 ? "(max-width: 760px) 100vw, 800px" : "(max-width: 760px) 50vw, 400px"} />
          </button>
        ))}
      </div>

      <dialog ref={dialog} className="lightbox" aria-label="Photo viewer" onClose={() => setOpen(false)}>
        <div className="lightbox__track" ref={track}>
          {items.map(([src, label], i) => (
            <figure className="lightbox__slide" key={src} aria-hidden={i !== index}>
              <div className="lightbox__frame">
                {/* Only the open photo and its neighbours are fetched */}
                {open && Math.abs(i - index) <= 1 && <SkeletonImage src={src} alt={label} fill sizes="100vw" />}
              </div>
            </figure>
          ))}
        </div>
        <div className="lightbox__bar">
          <p className="lightbox__caption">{items[index]?.[1]}</p>
          <span className="lightbox__count">{index + 1} / {items.length}</span>
        </div>
        <button type="button" className="lightbox__btn lightbox__btn--prev" onClick={() => go(-1)} disabled={index === 0} aria-label="Previous photo">
          <Arrow width={22} height={22} style={{ transform: "scaleX(-1)" }} />
        </button>
        <button type="button" className="lightbox__btn lightbox__btn--next" onClick={() => go(1)} disabled={index === items.length - 1} aria-label="Next photo">
          <Arrow width={22} height={22} />
        </button>
        <button type="button" className="lightbox__close" onClick={() => dialog.current?.close()} aria-label="Close photo viewer">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </dialog>
    </>
  );
}
