#!/usr/bin/env node

/**
 * certify-stack.js
 *
 * CLI tool to mark a stack as certified in catalog.json and generate certification badge.
 *
 * Usage:
 *   node scripts/certify-stack.js <stackId> <tier> [--date DATE] [--expires DATE]
 *
 * Example:
 *   node scripts/certify-stack.js ai_sdr bronze
 *   node scripts/certify-stack.js data_engineer silver --date 2026-06-15 --expires 2027-06-15
 *   node scripts/certify-stack.js analytics_engineer gold --date 2026-01-01 --expires 2028-01-01
 */

const fs = require('fs');
const path = require('path');

// Parse CLI arguments
const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('Usage: node scripts/certify-stack.js <stackId> <tier> [--date DATE] [--expires DATE]');
  console.error('');
  console.error('Tiers: bronze, silver, gold');
  console.error('');
  console.error('Example:');
  console.error('  node scripts/certify-stack.js ai_sdr bronze');
  console.error('  node scripts/certify-stack.js data_engineer silver --date 2026-06-15 --expires 2027-06-15');
  process.exit(1);
}

const stackId = args[0];
const tier = args[1].toLowerCase();
const validTiers = ['bronze', 'silver', 'gold'];

if (!validTiers.includes(tier)) {
  console.error(`Error: Invalid tier "${tier}". Must be one of: ${validTiers.join(', ')}`);
  process.exit(1);
}

// Parse optional date arguments
let certifiedDate = new Date().toISOString().split('T')[0];
let expiresDate = calculateExpirationDate(tier);

for (let i = 2; i < args.length; i++) {
  if (args[i] === '--date' && args[i + 1]) {
    certifiedDate = args[i + 1];
    i++;
  } else if (args[i] === '--expires' && args[i + 1]) {
    expiresDate = args[i + 1];
    i++;
  }
}

// Validate dates
if (!isValidDate(certifiedDate)) {
  console.error(`Error: Invalid certification date "${certifiedDate}". Use YYYY-MM-DD format.`);
  process.exit(1);
}

if (!isValidDate(expiresDate)) {
  console.error(`Error: Invalid expiration date "${expiresDate}". Use YYYY-MM-DD format.`);
  process.exit(1);
}

// Load catalog.json
const catalogPath = path.join(__dirname, '../marketplace/catalog.json');

if (!fs.existsSync(catalogPath)) {
  console.error(`Error: catalog.json not found at ${catalogPath}`);
  process.exit(1);
}

let catalog;
try {
  catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
} catch (err) {
  console.error(`Error reading catalog.json: ${err.message}`);
  process.exit(1);
}

// Find stack entry
const stackIndex = catalog.entries.findIndex(s => s.id === stackId);

if (stackIndex === -1) {
  console.error(`Error: Stack with id "${stackId}" not found in catalog.json`);
  console.error('');
  console.error('Available stacks:');
  catalog.entries.forEach(s => console.error(`  - ${s.id}`));
  process.exit(1);
}

// Update stack entry
const stack = catalog.entries[stackIndex];
stack.certificationTier = tier;
stack.certifiedDate = certifiedDate;
stack.certificationExpiresDate = expiresDate;
stack.certified = true;

// Update timestamp
catalog.timestamp = new Date().toISOString();

// Write updated catalog.json
try {
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
  console.log(`✓ Updated catalog.json for stack "${stackId}"`);
  console.log(`  Tier: ${tier}`);
  console.log(`  Certified: ${certifiedDate}`);
  console.log(`  Expires: ${expiresDate}`);
} catch (err) {
  console.error(`Error writing catalog.json: ${err.message}`);
  process.exit(1);
}

// Generate badge
generateBadge(stackId, tier);

console.log('');
console.log('Done! Certification applied.');

// ============ Helper Functions ============

function calculateExpirationDate(tier) {
  const now = new Date();
  const months = {
    bronze: 6,
    silver: 12,
    gold: 24
  };
  const monthsToAdd = months[tier] || 6;
  const expiresDate = new Date(now.getFullYear(), now.getMonth() + monthsToAdd, now.getDate());
  return expiresDate.toISOString().split('T')[0];
}

function isValidDate(dateStr) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date);
}

function generateBadge(stackId, tier) {
  const badgesDir = path.join(__dirname, '../marketplace/badges');

  if (!fs.existsSync(badgesDir)) {
    fs.mkdirSync(badgesDir, { recursive: true });
  }

  const tierColors = {
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700'
  };

  const badgeFileName = `${stackId}-${tier}.svg`;
  const badgePath = path.join(badgesDir, badgeFileName);

  // Generate simple SVG badge
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="40" viewBox="0 0 200 40">
  <rect width="200" height="40" fill="${tierColors[tier]}"/>
  <rect x="1" y="1" width="198" height="38" fill="none" stroke="#000" stroke-width="1" opacity="0.3"/>
  <text x="100" y="26" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#000" opacity="0.8">
    Certified ${tier.charAt(0).toUpperCase() + tier.slice(1)}
  </text>
</svg>`;

  try {
    fs.writeFileSync(badgePath, svg);
    console.log(`✓ Generated badge: marketplace/badges/${badgeFileName}`);
  } catch (err) {
    console.error(`Warning: Could not generate badge: ${err.message}`);
  }
}
