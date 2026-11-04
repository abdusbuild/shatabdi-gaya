import Link from "next/link";
import type { ReactNode } from "react";
import LegalToc from "./LegalToc";
import { SkeletonImage } from "./Skeleton";
import { BreadcrumbJsonLd, DropTitle } from "./ui";

export type LegalSection = { id: string; title: string; body: ReactNode };

// Shared layout for policy pages: title band, sticky contents list, numbered sections.
// `image` is a campus photo shown beside the title, bleeding off the right edge like PageHero.
export default function LegalPage({ crumb, path, title, updated, intro, sections, image }: { crumb: string; path: string; title: string; updated: string; intro: ReactNode; sections: LegalSection[]; image?: { src: string; alt: string; position?: string } }) {
  const text = (
    <div className="page-hero__text">
      <BreadcrumbJsonLd name={crumb} path={path} />
      <div className="crumbs"><Link href="/">Home</Link> / {crumb}</div>
      <DropTitle text={title} />
      <p>Last updated {updated}</p>
    </div>
  );
  return (
    <>
      <section className={`page-hero page-hero--compact${image ? " page-hero--photo" : ""}`}>
        {image ? (
          <div className="wrap page-hero__grid">
            {text}
            <div className="page-hero__img">
              <SkeletonImage src={image.src} alt={image.alt} fill priority sizes="(max-width: 900px) 100vw, 50vw" style={image.position ? { objectPosition: image.position } : undefined} />
            </div>
          </div>
        ) : (
          <div className="wrap">{text}</div>
        )}
      </section>
      <section>
        <div className="wrap legal">
          <LegalToc sections={sections.map(({ id, title }) => ({ id, title }))} />
          <article className="legal__body">
            <div className="legal__intro">{intro}</div>
            {sections.map((s) => (
              <section id={s.id} key={s.id} className="legal__section">
                <h2>{s.title}</h2>
                {s.body}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
