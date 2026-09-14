import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const requiredFiles = ["main.js", "manifest.json", "styles.css"];
const forbiddenCssPatterns = [
  /@import\b/,
  /src\/styles/i,
  /src\\styles/i,
  /references\//i,
  /references\\/i,
  /assets\/dogs/i,
  /assets\\dogs/i,
  /assets\/backgrounds/i,
  /assets\\backgrounds/i
];

const errors = [];

for (const file of requiredFiles) {
  const path = join(root, file);
  if (!existsSync(path)) {
    errors.push(`Missing release file: ${file}`);
    continue;
  }

  if (statSync(path).size === 0) {
    errors.push(`Release file is empty: ${file}`);
  }
}

const stylesPath = join(root, "styles.css");
if (existsSync(stylesPath)) {
  const styles = readFileSync(stylesPath, "utf8");
  for (const pattern of forbiddenCssPatterns) {
    if (pattern.test(styles)) {
      errors.push(`styles.css contains release-unsafe reference: ${pattern}`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Release verification passed: main.js, manifest.json, and styles.css are self-contained.");
