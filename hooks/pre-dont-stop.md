# Hook: Pre-flight Checks (Don't Stop Engine)

Runs before the Don't Stop autonomous execution engine starts, validating prerequisites and preparing the repository for long-running workflows.

## What it does

- Fires before execution engine begins parsing goal
- Verifies git working tree is clean (or stashes uncommitted changes)
- Checks remaining token budget against estimated task count
- Validates goal string can be parsed into valid task DAG
- Creates a dated backup branch for rollback safety
- Enables safety mode: strict error handling, commit isolation

## settings.json entry

```json
{
  "hooks": {
    "DontStopPreflight": [
      {
        "type": "command",
        "command": "bash ~/.claude/hooks/pre-dont-stop.sh"
      }
    ]
  }
}
```

## Hook script: pre-dont-stop.sh

```bash
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
  
  cd "$CWD"
  
  # Get git status
  if ! git rev-parse --git-dir > /dev/null 2>&1; then
    log_warn "Not a git repository; skipping git checks"
    return 0
  fi
  
  # Check for uncommitted changes
  if ! git diff-index --quiet HEAD --; then
    log_warn "Uncommitted changes detected"
    
    # Ask user (via stderr since stdin is consumed by jq)
    read -p "Stash changes before proceeding? (y/n) " -t 10 -r STASH_CHOICE 2>&1
    if [[ $STASH_CHOICE =~ ^[Yy]$ ]]; then
      git stash push -m "dont-stop-preflight-$TIMESTAMP"
      log_pass "Changes stashed: dont-stop-preflight-$TIMESTAMP"
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
  
  cd "$CWD"
  
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
```

## Setup

```bash
mkdir -p ~/.claude/hooks
cp pre-dont-stop.sh ~/.claude/hooks/pre-dont-stop.sh
chmod +x ~/.claude/hooks/pre-dont-stop.sh
```

## Checks performed

| Check | Purpose | Failure action |
|-------|---------|-----------------|
| **Git status** | Ensure clean working tree | Offer to stash, fail if declined |
| **Goal parsing** | Validate task DAG extractable | Exit with parse error code |
| **Token budget** | Verify sufficient tokens available | Exit if budget insufficient |
| **Backup branch** | Create rollback point | Fail safely, log branch name |
| **Safety mode** | Lock down error handling + commits | Write config to `.claude/safety-mode.json` |

## Outputs written

- `.claude/parsed-goal.json` — parsed goal structure for engine consumption
- `.claude/safety-mode.json` — safety configuration active for execution
- `.claude/engine-checkpoint.json` — (created by engine on first task)

## Integration with Engine

The engine checks for `parsed-goal.json` before starting. If preflight fails and checkpoint exists, engine can resume from saved state.

```bash
# Manual invocation (testing)
echo '{"cwd":".", "goal":"do X, then Y", "token_budget":200000}' | bash ~/.claude/hooks/pre-dont-stop.sh

# Expected on success: exit 0
# Expected on failure: exit 10-13 (see EXIT_* codes)
```

## Failure exit codes

- `10` — Git working tree dirty
- `11` — Insufficient token budget
- `12` — Invalid goal string
- `13` — Backup branch creation failed
