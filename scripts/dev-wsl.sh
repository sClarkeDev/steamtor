#!/usr/bin/env bash
# WXT can't open a browser under WSL, so run its dev server and let web-ext
# launch WSL Chrome (via WSLg) on the dev build. WXT handles reloads itself.
set -euo pipefail
cd "$(dirname "$0")/.."

out=.output/chrome-mv3-dev
rm -f "$out/manifest.json"

npx wxt &
wxt_pid=$!
trap 'kill $wxt_pid 2>/dev/null' EXIT

until [[ -f $out/manifest.json ]]; do
  kill -0 $wxt_pid 2>/dev/null || exit 1
  sleep 0.5
done

npx web-ext run \
  --target chromium \
  --chromium-binary "$PWD/scripts/chrome-wsl.sh" \
  --source-dir "$out" \
  --no-reload \
  --start-url https://store.steampowered.com/app/1091500/
