"use client";

import { useEffect, useRef, useState } from "react";

const VOLUME = 0.35;

// Speaker button for the home hero. Starts muted (browsers block autoplay with sound anyway),
// plays a soft looping track on tap, fades in and out, and pauses when the hero scrolls out of
// view or the tab is hidden. Stays hidden until the audio file actually loads, so a missing
// file never shows a broken button.
export default function HeroSound({ src }: { src: string }) {
  const audio = useRef<HTMLAudioElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const fade = useRef<number>(0);
  const [ready, setReady] = useState(false);
  const [on, setOn] = useState(false);
  const [visible, setVisible] = useState(true);

  const fadeTo = (target: number, after?: () => void) => {
    const a = audio.current;
    if (!a) return;
    cancelAnimationFrame(fade.current);
    const start = a.volume;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 600);
      a.volume = start + (target - start) * k;
      if (k < 1) fade.current = requestAnimationFrame(step);
      else after?.();
    };
    fade.current = requestAnimationFrame(step);
  };

  // Pause while the hero is off screen or the tab is in the background
  useEffect(() => {
    const hero = btn.current?.closest(".hero-slider");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(hero);
    const onVis = () => setVisible(!document.hidden && hero.getBoundingClientRect().bottom > 0);
    document.addEventListener("visibilitychange", onVis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, [ready]);

  useEffect(() => {
    const a = audio.current;
    if (!a || !ready) return;
    if (on && visible) {
      a.volume = 0;
      a.play().then(() => fadeTo(VOLUME)).catch(() => setOn(false));
    } else if (!a.paused) {
      fadeTo(0, () => a.pause());
    }
  }, [on, visible, ready]);

  useEffect(() => () => cancelAnimationFrame(fade.current), []);

  return (
    <>
      <audio ref={audio} src={src} loop preload="metadata" onCanPlay={() => setReady(true)} onError={() => setReady(false)} />
      <button
        ref={btn}
        type="button"
        className={`hero-sound${on ? " is-on" : ""}`}
        hidden={!ready}
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        aria-label={on ? "Mute background music" : "Play background music"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M11 5 6 9H2v6h4l5 4V5Z" />
          {on ? (
            <>
              <path className="hero-sound__wave" d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path className="hero-sound__wave hero-sound__wave--2" d="M19 5a10 10 0 0 1 0 14" />
            </>
          ) : (
            <path d="m16 9 6 6M22 9l-6 6" />
          )}
        </svg>
      </button>
    </>
  );
}
