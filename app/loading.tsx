// Skeleton shown while the next page loads: a title band, then a row of cards.
export default function Loading() {
  return (
    <div className="sk-page" role="status" aria-live="polite">
      <span className="sr-only">Loading page…</span>
      <section className="page-hero" aria-hidden="true">
        <div className="wrap">
          <div className="sk sk--crumb" />
          <div className="sk sk--title" />
          <div className="sk sk--line" />
          <div className="sk sk--line sk--short" />
        </div>
      </section>
      <section aria-hidden="true">
        <div className="wrap">
          <div className="sk sk--heading" />
          <div className="grid grid-3">
            {[0, 1, 2].map((i) => (
              <div className="card" key={i}>
                <div className="sk sk--icon" />
                <div className="sk sk--card-title" />
                <div className="sk sk--line" />
                <div className="sk sk--line" />
                <div className="sk sk--line sk--short" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
