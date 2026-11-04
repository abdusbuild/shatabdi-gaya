import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, Photo } from "@/components/ui";
import { SCHOOL } from "@/lib/site";
import { OPEN_GRAPH, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us",
  description: "History, mission, Principal's message and the Shatabdi Foundation behind Shatabdi Public School, Gaya Ji, established in 2000.",
  alternates: { canonical: "/about" }, openGraph: { ...OPEN_GRAPH, url: "/about", images: [ogImage("about", "About Shatabdi Public School, Gaya Ji")] },
};

const pillars = [
  { title: "Our mission", text: "To provide quality education without discrimination to one and all, and to strengthen the Ganga-Jamuni Hindustani tahzeeb through togetherness and service to humanity." },
  { title: "Our vision", text: "To make the school a centre of excellence that enlightens the mind and soul of the new generation and prepares it to face the challenges of the new “Shatabdi”." },
  { title: "Our values", text: "Quality education with moral orientation, responsible citizenship, strong character, and respect for every faith and culture." },
];

const aims = [
  "Enlightening the mind and soul of the new generation",
  "Imparting quality education with moral orientation",
  "Nurturing and nourishing creative talents of students along with formal education",
  "Guiding the new generation to achieve all-round development",
  "Promoting socialization of the new generation in a plural society",
  "Preparing the generation to face the challenges of the new “Shatabdi”",
];

const milestones = [
  ["2000", "Shatabdi Public School formally inaugurated on 26 October by Janab Saiyid Hamid. The school begins with Classes I to VII."],
  ["2001", "Shatabdi Foundation, Gaya Ji registered (Registration No. 495/2000-01). Taiyab Bhawan, the first building, opens."],
  ["2005", "CBSE affiliation for the secondary classes (Class X)."],
  ["2007", "Upgraded to Senior Secondary, with Class XII in Science and Commerce."],
  ["2017", "26 Class X students score a perfect 10 CGPA in the board examinations."],
  ["2025", "The school celebrates its Silver Jubilee, twenty-five years since its inauguration. CBSE affiliation renewed to 31 March 2030 (Affiliation No. 330113)."],
  ["2026", "Foundation Day celebrated on 26 October, marking 26 years of the school."],
];

const supported = [
  "Eqbal Nagar School, Gaya Ji",
  "Al-Aman Academy, Karah, Nalanda",
  "Farhan Academy, Hisua",
  "Darsagahe Islami, Islampur",
  "Iqra School, Sahadeokhap",
  "Jamia Haleema Saadia, Bihar Sharif",
];


export default function About() {
  return (
    <>
      <PageHero crumb="About" path="/about" title="About the school" image={{ src: "/images/campus-courtyard-school-bus.webp", alt: "The courtyard and school buses on Katari Hill Road", position: "60% center" }}>
        Twenty-six years of English-medium CBSE education on Katari Hill Road, built on togetherness and service.
      </PageHero>

      <section>
        <div className="wrap split">
          <div className="reveal">
            <h2 className="h2-md">A school of peace and enlightenment</h2>
            <p className="lead">Gaya Ji is a historic city with glorious traditions of <em>Shanti</em> (peace) and enlightenment. Shatabdi Public School is an English-medium Senior Secondary School affiliated to CBSE, imparting modern quality education with moral orientation.</p>
            <p className="muted">The school lies in a peaceful part of the city, about 3 km west of Gaya Railway Junction. Five buildings with well-ventilated classrooms, modern laboratories, a well-furnished library and a computer lab make it an ideal place for learning. Trees along the boundary wall and a garden keep the campus green.</p>
            <p className="muted">Admission is open to all without discrimination of caste, creed or religion. Around 1,000 students from every section of society study here, about 40% of them girls, and conveyance is provided for the many who come from nearby rural areas. They are taught by 50 teachers and supported by 20 non-teaching staff.</p>
          </div>
          <Photo src="/images/campus-garden-entrance.webp" label="The garden at the school entrance" className="reveal ph--tall" />
        </div>
      </section>

      <section className="section--alt">
        <div className="wrap">
          <div className="cols">
            {pillars.map(({ title, text }) => (
              <article className="col reveal" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="principal">
        <div className="wrap split split--top">
          <div className="reveal principal-photo">
            <Photo src="/images/principal.webp" label="Mr. Saquib Zarar, Principal" className="ph--portrait" sizes="(max-width: 900px) 90vw, 440px" />
          </div>
          <div className="reveal message">
            <h2 className="h2-md">Educating the mind and soul</h2>
            <blockquote>&ldquo;Education is helping the mind of the educated to realize about the absolute moral and intellectual values.&rdquo;</blockquote>
            <p>To enlighten the mind and soul of the new generation, Shatabdi Public School, Gaya Ji was established in the year 2000, inaugurated by Saiyid Hamid, Chancellor of Jamia Hamdard, New Delhi and former Vice-Chancellor of Aligarh Muslim University, to promote socialization of the new generation in a plural society and to prepare a generation to face the challenges of the new &ldquo;Shatabdi&rdquo;.</p>
            <p>A child born in this world must have the freedom to grow without any restriction. Provision of proper education is a birthright of all children, to bring in them the desirable behavioural change that leads to their development. Quality and competitiveness in tune with modern necessities, to inculcate leadership qualities in the young generation so that it can face challenges boldly and successfully, should be the goal of education.</p>
            <p>We are working for all round development of a child; our 100 percent focus is to achieve 100 percent. It is possible only due to our dedication, hard work, discipline, enthusiasm, punctuality and above all our motivation. Whether in the scholastic or co-scholastic part of a child&rsquo;s life, we add more attractive and beautiful colours to the fabric of education, so that he or she may become a responsible citizen with strong character and fear of God, and a trustworthy torch-bearer of the future.</p>
            <p><strong>— Mr. Saquib Zarar, Principal, Shatabdi Public School</strong></p>
          </div>
        </div>
      </section>

      <section className="section--alt">
        <div className="wrap split split--top">
          <div className="reveal">
            <h2 className="h2-md">A centre of excellence</h2>
            <p className="muted">We firmly believe that with patience, persuasion and perseverance anything can be achieved. Our aim is to make the school a centre of excellence by:</p>
            <ul className="checklist">{aims.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>
          <div className="timeline reveal">
            {milestones.map(([year, text]) => (
              <div className="timeline__item" key={year}>
                <div className="timeline__year">{year}</div>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section--navy" id="foundation">
        <div className="wrap split split--top">
          <div className="reveal">
            <h2 className="h2-md">Education on a non-commercial basis</h2>
            <p style={{ color: "rgba(255,255,255,.78)" }}>Shatabdi Foundation, Gaya Ji, a society registered under the Societies Registration Act, 1860 (Registration No. 495/2000-01), started Shatabdi Public School as its first venture. Most of our students come from weaker sections, the middle class and minority communities, and many are first-generation learners.</p>
            <p style={{ color: "rgba(255,255,255,.78)" }}>The Foundation also runs a free school after school hours, where about 150 children study up to Std V. It moves promising students into the main school and pays their fees, books and uniforms. Merit-cum-poverty scholarships are awarded every year.</p>
          </div>
          <div className="card reveal">
            <h3>Schools supported by the Foundation</h3>
            <ul className="checklist">{supported.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <CtaBand title="Mandatory public disclosure" text="Affiliation, society registration, staff and infrastructure details in the CBSE format.">
            <Link className="btn btn--gold" href="/public-disclosure">View disclosure</Link>
            <a className="btn btn--ghost" href={SCHOOL.cbseRecord} target="_blank" rel="noopener">CBSE record</a>
          </CtaBand>
        </div>
      </section>
    </>
  );
}
