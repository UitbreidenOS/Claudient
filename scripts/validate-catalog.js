#!/usr/bin/env node
// validate-catalog.js — validates marketplace catalog.json and entries
// Checks: required fields, schema compliance, path existence, category validity

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const CATALOG_FILE = path.join(ROOT, 'marketplace', 'catalog.json')
const CATEGORIES_FILE = path.join(ROOT, 'marketplace', 'categories.json')

// Required fields for each catalog entry
const REQUIRED_ENTRY_FIELDS = [
  'id',
  'name',
  'description',
  'category',
  'author',
  'version',
  'status',
]

// Valid statuses
const VALID_STATUSES = ['official', 'community', 'beta', 'deprecated']

// Load JSON with error handling
function loadJSON(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(content)
  } catch (error) {
    throw new Error(`Failed to load ${filePath}: ${error.message}`)
  }
}

// Validate a single catalog entry
function validateEntry(entry, categories, index) {
  const errors = []

  // Check required fields
  for (const field of REQUIRED_ENTRY_FIELDS) {
    if (!entry[field]) {
      errors.push(`Entry[${index}].${field}: missing required field`)
    }
  }

  // Check field types
  if (entry.id && typeof entry.id !== 'string') {
    errors.push(`Entry[${index}].id: must be string`)
  }
  if (entry.name && typeof entry.name !== 'string') {
    errors.push(`Entry[${index}].name: must be string`)
  }
  if (entry.description && typeof entry.description !== 'string') {
    errors.push(`Entry[${index}].description: must be string`)
  }

  // Validate category
  if (entry.category) {
    const validCategories = categories.map(c => c.id)
    if (!validCategories.includes(entry.category)) {
      errors.push(`Entry[${index}].category: "${entry.category}" not in categories.json`)
    }
  }

  // Validate author
  if (entry.author) {
    if (typeof entry.author !== 'object') {
      errors.push(`Entry[${index}].author: must be object`)
    } else if (!entry.author.name) {
      errors.push(`Entry[${index}].author.name: missing`)
    }

    // Check official author requirement
    if (entry.status === 'official' && entry.author.type !== 'official') {
      errors.push(`Entry[${index}].author.type: official status requires author.type="official"`)
    }
  }

  // Validate status
  if (entry.status && !VALID_STATUSES.includes(entry.status)) {
    errors.push(`Entry[${index}].status: "${entry.status}" not in valid statuses`)
  }

  // Check path exists for official stacks
  if (entry.path && entry.status === 'official') {
    const fullPath = path.join(ROOT, entry.path)
    if (!fs.existsSync(fullPath)) {
      errors.push(`Entry[${index}].path: "${fullPath}" does not exist`)
    }
  }

  // Check version format (semver)
  if (entry.version && !/^\d+\.\d+\.\d+/.test(entry.version)) {
    errors.push(`Entry[${index}].version: "${entry.version}" invalid semver format`)
  }

  return errors
}

// Validate categories.json structure
function validateCategories(categories) {
  const errors = []

  if (!Array.isArray(categories)) {
    errors.push('categories: must be array')
    return errors
  }

  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i]
    if (!cat.id) {
      errors.push(`categories[${i}].id: missing`)
    }
    if (!cat.name) {
      errors.push(`categories[${i}].name: missing`)
    }
    if (!cat.description) {
      errors.push(`categories[${i}].description: missing`)
    }
  }

  return errors
}

// Main validation
function validate() {
  let allErrors = []

  // Load catalog
  let catalog
  try {
    catalog = loadJSON(CATALOG_FILE)
  } catch (error) {
    console.error(`✗ ${error.message}`)
    process.exit(1)
  }

  // Load categories
  let categories = []
  if (fs.existsSync(CATEGORIES_FILE)) {
    try {
      const categoriesData = loadJSON(CATEGORIES_FILE)
      categories = categoriesData.categories || []
    } catch (error) {
      console.warn(`Warning: ${error.message}`)
    }
  }

  // Validate catalog structure
  if (!catalog.entries || !Array.isArray(catalog.entries)) {
    console.error('✗ catalog.entries: must be array')
    process.exit(1)
  }

  // Validate categories if present
  if (categories.length > 0) {
    const catErrors = validateCategories(categories)
    allErrors = allErrors.concat(catErrors)
  }

  // Validate each entry
  for (let i = 0; i < catalog.entries.length; i++) {
    const entryErrors = validateEntry(catalog.entries[i], categories, i)
    allErrors = allErrors.concat(entryErrors)
  }

  // Report results
  if (allErrors.length === 0) {
    console.log(`✓ ${catalog.entries.length} entries validated`)
    console.log(`  Catalog: ${CATALOG_FILE}`)
    console.log(`  Categories: ${categories.length}`)
    process.exit(0)
  } else {
    console.error(`✗ ${allErrors.length} validation error(s) found:`)
    for (const err of allErrors) {
      console.error(`  • ${err}`)
    }
    process.exit(1)
  }
}

// Run
validate()
