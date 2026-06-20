const fs = require('fs')
const path = require('path')

const REPO_ROOT = path.resolve(__dirname, '..')

const DIRS_TO_CLEAN = [
  'skills', 'agents', 'rules', 'hooks', 'commands', 
  'personas', 'structures', 'plugins', 'guides', 'claude-md-examples',
  'compatibility', 'examples'
]

function cleanDir(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      cleanDir(fullPath)
    } else if (entry.name.endsWith('.md')) {
      cleanFile(fullPath)
    }
  }
}

function cleanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  
  // The footer pattern:
  // ---
  //
  // 🔗 **[Uitbreiden ...
  // 📺 **[Subscribe ...
  
  const footerPattern1 = /\n---\s*\n+🔗 \*\*\[Uitbreiden[\s\S]*?$/i
  const footerPattern2 = /\n+🔗 \*\*\[Uitbreiden[\s\S]*?$/i

  let cleaned = content
  
  if (footerPattern1.test(cleaned)) {
    cleaned = cleaned.replace(footerPattern1, '\n')
  } else if (footerPattern2.test(cleaned)) {
    cleaned = cleaned.replace(footerPattern2, '\n')
  }

  if (cleaned !== content) {
    fs.writeFileSync(filePath, cleaned.trim() + '\n')
    console.log(`Cleaned: ${path.relative(REPO_ROOT, filePath)}`)
  }
}

console.log('Cleaning footers...')
for (const dir of DIRS_TO_CLEAN) {
  cleanDir(path.join(REPO_ROOT, dir))
}
console.log('Done.')
