import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { SCHOOL } from "@/lib/site";
import { OPEN_GRAPH, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Shatabdi Public School, Gaya Ji collects, uses and protects information shared through this website.",
  alternates: { canonical: "/privacy-policy" }, openGraph: { ...OPEN_GRAPH, url: "/privacy-policy", images: [ogImage("privacy-policy", "Privacy policy, Shatabdi Public School, Gaya Ji")] },
};

export default function PrivacyPolicy() {
  return (
    <LegalPage
      path="/privacy-policy"
      image={{ src: "/images/campus-stair-tower.webp", alt: "The stair tower of the classroom block" }}
      crumb="Privacy Policy"
      title="Privacy Policy"
      // TODO(client): set to the date the reviewed policy is published
      updated="21 November 2026"
      intro={<p>Shatabdi Public School, Gaya Ji (&ldquo;the School&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), run by the Shatabdi Foundation, respects the privacy of parents, students and visitors. This policy explains what information this website handles and how it is used.</p>}
      sections={[
        {
          id: "overview", title: "1. Overview",
          body: <p>This website gives information about the School, its academics, campus and admissions. You can browse every page without telling us who you are. We only receive personal information when you choose to contact us.</p>,
        },
        {
          id: "collect", title: "2. Information we collect",
          body: (
            <>
              {/* TODO(client): review this paragraph (new with the enquiry record, Nov 2026) */}
              <p>When you use the admission enquiry or contact form, the details you type (such as a parent&rsquo;s name, phone number, email address, the student&rsquo;s name, the class sought and your message) are placed into a WhatsApp message or an email in your own app, which you then choose to send to the School. At the same moment, a copy of the same details is sent securely to the School and saved in the School&rsquo;s Google account (a Google Sheet and an email to the office), so that we can reply even if the message is never sent from your app.</p>
              <p>If you call, WhatsApp or email the School directly, we receive the details you share in that conversation.</p>
            </>
          ),
        },
        {
          id: "use", title: "3. How we use this information",
          body: (
            <ul>
              <li>To respond to admission enquiries and general questions.</li>
              <li>To arrange campus visits, entrance tests and interviews.</li>
              <li>To share information you have asked for, such as fees, transport or documents.</li>
            </ul>
          ),
        },
        {
          id: "children", title: "4. Children's data",
          body: <p>Enquiries about a child should be made by a parent or guardian. We use a child&rsquo;s details only for the admission process. Photos of students that appear on this website are from school events published on the School&rsquo;s official channels. To have a photo removed, contact the office.</p>,
        },
        {
          id: "cookies", title: "5. Cookies & local storage",
          // TODO(client): review this section (analytics added, Nov 2026)
          body: <p>This website does not use advertising or tracking cookies. It counts visits with Cloudflare Web Analytics, which does not use cookies or store anything in your browser; it records anonymous information such as the page viewed, the referring site, the type of browser and device, the country and how fast the page loaded. The site stores one setting in your browser&rsquo;s local storage, your choice of light or dark theme, so the site looks the same on your next visit, and two short-lived notes for the current visit only, so the opening screen and the enquiry pop-up are not shown twice. You can clear these at any time from your browser settings.</p>,
        },
        {
          id: "third-party", title: "6. Third-party services",
          // TODO(client): review this section (Cloudflare and Google Workspace added, Nov 2026)
          body: <p>Some pages embed content from Google Maps and YouTube (shown in privacy-enhanced mode). These services may set their own cookies when you interact with them, under their own privacy policies. Visit statistics are processed by Cloudflare, and copies of enquiries are stored with Google in the School&rsquo;s own account, each under its own privacy policy. Links to Facebook, Instagram, YouTube, WhatsApp and Google reviews take you to those services.</p>,
        },
        {
          id: "security", title: "7. Data storage & security",
          // TODO(client): review this section (enquiry sheet added, Nov 2026)
          body: <p>Admission records and the copies of website enquiries are held by the School office, in the School&rsquo;s own accounts, and are accessible only to authorised staff. We take reasonable care to protect the information parents share with us.</p>,
        },
        {
          id: "retention", title: "8. Data retention",
          // TODO(client): confirm how long website enquiries are kept before deletion
          body: <p>Enquiry emails and saved website enquiries are kept for as long as needed to handle the enquiry and the admission session it relates to. Records of admitted students are kept as required by CBSE and applicable law.</p>,
        },
        {
          id: "rights", title: "9. Your rights & grievances",
          body: <p>You may ask to see, correct or delete the personal information you have shared with us, subject to records the School must keep by law. Write to the Principal at <a href={`mailto:${SCHOOL.email}`}>{SCHOOL.email}</a> or call the Principal&rsquo;s office on <a href={`tel:${SCHOOL.phone}`}>{SCHOOL.phoneLabel}</a>.</p>,
        },
        {
          id: "changes", title: "10. Changes to this policy",
          body: <p>We may update this policy from time to time. The date at the top of this page shows when it was last changed.</p>,
        },
        {
          id: "contact", title: "11. Contact us",
          body: <p>Shatabdi Public School, {SCHOOL.address}. Email <a href={`mailto:${SCHOOL.email}`}>{SCHOOL.email}</a>. See also our <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>.</p>,
        },
      ]}
    />
  );
}
