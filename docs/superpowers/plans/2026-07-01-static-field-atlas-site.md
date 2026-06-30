# Static Field Atlas Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved Field Atlas Subvators Hub website as a static Vercel-ready site.

**Architecture:** Keep the project as static HTML, CSS and JavaScript served from the repository root. The page uses the approved Field Atlas topology, real local image assets, content from `docs/WEBSITE_CONTENT.md`, and verification scripts as the deployment gate.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node-based verification scripts, Vercel static hosting.

---

## Files

- Modify: `index.html` for final page content, semantic sections, metadata, partner links and evidence modules.
- Modify: `styles.css` for the expanded Field Atlas layout, partner links, value modules, story objects and responsive polish.
- Modify: `script.js` only if needed for accordion/nav behavior compatibility.
- Create: `tools/verify-site-content.mjs` as the content/static deployment gate.
- Modify: `package.json` to add `verify:site` and `verify` scripts.
- Create: `vercel.json` for static deployment behavior.

## Tasks

### Task 1: Add Content Verification Gate

- [ ] Create `tools/verify-site-content.mjs` that reads `index.html`, `vercel.json`, and referenced local images.
- [ ] Assert the site uses organisation positioning, not platform positioning.
- [ ] Assert hero, proof points, operating model, partner ledger, partner links, evidence stories, advisory and CTA copy exist.
- [ ] Assert all local image references exist.
- [ ] Add `verify:site` and aggregate `verify` scripts to `package.json`.
- [ ] Run `npm run verify:site` and confirm it fails against the current prototype before production content is applied.

### Task 2: Apply Final Static Content

- [ ] Replace prototype copy in `index.html` with content from `docs/WEBSITE_WIREFRAME.md`.
- [ ] Keep the first viewport as the Field Atlas hero with rail, proof object and partner ledger preview.
- [ ] Add organisation overview, operating layer, value modules, full partner ledger, evidence stories, founder note, strategic advisory and contact CTA.
- [ ] Ensure partner links are only official website/social links.
- [ ] Keep Subvators framed as a catalytic NGO-like organisation, not a software platform.

### Task 3: Polish Layout For Static Launch

- [ ] Update `styles.css` for the expanded content sections while keeping the approved Field Atlas design language.
- [ ] Preserve responsive mobile stack, compact nav, single-open ledgers and legible evidence objects.
- [ ] Avoid nested cards, generic charity language and decorative-only imagery.

### Task 4: Static Vercel Config

- [ ] Add `vercel.json` with static-friendly clean URLs, security headers and long-lived immutable cache for images.
- [ ] Keep the site framework-free and build-command-free for static Vercel pages.

### Task 5: Verify

- [ ] Run `npm run verify:site`.
- [ ] Run `npm run design:lint -- --format json`.
- [ ] Run `npm run verify:prototype`.
- [ ] Capture desktop and mobile screenshots from the static `file://` page.
