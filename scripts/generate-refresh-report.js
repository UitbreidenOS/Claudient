#!/usr/bin/env node

/**
 * generate-refresh-report.js
 * Generates a detailed FRESHNESS_REPORT.md with all stale files grouped by category,
 * sorted by age, with estimated refresh time and tier assignment.
 *
 * Usage: node scripts/generate-refresh-report.js [--threshold N] > FRESHNESS_REPORT.md
 * Default threshold: 6 months
 */

const fs = require('fs')
const path = require('path')

const REPO_ROOT = path.resolve(__dirname, '..')
const STALE_MONTHS = parseInt(process.argv.find(a => a.startsWith('--threshold='))?.split('=')[1] || '6')
const TRANSLATION_DIRS = new Set(['fr', 'de', 'es', 'nl'])

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
  if (!match) return null
  const fm = {}
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+):\s*(.+)/)
    if (m) fm[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
  return fm
}

function estimateRefreshTime(content) {
  const wordCount = content.split(/\s+/).length
  if (wordCount < 500) return '15 min'
  if (wordCount < 1500) return '30 min'
  if (wordCount < 3000) return '1 hour'
  return '2+ hours'
}

function categorizeFile(filePath) {
  if (filePath.includes('/skills/')) return 'Skills'
  if (filePath.includes('/agents/')) return 'Agents'
  if (filePath.includes('/guides/')) return 'Guides'
  if (filePath.includes('/workflows/')) return 'Workflows'
  if (filePath.includes('/rules/')) return 'Rules'
  if (filePath.includes('/prompts/')) return 'Prompts'
  return 'Other'
}

function getTierAssignment(ageMonths, category) {
  // Tier 1: Core content or very stale
  if (ageMonths >= 12) return 'Tier 1'
  if (['Skills', 'Agents', 'Workflows'].includes(category) && ageMonths >= 6) return 'Tier 1'

  // Tier 2: Important but less critical
  if (ageMonths >= 6) return 'Tier 2'
  if (ageMonths >= 9 && ['Guides', 'Rules'].includes(category)) return 'Tier 2'

  // Tier 3: Less critical
  return 'Tier 3'
}

// Collect all files
const files = []
const cutoff = new Date()
cutoff.setMonth(cutoff.getMonth() - STALE_MONTHS)

function scan(dir) {
  walkMarkdown(path.join(REPO_ROOT, dir), (file) => {
    const content = fs.readFileSync(file, 'utf8')
    const fm = parseFrontmatter(content)
    const rel = path.relative(REPO_ROOT, file)
    const category = categorizeFile(rel)

    if (!fm || !fm.updated) {
      files.push({
        path: rel,
        category,
        updated: null,
        ageMonths: null,
        status: 'missing-date',
        tier: 'Tier 1',
        refreshTime: estimateRefreshTime(content),
        wordCount: content.split(/\s+/).length
      })
      return
    }

    const updated = new Date(fm.updated)
    if (isNaN(updated.getTime())) {
      files.push({
        path: rel,
        category,
        updated: fm.updated,
        ageMonths: null,
        status: 'invalid-date',
        tier: 'Tier 1',
        refreshTime: estimateRefreshTime(content),
        wordCount: content.split(/\s+/).length
      })
      return
    }

    const ageMs = Date.now() - updated.getTime()
    const ageMonths = Math.round(ageMs / (1000 * 60 * 60 * 24 * 30.44))

    files.push({
      path: rel,
      category,
      updated: fm.updated,
      ageMonths,
      status: updated < cutoff ? 'stale' : 'fresh',
      tier: getTierAssignment(ageMonths, category),
      refreshTime: estimateRefreshTime(content),
      wordCount: content.split(/\s+/).length
    })
  })
}

scan('skills')
scan('agents')
scan('guides')
scan('workflows')
scan('rules')
scan('prompts')

// Generate report
const timestamp = new Date().toISOString().split('T')[0]
const fresh = files.filter(f => f.status === 'fresh').length
const stale = files.filter(f => f.status === 'stale').length
const missing = files.filter(f => f.status === 'missing-date').length
const invalid = files.filter(f => f.status === 'invalid-date').length
const total = files.length

let report = `# Freshness Report — ${timestamp}\n\n`
report += `**Stale threshold:** ${STALE_MONTHS} months\n\n`

report += `## Summary\n\n`
report += `| Status | Count | % |\n`
report += `|---|---|---|\n`
report += `| Fresh | ${fresh} | ${((fresh / total) * 100).toFixed(1)}% |\n`
report += `| Stale | ${stale} | ${((stale / total) * 100).toFixed(1)}% |\n`
report += `| Missing date | ${missing} | ${((missing / total) * 100).toFixed(1)}% |\n`
report += `| Invalid date | ${invalid} | ${((invalid / total) * 100).toFixed(1)}% |\n`
report += `| **Total** | **${total}** | **100%** |\n\n`

// Group by category
const byCategory = {}
for (const file of files) {
  if (!byCategory[file.category]) {
    byCategory[file.category] = { fresh: 0, stale: 0, missing: 0, invalid: 0 }
  }
  byCategory[file.category][file.status]++
}

report += `## By Category\n\n`
report += `| Category | Fresh | Stale | Missing | Invalid |\n`
report += `|---|---|---|---|---|\n`
for (const [cat, counts] of Object.entries(byCategory).sort()) {
  report += `| ${cat} | ${counts.fresh} | ${counts.stale} | ${counts.missing} | ${counts.invalid} |\n`
}
report += `\n`

// Stale files by tier, sorted by age
report += `## Stale Files by Tier\n\n`

const tiers = ['Tier 1', 'Tier 2', 'Tier 3']
for (const tier of tiers) {
  const tierFiles = files
    .filter(f => f.status === 'stale' && f.tier === tier)
    .sort((a, b) => (b.ageMonths || 0) - (a.ageMonths || 0))

  if (tierFiles.length === 0) continue

  report += `### ${tier} (${tierFiles.length} files)\n\n`
  report += `| File | Age | Updated | Refresh Time |\n`
  report += `|---|---|---|---|\n`

  for (const file of tierFiles) {
    const age = file.ageMonths ? `${file.ageMonths}m` : '?'
    const updated = file.updated || 'N/A'
    report += `| ${file.path} | ${age} | ${updated} | ${file.refreshTime} |\n`
  }
  report += `\n`
}

// Missing/invalid dates
const missingDateFiles = files.filter(f => f.status === 'missing-date').sort((a, b) => a.path.localeCompare(b.path))
if (missingDateFiles.length > 0) {
  report += `## Files Missing Dates (${missingDateFiles.length})\n\n`
  report += `Add frontmatter with \`updated: YYYY-MM-DD\` to these files:\n\n`
  for (const file of missingDateFiles.slice(0, 50)) {
    report += `- \`${file.path}\`\n`
  }
  if (missingDateFiles.length > 50) {
    report += `- ... and ${missingDateFiles.length - 50} more\n`
  }
  report += `\n`
}

const invalidDateFiles = files.filter(f => f.status === 'invalid-date')
if (invalidDateFiles.length > 0) {
  report += `## Files with Invalid Dates (${invalidDateFiles.length})\n\n`
  report += `Fix the date format (use YYYY-MM-DD):\n\n`
  for (const file of invalidDateFiles) {
    report += `- \`${file.path}\` — has \`${file.updated}\`\n`
  }
  report += `\n`
}

// Recommendations
report += `## Recommendations\n\n`
report += `1. **Immediately refresh Tier 1 files** (${files.filter(f => f.tier === 'Tier 1').length} files)\n`
report += `   - These are core content, dependencies for other docs, or very old\n`
report += `   - Estimated effort: ${files.filter(f => f.tier === 'Tier 1').slice(0, 5).map(f => f.refreshTime).join(', ')} per file\n\n`

report += `2. **Schedule Tier 2 refresh within 2 weeks** (${files.filter(f => f.tier === 'Tier 2').length} files)\n`
report += `   - Important but less critical; batch these into review sprints\n\n`

report += `3. **Review Tier 3 files** (${files.filter(f => f.tier === 'Tier 3').length} files)\n`
report += `   - These may be deprecated or evergreen; decide if they should be archived\n\n`

report += `4. **Add missing dates** (${missing} files)\n`
report += `   - Use the current date or look at git history to infer last modification\n\n`

report += `5. **Fix invalid dates** (${invalid} files)\n`
report += `   - Update to valid YYYY-MM-DD format\n\n`

report += `## Next Steps\n\n`
report += `1. Run \`/workflows/freshness-refresh\` to spawn review agents for stale files\n`
report += `2. Update frontmatter timestamps as files are refreshed\n`
report += `3. Re-run \`generate-refresh-report.js\` after updates to verify improvement\n`
report += `4. Archive this report: \`mkdir -p ./maintenance/reports && mv FRESHNESS_REPORT.md ./maintenance/reports/freshness-${timestamp}.md\`\n\n`

report += `---\n`
report += `Generated by \`scripts/generate-refresh-report.js\` at ${new Date().toISOString()}\n`

console.log(report)
