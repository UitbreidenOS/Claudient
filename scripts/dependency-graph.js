#!/usr/bin/env node

/**
 * dependency-graph.js
 * Analyzes skill and agent files for cross-references and generates:
 * 1. A Mermaid dependency diagram (stdout or --mermaid flag)
 * 2. A JSON adjacency list (--json flag)
 *
 * Usage:
 *   node scripts/dependency-graph.js              # Mermaid diagram
 *   node scripts/dependency-graph.js --json       # JSON adjacency list
 *   node scripts/dependency-graph.js --stats      # Summary stats only
 */

const fs = require('fs')
const path = require('path')

const REPO_ROOT = path.resolve(__dirname, '..')
const TRANSLATION_DIRS = new Set(['fr', 'de', 'es', 'nl'])

const MODE_JSON = process.argv.includes('--json')
const MODE_STATS = process.argv.includes('--stats')

// --- Helpers ---

function walkMarkdown(dir, callback) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory() && !TRANSLATION_DIRS.has(entry.name)) {
      walkMarkdown(full, callback)
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      callback(full)
    }
  }
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const fm = {}
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+):\s*(.+)/)
    if (m) fm[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
  return fm
}

// --- Collect all skill/agent names ---

const allNames = new Map() // name → { file, type }

function collectNames(dir, type) {
  walkMarkdown(path.join(REPO_ROOT, dir), (file) => {
    const name = path.basename(file, '.md')
    const rel = path.relative(REPO_ROOT, file)
    allNames.set(name.toLowerCase(), { file: rel, name, type })
  })
}

collectNames('skills', 'skill')
collectNames('agents', 'agent')

// --- Build dependency graph ---

const graph = new Map() // source → Set<target>

function findReferences(file) {
  const content = fs.readFileSync(file, 'utf8').toLowerCase()
  const sourceName = path.basename(file, '.md').toLowerCase()
  const refs = new Set()

  for (const [targetName, info] of allNames) {
    if (targetName === sourceName) continue
    // Look for references: the target name appearing in the content
    // Use word boundary matching to avoid false positives
    const pattern = new RegExp(`\\b${targetName.replace(/[-/]/g, '[-/]')}\\b`, 'i')
    if (pattern.test(content)) {
      refs.add(targetName)
    }
  }

  return refs
}

walkMarkdown(path.join(REPO_ROOT, 'skills'), (file) => {
  const name = path.basename(file, '.md').toLowerCase()
  const refs = findReferences(file)
  if (refs.size > 0) graph.set(name, refs)
})

walkMarkdown(path.join(REPO_ROOT, 'agents'), (file) => {
  const name = path.basename(file, '.md').toLowerCase()
  const refs = findReferences(file)
  if (refs.size > 0) graph.set(name, refs)
})

// --- Output ---

if (MODE_STATS) {
  const totalNodes = allNames.size
  const nodesWithDeps = graph.size
  const totalEdges = [...graph.values()].reduce((sum, refs) => sum + refs.size, 0)

  console.log(`Dependency Graph Stats:\n`)
  console.log(`  Total skills/agents: ${totalNodes}`)
  console.log(`  Nodes with references: ${nodesWithDeps}`)
  console.log(`  Total edges: ${totalEdges}`)
  console.log(`  Orphan nodes (no refs): ${totalNodes - nodesWithDeps}`)

  // Top connected nodes
  const byRefs = [...graph.entries()]
    .map(([name, refs]) => ({ name, count: refs.size }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  console.log(`\n  Top 10 most connected:`)
  for (const { name, count } of byRefs) {
    console.log(`    ${name}: ${count} references`)
  }
} else if (MODE_JSON) {
  const result = {}
  for (const [source, targets] of graph) {
    result[source] = [...targets].sort()
  }
  console.log(JSON.stringify(result, null, 2))
} else {
  // Mermaid diagram — only include nodes with edges (otherwise too large)
  console.log('graph LR')

  const edgeCount = [...graph.values()].reduce((sum, refs) => sum + refs.size, 0)
  const maxEdges = 50 // Cap output to avoid overwhelming diagrams

  let edges = 0
  const includedNodes = new Set()

  // Sort by most connected first
  const sorted = [...graph.entries()]
    .sort((a, b) => b[1].size - a[1].size)

  for (const [source, targets] of sorted) {
    if (edges >= maxEdges) break
    for (const target of targets) {
      if (edges >= maxEdges) break
      // Sanitize names for Mermaid (replace hyphens with underscores in IDs)
      const srcId = source.replace(/-/g, '_')
      const tgtId = target.replace(/-/g, '_')
      includedNodes.add(source)
      includedNodes.add(target)
      console.log(`    ${srcId}["${source}"] --> ${tgtId}["${target}"]`)
      edges++
    }
  }

  if (edges >= maxEdges) {
    console.log(`    %% ... showing top ${maxEdges} of ${edgeCount} edges`)
  }
}
