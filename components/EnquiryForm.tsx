"use client";

import { useState, type FocusEvent, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { SCHOOL } from "@/lib/site";

// Reduces any typed, pasted or autofilled phone number to a bare 10-digit Indian number.
// "+91 98765 43210", "919876543210" and "09876543210" all become "9876543210".
export function normalizePhone(raw: string) {
  let v = raw.replace(/[^\d+]/g, "");
  if (v.startsWith("+91")) v = v.slice(3);
  else if (v === "+" || v === "+9") return v; // still typing the +91 prefix
  v = v.replace(/\D/g, "");
  // Without a "+", a leading 91 or 0 is only a prefix once the full number is there;
  // until then it may be the start of the number itself (e.g. 91234 56789).
  if (v.length === 12 && v.startsWith("91")) v = v.slice(2);
  else if (v.length === 11 && v.startsWith("0")) v = v.slice(1);
  return v.slice(0, 10);
}

// Keeps a name to letters (any script, incl. Hindi/Urdu), single spaces and single . ' -
// It must start with a letter, so leading spaces or punctuation are dropped.
// A trailing space is kept while typing so the next word can follow; it is trimmed on blur.
export function normalizeName(raw: string) {
  return raw
    .replace(/[^\p{L}\p{M}\s.'-]/gu, "")
    .replace(/\s+/g, " ")
    .replace(/([.'-])[.'-]+/g, "$1")
    .replace(/^[^\p{L}]+/u, "")
    .slice(0, 60);
}

// Capitalises the first letter of each word, including after - and ' ("mary-jane o'brien" ->
// "Mary-Jane O'Brien"). Other letters are left as typed, so "McDonald" stays as it is.
// Scripts without capitals, such as Hindi and Urdu, are unaffected.
export function capitalizeName(v: string) {
  return v.replace(/(^|[\s'-])(\p{Ll})/gu, (_, sep: string, ch: string) => sep + ch.toUpperCase());
}

// How each kind of field is cleaned as the user types or pastes.
const FILTERS = {
  name: normalizeName,
  phone: normalizePhone,
};

// The message shown when a cleaned value still is not acceptable; "" means valid.
// Empty required fields are left to the browser's own "Please fill in this field".
const PROBLEMS = {
  name: (v: string) => (v && (v.match(/\p{L}/gu)?.length ?? 0) < 2 ? "Please enter a name with at least 2 letters." : ""),
  phone: (v: string) => (v && v.length !== 10 ? "Please enter a 10-digit mobile number." : ""),
};

type FieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

// Name input: letters only, tidied as you type; phones capitalise each word.
export function NameInput(props: FieldProps) {
  return <input {...props} type="text" data-filter="name" autoComplete={props.autoComplete ?? "name"} autoCapitalize="words" spellCheck={false} maxLength={60} title="Please use letters only, e.g. Asha Khan" />;
}

// Phone input: exactly 10 digits; a +91 / 91 / 0 prefix is clipped off. Opens the phone keypad.
// No maxLength: it would cut a pasted "+91 98765 43210" short before the prefix could be removed.
export function PhoneInput(props: FieldProps) {
  return (
    <input
      {...props}
      type="tel"
      data-filter="phone"
      inputMode="tel"
      autoComplete={props.autoComplete ?? "tel-national"}
      placeholder={props.placeholder ?? "10-digit mobile number"}
      pattern="[0-9]{10}"
      title="Please enter a 10-digit mobile number, e.g. 9876543210"
    />
  );
}

// Sends the form contents to the school office: through the visitor's email app by default,
// or as a ready-to-send WhatsApp message to the office mobile with via="whatsapp".
export default function EnquiryForm({ subject, children, submitLabel, via = "email", className = "card form reveal" }: { subject: string; children: ReactNode; submitLabel: string; via?: "email" | "whatsapp"; className?: string }) {
  const onInput = (e: FormEvent<HTMLFormElement>) => {
    const el = e.target as HTMLInputElement;
    const filter = el.dataset.filter as keyof typeof FILTERS | undefined;
    if (!filter) return;
    const clean = FILTERS[filter](el.value);
    if (clean !== el.value) {
      const pos = Math.min(Math.max((el.selectionStart ?? clean.length) - (el.value.length - clean.length), 0), clean.length);
      el.value = clean;
      el.setSelectionRange(pos, pos);
    }
    el.setCustomValidity(PROBLEMS[filter](clean));
  };

  // Tidy a name once the visitor leaves the field: trimmed and capitalised.
  const onBlur = (e: FocusEvent) => {
    const el = e.target as HTMLInputElement;
    if (el.dataset.filter !== "name") return;
    const tidy = capitalizeName(el.value.trim());
    if (tidy === el.value) return;
    el.value = tidy;
    el.setCustomValidity(PROBLEMS.name(tidy));
  };

  // The message text, kept after Send so the visitor can resend it another way if no email app opened.
  const [sent, setSent] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lines = [...new FormData(e.currentTarget).entries()]
      .map(([k, v]) => [k, String(v).trim()] as const)
      .filter(([, v]) => v)
      .map(([k, v]) => (via === "whatsapp" ? `*${k}:* ${v}` : `${k}: ${v}`))
      .join("\n");
    if (via === "whatsapp") {
      const text = `*${subject}*\n\n${lines}`;
      const url = `https://wa.me/${SCHOOL.mobile}?text=${encodeURIComponent(text)}`;
      // A new tab keeps the site open on desktop; phones hand the link straight to the WhatsApp app
      const win = window.open(url, "_blank");
      if (win) win.opener = null;
      else window.location.href = url;
      setSent(text);
      return;
    }
    window.location.href = `mailto:${SCHOOL.email}?cc=${SCHOOL.emailBackup}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;
    setSent(`${subject}\n\n${lines}`);
  };

  return (
    <form className={className} onInput={onInput} onBlur={onBlur} onSubmit={onSubmit}>
      {children}
      <button className="btn btn--gold btn-start" type="submit">{submitLabel}</button>
      <div className="form-status" role="status">
        {sent && via === "whatsapp" && (
          <>
            <strong>WhatsApp should now be open with your enquiry.</strong> Press send there to deliver it. If it did not open,{" "}
            <a href={`https://wa.me/${SCHOOL.mobile}?text=${encodeURIComponent(sent)}`} target="_blank" rel="noopener">try again</a>{" "}
            or call the office on <a href={`tel:+${SCHOOL.mobile}`}>{SCHOOL.mobileLabel}</a>.
          </>
        )}
        {sent && via === "email" && (
          <>
            <strong>Your email app should now be open with this message.</strong> Press send there to deliver it. If no app opened,{" "}
            <a href={`https://wa.me/${SCHOOL.mobile}?text=${encodeURIComponent(sent)}`} target="_blank" rel="noopener">send it on WhatsApp</a>{" "}
            or call the office on <a href={`tel:${SCHOOL.phone}`}>{SCHOOL.phoneLabel}</a>.
          </>
        )}
      </div>
    </form>
  );
}
