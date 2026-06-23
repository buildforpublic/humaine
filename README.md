# HumAIne Movement — humaine-movement.com

A two-page movement site:

- **Homepage** (`/`) — the why, the what, founding members, follow the movement + newsletter.
- **Manifesto** (`/manifesto`) — the manifesto values & principles, a sign form, a live signature count, and a custom message board.

Built with **Next.js (App Router) + React 19**, styled with a design system
extracted from [givingwhatwecan.org](https://www.givingwhatwecan.org/) (see
[`DESIGN.md`](DESIGN.md)). Signatures are stored in **Turso (libSQL)** via
**Drizzle ORM**. Deploys to **Vercel**.

---

## Quick start (local)

```bash
npm install
cp .env.local.example .env.local      # defaults to a local SQLite file
npm run dev                            # http://localhost:3000
```

With the default `TURSO_DATABASE_URL=file:local.db`, the app creates a local
SQLite database and tables automatically on first request — no extra setup to
develop locally.

## Project structure

```
src/
  app/
    layout.tsx          # fonts (Fraunces + Manrope), Nav + Footer
    globals.css         # design tokens (extracted from GWWC) + components
    page.tsx            # Homepage
    home.module.css
    manifesto/page.tsx  # Manifesto + sign + board
    actions.ts          # server actions: signManifesto, subscribeNewsletter
  components/            # Nav, Footer, Logo, SignForm, MessageBoard, NewsletterForm
  content.ts            # founding members, values, principles (edit copy here)
  db/
    schema.ts           # signatures + newsletter tables
    client.ts           # libSQL client + ensureSchema()
    queries.ts          # board + count reads
```

## Data model

`signatures` — `name`, `email`, `gender?`, `country?`, `city?`, `occupation?`,
`anonymous`, `message?`, `approved`, `created_at`.

**Moderation is approve-first:** a message only appears on the public board when
its `approved` flag is `true`. Every signature still counts toward the momentum
counter immediately.

### Approving messages — the `/admin` queue

Go to **`/admin`** and enter your `ADMIN_SECRET`. You get a moderation queue of
every signature (pending first), each showing the person, their message, and a
preview of their signature (the drawing, or their name in cursive). Buttons:

- **Approve** — publishes the message (to the board) and the signature (to the
  wall, unless they signed anonymously).
- **Unapprove** — pulls it back off the public pages.
- **Delete** — removes the row entirely (two-step confirm).

Set `ADMIN_SECRET` in `.env.local` (local) and in Vercel's env vars (prod). The
gate is a single shared key stored in an httpOnly cookie; every action
re-checks it server-side. The `/admin` route is `noindex`.

> Prefer raw SQL? Drizzle Studio still works: `npm run db:studio`, or
> `UPDATE signatures SET approved = 1 WHERE id = …;`.

## Deploying to Vercel + Turso

1. **Create a Turso database**
   ```bash
   turso db create humaine
   turso db show humaine --url          # → TURSO_DATABASE_URL
   turso db tokens create humaine       # → TURSO_AUTH_TOKEN
   ```
2. **Push the schema** to it:
   ```bash
   TURSO_DATABASE_URL=… TURSO_AUTH_TOKEN=… npm run db:push
   ```
   (Tables also auto-create on first request, but `db:push` keeps migrations clean.)
3. **Import the repo into Vercel** and set the env vars `TURSO_DATABASE_URL`,
   `TURSO_AUTH_TOKEN`, and `ADMIN_SECRET` (a long random string for `/admin`) in
   the project settings.
4. **Point the domain.** In Vercel → Project → Domains, add `humaine-movement.com`.
   In **Namecheap** → Domain → *Advanced DNS*, add the records Vercel shows you
   (typically an `A` record `@ → 76.76.21.21` and a `CNAME` `www → cname.vercel-dns.com`).
   DNS propagates within minutes to a few hours.

## Customizing

- **Copy / founding members / principles** → [`src/content.ts`](src/content.ts).
- **Colors, fonts, spacing** → `:root` in [`src/app/globals.css`](src/app/globals.css) (documented in `DESIGN.md`).
- **Social links** → `SOCIALS` in `src/content.ts` (used by the footer & homepage).

## Future pages (scaffolded for, not built)

About HumAIne (positioning matrix, the four values, logo/brand), Messages
(founding-member videos, message board, postcards), Resources (links by theme).
The design system, DB layer, and message board already support these.
