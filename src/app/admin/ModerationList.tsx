"use client";

import { useState, useTransition } from "react";
import type { Signature } from "@/db/schema";
import {
  approveSignature,
  deleteSignature,
  unapproveSignature,
  updateMessage,
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
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(row.message ?? "");

  const run = (fn: () => Promise<void>) => startTransition(() => void fn());

  const saveMessage = () =>
    run(async () => {
      await updateMessage(row.id, draft);
      setEditing(false);
    });

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
            <span className={`${styles.tag} ${styles.tagOk}`}>visible</span>
          ) : (
            <span className={`${styles.tag} ${styles.tagPend}`}>hidden</span>
          )}
        </p>
        <p className={styles.meta}>
          {[row.email, row.occupation, [row.city, row.country].filter(Boolean).join(", "), row.gender]
            .filter(Boolean)
            .join(" · ")}
        </p>
        {editing ? (
          <div className={styles.editMessage}>
            <textarea
              className={styles.editArea}
              value={draft}
              disabled={pending}
              rows={3}
              autoFocus
              onChange={(e) => setDraft(e.target.value)}
              placeholder="No message"
            />
            <span className={styles.confirm}>
              <button
                className="btn btn-primary btn-sm"
                disabled={pending}
                onClick={saveMessage}
              >
                Save
              </button>
              <button
                className={styles.cancel}
                disabled={pending}
                onClick={() => {
                  setDraft(row.message ?? "");
                  setEditing(false);
                }}
              >
                Cancel
              </button>
            </span>
          </div>
        ) : (
          <p className={styles.message}>
            {row.message ? (
              `“${row.message}”`
            ) : (
              <span className={styles.messageEmpty}>No message</span>
            )}
            <button
              className={styles.editLink}
              disabled={pending}
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          </p>
        )}
      </div>

      <div className={styles.actions}>
        {row.approved ? (
          <button
            className="btn btn-secondary btn-sm"
            disabled={pending}
            onClick={() => run(() => unapproveSignature(row.id))}
          >
            Hide
          </button>
        ) : (
          <button
            className="btn btn-primary btn-sm"
            disabled={pending}
            onClick={() => run(() => approveSignature(row.id))}
          >
            Restore
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
