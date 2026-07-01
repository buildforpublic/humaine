/**
 * One-off seed runner: `npm run db:seed`.
 * Uses the current TURSO_* env (defaults to file:local.db). Idempotent —
 * inserts the starter resources only when the table is empty.
 */
import { seedResources } from "./resources-seed";

seedResources()
  .then((n) => {
    console.log(
      n > 0
        ? `Seeded ${n} resources.`
        : "Resources table already has content — nothing to seed.",
    );
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
