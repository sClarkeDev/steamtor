#!/usr/bin/env bash
# chrome-launcher rewrites --user-data-dir to a Windows UNC path under WSL,
# which Linux Chrome treats as a relative folder name. Convert it back.
args=()
for arg in "$@"; do
  if [[ $arg == --user-data-dir=\\\\* ]]; then
    arg="--user-data-dir=$(wslpath -u "${arg#--user-data-dir=}")"
  fi
  args+=("$arg")
done
exec "${CHROME_BIN:-/usr/bin/google-chrome}" "${args[@]}"
