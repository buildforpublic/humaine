"use client";

import { useState, useTransition } from "react";
import type { Signature } from "@/db/schema";
import {
  approveSignature,
  deleteSignature,
  unapproveSignature,
} from "./actions";
import styles from "./admin.module.css";

export function ModerationList({ rows }: { rows: Signature[] }) {
  return (
    <ul className={styles.list}>
      {rows.map((r) => (
        <Row key={r.id} row={r} />
      ))}
    </ul>
  );
}

function Row({ row }: { row: Signature }) {
  const [pending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const run = (fn: () => Promise<void>) => startTransition(() => void fn());

  return (
    <li className={`${styles.row} ${pending ? styles.rowBusy : ""}`}>
      <div className={styles.sig}>
        {row.signature ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={row.signature} alt="signature" className={styles.sigImg} />
        ) : (
          <span className={styles.sigScript}>{row.name}</span>
        )}
      </div>

      <div className={styles.body}>
        <p className={styles.who}>
          <strong>{row.name}</strong>
          {row.anonymous && <span className={styles.tag}>anonymous</span>}
          {row.approved ? (
            <span className={`${styles.tag} ${styles.tagOk}`}>approved</span>
          ) : (
            <span className={`${styles.tag} ${styles.tagPend}`}>pending</span>
          )}
        </p>
        <p className={styles.meta}>
          {[row.email, row.occupation, [row.city, row.country].filter(Boolean).join(", "), row.gender]
            .filter(Boolean)
            .join(" · ")}
        </p>
        {row.message && <p className={styles.message}>“{row.message}”</p>}
      </div>

      <div className={styles.actions}>
        {row.approved ? (
          <button
            className="btn btn-secondary btn-sm"
            disabled={pending}
            onClick={() => run(() => unapproveSignature(row.id))}
          >
            Unapprove
          </button>
        ) : (
          <button
            className="btn btn-primary btn-sm"
            disabled={pending}
            onClick={() => run(() => approveSignature(row.id))}
          >
            Approve
          </button>
        )}

        {confirmDelete ? (
          <span className={styles.confirm}>
            <button
              className={styles.danger}
              disabled={pending}
              onClick={() => run(() => deleteSignature(row.id))}
            >
              Confirm delete
            </button>
            <button
              className={styles.cancel}
              disabled={pending}
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </button>
          </span>
        ) : (
          <button
            className={styles.deleteBtn}
            disabled={pending}
            onClick={() => setConfirmDelete(true)}
          >
            Delete
          </button>
        )}
      </div>
    </li>
  );
}
