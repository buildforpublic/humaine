/**
 * The four HumAIne values the Resource Bank is organised under. Stable brand
 * config (not user-editable at launch), so it lives in code rather than the DB.
 * Colours map to the existing brand tokens in globals.css.
 */
export type ValueKey = "purposeful" | "active" | "agency" | "humanness";

export type ValueMeta = {
  key: ValueKey;
  name: string;
  vs: string;
  /** CSS custom property used for the section accent. */
  color: string;
  order: number;
};

export const VALUES: readonly ValueMeta[] = [
  {
    key: "purposeful",
    name: "Purposeful Use",
    vs: "over Passive Consumption",
    color: "var(--amber)",
    order: 1,
  },
  {
    key: "active",
    name: "Active Thinking",
    vs: "over Replacement of Thinking",
    color: "var(--moss)",
    order: 2,
  },
  {
    key: "agency",
    name: "Human Agency",
    vs: "over Total Trust on Algorithms",
    color: "var(--terracotta)",
    order: 3,
  },
  {
    key: "humanness",
    name: "Deepen Humanness",
    vs: "over Efficiency-at-all-costs",
    color: "var(--rose)",
    order: 4,
  },
] as const;

export const VALUE_KEYS = VALUES.map((v) => v.key);

/** Resource formats (the `type` field). */
export const TYPES = [
  "Article",
  "Podcast",
  "Video",
  "Research",
  "Tool",
  "Column",
  "Report",
  "Course",
  "Builder",
] as const;

/** Canonical origin buckets that drive the source-mix bar and origin filter. */
export const ORIGINS = [
  "HumAIne",
  "HumAIne-affiliated",
  "Independent",
  "Industry",
  "Academic",
] as const;

/** Audience tags (a resource can carry more than one). */
export const AUDIENCES = [
  "Everyone",
  "Leaders",
  "Educators",
  "Entrepreneurs",
  "Policymakers",
  "Researchers",
] as const;

export type ResourceType = (typeof TYPES)[number];
export type Origin = (typeof ORIGINS)[number];
export type Audience = (typeof AUDIENCES)[number];
