import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const stroke = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const Phone = (p: P) => (<svg {...stroke} {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" /></svg>);
export const Mail = (p: P) => (<svg {...stroke} {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>);
export const Pin = (p: P) => (<svg {...stroke} {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>);
export const Sun = (p: P) => (<svg {...stroke} {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>);
export const Moon = (p: P) => (<svg {...stroke} {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>);
export const Menu = (p: P) => (<svg {...stroke} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const Arrow = (p: P) => (<svg {...stroke} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const Chat = (p: P) => (<svg {...stroke} {...p}><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z" /></svg>);
export const WhatsApp = (p: P) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3ZM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z" /></svg>);
export const Facebook = (p: P) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M14 8V6c0-.9.6-1 1-1h3V1h-4c-4 0-5 3-5 5v2H6v4h3v11h5V12h3.5l.5-4Z" /></svg>);
export const Instagram = (p: P) => (<svg {...stroke} {...p}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" /></svg>);
export const YouTube = (p: P) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.1V8.9l5.8 3.1Z" /></svg>);

// Card icons
export const Flask = (p: P) => (<svg {...stroke} {...p}><path d="M9 3h6M10 3v6L4 19a2 2 0 0 0 1.7 3h12.6A2 2 0 0 0 20 19l-6-10V3" /></svg>);
export const Leaf = (p: P) => (<svg {...stroke} {...p}><path d="M12 22c5-3 8-7 8-12a8 8 0 0 0-16 0c0 5 3 9 8 12Z" /><path d="M12 6v8M8 10h8" /></svg>);
export const Chart = (p: P) => (<svg {...stroke} {...p}><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 6-6" /></svg>);
export const Target = (p: P) => (<svg {...stroke} {...p}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>);
export const Eye = (p: P) => (<svg {...stroke} {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>);
export const Shield = (p: P) => (<svg {...stroke} {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></svg>);
export const Monitor = (p: P) => (<svg {...stroke} {...p}><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>);
export const Book = (p: P) => (<svg {...stroke} {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Z" /><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" /></svg>);
export const Screen = (p: P) => (<svg {...stroke} {...p}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="m10 8 4 2-4 2Z" /><path d="M7 20h10" /></svg>);
export const Globe = (p: P) => (<svg {...stroke} {...p}><circle cx="12" cy="12" r="10" /><path d="M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20M2 12h20" /></svg>);
export const Bus = (p: P) => (<svg {...stroke} {...p}><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M3 11h18M7 21v-4M17 21v-4" /></svg>);
export const Plus = (p: P) => (<svg {...stroke} {...p}><path d="M12 7v10M7 12h10" /><rect x="3" y="3" width="18" height="18" rx="4" /></svg>);
export const Music = (p: P) => (<svg {...stroke} {...p}><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>);
