/**
 * Test suite for Approval Engine
 */

const ApprovalEngine = require('./approval-engine')
const fs = require('fs')
const path = require('path')
const assert = require('assert')

// Test utilities
function createTestEngine() {
  const testDir = path.join(__dirname, '.test-approvals')
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true })
  }
  return new ApprovalEngine({
    dataDir: testDir,
    verbose: false
  })
}

function cleanup(engine) {
  const testDir = path.join(__dirname, '.test-approvals')
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true })
  }
}

// Test Suite
async function runTests() {
  console.log('Testing Approval Engine...\n')

  // Test 1: Calculate confidence
  test('Calculate confidence for tasks', () => {
    const engine = createTestEngine()

    const highConfTask = {
      id: 'task-1',
      name: 'Update README',
      type: 'docs',
      complexity: 'simple'
    }

    const lowConfTask = {
      id: 'task-2',
      name: 'Deploy to production',
      type: 'deploy',
      complexity: 'critical',
      dependencies: ['task-1', 'task-3']
    }

    const conf1 = engine.calculateConfidence(highConfTask)
    const conf2 = engine.calculateConfidence(lowConfTask)

    assert.strictEqual(typeof conf1, 'number')
    assert.strictEqual(typeof conf2, 'number')
    assert(conf1 > conf2, 'Docs task should have higher confidence than deploy')
    assert(conf1 >= 0 && conf1 <= 1, 'Confidence should be between 0 and 1')

    console.log('✓ Confidence calculation works')
    cleanup(engine)
  })

  // Test 2: Approval type determination
  test('Determine approval type from confidence', () => {
    const engine = createTestEngine()

    const autoType = engine.getApprovalType(0.95)
    const reviewType = engine.getApprovalType(0.75)
    const pairType = engine.getApprovalType(0.3)

    assert.strictEqual(autoType.approvalType, 'auto')
    assert.strictEqual(reviewType.approvalType, 'review')
    assert.strictEqual(pairType.approvalType, 'pair-program')

    console.log('✓ Approval type determination works')
    cleanup(engine)
  })

  // Test 3: Submit for approval
  test('Submit task for approval', async () => {
    const engine = createTestEngine()

    const task = {
      id: 'task-1',
      name: 'Fix bug in auth',
      type: 'code',
      description: 'Fix login redirect issue',
      complexity: 'moderate'
    }

    const approval = await engine.submitForApproval(task)

    assert.strictEqual(approval.taskId, task.id)
    assert.strictEqual(approval.status, 'pending')
    assert(approval.confidence > 0)
    assert(approval.approvalType)
    assert.strictEqual(engine.metrics.totalSubmitted, 1)

    console.log(`✓ Approval submitted (type: ${approval.approvalType})`)
    cleanup(engine)
  })

  // Test 4: Auto-approve high confidence
  test('Auto-approve high confidence tasks', async () => {
    const engine = createTestEngine()

    const task = {
      id: 'task-1',
      name: 'Update README',
      type: 'docs',
      description: 'Update installation guide',
      confidence: 0.95
    }

    const approval = await engine.submitForApproval(task)

    assert.strictEqual(approval.status, 'approved')
    assert.strictEqual(approval.decidedBy, 'auto')
    assert.strictEqual(engine.metrics.totalApproved, 1)

    console.log('✓ High confidence task auto-approved')
    cleanup(engine)
  })

  // Test 5: Manual approval
  test('Manually approve pending task', async () => {
    const engine = createTestEngine()

    const task = {
      id: 'task-1',
      name: 'Refactor database layer',
      type: 'code',
      description: 'Improve query performance',
      complexity: 'complex'
    }

    const submission = await engine.submitForApproval(task)
    assert.strictEqual(submission.status, 'pending')

    const approval = await engine.approve(submission.id, { approvedBy: 'reviewer1' })

    assert.strictEqual(approval.status, 'approved')
    assert.strictEqual(approval.decidedBy, 'reviewer1')
    assert(approval.decidedAt)

    console.log('✓ Manual approval works')
    cleanup(engine)
  })

  // Test 6: Reject approval
  test('Reject a pending approval', async () => {
    const engine = createTestEngine()

    const task = {
      id: 'task-1',
      name: 'Deploy new feature',
      type: 'deploy',
      description: 'Rolling out feature X'
    }

    const submission = await engine.submitForApproval(task)
    const rejection = await engine.reject(submission.id, {
      rejectedBy: 'reviewer1',
      reason: 'Needs more testing'
    })

    assert.strictEqual(rejection.status, 'rejected')
    assert.strictEqual(rejection.reason, 'Needs more testing')
    assert.strictEqual(engine.metrics.totalRejected, 1)

    console.log('✓ Rejection works')
    cleanup(engine)
  })

  // Test 7: Modify approval
  test('Modify an approval request', async () => {
    const engine = createTestEngine()

    const task = {
      id: 'task-1',
      name: 'Add feature',
      type: 'code',
      description: 'Add new payment method'
    }

    const submission = await engine.submitForApproval(task)
    const modification = await engine.modify(submission.id, {
      modifiedBy: 'reviewer1',
      description: 'Add new payment method with stripe integration',
      complexity: 'complex'
    })

    assert.strictEqual(modification.status, 'modified')
    assert.strictEqual(modification.modifications.description, 'Add new payment method with stripe integration')
    assert.strictEqual(engine.metrics.totalModified, 1)

    console.log('✓ Modification works')
    cleanup(engine)
  })

  // Test 8: Get pending approvals
  test('Retrieve pending approvals', async () => {
    const engine = createTestEngine()

    await engine.submitForApproval({
      id: 'task-1',
      name: 'Task A',
      type: 'code',
      complexity: 'moderate'
    })

    await engine.submitForApproval({
      id: 'task-2',
      name: 'Task B',
      type: 'code',
      complexity: 'moderate'
    })

    const highConf = await engine.submitForApproval({
      id: 'task-3',
      name: 'Update docs',
      type: 'docs',
      confidence: 0.95
    })

    const pending = engine.getPendingApprovals()

    assert.strictEqual(pending.length, 2, 'Should have 2 pending (1 was auto-approved)')
    assert.strictEqual(highConf.status, 'approved')

    console.log('✓ Pending approvals retrieval works')
    cleanup(engine)
  })

  // Test 9: Get approvals by type
  test('Retrieve approvals by type', async () => {
    const engine = createTestEngine()

    await engine.submitForApproval({
      id: 'task-1',
      name: 'Fix bug',
      type: 'code',
      complexity: 'moderate'
    })

    await engine.submitForApproval({
      id: 'task-2',
      name: 'Deploy app',
      type: 'deploy',
      complexity: 'critical'
    })

    const reviewApprovals = engine.getApprovalsByType('review')
    const autoApprovals = engine.getApprovalsByType('auto')

    assert(reviewApprovals.length > 0)
    assert.strictEqual(autoApprovals.length, 0)

    console.log('✓ Filter by approval type works')
    cleanup(engine)
  })

  // Test 10: SLA tracking
  test('Track SLA and detect overdue approvals', async () => {
    const engine = createTestEngine()

    const task = {
      id: 'task-1',
      name: 'Review code',
      type: 'code',
      complexity: 'moderate'
    }

    const approval = await engine.submitForApproval(task)

    // Manually set submitted time to past (simulate old approval)
    approval.submittedAt = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    engine.approvals.set(approval.id, approval)

    const overdue = engine.getOverdueApprovals()

    assert(overdue.length > 0, 'Should detect overdue approval')
    assert.strictEqual(overdue[0].id, approval.id)

    console.log('✓ SLA tracking and overdue detection works')
    cleanup(engine)
  })

  // Test 11: Metrics calculation
  test('Calculate metrics and statistics', async () => {
    const engine = createTestEngine()

    await engine.submitForApproval({
      id: 'task-1',
      name: 'Task 1',
      type: 'code',
      complexity: 'moderate'
    })

    await engine.submitForApproval({
      id: 'task-2',
      name: 'Task 2',
      type: 'code',
      complexity: 'moderate'
    })

    const metrics = engine.getMetrics()

    assert.strictEqual(metrics.totalSubmitted, 2)
    assert.strictEqual(metrics.pendingCount, 2)
    assert(Array.isArray(metrics.bottlenecks))

    console.log('✓ Metrics calculation works')
    cleanup(engine)
  })

  // Test 12: Batch processing
  test('Batch approve/reject approvals', async () => {
    const engine = createTestEngine()

    await engine.submitForApproval({
      id: 'task-1',
      name: 'Task 1',
      type: 'code',
      complexity: 'moderate'
    })

    await engine.submitForApproval({
      id: 'task-2',
      name: 'Task 2',
      type: 'code',
      complexity: 'moderate'
    })

    const results = await engine.batchApprove('review', { auto: true })

    assert.strictEqual(results.approved, 2)
    assert.strictEqual(results.rejected, 0)
    assert.strictEqual(engine.metrics.totalApproved, 2)

    console.log('✓ Batch processing works')
    cleanup(engine)
  })

  // Test 13: Persistence
  test('Persist and load approvals', async () => {
    let engine = createTestEngine()

    await engine.submitForApproval({
      id: 'task-1',
      name: 'Task 1',
      type: 'code',
      complexity: 'moderate'
    })

    const initialCount = engine.approvals.size

    // Create new engine with same dataDir
    const dataDir = engine.options.dataDir
    engine = new ApprovalEngine({ dataDir })

    assert.strictEqual(engine.approvals.size, initialCount)

    console.log('✓ Persistence works')
    cleanup(engine)
  })

  // Test 14: Dashboard HTML generation
  test('Generate dashboard HTML', () => {
    const engine = createTestEngine()

    const html = engine.generateDashboardHTML()

    assert(html.includes('Approval Engine Dashboard'))
    assert(html.includes('Pending Approvals'))
    assert(html.includes('Bottleneck Analysis'))
    assert(html.includes('<button'))

    console.log('✓ Dashboard HTML generation works')
    cleanup(engine)
  })

  // Test 15: Audit trail export
  test('Export audit trail as CSV', async () => {
    const engine = createTestEngine()

    const task = {
      id: 'task-1',
      name: 'Test task',
      type: 'code'
    }

    const approval = await engine.submitForApproval(task)
    await engine.approve(approval.id, { approvedBy: 'user1' })

    const csv = engine.exportAuditTrailCSV()

    assert(csv.includes('Timestamp'))
    assert(csv.includes('Action'))
    assert(csv.includes('submitted'))
    assert(csv.includes('approved'))

    console.log('✓ Audit trail CSV export works')
    cleanup(engine)
  })

  console.log('\n✅ All tests passed!')
}

// Helper for test organization
function test(name, fn) {
  try {
    fn()
  } catch (error) {
    console.error(`✗ ${name}`)
    console.error(error)
    process.exit(1)
  }
}

// Run tests
runTests().catch((error) => {
  console.error('Test suite failed:', error)
  process.exit(1)
})
