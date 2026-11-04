import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import FaqArt from "./FaqArt";
import { SkeletonImage } from "./Skeleton";
import { SITE_URL } from "@/lib/site";

// BreadcrumbList structured data (Home › Page) so search results can show the page's place in the site.
export function BreadcrumbJsonLd({ name, path }: { name: string; path: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// Page title whose words drop in from above, one after another, when the page opens.
// Screen readers get the plain title from aria-label.
export function DropTitle({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1 className="drop-title" aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="drop-title__word" style={{ "--i": i } as CSSProperties}>{w}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}

// Title band for inner pages. With `image`, a real photo bleeds off the right edge.
export function PageHero({ crumb, path, title, children, image }: { crumb: string; path: string; title: string; children: ReactNode; image?: { src: string; alt: string; position?: string } }) {
  const text = (
    <div className="page-hero__text">
      <BreadcrumbJsonLd name={crumb} path={path} />
      <div className="crumbs"><Link href="/">Home</Link> / {crumb}</div>
      <DropTitle text={title} />
      <p>{children}</p>
    </div>
  );
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
