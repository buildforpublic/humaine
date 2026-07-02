import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const url = process.env.TURSO_DATABASE_URL ?? "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

export const client = createClient({ url, authToken });

export const db = drizzle(client, { schema });

/**
 * Idempotently ensure the tables exist. This lets local dev (file:local.db)
 * and a fresh Turso database work without a separate migration step.
 * For schema *changes* over time, use Drizzle migrations (`npm run db:push`).
 */
let ensured: Promise<void> | null = null;
export function ensureSchema(): Promise<void> {
  if (!ensured) {
    ensured = (async () => {
      await client.batch(
        [
          `CREATE TABLE IF NOT EXISTS signatures (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            gender TEXT,
            country TEXT,
            city TEXT,
            occupation TEXT,
            anonymous INTEGER NOT NULL DEFAULT 0,
            message TEXT,
            signature TEXT,
            approved INTEGER NOT NULL DEFAULT 1,
            created_at INTEGER NOT NULL DEFAULT (unixepoch())
          )`,
          `CREATE TABLE IF NOT EXISTS newsletter (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            created_at INTEGER NOT NULL DEFAULT (unixepoch())
          )`,
          `CREATE TABLE IF NOT EXISTS interest (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            created_at INTEGER NOT NULL DEFAULT (unixepoch())
          )`,
          `CREATE TABLE IF NOT EXISTS resources (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            value TEXT NOT NULL,
            type TEXT NOT NULL,
            title TEXT NOT NULL,
            source TEXT,
            origin TEXT,
            length TEXT,
            audience TEXT,
            one_liner TEXT,
            link TEXT,
            notes TEXT,
            featured INTEGER NOT NULL DEFAULT 0,
            featured_order INTEGER,
            featured_why TEXT,
            published INTEGER NOT NULL DEFAULT 1,
            sort_order INTEGER NOT NULL DEFAULT 0,
            created_at INTEGER NOT NULL DEFAULT (unixepoch())
          )`,
        ],
        "write",
      );
      // Idempotent migration for databases created before `signature` existed.
      try {
        await client.execute(
          "ALTER TABLE signatures ADD COLUMN signature TEXT",
        );
      } catch {
        // Column already exists — nothing to do.
      }
    })();
  }
  return ensured;
}
