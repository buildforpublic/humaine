import { cookies } from "next/headers";

export const ADMIN_COOKIE = "humaine_admin";

/** The configured admin secret, or null if the env var is unset. */
export function adminSecret(): string | null {
  const s = process.env.ADMIN_SECRET;
  return s && s.length > 0 ? s : null;
}

/** Constant-time-ish string compare. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** True if the request carries a valid admin cookie. */
export async function isAdmin(): Promise<boolean> {
  const secret = adminSecret();
  if (!secret) return false;
  const cookie = (await cookies()).get(ADMIN_COOKIE)?.value;
  return !!cookie && safeEqual(cookie, secret);
}

/**
 * Authorize a server action. Server actions are public endpoints, so every
 * mutating admin action must call this — the page-level gate is not enough.
 */
export async function assertAdmin(): Promise<void> {
  if (!(await isAdmin())) throw new Error("Unauthorized");
}
