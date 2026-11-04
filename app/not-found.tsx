import type { Metadata } from "next";
import Link from "next/link";
import { SCHOOL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page could not be found on the Shatabdi Public School website.",
};

const links = [
  { href: "/admissions", label: "Admissions" },
  { href: "/admissions#fees", label: "Fee structure" },
  { href: "/academics", label: "Academics" },
  { href: "/campus", label: "Campus & school life" },
  { href: "/about", label: "About the school" },
  { href: "/public-disclosure", label: "Public disclosure" },
];

export default function NotFound() {
  return (
    <section className="page-hero not-found">
      <div className="wrap">
        <div className="crumbs"><Link href="/">Home</Link> / Page not found</div>
        <p className="not-found__code" aria-hidden="true">404</p>
        <h1>We couldn&rsquo;t find that page</h1>
        <p>The link may be old or mistyped. Try one of the pages below, or call the school office on <a href={`tel:${SCHOOL.phone}`}>{SCHOOL.phoneLabel}</a>.</p>
        <div className="cta-actions not-found__actions">
          <Link className="btn btn--gold" href="/">Back to home</Link>
          <Link className="btn btn--ghost" href="/contact">Contact us</Link>
        </div>
        <nav aria-label="Popular pages">
          <ul className="not-found__links">
            {links.map((l) => (
              <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
