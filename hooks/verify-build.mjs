import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fail = (msg) => { console.error(`✗ ${msg}`); process.exit(1); };
const ok = (msg) => console.log(`  ${msg}`);

if (!existsSync(resolve(root, "dist/index.html"))) {
  fail("dist/index.html missing — did the build run?");
}

const indexHtml = readFileSync(resolve(root, "dist/index.html"), "utf8");
if (!/<meta\s+name=["']color-scheme["']\s+content=["']dark["']/.test(indexHtml)) {
  fail("dark color-scheme metadata missing from built HTML");
}
ok("dark color-scheme metadata present");

const assetsDir = resolve(root, "dist", "assets");
const cssFile = readdirSync(assetsDir).find((f) => f.endsWith(".css"));
if (!cssFile) fail("no css file found in dist/assets");

const builtCss = readFileSync(resolve(assetsDir, cssFile), "utf8");

const requiredTokens = ["--bg", "--text", "--text-muted", "--accent-link", "--max-width"];
for (const token of requiredTokens) {
  if (!builtCss.includes(token)) fail(`token ${token} missing from built CSS`);
}
ok(`design tokens present (${requiredTokens.length})`);

if (!builtCss.includes("color-scheme:dark") || !builtCss.includes("background-size:36px 36px")) {
  fail("fixed dark theme or fine-grid background missing from built CSS");
}
ok("fixed dark theme and fine-grid background present");

console.log("✓ verify-build passed");
