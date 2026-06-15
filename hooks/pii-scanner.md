# Hook: PII Scanner

Scans all tool inputs for personally identifiable information (PII) and blocks execution if sensitive patterns are detected. Protects against accidental exposure of emails, phone numbers, SSNs, credit cards, and API keys.

## Event
`PreToolUse` — fires before every tool call starts (synchronous; blocks execution if PII found)

## settings.json entry

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/pii-scanner.sh",
            "async": false
          }
        ]
      }
    ]
  },
  "security": {
    "pii_scanning": {
      "enabled": true,
      "action": "block",
      "block_list": ["email", "phone", "ssn", "credit_card", "api_key"],
      "warn_list": ["passport", "ip_address"],
      "custom_patterns": []
    }
  }
}
```

Note: `async: false` is required for synchronous blocking before tool execution.

## What it does

Scans tool input against known PII patterns:

| Pattern | Detects | Action |
|---------|---------|--------|
| Email | `name@domain.com` | **BLOCK** |
| Phone | `(123) 456-7890`, `+1-123-456-7890` | **BLOCK** |
| SSN | `123-45-6789` | **BLOCK** |
| Credit Card | `1234-5678-9012-3456` | **BLOCK** |
| API Key | `api_key=sk_live_abc123...` | **BLOCK** |
| Passport | `AB123456` | *WARN* (high false positive) |
| Private IP | `192.168.1.1`, `10.0.0.5` | *WARN* |

If a **BLOCK** pattern is found, the tool call is aborted with an error message. The user must remove the PII and retry.

Example block:

```
ERROR: PII detected in tool input (Write)
Patterns found: EMAIL CREDIT_CARD

This tool call is blocked by enterprise PII scanning.
Please remove sensitive data and try again.

Detected patterns:
  - EMAIL (BLOCKED)
  - CREDIT_CARD (BLOCKED)
```

## Features

- **Pre-execution blocking**: Detects PII before the tool runs (prevents accidental writes)
- **Pattern matching**: Regex for common formats (US phone, SSN, card numbers)
- **Logging**: All scans logged to `.claude/logs/pii-scan.log` for audit
- **Warning vs. block**: Distinguishes high-confidence (block) from uncertain patterns (warn)
- **Custom patterns**: Configure organization-specific PII (employee ID, etc.) in settings.json

## Setup

```bash
cp hooks/pii-scanner.sh .claude/hooks/
chmod +x .claude/hooks/pii-scanner.sh
mkdir -p .claude/logs
```

## Custom PII Patterns

Add to settings.json to detect organization-specific sensitive data:

```json
{
  "security": {
    "pii_scanning": {
      "enabled": true,
      "custom_patterns": [
        {
          "name": "company_employee_id",
          "regex": "EMP[0-9]{6}",
          "action": "block"
        },
        {
          "name": "internal_ip",
          "regex": "192\\.168\\..*",
          "action": "warn"
        },
        {
          "name": "customer_pii_hash",
          "regex": "CUST_[A-Z0-9]{32}",
          "action": "block"
        }
      ]
    }
  }
}
```

## Compliance Benefits

- **GDPR**: Prevents accidental processing of personal data (Article 32)
- **HIPAA**: Stops protected health information from reaching external systems
- **PCI-DSS**: Prevents cardholder data in logs/transcripts
- **CCPA**: Restricts California consumer personal information processing
- **SOX**: Audit trail of all PII exposure attempts (logged regardless of block)

## Query Examples

View all PII scan attempts:

```bash
cat .claude/logs/pii-scan.log
```

Find blocked executions:

```bash
grep "Action: BLOCKED" .claude/logs/pii-scan.log
```

Count by PII type:

```bash
grep "Patterns found:" .claude/logs/pii-scan.log | sed 's/.*: //' | tr ' ' '\n' | sort | uniq -c
```

## False Positives

The passport and IP address patterns have high false positive rates. They are warnings only (non-blocking) by default.

To disable warnings:

```json
{
  "security": {
    "pii_scanning": {
      "warn_list": []
    }
  }
}
```

---
