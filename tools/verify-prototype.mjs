import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const index = readFileSync(join(root, "index.html"), "utf8");
const css = readFileSync(join(root, "styles.css"), "utf8");
const js = readFileSync(join(root, "script.js"), "utf8");

const failures = [];

function expect(condition, message) {
  if (!condition) failures.push(message);
}

expect(
  index.includes('data-design-direction="field-atlas"'),
  "index.html must identify the Field Atlas design direction."
);
expect(
  index.includes("Grassroots innovation made") && index.includes("data-hero-word"),
  "Hero must use the concise animated content-positioning headline."
);
expect(
  css.includes(".hero-title-word::after") && js.includes("const HERO_WORD_HOLD_MS = 2600;") && js.includes("heroWord.textContent = word.slice(0, nextLength);"),
  "Hero must animate the final headline word."
);
expect(
  !index.includes("Grassroots systems made fundable."),
  "Hero must not use the old Field Atlas placeholder headline."
);
expect(
  (index.match(/class="[^"]*\bledger-row\b/g) || []).length >= 5,
  "Homepage must expose at least five partner ledger rows."
);
expect(
  index.includes('data-section-counter'),
  "Prototype must include a section counter hook for scroll motion."
);
expect(
  index.includes('data-atlas-object'),
  "Hero must include the floating atlas object hook."
);
expect(
  css.includes(".atlas-hero") && css.includes(".field-rail") && css.includes(".atlas-object"),
  "CSS must define the atlas hero, field rail and atlas object."
);
expect(
  css.includes("@keyframes") && css.includes("prefers-reduced-motion"),
  "CSS must define motion and reduced-motion handling."
);
expect(
  css.includes("@media (max-width: 720px)") || css.includes("@media (max-width:720px)"),
  "CSS must include a mobile breakpoint for the atlas layout."
);
expect(
  js.includes("data-section-counter") && js.includes("data-atlas-object"),
  "JavaScript must wire section counter and atlas object interactions."
);

for (const match of index.matchAll(/\s(?:src|href)="([^"]+)"/g)) {
  const asset = match[1];
  if (
    asset.startsWith("#") ||
    asset.startsWith("mailto:") ||
    asset.startsWith("http") ||
    asset === "styles.css" ||
    asset === "script.js"
  ) {
    continue;
  }

  expect(existsSync(join(root, asset)), `Missing referenced asset: ${asset}`);
}

if (failures.length) {
  console.error("Prototype verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Prototype verification passed.");
