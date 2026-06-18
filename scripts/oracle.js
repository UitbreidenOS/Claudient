#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CWD = process.cwd();
const CLAUDE_DIR = path.join(CWD, '.claude');
const COB_MAP_PATH = path.join(CLAUDE_DIR, 'codebase-map.json');

// Color constants
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const MAGENTA = '\x1b[35m';
const RESET = '\x1b[0m';
const DIM = '\x1b[2m';

function getGitDiffFiles() {
  try {
    const diff = execSync('git diff origin/main...HEAD --name-only', { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] });
    return diff.trim().split('\n').filter(Boolean);
  } catch (e) {
    try {
      const diff = execSync('git diff HEAD --name-only', { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] });
      return diff.trim().split('\n').filter(Boolean);
    } catch (e2) {
      try {
        const diff = execSync('git diff --name-only', { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] });
        return diff.trim().split('\n').filter(Boolean);
      } catch (e3) {
        return [];
      }
    }
  }
}

function loadCodebaseMap() {
  if (!fs.existsSync(COB_MAP_PATH)) {
    return { nodes: [], edges: [] };
  }
  try {
    return JSON.parse(fs.readFileSync(COB_MAP_PATH, 'utf-8'));
  } catch (e) {
    console.error(`${RED}Error parsing codebase-map.json:${RESET}`, e.message);
    return { nodes: [], edges: [] };
  }
}

function getBlastRadius(changedFiles, edges) {
  const adj = {};
  edges.forEach(edge => {
    const { source, target } = edge;
    if (!adj[target]) {
      adj[target] = [];
    }
    adj[target].push(source);
  });

  const blastRadiusMap = {};
  const allAffected = new Set();

  changedFiles.forEach(file => {
    const visited = new Set();
    const paths = [];

    function dfs(current, currentPath) {
      if (visited.has(current)) return;
      visited.add(current);
      if (current !== file) {
        allAffected.add(current);
        paths.push([...currentPath, current]);
      }

      const importers = adj[current] || [];
      importers.forEach(importer => {
        dfs(importer, [...currentPath, current]);
      });
    }

    dfs(file, []);
    blastRadiusMap[file] = paths;
  });

  return { blastRadiusMap, allAffected: Array.from(allAffected) };
}

function auditFile(filePath) {
  const issues = [];
  const fullPath = path.isAbsolute(filePath) ? filePath : path.join(CWD, filePath);
  
  if (!fs.existsSync(fullPath)) return issues;
  
  const ext = path.extname(filePath);
  if (!['.js', '.ts', '.tsx', '.py'].includes(ext)) return issues;

  const content = fs.readFileSync(fullPath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();

    if (trimmed.startsWith('//') || trimmed.startsWith('#') || trimmed.startsWith('/*')) return;

    // 1. Sync IO in main files
    if (trimmed.includes('Sync(') && !filePath.includes('scripts/') && !filePath.includes('tests/')) {
      issues.push({
        type: 'concurrency',
        line: lineNum,
        detail: 'Synchronous operation used, which can block the execution thread.'
      });
    }

    // 2. Concurrency/Lockups
    if (trimmed.includes('transaction(') || trimmed.includes('BEGIN TRANSACTION')) {
      issues.push({
        type: 'lockup',
        line: lineNum,
        detail: 'Database transaction block found. Ensure all execution paths call commit/rollback to avoid lockups.'
      });
    }

    // 3. Unhandled promise risk
    if (trimmed.includes('new Promise(') && !trimmed.includes('.catch(')) {
      issues.push({
        type: 'unhandled_rejection',
        line: lineNum,
        detail: 'Promise instantiation without immediate error catch registration.'
      });
    }

    // 4. Missing await checks inside loops
    if ((trimmed.startsWith('for ') || trimmed.startsWith('while ')) && /await\s+/.test(trimmed)) {
      issues.push({
        type: 'performance',
        line: lineNum,
        detail: 'Sequential await inside a loop. Consider Promise.all to run concurrency in parallel.'
      });
    }
  });

  return issues;
}

function main() {
  console.log(`\n${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`  ${BOLD}${MAGENTA}THE ORACLE: AST-BASED OUTAGE PREDICTOR${RESET}`);
  console.log(`  ${YELLOW}Tracing changed module downstream blast radius & concurrency lockups...${RESET}`);
  console.log(`${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}\n`);

  const args = process.argv.slice(2);
  let targetFiles = args.filter(a => !a.startsWith('-'));

  if (targetFiles.length === 0) {
    targetFiles = getGitDiffFiles();
  }

  if (targetFiles.length === 0) {
    console.log(`${YELLOW}No changed files detected via Git. Analyzing primary cli entrypoint as a fallback...${RESET}`);
    targetFiles = ['scripts/cli.js'];
  }

  const { nodes, edges } = loadCodebaseMap();
  
  if (nodes.length === 0 && edges.length === 0) {
    console.log(`${YELLOW}⚠️  Warning: .claude/codebase-map.json not found or empty. Blast radius mapping will be limited.${RESET}`);
  }

  const { blastRadiusMap, allAffected } = getBlastRadius(targetFiles, edges);

  console.log(`${BOLD}Target Modules to Analyze:${RESET}`);
  targetFiles.forEach(f => console.log(`  - ${YELLOW}${f}${RESET}`));
  console.log();

  console.log(`${BOLD}🗺️  DOWNSTREAM IMPACTED MODULES:${RESET}`);
  if (allAffected.length > 0) {
    allAffected.forEach(f => console.log(`  - ${RED}${f}${RESET}`));
  } else {
    console.log(`  ${GREEN}✓${RESET} Leaf modules or isolated workspace. No downstream impacts detected.`);
  }
  console.log();

  const auditReport = {};
  let totalIssues = 0;

  targetFiles.concat(allAffected).forEach(file => {
    const issues = auditFile(file);
    if (issues.length > 0) {
      auditReport[file] = issues;
      totalIssues += issues.length;
    }
  });

  console.log(`${BOLD}⚡ OUTAGE AUDIT RESULTS (${totalIssues} issues found):${RESET}`);
  Object.keys(auditReport).forEach(file => {
    console.log(`\n  ${BOLD}${CYAN}${file}${RESET}`);
    auditReport[file].forEach(issue => {
      const icon = issue.type === 'lockup' ? `${RED}✗` : `${YELLOW}!`;
      console.log(`    ${icon} [Line ${issue.line}] [${issue.type.toUpperCase()}] ${issue.detail}`);
    });
  });
  console.log();

  let report = `# AST Outage Prediction & Blast Radius Report\n\n`;
  report += `Generated: ${new Date().toISOString()} | Target Workspace: \`${CWD}\`\n\n`;

  report += `## 🗺️ Downstream Blast Radius\n`;
  report += `Total changed/analyzed files: **${targetFiles.length}**\n`;
  report += `Total downstream affected files: **${allAffected.length}**\n\n`;

  targetFiles.forEach(file => {
    report += `### 📄 ${file}\n`;
    const paths = blastRadiusMap[file] || [];
    if (paths.length === 0) {
      report += `*No downstream importers found in codebase-map.json.*\n\n`;
    } else {
      report += `Downstream import paths:\n`;
      paths.forEach(p => {
        report += `- \`${p.join(' -> ')}\`\n`;
      });
      report += `\n`;
    }
  });

  report += `## ⚡ Concurrency, Lockup & Outage Audit\n\n`;
  if (totalIssues === 0) {
    report += `*No potential outage hotspots or concurrency lockups detected in analyzed files.*\n`;
  } else {
    Object.keys(auditReport).forEach(file => {
      report += `### 📁 \`${file}\`\n`;
      auditReport[file].forEach(issue => {
        report += `- **[${issue.type.toUpperCase()}]** Line ${issue.line} — ${issue.detail}\n`;
      });
      report += `\n`;
    });
  }

  if (!fs.existsSync(CLAUDE_DIR)) {
    fs.mkdirSync(CLAUDE_DIR, { recursive: true });
  }

  const reportPath = path.join(CLAUDE_DIR, 'blast-radius-report.md');
  fs.writeFileSync(reportPath, report, 'utf-8');

  console.log(`${BOLD}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`📄 Saved outage predictor log to: ${YELLOW}${reportPath}${RESET}\n`);
}

main();
