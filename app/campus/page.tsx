import type { Metadata } from "next";
import { Book, Bus, Flask, Globe, Monitor, Music, Plus, Screen, Shield } from "@/components/Icons";
import CountUp from "@/components/CountUp";
import Gallery from "@/components/Gallery";
import { PageHero, SectionHead } from "@/components/ui";
import { SCHOOL } from "@/lib/site";
import { SkeletonFrame } from "@/components/Skeleton";
import VideoGrid, { type Video } from "@/components/VideoGrid";
import { OPEN_GRAPH, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Campus & School Life",
  description: "Buildings, labs, library, houses, clubs and photo gallery of Shatabdi Public School's 2.58-acre campus on Katari Hill Road, Gaya.",
  alternates: { canonical: "/campus" }, openGraph: { ...OPEN_GRAPH, url: "/campus", images: [ogImage("campus", "Campus and school life at Shatabdi Public School, Gaya")] },
};

// From the school's YouTube channel. Keep the count a multiple of 3 so the last row stays full.
const videos: Video[] = [
  { id: "aan2nQ8NI4w", title: "Munna Bhai MBBS" },
  { id: "H2L5CMJE9b0", title: "Nagada song by Jiara Hussain" },
  { id: "LoMEb248if0", title: "Beti Hun Main" },
  { id: "svjVUzjC4TA", title: "Anpadh Neta, a play" },
  { id: "RBDPWE6HdDU", title: "Sandeshe Aate Hain by students of Class II" },
  { id: "s3ZU8L6vBOs", title: "With pride and patriotism" },
  { id: "1oirlY7FhLY", title: "Maa Se Hai Maati by the Class V group" },
  { id: "-KWsTGqZNMc", title: "Divya Abhishek, a Shatabdi student who cracked the BPSC exam and became an SDM" },
  { id: "bGEW4jaPpxc", title: "Silver Jubilee Celebration 2025" },
];

// Silver Jubilee details come from the titles and descriptions of these videos on the school's channel.
const jubileeVideos: Video[] = [
  { id: "Gmsu2LEyp4o", title: "Tarana-e-Shatabdi by students" },
  { id: "RvA8q4k2Lcs", title: "Speech by the Chief Guest, Dr. Syed Abuzar Kamaluddin" },
  { id: "iBStG7-lPRs", title: "Welcome message by the Principal" },
  { id: "rwyjyrYn7rA", title: "Speech by Janab Badiuzzaman, Hon. Secretary, Shatabdi Foundation" },
  { id: "n6OWoDgPJq0", title: "Interview with the Secretary and Principal, with student reviews" },
  { id: "ebk9ejBjqAA", title: "Group video with members of the Managing Committee" },
];

const jubileeSpeakers = [
  ["Chief Guest", "Dr. Syed Abuzar Kamaluddin"],
  ["Ameer Halqa Bihar", "Janab Rizwan Islahi"],
  ["Hon. Secretary, Shatabdi Foundation", "Janab Badiuzzaman"],
  ["Speaker", "Dr. Shamshul Islam"],
];

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

// A third value of true marks a portrait photo, shown as a tall tile so it is not cropped
const gallery: [string, string, boolean?][] = [
  ["/images/fd26-assembly-ali-bhawan.webp", "Foundation Day assembly in front of Ali Bhawan"],
  ["/images/fd26-welcome-address.webp", "Welcome address, Foundation Day"],
  ["/images/fd26-student-speakers.webp", "Student speakers, Foundation Day", true],
  ["/images/fd26-students-seated.webp", "Students seated for the Foundation Day programme"],
  ["/images/fd26-guests-and-students.webp", "Guests and students in front of Ali Bhawan"],
  ["/images/fd26-guests.webp", "Guests at the Foundation Day programme"],
  ["/images/fd26-hosts.webp", "The hosts on stage, Foundation Day"],
  ["/images/fd26-little-ones.webp", "Our youngest pupils on stage, Foundation Day"],
  ["/images/fd26-skit.webp", "Primary pupils performing a skit, Foundation Day"],
  ["/images/fd26-solo-dance.webp", "A solo dance, Foundation Day"],
  ["/images/fd26-group-song.webp", "A group song, Foundation Day"],
  ["/images/fd26-prize.webp", "Prize giving, Foundation Day"],
  ["/images/fd26-prize-certificate.webp", "A young winner with her certificate, Foundation Day"],
  ["/images/fd26-guest-address.webp", "A guest addresses the gathering, Foundation Day"],
  ["/images/exhibition-volcano.webp", "Volcano model, project exhibition"],
  ["/images/exhibition-cell-model.webp", "Plant and animal cell models, project exhibition"],
  ["/images/exhibition-solar-system.webp", "Solar system model, project exhibition"],
  ["/images/exhibition-solar-system-2.webp", "Another solar system model, project exhibition"],
  ["/images/exhibition-smart-city.webp", "A pollution-free city model, project exhibition"],
  ["/images/exhibition-social-science.webp", "Social Science models, project exhibition"],
  ["/images/campus-main-building.webp", "The main school building"],
  ["/images/campus-name-facade.webp", "Shatabdi Public School, Gaya"],
  ["/images/campus-garden-entrance.webp", "Garden by the entrance"],
  ["/images/campus-arched-windows.webp", "Arched windows of the school building"],
  ["/images/campus-stair-tower.webp", "The stair tower"],
  ["/images/campus-building-side.webp", "Classroom wing"],
  ["/images/campus-courtyard-school-bus.webp", "The courtyard and school buses"],
  ["/images/campus-buses-classroom-wing.webp", "School buses beside the classroom wing"],
  ["/images/annual-function-dance.webp", "Annual Function dance"],
  ["/images/annual-function-dance-yellow.webp", "Young dancers, Annual Function"],
  ["/images/annual-function-girls-group.webp", "Annual Function presentation"],
  ["/images/annual-function-speech.webp", "Student speech, Annual Function", true],
  ["/images/annual-function-student-speech.webp", "Speaking at the podium, Annual Function", true],
  ["/images/annual-function-audience.webp", "Parents and guests at the Annual Function"],
  ["/images/excursion-group-gate.webp", "Educational excursion"],
  ["/images/excursion-group-line.webp", "Students on an educational excursion"],
  ["/images/excursion-girls-gate.webp", "Senior students on an excursion"],
  ["/images/excursion-girls-group.webp", "Friends on an excursion"],
  ["/images/excursion-students.webp", "Students on an excursion"],
  ["/images/excursion-bus-selfie.webp", "On the bus"],
  ["/images/excursion-teachers.webp", "Teachers on an excursion"],
  ["/images/excursion-staff.webp", "Staff and parents on an excursion"],
  ["/images/study-tour-girls.webp", "Senior students on a study tour"],
  ["/images/study-tour-girls-2.webp", "Study tour"],
  ["/images/study-tour-selfie.webp", "Study tour selfie"],
  ["/images/study-tour-teachers.webp", "Teachers on a study tour", true],
  ["/images/management-group.webp", "School management", true],
  // Last on purpose: on desktop it becomes a tall tile so the final row has no gap (see globals.css)
  ["/images/science-museum-visit.webp", "Science museum visit"],
];

export default function Campus() {
  return (
    <>
      <PageHero crumb="Campus & Life" path="/campus" title="Campus & school life" image={{ src: "/images/campus-main-building.webp", alt: "The main school building and courtyard, with school buses parked by the gate" }}>
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

      <section className="band band--deep" id="silver-jubilee">
        <div className="wrap">
          <p className="eyebrow reveal">Silver Jubilee 2025</p>
          <h2 className="slide-title band__title">Twenty-five years of <em>Shatabdi</em></h2>
          <p className="band__sub reveal">The school marked twenty-five years since its inauguration on 26 October 2000 with speeches and student performances, from the Tarana-e-Shatabdi to dances, dramas, an Urdu mushaira and the dohas of Kabir.</p>
          <dl className="jubilee__people reveal">
            {jubileeSpeakers.map(([role, name]) => (
              <div key={name}>
                <dt>{role}</dt>
                <dd>{name}</dd>
              </div>
            ))}
          </dl>
          <VideoGrid videos={jubileeVideos} />
          <a className="pill jubilee__more" href={`${SCHOOL.youtube}/search?query=silver%20jubilee`} target="_blank" rel="noopener">Watch all the performances</a>
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
            <p className="muted">The school celebrated its Foundation Day on 26 October 2026 with performances by students of every section. Watch the Principal&rsquo;s address here, with more videos from the school below.</p>
            <a className="btn btn--navy" href={SCHOOL.youtube} target="_blank" rel="noopener">Visit our YouTube channel</a>
          </div>
          <div className="video reveal">
            <SkeletonFrame
              src="https://www.youtube-nocookie.com/embed/e3YOWHp25E8"
              title="Principal's Address during Foundation Day Celebration 2026"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
        <div className="wrap videos-more">
          <h2 className="h2-sm reveal">More from our channel</h2>
          <VideoGrid videos={videos} />
        </div>
      </section>
    </>
  );
}
