import type { Metadata } from "next";
import EnquiryForm, { NameInput, PhoneInput } from "@/components/EnquiryForm";
import { Facebook, Mail, Phone, Pin } from "@/components/Icons";
import { ContactArt, MessageArt } from "@/components/HeroArt";
import { PageHero } from "@/components/ui";
import { SCHOOL } from "@/lib/site";
import { SkeletonFrame } from "@/components/Skeleton";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Address, phone numbers, email and map for Shatabdi Public School, Katari Hill Road, Gaya, Bihar 823001.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHero crumb="Contact" title="Contact us" art={<ContactArt />}>
        We would be glad to hear from you. Call, write, or visit us on Katari Hill Road.
      </PageHero>

      <section>
        <div className="wrap split split--top">
          <div className="card reveal">
            <div className="contact-item">
              <div className="card__icon"><Pin /></div>
              <div><h4>Address</h4>Shatabdi Public School<br />Katari Hill Road, Aliganj<br />Gaya, Bihar 823001<br /><span className="muted">About 3 km west of Gaya Railway Junction</span></div>
            </div>
            <div className="contact-item">
              <div className="card__icon"><Phone /></div>
              <div>
                <h4>Phone</h4>
                Principal&rsquo;s office: <a href={`tel:${SCHOOL.phone}`}>{SCHOOL.phoneLabel}</a> · <a href={`tel:${SCHOOL.principalMobile}`}>{SCHOOL.principalMobileLabel}</a><br />
                Reception: <a href={`tel:+${SCHOOL.mobile}`}>{SCHOOL.mobileLabel}</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="card__icon"><Mail /></div>
              <div><h4>Email</h4><a href={`mailto:${SCHOOL.email}`}>{SCHOOL.email}</a></div>
            </div>
            <div className="contact-item">
              <div className="card__icon"><Facebook /></div>
              <div>
                <h4>Social</h4>
                <a href={SCHOOL.facebook} target="_blank" rel="noopener">Facebook</a> ·{" "}
                <a href={SCHOOL.instagram} target="_blank" rel="noopener">Instagram</a> ·{" "}
                <a href={SCHOOL.youtube} target="_blank" rel="noopener">YouTube</a>
              </div>
            </div>
          </div>
          <SkeletonFrame
            className="map reveal"
            title="Map showing Shatabdi Public School, Gaya"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=Shatabdi%20Public%20School%2C%20Katari%20Hill%20Road%2C%20Gaya%2C%20Bihar&z=15&output=embed"
          />
        </div>
      </section>

      <section className="section--alt">
        <div className="wrap split split--top">
          <div className="reveal">
            <h2 className="h2-md">Send a message</h2>
            <p className="muted">Press Send and your email app will open with the message addressed to the school office.</p>
            <div className="contact-art"><MessageArt /></div>
          </div>
          <EnquiryForm subject="Message from website" submitLabel="Send message">
            <div className="form-row">
              <label>Your name<NameInput name="Name" required /></label>
              <label>Phone<PhoneInput name="Phone" /></label>
            </div>
            <label>Email<input name="Email" type="email" autoComplete="email" /></label>
            <label>Message<textarea name="Message" rows={5} required /></label>
          </EnquiryForm>
        </div>
      </section>
    </>
  );
}
