import type { Metadata } from "next";
import EnquiryForm, { NameInput, PhoneInput } from "@/components/EnquiryForm";
import { Faq, PageHero, Photo, SectionHead } from "@/components/ui";
import { SCHOOL } from "@/lib/site";
import { OPEN_GRAPH, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Admissions",
  description: "Admission process, entrance test, required documents, 2026–27 fee structure and enquiry form for Shatabdi Public School, Gaya Ji.",
  alternates: { canonical: "/admissions" }, openGraph: { ...OPEN_GRAPH, url: "/admissions", images: [ogImage("admissions", "Admissions at Shatabdi Public School, Gaya Ji")] },
};

const steps = [
  ["Collect & submit the form", "Get the admission form (and the transport form, if needed) from the school office and submit it with the registration fee."],
  ["Entrance test", "A 50-mark written test in English, Mathematics, Science and General Knowledge, based on the previous class syllabus."],
  ["Interview", "Shortlisted students and their parents meet the school for an interaction. Candidates need at least 40% in English, Maths, Science and Hindi in their last examination."],
  ["Confirm admission", "Deposit the fees within 10 days of the test result being declared, or the seat may be offered to another candidate."],
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

// From the signed fee structure for 2026–27 (public/documents/Fees-Structure-2026-27.pdf).
// Existing students pay tuition and development only; new admissions also pay registration and admission.
const REGISTRATION_FEE = 550;
const fees = [
  { label: "Std I & II", admission: 5000, tuition: 1500, development: 3200 },
  { label: "Std III to V", admission: 5000, tuition: 1600, development: 3200 },
  { label: "Std VI & VII", admission: 5800, tuition: 1800, development: 3200 },
  { label: "Std VIII", admission: 8000, tuition: 1900, development: 3200 },
  { label: "Std IX & X", admission: 13500, tuition: 2200, development: 3200 },
  { label: "Std XI & XII (Science)", admission: 14000, tuition: 2500, development: 4700 },
];
const rupees = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

const classes = ["PP-1", "PP-2", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "XI – Science", "XI – Commerce"];

export default function Admissions() {
  return (
    <>
      <PageHero crumb="Admissions" path="/admissions" title="Admissions" image={{ src: "/images/excursion-group-gate.webp", alt: "Students in school uniform lined up at a gate during a study tour" }}>
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

      <section id="fees">
        <div className="wrap">
          <SectionHead title="Fee structure 2026–27">Fees for each class, for new admissions and existing students. All amounts are in rupees.</SectionHead>
          <div className="table-wrap reveal">
            <table className="fee-table" aria-label="Fee structure for 2026–27 by class">
              <thead>
                <tr>
                  <th scope="col">Class</th>
                  <th scope="col">Registration <small>New admissions only</small></th>
                  <th scope="col">Admission <small>New admissions only</small></th>
                  <th scope="col">Tuition <small>Per month</small></th>
                  <th scope="col">Development</th>
                  <th scope="col">Total <small>New admission</small></th>
                  <th scope="col">Total <small>Existing student</small></th>
                </tr>
              </thead>
              <tbody>
                {fees.map(({ label, admission, tuition, development }) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td data-label="Registration (new admissions only)">{rupees(REGISTRATION_FEE)}</td>
                    <td data-label="Admission (new admissions only)">{rupees(admission)}</td>
                    <td data-label="Tuition per month">{rupees(tuition)}</td>
                    <td data-label="Development">{rupees(development)}</td>
                    <td className="fee-table__total fee-table__total--new" data-label="Total, new admission">{rupees(REGISTRATION_FEE + admission + tuition + development)}</td>
                    <td className="fee-table__total" data-label="Total, existing student">{rupees(tuition + development)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="checklist reveal">
            <li>Each total includes one month&rsquo;s tuition. Examination fees are charged separately.</li>
            <li>Examination fee for Std I to X: {rupees(750)} (June, September, November and February).</li>
            <li>Examination fee for Std XI &amp; XII (Science): {rupees(2000)} (September and January).</li>
            <li>For PP-1, PP-2 and Commerce fees, please ask the school office.</li>
          </ul>
          <a className="btn btn--navy fee-download reveal" href={SCHOOL.feeStructure} target="_blank" rel="noopener">View the signed fee structure (PDF)</a>
          <div className="cols mt-lg">
            <article className="col reveal"><span className="col__tag">Session</span><h3>April – March</h3><p>The academic year begins in April. Summer vacation runs from mid-May to mid-June.</p></article>
            <article className="col reveal"><span className="col__tag">Fee deadline</span><h3>Within 10 days</h3><p>Deposit the fees within 10 days of the entrance test result being declared, or the seat may be offered to another candidate.</p></article>
            <article className="col reveal"><span className="col__tag">Admission desk</span><h3>Call reception</h3><p>For admission queries, call reception on <a href={`tel:+${SCHOOL.mobile}`} className="link-gold">{SCHOOL.mobileLabel}</a>, call or WhatsApp <a href={`tel:+${SCHOOL.whatsapp}`} className="link-gold">{SCHOOL.whatsappLabel}</a>, or the Principal&rsquo;s office on <a href={`tel:${SCHOOL.phone}`} className="link-gold">{SCHOOL.phoneLabel}</a>.</p></article>
          </div>
        </div>
      </section>

      <section className="section--alt" id="enquiry">
        <div className="wrap split split--top">
          <div className="reveal">
            <h2 className="h2-md">Start an admission enquiry</h2>
            <p className="muted">Fill in the details and press Send. WhatsApp will open with your enquiry addressed to the school office on <strong>{SCHOOL.whatsappLabel}</strong>, ready to send. You can also visit the school office on Katari Hill Road.</p>
            <Photo className="contact-photo" label="Pre-primary pupils performing on stage at Foundation Day" src="/images/fd26-little-ones.webp" caption={false} sizes="(max-width: 900px) 100vw, 520px" />
          </div>
          <EnquiryForm subject="Admission enquiry from website" submitLabel="Send on WhatsApp" via="whatsapp">
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
              ["When must the fees be paid?", "Fees must be deposited within 10 days of the entrance test result."],
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
