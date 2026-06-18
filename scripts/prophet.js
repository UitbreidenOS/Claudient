#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CWD = process.cwd();
const CLAUDE_DIR = path.join(CWD, '.claude');
const PROPHET_REPORT_PATH = path.join(CLAUDE_DIR, 'prophet-forecast.md');

// Colors
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const MAGENTA = '\x1b[35m';
const RESET = '\x1b[0m';
const DIM = '\x1b[2m';

function getGitCommitLogs() {
  try {
    return execSync('git log --name-only --oneline -n 100', { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch (e) {
    return '';
  }
}

function calculateChurn(gitOutput) {
  const fileChurn = {};
  if (!gitOutput) return fileChurn;

  const lines = gitOutput.split('\n');
  lines.forEach(line => {
    const trimmed = line.trim();
    // Skip empty lines or git log description lines (which start with commit hash)
    if (!trimmed || /^[a-f0-9]{7,40}\s/.test(trimmed)) return;
    
    // Skip non-code files
    const ext = path.extname(trimmed);
    if (!['.js', '.ts', '.tsx', '.py'].includes(ext)) return;
    if (trimmed.startsWith('node_modules/') || trimmed.startsWith('dist/')) return;

    fileChurn[trimmed] = (fileChurn[trimmed] || 0) + 1;
  });

  return fileChurn;
}

function getLineCount(filePath) {
  const fullPath = path.join(CWD, filePath);
  if (!fs.existsSync(fullPath)) return 0;
  try {
    const content = fs.readFileSync(fullPath, 'utf-8');
    return content.split('\n').length;
  } catch (e) {
    return 0;
  }
}

function main() {
  console.log(`\n${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`  ${BOLD}${MAGENTA}THE PROPHET: PREDICTIVE TECH DEBT ANALYZER${RESET}`);
  console.log(`  ${YELLOW}Identifying high-churn hotspots and predicting outage-prone modules...${RESET}`);
  console.log(`${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}\n`);

  const logs = getGitCommitLogs();
  if (!logs) {
    console.log(`${YELLOW}⚠ Warning: No git log history detected. Unable to calculate file churn.${RESET}`);
    console.log(`  Creating standard template report.\n`);
  }

  const churn = calculateChurn(logs);
  const hotSpots = [];

  Object.keys(churn).forEach(file => {
    const lines = getLineCount(file);
    const churnCount = churn[file];
    
    // Risk score formula: Churn * Complexity (approximated by line count)
    const complexityScore = lines / 100;
    const riskScore = parseFloat((churnCount * complexityScore).toFixed(2));

    hotSpots.push({
      file,
      churn: churnCount,
      lines,
      risk: riskScore
    });
  });

  // Sort by risk descending
  hotSpots.sort((a, b) => b.risk - a.risk);

  console.log(`${BOLD}Top Code Hotspots (Outage Risk Analysis):${RESET}`);
  if (hotSpots.length === 0) {
    console.log(`  ${GREEN}✓ No high-churn code modules detected. Codebase is stable.${RESET}\n`);
  } else {
    hotSpots.slice(0, 5).forEach((h, index) => {
      const rank = index + 1;
      let color = GREEN;
      if (h.risk > 5) color = RED;
      else if (h.risk > 2) color = YELLOW;

      console.log(`  ${rank}. ${BOLD}${h.file}${RESET}`);
      console.log(`     - Git Churn:  ${CYAN}${h.churn} edits${RESET}`);
      console.log(`     - Lines count: ${CYAN}${h.lines} lines${RESET}`);
      console.log(`     - Risk Index:  ${color}${h.risk}${RESET}`);
    });
    console.log();
  }

  // Generate Report Markdown
  let report = `# The Prophet: Predictive Outage & Tech Debt Report\n\n`;
  report += `Generated: ${new Date().toISOString()} | Target Workspace: \`${CWD}\`\n\n`;
  report += `This report ranks codebase files by **Outage Risk Score**, which is calculated as:\n`;
  report += `$$\\text{Risk Score} = \\text{Git Churn (last 100 commits)} \\times \\frac{\\text{Line Count}}{100}$$\n\n`;

  report += `## 📊 Top Hotspot Risk Ranking\n\n`;
  report += `| Rank | File Path | Churn (Edits) | Line Count | Outage Risk Score |\n`;
  report += `| :--- | :--- | :--- | :--- | :--- |\n`;

  hotSpots.forEach((h, idx) => {
    report += `| ${idx + 1} | \`${h.file}\` | ${h.churn} | ${h.lines} | **${h.risk}** |\n`;
  });

  report += `\n## 💡 Key Recommendations\n`;
  if (hotSpots.length > 0 && hotSpots[0].risk > 5) {
    report += `1. **Refactor \`${hotSpots[0].file}\`**: High risk score indicates excessive complexity combined with frequent modifications. Split this module into smaller, isolated components to reduce regression potential.\n`;
  }
  report += `2. **Increase Test Coverage**: Add unit tests covering high-churn files to prevent future outages during rapid changes.\n`;

  if (!fs.existsSync(CLAUDE_DIR)) {
    fs.mkdirSync(CLAUDE_DIR, { recursive: true });
  }

  fs.writeFileSync(PROPHET_REPORT_PATH, report, 'utf-8');

  console.log(`${BOLD}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`📄 Saved predictive analysis report to: ${YELLOW}${PROPHET_REPORT_PATH}${RESET}\n`);
}

main();
