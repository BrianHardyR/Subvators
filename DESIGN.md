---
version: alpha
name: Subvators Hub
description: Kenya-based grassroots innovation and partnership platform for health, wealth and Earth.
colors:
  primary: "#01331A"
  primary-strong: "#012D12"
  primary-muted: "#1B4E21"
  secondary: "#701011"
  secondary-strong: "#611412"
  tertiary: "#FDD37F"
  neutral: "#F3F1ED"
  surface: "#FBFAF5"
  on-surface: "#111611"
  on-primary: "#FFFFFF"
  on-secondary: "#FFFFFF"
  on-tertiary: "#2D1502"
  muted: "#5C665F"
  border: "#E5E4DE"
typography:
  headline-display:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: 64px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: 0em
  headline-lg:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: 44px
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: 0em
  headline-md:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: 30px
    fontWeight: 800
    lineHeight: 1.14
    letterSpacing: 0em
  body-lg:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  body-md:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  body-sm:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0em
  label-lg:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0em
  label-md:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0em
  stat:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: 40px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: 0em
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
components:
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
  hero-band:
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.on-primary}"
    typography: "{typography.headline-display}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: 14px
  button-primary-hover:
    backgroundColor: "{colors.primary-muted}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: 14px
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: 14px
  button-secondary-hover:
    backgroundColor: "{colors.secondary-strong}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: 14px
  chip-earth:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 8px
  caption:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
---

# Subvators Hub Design System

## Overview

Subvators Hub should feel like a credible grassroots innovation platform:
institutional enough for donors and partners, grounded enough for community
organisations, and warm enough for health, livelihood and Earth-centered work.

This first design discovery pass is derived from the existing profile document
and image assets in this workspace. The primary logo source is
`images/logo.PNG`. The supporting evidence is
the set of branded PNG campaign graphics in `images/`; WhatsApp field photos are
content evidence, not core identity references.

The logo lockup uses a circular green and burgundy monogram, the name
"Subvators Hub", the line "Sustainable Business Innovators", and the tagline
"Earth, Health, Wealth." Treat the logo as artwork. Do not rebuild the wordmark
with live type unless a source vector or official brand guide is supplied.

## Colors

The palette is built from repeated colors in the logo and branded graphics.
Green is the dominant institutional and Earth signal. Burgundy carries health,
protection and urgency. Warm cream gives the brand a field-based, human texture.
A small gold accent can be used for emphasis, highlights and Earth-linked chips.

- **Primary (#01331A):** Deep forest green for headers, bands, major navigation
  and the main institutional tone.
- **Primary strong (#012D12):** Near-black green for deep sections and footer
  surfaces.
- **Primary muted (#1B4E21):** Mid forest green for hover states, icons and
  secondary data marks.
- **Secondary (#701011):** Burgundy from the logo and partner graphics; use for
  health, protection, warning and high-emphasis secondary actions.
- **Tertiary (#FDD37F):** Warm earth-gold accent for small highlights only.
- **Neutral (#F3F1ED) and surface (#FBFAF5):** Warm off-white backgrounds that
  match the campaign graphics better than pure gray.

## Typography

The campaign graphics use a confident geometric sans-serif style for headlines,
body text and labels. Montserrat is the current implementation candidate because
it matches the high-weight headings, compact labels and civic-institutional tone.
If source brand files reveal the exact typefaces later, update the tokens.

Use bold sans-serif headlines for short statements such as "Evidence.
Innovation. Accountability." Keep body text readable and plain. The script-style
tagline in the logo should remain part of the logo artwork, not a general UI font.

## Layout

Layouts should be structured, editorial and scan-friendly. Use full-width bands
for major sections, constrained content widths for reading, and clear separation
between partner ecosystem, impact metrics and advisory content.

The website direction borrows from the `inspirations/` references: compact
navigation, oversized first-view headlines, split hero composition, a strong
side rail or color panel, asymmetrical media blocks and numbered list modules.
Translate those patterns into Subvators' green and burgundy identity; do not
copy the Japanese-specific motifs from the references.

Spacing follows an 8px rhythm with a 4px micro step. Dense operational areas can
use `md` and `lg` spacing; story-led sections can use `xl` and `xxl`.

## Elevation & Depth

Prefer tonal depth over heavy shadows. Use white or warm-surface panels on
neutral backgrounds, dark green bands for authority, and thin dividers for dense
information. Shadows should be restrained and reserved for overlays, menus and
high-priority cards.

## Shapes

The brand graphics are mostly crisp rectangles, circular logos and rounded icon
containers. Use 8px radius for cards, buttons and panels. Use full radius only
for chips, avatars, circular logo crops and icon badges.

## Components

Primary buttons should be green with white text. Secondary buttons can use
burgundy with white text. Small chips may use the warm earth-gold accent with
dark text. Cards should use warm surface backgrounds with dark text and minimal
border treatment.

Use numbered partner rows instead of generic card grids for the strategic
ecosystem. Use stat strips for credibility signals. Use large media panels for
evidence, partner graphics and field presence. Keep controls compact and
purposeful: pill chips for focus areas, simple icon buttons for row expansion,
and full-width buttons on mobile.

Logo usage should prioritize the complete logo lockup on first-view surfaces,
partner decks and official communications. A cropped monogram can be derived
later for favicons and compact navigation, but it should come from a source asset
rather than a hand-redrawn approximation.

## Do's and Don'ts

- Do use green as the primary brand anchor across navigation, headers and key
  institutional sections.
- Do use burgundy intentionally for health, protection, urgency and secondary
  calls to action.
- Do keep the palette warm and grounded; use cream surfaces instead of cold gray
  foundations.
- Do keep the logo as artwork until official vector files are available.
- Don't overuse the gold accent; it should support emphasis, not replace green or
  burgundy.
- Don't use field photos as decorative texture without a clear content purpose.
- Don't rebuild the script tagline as regular UI type.
