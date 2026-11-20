---
version: alpha
name: Subvators Hub
description: Kenya-based grassroots innovation and partnership organisation for health, wealth and Earth.
colors:
  primary: "#01331A"
  primary-hover: "#1B4E21"
  secondary: "#701011"
  tertiary: "#FDD37F"
  ground: "#DEDBD2"
  surface: "#FBFAF5"
  surface-shade: "#F3F1ED"
  on-surface: "#111611"
  on-primary: "#FFFFFF"
  on-secondary: "#FFFFFF"
  on-tertiary: "#2D1502"
  muted: "#5C665F"
  border: "#D8D6CC"
typography:
  headline-display:
    fontFamily: "Besley, Georgia, serif"
    fontSize: 72px
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: 0em
  headline-lg:
    fontFamily: "Besley, Georgia, serif"
    fontSize: 44px
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: 0em
  stat:
    fontFamily: "Besley, Georgia, serif"
    fontSize: 40px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0em
  title:
    fontFamily: "Figtree, Arial, sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0em
  body-lg:
    fontFamily: "Figtree, Arial, sans-serif"
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  body-md:
    fontFamily: "Figtree, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  body-sm:
    fontFamily: "Figtree, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0em
  label-md:
    fontFamily: "Figtree, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.08em
rounded:
  none: 0px
  md: 8px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  xxxl: 96px
components:
  page:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
  sheet:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
  section-alt:
    backgroundColor: "{colors.surface-shade}"
    textColor: "{colors.on-surface}"
  section-evidence:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.headline-lg}"
  section-advisory:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.headline-lg}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 12px
  button-paper:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 12px
  caption:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
---

# Subvators Hub Design System

This file is the single source of truth for the site's design. `styles.css`
implements it through the tokens in its `:root` block and uses no colour, size
or weight outside those tokens. `npm run verify` fails if that drifts.

## Overview

Subvators Hub should feel like a credible grassroots innovation organisation:
institutional enough for donors and partners, grounded enough for community
organisations, and warm enough for health, livelihood and Earth-centred work.

Five rules decide every choice:

1. **Serif speaks, sans works.** The serif is for statements: page headline,
   section headings, quotes and big numbers. The sans is for everything a
   visitor reads or operates.
2. **Three surfaces, each with a meaning.** Paper is the default. Forest green
   marks proof: the two Evidence sections and the closing contact band.
   Burgundy marks the ask and is used once, for Strategic advisory. No
   gradients, glows or grid paper.
3. **One list.** Steps, capabilities, partners and advisory areas all use the
   ruled ledger row. Numbers appear only where order matters: the five-step
   operating model.
4. **Photos are evidence.** Straight, never tilted, never with text laid over
   faces. They form a collage in two places: at most three overlapping photos
   in the hero, and the eleven-photo mosaic in Evidence stories.
5. **Every photo names its organisation.** Evidence plates, mosaic captions
   and the hero label each credit the partner the photo belongs to. A photo is
   never shown under another organisation's name.

The logo lockup is artwork. Do not rebuild the wordmark or the script tagline
with live type.

## Colors

Nine colours, each with one job.

- **Ground (#DEDBD2):** the margin around the page sheet on large screens.
  Nothing else.
- **Surface / Paper (#FBFAF5):** the page sheet and default sections.
- **Surface shade (#F3F1ED):** alternate section, to separate two paper
  sections.
- **On-surface / Ink (#111611):** headings and body text.
- **Muted (#5C665F):** secondary text and captions.
- **Primary / Forest (#01331A):** primary button, Evidence sections, contact
  band.
- **Primary hover (#1B4E21):** hover state of forest only.
- **Secondary / Burgundy (#701011):** labels, the open or active item, the
  Strategic advisory band. Never a button on paper.
- **Tertiary / Gold (#FDD37F):** labels on dark bands and the focus ring.
  Never text on paper.

Hairlines are Border (#D8D6CC) on paper and white at 22% on dark bands. The
rule that opens a ledger is Ink.

## Typography

Two families, eight styles, three weights (400, 500 for the serif, 600).

Besley is a sturdy bracketed serif in the same family as the "Subvators Hub"
wordmark in the logo. Figtree is a clean geometric sans close to the logo's
second line. Both are loaded from Google Fonts in `index.html`.

| Style | Family | Size / line | Use |
| --- | --- | --- | --- |
| Display | Besley 500 | 72 / 1.02, fluid down to 40 | Hero headline only |
| Heading | Besley 500 | 44 / 1.08, fluid down to 30 | Section headings |
| Stat | Besley 500 | 40 / 1 | Hero figures |
| Title | Figtree 600 | 22 / 1.2 | Row and partner names; quotes use this size in Besley |
| Lead | Figtree 400 | 20 / 1.5 | Section intros |
| Body | Figtree 400 | 16 / 1.6 | Paragraphs |
| Small | Figtree 400 | 14 / 1.45 | Captions, meta lines |
| Label | Figtree 600 | 12 / 1.2, caps, tracking 0.08em | Section labels |

Body copy is regular weight. 600 is reserved for titles, labels and buttons.

## Layout

Spacing has seven steps: 4, 8, 16, 24, 40, 64, 96.

Every section splits 5 and 7: label, heading and lead on the left, content on
the right. On large screens the left side sticks under the header while the
longer right side scrolls, and releases at the end of its section. Two planned
exceptions: the Evidence stories mosaic runs the full width of the page, and
the founder portrait takes the left side with the text on the right.

The hero is a 7 and 5 split in two rows: copy beside the collage, then the
figures beside the partner label and Pause button, on the same level.

On screens 1000px and wider the page is a paper sheet with an 18px margin of
Ground around it and a hairline edge. No shadow.

Two breakpoints. Below 860px sections stack into one column, the navigation
collapses into a menu, only the header sticks, and the hero order becomes copy,
figures, collage, label. Below 560px ledger rows stack and the figures go two
across.

## Elevation & Depth

Hairlines and surface colour separate things. One shadow exists, for the
mobile menu. The sticky header has a hairline, not a shadow.

## Shapes

8px corners on buttons and photos. No pills. No mixed corners.

## Components

- **Section head:** label, heading, optional lead. Identical in every section.
- **Ledger row:** title and description on a hairline. Numbered only for the
  five-step model. The partner version expands, one row open at a time, and
  carries the partner's meta line.
- **Buttons:** primary (forest), outline, and paper for dark bands.
- **Stat strip:** open, ruled above, no boxes.
- **Evidence plate:** photo with its caption and organisation underneath.
- **Hero collage:** at most three overlapping photos with a paper edge. The
  partner label and Pause button sit under it.
- **Evidence stories mosaic:** eleven photos in uneven sizes. A photo's caption
  rises on a solid strip under the pointer (always shown on touch screens), and
  selecting a photo opens it large in place with arrows to the rest.
- **Quote:** serif, burgundy rule on the left. One style.

## Motion

Seven named moves, three durations (150, 400, 800ms) plus one slower 1400ms
for the hero, and one easing curve: `cubic-bezier(0.2, 0.7, 0.1, 1)`. The hero
Pass alone uses an anticipating curve, `cubic-bezier(0.6, -0.2, 0.2, 1)`, which
dips back slightly before it moves.

| Move | What it does | Timing |
| --- | --- | --- |
| Rise | The hero headline comes up word by word, once on load. | 800ms, 40ms apart |
| Draw | The rule above a ledger draws left to right, then rows follow. A burgundy rule draws under the partner being hovered or opened. | 800ms / 400ms |
| Wipe | Photos are uncovered left to right as they enter, and a story as it opens. | 800ms |
| Settle | A photo eases from 108% to rest as it is uncovered, and to 105% under the pointer. | 800ms |
| Follow | A partner's name steps 8px toward its detail under the pointer. A story caption rises under the pointer and the other photos step back. | 400ms |
| Pass | A hero photo slides out from behind the main photo, grows into the main place, steps back, then leaves. Each photo starts a beat after the one ahead of it. Never more than three on screen. | 1400ms, every 4s |
| Count | The two real figures count up once. | 800ms |

Only the hero collage loops. It has a Pause button and stops when scrolled out
of view or when the tab is hidden. With reduced motion switched on nothing
animates and the collage holds still.

## Do's and Don'ts

- Do take every colour, size, weight, radius and duration from the tokens.
- Do keep the copy as written; design changes do not change wording.
- Do keep the logo as artwork.
- Don't add a section layout that is not the 5 and 7 split or one of the two
  planned exceptions.
- Don't use gold as text on paper, or burgundy as a button on paper.
- Don't tilt photos, lay text over faces, or add looping animation beyond the
  hero collage.
- Don't use pills.
