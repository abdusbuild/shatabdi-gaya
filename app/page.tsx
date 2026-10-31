import Link from "next/link";
import { Arrow } from "@/components/Icons";
import CountUp from "@/components/CountUp";
import HeroSlider, { RotatingWord, type Slide } from "@/components/HeroSlider";
import Testimonials from "@/components/Testimonials";
import { CtaBand, Faq, Photo, SectionHead } from "@/components/ui";
import { SCHOOL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const ticker = [
  "Physics, Chemistry & Biology labs", "Computer lab with Wi-Fi", "20,000+ library books", "Maulana Abul Kalam Hall", "School transport",
  "Playground", "Science & Commerce streams", "Four houses", "Foundation Day", "Annual Function",
];

const heroSlides: Slide[] = [
  { src: "/images/campus-main-building.webp", alt: "The main building of Shatabdi Public School, Gaya", position: "60% 50%" },
  { src: "/images/fd26-assembly-ali-bhawan.webp", alt: "Students gathered in front of Ali Bhawan on Foundation Day 2026", position: "60% 50%" },
  { src: "/images/campus-main-gate.webp", alt: "The main gate and courtyard on Katari Hill Road", position: "55% 50%" },
  { src: "/images/campus-garden-entrance.webp", alt: "The garden by the school entrance" },
  { src: "/images/campus-name-facade.webp", alt: "Shatabdi Public School, Gaya, painted on the building", position: "70% 50%" },
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

const achievements = [
  ["181", "Alumni", "BPSC Rank 181", "Divya Abhishek, of the 2014 batch, secured the 181st rank in the 70th Bihar Public Service Commission examination."],
  ["26", "Class X, 2017", "Students with 10 CGPA", "In the 2017 board examinations, 26 of our Class X students achieved a perfect 10 CGPA."],
  ["90%", "Class XII, 2017", "Stream toppers", "Sahma Anwar topped the Science stream with 90% and Surbhi led Commerce with 73% in the 2017 Class XII examinations."],
];

const moments = [
  ["/images/fd26-dance-white.webp", "Foundation Day 2026"],
  ["/images/independence-day-song.webp", "Independence Day 2026"],
  ["/images/winter-celebration-band.webp", "Winter Annual Celebration"],
  ["/images/certificate-distribution.webp", "Certificates of excellence"],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <HeroSlider slides={heroSlides}>
          <div className="hero__text reveal">
            <span className="badge"><b>CBSE</b> Senior Secondary · Affiliation No. 330113</span>
            <h1>Rooted in values, <em>reaching</em> for the century ahead.</h1>
            <p>Since 2000, Shatabdi Public School has given the children of Gaya an English-medium education that pairs strong academics with togetherness, service to humanity and our shared Ganga-Jamuni heritage.</p>
            <p className="hero__rotate">Every day we nurture <RotatingWord words={["character", "curiosity", "confidence", "togetherness", "discipline"]} /></p>
            <div className="hero__cta">
              <Link className="btn btn--gold" href="/admissions#enquiry">Start an admission enquiry <Arrow /></Link>
              <Link className="btn btn--ghost" href="/campus">See school life</Link>
            </div>
          </div>
        </HeroSlider>
        <div className="ticker" aria-hidden="true">
          <div className="ticker__track">
            {[...ticker, ...ticker].map((t, i) => <span key={i}>{t}</span>)}
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="wrap">
          <div className="stats reveal">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <CountUp className="stat__num" value={s.count} suffix={s.suffix} />
                <div className="stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section--alt">
        <div className="wrap">
          <SectionHead title={<>A school built on <em>four promises</em></>}>
            For a quarter of a century, parents across Gaya have trusted us with these four things.
          </SectionHead>
          <div className="cols cols--4">
            {promises.map(([title, text], i) => (
              <article className="col reveal" key={title}>
                <span className="col__tag">{String(i + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap split">
          <Photo src="/images/fd26-assembly-ali-bhawan.webp" label="Students gathered in front of Ali Bhawan" className="reveal ph--tall" />
          <div className="reveal">
            <h2 className="h2-md">Born with the <em>new century</em></h2>
            <p className="lead">Shatabdi means &ldquo;century.&rdquo; The school was formally inaugurated on 26 October 2000 by Janab Saiyid Hamid, former Vice-Chancellor of Aligarh Muslim University and then Chancellor of Jamia Hamdard.</p>
            <p className="muted">It was the first venture of the Shatabdi Foundation, Gaya. The school began with Classes I to VII, gained CBSE affiliation for the secondary classes in 2005 and was upgraded to Class XII in 2007. Today about 1,400 students study here, many of them the first in their families to receive a formal education.</p>
            <Link className="btn btn--navy" href="/about">Read our full story</Link>
          </div>
        </div>
      </section>

      <section className="section--alt">
        <div className="wrap split">
          <div className="reveal message">
            <h2 className="h2-md">A message from our <em>Principal</em></h2>
            <blockquote>&ldquo;Education is helping the mind of the educated to realize about the absolute moral and intellectual values.&rdquo;</blockquote>
            <p>We are working for all round development of a child; our 100 percent focus is to achieve 100 percent. It is possible only due to our dedication, hard work, discipline, enthusiasm, punctuality and above all our motivation.</p>
            <Link href="/about#principal" className="link-gold">Read the full message →</Link>
          </div>
          <Photo src="/images/principal-address-portrait.webp" label="Principal's address, Foundation Day 2026" className="reveal ph--tall" />
        </div>
      </section>

      <section className="section--navy">
        <div className="wrap">
          <SectionHead title={<>Achievements &amp; <em>alumni</em></>}>
            Our students&rsquo; results and later careers speak for the school.
          </SectionHead>
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
          <SectionHead title={<>Recent <em>moments</em></>}>
            Celebrations, performances and prize days from this year. Watch more on our <a href={SCHOOL.youtube} target="_blank" rel="noopener" className="link-gold">YouTube channel</a>.
          </SectionHead>
          <div className="grid grid-4">
            {moments.map(([src, label]) => (
              <Photo key={src} src={src} label={label} sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 300px" className="reveal ph--gallery" />
            ))}
          </div>
          <p className="mt-14"><Link href="/campus#gallery" className="link-gold">See the full gallery →</Link></p>
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
