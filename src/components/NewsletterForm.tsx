"use client";

import { useActionState } from "react";
import { subscribeNewsletter, type ActionState } from "@/app/actions";
import styles from "./NewsletterForm.module.css";

const initial: ActionState = { ok: false, message: "" };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    initial,
  );

  return (
    <form action={formAction} className={styles.form}>
      <label htmlFor="nl-email" className="sr-only">
        Email address
      </label>
      <input
        id="nl-email"
        type="email"
        name="email"
        required
        placeholder="you@email.com"
        className={`input ${styles.input}`}
      />
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Joining…" : "Sign Up"}
      </button>
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
