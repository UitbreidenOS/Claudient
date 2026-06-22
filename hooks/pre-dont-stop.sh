#!/usr/bin/env bash
# Pre-flight validation for Don't Stop autonomous execution engine
set -euo pipefail

INPUT=$(cat)
CWD=$(echo "$INPUT" | jq -r '.cwd // "."')
GOAL=$(echo "$INPUT" | jq -r '.goal // ""')
TOKEN_BUDGET=$(echo "$INPUT" | jq -r '.token_budget // 200000')
TIMESTAMP=$(date '+%Y%m%d-%H%M%S')

# ANSI Colors
BOLD='\033[1m'
GREEN='\033[32m'
YELLOW='\033[33m'
RED='\033[31m'
CYAN='\033[36m'
RESET='\033[0m'

# Exit codes
EXIT_SUCCESS=0
EXIT_GIT_DIRTY=10
EXIT_TOKEN_BUDGET=11
EXIT_INVALID_GOAL=12
EXIT_BACKUP_FAILED=13

# ===== Utility Functions =====

log_header() {
  echo -e "\n${BOLD}${CYAN}[PRE-FLIGHT]${RESET} $1"
}

log_pass() {
  echo -e "  ${GREEN}✓${RESET} $1"
}

log_warn() {
  echo -e "  ${YELLOW}!${RESET} $1"
}

log_error() {
  echo -e "  ${RED}✗${RESET} $1"
}

# ===== Check 1: Git Status =====

check_git_status() {
  log_header "Checking git status..."

  cd "$CWD" || return 1

  # Get git status
  if ! git rev-parse --git-dir > /dev/null 2>&1; then
    log_warn "Not a git repository; skipping git checks"
    return 0
  fi

  # Check for uncommitted changes
  if ! git diff-index --quiet HEAD --; then
    log_warn "Uncommitted changes detected"

    # Attempt auto-stash
    if git stash push -m "dont-stop-preflight-$TIMESTAMP" > /dev/null 2>&1; then
      log_pass "Changes auto-stashed: dont-stop-preflight-$TIMESTAMP"
    else
      log_error "Uncommitted changes will interfere with goal execution"
      return $EXIT_GIT_DIRTY
    fi
  fi

  # Check for untracked files
  UNTRACKED_COUNT=$(git ls-files --others --exclude-standard | wc -l)
  if [[ $UNTRACKED_COUNT -gt 0 ]]; then
    log_warn "Found $UNTRACKED_COUNT untracked files (will be ignored)"
  fi

  log_pass "Git status clean"
  return 0
}

# ===== Check 2: Token Budget =====

check_token_budget() {
  log_header "Checking token budget..."

  # Count estimated tasks from goal
  TASK_COUNT=$(echo "$GOAL" | tr ',' '\n' | wc -l)

  # Rough token estimation: 3000-5000 tokens per task
  ESTIMATED_TOKENS=$((TASK_COUNT * 4000))

  if [[ $ESTIMATED_TOKENS -gt $TOKEN_BUDGET ]]; then
    log_error "Estimated tokens ($ESTIMATED_TOKENS) exceed budget ($TOKEN_BUDGET)"
    log_error "Reduce goal complexity or increase budget"
    return $EXIT_TOKEN_BUDGET
  fi

  REMAINING=$((TOKEN_BUDGET - ESTIMATED_TOKENS))
  USAGE_PCT=$((ESTIMATED_TOKENS * 100 / TOKEN_BUDGET))

  log_pass "Token budget: $TOKEN_BUDGET available, ~${USAGE_PCT}% will be used"
  log_pass "Estimated remaining after execution: ~$REMAINING tokens"

  return 0
}

# ===== Check 3: Goal Parsing =====

check_goal_parsing() {
  log_header "Validating goal string..."

  if [[ -z "$GOAL" ]]; then
    log_error "Goal string is empty"
    return $EXIT_INVALID_GOAL
  fi

  # Extract task count
  TASK_COUNT=$(echo "$GOAL" | grep -o '[,;]' | wc -l)
  ((TASK_COUNT++)) # Number of tasks = separators + 1

  if [[ $TASK_COUNT -lt 1 ]]; then
    log_error "Could not parse any tasks from goal"
    return $EXIT_INVALID_GOAL
  fi

  log_pass "Parsed $TASK_COUNT tasks from goal"
  log_pass "Goal string is valid"

  # Echo parsed structure for engine consumption
  cat > "$CWD/.claude/parsed-goal.json" << EOF
{
  "goal": "$GOAL",
  "taskCount": $TASK_COUNT,
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF

  return 0
}

# ===== Check 4: Create Backup Branch =====

create_backup_branch() {
  log_header "Creating backup branch..."

  cd "$CWD" || return 1

  if ! git rev-parse --git-dir > /dev/null 2>&1; then
    log_warn "Not a git repository; skipping backup branch"
    return 0
  fi

  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  BACKUP_BRANCH="dont-stop-backup-$TIMESTAMP"

  if git checkout -b "$BACKUP_BRANCH" 2>/dev/null; then
    log_pass "Backup branch created: $BACKUP_BRANCH"
    # Return to original branch
    git checkout "$CURRENT_BRANCH" > /dev/null 2>&1
    return 0
  else
    log_error "Failed to create backup branch"
    return $EXIT_BACKUP_FAILED
  fi
}

# ===== Check 5: Safety Mode Setup =====

setup_safety_mode() {
  log_header "Enabling safety mode..."

  CLAUDE_DIR="$CWD/.claude"
  mkdir -p "$CLAUDE_DIR"

  # Create safety config
  cat > "$CLAUDE_DIR/safety-mode.json" << EOF
{
  "enabled": true,
  "startTime": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "mode": "dont-stop-preflight",
  "settings": {
    "commitMode": "isolated",
    "errorLevel": "strict",
    "backupBranch": "${BACKUP_BRANCH:-}",
    "maxRetries": 3,
    "circuitBreakerThreshold": 5
  }
}
EOF

  log_pass "Safety mode enabled"
  log_pass "Execution will use isolated commits with strict error handling"

  return 0
}

# ===== Main Preflight Sequence =====

main() {
  echo -e "\n${BOLD}${CYAN}═══════════════════════════════════════════════════════════${RESET}"
  echo -e "${BOLD}${CYAN}  DON'T STOP ENGINE - PRE-FLIGHT CHECKS${RESET}"
  echo -e "${BOLD}${CYAN}═══════════════════════════════════════════════════════════${RESET}"

  # Execute checks in sequence
  check_git_status || return $?
  check_goal_parsing || return $?
  check_token_budget || return $?
  create_backup_branch || return $?
  setup_safety_mode || return $?

  # Summary
  echo -e "\n${BOLD}${GREEN}✓ All pre-flight checks passed${RESET}"
  echo -e "${CYAN}Ready to launch Don't Stop execution engine${RESET}\n"

  return $EXIT_SUCCESS
}

main "$@"
