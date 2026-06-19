// sentinel.js — scans project and generates anti-hallucination and execution safeguard rules in CLAUDE.md
const fs = require('fs')
const path = require('path')

function runSentinel(targetDir = '.') {
  const absoluteDir = path.resolve(targetDir)
  console.log(`\n🛡️  Initializing CLAUDE.md Sentinel at: ${absoluteDir}\n`)

  const exists = (p) => fs.existsSync(path.join(absoluteDir, p))

  const diagnostics = {
    languages: [],
    frameworks: [],
    testFrameworks: [],
    buildCmd: '',
    testCmd: ''
  }

  // 1. JS/TS Ecosystem
  if (exists('package.json')) {
    diagnostics.languages.push('JavaScript/TypeScript')
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(absoluteDir, 'package.json'), 'utf-8'))
      const deps = { ...pkg.dependencies, ...pkg.devDependencies }

      if (deps['typescript']) diagnostics.languages.push('TypeScript')
      if (deps['react']) diagnostics.frameworks.push('React')
      if (deps['next']) diagnostics.frameworks.push('Next.js')
      if (deps['express']) diagnostics.frameworks.push('Express')

      if (deps['jest']) {
        diagnostics.testFrameworks.push('Jest')
        diagnostics.testCmd = 'npm test'
      } else if (deps['vitest']) {
        diagnostics.testFrameworks.push('Vitest')
        diagnostics.testCmd = 'npx vitest run'
      } else {
        diagnostics.testCmd = 'npm test'
      }
      diagnostics.buildCmd = pkg.scripts && pkg.scripts.build ? 'npm run build' : ''
    } catch {
      diagnostics.testCmd = 'npm test'
    }
  }

  // 2. Python Ecosystem
  if (exists('requirements.txt') || exists('pyproject.toml') || exists('setup.py')) {
    diagnostics.languages.push('Python')
    const scanFile = exists('pyproject.toml') ? 'pyproject.toml' : (exists('requirements.txt') ? 'requirements.txt' : '')
    if (scanFile) {
      try {
        const content = fs.readFileSync(path.join(absoluteDir, scanFile), 'utf-8')
        if (content.includes('django')) diagnostics.frameworks.push('Django')
        if (content.includes('fastapi')) diagnostics.frameworks.push('FastAPI')
        if (content.includes('pytest')) {
          diagnostics.testFrameworks.push('Pytest')
          diagnostics.testCmd = 'pytest'
        } else {
          diagnostics.testCmd = 'python -m unittest'
        }
      } catch {
        diagnostics.testCmd = 'pytest'
      }
    }
  }

  // 3. Rust Ecosystem
  if (exists('Cargo.toml')) {
    diagnostics.languages.push('Rust')
    diagnostics.testCmd = 'cargo test'
    diagnostics.buildCmd = 'cargo build'
    try {
      const content = fs.readFileSync(path.join(absoluteDir, 'Cargo.toml'), 'utf-8')
      if (content.includes('axum')) diagnostics.frameworks.push('Axum')
      if (content.includes('tokio')) diagnostics.frameworks.push('Tokio')
    } catch {}
  }

  // 4. Go Ecosystem
  if (exists('go.mod')) {
    diagnostics.languages.push('Go')
    diagnostics.testCmd = 'go test ./...'
    diagnostics.buildCmd = 'go build ./...'
  }

  diagnostics.languages = [...new Set(diagnostics.languages)]

  // Formulate the Anti-Hallucination and Safe-Execution Rules block
  const sentinelRules = `## Anti-Hallucination & Safe-Execution Rules

- **Zero Mocking on Failure**: If any compilation, linting, test run, database migration, or build command fails, you MUST fail fast. Do not swallow errors or simulate mock success to bypass the block.
- **Strict Plan-First Workflow**: You must present your changes in a step-by-step implementation plan and receive explicit user approval (or write to \`.claude/plan.md\` with status marked as approved) before modifying files or running commands.
- **Dependency Integrity**: Never assume external packages, APIs, or tools are installed unless they are explicitly declared in the project manifests (${exists('package.json') ? 'package.json' : 'dependency manifests'}). Do not import undeclared or deprecated libraries.
- **No Path Guessing**: Never read, edit, or delete files without verifying their exact path and existence first. Check for typos in file names before running tool calls.
- **Diagnostics First**: Run diagnostics or compile checks immediately after any codebase modifications to catch regressions.
`

  const claudeMdPath = path.join(absoluteDir, 'CLAUDE.md')

  let finalContent = ''

  if (fs.existsSync(claudeMdPath)) {
    console.log(`ℹ️  Existing CLAUDE.md detected. Merging Sentinel safeguards...`)
    let existingContent = fs.readFileSync(claudeMdPath, 'utf-8')
    
    // Check if rules are already injected
    if (existingContent.includes('## Anti-Hallucination & Safe-Execution Rules')) {
      // Overwrite/update the block
      const startIdx = existingContent.indexOf('## Anti-Hallucination & Safe-Execution Rules')
      const nextH2 = existingContent.indexOf('##', startIdx + 40)
      if (nextH2 !== -1) {
        finalContent = existingContent.slice(0, startIdx) + sentinelRules + '\n' + existingContent.slice(nextH2)
      } else {
        finalContent = existingContent.slice(0, startIdx) + sentinelRules
      }
    } else {
      // Append to the end
      finalContent = existingContent.trim() + '\n\n' + sentinelRules
    }
  } else {
    console.log(`📝 Creating new CLAUDE.md file...`)
    finalContent = `# CLAUDE.md — Codebase Instructions & Safeguards

## Build Commands
${diagnostics.buildCmd ? `- Build: \`${diagnostics.buildCmd}\`` : '- No build step required'}
- Dev server: ${exists('package.json') ? '`npm run dev`' : 'N/A'}

## Test Commands
- Run tests: \`${diagnostics.testCmd || 'npm test'}\`

${sentinelRules}
`
  }

  fs.writeFileSync(claudeMdPath, finalContent, 'utf-8')

  console.log(`\n✅ Anti-hallucination safeguards written to: ${claudeMdPath}`)
  console.log(`Ecosystem:   ${diagnostics.languages.join(', ') || 'Generic'}`)
  console.log(`Frameworks:  ${diagnostics.frameworks.join(', ') || 'None'}`)
  console.log(`Test Runner: ${diagnostics.testCmd || 'None'}`)
  console.log(`\n🛡️  Sentinel successfully activated. Your local Claude Code is now secured against hallucinations!`)
}

module.exports = { runSentinel }
