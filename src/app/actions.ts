"use server";

import { revalidatePath } from "next/cache";
import { db, ensureSchema } from "@/db/client";
import { interest, newsletter, signatures } from "@/db/schema";

export type ActionState = {
  ok: boolean;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: FormDataEntryValue | null, max = 280): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim().slice(0, max);
  return t.length ? t : null;
}

/** Sign the manifesto. Entries appear immediately; admins can hide/remove later. */
export async function signManifesto(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = clean(formData.get("name"), 120);
  const email = clean(formData.get("email"), 200);
  const anonymous = formData.get("anonymous") === "on";

  if (!name) return { ok: false, message: "Please enter your name." };
  if (!email || !EMAIL_RE.test(email))
    return { ok: false, message: "Please enter a valid email address." };

  // Drawn signature: an image data URL (or absent for the "typed name" default).
  const rawSignature = formData.get("signature");
  const signature =
    typeof rawSignature === "string" &&
    rawSignature.startsWith("data:image/") &&
    rawSignature.length <= 600_000
      ? rawSignature
      : null;

  try {
    await ensureSchema();
    await db.insert(signatures).values({
      name,
      email,
      gender: clean(formData.get("gender"), 40),
      country: clean(formData.get("country"), 80),
      city: clean(formData.get("city"), 80),
      occupation: clean(formData.get("occupation"), 120),
      anonymous,
      message: clean(formData.get("message"), 500),
      signature,
      approved: true,
    });
    revalidatePath("/manifesto");
    return {
      ok: true,
      message:
        "Thank you for signing. Your name has been added to the movement.",
    };
  } catch (err) {
    console.error("signManifesto failed", err);
    return {
      ok: false,
      message: "Something went wrong saving your signature. Please try again.",
    };
  }
}

/** "Be an active member" interest capture (homepage). */
export async function submitInterest(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = clean(formData.get("name"), 120);
  const email = clean(formData.get("email"), 200);
  if (!name) return { ok: false, message: "Please enter your name." };
  if (!email || !EMAIL_RE.test(email))
    return { ok: false, message: "Please enter a valid email address." };

  try {
    await ensureSchema();
    await db
      .insert(interest)
      .values({ name, email })
      .onConflictDoNothing({ target: interest.email });
    return {
      ok: true,
      message: "Thanks! We'll reach out with ways to get involved.",
    };
  } catch (err) {
    console.error("submitInterest failed", err);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}

/** Newsletter sign-up (homepage). */
export async function subscribeNewsletter(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = clean(formData.get("email"), 200);
  if (!email || !EMAIL_RE.test(email))
    return { ok: false, message: "Please enter a valid email address." };

  try {
    await ensureSchema();
    await db
      .insert(newsletter)
      .values({ email })
      .onConflictDoNothing({ target: newsletter.email });
    return { ok: true, message: "You're on the list. Welcome." };
  } catch (err) {
    console.error("subscribeNewsletter failed", err);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}
