import { SectionHead } from "./ui";
import ReviewScroller from "./ReviewScroller";

// Real public reviews, quoted verbatim. Google reviews collected from the school's
// Google Maps listing on 30 Oct 2026 (4.0 stars, 299 reviews); years are approximate,
// derived from Google's "x years ago" labels.
export const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/search/?api=1&query=Shatabdi+Public+School+Katari+Hill+Road+Gaya";
const SCHOOLMYKIDS_URL = "https://www.schoolmykids.com/school/shatabdi-public-school-aliganj-gaya-gaya-bihar-india-s10011269";

type Review = { name: string; role: string; source: "Google" | "SchoolMyKids"; year: string; text: string };

const reviews: Review[] = [
  { name: "Arpit Kashyap", role: "Google Local Guide", source: "Google", year: "2026", text: "Good atmosphere to study in, great teacher who takes care of the students. one of the good options to go for." },
  { name: "Saima Amin", role: "Reviewer", source: "Google", year: "2021", text: "This is very nice school in gaya with Affordable fee, well maintained class rooms, equipped with CCTV..and I love the science lab of this school." },
  { name: "Aditya Kumar", role: "Former student", source: "Google", year: "2024", text: "I'm pass out from this school. The teacher are highly experienced. And the best part is its follows NCERT Book. After class 5th." },
  { name: "Sanjeev Azad", role: "Former student, Prep-1 to XII", source: "Google", year: "2017", text: "I studied here for almost 14 years from prep-1 to 12th ...i am not disappointed with my school ...i loved it then ..i love it now ..also" },
  { name: "Salman Hussain", role: "Former student", source: "SchoolMyKids", year: "2024", text: "Awsm school Highly recommended because in this school you learn both modern education with Islamic education" },
  { name: "MD Sadrullah", role: "Google Local Guide", source: "Google", year: "2023", text: "Here muslim students also learn arabic as well as urdu. And non muslim sanskrit faculty also available" },
  { name: "Harun Rashid", role: "Reviewer", source: "Google", year: "2017", text: "Sps is very good school for those student who want to study. It is laborious school. There we learn all things including good manner e.t.c." },
  { name: "D. Munami", role: "Reviewer", source: "Google", year: "2025", text: "Equipped with all the essential learning environment and spreading positive vibes" },
  { name: "MD Zartaj Khan", role: "Former student", source: "Google", year: "2023", text: "I love this school and i made alots of memory here with my friends or with my teachers. This year i am going to leave this school and i will miss it alot in the future" },
];

const initials = (name: string) => name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

export default function Testimonials({ limit }: { limit?: number }) {
  const list = limit ? reviews.slice(0, limit) : reviews;
  return (
    <>
      <div className="reviews-head">
        <SectionHead title="What our community says">
          Reviews from former students, students and visitors, quoted word for word from Google and SchoolMyKids.
        </SectionHead>
        <a className="rating-badge reveal" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener">
          <span className="rating-badge__score">4.0</span>
          <span>
            <span className="stars" aria-hidden="true">★★★★☆</span>
            <span className="rating-badge__meta">299 Google reviews</span>
          </span>
        </a>
      </div>
      <ReviewScroller>
        {list.map((r) => (
          <figure className="card review" key={r.name}>
            <span className="review__mark" aria-hidden="true">&ldquo;</span>
            <blockquote>{r.text}</blockquote>
            <figcaption className="review__by">
              <span className="review__avatar" aria-hidden="true">{initials(r.name)}</span>
              <span>
                <strong>{r.name}</strong>
                <span className="review__meta">{r.role} · {r.source}, {r.year}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </ReviewScroller>
      <p className="note mt-14">
        Read every review, good and bad, on <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener">Google</a> and{" "}
        <a href={SCHOOLMYKIDS_URL} target="_blank" rel="noopener">SchoolMyKids</a>.
      </p>
    </>
  );
}
