# HumAIne — Design System

Design tokens extracted from **[givingwhatwecan.org](https://www.givingwhatwecan.org/)**
(a Tailwind v4 site using an OKLCH palette) and adapted for HumAIne. The goal is
the same feeling: **serious, human, warm, and signable** — editorial serif
headlines on warm paper, a confident brick-red call-to-action, and soft pastel
section bands.

All tokens live in [`src/app/globals.css`](src/app/globals.css) under `:root`.

---

## Typography

| Role | Reference (GWWC) | Ours (free lookalike) | Usage |
|------|------------------|------------------------|-------|
| Display serif | Larken | **Fraunces** | `h1`–`h3`, pull quotes, values |
| Body / UI sans | Metropolis | **Manrope** | body, buttons, forms, nav |

Type scale (mirrors GWWC):

- **Display / H1** — Fraunces 500, `clamp(2.75rem → 4.5rem)` (up to ~72px), line-height 1.0
- **H2** — `clamp(1.75rem → 2.5rem)`, line-height 1.1
- **H3** — `clamp(1.3rem → 1.6rem)`
- **Lead** — `clamp(1.15rem → 1.5rem)`, softened ink
- **Body** — 16px / 1.6
- **Eyebrow** — 13px, 700, uppercase, letter-spacing 0.14em, in primary red

## Color (OKLCH — as used on the reference site)

| Token | Value | Note |
|-------|-------|------|
| `--ink` | `oklch(0.232 0.097 349.64)` | deep plum-maroon — primary text |
| `--muted` | `oklch(0.569 0.03 350.66)` | mauve-grey — captions, meta |
| `--primary` | `oklch(0.5865 0.2011 24.61)` | warm brick red — CTAs |
| `--accent` | `oklch(0.7447 0.1499 48.32)` | warm orange — logo, highlights |
| `--paper` | `#faf9f5` | warm cream — page background |
| `--cream` | `oklch(0.948 0.0148 80.71)` | secondary buttons / chips |
| `--surface-blue` | `oklch(0.9465 0.017 225.2)` | soft section band |
| `--surface-green` | `oklch(0.957 0.013 141.66)` | soft section band |
| `--surface-purple` | `oklch(0.941 0.018 300.15)` | soft section band |

> OKLCH is supported in all current browsers. The values are kept verbatim from
> the reference so the palette is faithful; adjust hue/lightness here to evolve
> the brand.

## Shape & depth

- **Radius:** buttons `8px` (`--r`), cards `16px` (`--r-lg`), pills `9999px` — matching GWWC.
- **Shadows:** soft and warm, tinted with the ink hue (`--shadow-sm/-/-lg`).
- **Buttons:** primary (brick red), secondary (cream + hairline border), ghost, light. Padding ~`13px 26px`.

## Layout

- Container `1140px`; narrow reading column `760px`.
- Section rhythm: `clamp(64px → 120px)` vertical padding.
- Pastel **bands** (`.band-blue/green/purple/cream/ink`) separate narrative sections, exactly like the reference site's alternating tinted sections.

## Motion

- Single easing curve `cubic-bezier(0.22, 1, 0.36, 1)`.
- Respects `prefers-reduced-motion`.
