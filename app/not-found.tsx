import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero not-found">
      <div className="wrap">
        <div className="crumbs"><Link href="/">Home</Link> / Page not found</div>
        <h1>This page has moved or never existed.</h1>
        <p>Try the home page, or reach the school office directly.</p>
        <div className="cta-actions" style={{ marginTop: 28 }}>
          <Link className="btn btn--gold" href="/">Back to home</Link>
          <Link className="btn btn--ghost" href="/contact">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
