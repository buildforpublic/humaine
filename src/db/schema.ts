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

export type Signature = typeof signatures.$inferSelect;
export type NewSignature = typeof signatures.$inferInsert;
