import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SCHOOL } from "@/lib/site";
import { OPEN_GRAPH, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mandatory Public Disclosure",
  description: "CBSE mandatory public disclosure for Shatabdi Public School, Gaya Ji (Affiliation No. 330113, School Code 65109).",
  alternates: { canonical: "/public-disclosure" }, openGraph: { ...OPEN_GRAPH, url: "/public-disclosure", images: [ogImage("public-disclosure", "Mandatory public disclosure, Shatabdi Public School, Gaya Ji")] },
};

// Values not published online are marked so the school office can fill them in.
const ASK = "Available at the school office";

function Table({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <div className="table-wrap">
      <table>
        <tbody>
          {rows.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default function PublicDisclosure() {
  return (
    <LegalPage
      path="/public-disclosure"
      image={{ src: "/images/campus-name-facade.webp", alt: "The school building with Shatabdi Public School, Gaya Ji written on its facade", position: "70% center" }}
      crumb="Public Disclosure"
      title="Mandatory Public Disclosure"
      updated="4 November 2026"
      intro={<p>Information published in line with the CBSE requirement for affiliated schools. The affiliation details can be checked on the <a href={SCHOOL.cbseRecord} target="_blank" rel="noopener">CBSE SARAS portal</a>.</p>}
      sections={[
        {
          id: "general", title: "A. General information",
          body: (
            <Table rows={[
              ["Name of the school", "Shatabdi Public School"],
              ["Affiliation No.", "330113"],
              ["School code", "65109"],
              ["Complete address", "Katari Hill Road, Aliganj, Gaya Ji, Bihar 823001"],
              ["Principal", "Mr. Saquib Zarar (M.B.A., B.Ed.)"],
              ["School email", <span key="e"><a href={`mailto:${SCHOOL.emailBackup}`}>{SCHOOL.emailBackup}</a> · <a href={`mailto:${SCHOOL.email}`}>{SCHOOL.email}</a></span>],
              ["Contact numbers", `${SCHOOL.phoneLabel} (Principal's office) · ${SCHOOL.principalMobileLabel} · ${SCHOOL.mobileLabel} (Reception) · ${SCHOOL.whatsappLabel} (WhatsApp & call)`],
            ]} />
          ),
        },
        {
          id: "documents", title: "B. Documents & information",
          body: (
            <Table rows={[
              ["Affiliation status", "Senior Secondary · Affiliated 01 April 2025 to 31 March 2030"],
              ["Managing society", "Shatabdi Foundation, Gaya Ji"],
              ["Society registration", "Registered under the Societies Registration Act, 1860 · Reg. No. 495/2000-01"],
              ["Year of establishment", "2000 (Inaugurated 26 October 2000)"],
              ["Minority status", "Declared a Minority Educational Institution under Section 2(g) of the NCMEI Act, 2004 · National Commission for Minority Educational Institutions, New Delhi · Case No. 717 of 2011, order dated 22 December 2011"],
              ["Minority certificate", <a key="m" href={SCHOOL.minorityCertificate} target="_blank" rel="noopener">View certificate (PDF, opens in a new tab)</a>],
              ["Secondary affiliation", "2005"],
              ["Senior Secondary upgrade", "2007"],
              ["NOC, recognition, building safety, fire safety and sanitary certificates", ASK],
            ]} />
          ),
        },
        {
          id: "results", title: "C. Results & academics",
          body: (
            <Table rows={[
              ["Board", "Central Board of Secondary Education (CBSE), New Delhi"],
              ["Medium of instruction", "English"],
              ["Classes offered", "Prep-I and Prep-II, Class I to XII"],
              ["Streams (XI–XII)", "Science (with or without Mathematics), Commerce"],
              ["Academic session", "April to March"],
              ["Fee structure", <a key="f" href={SCHOOL.feeStructure} target="_blank" rel="noopener">View fee structure 2026–27 (PDF, opens in a new tab)</a>],
              ["Annual academic calendar", ASK],
              ["Class X and XII board results (last three years)", ASK],
            ]} />
          ),
        },
        {
          id: "staff", title: "D. Staff",
          body: (
            <Table rows={[
              ["Principal", "Mr. Saquib Zarar"],
              ["Total number of teachers", "50"],
              ["Non-teaching staff", "20"],
              ["Student–teacher ratio", "20 : 1 (about 1,000 students, 50 teachers)"],
              ["Teacher–section ratio", ASK],
              ["Details of special educator and counsellor", ASK],
            ]} />
          ),
        },
        {
          id: "infrastructure", title: "E. School infrastructure",
          body: (
            <Table rows={[
              ["Total campus area", "About 10,509 sq m (2.58 acres)"],
              ["Playground area", "About 3,759 sq m"],
              ["Buildings", "Ali Bhawan, Taiyab Bhawan, Azad Bhawan, Iqbal Bhawan, Ibne Sina Lab"],
              ["Number of classrooms", "65"],
              ["Number of laboratories", "7, including Physics, Chemistry, Biology, Mathematics and Computer Science"],
              ["Library", "Computerised, with more than 20,000 books"],
              ["Internet facility", "Yes, Wi-Fi in the computer lab block"],
              ["Number of girls' and boys' toilets", ASK],
              ["CCTV and security", "Fenced campus with boundary wall and security staff"],
            ]} />
          ),
        },
      ]}
    />
  );
}
