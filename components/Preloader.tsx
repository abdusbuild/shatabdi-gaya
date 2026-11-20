// Opening screen with the school crest, shown once per visit and only when the visit starts on the
// home page (decided by the head script in layout.tsx).
// Server-rendered so it covers the page from the first paint. All of its state lives in classes on
// <html> (set by the head script in layout.tsx and the inline script below), never on these elements,
// so React hydration never sees a mismatch.
//   intro-seen: skip it (already shown this visit, reduced motion, or no storage)
//   intro-done: fade it out          intro-gone: remove it
// Kept short so it never holds up the page: it hides once the page has loaded, after at least 0.7 s,
// and never later than 1.2 s. A CSS fallback in globals.css hides it at 2 s even if this script
// never runs. It ignores taps, so nothing behind it is blocked while it fades.
const dismissScript = `(function(){var d=document.documentElement;if(d.classList.contains("intro-seen"))return;var t0=performance.now(),done=false;function hide(){if(done)return;done=true;d.classList.add("intro-done");setTimeout(function(){d.classList.add("intro-gone")},700)}function ready(){setTimeout(hide,Math.max(0,700-(performance.now()-t0)))}if(document.readyState==="complete")ready();else addEventListener("load",ready);setTimeout(hide,1200)})()`;

export default function Preloader() {
  return (
    <>
      <div className="preloader" aria-hidden="true">
        <div className="preloader__inner">
          <div className="preloader__mark">
            <span className="preloader__ring" />
            <span className="preloader__ring preloader__ring--inner" />
            <span className="preloader__logo"><img src="/logo-lg.webp" alt="" width={164} height={193} /></span>
          </div>
          <div className="preloader__name">Shatabdi</div>
          <div className="preloader__sub">Public School &middot; Gaya Ji</div>
          <div className="preloader__tag">CBSE &middot; Since 2000</div>
          <div className="preloader__bar"><i /></div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: dismissScript }} />
    </>
  );
}
