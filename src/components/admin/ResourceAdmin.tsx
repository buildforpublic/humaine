"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import type { Resource } from "@/db/schema";
import { AUDIENCES, ORIGINS, TYPES, VALUES } from "@/db/resource-values";
import {
  createResource,
  deleteResource,
  seedStarterResources,
  toggleResourcePublished,
  updateResource,
  type ResourceFormState,
} from "@/app/admin/resource-actions";
import styles from "./ResourceAdmin.module.css";

const initialState: ResourceFormState = { ok: false, error: "" };
const valueName = (key: string) =>
  VALUES.find((v) => v.key === key)?.name ?? key;

export function ResourceAdmin({ rows }: { rows: Resource[] }) {
  const [adding, setAdding] = useState(false);

  if (rows.length === 0 && !adding) {
    return (
      <div className={styles.empty}>
        <p className="muted">No resources yet.</p>
        <div className={styles.emptyActions}>
          <button className="btn btn-primary" onClick={() => setAdding(true)}>
            Add the first resource
          </button>
          <SeedButton />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.toolbar}>
        {adding ? (
          <span className="muted">Adding a new resource…</span>
        ) : (
          <button className="btn btn-primary btn-sm" onClick={() => setAdding(true)}>
            + Add resource
          </button>
        )}
      </div>

      {adding && (
        <ResourceForm onDone={() => setAdding(false)} />
      )}

      <ul className={styles.list}>
        {rows.map((r) => (
          <Row key={r.id} row={r} />
        ))}
      </ul>
    </div>
  );
}

function SeedButton() {
  const [pending, start] = useTransition();
  return (
    <button
      className="btn btn-secondary"
      disabled={pending}
      onClick={() => start(() => void seedStarterResources())}
    >
      {pending ? "Importing…" : "Import 40 starter resources"}
    </button>
  );
}

function Row({ row }: { row: Resource }) {
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [pending, start] = useTransition();

  if (editing) {
    return (
      <li className={styles.item}>
        <ResourceForm resource={row} onDone={() => setEditing(false)} />
      </li>
    );
  }

  return (
    <li className={`${styles.item} ${pending ? styles.busy : ""}`}>
      <div className={styles.summary}>
        <div className={styles.badges}>
          <span className={styles.value}>{valueName(row.value)}</span>
          <span className={styles.type}>{row.type}</span>
          {row.featured && (
            <span className={styles.featured}>
              ★ Start Here{row.featuredOrder ? ` #${row.featuredOrder}` : ""}
            </span>
          )}
          {!row.published && <span className={styles.draft}>Hidden</span>}
        </div>
        <strong className={styles.title}>{row.title}</strong>
        <span className={styles.meta}>
          {[row.source, row.origin, row.length].filter(Boolean).join(" · ")}
        </span>
        {row.oneLiner && <p className={styles.liner}>{row.oneLiner}</p>}
      </div>

      <div className={styles.actions}>
        <button
          className="btn btn-secondary btn-sm"
          disabled={pending}
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
        <button
          className="btn btn-ghost btn-sm"
          disabled={pending}
          onClick={() =>
            start(() => void toggleResourcePublished(row.id, !row.published))
          }
        >
          {row.published ? "Hide" : "Publish"}
        </button>
        {confirmDelete ? (
          <span className={styles.confirm}>
            <button
              className={styles.danger}
              disabled={pending}
              onClick={() => start(() => void deleteResource(row.id))}
            >
              Confirm
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

function ResourceForm({
  resource,
  onDone,
}: {
  resource?: Resource;
  onDone: () => void;
}) {
  const action = resource ? updateResource : createResource;
  const [state, formAction, pending] = useActionState(action, initialState);
  const selectedAud = new Set(
    (resource?.audience ?? "").split(",").map((s) => s.trim()).filter(Boolean),
  );

  useEffect(() => {
    if (state.ok) onDone();
  }, [state.ok, onDone]);

  return (
    <form action={formAction} className={styles.form}>
      {resource && <input type="hidden" name="id" value={resource.id} />}

      <div className="form-grid">
        <div className="field span-2">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            className="input"
            defaultValue={resource?.title ?? ""}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="value">Value</label>
          <select
            id="value"
            name="value"
            className="select"
            defaultValue={resource?.value ?? ""}
            required
          >
            <option value="" disabled>
              Choose…
            </option>
            {VALUES.map((v) => (
              <option key={v.key} value={v.key}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="type">Format</label>
          <select
            id="type"
            name="type"
            className="select"
            defaultValue={resource?.type ?? ""}
            required
          >
            <option value="" disabled>
              Choose…
            </option>
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="source">Source</label>
          <input
            id="source"
            name="source"
            className="input"
            defaultValue={resource?.source ?? ""}
            placeholder="Author / publisher"
          />
        </div>

        <div className="field">
          <label htmlFor="origin">Origin</label>
          <select
            id="origin"
            name="origin"
            className="select"
            defaultValue={resource?.origin ?? ""}
          >
            <option value="">—</option>
            {ORIGINS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="length">Length</label>
          <input
            id="length"
            name="length"
            className="input"
            defaultValue={resource?.length ?? ""}
            placeholder="12 min"
          />
        </div>

        <div className="field">
          <label htmlFor="link">Link</label>
          <input
            id="link"
            name="link"
            type="url"
            className="input"
            defaultValue={resource?.link ?? ""}
            placeholder="https://…"
          />
        </div>

        <div className="field span-2">
          <label>Audience</label>
          <div className={styles.audGrid}>
            {AUDIENCES.map((a) => (
              <label key={a} className={styles.audCheck}>
                <input
                  type="checkbox"
                  name="audience"
                  value={a}
                  defaultChecked={selectedAud.has(a)}
                />
                {a}
              </label>
            ))}
          </div>
        </div>

        <div className="field span-2">
          <label htmlFor="oneLiner">One-liner</label>
          <textarea
            id="oneLiner"
            name="oneLiner"
            className="textarea"
            rows={2}
            defaultValue={resource?.oneLiner ?? ""}
            placeholder="One sentence shown on the card. No em dashes."
          />
        </div>

        <div className="field span-2">
          <label htmlFor="notes">
            Notes <span className="hint">(internal only, never shown publicly)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            className="textarea"
            rows={2}
            defaultValue={resource?.notes ?? ""}
          />
        </div>
      </div>

      <fieldset className={styles.featuredBox}>
        <label className="checkbox">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={resource?.featured ?? false}
          />
          Feature in the “Start Here” rail
        </label>
        <div className={styles.featuredFields}>
          <div className="field">
            <label htmlFor="featuredOrder">Order</label>
            <input
              id="featuredOrder"
              name="featuredOrder"
              type="number"
              min={1}
              className="input"
              defaultValue={resource?.featuredOrder ?? ""}
              placeholder="1"
            />
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label htmlFor="featuredWhy">Why start here</label>
            <input
              id="featuredWhy"
              name="featuredWhy"
              className="input"
              defaultValue={resource?.featuredWhy ?? ""}
              placeholder="Falls back to the one-liner if blank."
            />
          </div>
        </div>
      </fieldset>

      <label className="checkbox">
        <input
          type="checkbox"
          name="published"
          defaultChecked={resource ? resource.published : true}
        />
        Published (visible on the public page)
      </label>

      {state.error && (
        <p className="notice notice-err" role="alert">
          {state.error}
        </p>
      )}

      <div className={styles.formActions}>
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Saving…" : resource ? "Save changes" : "Add resource"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onDone}>
          Cancel
        </button>
      </div>
    </form>
  );
}
