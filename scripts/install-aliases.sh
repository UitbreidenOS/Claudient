#!/bin/bash

# install-aliases.sh
# Sets up high-speed Claudient shell aliases.

ALIAS_FILE="$HOME/.claudient_aliases"

cat << 'EOF' > "$ALIAS_FILE"
# Claudient Power Aliases
alias cx="npx claudient"
alias cxd="cx doctor"
alias cxs="cx score"
alias cxa="cx audit"
alias cxc="cx consult"
alias cxb="cx benchmark"
EOF

echo "✅ Aliases written to $ALIAS_FILE"
echo "Add this to your .zshrc or .bashrc:"
echo "  source $ALIAS_FILE"
