#!/usr/bin/env node

/**
 * CLI Interface for Approval Engine
 *
 * Usage:
 *   node approval-engine-cli.js submit <task.json>
 *   node approval-engine-cli.js list [--pending|--overdue|--by-type review]
 *   node approval-engine-cli.js approve <approval-id>
 *   node approval-engine-cli.js reject <approval-id> --reason "reason"
 *   node approval-engine-cli.js modify <approval-id> <modifications.json>
 *   node approval-engine-cli.js dashboard
 *   node approval-engine-cli.js metrics
 *   node approval-engine-cli.js audit-export [--format csv|json]
 *   node approval-engine-cli.js batch-process <type> [--action approve|reject]
 */

const ApprovalEngine = require('./approval-engine')
const fs = require('fs')
const path = require('path')

class ApprovalEngineCLI {
  constructor() {
    this.engine = new ApprovalEngine({ verbose: true })
  }

  /**
   * Parse command line arguments
   */
  static parseArgs() {
    const args = process.argv.slice(2)
    const command = args[0]
    const params = args.slice(1)

    return { command, params, rawArgs: args }
  }

  /**
   * Main CLI entry point
   */
  async run() {
    const { command, params } = ApprovalEngineCLI.parseArgs()

    try {
      switch (command) {
        case 'submit':
          await this.handleSubmit(params)
          break
        case 'list':
          await this.handleList(params)
          break
        case 'approve':
          await this.handleApprove(params)
          break
        case 'reject':
          await this.handleReject(params)
          break
        case 'modify':
          await this.handleModify(params)
          break
        case 'dashboard':
          await this.handleDashboard(params)
          break
        case 'metrics':
          await this.handleMetrics(params)
          break
        case 'audit-export':
          await this.handleAuditExport(params)
          break
        case 'batch-process':
          await this.handleBatchProcess(params)
          break
        case 'help':
          this.showHelp()
          break
        default:
          console.error(`Unknown command: ${command}`)
          this.showHelp()
          process.exit(1)
      }
    } catch (error) {
      console.error('Error:', error.message)
      process.exit(1)
    }
  }

  /**
   * Submit a task for approval
   * Usage: submit <task.json> [--interactive]
   */
  async handleSubmit(params) {
    if (params.length === 0) {
      console.error('Usage: submit <task.json>')
      process.exit(1)
    }

    const taskFile = params[0]
    const isInteractive = params.includes('--interactive')

    if (!fs.existsSync(taskFile)) {
      console.error(`Task file not found: ${taskFile}`)
      process.exit(1)
    }

    const task = JSON.parse(fs.readFileSync(taskFile, 'utf8'))
    const approval = await this.engine.submitForApproval(task)

    console.log('\n' + '='.repeat(60))
    console.log('Task Submitted for Approval')
    console.log('='.repeat(60))
    console.log(`ID: ${approval.id}`)
    console.log(`Task: ${approval.taskName}`)
    console.log(`Type: ${approval.taskType}`)
    console.log(`Confidence: ${(approval.confidence * 100).toFixed(1)}%`)
    console.log(`Approval Type: ${approval.approvalType}`)
    console.log(`SLA: ${approval.slaMinutes} minutes`)
    console.log(`Status: ${approval.status}`)
    console.log('='.repeat(60))

    if (isInteractive && approval.status === 'pending') {
      const decision = await this.engine.promptForApproval(approval)
      console.log('Decision:', decision.status)
    }
  }

  /**
   * List approvals
   * Usage: list [--pending|--overdue|--by-type <type>]
   */
  async handleList(params) {
    let approvals = []

    if (params.includes('--pending')) {
      approvals = this.engine.getPendingApprovals()
    } else if (params.includes('--overdue')) {
      approvals = this.engine.getOverdueApprovals()
    } else if (params.includes('--by-type')) {
      const typeIndex = params.indexOf('--by-type')
      const type = params[typeIndex + 1]
      if (!type) {
        console.error('Missing approval type after --by-type')
        process.exit(1)
      }
      approvals = this.engine.getApprovalsByType(type)
    } else {
      approvals = Array.from(this.engine.approvals.values())
    }

    if (approvals.length === 0) {
      console.log('No approvals found')
      return
    }

    console.log('\n' + '='.repeat(80))
    console.log('Approvals')
    console.log('='.repeat(80))

    const table = approvals.map((a) => ({
      ID: a.id.substring(0, 12),
      Task: a.taskName.substring(0, 30),
      Type: a.approvalType,
      Status: a.status,
      Confidence: `${(a.confidence * 100).toFixed(0)}%`,
      Submitted: new Date(a.submittedAt).toLocaleString()
    }))

    this._printTable(table)
    console.log('='.repeat(80))
  }

  /**
   * Approve an approval request
   * Usage: approve <approval-id> [--user username]
   */
  async handleApprove(params) {
    if (params.length === 0) {
      console.error('Usage: approve <approval-id>')
      process.exit(1)
    }

    const approvalId = params[0]
    const userIndex = params.indexOf('--user')
    const user = userIndex >= 0 ? params[userIndex + 1] : 'cli-user'

    const approval = await this.engine.approve(approvalId, { approvedBy: user })

    console.log(`\n✓ Approved: ${approval.taskName}`)
    console.log(`  Approved by: ${approval.decidedBy}`)
    console.log(`  At: ${new Date(approval.decidedAt).toLocaleString()}`)
  }

  /**
   * Reject an approval request
   * Usage: reject <approval-id> --reason "reason text" [--user username]
   */
  async handleReject(params) {
    if (params.length === 0) {
      console.error('Usage: reject <approval-id> --reason "reason"')
      process.exit(1)
    }

    const approvalId = params[0]
    const reasonIndex = params.indexOf('--reason')
    const reason = reasonIndex >= 0 ? params[reasonIndex + 1] : 'No reason provided'
    const userIndex = params.indexOf('--user')
    const user = userIndex >= 0 ? params[userIndex + 1] : 'cli-user'

    const approval = await this.engine.reject(approvalId, {
      rejectedBy: user,
      reason
    })

    console.log(`\n✗ Rejected: ${approval.taskName}`)
    console.log(`  Reason: ${approval.reason}`)
    console.log(`  Rejected by: ${approval.decidedBy}`)
    console.log(`  At: ${new Date(approval.decidedAt).toLocaleString()}`)
  }

  /**
   * Modify an approval request
   * Usage: modify <approval-id> <modifications.json> [--user username]
   */
  async handleModify(params) {
    if (params.length < 2) {
      console.error('Usage: modify <approval-id> <modifications.json>')
      process.exit(1)
    }

    const approvalId = params[0]
    const modsFile = params[1]
    const userIndex = params.indexOf('--user')
    const user = userIndex >= 0 ? params[userIndex + 1] : 'cli-user'

    if (!fs.existsSync(modsFile)) {
      console.error(`Modifications file not found: ${modsFile}`)
      process.exit(1)
    }

    const modifications = JSON.parse(fs.readFileSync(modsFile, 'utf8'))
    modifications.modifiedBy = user

    const approval = await this.engine.modify(approvalId, modifications)

    console.log(`\n⚙️  Modified: ${approval.taskName}`)
    console.log('  Changes:')
    Object.entries(modifications).forEach(([key, value]) => {
      if (key !== 'modifiedBy') {
        console.log(`    - ${key}: ${JSON.stringify(value)}`)
      }
    })
    console.log(`  Modified by: ${approval.decidedBy}`)
    console.log(`  At: ${new Date(approval.decidedAt).toLocaleString()}`)
  }

  /**
   * Display web dashboard
   * Usage: dashboard [--port 3000]
   */
  async handleDashboard(params) {
    const portIndex = params.indexOf('--port')
    const port = portIndex >= 0 ? parseInt(params[portIndex + 1], 10) : 3000

    const http = require('http')
    const url = require('url')

    const server = http.createServer((req, res) => {
      const parsedUrl = url.parse(req.url, true)

      // Serve HTML dashboard
      if (parsedUrl.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end(this.engine.generateDashboardHTML())
        return
      }

      // API endpoints
      if (parsedUrl.pathname === '/api/metrics') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(this.engine.getMetrics()))
        return
      }

      if (parsedUrl.pathname === '/api/pending') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(this.engine.getPendingApprovals()))
        return
      }

      // Approval action endpoints (POST)
      const approvalMatch = parsedUrl.pathname.match(/\/approvals\/(.+)\/(approve|reject|modify)/)
      if (req.method === 'POST' && approvalMatch) {
        const [, approvalId, action] = approvalMatch
        let body = ''

        req.on('data', (chunk) => {
          body += chunk.toString()
        })

        req.on('end', async () => {
          try {
            if (action === 'approve') {
              await this.engine.approve(approvalId, { approvedBy: 'web-dashboard' })
            } else if (action === 'reject') {
              const data = JSON.parse(body)
              await this.engine.reject(approvalId, {
                rejectedBy: 'web-dashboard',
                reason: data.reason
              })
            } else if (action === 'modify') {
              const data = JSON.parse(body)
              data.modifiedBy = 'web-dashboard'
              await this.engine.modify(approvalId, data)
            }

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ success: true }))
          } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: error.message }))
          }
        })
        return
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('Not Found')
    })

    server.listen(port, () => {
      console.log(`\n📊 Approval Dashboard running at http://localhost:${port}`)
      console.log('Press Ctrl+C to stop')
    })
  }

  /**
   * Display metrics and statistics
   * Usage: metrics [--json]
   */
  async handleMetrics(params) {
    const metrics = this.engine.getMetrics()
    const json = params.includes('--json')

    if (json) {
      console.log(JSON.stringify(metrics, null, 2))
      return
    }

    console.log('\n' + '='.repeat(60))
    console.log('Approval Engine Metrics')
    console.log('='.repeat(60))
    console.log(`Total Submitted:     ${metrics.totalSubmitted}`)
    console.log(`Approved:            ${metrics.totalApproved}`)
    console.log(`Rejected:            ${metrics.totalRejected}`)
    console.log(`Modified:            ${metrics.totalModified}`)
    console.log(`Pending:             ${metrics.pendingCount}`)
    console.log(`Overdue:             ${metrics.overdueCount}`)
    console.log(`Nearing SLA:         ${metrics.nearingSLACount}`)
    console.log(`Avg Approval Time:   ${Math.round(metrics.avgApprovalTime / 60)}m`)

    if (metrics.bottlenecks.length > 0) {
      console.log('\nBottlenecks:')
      metrics.bottlenecks.forEach((b) => {
        console.log(`  - ${b.type}: ${b.count} pending`)
      })
    }

    console.log('='.repeat(60))
  }

  /**
   * Export audit trail
   * Usage: audit-export [--format csv|json] [--output file]
   */
  async handleAuditExport(params) {
    const format = params.includes('--format') ? params[params.indexOf('--format') + 1] : 'csv'
    const outputIndex = params.indexOf('--output')
    const output = outputIndex >= 0 ? params[outputIndex + 1] : null

    let data
    if (format === 'csv') {
      data = this.engine.exportAuditTrailCSV()
    } else if (format === 'json') {
      const lines = []
      const auditFile = path.join(this.engine.options.dataDir, 'audit-trail.jsonl')
      if (fs.existsSync(auditFile)) {
        const content = fs.readFileSync(auditFile, 'utf8')
        lines.push(...content.split('\n').filter((l) => l).map((l) => JSON.parse(l)))
      }
      data = JSON.stringify(lines, null, 2)
    }

    if (output) {
      fs.writeFileSync(output, data, 'utf8')
      console.log(`✓ Exported to: ${output}`)
    } else {
      console.log(data)
    }
  }

  /**
   * Batch process approvals
   * Usage: batch-process <type> [--action approve|reject] [--reason "reason"]
   */
  async handleBatchProcess(params) {
    if (params.length === 0) {
      console.error('Usage: batch-process <type> [--action approve|reject]')
      process.exit(1)
    }

    const type = params[0]
    const actionIndex = params.indexOf('--action')
    const action = actionIndex >= 0 ? params[actionIndex + 1] : 'approve'
    const reasonIndex = params.indexOf('--reason')
    const reason = reasonIndex >= 0 ? params[reasonIndex + 1] : 'Batch processed'

    const options = action === 'approve' ? { auto: true } : { reject: true, reason }

    const results = await this.engine.batchApprove(type, options)

    console.log('\n' + '='.repeat(60))
    console.log(`Batch Process Results (${type})`)
    console.log('='.repeat(60))
    console.log(`Approved:  ${results.approved}`)
    console.log(`Rejected:  ${results.rejected}`)
    console.log(`Errors:    ${results.errors}`)
    console.log('='.repeat(60))
  }

  /**
   * Print table
   */
  _printTable(data) {
    if (data.length === 0) return

    const headers = Object.keys(data[0])
    const colWidths = headers.map((h) => {
      const maxDataWidth = Math.max(...data.map((row) => String(row[h]).length))
      return Math.max(h.length, maxDataWidth) + 2
    })

    // Header
    const headerRow = headers.map((h, i) => h.padEnd(colWidths[i])).join('│')
    console.log(headerRow)
    console.log(headers.map((, i) => '─'.repeat(colWidths[i])).join('┼'))

    // Rows
    data.forEach((row) => {
      const cells = headers.map((h, i) => String(row[h]).padEnd(colWidths[i]))
      console.log(cells.join('│'))
    })
  }

  /**
   * Show help
   */
  showHelp() {
    console.log(`
Approval Engine CLI

Usage:
  node approval-engine-cli.js <command> [options]

Commands:

  submit <task.json>
    Submit a task for approval. Task file must be valid JSON.
    Example: node approval-engine-cli.js submit task.json --interactive

  list [--pending|--overdue|--by-type <type>]
    List approvals. Filter options:
    --pending      Show only pending approvals
    --overdue      Show only overdue approvals
    --by-type      Filter by approval type (auto, review, pair-program)

  approve <approval-id> [--user username]
    Approve an approval request.
    Example: node approval-engine-cli.js approve abc123 --user reviewer1

  reject <approval-id> --reason "reason" [--user username]
    Reject an approval request with a reason.
    Example: node approval-engine-cli.js reject abc123 --reason "Needs more testing"

  modify <approval-id> <modifications.json> [--user username]
    Modify an approval request.
    Example: node approval-engine-cli.js modify abc123 mods.json --user reviewer1

  dashboard [--port 3000]
    Start web dashboard for approval management.
    Example: node approval-engine-cli.js dashboard --port 8080

  metrics [--json]
    Show approval metrics and statistics.
    Example: node approval-engine-cli.js metrics --json

  audit-export [--format csv|json] [--output file.csv]
    Export audit trail in CSV or JSON format.
    Example: node approval-engine-cli.js audit-export --format csv --output audit.csv

  batch-process <type> [--action approve|reject] [--reason "reason"]
    Batch process approvals of a specific type.
    Example: node approval-engine-cli.js batch-process review --action approve

  help
    Show this help message.
    `)
  }
}

// Run CLI if executed directly
if (require.main === module) {
  const cli = new ApprovalEngineCLI()
  cli.run().catch((error) => {
    console.error('Fatal error:', error.message)
    process.exit(1)
  })
}

module.exports = ApprovalEngineCLI
