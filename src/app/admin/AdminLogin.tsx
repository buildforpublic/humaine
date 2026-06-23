"use client";

import { useActionState } from "react";
import { adminLogin, type LoginState } from "./actions";
import styles from "./admin.module.css";

const initial: LoginState = { error: "" };

export function AdminLogin({ configured }: { configured: boolean }) {
  const [state, formAction, pending] = useActionState(adminLogin, initial);

  return (
    <form action={formAction} className={`card ${styles.login}`}>
      <p className="eyebrow">HumAIne admin</p>
      <h1 className={styles.title}>Enter admin key</h1>
      {!configured && (
        <p className="notice notice-err">
          <code>ADMIN_SECRET</code> is not set on the server. Set it in your
          environment to enable the admin.
        </p>
      )}
      <div className="field">
        <label htmlFor="key">Admin key</label>
        <input
          id="key"
          name="key"
          type="password"
          className="input"
          autoComplete="off"
          autoFocus
        />
      </div>
      {state.error && (
        <p className="notice notice-err" role="alert">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={pending || !configured}
      >
        {pending ? "Checking…" : "Unlock"}
      </button>
    </form>
  );
}
