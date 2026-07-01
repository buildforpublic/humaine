"use client";

import { useMemo, useState } from "react";
import type { PublicResource, ResourceBank } from "@/db/queries";
import styles from "./ResourceExplorer.module.css";

/** Origin bucket -> swatch colour for the source-mix bar + legend. */
const ORIGIN_COLORS: Record<string, string> = {
  HumAIne: "var(--amber)",
  "HumAIne-affiliated": "var(--accent-hover)",
  Independent: "var(--moss)",
  Industry: "var(--terracotta)",
  Academic: "var(--rose)",
};

function toggle(set: Set<string>, key: string): Set<string> {
  const next = new Set(set);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  return next;
}

export function ResourceExplorer({ data }: { data: ResourceBank }) {
  const [query, setQuery] = useState("");
  const [values, setValues] = useState<Set<string>>(new Set());
  const [types, setTypes] = useState<Set<string>>(new Set());
  const [audiences, setAudiences] = useState<Set<string>>(new Set());
  const [origins, setOrigins] = useState<Set<string>>(new Set());

  const valueMeta = useMemo(
    () => new Map<string, (typeof data.values)[number]>(
      data.values.map((v) => [v.key, v]),
    ),
    [data.values],
  );

  const q = query.trim().toLowerCase();
  const hasFilters =
    q !== "" ||
    values.size > 0 ||
    types.size > 0 ||
    audiences.size > 0 ||
    origins.size > 0;

  const matches = (r: PublicResource): boolean => {
    if (values.size && !values.has(r.value)) return false;
    if (types.size && !types.has(r.type)) return false;
    if (origins.size && (!r.origin || !origins.has(r.origin))) return false;
    if (audiences.size && !r.aud.some((a) => audiences.has(a))) return false;
    if (q) {
      const hay = [r.title, r.source, r.oneLiner, r.type, r.origin, ...r.aud]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  };

  const filtered = useMemo(
    () => data.resources.filter(matches),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.resources, q, values, types, audiences, origins],
  );

  // Source-mix reflects the full published dataset (independent of filters).
  const mix = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of data.resources) {
      if (!r.origin) continue;
      counts.set(r.origin, (counts.get(r.origin) ?? 0) + 1);
    }
    const total = data.resources.length || 1;
    return data.origins.map((o) => ({
      origin: o,
      count: counts.get(o) ?? 0,
      pct: Math.round(((counts.get(o) ?? 0) / total) * 100),
    }));
  }, [data.resources, data.origins]);

  const clearAll = () => {
    setQuery("");
    setValues(new Set());
    setTypes(new Set());
    setAudiences(new Set());
    setOrigins(new Set());
  };

  return (
    <>
      {/* --------------------------------------------------- START HERE RAIL */}
      {data.featured.length > 0 && (
        <section className={`section-tight ${styles.startBand}`}>
          <div className="container">
            <div className={styles.railHead}>
              <h2>Start here</h2>
              <p>New to this? These six are the shortest path in.</p>
            </div>
            <ol className={styles.rail}>
              {data.featured.map((r, i) => {
                const meta = valueMeta.get(r.value);
                return (
                  <li key={r.id}>
                    <a
                      href={r.link ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.railCard}
                      style={{ ["--accent-value" as string]: meta?.color }}
                    >
                      <span className={styles.railNum}>{i + 1}</span>
                      <span className={styles.railType}>{r.type}</span>
                      <strong className={styles.railTitle}>{r.title}</strong>
                      <span className={styles.railWhy}>
                        {r.featuredWhy ?? r.oneLiner}
                      </span>
                      <span className={styles.railMeta}>
                        {[r.source, r.length].filter(Boolean).join(" · ")}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------- CONTROLS */}
      <section className="section">
        <div className="container">
          {/* source-mix bar */}
          <div className={styles.mixWrap} aria-label="Source mix">
            <div className={styles.mixLabel}>
              Where these come from
              <span>{data.resources.length} resources</span>
            </div>
            <div className={styles.mixBar}>
              {mix.map(
                (m) =>
                  m.count > 0 && (
                    <span
                      key={m.origin}
                      className={styles.mixSeg}
                      style={{
                        width: `${m.pct}%`,
                        background: ORIGIN_COLORS[m.origin] ?? "var(--muted)",
                      }}
                      title={`${m.origin}: ${m.count}`}
                    />
                  ),
              )}
            </div>
            <ul className={styles.mixLegend}>
              {mix.map((m) => (
                <li key={m.origin}>
                  <span
                    className={styles.dot}
                    style={{ background: ORIGIN_COLORS[m.origin] ?? "var(--muted)" }}
                  />
                  {m.origin} <em>{m.count}</em>
                </li>
              ))}
            </ul>
          </div>

          {/* search */}
          <div className={styles.searchRow}>
            <input
              type="search"
              className="input"
              placeholder="Search titles, authors, topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search resources"
            />
            {hasFilters && (
              <button type="button" className="btn btn-secondary" onClick={clearAll}>
                Clear
              </button>
            )}
          </div>

          {/* filters */}
          <div className={styles.filters}>
            <FilterGroup label="Value">
              {data.values.map((v) => (
                <button
                  key={v.key}
                  type="button"
                  className={`${styles.chip} ${values.has(v.key) ? styles.chipOn : ""}`}
                  style={{ ["--accent-value" as string]: v.color }}
                  aria-pressed={values.has(v.key)}
                  onClick={() => setValues((s) => toggle(s, v.key))}
                >
                  {v.name}
                </button>
              ))}
            </FilterGroup>

            <FilterGroup label="Format">
              {data.types.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  on={types.has(t)}
                  onClick={() => setTypes((s) => toggle(s, t))}
                />
              ))}
            </FilterGroup>

            <FilterGroup label="For">
              {data.audiences.map((a) => (
                <Chip
                  key={a}
                  label={a}
                  on={audiences.has(a)}
                  onClick={() => setAudiences((s) => toggle(s, a))}
                />
              ))}
            </FilterGroup>

            <FilterGroup label="Source">
              {data.origins.map((o) => (
                <Chip
                  key={o}
                  label={o}
                  on={origins.has(o)}
                  onClick={() => setOrigins((s) => toggle(s, o))}
                />
              ))}
            </FilterGroup>
          </div>

          <p className={styles.count}>
            {filtered.length} of {data.resources.length} shown
          </p>

          {/* ------------------------------------------- GRID GROUPED BY VALUE */}
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <p>No resources match those filters.</p>
              <button type="button" className="btn btn-secondary" onClick={clearAll}>
                Clear filters
              </button>
            </div>
          ) : (
            data.values.map((v) => {
              const group = filtered.filter((r) => r.value === v.key);
              if (group.length === 0) return null;
              return (
                <section
                  key={v.key}
                  className={styles.valueSection}
                  style={{ ["--accent-value" as string]: v.color }}
                >
                  <header className={styles.valueHead}>
                    <h3>{v.name}</h3>
                    <span>{v.vs}</span>
                  </header>
                  <ul className={styles.cards}>
                    {group.map((r) => (
                      <ResourceCard key={r.id} r={r} />
                    ))}
                  </ul>
                </section>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.filterGroup}>
      <span className={styles.filterLabel}>{label}</span>
      <div className={styles.chips}>{children}</div>
    </div>
  );
}

function Chip({
  label,
  on,
  onClick,
}: {
  label: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`${styles.chip} ${on ? styles.chipOn : ""}`}
      aria-pressed={on}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function ResourceCard({ r }: { r: PublicResource }) {
  const body = (
    <>
      <div className={styles.cardTop}>
        <span className={styles.cardType}>{r.type}</span>
        {r.length && <span className={styles.cardLen}>{r.length}</span>}
      </div>
      <strong className={styles.cardTitle}>{r.title}</strong>
      {r.source && <span className={styles.cardSource}>{r.source}</span>}
      {r.oneLiner && <p className={styles.cardLiner}>{r.oneLiner}</p>}
      {r.aud.length > 0 && (
        <ul className={styles.audTags}>
          {r.aud.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      )}
    </>
  );

  return (
    <li className={styles.card}>
      {r.link ? (
        <a href={r.link} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
          {body}
          <span className={styles.cardArrow} aria-hidden="true">
            Open ↗
          </span>
        </a>
      ) : (
        <div className={styles.cardLink}>{body}</div>
      )}
    </li>
  );
}
