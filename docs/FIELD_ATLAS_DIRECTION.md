# Subvators Hub Field Atlas Direction

Status: high-fidelity prototype direction, July 1, 2026.

## Why This Direction

The previous draft was too close to a conventional nonprofit homepage. Field Atlas moves the site toward the Japanese inspiration topology without copying Japanese motifs: a framed editorial canvas, asymmetric visual object, vertical rail, large typographic statement, numbered partner ledger and controlled negative space.

## First View

The homepage opens with a warm framed canvas and a strong left rail. The rail carries the current section counter and a compact Earth / Health / Wealth signal. The hero message is direct and partner-facing: Grassroots systems made fundable.

The visual object on the right stacks existing Subvators ecosystem, evidence and field assets around a central logo medallion. The object should feel like a map of proof and capability rather than a generic image block.

## Main Topology

1. Field Atlas Hero: editorial statement, vertical rail, floating ecosystem object and partner ledger preview.
2. Operating Layer: five-step model from field observation to scale.
3. Partner Ledger: numbered ecosystem index, not a card grid.
4. Evidence Layer: proof images treated as objects in the composition.
5. Strategic Advisory: dark burgundy institutional band with clear advisory focus areas.

## Motion And Interaction

- Header compresses on scroll.
- Section rail counter updates as the visitor moves through the page.
- Hero object has subtle scroll parallax and pointer tilt, disabled for reduced motion.
- Hero partner ledger changes the object label on selection.
- Detailed partner ledger behaves as a single-open accordion.
- Mobile navigation opens as a compact menu.

## Responsive Rules

Desktop keeps the rail, hero copy, object and partner ledger in one editorial composition. Tablet stacks the object below the copy while preserving the rail. Mobile turns the rail into a compact horizontal status bar, stacks CTAs, keeps the atlas object as the visual anchor, and converts ledger/evidence/advisory sections into single-column layouts.

## Verification Artifacts

- npm run verify:prototype
- npm run design:lint -- --format json
- preview/field-atlas-desktop-4.png
- preview/field-atlas-mobile-4.png
- preview/field-atlas-ledger-desktop.png
- preview/field-atlas-evidence-desktop.png
- preview/field-atlas-advisory-desktop.png
- preview/field-atlas-ledger-mobile.png
- preview/field-atlas-evidence-mobile.png
- preview/field-atlas-advisory-mobile.png
