# HumAIne Design System

Source: HumAIne Website Google Doc, "Brief" tab. This guide captures the
official brand direction, design tokens, page structure, and relevant brand
guidance for implementation in this repository.

## Brand Essence

HumAIne is a global movement for people who refuse the false choice between
embracing AI and staying deeply human. The brand should feel serious, human,
warm, grounded, and signable. It should make the manifesto feel like something
people can stand behind publicly.

The core promise:

- Embrace AI.
- Become more human.
- Use AI to deepen purpose, thinking, agency, and connection.

The core website objective:

- Help people understand the "why".
- Make the manifesto feel serious, human, and signable.
- Turn passive agreement into visible momentum through signatures and messages.

## Brand Links

- Domain: [humaine-movement.com](http://humaine-movement.com)
- Brand kit:
  [Google Drive folder](https://drive.google.com/drive/folders/1941Sjazk1NblVGu2TrapPcaZZ27er1z2?usp=sharing)
- Updated logo PNG:
  [HumAIne logo HD_transparent.png](https://drive.google.com/file/d/1fZYt3TVB58XfwtxCZb8X6rZccjPgDdXu/view?usp=sharing)
- Local logo asset: `public/humaine-logo.png`

## Typography

| Role | Typeface | Usage |
| --- | --- | --- |
| Body / UI | Nunito | Body copy, navigation, forms, buttons, labels, metadata |
| Editorial display | Georgia | H1-H3, manifesto statements, pull quotes, value titles |
| Signature accent | Caveat | Signature wall and handwritten moments only |

Implementation notes:

- Keep body copy calm and readable at 16px / 1.6.
- Use Georgia for gravity, not decoration.
- Avoid overly futuristic, sci-fi, or startup-slick typography.
- Keep letter spacing at `0` for headings and body. Uppercase labels may use
  modest tracking only when needed.

## Palette

The palette is built around parchment, carbon, and four values. Each color has
an emotional role and should be used intentionally.

| Color name | Hex | Token | Representation | Unconscious effect |
| --- | --- | --- | --- | --- |
| Ancient Parchment | `#F4F1EA` | `--paper` | The background / human history | Trust, breathability, and non-digital origin |
| Carbon Slate | `#2F353B` | `--ink` | The AI / data / the "noise" | Complexity and the weight of the digital era |
| Sun-Flare Amber | `#E6A532` | `--accent` | Purposeful Use | Energy, direction, and high-value intent |
| Ancient Moss | `#2D5A27` | `--moss` | Active Thinking | Life, deep-rooted logic, and organic growth |
| Burned Terracotta | `#A35C44` | `--terracotta`, `--primary` | Human Agency | Weight, grounding, and physical responsibility |
| Dusk Rose | `#D4908B` | `--rose` | Deeper Connection | Empathy, the heartbeat, and soft-tissue humanity |

Recommended supporting tokens:

| Token | Value | Use |
| --- | --- | --- |
| `--paper-tint` | `#FBF8F1` | Elevated parchment surfaces |
| `--cream` | `#EBE4D7` | Secondary buttons, quiet chips |
| `--ink-soft` | `#4F565C` | Lead copy and lower-emphasis text |
| `--muted` | `#70767A` | Captions, metadata, placeholders |
| `--border` | `rgb(47 53 59 / 0.14)` | Hairline separators |
| `--grid-line` | `rgb(47 53 59 / 0.10)` | Subtle manifesto/grid lines |

Color usage:

- Use Ancient Parchment as the default page background.
- Use Carbon Slate for body text, separators, footer backgrounds, and visual
  representations of AI complexity.
- Use Burned Terracotta for primary action moments, especially signing.
- Use Sun-Flare Amber as a directional highlight, not a full-page dominant
  color.
- Use Ancient Moss and Dusk Rose to color-code manifesto values and supporting
  sections.
- Avoid a sterile white/blue AI look. The brand should feel tactile and
  movement-led.

## Logo

The logo combines a human fingerprint feeling with an AI/circuit signal. Treat
it as the clearest first-viewport brand marker.

Guidance:

- Use `public/humaine-logo.png` for app implementation.
- Keep enough clear space around the mark for it to remain legible.
- On light parchment, use the full logo mark and wordmark.
- On dark slate, use a light/inverted wordmark or an approved logo variant.
- Do not recolor the logo casually. If a new lockup is needed, derive it from
  the brand kit.
- The "AI" in HumAIne may be highlighted in Sun-Flare Amber when shown as a
  wordmark.

## Voice And Copy

The voice should feel grounded, direct, and movement-oriented. It should not
sound like generic AI optimism or anti-AI panic.

Use language like:

- "Stay human with AI."
- "Embrace AI. Become more human."
- "Using AI should not make people less human."
- "We refuse the false choice."
- "A centre of gravity for human flourishing with AI."
- "The people who put their names to this movement first."

Avoid:

- Sci-fi jargon and vague futurism.
- Corporate innovation theatre.
- Fear-led AI doom copy.
- Overly cute or meme-heavy language on the main brand surfaces.
- Treating the manifesto like a newsletter signup. Signing should feel like a
  public commitment.

## Page Architecture

The source brief defines two main pages first:

1. Homepage / landing page: story, why, what, manifesto preview, founding
   members, join movement.
2. Manifesto page: full manifesto, values, principles, sign form, signature
   wall, message board.

Future pages:

- About HumAIne: positioning matrix, how the values were chosen, explanation of
  logo and colors.
- Messages: founding member messages, collected messages, postcard-style
  contributions.
- Resources: articles, news, podcasts, videos, tools, categorized by theme.

## Homepage Flow

Recommended narrative sequence:

1. Hero: HumAIne, "Embrace AI. Become more Human.", primary CTA to read the
   manifesto, secondary CTA to join the movement.
2. Why: explain the false choice between embracing AI and staying human.
3. What: position HumAIne as a centre of gravity for human flourishing with AI.
4. Manifesto preview: introduce the four values.
5. Founding members: show the first people to sign.
6. Join the movement: sign, subscribe, explore resources, volunteer or join
   community activities.
7. Social links and photo gallery where relevant.

## Manifesto Values

Use the four values consistently, with color-coding where helpful.

| Value | Color | Contrast |
| --- | --- | --- |
| Purposeful Use | Sun-Flare Amber | Over resistance or passive consumption |
| Active Thinking | Ancient Moss | Over replacement of thinking |
| Human Agency | Burned Terracotta | Over total trust in algorithms |
| Deeper Connection / Deepen Humanness | Dusk Rose | Over efficiency-at-all-costs |

Manifesto principles should feel like commitments, not feature cards. They can
be presented in rows, blocks, or editorial panels, but each value should remain
easy to scan and emotionally distinct.

## Components

### Buttons

Primary button:

- Use Burned Terracotta (`#A35C44`).
- Use for signing, reading the manifesto, and other movement-commitment CTAs.
- Label examples: "Read the Manifesto", "Sign the Manifesto", "Join the
  Movement".

Secondary button:

- Use parchment/cream surface with slate border.
- Use for lower-commitment actions such as newsletter signup or resources.

Resource buttons:

- Article: "Read"
- Podcast: "Listen"
- Video: "Watch"
- Tool: "Try it"

### Cards And Panels

- Keep corners restrained or square unless a specific surface needs softness.
- Use borders and background shifts before heavy shadows.
- Avoid nested cards.
- Let manifesto values use color bands, value strips, or left borders rather
  than decorative gradients.

### Forms

The sign form should collect:

- Name, required.
- Gender, for demographic purposes.
- Country/city, for demographic purposes.
- Email, required.
- Occupation, optional.
- Anonymous display option.
- Message prompt: "What do you hope humans remember in the age of AI?"

Form tone:

- Signing should feel like joining a public movement.
- Keep field labels plain and respectful.
- Let optional fields feel optional.

### Signature Wall And Message Board

- Signatures should create visible momentum.
- Use the handwritten/signature accent sparingly.
- Messages should feel personal and human, not like generic testimonials.
- Fingerprint/thumbprint motifs are relevant when they connect to signing or
  the founding members, not as background decoration everywhere.

## Imagery And Motifs

Relevant visual ideas from the brief:

- A struck-through "or" turning into a glowing "and" for the false binary.
- Scattered dots pulled into orbit for "centre of gravity".
- Fingerprint design with different colors corresponding to values.
- Photo gallery for the movement/community.

Guidance:

- Prefer visuals that show commitment, people, signatures, fingerprints, orbit,
  and movement.
- Use the palette as semantic value-coding.
- Avoid generic AI brain, robot, neon grid, or abstract tech-stock imagery.
- Keep the human layer visible.

## Layout

Recommended layout tokens:

- Main container: `1140px`.
- Narrow reading container: `760px`.
- Section rhythm: `clamp(64px, 9vw, 120px)`.
- Nav height: `72px`.
- Use full-width bands for major narrative shifts.

Section bands:

- Parchment: default narrative sections.
- Slate: high-contrast manifesto or footer moments.
- Amber: purposeful-use highlights.
- Moss: active-thinking highlights.
- Terracotta: agency/signing moments.
- Rose: connection/message moments.

## Motion

Motion should clarify ideas rather than decorate the page.

- Use a single ease: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Respect `prefers-reduced-motion`.
- Good candidates: false-choice transformation, centre-of-gravity orbit,
  signature reveal, count-up/signature momentum.
- Avoid frantic AI-tech motion, particle noise, and constant background motion.

## Accessibility

- Preserve strong contrast between Carbon Slate and Ancient Parchment.
- Do not rely on color alone for manifesto value meaning.
- Keep body text at readable sizes.
- Make signing and newsletter forms fully keyboard reachable.
- Use descriptive button labels.
- Ensure any animated concept still makes sense when motion is reduced.

## Implementation Checklist

- `src/app/globals.css` should remain the source for runtime tokens.
- Keep `--paper`, `--ink`, `--accent`, `--moss`, `--terracotta`,
  `--primary`, and `--rose` aligned with this guide.
- Use Nunito from `next/font/google` for body/UI.
- Use Georgia for display text.
- Use the local `public/humaine-logo.png` asset unless the brand kit is
  updated and the repo asset is replaced.
- Keep `designsystem.html` as a visual reference, not as app runtime code.
- When adding the future resource page, use the action labels: Read, Listen,
  Watch, Try it.
