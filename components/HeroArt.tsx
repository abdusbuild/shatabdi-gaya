// Original illustrations for the inner-page title bands, drawn in the same outlined style as
// FaqArt. Animation lives in globals.css under "Page hero illustrations".
const ink = "#2e2d2c";
const line = { stroke: ink, strokeWidth: 3, strokeLinejoin: "round", strokeLinecap: "round" } as const;
const orange = "#ff7000";
const yellow = "#ffc400";
const green = "#00904d";
const red = "#dc4b3f";
const wood = "#c98b4f";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg className="hero-art" viewBox="0 0 400 340" aria-hidden="true" focusable="false">
      <circle className="hero-art__disc" cx="200" cy="175" r="150" />
      <circle className="hero-art__ring" cx="200" cy="175" r="164" fill="none" stroke={orange} strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" />
      {children}
    </svg>
  );
}

function Sparkles({ at }: { at: [number, number, number][] }) {
  return (
    <g className="hero-art__spark" fill={yellow} {...line} strokeWidth={2}>
      {at.map(([x, y, s]) => (
        <path key={`${x}-${y}`} d={`M${x} ${y - s}l${s * 0.4} ${s * 0.6} ${s * 0.6} ${s * 0.4}-${s * 0.6} ${s * 0.4}-${s * 0.4} ${s * 0.6}-${s * 0.4}-${s * 0.6}-${s * 0.6}-${s * 0.4} ${s * 0.6}-${s * 0.4}z`} />
      ))}
    </g>
  );
}

// About: the school building, founded with the century, under a rising sun.
export function AboutArt() {
  return (
    <Frame>
      <g className="hero-art__rays" stroke={yellow} strokeWidth="5" strokeLinecap="round">
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i * Math.PI) / 5;
          return <path key={i} d={`M${292 + Math.cos(a) * 42} ${92 + Math.sin(a) * 42}L${292 + Math.cos(a) * 54} ${92 + Math.sin(a) * 54}`} />;
        })}
      </g>
      <circle cx="292" cy="92" r="30" fill={yellow} {...line} />

      <path className="hero-art__drift" d="M58 96a16 16 0 0 1 28-14 20 20 0 0 1 36 6 13 13 0 0 1 2 26H64a12 12 0 0 1-6-18z" fill="#fff" {...line} />

      {/* Tree */}
      <g className="hero-art__sway">
        <rect x="64" y="226" width="12" height="62" rx="3" fill={wood} {...line} />
        <circle cx="70" cy="210" r="32" fill={green} {...line} />
        <circle cx="92" cy="232" r="20" fill={green} {...line} />
        <path d="M58 200c4-8 12-12 20-12" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Flag */}
      <path d="M200 116V62" {...line} fill="none" />
      <path className="hero-art__flag" d="M201 64h38l-9 10 9 10h-38z" fill={green} {...line} />

      {/* Building */}
      <rect x="112" y="170" width="176" height="118" fill="#fff" {...line} />
      <path d="M100 174l100-58 100 58z" fill={orange} {...line} />
      <circle cx="200" cy="152" r="11" fill={yellow} {...line} />
      <path d="M200 146v6l4 3" fill="none" {...line} strokeWidth={2} />
      <rect x="128" y="192" width="30" height="28" rx="3" fill="#fde6c8" {...line} />
      <rect x="242" y="192" width="30" height="28" rx="3" fill="#fde6c8" {...line} />
      <rect x="128" y="238" width="30" height="28" rx="3" fill="#fde6c8" {...line} />
      <rect x="242" y="238" width="30" height="28" rx="3" fill="#fde6c8" {...line} />
      <path d="M143 192v28M128 206h30M257 192v28M242 206h30M143 238v28M128 252h30M257 238v28M242 252h30" stroke={ink} strokeWidth="2" />
      <rect x="174" y="182" width="52" height="18" rx="3" fill={ink} />
      <text x="200" y="196" textAnchor="middle" fontSize="13" fontWeight="700" fill={yellow} letterSpacing="1">2000</text>
      <path d="M182 288v-36a18 18 0 0 1 36 0v36z" fill="#434242" {...line} />
      <circle cx="210" cy="268" r="2.5" fill={yellow} />

      {/* Ground */}
      <rect x="44" y="286" width="312" height="14" rx="7" fill={wood} {...line} />
      <Sparkles at={[[150, 70, 12], [356, 160, 9]]} />
    </Frame>
  );
}

// Academics: an open book with science, maths and geography rising out of it.
export function AcademicsArt() {
  return (
    <Frame>
      {/* Atom */}
      <g className="hero-art__spin">
        {[0, 60, 120].map((r) => (
          <g key={r} transform={`rotate(${r} 200 118)`}>
            <ellipse cx="200" cy="118" rx="58" ry="20" fill="none" {...line} />
            <circle cx="258" cy="118" r="6" fill={yellow} {...line} strokeWidth={2} />
          </g>
        ))}
      </g>
      <circle cx="200" cy="118" r="12" fill={orange} {...line} />

      {/* Flask */}
      <g className="hero-art__float">
        <path d="M90 128h24v30l26 46q4 10-6 10H70q-10 0-6-10l26-46z" fill="#fff" {...line} />
        <path d="M73 190h58l9 14q4 10-6 10H70q-10 0-6-10z" fill={green} {...line} />
        <rect x="86" y="120" width="32" height="10" rx="3" fill="#fff" {...line} />
        <circle className="hero-art__bubble" cx="96" cy="182" r="4" fill="#fff" {...line} strokeWidth={2} />
        <circle className="hero-art__bubble hero-art__bubble--b" cx="108" cy="178" r="3" fill="#fff" {...line} strokeWidth={2} />
        <circle className="hero-art__bubble hero-art__bubble--c" cx="102" cy="184" r="3.5" fill="#fff" {...line} strokeWidth={2} />
      </g>

      {/* Globe */}
      <g className="hero-art__float hero-art__float--b">
        <path d="M268 200a40 40 0 0 0 64 0" fill="none" {...line} />
        <path d="M300 214v14M284 230h32" {...line} fill="none" />
        <circle cx="300" cy="176" r="30" fill="#7cc4e8" {...line} />
        <path d="M282 160c8-4 14 2 12 8s4 10 10 8 8 8 2 12-12 2-14 8M308 152c6 2 10 8 16 6" fill="none" stroke={green} strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* Maths symbols */}
      <g className="hero-art__float hero-art__float--c" fill={orange} fontWeight="700">
        <text x="122" y="80" fontSize="30">π</text>
        <text x="276" y="96" fontSize="26">+</text>
        <text x="330" y="250" fontSize="24" fill={ink}>÷</text>
      </g>

      {/* Open book */}
      <path d="M68 262v44q66-16 132 6 66-22 132-6v-44q-66-16-132 6-66-22-132-6z" fill={orange} {...line} />
      <path d="M80 256q60-14 120 8v40q-60-22-120-8z" fill="#fff" {...line} />
      <path d="M320 256q-60-14-120 8v40q60-22 120-8z" fill="#fff" {...line} />
      <path d="M96 270q40-8 88 6M96 282q40-8 88 6M216 276q48-14 88-6M216 288q48-14 88-6" fill="none" stroke="#e0d6cc" strokeWidth="3" strokeLinecap="round" />
      <Sparkles at={[[150, 210, 10], [252, 214, 8], [60, 92, 9]]} />
    </Frame>
  );
}

// Admissions: a form being ticked off, a new school bag, and an "open" stamp.
export function AdmissionsArt() {
  const rows = [124, 160, 196, 232];
  return (
    <Frame>
      {/* Clipboard */}
      <rect x="132" y="70" width="152" height="216" rx="12" fill={wood} {...line} />
      <rect x="146" y="94" width="124" height="178" rx="6" fill="#fff" {...line} />
      <rect x="178" y="60" width="60" height="24" rx="6" fill="#434242" {...line} />
      <circle cx="208" cy="66" r="4" fill="#fff" />
      {rows.map((y, i) => (
        <g key={y}>
          <rect x="160" y={y - 11} width="22" height="22" rx="5" fill="#fff0e3" {...line} strokeWidth={2.5} />
          <path d={`M194 ${y - 4}h62`} stroke="#e0d6cc" strokeWidth="6" strokeLinecap="round" />
          <path d={`M194 ${y + 6}h40`} stroke="#ece5dc" strokeWidth="5" strokeLinecap="round" />
          <path className={`hero-art__tick hero-art__tick--${i + 1}`} d={`M164 ${y}l6 6 12-14`} pathLength={1} fill="none" stroke={green} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}

      {/* Pencil */}
      <g className="hero-art__float">
        <g transform="rotate(-40 300 250)">
          <rect x="262" y="241" width="70" height="18" rx="2" fill={yellow} {...line} />
          <rect x="254" y="241" width="12" height="18" rx="3" fill="#f2a2a2" {...line} />
          <path d="M332 241l20 9-20 9z" fill="#f3d9b1" {...line} />
          <path d="M345 247l7 3-7 3z" fill={ink} />
        </g>
      </g>

      {/* School bag */}
      <g className="hero-art__sway">
        <path d="M72 196v-10a14 14 0 0 1 28 0v10" fill="none" {...line} strokeWidth={4} />
        <rect x="54" y="192" width="64" height="94" rx="18" fill={orange} {...line} />
        <path d="M54 220q32 14 64 0" fill="none" {...line} />
        <rect x="68" y="240" width="36" height="32" rx="8" fill={yellow} {...line} />
        <path d="M76 252h20" {...line} fill="none" />
      </g>

      {/* Admissions open stamp */}
      <g className="hero-art__wiggle">
        <circle cx="318" cy="102" r="34" fill={green} {...line} />
        <circle cx="318" cy="102" r="26" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="3 4" />
        <text x="318" y="108" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff" letterSpacing="1">OPEN</text>
      </g>
      <Sparkles at={[[96, 112, 11], [356, 196, 8]]} />
    </Frame>
  );
}

// Campus & life: celebration bunting, a winner's podium, football and music.
export function CampusArt() {
  const flags = [0.1, 0.22, 0.34, 0.46, 0.58, 0.7, 0.82];
  const colors = [orange, yellow, green, red];
  const at = (t: number) => {
    const u = 1 - t;
    return [u * u * 60 + 2 * u * t * 200 + t * t * 340, u * u * 64 + 2 * u * t * 112 + t * t * 64];
  };
  return (
    <Frame>
      {/* Bunting */}
      <g className="hero-art__bunting">
        <path d="M60 64q140 48 280 0" fill="none" {...line} />
        {flags.map((t, i) => {
          const [x, y] = at(t);
          return <path key={t} d={`M${x - 11} ${y}h22l-11 22z`} fill={colors[i % colors.length]} {...line} strokeWidth={2.5} />;
        })}
      </g>

      {/* Music notes */}
      <g className="hero-art__float hero-art__float--b" fill={ink}>
        <path d="M304 118v42" {...line} fill="none" />
        <path d="M304 118l26-8v40" {...line} fill="none" />
        <ellipse cx="296" cy="162" rx="9" ry="7" />
        <ellipse cx="322" cy="152" rx="9" ry="7" />
        <path d="M304 118l26-8v8l-26 8z" />
      </g>
      <g className="hero-art__float hero-art__float--c" fill={orange}>
        <path d="M84 132v32" {...line} fill="none" />
        <ellipse cx="76" cy="166" rx="9" ry="7" {...line} strokeWidth={2} />
        <path d="M84 132q14 4 12 18" {...line} fill="none" />
      </g>

      {/* Trophy on a podium */}
      <g className="hero-art__shine">
        <path d="M172 158q-26 0-22 22 4 16 26 14" fill="none" stroke={ink} strokeWidth="9" strokeLinecap="round" />
        <path d="M228 158q26 0 22 22-4 16-26 14" fill="none" stroke={ink} strokeWidth="9" strokeLinecap="round" />
        <path d="M172 158q-26 0-22 22 4 16 26 14" fill="none" stroke={yellow} strokeWidth="4" strokeLinecap="round" />
        <path d="M228 158q26 0 22 22-4 16-26 14" fill="none" stroke={yellow} strokeWidth="4" strokeLinecap="round" />
        <path d="M168 148h64v18q0 40-32 46-32-6-32-46z" fill={yellow} {...line} />
        <path d="M200 166l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z" fill="#fff" {...line} strokeWidth={2} />
        <path d="M180 158q0 22 10 34" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="4" strokeLinecap="round" />
        <rect x="192" y="212" width="16" height="14" fill={yellow} {...line} />
        <rect x="176" y="224" width="48" height="14" rx="3" fill="#434242" {...line} />
      </g>
      <rect x="150" y="238" width="100" height="50" rx="4" fill={orange} {...line} />
      <text x="200" y="274" textAnchor="middle" fontSize="28" fontWeight="700" fill="#fff">1</text>

      {/* Football */}
      <ellipse className="hero-art__shadow" cx="100" cy="286" rx="18" ry="4" fill={ink} opacity=".25" />
      <g className="hero-art__bounce">
        <circle cx="100" cy="262" r="20" fill="#fff" {...line} />
        <path d="M100 254l7 5-3 8h-8l-3-8z" fill={ink} />
        <path d="M100 254v-12M107 259l11-4M104 267l6 10M96 267l-6 10M93 259l-11-4" stroke={ink} strokeWidth="2" />
      </g>

      {/* Ground and plant */}
      <rect x="44" y="286" width="312" height="14" rx="7" fill={wood} {...line} />
      <g className="hero-art__sway">
        <path d="M304 286v-34" {...line} fill="none" />
        <path d="M304 262c-16-2-22-14-20-24 12 0 20 10 20 24zM304 252c14-4 18-16 16-26-12 2-18 12-16 26z" fill={green} {...line} />
      </g>
      <Sparkles at={[[132, 116, 11], [270, 214, 9], [348, 220, 8]]} />
    </Frame>
  );
}

// Contact: a letter coming out of its envelope, a ringing phone and a map pin.
export function ContactArt() {
  return (
    <Frame>
      {/* Map pin */}
      <ellipse className="hero-art__shadow" cx="90" cy="160" rx="16" ry="4" fill={ink} opacity=".25" />
      <g className="hero-art__shine">
        <path d="M90 154c-20-24-30-40-30-56a30 30 0 0 1 60 0c0 16-10 32-30 56z" fill={red} {...line} />
        <circle cx="90" cy="98" r="10" fill="#fff" {...line} />
      </g>

      {/* Phone with signal */}
      <g className="hero-art__wiggle">
        <rect x="290" y="66" width="48" height="84" rx="10" fill="#434242" {...line} />
        <rect x="297" y="77" width="34" height="58" rx="4" fill="#7cc4e8" />
        <circle cx="314" cy="106" r="10" fill={green} {...line} strokeWidth={2} />
        <path d="M309 101q0 11 10 11" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <circle cx="314" cy="142" r="3" fill="#fff" />
      </g>
      <g className="hero-art__pulse" fill="none" stroke={orange} strokeWidth="4" strokeLinecap="round">
        <path d="M348 94q8 12 0 24" />
        <path d="M358 86q16 20 0 40" />
      </g>

      {/* Envelope */}
      <path d="M112 156l88-58 88 58z" fill="#e06200" {...line} />
      <rect x="110" y="152" width="180" height="120" rx="8" fill="#ff8a2b" {...line} />
      <g className="hero-art__float">
        <rect x="130" y="112" width="140" height="104" rx="4" fill="#fff" {...line} />
        <text x="146" y="140" fontSize="16" fontWeight="700" fill={orange}>Hello!</text>
        <path d="M146 158h108M146 174h90M146 190h100" stroke="#e0d6cc" strokeWidth="5" strokeLinecap="round" />
      </g>
      <path d="M110 174l90 54 90-54v90q0 8-8 8H118q-8 0-8-8z" fill={orange} {...line} />
      <path d="M114 266l66-48M286 266l-66-48" stroke={ink} strokeOpacity=".25" strokeWidth="3" strokeLinecap="round" />
      <Sparkles at={[[60, 214, 10], [340, 220, 9], [200, 296, 8]]} />
    </Frame>
  );
}

// Contact form: a laptop sending a message as a paper plane, with chat bubbles.
export function MessageArt() {
  return (
    <Frame>
      {/* Chat bubbles */}
      <g className="hero-art__float">
        <path d="M68 140l-8 16 20-10" fill={green} {...line} />
        <rect x="46" y="102" width="92" height="42" rx="21" fill={green} {...line} />
        <text x="92" y="130" textAnchor="middle" fontSize="17" fontWeight="700" fill="#fff">Hi!</text>
      </g>
      <g className="hero-art__float hero-art__float--b">
        <rect x="56" y="170" width="74" height="34" rx="17" fill="#fff" {...line} />
        {[76, 93, 110].map((x, i) => (
          <circle key={x} className={`hero-art__dot hero-art__dot--${i + 1}`} cx={x} cy="187" r="5" fill={ink} />
        ))}
      </g>

      {/* Trail and paper plane */}
      <path className="hero-art__trail" d="M208 146q18-52 92-54" fill="none" stroke={orange} strokeWidth="3.5" strokeLinecap="round" strokeDasharray="7 9" />
      <g className="hero-art__plane">
        <g transform="translate(300 92) rotate(-12)">
          <path d="M0 0l48-20-14 34z" fill="#fff" {...line} />
          <path d="M48-20L14 6l20 8z" fill="#e0d6cc" {...line} />
          <path d="M14 6l-4 13 9-7" fill="#e0d6cc" {...line} />
        </g>
      </g>

      {/* Laptop */}
      <rect x="120" y="150" width="160" height="112" rx="8" fill="#434242" {...line} />
      <rect x="130" y="160" width="140" height="92" rx="3" fill="#fff" />
      <path d="M130 163q0-3 3-3h134q3 0 3 3v13H130z" fill={orange} />
      <circle cx="140" cy="168" r="2.5" fill="#fff" /><circle cx="149" cy="168" r="2.5" fill="#fff" /><circle cx="158" cy="168" r="2.5" fill="#fff" />
      <path d="M142 192h96M142 208h116M142 224h70" stroke="#e0d6cc" strokeWidth="6" strokeLinecap="round" />
      <rect x="222" y="234" width="38" height="12" rx="6" fill={orange} />
      <path d="M98 262h204l14 24H84z" fill="#e0d6cc" {...line} />
      <rect x="180" y="270" width="40" height="8" rx="3" fill="#cfc4b8" />

      {/* Desk and plant */}
      <rect x="44" y="286" width="312" height="14" rx="7" fill={wood} {...line} />
      <g className="hero-art__sway">
        <path d="M332 256v-22" {...line} fill="none" />
        <path d="M332 240c-14-2-18-12-16-20 10 0 16 8 16 20zM332 232c12-4 16-14 14-22-10 2-16 10-14 22z" fill={green} {...line} />
      </g>
      <path d="M318 256h28l-4 30h-20z" fill={orange} {...line} />
      <Sparkles at={[[176, 106, 10], [350, 150, 9], [40, 240, 8]]} />
    </Frame>
  );
}

// Public disclosure: an affiliation certificate with its seal, under a magnifying glass.
export function DisclosureArt() {
  return (
    <Frame>
      {/* Folder */}
      <g className="hero-art__sway">
        <path d="M46 204h32l8 10h44v70H46z" fill="#ffb100" {...line} />
        <path d="M46 222h84v62H46z" fill={yellow} {...line} />
      </g>

      {/* Certificate */}
      <rect x="112" y="76" width="176" height="206" rx="6" fill="#fff" {...line} />
      <rect x="124" y="88" width="152" height="182" rx="3" fill="none" stroke={yellow} strokeWidth="2.5" />
      <text x="200" y="122" textAnchor="middle" fontSize="20" fontWeight="700" fill={ink} letterSpacing="2">CBSE</text>
      <path d="M148 144h104M158 160h84M148 176h104" stroke="#e0d6cc" strokeWidth="5" strokeLinecap="round" />
      <g className="hero-art__shine">
        <path d="M188 238l-8 36 12-8 8 10 4-36zM212 238l8 36-12-8-8 10-4-36z" fill={red} {...line} strokeWidth={2.5} />
        <circle cx="200" cy="222" r="24" fill={orange} {...line} />
        <circle cx="200" cy="222" r="16" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="3 4" />
        <path d="M200 213l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#fff" />
      </g>

      {/* Magnifying glass */}
      <g className="hero-art__float hero-art__float--b">
        <path d="M322 218l32 32" stroke={ink} strokeWidth="16" strokeLinecap="round" />
        <path d="M322 218l32 32" stroke={wood} strokeWidth="9" strokeLinecap="round" />
        <circle cx="298" cy="194" r="34" fill="#bfe3f5" fillOpacity=".75" stroke={ink} strokeWidth="8" />
        <circle cx="298" cy="194" r="34" fill="none" stroke="#434242" strokeWidth="4" />
        <path d="M280 182q4-12 16-16" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      </g>
      <Sparkles at={[[84, 110, 11], [350, 112, 9]]} />
    </Frame>
  );
}

// Privacy: a shield with a padlock, a key and a hidden password.
export function PrivacyArt() {
  return (
    <Frame>
      {/* Key */}
      <g className="hero-art__float">
        <g transform="rotate(28 110 140)">
          <rect x="88" y="136" width="58" height="9" rx="3" fill={yellow} {...line} />
          <rect x="128" y="144" width="7" height="12" rx="2" fill={yellow} {...line} strokeWidth={2.5} />
          <rect x="138" y="144" width="7" height="9" rx="2" fill={yellow} {...line} strokeWidth={2.5} />
          <circle cx="76" cy="140" r="17" fill={yellow} {...line} />
          <circle cx="72" cy="140" r="6" fill="#fbeee2" {...line} strokeWidth={2.5} />
        </g>
      </g>

      {/* Shield and padlock */}
      <g className="hero-art__shine">
        <path d="M200 66l84 30v70c0 58-38 94-84 114-46-20-84-56-84-114V96z" fill={green} {...line} />
        <path d="M200 84l66 24v58c0 46-30 76-66 92-36-16-66-46-66-92v-58z" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="3" />
        <g className="hero-art__lock">
          <path d="M178 158v-20a22 22 0 0 1 44 0v20" fill="none" stroke={ink} strokeWidth="13" strokeLinecap="round" />
          <path d="M178 158v-20a22 22 0 0 1 44 0v20" fill="none" stroke="#e0d6cc" strokeWidth="6" strokeLinecap="round" />
        </g>
        <rect x="164" y="154" width="72" height="58" rx="10" fill={yellow} {...line} />
        <circle cx="200" cy="178" r="7" fill={ink} />
        <rect x="197" y="182" width="6" height="16" rx="3" fill={ink} />
      </g>

      {/* Password field */}
      <g className="hero-art__float hero-art__float--b">
        <rect x="268" y="232" width="104" height="36" rx="18" fill="#fff" {...line} />
        {[290, 308, 326, 344].map((x, i) => (
          <circle key={x} className={`hero-art__dot hero-art__dot--${i + 1}`} cx={x} cy="250" r="5" fill={ink} />
        ))}
      </g>
      <Sparkles at={[[312, 96, 11], [70, 250, 9]]} />
    </Frame>
  );
}

// Terms: a signed document with an approval stamp.
export function TermsArt() {
  return (
    <Frame>
      <path d="M120 76q0-6 6-6h122l32 32v174q0 6-6 6H126q-6 0-6-6z" fill="#fff" {...line} />
      <path d="M248 70v26q0 6 6 6h26" fill="#ece5dc" {...line} />
      <text x="200" y="116" textAnchor="middle" fontSize="17" fontWeight="700" fill={orange} letterSpacing="2">TERMS</text>
      <path d="M140 136h120M140 152h100M140 168h120M140 184h84M140 200h110" stroke="#e0d6cc" strokeWidth="5" strokeLinecap="round" />
      <path d="M140 252h100" stroke={ink} strokeWidth="2" strokeDasharray="4 5" strokeLinecap="round" />
      <path className="hero-art__sign" d="M146 244c6-20 14-22 12-2s10-16 16-6 6 8 12-6 8 12 16 4 8-4 14 0" pathLength={1} fill="none" stroke={orange} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Pen */}
      <g className="hero-art__float">
        <g transform="rotate(-38 270 226)">
          <rect x="242" y="219" width="74" height="15" rx="5" fill="#434242" {...line} />
          <path d="M242 219l-18 7.5 18 7.5z" fill="#e0d6cc" {...line} />
          <rect x="284" y="214" width="26" height="5" rx="2" fill={yellow} {...line} strokeWidth={2} />
        </g>
      </g>

      {/* Approval stamp */}
      <g className="hero-art__wiggle">
        <circle cx="314" cy="92" r="30" fill={green} {...line} />
        <path d="M300 92l10 10 18-20" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Sparkles at={[[84, 120, 11], [84, 240, 8], [350, 200, 9]]} />
    </Frame>
  );
}
