#!/usr/bin/env bash
set -euo pipefail

echo "▸ lint"
npm run lint --silent

echo "▸ build"
npm run build --silent

echo "▸ verify"
node hooks/verify-build.mjs

echo "✓ all checks passed"
