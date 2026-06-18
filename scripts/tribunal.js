#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CWD = process.cwd();
const CLAUDE_DIR = path.join(CWD, '.claude');

function getGitDiff() {
  try {
    // 1. Try diff against origin/main
    return execSync('git diff origin/main...HEAD', { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch (e) {
    try {
      // 2. Try diff against HEAD
      return execSync('git diff HEAD', { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] });
    } catch (e2) {
      try {
        // 3. Fall back to unstaged changes diff
        return execSync('git diff', { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] });
      } catch (e3) {
        return '';
      }
    }
  }
}

function analyzeDiff(diff) {
  const issues = {
    security: [],
    performance: [],
    architecture: []
  };

  if (!diff) {
    // Return template recommendations if diff is empty (mock run / clean slate)
    issues.architecture.push({
      file: 'General',
      line: 0,
      detail: 'No git diff changes found. Write or modify code files to trigger code analysis.'
    });
    return issues;
  }

  const lines = diff.split('\n');
  let currentFile = 'unknown';
  let lineNum = 0;

  for (let line of lines) {
    if (line.startsWith('+++ b/')) {
      currentFile = line.substring(6);
      lineNum = 0;
      continue;
    }

    if (line.startsWith('@@ ')) {
      const match = line.match(/\+(\d+)/);
      if (match) lineNum = parseInt(match[1]);
      continue;
    }

    if (line.startsWith('+') && !line.startsWith('+++')) {
      const content = line.substring(1).trim();

      // 1. Security Checks
      if (/key|secret|password|token|auth/i.test(content) && /['"=\s]/.test(content)) {
        if (/=.*['"][a-zA-Z0-9_\-+=]{16,}['"]/.test(content)) {
          issues.security.push({
            file: currentFile,
            line: lineNum,
            detail: 'Potential hardcoded credential or secret API key detected.'
          });
        }
      }
      if (/SELECT|INSERT|UPDATE|DELETE/i.test(content) && /\$\{/.test(content)) {
        issues.security.push({
          file: currentFile,
          line: lineNum,
          detail: 'Risk of raw SQL injection. Avoid direct parameter interpolation in SQL queries.'
        });
      }
      if (/eval\s*\(|dangerouslySetInnerHTML/i.test(content)) {
        issues.security.push({
          file: currentFile,
          line: lineNum,
          detail: 'Risky execution using raw eval() or dangerous HTML injection APIs.'
        });
      }

      // 2. Performance Checks
      if (content.includes('Sync(') && !currentFile.includes('scripts/') && !currentFile.includes('tests/')) {
        issues.performance.push({
          file: currentFile,
          line: lineNum,
          detail: 'Avoid synchronous file system or IO calls (`fs.writeFileSync`, etc.) in application code.'
        });
      }
      if ((content.includes('for ') || content.includes('.map(') || content.includes('.forEach(')) && 
          (/\.map\(|for\s*\(/.test(content) || /nested/i.test(content))) {
        issues.performance.push({
          file: currentFile,
          line: lineNum,
          detail: 'Potential nested loop or O(N^2) operation detected. Monitor for array scaling overhead.'
        });
      }

      // 3. Architecture Checks
      if (/TODO|FIXME/i.test(content)) {
        issues.architecture.push({
          file: currentFile,
          line: lineNum,
          detail: `Pending technical debt item: "${content.replace(/\/\/|\/\*|#/g, '').trim()}"`
        });
      }
      if (/console\.log/i.test(content) && !currentFile.includes('scripts/') && !currentFile.includes('tests/')) {
        issues.architecture.push({
          file: currentFile,
          line: lineNum,
          detail: 'Production-ready code should avoid console.log statements. Use a formal logger config.'
        });
      }

      lineNum++;
    }
  }

  return issues;
}

function main() {
  const BOLD = '\x1b[1m';
  const GREEN = '\x1b[32m';
  const YELLOW = '\x1b[33m';
  const RED = '\x1b[31m';
  const CYAN = '\x1b[36m';
  const MAGENTA = '\x1b[35m';
  const RESET = '\x1b[0m';
  const DIM = '\x1b[2m';

  console.log(`\n${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`  ${BOLD}${MAGENTA}TRIBUNAL ADVERSARIAL PR REVIEW SWARM${RESET}`);
  console.log(`  ${YELLOW}Auditing branch git diff across three automated security & performance vectors...${RESET}`);
  console.log(`${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}\n`);

  const diff = getGitDiff();
  const issues = analyzeDiff(diff);

  console.log(`${GREEN}✔${RESET} Security Hacker Auditor: Activated`);
  console.log(`${GREEN}✔${RESET} Performance Junkie Auditor: Activated`);
  console.log(`${GREEN}✔${RESET} Senior Architect Auditor: Activated\n`);

  // Write MD report
  let report = `# Tribunal PR Review Report\n\n`;
  report += `Generated: ${new Date().toISOString()} | Target Workspace: \`${CWD}\`\n\n`;

  // 1. Security Hacker Card
  console.log(`${BOLD}${RED}🕵️  SECURITY HACKER REPORT:${RESET}`);
  report += `## 🕵️ Security Hacker Audit\n`;
  if (issues.security.length > 0) {
    issues.security.forEach(issue => {
      console.log(`  ${RED}✗${RESET} [${issue.file}:${issue.line}] ${issue.detail}`);
      report += `- **[FAIL]** \`${issue.file}:${issue.line}\` — ${issue.detail}\n`;
    });
  } else {
    console.log(`  ${GREEN}✓${RESET} No obvious credentials leaks, SQL injections, or execution risks detected.`);
    report += `*No security exceptions identified. Clean bill of health.*\n`;
  }
  console.log();
  report += `\n`;

  // 2. Performance Junkie Card
  console.log(`${BOLD}${CYAN}⚡  PERFORMANCE JUNKIE REPORT:${RESET}`);
  report += `## ⚡ Performance Junkie Audit\n`;
  if (issues.performance.length > 0) {
    issues.performance.forEach(issue => {
      console.log(`  ${YELLOW}!${RESET} [${issue.file}:${issue.line}] ${issue.detail}`);
      report += `- **[WARN]** \`${issue.file}:${issue.line}\` — ${issue.detail}\n`;
    });
  } else {
    console.log(`  ${GREEN}✓${RESET} No synchronous blocking IO or high complexity loop constructs detected.`);
    report += `*No material performance regressions identified.*\n`;
  }
  console.log();
  report += `\n`;

  // 3. Senior Architect Card
  console.log(`${BOLD}${YELLOW}📐  SENIOR ARCHITECT REPORT:${RESET}`);
  report += `## 📐 Senior Architect Audit\n`;
  if (issues.architecture.length > 0) {
    issues.architecture.forEach(issue => {
      console.log(`  ${YELLOW}!${RESET} [${issue.file}:${issue.line}] ${issue.detail}`);
      report += `- **[INFO]** \`${issue.file}:${issue.line}\` — ${issue.detail}\n`;
    });
  } else {
    console.log(`  ${GREEN}✓${RESET} Code formatting and architecture guidelines align with clean guidelines.`);
    report += `*Code layout and structure pass check parameters.*\n`;
  }
  console.log();
  report += `\n`;

  if (!fs.existsSync(CLAUDE_DIR)) {
    fs.mkdirSync(CLAUDE_DIR, { recursive: true });
  }

  const reportPath = path.join(CLAUDE_DIR, 'tribunal-review.md');
  fs.writeFileSync(reportPath, report, 'utf-8');

  console.log(`${BOLD}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`📄 Saved comprehensive tribunal review logs to: ${YELLOW}${reportPath}${RESET}\n`);
}

main();
