// Checks that the site keeps to the design system in DESIGN.md.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const index = readFileSync(join(root, "index.html"), "utf8");
const css = readFileSync(join(root, "styles.css"), "utf8");
const js = readFileSync(join(root, "script.js"), "utf8");

const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };
const count = (source, pattern) => (source.match(pattern) || []).length;

// ---- structure ----
expect(index.includes("family=Besley") && index.includes("family=Figtree"), "index.html must load Besley and Figtree.");
expect(count(index, /<section class="(?:hero|section)\b/g) === 9 && index.includes('<footer class="section'), "The page must keep its ten sections (nine in main plus the contact footer).");
expect(count(index, /class="partner(?: is-open)?"/g) >= 5, "Partner ecosystem must list at least five partners.");
expect(count(index, /class="tile"/g) === 11, "Evidence stories must show eleven photos.");
expect(count(index, /class="hero-photo"/g) === 3, "Hero must start with exactly three photos.");
expect(index.includes("data-hero-pause"), "Hero collage must have a pause control.");
expect(count(index, /class="row row-numbered"/g) === 5, "Only the five-step model is numbered.");
expect(!/rail|data-section-counter|data-hero-word/.test(index), "The side rail, section counter and typing headline were removed.");

// ---- token discipline in styles.css ----
const rootEnd = css.indexOf("}", css.indexOf(":root"));
const rules = css.slice(rootEnd);
expect(!/#[0-9a-fA-F]{3,8}\b/.test(rules), "styles.css must not use a hex colour outside :root.");
expect(!/rgba?\(/.test(rules), "styles.css must not use an rgb() colour outside :root.");
expect(!/font-weight:\s*\d/.test(rules), "Font weights must come from the weight tokens.");
expect(!/font-family:\s*(?!\s|var\()/.test(rules), "Font families must come from the family tokens.");
expect(!/border-radius:\s*(?!\s|var\()/.test(rules), "Corner radii must come from the radius tokens.");
expect(!/box-shadow:\s*(?!\s|var\()/.test(rules), "Shadows must come from the shadow token.");
expect(count(rules, /box-shadow:/g) <= 1, "Only the mobile menu may have a shadow.");
expect(!/gradient\(/.test(css), "No gradients.");
expect(!/rotate\((?!90deg)/.test(css), "Photos are never tilted.");
expect(!/infinite/.test(css), "No endlessly looping CSS animation.");
const breakpoints = [...new Set([...css.matchAll(/@media \((?:max|min)-width: (\d+)px\)/g)].map((m) => m[1]))].sort();
expect(breakpoints.join(",") === "1000,559,859", "Breakpoints are 859/559 (max) and 1000 (sheet frame); found " + breakpoints.join(","));
expect(css.includes("prefers-reduced-motion"), "CSS must handle reduced motion.");
expect(css.includes("position: sticky"), "Header and section heads must stick on large screens.");

// ---- behaviour hooks ----
expect(js.includes("heroPartnerImages") && js.includes("HERO_STEP_MS"), "script.js must drive the hero collage.");
expect(js.includes("prefers-reduced-motion"), "script.js must respect reduced motion.");
expect(js.includes("data-story-viewer"), "script.js must open evidence stories in place.");

if (failures.length) {
  console.error("Design verification failed:\n- " + failures.join("\n- "));
  process.exit(1);
}
console.log("Design verification passed.");
