import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Every person who signs the HumAIne Manifesto.
 * Demographic fields are optional and used only in aggregate.
 * `approved` gates whether an entry appears publicly; new entries are visible by
 * default and can be hidden during post-moderation.
 */
export const signatures = sqliteTable("signatures", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  gender: text("gender"),
  country: text("country"),
  city: text("city"),
  occupation: text("occupation"),
  // If true, the name is hidden on the public board (shown as "Anonymous").
  anonymous: integer("anonymous", { mode: "boolean" }).notNull().default(false),
  // Answer to: "What do you hope humans remember in the age of AI?"
  message: text("message"),
  // Drawn signature as an SVG data URL. NULL ⇒ "typed" (render name in cursive).
  signature: text("signature"),
  // Post-moderation: hidden entries are removed from the public wall/board.
  approved: integer("approved", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const newsletter = sqliteTable("newsletter", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

/**
 * The curated Resource Bank. Admin-managed content (not public submissions), so
 * there is no moderation queue; `published` lets editors draft or hide a row.
 * Resources are grouped on the public page under the four HumAIne `value`s
 * (see src/db/resource-values.ts). The six "Start Here" picks are the rows with
 * `featured = true`, ordered by `featuredOrder`.
 */
export const resources = sqliteTable("resources", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  // One of the four value keys: purposeful | active | agency | humanness.
  value: text("value").notNull(),
  // Article | Podcast | Video | Research | Tool | Column | Report.
  type: text("type").notNull(),
  title: text("title").notNull(),
  source: text("source"),
  // Normalized bucket for the source-mix bar / origin filter:
  // HumAIne | HumAIne-affiliated | Independent | Industry | Academic.
  origin: text("origin"),
  length: text("length"),
  // Comma-separated audiences (SQLite has no arrays); split to aud[] on read.
  audience: text("audience"),
  oneLiner: text("one_liner"),
  link: text("link"),
  // Internal-only editorial notes; never sent to the public page.
  notes: text("notes"),
  // Start Here rail membership + ordering + the "why start here" line.
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  featuredOrder: integer("featured_order"),
  featuredWhy: text("featured_why"),
  // Draft/publish: only published rows render publicly.
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  // Manual ordering within a value section (lower = earlier).
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type Signature = typeof signatures.$inferSelect;
export type NewSignature = typeof signatures.$inferInsert;
export type Resource = typeof resources.$inferSelect;
export type NewResource = typeof resources.$inferInsert;
