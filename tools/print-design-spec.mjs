import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const candidates = [
  join(here, "..", "node_modules", "@google", "design.md", "dist", "spec.md"),
  join(here, "..", "node_modules", "@google", "design.md", "dist", "linter", "spec.md"),
];

const specPath = candidates.find((candidate) => existsSync(candidate));

if (!specPath) {
  console.error("Unable to find @google/design.md spec.md in node_modules.");
  process.exit(1);
}

process.stdout.write(readFileSync(specPath, "utf8"));
