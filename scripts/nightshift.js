#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CWD = process.cwd();
const CLAUDE_DIR = path.join(CWD, '.claude');
const TASKS_PATH = path.join(CLAUDE_DIR, 'nightshift-tasks.json');
const LOG_PATH = path.join(CLAUDE_DIR, 'nightshift-log.md');
const STATUS_PATH = path.join(CLAUDE_DIR, 'nightshift-status.json');

// Color constants
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const MAGENTA = '\x1b[35m';
const RESET = '\x1b[0m';
const DIM = '\x1b[2m';

const DEFAULT_TASKS = [
  {
    name: 'Verify frontmatter formatting',
    command: 'node scripts/validate-frontmatter.js',
    required: false
  },
  {
    name: 'Validate catalog structures',
    command: 'node scripts/validate-catalog.js',
    required: false
  },
  {
    name: 'Build project index',
    command: 'node scripts/build-index.js',
    required: false
  },
  {
    name: 'Build catalog references',
    command: 'node scripts/build-catalog.js',
    required: false
  }
];

function initTasksFile() {
  if (!fs.existsSync(CLAUDE_DIR)) {
    fs.mkdirSync(CLAUDE_DIR, { recursive: true });
  }
  if (!fs.existsSync(TASKS_PATH)) {
    fs.writeFileSync(TASKS_PATH, JSON.stringify(DEFAULT_TASKS, null, 2), 'utf-8');
  }
}

function loadTasks() {
  initTasksFile();
  try {
    return JSON.parse(fs.readFileSync(TASKS_PATH, 'utf-8'));
  } catch (e) {
    console.error(`${RED}Failed to read tasks file, using defaults.${RESET}`);
    return DEFAULT_TASKS;
  }
}

async function runTaskWithRetry(task) {
  let attempts = 0;
  const maxAttempts = 3;
  let delay = 2000;

  while (attempts < maxAttempts) {
    attempts++;
    console.log(`\n${CYAN}Running task: ${BOLD}${task.name}${RESET} (Attempt ${attempts}/${maxAttempts})`);
    console.log(`${DIM}Command: ${task.command}${RESET}`);

    try {
      const stdout = execSync(task.command, { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'pipe'] });
      console.log(`${GREEN}✔ Success! Output length: ${stdout.length} chars.${RESET}`);
      return { success: true, output: stdout, attempts };
    } catch (error) {
      const outputStr = (error.stdout || '') + '\n' + (error.stderr || '');
      const isRateLimit = /rate\s*limit|limit\s*exceeded|too\s*many\s*requests|429|resource_exhausted/i.test(outputStr);

      if (isRateLimit && attempts < maxAttempts) {
        console.log(`${YELLOW}⚠ Rate limit detected. Backing off for ${delay}ms before retry...${RESET}`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; 
      } else {
        console.log(`${RED}✗ Failure. Exit code: ${error.status || 1}${RESET}`);
        return { success: false, output: outputStr, attempts, error: error.message };
      }
    }
  }
  return { success: false, output: 'Max retry attempts exceeded.', attempts };
}

async function main() {
  console.log(`\n${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`  ${BOLD}${MAGENTA}NIGHT SHIFT: AUTONOMOUS BATCH REFACTORING DAEMON${RESET}`);
  console.log(`  ${YELLOW}Executing long-running workspace updates with automated backoffs...${RESET}`);
  console.log(`${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}\n`);

  const tasks = loadTasks();
  console.log(`Loaded ${tasks.length} tasks from ${YELLOW}${TASKS_PATH}${RESET}.\n`);

  const results = [];
  let allSuccessful = true;

  for (let task of tasks) {
    const res = await runTaskWithRetry(task);
    results.push({
      task: task.name,
      command: task.command,
      ...res
    });

    if (!res.success && task.required) {
      console.log(`\n${RED}🛑 Required task failed! Aborting night shift execution.${RESET}`);
      allSuccessful = false;
      break;
    }
    if (!res.success) {
      allSuccessful = false;
    }
  }

  fs.writeFileSync(STATUS_PATH, JSON.stringify({
    timestamp: new Date().toISOString(),
    allSuccessful,
    results
  }, null, 2), 'utf-8');

  let mdLog = `# Night Shift Execution Log\n\n`;
  mdLog += `Date: ${new Date().toISOString()}\n`;
  mdLog += `Overall Status: ${allSuccessful ? '**SUCCESS** 🟢' : '**FAILED/PARTIAL** 🔴'}\n\n`;
  mdLog += `## 📋 Task Results\n\n`;

  results.forEach(res => {
    mdLog += `### ${res.success ? '🟢' : '🔴'} ${res.task}\n`;
    mdLog += `- **Command**: \`${res.command}\`\n`;
    mdLog += `- **Attempts**: ${res.attempts}\n`;
    mdLog += `- **Status**: ${res.success ? 'Success' : 'Failed'}\n`;
    if (!res.success) {
      mdLog += `- **Details**: ${res.error || 'N/A'}\n`;
    }
    mdLog += `\n`;
  });

  fs.writeFileSync(LOG_PATH, mdLog, 'utf-8');

  console.log(`\n${BOLD}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`📄 Saved night shift execution log to: ${YELLOW}${LOG_PATH}${RESET}`);
  console.log(`📊 Saved status object to: ${YELLOW}${STATUS_PATH}${RESET}\n`);

  if (!allSuccessful) {
    process.exit(1);
  }
}

main();
