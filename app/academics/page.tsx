import type { Metadata } from "next";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import Gallery from "@/components/Gallery";
import { Chart, Flask, Leaf } from "@/components/Icons";
import { CtaBand, PageHero, Photo, SectionHead } from "@/components/ui";
import { OPEN_GRAPH, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Academics",
  description: "CBSE curriculum from pre-primary to Class XII at Shatabdi Public School, Gaya Ji. Science and Commerce streams in the senior secondary classes.",
  alternates: { canonical: "/academics" }, openGraph: { ...OPEN_GRAPH, url: "/academics", images: [ogImage("academics", "Academics at Shatabdi Public School, Gaya Ji")] },
};

const stages = [
  ["PP-1 · PP-2", "Pre-primary", "Play-based learning that builds language, number sense, motor skills and confidence. The minimum entry age is 4 years."],
  ["Class I – V", "Primary", "Strong foundations in English, Hindi, Mathematics and Environmental Studies, with art, music and games."],
  ["Class VI – VIII", "Middle", "Science, Social Science, languages and computer education, with more hands-on lab work."],
  ["Class IX – XII", "Secondary & Senior Secondary", "Preparation for the CBSE board examinations, with Science and Commerce streams in Classes XI and XII."],
];

const streams = [
  { Icon: Flask, title: "Science with Mathematics", subjects: ["English Core", "Physics", "Chemistry", "Mathematics", "Elective: Biology / Multimedia & Web Technology / Physical Education / Hindi Core / Urdu Core"] },
  { Icon: Leaf, title: "Science without Mathematics", subjects: ["English Core", "Physics", "Chemistry", "Biology", "Elective: Multimedia & Web Technology / Physical Education / Hindi Core / Urdu Core"] },
  { Icon: Chart, title: "Commerce", subjects: ["English Core", "Accountancy", "Business Studies", "Economics", "Elective: Multimedia & Web Technology / Hindi Core / Urdu Core"] },
];

// The first photo fills the large tile of the mosaic; the last two fill the wide tiles of the bottom row.
const libraryPhotos: [string, string][] = [
  ["/library/lib2.jpg", "Students reading at the long table in the library reading room"],
  ["/library/lib1.jpg", "A reading period in the library"],
  ["/library/lib4.jpg", "Students with storybooks and magazines"],
  ["/library/lib7.jpg", "Book cabinets arranged class by class"],
  ["/library/lib6.jpg", "The computerised library desk"],
  ["/library/lib5.jpg", "Stacks and periodicals in the library"],
  ["/library/lib3.jpg", "Students seated along the reading table with their books"],
];

const libraryFigures = [
  { count: "20000", suffix: "+", label: "Books in the collection" },
  { count: "9000", suffix: "", label: "Reference books (approx.)" },
  { count: "18", suffix: "", label: "Periodicals" },
  { count: "23", suffix: "", label: "Magazines" },
];

export default function Academics() {
  return (
    <>
      <PageHero crumb="Academics" path="/academics" title="Academics" image={{ src: "/images/exhibition-solar-system.webp", alt: "A student-made solar system model at the school science exhibition" }}>
        A complete CBSE pathway, from a child&rsquo;s first day in pre-primary to the Class XII board examinations.
      </PageHero>

      <section>
        <div className="wrap">
          <SectionHead title="From PP-1 to Class XII">
            The academic session runs from April to March, with summer vacation from mid-May to mid-June.
          </SectionHead>
          <ol className="pathway reveal">
            {stages.map(([tag, title, text]) => (
              <li key={title}>
                <span className="pathway__tag">{tag}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section--alt">
        <div className="wrap">
          <SectionHead title="Streams & subjects">
            Students choose a stream after Class X. Please confirm current subject combinations with the school office.
          </SectionHead>
          <div className="grid grid-3">
            {streams.map(({ Icon, title, subjects }) => (
              <article className="card reveal" key={title}>
                <div className="card__icon"><Icon /></div>
                <h3>{title}</h3>
                <ul className="checklist">{subjects.map((s) => <li key={s}>{s}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap split">
          <div className="reveal">
            <h2 className="h2-md">Secondary scheme of studies</h2>
            <p className="lead">Class X students study five subjects plus one compulsory vocational subject, with the option of a sixth subject, as the CBSE scheme prescribes.</p>
            <ul className="checklist">
              <li>English and a second language (Hindi or Urdu)</li>
              <li>Mathematics</li>
              <li>Science</li>
              <li>Social Science</li>
              <li>A vocational or skill subject, such as Information Technology</li>
            </ul>
          </div>
          <Photo src="/images/exhibition-cell-model.webp" label="Cell models at the school project exhibition" className="reveal ph--tall" />
        </div>
      </section>

      <section className="section--navy">
        <div className="wrap">
          <SectionHead title="Learning beyond the textbook" />
          <div className="cols">
            <article className="col reveal"><h3>Lab-based science</h3><p>The Ibne Sina Lab block has dedicated Physics, Chemistry, Biology and Mathematics labs that turn theory into experiments.</p></article>
            <article className="col reveal"><h3>Computer education</h3><p>A Computer Science lab with internet and Wi-Fi, plus the Multimedia &amp; Web Technology option, builds digital skills.</p></article>
            <article className="col reveal"><h3>Continuous evaluation</h3><p>Every aspect of a child&rsquo;s development is assessed continuously and comprehensively through the session.</p></article>
          </div>
        </div>
      </section>

      <section className="section--alt library" id="library">
        <div className="wrap">
          <div className="title-row">
            <div>
              <p className="eyebrow reveal">The library</p>
              <h2 className="slide-title">More than <em>20,000 books</em></h2>
            </div>
            <p className="muted reveal">Our computerised library and reading room are enriched every year with books and journals for students and teachers alike.</p>
          </div>
          <Gallery items={libraryPhotos} className="gallery--library" />
          <div className="library__panel reveal">
            <div className="library__figures">
              {libraryFigures.map((f) => (
                <div className="library__figure" key={f.label}>
                  <CountUp className="library__num" value={f.count} suffix={f.suffix} />
                  <div className="library__label">{f.label}</div>
                </div>
              ))}
            </div>
            <div className="library__shelf">
              <h3>On the shelves</h3>
              <ul className="checklist">
                <li>Class-wise collections from Prep-I to Class XII</li>
                <li>Yearbooks, almanacs, atlases, maps and globes</li>
                <li>Stories, comics, and poetry in Urdu, Hindi and English</li>
                <li>6 daily newspapers in the reading room</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <CtaBand title="Looking for a seat in Class XI?" text="Talk to our office about streams, subject combinations and eligibility.">
            <Link className="btn btn--gold" href="/admissions#enquiry">Enquire now</Link>
          </CtaBand>
        </div>
      </section>
    </>
  );
}
