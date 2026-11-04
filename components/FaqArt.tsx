// Original illustration for the FAQ section: a thinking student in front of a big question mark,
// with floating school props. Animation lives in globals.css under "FAQ illustration".
const ink = "#1c2a5e";
const line = { stroke: ink, strokeWidth: 3, strokeLinejoin: "round", strokeLinecap: "round" } as const;

export default function FaqArt() {
  return (
    <svg className="faq-art" viewBox="0 0 400 380" role="img" aria-label="Illustration of a curious student with a big question mark">
      <circle className="faq-art__disc" cx="205" cy="190" r="178" />
      {/* Big question mark */}
      <g className="faq-art__qmark">
        <path d="M244 128c0-62 108-70 110-6 2 50-56 56-56 104v18" fill="none" stroke={ink} strokeWidth="54" strokeLinecap="round" />
        <path d="M244 128c0-62 108-70 110-6 2 50-56 56-56 104v18" fill="none" stroke="#d71920" strokeWidth="44" strokeLinecap="round" />
        <path d="M262 112c8-26 52-30 66-8" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="6" strokeLinecap="round" />
        <circle cx="298" cy="300" r="26" fill="#d71920" {...line} />
      </g>

      {/* Exclamation marks */}
      <g className="faq-art__bang" fill={ink}>
        <rect x="122" y="128" width="6" height="22" rx="3" transform="rotate(-12 125 139)" />
        <rect x="134" y="124" width="6" height="26" rx="3" />
        <rect x="146" y="128" width="6" height="22" rx="3" transform="rotate(12 149 139)" />
        <circle cx="123" cy="158" r="3.5" /><circle cx="137" cy="158" r="3.5" /><circle cx="151" cy="158" r="3.5" />
      </g>

      {/* Floating graduation cap */}
      <g className="faq-art__float faq-art__float--a">
        <path d="M38 78l52-20 52 20-52 20z" fill="#1c2a5e" {...line} />
        <path d="M62 88v20c16 12 40 12 56 0V88l-28 10z" fill="#1c2a5e" {...line} />
        <path d="M128 84v26" {...line} fill="none" />
        <circle cx="128" cy="114" r="5" fill="#ffc400" {...line} />
      </g>

      {/* Floating pencil */}
      <g className="faq-art__float faq-art__float--b">
        <g transform="translate(26 0) rotate(-35 70 200)">
          <rect x="30" y="190" width="70" height="18" rx="2" fill="#ffc400" {...line} />
          <rect x="22" y="190" width="12" height="18" rx="3" fill="#f2a2a2" {...line} />
          <path d="M100 190l20 9-20 9z" fill="#f3d9b1" {...line} />
          <path d="M113 196l7 3-7 3z" fill={ink} />
        </g>
      </g>

      {/* Sparkles */}
      <g className="faq-art__spark" fill="#ffc400" {...line} strokeWidth={2}>
        <path d="M168 44l5 12 12 5-12 5-5 12-5-12-12-5 12-5z" />
        <path d="M368 40l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" />
      </g>

      {/* Desk */}
      <rect x="40" y="336" width="330" height="24" rx="8" fill="#c98b4f" {...line} />
      <path d="M56 346h290" stroke="#fff" strokeOpacity=".3" strokeWidth="3" strokeLinecap="round" />

      {/* Stack of books */}
      <g className="faq-art__books">
        <rect x="58" y="314" width="78" height="22" rx="4" fill="#1878b8" {...line} />
        <rect x="66" y="292" width="70" height="22" rx="4" fill="#dc4b3f" {...line} />
        <rect x="54" y="270" width="74" height="22" rx="4" fill="#d71920" {...line} />
        <path d="M66 325h56M74 303h50M64 281h52" stroke="#fff" strokeOpacity=".6" strokeWidth="3" strokeLinecap="round" />
        <circle cx="98" cy="254" r="15" fill="#dc4b3f" {...line} />
        <path d="M98 240c0-6 4-10 8-11" fill="none" {...line} />
        <path d="M100 236c6-4 12-2 14 2-6 3-11 2-14-2z" fill="#1878b8" {...line} strokeWidth={2} />
      </g>

      {/* Student */}
      <g className="faq-art__kid">
        {/* torso in white shirt */}
        <path d="M140 340c2-50 26-78 70-80 44 2 70 30 72 80z" fill="#fff" {...line} />
        <path d="M196 262l14 16 14-16" fill="none" {...line} />
        <path d="M210 278l-7 10 7 40 7-40z" fill="#1c2a5e" {...line} />
        <path d="M206 284l8 0" stroke="#ffc400" strokeWidth="3" strokeLinecap="round" />
        {/* neck */}
        <path d="M198 240v24h24v-24" fill="#e0a87c" {...line} />
        {/* ear */}
        <ellipse cx="156" cy="196" rx="12" ry="15" fill="#e0a87c" {...line} />
        <path d="M158 190c-5 2-5 10 0 12" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
        {/* head */}
        <ellipse cx="212" cy="190" rx="56" ry="60" fill="#e0a87c" {...line} />
        <ellipse cx="236" cy="216" rx="12" ry="7" fill="#e88e7a" opacity=".55" />
        {/* hair */}
        <path d="M154 196c-10-56 20-86 58-86 26-14 64 4 62 34 8 16 4 34 0 46-8-20-22-32-40-38-6 10-22 16-38 14 4-6 4-12 2-16-14 10-28 22-34 44-6 2-8 2-10 2z" fill="#2b2b33" {...line} />
        <path d="M206 112c-6-10-2-22 8-26-2 8 2 14 8 18" fill="#2b2b33" {...line} />
        {/* brows */}
        <path d="M186 175c6-5 14-5 20-1" fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" />
        <path d="M228 170c7-4 15-3 19 2" fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" />
        {/* eyes */}
        <g className="faq-art__eye">
          <ellipse cx="196" cy="188" rx="7" ry="9" fill="#fff" {...line} strokeWidth={2.5} />
          <circle cx="198" cy="190" r="4" fill={ink} />
        </g>
        <path d="M228 188c4-6 14-6 18 0" fill="none" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
        {/* nose and mouth */}
        <path d="M214 196c-2 8-2 14 6 16" fill="none" {...line} strokeWidth={2.5} />
        <path d="M204 228c6-4 12 2 18-2" fill="none" {...line} />
        {/* arm resting on desk */}
        <path d="M222 322c28-8 62-8 84 0 8 4 8 16 0 18h-84z" fill="#e0a87c" {...line} />
        <path d="M218 320c-6 6-6 16 0 20h12c-4-6-4-14 0-20z" fill="#fff" {...line} />
        {/* arm propping the chin */}
        <path d="M150 340l12-90h30l-8 90z" fill="#e0a87c" {...line} />
        <path d="M146 340l4-34h38l-4 34z" fill="#fff" {...line} />
        <path d="M160 246c-2-16 10-24 22-22 14 0 20 10 18 22-2 10-10 14-20 14-12 0-20-4-20-14z" fill="#e0a87c" {...line} />
        <path d="M168 232c6-2 12-2 18 0M166 242c6-2 14-2 20 0" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
