const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const SKILLS_DIR = path.join(ROOT, 'skills')

function auditSkills() {
  const results = []
  
  function scan(dir) {
    if (!fs.existsSync(dir)) return
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        scan(fullPath)
      } else if (entry.name.endsWith('.md')) {
        results.push(auditFile(fullPath))
      }
    }
  }

  scan(SKILLS_DIR)
  return results
}

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const relativePath = path.relative(ROOT, filePath)
  
  const score = {
    file: relativePath,
    hasFrontmatter: false,
    hasDescription: false,
    hasWhenToActivate: false,
    hasWhenNotToUse: false,
    hasInstructions: false,
    hasExample: false,
    wordCount: 0,
    qualityTier: 'Bronze'
  }

  // Check frontmatter
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (match) {
    score.hasFrontmatter = true
    if (/^description:\s*(.+)$/m.test(match[1])) {
      score.hasDescription = true
    }
  }

  // Check sections
  score.hasWhenToActivate = /## when to activate/i.test(content)
  score.hasWhenNotToUse = /## when not to use/i.test(content)
  score.hasInstructions = /## instructions/i.test(content)
  score.hasExample = /## example/i.test(content)
  
  // Word count
  const textOnly = content.replace(/^---\n[\s\S]*?\n---/, '').replace(/[#*_>]/g, '')
  const words = textOnly.split(/\s+/).filter(w => w.length > 0)
  score.wordCount = words.length

  // Calculate tier
  let checksPassed = 0
  if (score.hasFrontmatter && score.hasDescription) checksPassed++
  if (score.hasWhenToActivate) checksPassed++
  if (score.hasWhenNotToUse) checksPassed++
  if (score.hasInstructions) checksPassed++
  if (score.hasExample) checksPassed++
  
  if (checksPassed === 5 && score.wordCount >= 150) {
    score.qualityTier = 'Gold'
  } else if (checksPassed >= 3 && score.wordCount >= 50) {
    score.qualityTier = 'Silver'
  } else {
    score.qualityTier = 'Bronze'
  }

  return score
}

const stats = auditSkills()

let gold = 0, silver = 0, bronze = 0
for (const s of stats) {
  if (s.qualityTier === 'Gold') gold++
  else if (s.qualityTier === 'Silver') silver++
  else bronze++
}

console.log(`Audited ${stats.length} skills.`)
console.log(`Gold: ${gold}`)
console.log(`Silver: ${silver}`)
console.log(`Bronze: ${bronze}`)

fs.writeFileSync(path.join(ROOT, 'skill-audit-results.json'), JSON.stringify(stats, null, 2))
console.log('Saved detailed results to skill-audit-results.json')
