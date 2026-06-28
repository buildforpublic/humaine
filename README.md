# HumAIne Movement

> **Stay human with AI.**
> A global movement — and a signable manifesto — for people who refuse to choose
> between embracing AI and staying deeply human.

**Live:** [humaine-movement.com](https://humaine-movement.com) ·
**Board entry:** [buildforpublic.com/directory](https://www.buildforpublic.com/directory) ·
**Org:** [Build for Public](https://buildforpublic.com)

This repo is open and built in public. If you're a volunteer builder picking this
up — welcome. This README is your map: the brand, the content direction, the
requirements, and how the code is put together.

## 📚 Project docs — start here

| Doc | What it is |
|-----|------------|
| 📄 **[PRD / Brief](https://docs.google.com/document/d/1rRh1Cv2qDn56KEkoCooA3yiSqJXKbxR1TJYFzMCsGJA/edit?usp=sharing)** | The product brief — **read this first** |
| 🆕 **[v2 updates doc](https://docs.google.com/document/d/1ZT2xbZtWQxUKEM6ZNDBWCyFid155SqRkY7TQaShYj88/edit?usp=drivesdk)** | Finalised Founding Members + Manifesto, and the v2 change list |
| 🎨 **[Brand Kit](https://drive.google.com/drive/folders/1941Sjazk1NblVGu2TrapPcaZZ27er1z2?usp=sharing)** · **[updated logo (v2)](https://drive.google.com/file/d/1fZYt3TVB58XfwtxCZb8X6rZccjPgDdXu/view?usp=drivesdk)** | Logo + brand assets |
| 🗣️ **[Voice & Messaging](https://docs.google.com/document/d/13bjNVMvgb5dChVjHKN9AUJeZO8eVSMmK-HbSWVh16Ws/edit?usp=sharing)** | Tone & copy guide |
| 👥 **[Founding Members — Insider View (PDF)](https://drive.google.com/file/d/14-J6-AnouDpLwa_b2JH3EX_HxFzSMHNT/view?usp=sharing)** | Background for the team |
| 📷 **[Community photo album (Playbook)](https://www.playbook.com/s/hiztoree/uXtB4ru7AysXKyzg6qLs4QSR)** | Photos for the site |
| 🖼️ **Design mockups:** [1](https://drive.google.com/file/d/1UPvd4N84fEP53Zyg-VHfVD-LgV3zEPqD/view?usp=sharing) · [2](https://drive.google.com/file/d/1M78idzsiSZmVs57jKGt1_dfGCecPougd/view?usp=sharing) | Early design explorations |

> Some docs are restricted to the HumAIne team — request access if a link 401s.

---

## Table of contents

1. [What we're building](#what-were-building)
2. [Brand & design system](#brand--design-system) — **the source of truth**
3. [⚠️ Current build vs. official brand](#-current-build-vs-official-brand)
4. [Content direction & voice](#content-direction--voice)
5. [Requirements & roadmap](#requirements--roadmap)
6. [Tech stack & architecture](#tech-stack--architecture)
7. [Local development](#local-development)
8. [Data model & moderation](#data-model--moderation)
9. [Deploying](#deploying)
10. [How to contribute](#how-to-contribute)

---

## What we're building

The website has one job: make the manifesto **feel serious, human, and
signable**, and turn passive agreement into **visible momentum** through
signatures and messages.

**Two pages today:**

- **Homepage** (`/`) — the *why* (why HumAIne exists + the common enemy), the
  *what* (a global movement; at its heart is the manifesto), founding members,
  and "follow the movement" (socials + newsletter).
- **Manifesto** (`/manifesto`) — the manifesto values & principles, a **sign
  form**, a live signature counter, a **signature wall**, and a **message board**.

There's also a hidden **`/admin`** moderation queue.

---

## 📌 Pending updates (owner v2 — apply next)

The owner has sent a v2 batch. **None of these are implemented yet** — they're the
next work for a volunteer. Sources are linked; some docs are access-restricted to
the HumAIne team, so request access if a link 401s.

- [ ] **Brand alignment** — switch to the official fonts (**Georgia** for titles,
      **Nunito** for body) and the [HUMAINE palette](#the-humaine-palette). See the
      [gap table](#-current-build-vs-official-brand). *(Mostly `globals.css` `:root`
      + `layout.tsx`.)*
- [ ] **Updated logo** — swap `public/humaine-logo.png` for the
      [v2 logo](https://drive.google.com/file/d/1fZYt3TVB58XfwtxCZb8X6rZccjPgDdXu/view?usp=drivesdk).
- [ ] **v2 copy** — apply the finalised **Founding Members list** and **Manifesto**
      from the [v2 updates doc](https://docs.google.com/document/d/1ZT2xbZtWQxUKEM6ZNDBWCyFid155SqRkY7TQaShYj88/edit?usp=drivesdk).
      Copy lives in [`src/content.ts`](src/content.ts).
- [ ] **Community photos** — source from the
      [photo album (Playbook)](https://www.playbook.com/s/hiztoree/uXtB4ru7AysXKyzg6qLs4QSR),
      and **move the photos section to the bottom of the homepage** (currently the
      `CommunityCarousel` sits just below the hero in `src/app/page.tsx`).
- [ ] **Moderation → post-moderation** — change from approve-first to
      **show-immediately**: signatures/messages appear on the wall/board as soon as
      someone signs; the admin reviews at intervals and **removes** inappropriate
      ones. (See [Data model & moderation](#data-model--moderation) for where this
      lives.)
- [ ] **Design reference** — the owner's mockup HTML, for ideas only:
      [mockup 1](https://drive.google.com/file/d/1UPvd4N84fEP53Zyg-VHfVD-LgV3zEPqD/view?usp=sharing) ·
      [mockup 2](https://drive.google.com/file/d/1M78idzsiSZmVs57jKGt1_dfGCecPougd/view?usp=sharing).

---

## Brand & design system

> This section is the **source of truth**, taken from the official brand
> guidelines (PRD + Brand Kit). When in doubt, match this.

### Typography

| Role | Font |
|------|------|
| Display / headings | **Georgia** (serif) |
| Body / UI | **Nunito** (sans) |

### The HUMAINE Palette

A meaningful palette — a warm human background, a "digital noise" ink, and **one
colour per manifesto value**:

| Colour | Hex | Represents | Feeling |
|--------|-----|------------|---------|
| **Ancient Parchment** | `#F4F1EA` | Background / human history | Trust, breathability, non-digital origin |
| **Carbon Slate** | `#2F353B` | The AI / data / the "noise" | Complexity, the weight of the digital era |
| **Sun-Flare Amber** | `#E6A532` | **Purposeful Use** | Energy, direction, high-value intent |
| **Ancient Moss** | `#2D5A27` | **Active Thinking** | Life, deep-rooted logic, organic growth |
| **Burned Terracotta** | `#A35C44` | **Human Agency** | Weight, grounding, physical responsibility |
| **Dusk Rose** | `#D4908B` | **Deeper Connection** | Empathy, the heartbeat, soft-tissue humanity |

The per-value colours are intentional — use them when representing the four
values (e.g. the future **About** page explains the logo + how we arrived at the
four values, and the Manifesto principles can be colour-coded).

### Logo

The mark is a stylised **"H"** — an orange **fingerprint** (human) joined to a
dark **circuit grid** (AI) by an amber node. Full assets:
**[Brand Kit (Google Drive)](https://drive.google.com/drive/folders/1941Sjazk1NblVGu2TrapPcaZZ27er1z2?usp=sharing)**.
A trimmed copy lives at [`public/humaine-logo.png`](public/humaine-logo.png).

> **Updated logo (v2):** the owner has provided a refreshed PNG —
> **[updated logo](https://drive.google.com/file/d/1fZYt3TVB58XfwtxCZb8X6rZccjPgDdXu/view?usp=drivesdk)**.
> Swap it into `public/humaine-logo.png` (the current file is from the
> coming-soon page).

---

## ⚠️ Current build vs. official brand

**Heads up, important:** the current implementation does **not yet match** the
official brand above. It was first built against a [Giving What We Can](https://www.givingwhatwecan.org/)
reference, so today the code uses:

| | Official brand (target) | Current code (`src/app/globals.css`) |
|--|--|--|
| Display font | Georgia | **Fraunces** |
| Body font | Nunito | **Manrope** |
| Background | Ancient Parchment `#F4F1EA` | warm cream `#faf9f5` |
| Ink | Carbon Slate `#2F353B` | deep plum `oklch(0.232 …)` |
| Accent | Sun-Flare Amber `#E6A532` | `--amber: #e58807` (close) + a brick red for CTAs |
| Value colours | amber / moss / terracotta / rose | not yet used per-value |

The amber and the real logo are already in. **Aligning the rest to the HUMAINE
palette + Nunito/Georgia is a great first contribution** — almost everything is
driven by CSS variables in [`src/app/globals.css`](src/app/globals.css) (`:root`)
and the fonts in [`src/app/layout.tsx`](src/app/layout.tsx), so it's a contained
change. See [`DESIGN.md`](DESIGN.md) for the as-built token reference.

---

## Content direction & voice

- **Tone:** serious, human, signable. Hopeful, not fearful; embracing AI to
  become *more* human, not less.
- **The arc:** *Why?* (imagine 2050 — flourishing or decaying?) → *What?* (a
  global movement; the manifesto is its heart) → *How?* (the values &
  principles) → *Sign it.*
- **The manifesto** values *the left over the right*: Purposeful Use over Passive
  Consumption · Active Thinking over Replacement of Thinking · Human Agency over
  Total Trust on Algorithms · Deeper Connection over Efficiency-at-all-costs.
- Full voice & messaging guide:
  **[HumAIne — Voice & Messaging](https://docs.google.com/document/d/13bjNVMvgb5dChVjHKN9AUJeZO8eVSMmK-HbSWVh16Ws/edit?usp=sharing)**.

**All site copy, founding members, values, and principles live in
[`src/content.ts`](src/content.ts)** — edit there, not in the components.

---

## Requirements & roadmap

### Built

- [x] Homepage (why / what / founding members / follow + newsletter)
- [x] Manifesto page (values, principles, living-manifesto note)
- [x] Sign form — `*Name`, Gender, Country/City, `*Email`, Occupation (optional),
      "anonymous" toggle, optional message ("What do you hope humans remember in
      the age of AI?")
- [x] Live signature counter + milestone progress bar
- [x] Signature wall + message board (approve-first moderation)
- [x] Hand-drawn **or** typed signature, replayed stroke-by-stroke on success
- [x] `/admin` moderation queue

### Future pages (planned — good contributions)

- **About HumAIne** — positioning matrix, how we arrived at the four values, and
  an explanation of the logo + brand/colours (use the HUMAINE palette here).
- **Messages** — founding-member video messages, a public message board (from the
  signing form), and "leave a postcard".
- **Resources** — curated links (articles / news / podcasts), categorised by theme.

The design system, DB layer, and moderation already support these.

---

## Tech stack & architecture

| Layer | Tech |
|-------|------|
| Framework | **Next.js 16** (App Router) + **React 19** + TypeScript |
| Styling | Plain **CSS Modules** + design tokens in `globals.css` (no Tailwind) |
| Database | **Turso** (libSQL/SQLite) via **Drizzle ORM** |
| Signature pad | **Ark UI** (headless) + raw stroke capture for replay |
| Handwriting | **tegaki** (typed-name animation), Caveat web font fallback |
| Hosting | **Vercel** |

```
src/
  app/
    layout.tsx           # fonts + Nav/Footer + metadata
    globals.css          # design tokens (:root) + component classes  ← brand lives here
    page.tsx             # Homepage  (+ home.module.css)
    manifesto/page.tsx   # Manifesto + sign + wall + board (+ manifesto.module.css)
    admin/               # moderation queue (cookie-gated by ADMIN_SECRET)
    actions.ts           # server actions: signManifesto, subscribeNewsletter
  components/            # Nav, Footer, Logo, SignForm, SignaturePadField,
                         # SignatureReveal, SignatureWall, MessageBoard,
                         # CommunityCarousel, NewsletterForm
  content.ts             # ← copy, founding members, values, principles, COUNTRIES
  lib/milestones.ts      # next-milestone helper for the momentum bar
  db/
    schema.ts            # signatures + newsletter tables
    client.ts            # libSQL client + ensureSchema() (auto-creates tables)
    queries.ts           # count / board / wall / admin reads
```

**Signature replay:** perfect-freehand renders *filled* shapes (can't be
`stroke-dash` animated), so `SignaturePadField` separately records raw pen
strokes; `SignatureReveal` redraws them as centerline paths in order. No drawing
→ the typed name is animated into handwriting instead.

---

## Local development

Uses **bun** (npm also works). Dev runs on **port 3001**.

```bash
bun install
cp .env.local.example .env.local      # defaults to a local SQLite file
bun run dev                           # → http://localhost:3001
```

With `TURSO_DATABASE_URL=file:local.db`, the app creates a local SQLite DB and
its tables automatically on first request — **no external database to run**. Set
`ADMIN_SECRET` in `.env.local` to use `/admin` locally.

---

## Data model & moderation

`signatures` — `name`, `email`, `gender?`, `country?`, `city?`, `occupation?`,
`anonymous`, `message?`, `signature?` (drawn SVG data URL), `approved`,
`created_at`. Plus a `newsletter` table.

**Moderation is approve-first (current):** a signature counts toward the momentum
counter immediately, but its message (board) and signature (wall) only appear
publicly once `approved` is `true`. Anonymous signers are excluded from the wall.

> **v2 change requested:** flip this to **post-moderation** — show signatures and
> messages on the wall/board **immediately** after signing, and let the admin
> remove inappropriate ones at intervals. Practically: default `approved` to
> `true` (or have the public queries stop filtering on it) and keep the admin
> **Delete** action; the admin queue becomes a "review & remove" list rather than
> an "approve" gate.

**`/admin`** (cookie-gated by `ADMIN_SECRET`, `noindex`) is the moderation queue:
Approve / Unapprove / Delete each entry, with a preview of the signature. Prefer
SQL? `bun run db:studio`, or `UPDATE signatures SET approved = 1 WHERE id = …;`.

---

## Deploying

Hosted on **Vercel** with a **Turso** production database.

1. **Turso DB:** `turso db create humaine` → grab `turso db show humaine --url`
   and `turso db tokens create humaine`.
2. **Vercel env vars** (Production): `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`,
   and `ADMIN_SECRET` (a long random string). Then deploy (`vercel --prod`, or
   connect the repo for auto-deploy on push).
3. **Domain:** add `humaine-movement.com` in Vercel → Domains, then add the DNS
   records it shows in **Namecheap → Advanced DNS** (domain is on Namecheap).

Tables auto-create on first request; `bun run db:push` keeps migrations explicit.

---

## How to contribute

Good places to start:

1. **Brand alignment** — bring the site to the official HUMAINE palette +
   Nunito/Georgia (mostly `globals.css` `:root` + `layout.tsx`). See the
   [comparison table](#-current-build-vs-official-brand).
2. **Build a future page** — About, Messages, or Resources (see the roadmap).
3. **Polish** — accessibility, mobile, performance, founding-member bios/links.

Keep it **open and built in public**. Copy goes in `src/content.ts`; brand goes
in `globals.css`. Open a PR — small and focused is great.

> All briefs, brand assets, and references are in
> **[📚 Project docs](#-project-docs--start-here)** at the top of this README.

---

<p align="center"><em>Stay human with AI.</em></p>
