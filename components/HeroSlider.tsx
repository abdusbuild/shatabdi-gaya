"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type ReactNode } from "react";

export type Slide = { src: string; alt: string; position?: string };

const INTERVAL = 6000;

// Full-bleed photo slideshow behind the home page hero text. Crossfades every few seconds with a
// slow zoom, pauses while hovered or focused, and stays on the first photo for reduced-motion users.
export default function HeroSlider({ slides, children }: { slides: Slide[]; children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);
  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setStill(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || still) return;
    const t = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, still, go]);

  return (
    <div
      className="hero-slider"
      aria-roledescription="carousel"
      aria-label="Photos of the school"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero-slider__slides">
        {slides.map((s, i) => (
          <div key={s.src} className={`hero-slide${i === index ? " is-active" : ""}`} aria-hidden={i !== index} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`}>
            <Image src={s.src} alt={s.alt} fill priority={i === 0} loading={i === 0 ? undefined : "eager"} quality={85} sizes="100vw" style={s.position ? { objectPosition: s.position } : undefined} />
          </div>
        ))}
      </div>
      <div className="hero-slider__shade" />
      <div className="wrap hero-slider__content">{children}</div>
      <button type="button" className="hero-slider__arrow hero-slider__arrow--prev" onClick={() => go(index - 1)} aria-label="Previous photo">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button type="button" className="hero-slider__arrow hero-slider__arrow--next" onClick={() => go(index + 1)} aria-label="Next photo">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
      </button>
      <div className="hero-slider__dots">
        {slides.map((s, i) => (
          <button key={s.src} type="button" className={i === index ? "is-active" : ""} onClick={() => go(i)} aria-label={`Show photo ${i + 1}: ${s.alt}`} aria-current={i === index} />
        ))}
      </div>
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
