// Shared header, footer and interactions for every page.
(function () {
  const SCHOOL = {
    phone: "+916312226652",
    phoneLabel: "0631-2226652",
    phone2Label: "0631-2220344",
    mobile: "919471965381",
    mobileLabel: "+91 94719 65381",
    email: "shatabdi.public@gmail.com",
    facebook: "https://www.facebook.com/spsgayaofficial/",
    address: "Katari Hill Road, Aliganj, Gaya, Bihar 823001",
  };

  const icons = {
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    sun: '<svg class="theme-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg class="theme-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3ZM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8V6c0-.9.6-1 1-1h3V1h-4c-4 0-5 3-5 5v2H6v4h3v11h5V12h3.5l.5-4Z"/></svg>',
  };

  const pages = [
    ["index.html", "Home"],
    ["about.html", "About"],
    ["academics.html", "Academics"],
    ["campus.html", "Campus & Life"],
    ["admissions.html", "Admissions"],
    ["contact.html", "Contact"],
  ];
  const current = location.pathname.split("/").pop() || "index.html";
  const navLinks = pages
    .map(([href, label]) => `<li><a href="${href}"${href === current ? ' class="is-active" aria-current="page"' : ""}>${label}</a></li>`)
    .join("");
  const mobileLinks = pages
    .map(([href, label]) => `<a href="${href}"${href === current ? ' class="is-active"' : ""}>${label}<span>→</span></a>`)
    .join("");

  const header = `
    <a class="skip-link" href="#main">Skip to main content</a>
    <div class="topbar"><div class="wrap">
      <p class="m-0" style="margin:0"><span class="pulse"></span>Admissions open for the new session · Std I – IX entrance test in December</p>
      <div class="topbar__links">
        <a href="tel:${SCHOOL.phone}">${icons.phone}<span>${SCHOOL.phoneLabel}</span></a>
        <a href="mailto:${SCHOOL.email}">${icons.mail}<span>${SCHOOL.email}</span></a>
      </div>
    </div></div>
    <header class="nav"><div class="wrap">
      <a class="brand" href="index.html">
        <img src="assets/img/logo.svg" alt="" width="58" height="58">
        <span><span class="brand__name">Shatabdi Public School</span><span class="brand__tag">Gaya · CBSE 330113 · Est. 2000</span></span>
      </a>
      <nav aria-label="Main"><ul class="nav__menu">${navLinks}</ul></nav>
      <div class="nav__actions">
        <button class="icon-btn js-theme" type="button" aria-label="Toggle colour theme">${icons.sun}${icons.moon}</button>
        <a class="btn btn--gold btn--sm" href="admissions.html#enquiry">Apply Now</a>
        <button class="icon-btn burger js-burger" type="button" aria-label="Open menu" aria-expanded="false">${icons.menu}</button>
      </div>
    </div></header>
    <div class="mobile-menu" id="mobile-menu">${mobileLinks}<a class="btn btn--gold" href="admissions.html#enquiry">Apply Now</a></div>`;

  const year = new Date().getFullYear();
  const footer = `
    <footer class="footer"><div class="wrap">
      <div class="footer__grid">
        <div>
          <a class="brand" href="index.html"><img src="assets/img/logo.svg" alt="" width="58" height="58">
            <span><span class="brand__name">Shatabdi Public School</span><span class="brand__tag">Gaya, Bihar</span></span></a>
          <p style="margin-top:18px">An English-medium, co-educational senior secondary school affiliated to CBSE, New Delhi, run by the Shatabdi Foundation since 2000.</p>
          <div class="socials">
            <a href="${SCHOOL.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icons.facebook}</a>
            <a href="https://wa.me/${SCHOOL.mobile}" target="_blank" rel="noopener" aria-label="WhatsApp">${icons.whatsapp}</a>
            <a href="mailto:${SCHOOL.email}" aria-label="Email">${icons.mail}</a>
          </div>
        </div>
        <div><h4>Explore</h4><ul>
          <li><a href="about.html">About the school</a></li>
          <li><a href="academics.html">Academics</a></li>
          <li><a href="campus.html">Campus &amp; school life</a></li>
          <li><a href="about.html#leadership">Leadership</a></li>
        </ul></div>
        <div><h4>For parents</h4><ul>
          <li><a href="admissions.html">Admission process</a></li>
          <li><a href="admissions.html#documents">Documents required</a></li>
          <li><a href="admissions.html#faq">FAQs</a></li>
          <li><a href="https://saras.cbse.gov.in/SARAS/AffiliatedList/AfflicationDetails/330113" target="_blank" rel="noopener">CBSE affiliation record</a></li>
        </ul></div>
        <div><h4>Reach us</h4><ul>
          <li>${SCHOOL.address}</li>
          <li><a href="tel:${SCHOOL.phone}">${SCHOOL.phoneLabel}</a> · ${SCHOOL.phone2Label}</li>
          <li><a href="tel:+${SCHOOL.mobile}">${SCHOOL.mobileLabel}</a></li>
          <li><a href="mailto:${SCHOOL.email}">${SCHOOL.email}</a></li>
        </ul></div>
      </div>
      <div class="footer__bottom">
        <span>© ${year} Shatabdi Public School, Gaya · A unit of Shatabdi Foundation</span>
        <span>CBSE Affiliation No. 330113</span>
      </div>
    </div></footer>
    <div class="help" id="help">
      <div class="help__menu" id="help-menu">
        <a href="tel:${SCHOOL.phone}">${icons.phone}Call the office</a>
        <a href="https://wa.me/${SCHOOL.mobile}" target="_blank" rel="noopener">${icons.whatsapp}WhatsApp</a>
        <a href="mailto:${SCHOOL.email}">${icons.mail}Email us</a>
        <a href="admissions.html#enquiry">${icons.arrow}Admission enquiry</a>
      </div>
      <button class="help__toggle js-help" type="button" aria-label="Need help? Contact options" aria-expanded="false" aria-controls="help-menu">${icons.chat}</button>
    </div>`;

  document.getElementById("site-header")?.insertAdjacentHTML("afterbegin", header);
  document.getElementById("site-footer")?.insertAdjacentHTML("afterbegin", footer);

  // Theme toggle, remembered per browser
  const root = document.documentElement;
  const prefersDark = matchMedia("(prefers-color-scheme: dark)");
  const applyTheme = (t) => root.setAttribute("data-theme", t);
  try {
    const saved = localStorage.getItem("sps-theme");
    applyTheme(saved || (prefersDark.matches ? "dark" : "light"));
  } catch (e) {
    applyTheme(prefersDark.matches ? "dark" : "light");
  }
  document.querySelector(".js-theme")?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("sps-theme", next); } catch (e) {}
  });

  // Mobile menu
  const burger = document.querySelector(".js-burger");
  const mobileMenu = document.getElementById("mobile-menu");
  burger?.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });

  // Floating help widget
  const help = document.getElementById("help");
  const helpBtn = document.querySelector(".js-help");
  helpBtn?.addEventListener("click", () => {
    const open = help.classList.toggle("open");
    helpBtn.setAttribute("aria-expanded", open);
  });
  document.addEventListener("click", (e) => {
    if (help && !help.contains(e.target)) { help.classList.remove("open"); helpBtn.setAttribute("aria-expanded", false); }
  });

  // Reveal on scroll + animated counters
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target % 1 ? (target * eased).toFixed(2) : Math.round(target * eased).toLocaleString("en-IN");
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = "IntersectionObserver" in window && new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      if (entry.target.dataset.count) animateCount(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal, [data-count]").forEach((el) => {
    if (io) io.observe(el);
    else { el.classList.add("in"); if (el.dataset.count) el.textContent = el.dataset.count + (el.dataset.suffix || ""); }
  });

  // Enquiry form: compose an email to the school office (no server needed)
  document.querySelectorAll(".js-enquiry").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const lines = [...d.entries()].map(([k, v]) => `${k}: ${v}`).join("\n");
      const subject = encodeURIComponent(form.dataset.subject || "Enquiry from website");
      location.href = `mailto:${SCHOOL.email}?subject=${subject}&body=${encodeURIComponent(lines)}`;
    });
  });
})();
