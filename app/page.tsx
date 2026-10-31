import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/Icons";
import CountUp from "@/components/CountUp";
import HeroSlider, { RotatingWord, type Slide } from "@/components/HeroSlider";
import Testimonials from "@/components/Testimonials";
import { CtaBand, Faq } from "@/components/ui";
import { SCHOOL } from "@/lib/site";
import type { Metadata } from "next";
import { OPEN_GRAPH } from "@/lib/seo";

export const metadata: Metadata = { alternates: { canonical: "/" }, openGraph: { ...OPEN_GRAPH, url: "/" } };

const heroSlides: Slide[] = [
  { src: "/images/campus-name-facade.webp", alt: "Shatabdi Public School, Gaya, painted on the building", position: "70% 50%" },
  { src: "/images/campus-main-gate.webp", alt: "The main gate and courtyard on Katari Hill Road", position: "55% 50%" },
  { src: "/images/fd26-assembly-ali-bhawan.webp", alt: "Students gathered in front of Ali Bhawan on Foundation Day 2026", position: "60% 50%" },
  { src: "/images/campus-garden-entrance.webp", alt: "The garden by the school entrance" },
];

const stats = [
  { count: "26", suffix: "", label: "Years of teaching in Gaya" },
  { count: "1400", suffix: "+", label: "Students enrolled" },
  { count: "20000", suffix: "+", label: "Books in the library" },
  { count: "2.58", suffix: " ac", label: "Campus area" },
];

const promises = [
  ["CBSE academics to Class XII", "A full CBSE pathway from pre-primary to Senior Secondary, with Science (with or without Maths) and Commerce streams."],
  ["Values & togetherness", "Our mission is togetherness and service to humanity, and to strengthen the Ganga-Jamuni Hindustani tahzeeb."],
  ["Labs that build curiosity", "The Ibne Sina Lab block houses Computer Science, Physics, Chemistry, Mathematics and Biology labs, one on each floor."],
  ["Open to every child", "Admission is open to all without discrimination of caste, creed or religion. About 40% of our students are girls."],
];

const stages = [
  { title: "Pre-primary", classes: "Prep-I & Prep-II", src: "/images/kids-reading.webp", alt: "Young pupils reading picture books in the primary section", text: "A gentle start in English, with stories, songs, colours and the habit of reading." },
  { title: "Primary", classes: "Classes I to V", src: "/images/annual-function-2017-dance.webp", alt: "Primary pupils dancing on stage at the Annual Function", text: "Strong foundations in languages, mathematics and environmental studies, with music, art and time on stage." },
  { title: "Middle & Secondary", classes: "Classes VI to X", src: "/images/independence-day-choir.webp", alt: "Secondary students singing at the Independence Day celebration", text: "Lab-based science, computer education and continuous evaluation through to the Class X board examinations." },
  { title: "Senior Secondary", classes: "Classes XI & XII", src: "/images/annual-function-2017-anchor.webp", alt: "A senior student anchoring the Annual Function", text: "Science (with or without Mathematics) and Commerce streams, preparing students for college and careers." },
];

const achievements = [
  ["181", "Alumni", "BPSC Rank 181", "Divya Abhishek, of the 2014 batch, secured the 181st rank in the 70th Bihar Public Service Commission examination."],
  ["26", "Class X, 2017", "Students with 10 CGPA", "In the 2017 board examinations, 26 of our Class X students achieved a perfect 10 CGPA."],
  ["90%", "Class XII, 2017", "Stream toppers", "Sahma Anwar topped the Science stream with 90% and Surbhi led Commerce with 73% in the 2017 Class XII examinations."],
];

const photoColumns = [
  [
    ["/images/fd26-assembly-ali-bhawan.webp", "Students gathered in front of Ali Bhawan on Foundation Day"],
    ["/images/kids-reading.webp", "Young pupils reading picture books"],
    ["/images/campus-main-gate.webp", "The main gate and courtyard on Katari Hill Road"],
    ["/images/fd26-dance-white.webp", "A Foundation Day dance by primary girls"],
    ["/images/independence-day-choir.webp", "The school choir on Independence Day"],
  ],
  [
    ["/images/campus-garden-entrance.webp", "The garden by the school entrance"],
    ["/images/certificate-distribution.webp", "A pupil receiving a certificate of excellence"],
    ["/images/fd26-group-song.webp", "Students performing a group song on Foundation Day"],
    ["/images/winter-celebration-band.webp", "The student band at the Winter Annual Celebration"],
    ["/images/independence-day-fancy-dress.webp", "Pupils in fancy dress on Independence Day"],
  ],
];

const moments = [
  { src: "/images/fd26-dance-white.webp", alt: "Girls in white dresses dancing on stage on Foundation Day 2026", date: "26 October 2026", title: "Foundation Day 2026", text: "The school marked its Foundation Day with dances, songs, speeches and the Principal's address, with performances by students of every section." },
  { src: "/images/independence-day-song.webp", alt: "Students singing a patriotic song on Independence Day", date: "15 August 2026", title: "80th Independence Day", text: "Patriotic songs, fancy dress and a salute from our youngest soldiers." },
  { src: "/images/winter-celebration-band.webp", alt: "The student band performing at the Winter Annual Celebration", date: "Winter Annual Celebration", title: "The student band on stage", text: "A cultural, sports and awards evening for parents and guests." },
  { src: "/images/certificate-distribution.webp", alt: "A teacher presenting a certificate of excellence to a pupil", date: "Prize day", title: "Certificates of excellence", text: "Top performers honoured in front of the school." },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <HeroSlider slides={heroSlides} sound="/audio/hero.mp3">
          <div className="hero__text">
            <h1 className="hero__title">Shatabdi Public School <span>Gaya</span></h1>
            <span className="rule rule--hero" />
            <p className="hero__tag">Rooted in values, reaching for the century ahead.</p>
          </div>
        </HeroSlider>
      </section>

      <section className="band intro">
        <div className="wrap">
          <p className="intro__lead reveal">Welcome to <strong>Shatabdi Public School, Gaya</strong> &mdash; an English-medium, co-educational CBSE school on Katari Hill Road that has paired modern academics with lasting values since 2000, from Prep to Class XII.</p>
          <div className="intro__foot">
            <span className="rule rule--grow" />
            <Link className="pill" href="/about">Our story</Link>
          </div>
          <div className="figures">
            {stats.map((s) => (
              <div className="figure reveal" key={s.label}>
                <CountUp className="figure__num" value={s.count} suffix={s.suffix} />
                <div className="figure__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="title-row">
            <h2 className="slide-title">Learning at <em>Shatabdi</em></h2>
            <p className="muted reveal">A full CBSE journey under one roof, from a child&rsquo;s first day in Prep to the Class XII board examinations.</p>
          </div>
          <div className="stages reveal">
            {stages.map((st) => (
              <Link className="stage" href="/academics" key={st.title}>
                <Image src={st.src} alt={st.alt} fill sizes="(max-width: 760px) 100vw, 50vw" quality={85} />
                <span className="stage__body">
                  <span className="stage__title">{st.title}</span>
                  <span className="stage__classes">{st.classes}</span>
                  <span className="stage__text">{st.text}</span>
                  <span className="stage__more">Know more <Arrow /></span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section--alt">
        <div className="wrap split story">
          <div>
            <p className="eyebrow reveal">Born with the new century</p>
            <h2 className="h2-md slide-title">Nurturing <RotatingWord words={["character", "curiosity", "confidence", "togetherness"]} /> since 2000</h2>
            <span className="rule" />
            <p className="lead reveal">Shatabdi means &ldquo;century.&rdquo; The school was formally inaugurated on 26 October 2000 by Janab Saiyid Hamid, former Vice-Chancellor of Aligarh Muslim University and then Chancellor of Jamia Hamdard.</p>
            <p className="muted reveal">It was the first venture of the Shatabdi Foundation, Gaya. The school began with Classes I to VII, gained CBSE affiliation for the secondary classes in 2005 and was upgraded to Class XII in 2007. Today about 1,400 students study here, many of them the first in their families to receive a formal education.</p>
            <Link className="pill pill--dark" href="/about">Read our full story</Link>
          </div>
          {/* Columns of photos that drift up and down, the middle one against the others */}
          <div className="photo-columns">
            {photoColumns.map((col, c) => (
              <div className={`photo-columns__col${c === 1 ? " photo-columns__col--down" : ""}`} key={c}>
                <div className="photo-columns__track">
                  {/* The photos repeat once so the drift can loop; only the first copy is described */}
                  {[...col, ...col].map(([src, alt], i) => (
                    <span className="photo-columns__img" key={i} aria-hidden={i >= col.length || undefined}><Image src={src} alt={i < col.length ? alt : ""} fill sizes="(max-width: 900px) 50vw, 300px" quality={80} /></span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="title-row">
            <h2 className="slide-title">Why parents <em>choose us</em></h2>
            <p className="muted reveal">For a quarter of a century, families across Gaya have trusted us with these four things.</p>
          </div>
          <ol className="promises">
            {promises.map(([title, text], i) => (
              <li className="promise reveal" key={title}>
                <span className="promise__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band">
        <div className="wrap leader">
          <div className="leader__photo img-reveal">
            <Image src="/images/principal-address-portrait.webp" alt="The Principal addressing the school on Foundation Day 2026" fill sizes="(max-width: 900px) 100vw, 40vw" quality={85} />
            <span className="leader__cap"><strong>Mr. Saquib Zarar</strong>Principal, Shatabdi Public School</span>
          </div>
          <div>
            <h2 className="h2-md slide-title">A message from our <em>Principal</em></h2>
            <span className="rule" />
            <blockquote className="leader__quote reveal">&ldquo;Education is helping the mind of the educated to realize about the absolute moral and intellectual values.&rdquo;</blockquote>
            <p className="reveal">We are working for all round development of a child; our 100 percent focus is to achieve 100 percent. It is possible only due to our dedication, hard work, discipline, enthusiasm, punctuality and above all our motivation.</p>
            <Link className="pill" href="/about#principal">Read the full message</Link>
          </div>
        </div>
      </section>

      <section className="band band--deep">
        <div className="wrap">
          <h2 className="slide-title band__title">Achievements &amp; <em>alumni</em></h2>
          <p className="band__sub reveal">Our students&rsquo; results and later careers speak for the school.</p>
          <div className="feats">
            {achievements.map(([fig, tag, title, text]) => (
              <article className="feat reveal" key={title}>
                <div className="feat__fig">{fig}</div>
                <span className="feat__tag">{tag}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Testimonials />
        </div>
      </section>

      <section className="section--alt">
        <div className="wrap">
          <div className="title-row">
            <h2 className="slide-title">Life at <em>Shatabdi</em></h2>
            <p className="muted reveal">Celebrations, performances and prize days from this year. Watch more on our <a href={SCHOOL.youtube} target="_blank" rel="noopener" className="link-gold">YouTube channel</a>.</p>
          </div>
          <div className="news">
            <Link className="news__lead reveal" href="/campus#gallery">
              <span className="news__img"><Image src={moments[0].src} alt={moments[0].alt} fill sizes="(max-width: 900px) 100vw, 60vw" quality={85} /></span>
              <span className="news__date">{moments[0].date}</span>
              <span className="news__title">{moments[0].title}</span>
              <span className="news__text">{moments[0].text}</span>
              <span className="news__more">See the photos <Arrow /></span>
            </Link>
            <ul className="news__list">
              {moments.slice(1).map((m) => (
                <li key={m.src} className="reveal">
                  <Link className="news__item" href="/campus#gallery">
                    <span className="news__thumb"><Image src={m.src} alt={m.alt} fill sizes="180px" quality={85} /></span>
                    <span>
                      <span className="news__date">{m.date}</span>
                      <span className="news__title news__title--sm">{m.title}</span>
                      <span className="news__text">{m.text}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="campus-band">
        <div className="campus-band__img">
          <Image src="/images/campus-courtyard-school-bus.webp" alt="The courtyard and school buses on Katari Hill Road" fill sizes="100vw" quality={85} />
        </div>
        <div className="wrap campus-band__text">
          <h2 className="slide-title">Our <em>campus</em></h2>
          <p className="reveal">A green, walled 2.58-acre campus with five buildings, science and computer labs, a library of more than 20,000 books and the Maulana Abul Kalam Hall.</p>
          <Link className="pill" href="/campus">Explore the campus</Link>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Faq
            title="Frequently asked"
            intro="Quick answers for parents. Can't find yours? Call the office or send an enquiry."
            items={[
              ["Which board is the school affiliated to?", "The Central Board of Secondary Education (CBSE), New Delhi, at Senior Secondary level. Affiliation No. 330113, School Code 65109, valid 1 April 2025 to 31 March 2030."],
              ["Which classes do you offer?", "Preparatory (Prep-I, Prep-II) through Class XII. Classes XI–XII offer Science (with or without Mathematics) and Commerce."],
              ["When do admissions open?", <>Admissions for Std I to IX usually open in December. Admission is based on a written entrance test and an interview. See the <Link href="/admissions" className="link-gold">Admissions page</Link> for details.</>],
              ["Is the school co-educational?", "Yes. Shatabdi Public School is a co-educational, English-medium school. About 40% of our students are girls."],
              ["Is there transport or a hostel?", "Conveyance is provided for the many students who come from nearby rural areas. Taiyab Bhawan also houses a hostel for boys from remote areas. Contact the office for details."],
              ["Where is the school located?", "Katari Hill Road, Aliganj, Gaya, Bihar 823001, about 3 km west of Gaya Railway Junction."],
            ]}
          />
        </div>
      </section>

      <section>
        <div className="wrap">
          <CtaBand title="Admissions are open" text="Visit the campus, meet our teachers and find your child's place at Shatabdi.">
            <Link className="btn btn--gold" href="/admissions#enquiry">Enquire now</Link>
            <a className="btn btn--ghost" href={`tel:${SCHOOL.phone}`}>Call {SCHOOL.phoneLabel}</a>
          </CtaBand>
        </div>
      </section>
    </>
  );
}
