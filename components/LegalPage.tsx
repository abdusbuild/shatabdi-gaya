import Link from "next/link";
import type { ReactNode } from "react";
import LegalToc from "./LegalToc";
import { BreadcrumbJsonLd, DropTitle } from "./ui";

export type LegalSection = { id: string; title: string; body: ReactNode };

// Shared layout for policy pages: title band, sticky contents list, numbered sections.
// `art` is an illustration from components/HeroArt.tsx shown beside the title.
export default function LegalPage({ crumb, path, title, updated, intro, sections, art }: { crumb: string; path: string; title: string; updated: string; intro: ReactNode; sections: LegalSection[]; art?: ReactNode }) {
  return (
    <>
      <section className={`page-hero page-hero--compact${art ? " page-hero--art" : ""}`}>
        <div className={`wrap${art ? " page-hero__grid" : ""}`}>
          <div className="page-hero__text">
            <BreadcrumbJsonLd name={crumb} path={path} />
            <div className="crumbs"><Link href="/">Home</Link> / {crumb}</div>
            <DropTitle text={title} />
            <p>Last updated {updated}</p>
          </div>
          {art && <div className="page-hero__art">{art}</div>}
        </div>
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
