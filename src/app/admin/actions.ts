"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db, ensureSchema } from "@/db/client";
import { signatures } from "@/db/schema";
import { ADMIN_COOKIE, adminSecret, assertAdmin, isAdmin } from "./auth";

export type LoginState = { error: string };

/** Set the admin cookie if the submitted key matches ADMIN_SECRET. */
export async function adminLogin(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const secret = adminSecret();
  if (!secret) {
    return { error: "ADMIN_SECRET is not set on the server." };
  }
  const key = String(formData.get("key") ?? "");
  if (key !== secret) {
    return { error: "Incorrect key." };
  }
  (await cookies()).set(ADMIN_COOKIE, secret, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  revalidatePath("/admin");
  return { error: "" };
}

export async function adminLogout(): Promise<void> {
  (await cookies()).delete(ADMIN_COOKIE);
  revalidatePath("/admin");
}

async function setApproved(id: number, approved: boolean): Promise<void> {
  await assertAdmin();
  await ensureSchema();
  await db.update(signatures).set({ approved }).where(eq(signatures.id, id));
  revalidatePath("/admin");
  revalidatePath("/manifesto");
}

export async function approveSignature(id: number): Promise<void> {
  await setApproved(id, true);
}

export async function unapproveSignature(id: number): Promise<void> {
  await setApproved(id, false);
}

export async function updateMessage(id: number, message: string): Promise<void> {
  await assertAdmin();
  await ensureSchema();
  const trimmed = message.trim();
  await db
    .update(signatures)
    .set({ message: trimmed === "" ? null : trimmed })
    .where(eq(signatures.id, id));
  revalidatePath("/admin");
  revalidatePath("/manifesto");
}

export async function deleteSignature(id: number): Promise<void> {
  await assertAdmin();
  await ensureSchema();
  await db.delete(signatures).where(eq(signatures.id, id));
  revalidatePath("/admin");
  revalidatePath("/manifesto");
}

export { isAdmin };
