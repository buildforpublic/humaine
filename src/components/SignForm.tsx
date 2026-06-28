"use client";

import { useActionState, useState } from "react";
import { signManifesto, type ActionState } from "@/app/actions";
import { COUNTRIES } from "@/content";
import { SignaturePadField, type StrokeData } from "./SignaturePadField";
import { SignatureReveal } from "./SignatureReveal";
import styles from "./SignForm.module.css";

const initial: ActionState = { ok: false, message: "" };

export function SignForm() {
  const [state, formAction, pending] = useActionState(signManifesto, initial);

  // Retained across the server round-trip so the success reveal can show
  // *their* signature and name.
  const [name, setName] = useState("");
  const [signature, setSignature] = useState("");
  const [strokes, setStrokes] = useState<StrokeData | null>(null);

  if (state.ok) {
    return (
      <SignatureReveal
        name={name}
        signature={signature}
        strokes={strokes}
        message={state.message}
      />
    );
  }

  return (
    <form action={formAction} className={styles.form}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">
            Full name <span className="req">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            className="input"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={`field ${styles.anonField}`}>
          <span className={styles.anonLabel}>Privacy</span>
          <label className="checkbox">
            <input type="checkbox" name="anonymous" />
            <span>I want to be anonymous on the public wall</span>
          </label>
        </div>

        <div className="field">
          <label htmlFor="email">
            Email <span className="req">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input"
            autoComplete="email"
          />
        </div>

        <div className="field">
          <label htmlFor="country">
            Country of residence <span className="hint">(demographic)</span>
          </label>
          <select id="country" name="country" className="select" defaultValue="">
            <option value="" disabled>
              Select a country…
            </option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="city">
            City <span className="hint">(optional)</span>
          </label>
          <input id="city" name="city" className="input" />
        </div>

        <div className="field">
          <label htmlFor="occupation">
            Occupation <span className="hint">(optional)</span>
          </label>
          <input id="occupation" name="occupation" className="input" />
        </div>

        <div className="field span-2">
          <label htmlFor="gender">
            Gender <span className="hint">(demographic)</span>
          </label>
          <select id="gender" name="gender" className="select" defaultValue="">
            <option value="" disabled>
              Prefer not to say
            </option>
            <option>Woman</option>
            <option>Man</option>
            <option>Non-binary</option>
            <option>Prefer to self-describe</option>
            <option>Prefer not to say</option>
          </select>
        </div>

        <div className="field span-2">
          <label htmlFor="message">
            Leave a message <span className="hint">(optional)</span>
          </label>
          <span className="hint" style={{ marginBottom: 2 }}>
            What do you hope humans remember in the age of AI?
          </span>
          <textarea
            id="message"
            name="message"
            className="textarea"
            rows={4}
            maxLength={500}
            placeholder="Your words may appear on the public message board."
          />
        </div>

        <div className="span-2">
          <SignaturePadField
            value={signature}
            onChange={setSignature}
            onStrokes={setStrokes}
          />
        </div>
      </div>

      {/* The captured signature (SVG data URL) submitted with the form. */}
      <input type="hidden" name="signature" value={signature} />

      {state.message && !state.ok && (
        <p className="notice notice-err" role="alert">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        className={`btn btn-primary btn-lg btn-block ${styles.signBtn}`}
        disabled={pending}
      >
        {pending ? "Signing…" : "Sign the Manifesto"}
        {!pending && <ArrowRight />}
      </button>
      <p className={styles.fineprint}>
        We use your details only in aggregate for demographics, and never share
        your email. By signing you agree to stay human with AI.
      </p>
    </form>
  );
}

function ArrowRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
