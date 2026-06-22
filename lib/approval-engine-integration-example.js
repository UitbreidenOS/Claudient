/**
 * Approval Engine Integration Example
 *
 * Demonstrates how to integrate the Approval Engine with TaskExecutor
 * for a complete task workflow with human oversight.
 */

const ApprovalEngine = require('./approval-engine')
const TaskExecutor = require('./task-executor')

/**
 * Task Orchestrator with Approval Workflow
 *
 * Workflow:
 * 1. Submit task for approval
 * 2. Route to appropriate approval type (auto/review/pair-program)
 * 3. Execute once approved
 * 4. Collect metrics on approval SLA and execution time
 */
class ApprovedTaskOrchestrator {
  constructor(options = {}) {
    this.approvalEngine = new ApprovalEngine(options.approvalEngine || {})
    this.taskExecutor = new TaskExecutor(options.taskExecutor || {})
    this.options = options
  }

  /**
   * Main workflow: Submit → Approve → Execute
   */
  async processTask(task) {
    console.log(`\n${'='.repeat(60)}`)
    console.log(`Processing Task: ${task.name}`)
    console.log('='.repeat(60))

    // Step 1: Calculate confidence and submit for approval
    const confidence = this.approvalEngine.calculateConfidence(task)
    console.log(`Confidence: ${(confidence * 100).toFixed(1)}%`)

    const approval = await this.approvalEngine.submitForApproval(task)
    console.log(`Approval Type: ${approval.approvalType}`)
    console.log(`SLA: ${approval.slaMinutes} minutes`)

    // Step 2: If not auto-approved, prompt for approval
    let decision
    if (approval.approvalType === 'auto') {
      console.log('✓ Auto-approved (high confidence)')
      decision = approval
    } else if (this.options.interactive) {
      // Interactive mode - prompt user
      decision = await this.approvalEngine.promptForApproval(approval)
    } else if (this.options.defaultApprove) {
      // Batch mode - auto approve
      decision = await this.approvalEngine.approve(approval.id, {
        approvedBy: 'batch-system'
      })
    } else {
      console.log('⏸  Awaiting approval...')
      return { approval, status: 'pending' }
    }

    // Step 3: Check decision
    if (decision.status === 'rejected') {
      console.log(`✗ Task rejected: ${decision.reason || 'No reason provided'}`)
      return { approval: decision, status: 'rejected' }
    }

    if (decision.status === 'modified') {
      console.log('⚙️  Task modifications applied:')
      console.log(JSON.stringify(decision.modifications, null, 2))
      // Apply modifications to task
      Object.assign(task, decision.modifications)
    }

    // Step 4: Execute approved task
    console.log('→ Executing approved task...')
    try {
      const executionResult = await this.taskExecutor.route(task)

      // Step 5: Collect metrics
      const metrics = {
        approval: {
          confidence: approval.confidence,
          type: approval.approvalType,
          slaMinutes: approval.slaMinutes,
          approvalTime: this._calculateDuration(
            approval.submittedAt,
            decision.decidedAt
          )
        },
        execution: executionResult.metrics
      }

      console.log(`✓ Task completed`)
      console.log(`  Approval time: ${(metrics.approval.approvalTime / 60).toFixed(1)}m`)
      console.log(`  Execution time: ${(metrics.execution.duration / 1000).toFixed(1)}s`)

      return { approval: decision, execution: executionResult, metrics, status: 'completed' }
    } catch (error) {
      console.error(`✗ Execution failed: ${error.message}`)
      return { approval: decision, error, status: 'failed' }
    }
  }

  /**
   * Process multiple tasks with approval workflow
   */
  async processBatch(tasks, options = {}) {
    console.log(`\nProcessing batch of ${tasks.length} tasks`)
    console.log('-'.repeat(60))

    const results = {
      completed: [],
      pending: [],
      rejected: [],
      failed: []
    }

    for (const task of tasks) {
      const result = await this.processTask(task)

      switch (result.status) {
        case 'completed':
          results.completed.push(result)
          break
        case 'pending':
          results.pending.push(result)
          break
        case 'rejected':
          results.rejected.push(result)
          break
        case 'failed':
          results.failed.push(result)
          break
      }

      // Small delay between tasks
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    this._printBatchSummary(results)
    return results
  }

  /**
   * Get pending approvals that need attention
   */
  getPendingApprovals() {
    const pending = this.approvalEngine.getPendingApprovals()
    const overdue = this.approvalEngine.getOverdueApprovals()
    const nearingSLA = this.approvalEngine.getApprovalNearingSLA()

    return {
      total: pending.length,
      overdue: overdue.map((a) => ({
        id: a.id,
        name: a.taskName,
        type: a.approvalType,
        dueMinutesAgo: this._getOverdueMinutes(a)
      })),
      nearingSLA: nearingSLA.map((a) => ({
        id: a.id,
        name: a.taskName,
        type: a.approvalType,
        minutesRemaining: this._getMinutesRemaining(a)
      }))
    }
  }

  /**
   * Get comprehensive dashboard metrics
   */
  getMetricsReport() {
    const approvalMetrics = this.approvalEngine.getMetrics()

    return {
      timestamp: new Date().toISOString(),
      approvals: {
        submitted: approvalMetrics.totalSubmitted,
        approved: approvalMetrics.totalApproved,
        rejected: approvalMetrics.totalRejected,
        modified: approvalMetrics.totalModified,
        pending: approvalMetrics.pendingCount,
        overdue: approvalMetrics.overdueCount,
        nearingSLA: approvalMetrics.nearingSLACount,
        avgApprovalTime: `${Math.round(approvalMetrics.avgApprovalTime / 60)}m`
      },
      bottlenecks: approvalMetrics.bottlenecks,
      execution: this.taskExecutor.getMetrics()
    }
  }

  /**
   * Detect and report approval bottlenecks
   */
  detectBottlenecks(threshold = 5) {
    const metrics = this.approvalEngine.getMetrics()
    const bottlenecks = metrics.bottlenecks.filter((b) => b.count >= threshold)

    return {
      detected: bottlenecks.length > 0,
      bottlenecks: bottlenecks.map((b) => ({
        type: b.type,
        pending: b.count,
        recommendation:
          b.type === 'auto'
            ? 'Lower confidence threshold'
            : b.type === 'review'
              ? 'Assign more reviewers'
              : 'Schedule pair-programming sessions'
      }))
    }
}

  /**
   * Health check for approval workflow
   */
  getHealthStatus() {
    const metrics = this.approvalEngine.getMetrics()
    const overdue = metrics.overdueCount
    const totalPending = metrics.pendingCount

    let status = 'healthy'
    let severity = 'info'

    if (overdue > 0) {
      status = 'degraded'
      severity = 'warning'
    }

    if (overdue > totalPending * 0.5) {
      status = 'critical'
      severity = 'error'
    }

    return {
      status,
      severity,
      checks: {
        pendingApprovals: {
          value: totalPending,
          status: totalPending <= 10 ? 'ok' : 'warning'
        },
        overdueApprovals: {
          value: overdue,
          status: overdue === 0 ? 'ok' : 'warning'
        },
        avgApprovalTime: {
          value: `${Math.round(metrics.avgApprovalTime / 60)}m`,
          status: metrics.avgApprovalTime < 30 * 60 ? 'ok' : 'warning'
        },
        bottleneckCount: {
          value: metrics.bottlenecks.length,
          status: metrics.bottlenecks.length <= 2 ? 'ok' : 'warning'
        }
      }
    }
  }

  // Utilities
  _calculateDuration(startIso, endIso) {
    const start = new Date(startIso)
    const end = new Date(endIso)
    return Math.round((end - start) / 1000) // seconds
  }

  _getOverdueMinutes(approval) {
    const submitted = new Date(approval.submittedAt)
    const slaEnd = new Date(submitted.getTime() + approval.slaMinutes * 60000)
    const now = new Date()
    return Math.round((now - slaEnd) / 60000)
  }

  _getMinutesRemaining(approval) {
    const submitted = new Date(approval.submittedAt)
    const slaEnd = new Date(submitted.getTime() + approval.slaMinutes * 60000)
    const now = new Date()
    return Math.round((slaEnd - now) / 60000)
  }

  _printBatchSummary(results) {
    console.log('\n' + '='.repeat(60))
    console.log('Batch Summary')
    console.log('='.repeat(60))
    console.log(`Completed: ${results.completed.length}`)
    console.log(`Pending:   ${results.pending.length}`)
    console.log(`Rejected:  ${results.rejected.length}`)
    console.log(`Failed:    ${results.failed.length}`)
    console.log('='.repeat(60))
  }
}

// Example usage
async function example() {
  console.log('Approval Engine Integration Example\n')

  const orchestrator = new ApprovedTaskOrchestrator({
    interactive: false,
    defaultApprove: true,
    approvalEngine: { verbose: false },
    taskExecutor: { verbose: false }
  })

  // Example 1: Single task workflow
  console.log('Example 1: Single Task with Approval')
  const singleTask = {
    id: 'task-1',
    name: 'Update README documentation',
    type: 'docs',
    description: 'Add installation and configuration sections',
    complexity: 'simple',
    submittedBy: 'developer1'
  }

  const result = await orchestrator.processTask(singleTask)
  console.log('Result:', {
    status: result.status,
    approvalType: result.approval?.approvalType,
    confidence: result.approval?.confidence.toFixed(3)
  })

  // Example 2: Batch task workflow
  console.log('\n\nExample 2: Batch Task Processing')
  const batchTasks = [
    {
      id: 'task-2',
      name: 'Fix login bug',
      type: 'code',
      description: 'Session timeout redirects to wrong page',
      complexity: 'moderate',
      submittedBy: 'developer2'
    },
    {
      id: 'task-3',
      name: 'Add API rate limiting',
      type: 'code',
      description: 'Implement token bucket algorithm',
      complexity: 'complex',
      dependencies: ['task-1'],
      submittedBy: 'developer1'
    },
    {
      id: 'task-4',
      name: 'Deploy to staging',
      type: 'deploy',
      description: 'Release v1.2.0 to staging environment',
      complexity: 'critical',
      submittedBy: 'devops1'
    }
  ]

  const batchResults = await orchestrator.processBatch(batchTasks)

  // Example 3: Status reports
  console.log('\n\nExample 3: Status Reports')
  console.log('Pending Approvals:', JSON.stringify(orchestrator.getPendingApprovals(), null, 2))
  console.log('Metrics Report:', JSON.stringify(orchestrator.getMetricsReport(), null, 2))

  // Example 4: Health check
  console.log('\n\nExample 4: Health Status')
  console.log('System Health:', JSON.stringify(orchestrator.getHealthStatus(), null, 2))

  // Example 5: Bottleneck detection
  console.log('\n\nExample 5: Bottleneck Detection')
  const bottlenecks = orchestrator.detectBottlenecks(1)
  console.log('Bottlenecks:', JSON.stringify(bottlenecks, null, 2))
}

module.exports = ApprovedTaskOrchestrator

// Run example if executed directly
if (require.main === module) {
  example().catch(console.error)
}
