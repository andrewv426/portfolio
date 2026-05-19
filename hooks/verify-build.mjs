import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fail = (msg) => { console.error(`✗ ${msg}`); process.exit(1); };
const ok = (msg) => console.log(`  ${msg}`);

if (!existsSync(resolve(root, "dist/index.html"))) {
  fail("dist/index.html missing — did the build run?");
}

const indexHtml = readFileSync(resolve(root, "index.html"), "utf8");
if (!/setAttribute\(["']data-theme["']/.test(indexHtml)) {
  fail("inline theme boot script missing from index.html");
}
ok("inline theme boot script present");

const assetsDir = resolve(root, "dist", "assets");
const cssFile = readdirSync(assetsDir).find((f) => f.endsWith(".css"));
if (!cssFile) fail("no css file found in dist/assets");

const builtCss = readFileSync(resolve(assetsDir, cssFile), "utf8");

const requiredTokens = ["--bg", "--text", "--text-muted", "--accent-link", "--max-width"];
for (const token of requiredTokens) {
  if (!builtCss.includes(token)) fail(`token ${token} missing from built CSS`);
}
ok(`design tokens present (${requiredTokens.length})`);

if (!/\[data-theme=["']?light["']?\]/.test(builtCss)) {
  fail("[data-theme='light'] block missing from built CSS — toggle would be broken");
}
ok("light-theme override present");

console.log("✓ verify-build passed");
