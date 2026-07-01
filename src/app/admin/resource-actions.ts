"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db, ensureSchema } from "@/db/client";
import { resources, type NewResource } from "@/db/schema";
import { seedResources } from "@/db/resources-seed";
import { assertAdmin } from "./auth";

export type ResourceFormState = { ok: boolean; error: string };

function clean(v: FormDataEntryValue | null, max: number): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim().slice(0, max);
  return t.length ? t : null;
}

function parseResource(formData: FormData): NewResource {
  const audiences = formData
    .getAll("audience")
    .map(String)
    .map((s) => s.trim())
    .filter(Boolean);
  const orderRaw = clean(formData.get("featuredOrder"), 6);
  const sortRaw = clean(formData.get("sortOrder"), 6);
  return {
    value: clean(formData.get("value"), 40) ?? "",
    type: clean(formData.get("type"), 40) ?? "",
    title: clean(formData.get("title"), 300) ?? "",
    source: clean(formData.get("source"), 200),
    origin: clean(formData.get("origin"), 60),
    length: clean(formData.get("length"), 40),
    audience: audiences.length ? audiences.join(", ") : null,
    oneLiner: clean(formData.get("oneLiner"), 500),
    link: clean(formData.get("link"), 500),
    notes: clean(formData.get("notes"), 1000),
    featured: formData.get("featured") === "on",
    featuredOrder: orderRaw ? Number(orderRaw) : null,
    featuredWhy: clean(formData.get("featuredWhy"), 300),
    published: formData.get("published") === "on",
    sortOrder: sortRaw ? Number(sortRaw) || 0 : 0,
  };
}

function validate(v: NewResource): string | null {
  if (!v.title) return "Title is required.";
  if (!v.value) return "Pick a value.";
  if (!v.type) return "Pick a format.";
  if (v.link && !/^https?:\/\//i.test(v.link))
    return "Link must be a full URL starting with http.";
  if (
    v.featuredOrder != null &&
    (Number.isNaN(v.featuredOrder) || v.featuredOrder < 1)
  )
    return "Featured order must be a positive number.";
  return null;
}

function revalidate(): void {
  revalidatePath("/resources");
  revalidatePath("/admin/resources");
}

export async function createResource(
  _prev: ResourceFormState,
  formData: FormData,
): Promise<ResourceFormState> {
  await assertAdmin();
  await ensureSchema();
  const v = parseResource(formData);
  const err = validate(v);
  if (err) return { ok: false, error: err };
  await db.insert(resources).values(v);
  revalidate();
  return { ok: true, error: "" };
}

export async function updateResource(
  _prev: ResourceFormState,
  formData: FormData,
): Promise<ResourceFormState> {
  await assertAdmin();
  await ensureSchema();
  const id = Number(formData.get("id"));
  if (!id) return { ok: false, error: "Missing resource id." };
  const v = parseResource(formData);
  const err = validate(v);
  if (err) return { ok: false, error: err };
  await db.update(resources).set(v).where(eq(resources.id, id));
  revalidate();
  return { ok: true, error: "" };
}

export async function deleteResource(id: number): Promise<void> {
  await assertAdmin();
  await ensureSchema();
  await db.delete(resources).where(eq(resources.id, id));
  revalidate();
}

export async function toggleResourcePublished(
  id: number,
  published: boolean,
): Promise<void> {
  await assertAdmin();
  await ensureSchema();
  await db.update(resources).set({ published }).where(eq(resources.id, id));
  revalidate();
}

/** One-click import of the 40 starter resources (only inserts if empty). */
export async function seedStarterResources(): Promise<void> {
  await assertAdmin();
  await seedResources();
  revalidate();
}
