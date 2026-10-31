import type { Metadata } from "next";
import EnquiryForm, { NameInput, PhoneInput } from "@/components/EnquiryForm";
import { AdmissionsArt } from "@/components/HeroArt";
import { Faq, PageHero, Photo, SectionHead } from "@/components/ui";
import { SCHOOL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admissions",
  description: "Admission process, entrance test, required documents and enquiry form for Shatabdi Public School, Gaya.",
  alternates: { canonical: "/admissions" },
};

const steps = [
  ["Collect & submit the form", "Get the admission form (and the transport form, if needed) from the school office and submit it with the registration fee."],
  ["Entrance test", "A 50-mark written test in English, Mathematics, Science and General Knowledge, based on the previous class syllabus."],
  ["Interview", "Shortlisted students and their parents meet the school for an interaction. Candidates need at least 40% in English, Maths, Science and Hindi in their last examination."],
  ["Confirm admission", "Deposit the fees within 15 days of the test result being declared, or the seat may be offered to another candidate."],
];

const documents = [
  "Completed admission form (and transport form, if needed)",
  "3 photographs of the child with both parents",
  "3 passport-size photographs of the child",
  "Photocopy of the last examination mark sheet",
  "Original birth certificate",
  "Original transfer certificate (TC) from the previous school",
  "Proof of residence",
  "Proof of parents' occupation",
];

const classes = ["PP-1", "PP-2", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "XI – Science", "XI – Commerce"];

export default function Admissions() {
  return (
    <>
      <PageHero crumb="Admissions" title="Admissions" art={<AdmissionsArt />}>
        Admission is open to every child, regardless of caste, creed or religion. Here is how to join Shatabdi.
      </PageHero>

      <section>
        <div className="wrap split split--top">
          <div className="reveal">
            <h2 className="h2-md">Admission process</h2>
            <p className="muted">Admissions for Std I to IX usually open in December for the session that begins in April. Pre-primary admissions (PP-1, PP-2) need a minimum age of 4 years.</p>
          </div>
          <div className="steps reveal">
            {steps.map(([title, text]) => (
              <div className="step" key={title}><div><h3>{title}</h3><p>{text}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section--alt" id="documents">
        <div className="wrap split split--top">
          <div className="reveal">
            <h2 className="h2-md">Documents required</h2>
            <p className="muted">Please bring these at the time of admission.</p>
          </div>
          <div className="card reveal">
            <ul className="checklist mt-0">{documents.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
        </div>
        <div className="wrap mt-lg">
          <Photo src="/images/fd26-student-speakers.webp" label="Students presenting at a school programme" className="reveal ph--tall ph--top" />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="cols">
            <article className="col reveal"><span className="col__tag">Session</span><h3>April – March</h3><p>The academic year begins in April. Summer vacation runs from mid-May to mid-June.</p></article>
            <article className="col reveal"><span className="col__tag">Fees</span><h3>Ask the office</h3><p>Fees vary by class and include registration, admission, tuition, term and development charges. The office can give you the current fee structure.</p></article>
            <article className="col reveal"><span className="col__tag">Admission desk</span><h3>Call reception</h3><p>For admission queries, call reception on <a href={`tel:+${SCHOOL.mobile}`} className="link-gold">{SCHOOL.mobileLabel}</a> or the Principal&rsquo;s office on <a href={`tel:${SCHOOL.phone}`} className="link-gold">{SCHOOL.phoneLabel}</a>.</p></article>
          </div>
        </div>
      </section>

      <section className="section--alt" id="enquiry">
        <div className="wrap split split--top">
          <div className="reveal">
            <h2 className="h2-md">Start an admission enquiry</h2>
            <p className="muted">Fill in the details and press Send. Your email app will open with a message to <strong>{SCHOOL.email}</strong>, ready to send. You can also visit the school office on Katari Hill Road.</p>
          </div>
          <EnquiryForm subject="Admission enquiry from website" submitLabel="Send enquiry">
            <div className="form-row">
              <label>Parent&rsquo;s name<NameInput name="Parent name" required /></label>
              <label>Phone<PhoneInput name="Phone" required /></label>
            </div>
            <div className="form-row">
              <label>Student&rsquo;s name<NameInput name="Student name" required autoComplete="off" /></label>
              <label>Class sought
                <select name="Class sought" required defaultValue="">
                  <option value="" disabled>Select class</option>
                  {classes.map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>
            </div>
            <label>Email<input name="Email" type="email" autoComplete="email" /></label>
            <label>Message<textarea name="Message" rows={4} placeholder="Any questions about admission, transport or fees" /></label>
          </EnquiryForm>
        </div>
      </section>

      <section id="faq">
        <div className="wrap">
          <Faq
            title="Admission FAQs"
            intro="The questions parents ask us most often about joining Shatabdi."
            items={[
              ["What is the minimum age for admission?", "Children must be at least 4 years old for entry to pre-primary."],
              ["Is there an entrance test for every class?", "Admission to Std I to IX is through a 50-mark entrance test and an interview. For pre-primary and Class XI, please check the process with the office."],
              ["When must the fees be paid?", "Fees must be deposited within 15 days of the entrance test result."],
              ["Does the school have a hostel?", "Taiyab Bhawan houses a hostel for boys coming from remote areas. Please contact the office for availability."],
              ["Are scholarships available?", "Yes. Merit-cum-poverty scholarships are awarded, and the Shatabdi Foundation supports deserving students from its free school with fees, books and uniforms."],
              ["Which languages are taught?", "English is the medium of instruction. Hindi and Urdu are offered as languages."],
            ]}
          />
        </div>
      </section>
    </>
  );
}
