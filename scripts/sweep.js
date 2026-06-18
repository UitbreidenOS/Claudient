#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const CWD = process.cwd();
const CLAUDE_DIR = path.join(CWD, '.claude');
const SWEEPER_REPORT_PATH = path.join(CLAUDE_DIR, 'sweeper-report.md');

// Colors
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';
const DIM = '\x1b[2m';

function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (let file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.claude' && file !== 'dist') {
        getFiles(filePath, fileList);
      }
    } else {
      if (['.js', '.ts', '.tsx'].includes(path.extname(file))) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

function analyzeFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf-8');
  const lines = code.split('\n');
  const filename = path.relative(CWD, filePath);
  
  const unusedImports = [];
  const unusedVars = [];
  const unusedFunctions = [];

  // Simple regex parser
  // 1. Unused imports finder
  // Matches: const { x, y } = require('z') or import { x } from 'z'
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;

    // Check require destructured imports
    const requireMatch = trimmed.match(/(?:const|let|var)\s+\{\s*([^}]+)\s*\}\s*=\s*require\s*\(/);
    if (requireMatch) {
      const imports = requireMatch[1].split(',').map(i => i.trim().split(' ')[0]);
      imports.forEach(imp => {
        if (!imp) return;
        // Count occurrences of imp in code
        const regex = new RegExp(`\\b${imp}\\b`, 'g');
        const count = (code.match(regex) || []).length;
        // If it occurs only once, it's just the import statement itself
        if (count <= 1) {
          unusedImports.push({ line: lineNum, name: imp });
        }
      });
    }

    // Check standard import statements
    const esmMatch = trimmed.match(/import\s+(?:(\w+)|\{\s*([^}]+)\s*\})\s+from/);
    if (esmMatch) {
      if (esmMatch[1]) {
        // Default import
        const imp = esmMatch[1];
        const regex = new RegExp(`\\b${imp}\\b`, 'g');
        const count = (code.match(regex) || []).length;
        if (count <= 1) unusedImports.push({ line: lineNum, name: imp });
      } else if (esmMatch[2]) {
        // Named imports
        const imports = esmMatch[2].split(',').map(i => i.trim().split(' ')[0]);
        imports.forEach(imp => {
          if (!imp) return;
          const regex = new RegExp(`\\b${imp}\\b`, 'g');
          const count = (code.match(regex) || []).length;
          if (count <= 1) unusedImports.push({ line: lineNum, name: imp });
        });
      }
    }

    // 2. Unused variables finder
    // Matches: const x = y or let x = y (not exported)
    const varMatch = trimmed.match(/(?:const|let|var)\s+(\w+)\s*=/);
    if (varMatch && !trimmed.startsWith('export')) {
      const varName = varMatch[1];
      // Skip common short counters or ignores
      if (['i', 'j', 'k', '_', 'e', 'err', 'error'].includes(varName)) return;
      const regex = new RegExp(`\\b${varName}\\b`, 'g');
      const count = (code.match(regex) || []).length;
      if (count <= 1) {
        unusedVars.push({ line: lineNum, name: varName });
      }
    }

    // 3. Unused functions finder
    // Matches: function x() or const x = () =>
    const funcMatch = trimmed.match(/function\s+(\w+)\s*\(/) || trimmed.match(/const\s+(\w+)\s*=\s*\([^)]*\)\s*=>/);
    if (funcMatch && !trimmed.startsWith('export') && !code.includes(`module.exports`) && !code.includes(`exports.${funcMatch[1]}`)) {
      const funcName = funcMatch[1];
      if (funcName === 'main') return; // main entry points
      const regex = new RegExp(`\\b${funcName}\\b`, 'g');
      const count = (code.match(regex) || []).length;
      if (count <= 1) {
        unusedFunctions.push({ line: lineNum, name: funcName });
      }
    }
  });

  return {
    filename,
    unusedImports,
    unusedVars,
    unusedFunctions
  };
}

function main() {
  console.log(`\n${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`  ${BOLD}${CYAN}CODEBASE SWEEPER: STATIC ANALYZER${RESET}`);
  console.log(`  ${YELLOW}Identifying dead code, unused imports, and redundant declarations...${RESET}`);
  console.log(`${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}\n`);

  const files = getFiles(path.join(CWD, 'scripts'));
  console.log(`Found ${files.length} code files to scan in scripts/ directory.\n`);

  const reports = [];
  let totalIssues = 0;

  files.forEach(f => {
    const report = analyzeFile(f);
    const issuesCount = report.unusedImports.length + report.unusedVars.length + report.unusedFunctions.length;
    if (issuesCount > 0) {
      reports.push(report);
      totalIssues += issuesCount;
    }
  });

  console.log(`${BOLD}Scan Results (${totalIssues} issues found):${RESET}`);
  reports.forEach(r => {
    console.log(`\n  ${BOLD}${YELLOW}${r.filename}${RESET}`);
    
    r.unusedImports.forEach(imp => {
      console.log(`    ${RED}✗${RESET} [Line ${imp.line}] Unused import: "${imp.name}"`);
    });
    r.unusedVars.forEach(v => {
      console.log(`    ${RED}✗${RESET} [Line ${v.line}] Unused variable: "${v.name}"`);
    });
    r.unusedFunctions.forEach(f => {
      console.log(`    ${RED}✗${RESET} [Line ${f.line}] Unused function: "${f.name}"`);
    });
  });
  console.log();

  // Create Markdown Report
  let mdReport = `# Codebase Sweeper Quality Report\n\n`;
  mdReport += `Generated: ${new Date().toISOString()} | Target Workspace: \`${CWD}\`\n`;
  mdReport += `Total issues detected: **${totalIssues}**\n\n`;

  if (totalIssues === 0) {
    mdReport += `## 🎉 Status: CLEAN\n`;
    mdReport += `*No dead code, unused variables, or unused imports detected in scanned directories.*\n`;
  } else {
    reports.forEach(r => {
      mdReport += `### 📁 \`${r.filename}\`\n`;
      if (r.unusedImports.length > 0) {
        mdReport += `#### Unused Imports\n`;
        r.unusedImports.forEach(imp => mdReport += `- Line ${imp.line}: \`${imp.name}\`\n`);
      }
      if (r.unusedVars.length > 0) {
        mdReport += `#### Unused Variables\n`;
        r.unusedVars.forEach(v => mdReport += `- Line ${v.line}: \`${v.name}\`\n`);
      }
      if (r.unusedFunctions.length > 0) {
        mdReport += `#### Unused Functions\n`;
        r.unusedFunctions.forEach(f => mdReport += `- Line ${f.line}: \`${f.name}\`\n`);
      }
      mdReport += `\n`;
    });
  }

  if (!fs.existsSync(CLAUDE_DIR)) {
    fs.mkdirSync(CLAUDE_DIR, { recursive: true });
  }

  fs.writeFileSync(SWEEPER_REPORT_PATH, mdReport, 'utf-8');

  console.log(`${BOLD}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`📄 Saved codebase sweeper report to: ${YELLOW}${SWEEPER_REPORT_PATH}${RESET}\n`);
}

main();
