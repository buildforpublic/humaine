import { db, ensureSchema } from "@/db/client";
import { interest, signatures } from "@/db/schema";
import { desc } from "drizzle-orm";
import { isAdmin } from "../auth";

export const dynamic = "force-dynamic";

/** Serialise a row of values into one CSV line (RFC-4180 quoting). */
function csvLine(values: (string | number | null | boolean)[]): string {
  return values
    .map((v) => {
      if (v === null || v === undefined) return "";
      const s = typeof v === "boolean" ? (v ? "yes" : "no") : String(v);
      return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    })
    .join(",");
}

function csvResponse(filename: string, rows: string[]): Response {
  // Prepend a UTF-8 BOM so Excel opens accented names correctly.
  const body = "﻿" + rows.join("\r\n") + "\r\n";
  return new Response(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

function stamp(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return new Response("Unauthorized", { status: 401 });
  }

  await ensureSchema();
  const type = new URL(request.url).searchParams.get("type");

  if (type === "interest") {
    const rows = await db
      .select()
      .from(interest)
      .orderBy(desc(interest.createdAt));
    const lines = [csvLine(["id", "name", "email", "created_at"])];
    for (const r of rows) {
      lines.push(csvLine([r.id, r.name, r.email, r.createdAt.toISOString()]));
    }
    return csvResponse(`humaine-interest-${stamp(new Date())}.csv`, lines);
  }

  if (type === "signatures") {
    const rows = await db
      .select()
      .from(signatures)
      .orderBy(desc(signatures.createdAt));
    const lines = [
      csvLine([
        "id",
        "name",
        "email",
        "anonymous",
        "gender",
        "country",
        "city",
        "occupation",
        "message",
        "approved",
        "created_at",
      ]),
    ];
    for (const r of rows) {
      lines.push(
        csvLine([
          r.id,
          r.name,
          r.email,
          r.anonymous,
          r.gender,
          r.country,
          r.city,
          r.occupation,
          r.message,
          r.approved,
          r.createdAt.toISOString(),
        ]),
      );
    }
    return csvResponse(`humaine-signatures-${stamp(new Date())}.csv`, lines);
  }

  return new Response("Unknown export type. Use ?type=signatures or ?type=interest.", {
    status: 400,
  });
}
