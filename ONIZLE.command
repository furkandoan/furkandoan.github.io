#!/bin/zsh
cd -- "$(dirname -- "$0")" || exit 1
if command -v node >/dev/null 2>&1; then
  preview_node="$(command -v node)"
elif [[ -x "$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node" ]]; then
  preview_node="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
else
  print "Node.js bulunamadı. BASLANGIC-TR.md dosyasındaki 2. adımı uygulayın."
  read "?Çıkmak için Enter'a basın. "
  exit 1
fi
"$preview_node" scripts/serve-preview.mjs
