import { and, asc, desc, eq, isNotNull, ne, sql } from "drizzle-orm";
import { db, ensureSchema } from "./client";
import {
  interest,
  resources,
  signatures,
  type Interest,
  type Resource,
  type Signature,
} from "./schema";
import { VALUES, type ValueMeta } from "./resource-values";

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

/** All "active member" interest sign-ups for the admin dashboard, newest first. */
export async function getInterest(): Promise<Interest[]> {
  await ensureSchema();
  return db.select().from(interest).orderBy(desc(interest.createdAt));
}

/* ---------------------------------------------------------------------------
   Resource Bank
   ------------------------------------------------------------------------- */

/** A resource as rendered on the public page. `notes` is intentionally omitted. */
export type PublicResource = {
  id: number;
  value: string;
  type: string;
  title: string;
  source: string | null;
  origin: string | null;
  length: string | null;
  aud: string[];
  oneLiner: string | null;
  link: string | null;
  featured: boolean;
  featuredOrder: number | null;
  featuredWhy: string | null;
};

/** Everything the public Resource Bank page needs to render and filter. */
export type ResourceBank = {
  values: ValueMeta[];
  valueOrder: string[];
  types: string[];
  origins: string[];
  audiences: string[];
  resources: PublicResource[];
  featured: PublicResource[];
};

function splitAudience(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function toPublic(r: Resource): PublicResource {
  return {
    id: r.id,
    value: r.value,
    type: r.type,
    title: r.title,
    source: r.source,
    origin: r.origin,
    length: r.length,
    aud: splitAudience(r.audience),
    oneLiner: r.oneLiner,
    link: r.link,
    featured: r.featured,
    featuredOrder: r.featuredOrder,
    featuredWhy: r.featuredWhy,
  };
}

/**
 * Published resources plus the derived filter option sets, in the brief's shape.
 * Filter options (types/origins/audiences) are derived from the live rows, so a
 * new option added in the admin flows to the page filters with no code change.
 */
export async function getPublicResources(): Promise<ResourceBank> {
  await ensureSchema();
  const valueRank = new Map<string, number>(VALUES.map((v) => [v.key, v.order]));

  const rows = (
    await db
      .select()
      .from(resources)
      .where(eq(resources.published, true))
      .orderBy(asc(resources.sortOrder), asc(resources.id))
  ).map(toPublic);

  // Order resources by value section, then by their manual sort order.
  rows.sort((a, b) => {
    const va = valueRank.get(a.value) ?? 99;
    const vb = valueRank.get(b.value) ?? 99;
    return va - vb;
  });

  const types = [...new Set(rows.map((r) => r.type))];
  const origins = [...new Set(rows.map((r) => r.origin).filter(Boolean))] as string[];
  const audiences = [...new Set(rows.flatMap((r) => r.aud))];

  const featured = rows
    .filter((r) => r.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));

  return {
    values: [...VALUES],
    valueOrder: VALUES.map((v) => v.key),
    types,
    origins,
    audiences,
    resources: rows,
    featured,
  };
}

/** All resources for the admin dashboard: by value section, then manual order. */
export async function getAdminResources(): Promise<Resource[]> {
  await ensureSchema();
  const rows = await db
    .select()
    .from(resources)
    .orderBy(asc(resources.sortOrder), asc(resources.id));
  const valueRank = new Map<string, number>(VALUES.map((v) => [v.key, v.order]));
  return rows.sort(
    (a, b) => (valueRank.get(a.value) ?? 99) - (valueRank.get(b.value) ?? 99),
  );
}
