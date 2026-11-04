"use client";

import Image from "next/image";
import HeroSound from "./HeroSound";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export type Slide = { src: string; alt: string; position?: string };

const CYCLE = 4500; // a new photo starts arriving every 4.5 seconds
const STRIPS = 10;
const DROP_MS = 900; // matches the hero-strip-drop animation in globals.css
const TRANSITION_MS = DROP_MS + STRIPS * 55 + 25 + 60; // longest the strip drop can take
const INTERVAL = CYCLE - TRANSITION_MS; // time a photo rests before the next drop starts

type Strip = { left: number; width: number; delay: number };
type Drop = { to: number; src: string; position: string; strips: Strip[] };

// Random-width vertical strips covering the full width, staggered left to right.
function makeStrips(): Strip[] {
  const weights = Array.from({ length: STRIPS }, () => 0.5 + Math.random());
  const total = weights.reduce((a, b) => a + b, 0);
  let left = 0;
  return weights.map((w, i) => {
    const width = (w / total) * 100;
    const strip = { left, width, delay: Math.round(i * 55 + Math.random() * 25) };
    left += width;
    return strip;
  });
}

// Full-bleed photo slideshow behind the home page hero text. The next photo drops in from the top
// as staggered vertical strips with a slight bounce, then takes over; each photo slowly zooms while
// shown. Pauses while a control has keyboard focus; for reduced-motion users the photos still change,
// but swap instantly without the drop.
export default function HeroSlider({ slides, sound, children }: { slides: Slide[]; sound?: string; children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);
  const [drop, setDrop] = useState<Drop | null>(null);
  const touchX = useRef<number | null>(null);
  const slidesEl = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const go = useCallback((n: number) => {
    const to = (n + slides.length) % slides.length;
    if (busy.current || to === index) return;
    if (still) { setIndex(to); return; }
    busy.current = true;
    // Reuse the exact file the slide's <img> already loaded, so the strips need no extra download.
    const img = slidesEl.current?.children[to]?.querySelector("img");
    const src = img?.currentSrc || slides[to].src;
    const strips = makeStrips();
    setDrop({ to, src, position: slides[to].position ?? "50% 50%", strips });
    setTimeout(() => {
      setIndex(to);
      setDrop(null);
      busy.current = false;
    }, DROP_MS + strips[strips.length - 1].delay + 60);
  }, [index, slides, still]);

  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setStill(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(index + 1), still ? CYCLE : INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, still, go]);

  return (
    <div
      className="hero-slider"
      aria-roledescription="carousel"
      aria-label="Photos of the school"
      // The hero fills the screen, so pausing on hover would stop it almost always. Pause only for
      // keyboard focus, so a mouse click on an arrow or the sound button doesn't freeze it.
      onFocus={(e) => { if (e.target.matches(":focus-visible")) setPaused(true); }}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      <div className="hero-slider__slides">
        <div className="hero-slider__stage" ref={slidesEl}>
          {slides.map((s, i) => (
            <div key={s.src} className={`hero-slide${i === index ? " is-active" : ""}`} aria-hidden={i !== index} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`}>
              <Image src={s.src} alt={s.alt} fill priority={i === 0} loading={i === 0 ? undefined : "eager"} quality={85} sizes="100vw" style={s.position ? { objectPosition: s.position } : undefined} />
            </div>
          ))}
        </div>
        {drop && (
          <div className="hero-strips" aria-hidden="true">
            {drop.strips.map((s, i) => (
              <span
                key={i}
                className="hero-strip"
                style={{
                  backgroundImage: `url("${drop.src}")`,
                  backgroundPosition: drop.position,
                  clipPath: `inset(0 ${(100 - s.left - s.width).toFixed(3)}% 0 ${s.left.toFixed(3)}%)`,
                  animationDelay: `${s.delay}ms`,
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="hero-slider__shade" />
      <div className="wrap hero-slider__content">{children}</div>
      <button type="button" className="hero-slider__arrow hero-slider__arrow--prev" onClick={() => go(index - 1)} aria-label="Previous photo">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button type="button" className="hero-slider__arrow hero-slider__arrow--next" onClick={() => go(index + 1)} aria-label="Next photo">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
      </button>
      {sound && <HeroSound src={sound} />}
    </div>
  );
}

// A word in the hero that swaps through a short list.
export function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span className="rotating-word" aria-live="off">
      <span key={words[i]} className="rotating-word__item">{words[i]}</span>
    </span>
  );
}
