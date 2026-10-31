// Opening screen with the school crest, shown once per visit.
// Server-rendered so it covers the page from the first paint. All of its state lives in classes on
// <html> (set by the head script in layout.tsx and the inline script below), never on these elements,
// so React hydration never sees a mismatch.
//   intro-seen: skip it (already shown this visit, reduced motion, or no storage)
//   intro-done: fade it out          intro-gone: remove it
// Timed from when the screen first appears: it hides once the page has loaded, after at least 1.6 s
// so the animation reads, and never later than 2.8 s. A CSS fallback in globals.css hides it at 4 s
// even if this script never runs.
const dismissScript = `(function(){var d=document.documentElement;if(d.classList.contains("intro-seen"))return;var t0=performance.now(),done=false;function hide(){if(done)return;done=true;d.classList.add("intro-done");setTimeout(function(){d.classList.add("intro-gone")},700)}function ready(){setTimeout(hide,Math.max(0,1600-(performance.now()-t0)))}if(document.readyState==="complete")ready();else addEventListener("load",ready);setTimeout(hide,2800)})()`;

export default function Preloader() {
  return (
    <>
      <div className="preloader" aria-hidden="true">
        <div className="preloader__inner">
          <div className="preloader__mark">
            <span className="preloader__ring" />
            <span className="preloader__ring preloader__ring--inner" />
            <span className="preloader__logo"><img src="/logo-dark-md.webp" alt="" width={84} height={84} /></span>
          </div>
          <div className="preloader__name">Shatabdi</div>
          <div className="preloader__sub">Public School &middot; Gaya</div>
          <div className="preloader__tag">CBSE &middot; Since 2000</div>
          <div className="preloader__bar"><i /></div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: dismissScript }} />
    </>
  );
}
