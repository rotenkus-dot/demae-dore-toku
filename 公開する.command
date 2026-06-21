#!/bin/zsh
SCRIPT_DIR="${0:A:h}"
node '/Users/user/Documents/Codex/2026-06-21/mac-v0-next-js-web-macos/mendoi-publish-auto.js' --config "$SCRIPT_DIR/publish-auto.config.json"
exit $?
