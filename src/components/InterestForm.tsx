"use client";

import { useActionState } from "react";
import { submitInterest, type ActionState } from "@/app/actions";
import styles from "./InterestForm.module.css";

const initial: ActionState = { ok: false, message: "" };

export function InterestForm() {
  const [state, formAction, pending] = useActionState(submitInterest, initial);

  return (
    <form action={formAction} className={styles.form}>
      <label htmlFor="int-name" className="sr-only">
        Your name
      </label>
      <input
        id="int-name"
        name="name"
        required
        placeholder="Your name"
        className={`input ${styles.input}`}
      />
      <div className={styles.row}>
        <label htmlFor="int-email" className="sr-only">
          Email address
        </label>
        <input
          id="int-email"
          type="email"
          name="email"
          required
          placeholder="you@email.com"
          className={`input ${styles.input}`}
        />
        <button type="submit" className="btn btn-light" disabled={pending}>
          {pending ? "Sending…" : "I'm interested"}
        </button>
      </div>
      {state.message && (
        <p
          className={`${styles.msg} ${state.ok ? styles.ok : styles.err}`}
          role="status"
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
