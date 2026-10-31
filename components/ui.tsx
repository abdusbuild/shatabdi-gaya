import Link from "next/link";
import type { ReactNode } from "react";
import FaqArt from "./FaqArt";
import { SkeletonImage } from "./Skeleton";

// Title band for inner pages. With `image`, a real photo bleeds off the right edge;
// with `art`, an illustration (components/HeroArt.tsx) sits beside the text.
export function PageHero({ crumb, title, children, image, art }: { crumb: string; title: string; children: ReactNode; image?: { src: string; alt: string; position?: string }; art?: ReactNode }) {
  const text = (
    <div className="page-hero__text">
      <div className="crumbs"><Link href="/">Home</Link> / {crumb}</div>
      <h1>{title}</h1>
      <p>{children}</p>
    </div>
  );
  if (art) {
    return (
      <section className="page-hero page-hero--art">
        <div className="wrap page-hero__grid">
          {text}
          <div className="page-hero__art">{art}</div>
        </div>
      </section>
    );
  }
  if (!image) return <section className="page-hero"><div className="wrap">{text}</div></section>;
  return (
    <section className="page-hero page-hero--photo">
      <div className="wrap page-hero__grid">
        {text}
        <div className="page-hero__img">
          <SkeletonImage src={image.src} alt={image.alt} fill priority sizes="(max-width: 900px) 100vw, 50vw" style={image.position ? { objectPosition: image.position } : undefined} />
        </div>
      </div>
    </section>
  );
}

export function SectionHead({ title, children, center }: { title: ReactNode; children?: ReactNode; center?: boolean }) {
  return (
    <div className={`section-head reveal${center ? " center" : ""}`}>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

// Photo frame with an optional caption. Without `src` it renders a coloured placeholder.
// `priority` is for photos visible on first paint. `sizes` tells the browser how wide the frame is
// so it downloads a matching resized copy instead of the full photo.
export function Photo({ label, tone, src, caption = true, priority, sizes = "(max-width: 900px) 100vw, 600px", className = "" }: { label: string; tone?: "gold" | "green"; src?: string; caption?: boolean; priority?: boolean; sizes?: string; className?: string }) {
  return (
    <div className={`ph${tone ? ` ph--${tone}` : ""}${src ? " ph--photo" : ""} ${className}`.trim()}>
      {src && <SkeletonImage src={src} alt={label} fill priority={priority} sizes={sizes} />}
      {(caption || !src) && <span>{label}</span>}
    </div>
  );
}

// Illustration on one side, heading and accordion on the other.
export function Faq({ title, intro, items }: { title: string; intro?: ReactNode; items: [string, ReactNode][] }) {
  return (
    <div className="faq-layout">
      <div className="faq-layout__art reveal"><FaqArt /></div>
      <div>
        <SectionHead title={title}>{intro}</SectionHead>
        <div className="faq reveal">
          {items.map(([q, a], i) => (
            <details key={q} name="faq" open={i === 0}>
              <summary><span className="faq__num">{String(i + 1).padStart(2, "0")}</span><span className="faq__q">{q}</span></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CtaBand({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <div className="cta-band reveal">
      <div><h2>{title}</h2><p>{text}</p></div>
      <div className="cta-actions">{children}</div>
    </div>
  );
}
