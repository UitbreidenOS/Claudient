/**
 * Approval Engine — Human-in-the-loop task approval workflow
 *
 * Features:
 * - Confidence-based routing (auto > review > pair-program)
 * - SLA tracking and bottleneck detection
 * - Approval/reject/modify via CLI and web dashboard
 * - Persistent approval state and audit trail
 */

const { EventEmitter } = require('events')
const fs = require('fs')
const path = require('path')
const readline = require('readline')

const APPROVALS_DIR = path.join(process.cwd(), '.claude', 'approvals')
const APPROVALS_LOG = path.join(APPROVALS_DIR, 'audit-trail.jsonl')

/**
 * Confidence levels and corresponding approval types
 */
const CONFIDENCE_BANDS = {
  HIGH: { min: 0.85, max: 1.0, approvalType: 'auto', slaMinutes: 0 },
  MEDIUM: { min: 0.6, max: 0.85, approvalType: 'review', slaMinutes: 30 },
  LOW: { min: 0.0, max: 0.6, approvalType: 'pair-program', slaMinutes: 120 }
}

/**
 * Approval status enum
 */
const APPROVAL_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  MODIFIED: 'modified',
  EXPIRED: 'expired'
}

/**
 * Approval Engine — Manages task approvals and human oversight
 */
class ApprovalEngine extends EventEmitter {
  constructor(options = {}) {
    super()
    this.options = {
      dataDir: options.dataDir || APPROVALS_DIR,
      slaAlertThreshold: options.slaAlertThreshold || 0.8, // Alert at 80% of SLA
      autoApprovalThreshold: options.autoApprovalThreshold || 0.85,
      verbose: options.verbose || false,
      ...options
    }

    this.approvals = new Map() // In-memory cache
    this.metrics = {
      totalSubmitted: 0,
      totalApproved: 0,
      totalRejected: 0,
      totalModified: 0,
      avgApprovalTime: 0,
      bottlenecks: []
    }

    this._ensureDataDir()
    this._loadApprovals()
  }

  /**
   * Ensure .claude/approvals directory exists
   */
  _ensureDataDir() {
    if (!fs.existsSync(this.options.dataDir)) {
      fs.mkdirSync(this.options.dataDir, { recursive: true })
    }
  }

  /**
   * Load existing approvals from persistent storage
   */
  _loadApprovals() {
    try {
      const approvalsPath = path.join(this.options.dataDir, 'approvals.json')
      if (fs.existsSync(approvalsPath)) {
        const data = JSON.parse(fs.readFileSync(approvalsPath, 'utf8'))
        data.forEach((approval) => {
          this.approvals.set(approval.id, approval)
        })
      }
    } catch (error) {
      if (this.options.verbose) {
        console.error(`Failed to load approvals: ${error.message}`)
      }
    }
  }

  /**
   * Save approvals to persistent storage
   */
  _saveApprovals() {
    try {
      const approvalsPath = path.join(this.options.dataDir, 'approvals.json')
      const data = Array.from(this.approvals.values())
      fs.writeFileSync(approvalsPath, JSON.stringify(data, null, 2), 'utf8')
    } catch (error) {
      this.emit('error', { type: 'save-error', error: error.message })
    }
  }

  /**
   * Write to audit trail (JSONL format)
   */
  _auditLog(entry) {
    try {
      const logEntry = {
        timestamp: new Date().toISOString(),
        ...entry
      }
      fs.appendFileSync(APPROVALS_LOG, JSON.stringify(logEntry) + '\n', 'utf8')
    } catch (error) {
      if (this.options.verbose) {
        console.error(`Failed to write audit trail: ${error.message}`)
      }
    }
  }

  /**
   * Calculate confidence band for a task based on metrics
   */
  calculateConfidence(task) {
    if (task.confidence !== undefined) {
      return task.confidence
    }

    // Heuristic-based confidence calculation
    let confidence = 0.5 // baseline

    // Task type confidence adjustments
    const typeConfidence = {
      docs: 0.9,
      test: 0.85,
      code: 0.6,
      infra: 0.4,
      deploy: 0.3,
      unknown: 0.5
    }
    confidence += (typeConfidence[task.type] || 0.5) * 0.4

    // Complexity adjustment
    if (task.complexity) {
      const complexityScore = {
        simple: 0.3,
        moderate: 0.2,
        complex: -0.1,
        critical: -0.2
      }
      confidence += complexityScore[task.complexity] || 0
    }

    // Dependencies adjustment
    if (task.dependencies && task.dependencies.length > 0) {
      confidence -= task.dependencies.length * 0.05
    }

    // Clamp to [0, 1]
    return Math.max(0, Math.min(1, confidence))
  }

  /**
   * Determine approval type based on confidence
   */
  getApprovalType(confidence) {
    for (const [, band] of Object.entries(CONFIDENCE_BANDS)) {
      if (confidence >= band.min && confidence < band.max) {
        return band
      }
    }
    return CONFIDENCE_BANDS.LOW
  }

  /**
   * Submit task for approval
   */
  async submitForApproval(task) {
    const approvalId = task.id || `approval-${Date.now()}`
    const confidence = this.calculateConfidence(task)
    const approvalBand = this.getApprovalType(confidence)

    const approval = {
      id: approvalId,
      taskId: task.id || task.name,
      taskName: task.name || task.subject,
      taskType: task.type || 'unknown',
      description: task.description || task.content || '',
      confidence: confidence,
      approvalType: approvalBand.approvalType,
      slaMinutes: approvalBand.slaMinutes,
      status: APPROVAL_STATUS.PENDING,
      submittedAt: new Date().toISOString(),
      submittedBy: task.submittedBy || 'system',
      decidedAt: null,
      decidedBy: null,
      decision: null,
      modifications: null,
      metadata: task.metadata || {}
    }

    this.approvals.set(approvalId, approval)
    this.metrics.totalSubmitted++

    this._saveApprovals()
    this._auditLog({
      action: 'submitted',
      approvalId,
      approvalType: approval.approvalType,
      confidence
    })

    this.emit('submitted', { approval, confidence, approvalBand })

    // Auto-approve high-confidence tasks
    if (approval.approvalType === 'auto') {
      return this.approve(approvalId, { auto: true })
    }

    return approval
  }

  /**
   * Approve an approval request
   */
  async approve(approvalId, options = {}) {
    const approval = this.approvals.get(approvalId)
    if (!approval) {
      throw new Error(`Approval ${approvalId} not found`)
    }

    approval.status = APPROVAL_STATUS.APPROVED
    approval.decidedAt = new Date().toISOString()
    approval.decidedBy = options.approvedBy || 'auto'
    approval.decision = 'approved'

    this._saveApprovals()
    this._auditLog({
      action: 'approved',
      approvalId,
      approvedBy: approval.decidedBy,
      duration: this._calculateDuration(approval.submittedAt, approval.decidedAt)
    })

    this.metrics.totalApproved++
    this.emit('approved', { approval })

    return approval
  }

  /**
   * Reject an approval request
   */
  async reject(approvalId, options = {}) {
    const approval = this.approvals.get(approvalId)
    if (!approval) {
      throw new Error(`Approval ${approvalId} not found`)
    }

    approval.status = APPROVAL_STATUS.REJECTED
    approval.decidedAt = new Date().toISOString()
    approval.decidedBy = options.rejectedBy || 'manual'
    approval.decision = 'rejected'
    approval.reason = options.reason || 'No reason provided'

    this._saveApprovals()
    this._auditLog({
      action: 'rejected',
      approvalId,
      rejectedBy: approval.decidedBy,
      reason: approval.reason,
      duration: this._calculateDuration(approval.submittedAt, approval.decidedAt)
    })

    this.metrics.totalRejected++
    this.emit('rejected', { approval })

    return approval
  }

  /**
   * Modify an approval request
   */
  async modify(approvalId, modifications = {}) {
    const approval = this.approvals.get(approvalId)
    if (!approval) {
      throw new Error(`Approval ${approvalId} not found`)
    }

    approval.status = APPROVAL_STATUS.MODIFIED
    approval.decidedAt = new Date().toISOString()
    approval.decidedBy = modifications.modifiedBy || 'manual'
    approval.decision = 'modified'
    approval.modifications = modifications

    this._saveApprovals()
    this._auditLog({
      action: 'modified',
      approvalId,
      modifiedBy: approval.decidedBy,
      changes: Object.keys(modifications).filter((k) => k !== 'modifiedBy'),
      duration: this._calculateDuration(approval.submittedAt, approval.decidedAt)
    })

    this.metrics.totalModified++
    this.emit('modified', { approval })

    return approval
  }

  /**
   * Get approval by ID
   */
  getApproval(approvalId) {
    return this.approvals.get(approvalId) || null
  }

  /**
   * Get all pending approvals
   */
  getPendingApprovals() {
    return Array.from(this.approvals.values()).filter(
      (a) => a.status === APPROVAL_STATUS.PENDING
    )
  }

  /**
   * Get approvals by type
   */
  getApprovalsByType(approvalType) {
    return Array.from(this.approvals.values()).filter(
      (a) => a.approvalType === approvalType
    )
  }

  /**
   * Get overdue approvals (past SLA)
   */
  getOverdueApprovals() {
    const now = new Date()
    return this.getPendingApprovals().filter((approval) => {
      const submitted = new Date(approval.submittedAt)
      const slaEnd = new Date(submitted.getTime() + approval.slaMinutes * 60000)
      return now > slaEnd
    })
  }

  /**
   * Get approvals nearing SLA expiry
   */
  getApprovalNearingSLA() {
    const now = new Date()
    return this.getPendingApprovals().filter((approval) => {
      const submitted = new Date(approval.submittedAt)
      const slaEnd = new Date(submitted.getTime() + approval.slaMinutes * 60000)
      const alertTime = new Date(
        slaEnd.getTime() - approval.slaMinutes * 60000 * (1 - this.options.slaAlertThreshold)
      )
      return now > alertTime && now <= slaEnd
    })
  }

  /**
   * Calculate duration between two ISO timestamps
   */
  _calculateDuration(startIso, endIso) {
    const start = new Date(startIso)
    const end = new Date(endIso)
    return Math.round((end - start) / 1000) // seconds
  }

  /**
   * Update metrics (SLA compliance, bottlenecks, etc)
   */
  updateMetrics() {
    const allApprovals = Array.from(this.approvals.values())
    const completedApprovals = allApprovals.filter(
      (a) => a.status !== APPROVAL_STATUS.PENDING
    )

    if (completedApprovals.length > 0) {
      const totalTime = completedApprovals.reduce((sum, a) => {
        return sum + this._calculateDuration(a.submittedAt, a.decidedAt || new Date())
      }, 0)
      this.metrics.avgApprovalTime = Math.round(totalTime / completedApprovals.length)
    }

    // Detect bottlenecks (approvals with high pending count)
    const pendingByType = {}
    this.getPendingApprovals().forEach((approval) => {
      pendingByType[approval.approvalType] =
        (pendingByType[approval.approvalType] || 0) + 1
    })

    this.metrics.bottlenecks = Object.entries(pendingByType)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)

    return this.metrics
  }

  /**
   * Get metrics report
   */
  getMetrics() {
    this.updateMetrics()
    return {
      ...this.metrics,
      pendingCount: this.getPendingApprovals().length,
      overdueCount: this.getOverdueApprovals().length,
      nearingSLACount: this.getApprovalNearingSLA().length
    }
  }

  /**
   * CLI interface for approval management
   */
  async promptForApproval(approval) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    return new Promise((resolve) => {
      console.log('\n' + '='.repeat(60))
      console.log(`Approval Required: ${approval.taskName}`)
      console.log('='.repeat(60))
      console.log(`Type: ${approval.taskType}`)
      console.log(`Confidence: ${(approval.confidence * 100).toFixed(1)}%`)
      console.log(`SLA: ${approval.slaMinutes} minutes`)
      console.log(`Description: ${approval.description}`)
      console.log('\nOptions: (a)pprove, (r)eject, (m)odify, (s)kip')
      console.log('-'.repeat(60))

      rl.question('Your decision: ', async (answer) => {
        rl.close()

        const decision = answer.toLowerCase().trim()

        switch (decision) {
          case 'a':
          case 'approve':
            resolve(await this.approve(approval.id, { approvedBy: 'user' }))
            break
          case 'r':
          case 'reject':
            const reasonRl = readline.createInterface({
              input: process.stdin,
              output: process.stdout
            })
            reasonRl.question('Rejection reason: ', async (reason) => {
              reasonRl.close()
              resolve(
                await this.reject(approval.id, {
                  rejectedBy: 'user',
                  reason
                })
              )
            })
            break
          case 'm':
          case 'modify':
            const modRl = readline.createInterface({
              input: process.stdin,
              output: process.stdout
            })
            modRl.question('Modifications (JSON): ', async (mods) => {
              modRl.close()
              try {
                const modifications = JSON.parse(mods)
                modifications.modifiedBy = 'user'
                resolve(await this.modify(approval.id, modifications))
              } catch (e) {
                console.error('Invalid JSON')
                resolve(approval)
              }
            })
            break
          case 's':
          case 'skip':
          default:
            resolve(approval)
        }
      })
    })
  }

  /**
   * Generate HTML dashboard for web UI
   */
  generateDashboardHTML() {
    const metrics = this.getMetrics()
    const pending = this.getPendingApprovals()
    const overdue = this.getOverdueApprovals()

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Approval Engine Dashboard</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0d1117;
      color: #c9d1d9;
      padding: 20px;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { margin-bottom: 30px; color: #58a6ff; }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .metric-card {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 8px;
      padding: 20px;
    }
    .metric-label { font-size: 12px; text-transform: uppercase; color: #8b949e; }
    .metric-value { font-size: 32px; font-weight: bold; color: #58a6ff; margin: 10px 0; }
    .metric-detail { font-size: 12px; color: #6e7681; }
    .approvals-section { margin-top: 40px; }
    .approval-item {
      background: #161b22;
      border-left: 4px solid #58a6ff;
      border-radius: 4px;
      padding: 16px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .approval-item.overdue { border-left-color: #f85149; }
    .approval-item.warning { border-left-color: #d29922; }
    .approval-info { flex: 1; }
    .approval-title { font-weight: 600; margin-bottom: 4px; }
    .approval-meta { font-size: 12px; color: #8b949e; }
    .approval-actions {
      display: flex;
      gap: 8px;
    }
    button {
      padding: 6px 12px;
      border: 1px solid #30363d;
      border-radius: 4px;
      background: #0d1117;
      color: #58a6ff;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.2s;
    }
    button:hover {
      background: #161b22;
      border-color: #58a6ff;
    }
    button.approve {
      color: #3fb950;
      border-color: #3fb950;
    }
    button.reject {
      color: #f85149;
      border-color: #f85149;
    }
    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      margin-right: 8px;
    }
    .badge.auto { background: #238636; }
    .badge.review { background: #1f6feb; }
    .badge.pair-program { background: #d29922; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #30363d;
    }
    th { background: #0d1117; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Approval Engine Dashboard</h1>

    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-label">Total Submitted</div>
        <div class="metric-value">${metrics.totalSubmitted}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Approved</div>
        <div class="metric-value">${metrics.totalApproved}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Pending</div>
        <div class="metric-value" style="color: #d29922;">${metrics.pendingCount}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Overdue</div>
        <div class="metric-value" style="color: #f85149;">${metrics.overdueCount}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Avg Approval Time</div>
        <div class="metric-value">${Math.round(metrics.avgApprovalTime / 60)}m</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Rejected</div>
        <div class="metric-value">${metrics.totalRejected}</div>
      </div>
    </div>

    <div class="approvals-section">
      <h2 style="color: #58a6ff; margin-bottom: 20px;">Pending Approvals (${pending.length})</h2>
      ${
        pending.length === 0
          ? '<p style="color: #8b949e;">No pending approvals</p>'
          : pending
              .map((approval) => {
                const isOverdue = this.getOverdueApprovals().some((a) => a.id === approval.id)
                const isWarning = this.getApprovalNearingSLA().some((a) => a.id === approval.id)
                const itemClass = isOverdue ? 'overdue' : isWarning ? 'warning' : ''

                return `
                  <div class="approval-item ${itemClass}">
                    <div class="approval-info">
                      <div class="approval-title">${approval.taskName}</div>
                      <div class="approval-meta">
                        <span class="badge ${approval.approvalType}">${approval.approvalType}</span>
                        Confidence: ${(approval.confidence * 100).toFixed(1)}% |
                        SLA: ${approval.slaMinutes}m |
                        Type: ${approval.taskType}
                      </div>
                      <div class="approval-meta" style="margin-top: 8px;">
                        ${approval.description.substring(0, 100)}${approval.description.length > 100 ? '...' : ''}
                      </div>
                    </div>
                    <div class="approval-actions">
                      <button class="approve" onclick="approve('${approval.id}')">Approve</button>
                      <button class="reject" onclick="reject('${approval.id}')">Reject</button>
                      <button onclick="modify('${approval.id}')">Modify</button>
                    </div>
                  </div>
                `
              })
              .join('')
      }
    </div>

    <div style="margin-top: 40px;">
      <h2 style="color: #58a6ff; margin-bottom: 20px;">Bottleneck Analysis</h2>
      <table>
        <thead>
          <tr>
            <th>Approval Type</th>
            <th>Pending Count</th>
            <th>Avg Approval Time</th>
          </tr>
        </thead>
        <tbody>
          ${metrics.bottlenecks
            .map((bottleneck) => {
              const approvalsByType = this.getApprovalsByType(bottleneck.type).filter(
                (a) => a.status !== APPROVAL_STATUS.PENDING
              )
              const avgTime =
                approvalsByType.length > 0
                  ? Math.round(
                      approvalsByType.reduce((sum, a) => {
                        return sum + this._calculateDuration(a.submittedAt, a.decidedAt)
                      }, 0) / approvalsByType.length
                    )
                  : 0
              return `
                <tr>
                  <td><span class="badge ${bottleneck.type}">${bottleneck.type}</span></td>
                  <td>${bottleneck.count}</td>
                  <td>${Math.round(avgTime / 60)}m</td>
                </tr>
              `
            })
            .join('')}
        </tbody>
      </table>
    </div>
  </div>

  <script>
    async function approve(approvalId) {
      const response = await fetch(\`/approvals/\${approvalId}/approve\`, { method: 'POST' })
      if (response.ok) {
        location.reload()
      }
    }

    async function reject(approvalId) {
      const reason = prompt('Rejection reason:')
      if (!reason) return
      const response = await fetch(\`/approvals/\${approvalId}/reject\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason })
      })
      if (response.ok) {
        location.reload()
      }
    }

    async function modify(approvalId) {
      const modifications = prompt('Modifications (JSON):')
      if (!modifications) return
      try {
        JSON.parse(modifications)
      } catch (e) {
        alert('Invalid JSON')
        return
      }
      const response = await fetch(\`/approvals/\${approvalId}/modify\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: modifications
      })
      if (response.ok) {
        location.reload()
      }
    }
  </script>
</body>
</html>
    `
  }

  /**
   * Export audit trail as CSV
   */
  exportAuditTrailCSV() {
    const lines = ['Timestamp,Action,ApprovalID,ApprovalType,Details']

    try {
      if (fs.existsSync(APPROVALS_LOG)) {
        const content = fs.readFileSync(APPROVALS_LOG, 'utf8')
        content.split('\n').forEach((line) => {
          if (line.trim()) {
            const entry = JSON.parse(line)
            const details = JSON.stringify(entry).replace(/"/g, '""')
            lines.push(
              `"${entry.timestamp}","${entry.action}","${entry.approvalId}","${
                entry.approvalType || 'N/A'
              }","${details}"`
            )
          }
        })
      }
    } catch (error) {
      if (this.options.verbose) {
        console.error(`Failed to export audit trail: ${error.message}`)
      }
    }

    return lines.join('\n')
  }

  /**
   * Batch process approvals by type
   */
  async batchApprove(approvalType, options = {}) {
    const approvals = this.getApprovalsByType(approvalType).filter(
      (a) => a.status === APPROVAL_STATUS.PENDING
    )

    const results = {
      approved: 0,
      rejected: 0,
      errors: 0
    }

    for (const approval of approvals) {
      try {
        if (options.auto) {
          await this.approve(approval.id, { approvedBy: 'batch-auto' })
          results.approved++
        } else if (options.reject) {
          await this.reject(approval.id, {
            rejectedBy: 'batch',
            reason: options.reason || 'Batch rejection'
          })
          results.rejected++
        }
      } catch (error) {
        results.errors++
        if (this.options.verbose) {
          console.error(`Batch process error for ${approval.id}: ${error.message}`)
        }
      }
    }

    return results
  }
}

module.exports = ApprovalEngine
module.exports.APPROVAL_STATUS = APPROVAL_STATUS
module.exports.CONFIDENCE_BANDS = CONFIDENCE_BANDS
