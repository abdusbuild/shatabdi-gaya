import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { SCHOOL } from "@/lib/site";
import { OPEN_GRAPH, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms of use for the Shatabdi Public School, Gaya Ji website.",
  alternates: { canonical: "/terms-and-conditions" }, openGraph: { ...OPEN_GRAPH, url: "/terms-and-conditions", images: [ogImage("terms-and-conditions", "Terms and conditions, Shatabdi Public School, Gaya Ji")] },
};

export default function Terms() {
  return (
    <LegalPage
      path="/terms-and-conditions"
      image={{ src: "/images/campus-building-side.webp", alt: "Side view of the multi-storey classroom block" }}
      crumb="Terms & Conditions"
      title="Terms & Conditions"
      updated="30 October 2026"
      intro={<p>These terms apply to your use of the Shatabdi Public School, Gaya Ji website. By using this website you agree to them.</p>}
      sections={[
        {
          id: "acceptance", title: "1. Acceptance of terms",
          body: <p>If you do not agree with these terms, please do not use this website. The School may update these terms at any time, and continued use of the website means you accept the updated terms.</p>,
        },
        {
          id: "use", title: "2. Use of this website",
          body: <p>You may use this website to learn about the School and to contact us. You must not misuse it, attempt to disrupt it, or use its content for unlawful purposes.</p>,
        },
        {
          id: "accuracy", title: "3. Accuracy of information",
          body: <p>We try to keep the information on this website accurate and up to date. Details such as dates, fees, subjects and facilities may change. The School office&rsquo;s written communication and CBSE records take precedence over this website.</p>,
        },
        {
          id: "admissions", title: "4. Admissions & fees",
          body: <p>An enquiry through this website does not reserve a seat. Admission depends on the School&rsquo;s admission process, including the entrance test, interview and submission of documents, and is confirmed only when fees are deposited within the stated time. The current fee structure is available from the School office. See the <Link href="/admissions">Admissions page</Link>.</p>,
        },
        {
          id: "ip", title: "5. Intellectual property",
          body: <p>The School&rsquo;s name, crest, photographs and text on this website belong to Shatabdi Public School and the Shatabdi Foundation. They may not be copied or reused for commercial purposes without written permission.</p>,
        },
        {
          id: "submissions", title: "6. Content you submit",
          body: <p>Information you send us must be true and must belong to you or be shared with the permission of the person concerned. Please do not send documents such as certificates by email unless the office asks for them.</p>,
        },
        {
          id: "links", title: "7. Third-party links",
          body: <p>This website links to other services, including CBSE, Google, YouTube, Facebook, Instagram and WhatsApp. The School is not responsible for their content or practices. Reviews quoted on this website are the opinions of their authors.</p>,
        },
        {
          id: "liability", title: "8. Limitation of liability",
          body: <p>This website is provided for information. The School is not liable for any loss arising from the use of, or inability to use, this website or the information on it.</p>,
        },
        {
          id: "law", title: "9. Governing law",
          body: <p>These terms are governed by the laws of India. Any disputes are subject to the jurisdiction of the courts at Gaya Ji, Bihar.</p>,
        },
        {
          id: "changes", title: "10. Changes to these terms",
          body: <p>The date at the top of this page shows when these terms were last updated.</p>,
        },
        {
          id: "contact", title: "11. Contact us",
          body: <p>Questions about these terms can be sent to <a href={`mailto:${SCHOOL.email}`}>{SCHOOL.email}</a>. See also our <Link href="/privacy-policy">Privacy Policy</Link>.</p>,
        },
      ]}
    />
  );
}
