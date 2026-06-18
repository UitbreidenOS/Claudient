#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Color constants
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const MAGENTA = '\x1b[35m';
const RESET = '\x1b[0m';
const DIM = '\x1b[2m';

function ask(questionText) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => {
    rl.question(questionText, answer => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function runGit(args) {
  try {
    return execSync(`git ${args}`, { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch (error) {
    throw new Error(error.stderr ? error.stderr.trim() : error.message);
  }
}

async function main() {
  console.log(`\n${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`  ${BOLD}${MAGENTA}AUTONOMOUS GIT BISECT DEBUGGER${RESET}`);
  console.log(`  ${YELLOW}Locate regression commits causing test failures automatically...${RESET}`);
  console.log(`${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}\n`);

  // Parse arguments
  const args = process.argv.slice(2);
  let goodCommit = '';
  let badCommit = 'HEAD';
  let testCommand = '';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--good' || args[i] === '-g') {
      goodCommit = args[i + 1] || '';
      i++;
    } else if (args[i] === '--bad' || args[i] === '-b') {
      badCommit = args[i + 1] || '';
      i++;
    } else if (args[i] === '--test' || args[i] === '-t') {
      testCommand = args[i + 1] || '';
      i++;
    }
  }

  // Interactive prompts if missing
  if (!goodCommit) {
    console.log(`${BOLD}${YELLOW}Input Required:${RESET}`);
    goodCommit = await ask(`  Enter a known ${GREEN}GOOD${RESET} commit hash/ref (e.g. origin/main or a SHA): `);
    if (!goodCommit) {
      console.error(`${RED}Error: Good commit is required.${RESET}`);
      process.exit(1);
    }
  }

  if (!testCommand) {
    testCommand = await ask(`  Enter the test command to execute (e.g. "npm run test" or "node test.js"): `);
    if (!testCommand) {
      console.error(`${RED}Error: Test command is required.${RESET}`);
      process.exit(1);
    }
  }

  console.log(`\n${CYAN}Starting bisect session with:${RESET}`);
  console.log(`  - Good commit: ${GREEN}${goodCommit}${RESET}`);
  console.log(`  - Bad commit:  ${RED}${badCommit}${RESET}`);
  console.log(`  - Test command: ${YELLOW}${testCommand}${RESET}\n`);

  // Verify git repository
  try {
    runGit('rev-parse --is-inside-work-tree');
  } catch (e) {
    console.error(`${RED}Error: Not a git repository or git is not installed.${RESET}`);
    process.exit(1);
  }

  // Handle cleanup on interrupt
  let bisectActive = false;
  const cleanup = () => {
    if (bisectActive) {
      console.log(`\n${YELLOW}Resetting git bisect...${RESET}`);
      try {
        runGit('bisect reset');
      } catch (e) {
        // ignore
      }
      bisectActive = false;
    }
  };

  process.on('SIGINT', () => {
    cleanup();
    process.exit(130);
  });

  try {
    // Start bisect
    console.log(`${CYAN}Initializing git bisect...${RESET}`);
    runGit('bisect start');
    bisectActive = true;
    
    // Set bad & good
    runGit(`bisect bad ${badCommit}`);
    const initOutput = runGit(`bisect good ${goodCommit}`);
    
    let currentOutput = initOutput;
    let stepCount = 1;

    while (true) {
      // Check if we already found the bad commit
      if (currentOutput.includes('is the first bad commit')) {
        break;
      }

      // Get current commit hash and details
      const currentCommit = runGit('rev-parse HEAD');
      const commitInfo = runGit(`show -s --format="%h - %an: %s" ${currentCommit}`);

      console.log(`${BOLD}${CYAN}────────────────────────────────────────────────────────────────────────────────${RESET}`);
      console.log(`${BOLD}Step ${stepCount}:${RESET} Testing commit ${YELLOW}${currentCommit.substring(0, 10)}${RESET}`);
      console.log(`${DIM}${commitInfo}${RESET}`);
      console.log(`${BOLD}Executing command:${RESET} ${testCommand}`);

      let testPassed = false;
      try {
        execSync(testCommand, { stdio: 'inherit' });
        testPassed = true;
        console.log(`\n${GREEN}✔ Test PASSED at this commit.${RESET}`);
      } catch (error) {
        console.log(`\n${RED}✗ Test FAILED at this commit.${RESET}`);
      }

      // Feedback to git bisect
      if (testPassed) {
        console.log(`Marking as ${GREEN}good${RESET}...`);
        currentOutput = runGit('bisect good');
      } else {
        console.log(`Marking as ${RED}bad${RESET}...`);
        currentOutput = runGit('bisect bad');
      }

      stepCount++;
    }

    // Finished bisect!
    console.log(`${BOLD}${CYAN}────────────────────────────────────────────────────────────────────────────────${RESET}`);
    const match = currentOutput.match(/([a-f0-9]{40}) is the first bad commit/i);
    const badSha = match ? match[1] : runGit('bisect bad'); 
    
    const firstBadSha = badSha.split('\n')[0].trim().split(' ')[0];

    // Show details
    const author = runGit(`show -s --format="%an <%ae>" ${firstBadSha}`);
    const date = runGit(`show -s --format="%ad" ${firstBadSha}`);
    const message = runGit(`show -s --format="%s" ${firstBadSha}`);
    
    console.log(`\n${BOLD}${RED}🎯 REGRESSION COMMIT IDENTIFIED!${RESET}`);
    console.log(`  ${BOLD}SHA:${RESET}    ${RED}${firstBadSha}${RESET}`);
    console.log(`  ${BOLD}Author:${RESET} ${author}`);
    console.log(`  ${BOLD}Date:${RESET}   ${date}`);
    console.log(`  ${BOLD}Commit:${RESET} ${message}\n`);

    cleanup();
    console.log(`${GREEN}✔ Git bisect completed and reset successfully.${RESET}\n`);

  } catch (error) {
    console.error(`\n${RED}Error during git bisect:${RESET}`, error.message);
    cleanup();
    process.exit(1);
  }
}

main();
