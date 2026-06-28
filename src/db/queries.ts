import { and, asc, desc, eq, isNotNull, ne, sql } from "drizzle-orm";
import { db, ensureSchema } from "./client";
import { signatures, type Signature } from "./schema";

export type BoardMessage = {
  id: number;
  displayName: string;
  occupation: string | null;
  country: string | null;
  message: string;
  createdAt: Date;
};

export type WallSignature = {
  id: number;
  name: string;
  signature: string | null; // SVG data URL, or null ⇒ render name in cursive
  occupation: string | null;
  country: string | null;
};

/** Total number of people who have signed (drives the momentum counter). */
export async function getSignatureCount(): Promise<number> {
  await ensureSchema();
  const [row] = await db
    .select({ count: sql<number>`count(*)` })
    .from(signatures);
  return row?.count ?? 0;
}

/**
 * Visible, non-empty messages for the public board.
 * Anonymous signatures still show their message, but as "Anonymous".
 */
export async function getBoardMessages(limit = 60): Promise<BoardMessage[]> {
  await ensureSchema();
  const rows = await db
    .select()
    .from(signatures)
    .where(
      and(
        eq(signatures.approved, true),
        isNotNull(signatures.message),
        ne(signatures.message, ""),
      ),
    )
    .orderBy(desc(signatures.createdAt))
    .limit(limit);

  return rows.map((r) => ({
    id: r.id,
    displayName: r.anonymous ? "Anonymous" : r.name,
    occupation: r.anonymous ? null : r.occupation,
    country: r.country,
    message: r.message ?? "",
    createdAt: r.createdAt,
  }));
}

/**
 * Visible, non-anonymous signatures for the public signature wall.
 * Drawn entries carry an SVG data URL; "lazy" entries have `signature: null`
 * and are rendered as the signer's name in a cursive script.
 */
export async function getSignatureWall(limit = 80): Promise<WallSignature[]> {
  await ensureSchema();
  const rows = await db
    .select()
    .from(signatures)
    .where(and(eq(signatures.approved, true), eq(signatures.anonymous, false)))
    .orderBy(desc(signatures.createdAt))
    .limit(limit);

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    signature: r.signature ?? null,
    occupation: r.occupation,
    country: r.country,
  }));
}

/** All signatures for the admin moderation queue: hidden first, then newest. */
export async function getAdminSignatures(): Promise<Signature[]> {
  await ensureSchema();
  return db
    .select()
    .from(signatures)
    .orderBy(asc(signatures.approved), desc(signatures.createdAt));
}
