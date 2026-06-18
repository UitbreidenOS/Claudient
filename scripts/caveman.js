#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const CWD = process.cwd();
const CLAUDE_RULES_DIR = path.join(CWD, '.claude', 'rules');
const CAVEMAN_FILE = path.join(CLAUDE_RULES_DIR, 'caveman-mode.md');

// Colors
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

const CAVEMAN_INSTRUCTIONS = `# Caveman Mode (Token Optimizer)

> [IMPORTANT]
> Caveman Mode is ENABLED. Follow these strict token-saving guidelines:
> 1. Eliminate all conversational English. No pleasantries, greetings (e.g. "hello", "here is the fix"), summaries, or conclusions.
> 2. Output ONLY code diffs, command-line snippets, or raw data blocks.
> 3. Do NOT explain your edits or why you made them unless explicitly questioned by the user.
> 4. Keep explanations, if any, strictly dense and abbreviated (bullet points only).
`;

function main() {
  const args = process.argv.slice(2);
  const action = args[0] || 'toggle';

  if (!fs.existsSync(CLAUDE_RULES_DIR)) {
    fs.mkdirSync(CLAUDE_RULES_DIR, { recursive: true });
  }

  const isEnabled = fs.existsSync(CAVEMAN_FILE);

  let targetState = false;
  if (action === '--enable' || action === 'enable' || action === '-e') {
    targetState = true;
  } else if (action === '--disable' || action === 'disable' || action === '-d') {
    targetState = false;
  } else {
    targetState = !isEnabled;
  }

  console.log(`\n${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`  ${BOLD}${CYAN}CAVEMAN MODE: TOKEN OPTIMIZER${RESET}`);
  console.log(`  ${YELLOW}Toggle strict DSL instructions to reduce conversational API overhead...${RESET}`);
  console.log(`${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}\n`);

  if (targetState) {
    fs.writeFileSync(CAVEMAN_FILE, CAVEMAN_INSTRUCTIONS, 'utf-8');
    console.log(`  ${GREEN}✔ Caveman Mode has been ENABLED.${RESET}`);
    console.log(`  ${YELLOW}Created rules file: ${CAVEMAN_FILE}${RESET}`);
    console.log(`  ${BOLD}Claude will now converse using raw code and direct, fluff-free syntax.${RESET}\n`);
  } else {
    if (fs.existsSync(CAVEMAN_FILE)) {
      fs.unlinkSync(CAVEMAN_FILE);
    }
    console.log(`  ${RED}✗ Caveman Mode has been DISABLED.${RESET}`);
    console.log(`  ${YELLOW}Removed rules file: ${CAVEMAN_FILE}${RESET}`);
    console.log(`  ${BOLD}Claude will revert to normal detailed explanations and guidelines.${RESET}\n`);
  }
}

main();
