#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const os = require('os')
const { execSync } = require('child_process')

const REPO_ROOT = path.resolve(__dirname, '..')
const CLAUDE_DIR = path.join(os.homedir(), '.claude')
const SKILLS_DEST = path.join(CLAUDE_DIR, 'skills')
const AGENTS_DEST = path.join(CLAUDE_DIR, 'agents')
const HOOKS_DEST = path.join(CLAUDE_DIR, 'hooks')
const RULES_DEST = path.join(CLAUDE_DIR, 'rules')

const SKILL_CATEGORIES = [
  'backend',
  'devops-infra',
  'data-ml',
  'database',
  'finance-payments',
  'ai-engineering',
]

const SUPPORTED_LANGS = ['en', 'fr', 'de', 'nl', 'es']

function usage() {
  console.log(`
claudient — Claude Code knowledge system

Usage:
  npx claudient add skills [category] [--lang <lang>]
  npx claudient add agents
  npx claudient add rules
  npx claudient add hooks
  npx claudient add all [--lang <lang>]
  npx claudient remove skills [category]
  npx claudient remove agents
  npx claudient remove rules
  npx claudient update
  npx claudient list [skills|agents|rules|hooks]
  npx claudient help

Skill categories:
  ${SKILL_CATEGORIES.join('\n  ')}

Languages (--lang):
  en (default), fr, de, nl, es

Examples:
  npx claudient add skills
  npx claudient add skills backend
  npx claudient add skills backend --lang fr
  npx claudient add agents
  npx claudient add rules
  npx claudient add hooks
  npx claudient add all --lang de
  npx claudient remove skills backend
  npx claudient update
  npx claudient list agents
`)
}

function checkClaudeInstalled() {
  if (!fs.existsSync(CLAUDE_DIR)) {
    console.error(`
Error: ~/.claude directory not found.

Claude Code must be installed first:
  https://claude.ai/code
`)
    process.exit(1)
  }
}

function parseArgs(args) {
  const flags = {}
  const positional = []
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--lang' && args[i + 1]) {
      flags.lang = args[++i]
    } else if (!args[i].startsWith('--')) {
      positional.push(args[i])
    }
  }
  return { flags, positional }
}

function copyDir(src, dest, label = '') {
  if (!fs.existsSync(src)) return 0
  fs.mkdirSync(dest, { recursive: true })
  let count = 0
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      count += copyDir(srcPath, destPath, label + entry.name + '/')
    } else if (entry.name.endsWith('.md')) {
      fs.copyFileSync(srcPath, destPath)
      console.log(`  + ${label}${entry.name}`)
      count++
    }
  }
  return count
}

function removeDir(dir, label) {
  if (!fs.existsSync(dir)) {
    console.log(`  ~ ${label} (not installed)`)
    return 0
  }
  fs.rmSync(dir, { recursive: true, force: true })
  console.log(`  - ${label} (removed)`)
  return 1
}

function addSkills(category, lang) {
  checkClaudeInstalled()
  fs.mkdirSync(SKILLS_DEST, { recursive: true })

  const installCategory = (cat) => {
    const src = path.join(REPO_ROOT, 'skills', cat)
    if (!fs.existsSync(src)) return 0

    if (!lang || lang === 'en') {
      const dest = path.join(SKILLS_DEST, cat)
      const count = copyDir(src, dest, cat + '/')
      if (count > 0) console.log(`  ✓ ${cat} (${count} files)`)
      return count
    }

    // Language-aware: copy only matching lang files, renaming to drop the lang subdir
    let count = 0
    count += copyLangFiles(src, path.join(SKILLS_DEST, cat), lang, cat + '/')
    if (count > 0) console.log(`  ✓ ${cat} [${lang}] (${count} files)`)
    return count
  }

  if (!category || category === 'all') {
    console.log(`Installing all skills${lang && lang !== 'en' ? ` [${lang}]` : ''}...\n`)
    for (const cat of SKILL_CATEGORIES) installCategory(cat)
  } else {
    if (!SKILL_CATEGORIES.includes(category)) {
      console.error(`Unknown category: "${category}". Valid: ${SKILL_CATEGORIES.join(', ')}`)
      process.exit(1)
    }
    console.log(`Installing ${category} skills${lang && lang !== 'en' ? ` [${lang}]` : ''}...\n`)
    installCategory(category)
  }

  console.log(`\nDone. Skills installed to: ${SKILLS_DEST}`)
  console.log('Restart Claude Code to activate.')
}

// Copies lang-specific files: for each file.md, checks if lang/file.md exists
// and copies it (as file.md) alongside the English version.
function copyLangFiles(src, dest, lang, prefix) {
  if (!fs.existsSync(src)) return 0
  fs.mkdirSync(dest, { recursive: true })
  let count = 0

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === lang) continue // skip the lang subdir itself
      if (SUPPORTED_LANGS.includes(entry.name)) continue // skip other lang subdirs
      count += copyLangFiles(srcPath, path.join(dest, entry.name), lang, prefix + entry.name + '/')
    } else if (entry.name.endsWith('.md')) {
      // Check for translated version
      const translated = path.join(src, lang, entry.name)
      const fileSrc = fs.existsSync(translated) ? translated : srcPath
      fs.copyFileSync(fileSrc, path.join(dest, entry.name))
      const tag = fs.existsSync(translated) ? `[${lang}]` : '[en]'
      console.log(`  + ${prefix}${entry.name} ${tag}`)
      count++
    }
  }
  return count
}

function addAgents() {
  checkClaudeInstalled()
  fs.mkdirSync(AGENTS_DEST, { recursive: true })
  console.log(`Installing agents to ${AGENTS_DEST}...\n`)
  const src = path.join(REPO_ROOT, 'agents')
  let total = 0
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    if (SUPPORTED_LANGS.includes(entry.name)) continue
    const count = copyDir(path.join(src, entry.name), path.join(AGENTS_DEST, entry.name), entry.name + '/')
    if (count > 0) console.log(`  ✓ ${entry.name} (${count} agents)`)
    total += count
  }
  console.log(`\nInstalled ${total} agent file(s) to: ${AGENTS_DEST}`)
  console.log('Restart Claude Code to activate.')
}

function addRules() {
  checkClaudeInstalled()
  const rulesDir = path.join(REPO_ROOT, 'rules')
  console.log('\nAvailable rules:\n')

  // Print all rules with their content paths
  let i = 1
  const rulePaths = []
  for (const cat of fs.readdirSync(rulesDir, { withFileTypes: true })) {
    if (!cat.isDirectory() || SUPPORTED_LANGS.includes(cat.name)) continue
    const catDir = path.join(rulesDir, cat.name)
    for (const f of fs.readdirSync(catDir, { withFileTypes: true })) {
      if (!f.isFile() || !f.name.endsWith('.md')) continue
      if (SUPPORTED_LANGS.some(l => f.name.startsWith(l + '/'))) continue
      const filepath = path.join(catDir, f.name)
      const relPath = `rules/${cat.name}/${f.name}`
      rulePaths.push({ label: relPath, filepath })
      console.log(`  ${i++}. ${relPath}`)
    }
  }

  console.log(`
Rules are added to your project's CLAUDE.md file.
Copy the rule content you need into your project's CLAUDE.md.

Rule files are located in:
  ${rulesDir}

Quick copy all rules into a new CLAUDE.md:`)
  console.log(`  npx claudient add rules --write`)
}

function addRulesWrite() {
  checkClaudeInstalled()
  const rulesDir = path.join(REPO_ROOT, 'rules')
  const claudeMd = path.join(process.cwd(), 'CLAUDE.md')
  const exists = fs.existsSync(claudeMd)

  let content = exists ? fs.readFileSync(claudeMd, 'utf-8') : '# Project Rules\n\n'
  content += '\n\n---\n<!-- Claudient Rules -->\n\n'

  for (const cat of fs.readdirSync(rulesDir, { withFileTypes: true })) {
    if (!cat.isDirectory() || SUPPORTED_LANGS.includes(cat.name)) continue
    const catDir = path.join(rulesDir, cat.name)
    for (const f of fs.readdirSync(catDir).filter(n => n.endsWith('.md'))) {
      const ruleContent = fs.readFileSync(path.join(catDir, f), 'utf-8')
      content += ruleContent + '\n\n'
      console.log(`  + rules/${cat.name}/${f}`)
    }
  }

  fs.writeFileSync(claudeMd, content)
  console.log(`\n${exists ? 'Updated' : 'Created'} CLAUDE.md with all rules.`)
}

function addHooks() {
  checkClaudeInstalled()
  fs.mkdirSync(HOOKS_DEST, { recursive: true })
  const hooksDir = path.join(REPO_ROOT, 'hooks')
  console.log(`Installing hooks to ${HOOKS_DEST}...\n`)
  let total = 0

  for (const cat of fs.readdirSync(hooksDir, { withFileTypes: true })) {
    if (!cat.isDirectory()) continue
    const catDir = path.join(hooksDir, cat.name)
    const destCatDir = path.join(HOOKS_DEST, cat.name)
    fs.mkdirSync(destCatDir, { recursive: true })

    for (const f of fs.readdirSync(catDir, { withFileTypes: true })) {
      if (!f.isFile() || !f.name.endsWith('.sh')) continue
      fs.copyFileSync(path.join(catDir, f.name), path.join(destCatDir, f.name))
      fs.chmodSync(path.join(destCatDir, f.name), '755')
      console.log(`  + ${cat.name}/${f.name}`)
      total++
    }
  }

  console.log(`
Installed ${total} hook script(s) to: ${HOOKS_DEST}

Next step — add hooks to your settings.json:
  ~/.claude/settings.json  (global)
  .claude/settings.json    (project)

See hook documentation at:
  ${path.join(REPO_ROOT, 'hooks')}

Or browse online: https://github.com/Claudient/Claudient/tree/main/hooks
`)
}

function removeCommand(type, category) {
  checkClaudeInstalled()
  switch (type) {
    case 'skills':
      if (category) {
        console.log(`Removing ${category} skills...\n`)
        removeDir(path.join(SKILLS_DEST, category), category)
      } else {
        console.log('Removing all skills...\n')
        for (const cat of SKILL_CATEGORIES) {
          removeDir(path.join(SKILLS_DEST, cat), cat)
        }
      }
      break
    case 'agents':
      console.log('Removing agents...\n')
      removeDir(AGENTS_DEST, 'agents')
      break
    case 'rules':
      console.log('Removing rules...\n')
      removeDir(RULES_DEST, 'rules')
      break
    case 'hooks':
      console.log('Removing hooks...\n')
      removeDir(HOOKS_DEST, 'hooks')
      break
    default:
      console.error(`Unknown type: "${type}". Use: skills, agents, rules, hooks`)
      process.exit(1)
  }
  console.log('\nDone. Restart Claude Code to apply.')
}

function updateCommand() {
  console.log('Checking for updates...\n')
  try {
    const current = require(path.join(REPO_ROOT, 'package.json')).version
    const latest = execSync('npm view claudient version', { encoding: 'utf-8' }).trim()
    if (current === latest) {
      console.log(`Already up to date (v${current}).`)
      return
    }
    console.log(`Update available: v${current} → v${latest}`)
    console.log('Run: npm install -g claudient  or  npx claudient@latest add all')
  } catch {
    console.log('Could not check for updates. Visit: https://www.npmjs.com/package/claudient')
  }
}

function listCommand(type) {
  const listSkills = () => {
    console.log('Skills:\n')
    for (const cat of SKILL_CATEGORIES) {
      const catDir = path.join(REPO_ROOT, 'skills', cat)
      if (!fs.existsSync(catDir)) continue
      const files = getFiles(catDir).filter(f => !SUPPORTED_LANGS.some(l => f.includes(`/${l}/`)))
      console.log(`  ${cat}/ (${files.length})`)
      for (const f of files) console.log(`    ${f}`)
    }
  }

  const listAgents = () => {
    console.log('Agents:\n')
    const agentsDir = path.join(REPO_ROOT, 'agents')
    for (const cat of fs.readdirSync(agentsDir, { withFileTypes: true })) {
      if (!cat.isDirectory() || SUPPORTED_LANGS.includes(cat.name)) continue
      const files = getFiles(path.join(agentsDir, cat.name)).filter(f => !SUPPORTED_LANGS.some(l => f.includes(`/${l}/`)))
      console.log(`  ${cat.name}/ (${files.length})`)
      for (const f of files) console.log(`    ${f}`)
    }
  }

  const listHooks = () => {
    console.log('Hooks:\n')
    const hooksDir = path.join(REPO_ROOT, 'hooks')
    for (const cat of fs.readdirSync(hooksDir, { withFileTypes: true })) {
      if (!cat.isDirectory()) continue
      const files = fs.readdirSync(path.join(hooksDir, cat.name)).filter(f => f.endsWith('.sh'))
      console.log(`  ${cat.name}/ (${files.length})`)
      for (const f of files) console.log(`    ${f}`)
    }
  }

  const listRules = () => {
    console.log('Rules:\n')
    const rulesDir = path.join(REPO_ROOT, 'rules')
    for (const cat of fs.readdirSync(rulesDir, { withFileTypes: true })) {
      if (!cat.isDirectory() || SUPPORTED_LANGS.includes(cat.name)) continue
      const files = fs.readdirSync(path.join(rulesDir, cat.name)).filter(f => f.endsWith('.md'))
      console.log(`  ${cat.name}/ (${files.length})`)
      for (const f of files) console.log(`    ${f}`)
    }
  }

  switch (type) {
    case 'agents': listAgents(); break
    case 'hooks': listHooks(); break
    case 'rules': listRules(); break
    case 'skills':
    default:
      if (!type) {
        listSkills(); console.log(); listAgents(); console.log(); listRules(); console.log(); listHooks()
      } else {
        listSkills()
      }
  }
}

function getFiles(dir, prefix = '') {
  const results = []
  if (!fs.existsSync(dir)) return results
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) results.push(...getFiles(p, prefix + entry.name + '/'))
    else if (entry.name.endsWith('.md')) results.push(prefix + entry.name)
  }
  return results
}

// ── Main ──────────────────────────────────────────────────────────────────────

const [, , command, ...rawArgs] = process.argv
const { flags, positional } = parseArgs(rawArgs)
const lang = flags.lang && SUPPORTED_LANGS.includes(flags.lang) ? flags.lang : null

if (lang && !SUPPORTED_LANGS.includes(lang)) {
  console.error(`Unknown language: "${flags.lang}". Supported: ${SUPPORTED_LANGS.join(', ')}`)
  process.exit(1)
}

switch (command) {
  case 'add': {
    const type = positional[0]
    const arg2 = positional[1]
    switch (type) {
      case 'skills': addSkills(arg2 || null, lang); break
      case 'agents': addAgents(); break
      case 'rules':
        if (flags.write) addRulesWrite()
        else addRules()
        break
      case 'hooks': addHooks(); break
      case 'all':
        addSkills(null, lang)
        addAgents()
        addHooks()
        break
      case undefined:
        console.error('Usage: claudient add <skills|agents|rules|hooks|all>')
        process.exit(1)
        break
      default:
        // Backward compat: claudient add backend (old syntax)
        if (SKILL_CATEGORIES.includes(type)) {
          addSkills(type, lang)
        } else {
          console.error(`Unknown type: "${type}". Use: skills, agents, rules, hooks, all`)
          process.exit(1)
        }
    }
    break
  }
  case 'remove': {
    const type = positional[0]
    const arg2 = positional[1]
    if (!type) { console.error('Usage: claudient remove <skills|agents|rules|hooks>'); process.exit(1) }
    removeCommand(type, arg2)
    break
  }
  case 'update':
    updateCommand()
    break
  case 'list':
    listCommand(positional[0])
    break
  case 'help':
  case '--help':
  case '-h':
  case undefined:
    usage()
    break
  default:
    console.error(`Unknown command: "${command}"`)
    usage()
    process.exit(1)
}
