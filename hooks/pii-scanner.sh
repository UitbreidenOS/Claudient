#!/usr/bin/env bash
# pii-scanner.sh — detects PII in tool inputs and blocks execution if patterns match
#
# settings.json configuration:
# {
#   "hooks": {
#     "PreToolUse": [
#       {
#         "matcher": "",
#         "hooks": [
#           {
#             "type": "command",
#             "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/pii-scanner.sh",
#             "async": false
#           }
#        ]
#       }
#     ]
#   },
#   "security": {
#     "pii_scanning": {
#       "enabled": true,
#       "action": "block",
#       "block_list": ["email", "phone", "ssn", "credit_card", "api_key"],
#       "warn_list": ["passport", "ip_address"],
#       "custom_patterns": []
#     }
#   }
# }

set -euo pipefail

INPUT=$(cat)

# Define PII patterns (capture group for replacement)
# Email
EMAIL_PATTERN='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'

# Phone: US format variations
PHONE_PATTERN='(\+?1)?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}'

# SSN: XXX-XX-XXXX
SSN_PATTERN='[0-9]{3}-[0-9]{2}-[0-9]{4}'

# Credit card: XXXX-XXXX-XXXX-XXXX (with or without separators)
CREDIT_CARD_PATTERN='[0-9]{4}[-\s]?[0-9]{4}[-\s]?[0-9]{4}[-\s]?[0-9]{4}'

# API key pattern: key=<alphanumeric>
API_KEY_PATTERN='(api[_-]?key|secret[_-]?key|access[_-]?token|authorization)["\s=:]*[A-Za-z0-9_-]{20,}'

# Passport: typically 6-9 character alphanumeric
PASSPORT_PATTERN='[A-Z]{2}[0-9]{6,7}'

# IP address (private ranges)
IP_PATTERN='(10\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}|172\.(1[6-9]|2[0-9]|3[01])\.[0-9]{1,3}\.[0-9]{1,3}|192\.168\.[0-9]{1,3}\.[0-9]{1,3})'

# Extract tool input as string
TOOL_INPUT_STR=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    inp = d.get('tool_input', {})
    # Convert all values to string for pattern matching
    print(json.dumps(inp))
except:
    print('{}')
")

TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // "unknown"' 2>/dev/null || echo "unknown")

# Scan for PII patterns
PII_FOUND=()
SCAN_TEXT="$TOOL_INPUT_STR"

# Check for emails
if echo "$SCAN_TEXT" | grep -iEq "$EMAIL_PATTERN"; then
    PII_FOUND+=("EMAIL")
fi

# Check for phone
if echo "$SCAN_TEXT" | grep -iEq "$PHONE_PATTERN"; then
    PII_FOUND+=("PHONE")
fi

# Check for SSN
if echo "$SCAN_TEXT" | grep -iEq "$SSN_PATTERN"; then
    PII_FOUND+=("SSN")
fi

# Check for credit card
if echo "$SCAN_TEXT" | grep -iEq "$CREDIT_CARD_PATTERN"; then
    PII_FOUND+=("CREDIT_CARD")
fi

# Check for API keys
if echo "$SCAN_TEXT" | grep -iEq "$API_KEY_PATTERN"; then
    PII_FOUND+=("API_KEY")
fi

# Check for passport (warning only, high false positive rate)
if echo "$SCAN_TEXT" | grep -iEq "$PASSPORT_PATTERN"; then
    PII_FOUND+=("PASSPORT")
fi

# Check for private IPs (warning only)
if echo "$SCAN_TEXT" | grep -iEq "$IP_PATTERN"; then
    PII_FOUND+=("PRIVATE_IP")
fi

# Determine action based on found PII
BLOCK_TYPES=("EMAIL" "PHONE" "SSN" "CREDIT_CARD" "API_KEY")
WARN_TYPES=("PASSPORT" "PRIVATE_IP")
SHOULD_BLOCK=false

for pii_type in "${PII_FOUND[@]}"; do
    if [[ " ${BLOCK_TYPES[@]} " =~ " ${pii_type} " ]]; then
        SHOULD_BLOCK=true
    fi
done

# Log the scan result
LOG_FILE="${CLAUDE_PROJECT_DIR:-$(pwd)}/.claude/logs/pii-scan.log"
mkdir -p "$(dirname "$LOG_FILE")"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
{
    echo "${TIMESTAMP} | Tool: ${TOOL_NAME} | Patterns found: ${PII_FOUND[*]:-NONE} | Action: $([ "$SHOULD_BLOCK" = true ] && echo BLOCKED || echo ALLOWED)"
} >> "$LOG_FILE"

# If PII found in block list, abort tool execution
if [ "$SHOULD_BLOCK" = true ]; then
    echo "ERROR: PII detected in tool input ($TOOL_NAME)"
    echo "Patterns found: ${PII_FOUND[*]}"
    echo ""
    echo "This tool call is blocked by enterprise PII scanning."
    echo "Please remove sensitive data and try again."
    echo ""
    echo "Detected patterns:"
    for pii_type in "${PII_FOUND[@]}"; do
        if [[ " ${BLOCK_TYPES[@]} " =~ " ${pii_type} " ]]; then
            echo "  - $pii_type (BLOCKED)"
        fi
    done
    exit 1
fi

# Warn if warning-type PII found
if [ ${#PII_FOUND[@]} -gt 0 ]; then
    echo "WARNING: Possible PII detected (non-blocking patterns):"
    for pii_type in "${PII_FOUND[@]}"; do
        if [[ " ${WARN_TYPES[@]} " =~ " ${pii_type} " ]]; then
            echo "  - $pii_type (WARNING: may be false positive)"
        fi
    done
    echo ""
fi

exit 0
