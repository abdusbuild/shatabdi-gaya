import type { Metadata } from "next";
import { Book, Bus, Flask, Globe, Monitor, Music, Plus, Screen, Shield } from "@/components/Icons";
import CountUp from "@/components/CountUp";
import Gallery from "@/components/Gallery";
import { CampusArt } from "@/components/HeroArt";
import { PageHero, SectionHead } from "@/components/ui";
import { SCHOOL } from "@/lib/site";
import { SkeletonFrame } from "@/components/Skeleton";

export const metadata: Metadata = {
  title: "Campus & School Life",
  description: "Buildings, labs, library, houses, clubs and photo gallery of Shatabdi Public School's 2.58-acre campus on Katari Hill Road, Gaya.",
  alternates: { canonical: "/campus" },
};

const stats = [
  { count: "5", label: "School buildings" },
  { count: "65", label: "Classrooms" },
  { count: "7", label: "Laboratories" },
  { count: "20000", suffix: "+", label: "Library books" },
];

const buildings = [
  ["Ali Bhawan", "The triple-storeyed central building and administrative block: Principal's chamber, accounts office, visitors' room, staff rooms, the library and reading room, and classrooms for Classes VI to X."],
  ["Taiyab Bhawan", "In the east of the campus, the first building, where the school began in 2001. Classrooms for Class XI–XII Commerce on the ground floor, and a hostel for boys from remote areas above."],
  ["Azad Bhawan", "In the west of the campus. Classrooms for girls of Classes VI to X, the Manager's chamber, and the school auditorium, Maulana Abul Kalam Hall."],
  ["Iqbal Bhawan", "A triple-storeyed building south of Ali Bhawan, home to the Preparatory and Primary sections."],
  ["Ibne Sina Lab", "A newer four-storeyed lab block east of Ali Bhawan, with a separate floor each for Computer Science (with internet and Wi-Fi), Chemistry, Physics, Mathematics and Biology. The biology lab is named the Dr. Abul Khair Biological Lab."],
  ["Mosque & garden", "A mosque inside the campus, with a garden of seasonal plants and trees along the boundary wall that keep the campus green and pollution-free."],
];

const facilities = [
  { Icon: Flask, title: "Science labs", text: "Physics, Chemistry, Biology and Mathematics labs, equipped as CBSE prescribes up to Class XII." },
  { Icon: Monitor, title: "Computer lab", text: "A Computer Science lab with internet access and a Wi-Fi zone." },
  { Icon: Book, title: "Computerised library", text: "More than 20,000 books, including about 9,000 reference books, plus 18 periodicals, 6 dailies and 23 magazines." },
  { Icon: Music, title: "Auditorium", text: "Maulana Abul Kalam Hall hosts assemblies, Foundation Day, the Annual Function and cultural programmes." },
  { Icon: Globe, title: "Sports", text: "Indoor and outdoor games: football, cricket, volleyball, badminton, kho-kho, kabaddi, chess and carrom." },
  { Icon: Bus, title: "Conveyance", text: "Transport for the many students who come from neighbouring rural areas." },
  { Icon: Screen, title: "Smart classrooms", text: "Well-ventilated classrooms with audio-visual teaching aids." },
  { Icon: Shield, title: "Safe campus", text: "A fenced campus with a boundary wall and security staff." },
  { Icon: Plus, title: "Boys' hostel", text: "Hostel rooms in Taiyab Bhawan for boys coming from remote areas." },
];

const houses = [
  ["ganga", "Ganga", "House"],
  ["jamuna", "Jamuna", "House"],
  ["kaveri", "Kaveri", "House"],
  ["brahmaputra", "Brahmaputra", "House"],
];

const activities = ["Speeches", "Songs", "Antakshari (Baitbazi)", "Drawing & painting", "Debates", "Poem recitation", "Quiz", "Dance", "Drama", "Fancy dress", "Patriotic songs", "Action songs"];
const occasions = ["Foundation Day (26 Oct)", "Independence Day", "Republic Day", "Gandhi Jayanti", "Teachers' Day", "Children's Day", "Annual Function", "Sports Day"];

const gallery: [string, string][] = [
  ["/images/fd26-banner.jpg", "Foundation Day, 26 October 2026"],
  ["/images/fd26-assembly.jpg", "Students gathered for Foundation Day"],
  ["/images/fd26-ali-bhawan.jpg", "Assembly in front of Ali Bhawan"],
  ["/images/fd26-young-students.jpg", "Primary students at Foundation Day"],
  ["/images/fd26-welcome.jpg", "Welcome address, Foundation Day"],
  ["/images/fd26-guests.jpg", "Guests at Foundation Day"],
  ["/images/fd26-girls-guests.jpg", "Students and guests at the celebration"],
  ["/images/fd26-anchors.jpg", "Student anchors on stage"],
  ["/images/foundation-day-dance.jpg", "Foundation Day 2026"],
  ["/images/independence-day-choir.jpg", "Independence Day choir"],
  ["/images/annual-function-band.jpg", "Annual Function"],
  ["/images/foundation-day-kids.jpg", "Foundation Day performance"],
  ["/images/fancy-dress.jpg", "Independence Day fancy dress"],
  ["/images/prize-distribution.jpg", "Morning prayer & prize distribution"],
  ["/images/independence-day-group.jpg", "Patriotic song, Independence Day"],
  ["/images/foundation-day-performance.jpg", "Foundation Day dance"],
  ["/images/girls-placards.jpg", "Annual Function presentation"],
  ["/images/kids-action-song.jpg", "Action song by Class II"],
  ["/images/independence-day-song.jpg", "Senior students' song"],
  ["/images/foundation-day-song.jpg", "Primary students on stage"],
  ["/images/student-speakers.jpg", "Student performers"],
  ["/images/morning-prize.jpg", "Prize winners"],
  ["/images/parents-audience.jpg", "Parents at the Annual Function"],
  ["/images/guests-audience.jpg", "Guests and parents"],
  ["/images/independence-day-stage.jpg", "Independence Day stage"],
  ["/images/assembly.jpg", "Students at a celebration"],
];

export default function Campus() {
  return (
    <>
      <PageHero crumb="Campus & Life" title="Campus & school life" art={<CampusArt />}>
        A green, walled 2.58-acre campus on Katari Hill Road with five buildings, modern labs, a computerised library and a busy calendar of celebrations.
      </PageHero>

      <section>
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
          <SectionHead title="Five buildings and a garden">
            A vast, fenced campus with greenery, a garden of seasonal plants, five impressive buildings and a mosque.
          </SectionHead>
          <div className="grid grid-3">
            {buildings.map(([name, text]) => (
              <div className="building reveal" key={name}>
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead title="Facilities" />
          <ul className="facilities reveal">
            {facilities.map(({ Icon, title, text }) => (
              <li className="facility" key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section--alt">
        <div className="wrap">
          <SectionHead title="Four houses, one school">
            All students and teachers belong to one of four houses named after India&rsquo;s great rivers. Each house has Sub-Junior (Prep to III), Junior (IV to VII) and Senior (VIII to XII) wings, a housemaster, and a student captain and vice-captain.
          </SectionHead>
          <div className="grid grid-4 houses">
            {houses.map(([key, name, label]) => (
              <div className={`house house--${key} reveal`} key={key}>
                <h3>{name}</h3>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap split split--top">
          <div className="reveal">
            <h2 className="h2-sm">Every child on stage</h2>
            <p className="muted">Periods are set aside every week for co-curricular activities, organised through the house system.</p>
            <div className="chips">{activities.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
          </div>
          <div className="reveal">
            <h2 className="h2-sm">Days we celebrate</h2>
            <p className="muted">Important occasions are celebrated with great fervour, and games and sports are held throughout the year.</p>
            <div className="chips">{occasions.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="section--alt" id="gallery">
        <div className="wrap">
          <SectionHead title="Life at Shatabdi">
            Moments from Foundation Day, Independence Day and the Annual Function. More on our{" "}
            <a href={SCHOOL.youtube} target="_blank" rel="noopener" className="link-gold">YouTube</a>,{" "}
            <a href={SCHOOL.instagram} target="_blank" rel="noopener" className="link-gold">Instagram</a> and{" "}
            <a href={SCHOOL.facebook} target="_blank" rel="noopener" className="link-gold">Facebook</a> pages.
          </SectionHead>
          <Gallery items={gallery} />
        </div>
      </section>

      <section>
        <div className="wrap split">
          <div className="reveal">
            <h2 className="h2-md">Principal&rsquo;s address, Foundation Day 2026</h2>
            <p className="muted">The school celebrated its Foundation Day on 26 October 2026 with performances by students of every section. Watch the Principal&rsquo;s address, and find more videos on our channel.</p>
            <a className="btn btn--navy" href={SCHOOL.youtube} target="_blank" rel="noopener">Visit our YouTube channel</a>
          </div>
          <div className="video reveal">
            <SkeletonFrame
              src="https://www.youtube-nocookie.com/embed/e3YOWHp25E8"
              title="Principal's Address during Foundation Day Celebration 2026"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
