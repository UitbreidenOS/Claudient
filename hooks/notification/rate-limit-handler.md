# Rate Limit Evasion Hook (Night Shift Support)

This hook watches Claude Code's internal notifications. If it detects an API rate limit (HTTP 429) or token limit error, it automatically pauses execution, allowing long-running autonomous tasks (like the Night Shift agent) to survive unattended.

## When it fires
Event: `Notification`
Triggers whenever Claude Code emits a system notification, error, or warning.

## What it does
1. Parses the incoming notification text.
2. Checks for keywords like `rate limit`, `429`, `capacity`, or `token limit`.
3. If detected, the hook uses `sleep` to forcefully pause the Claude Code process for a predefined backoff period (e.g., 5 minutes).
4. Because hooks block the main CLI event loop, sleeping inside the hook effectively pauses the AI without crashing the session.
5. Once the sleep completes, the hook exits successfully, and Claude automatically retries or continues its queue.

## `settings.json` Configuration
Add this to your project's `.claude/settings.json`:

```json
{
  "hooks": {
    "Notification": [
      {
        "command": "bash .claude/hooks/rate-limit-handler.sh \"$NOTIFICATION_TYPE\" \"$NOTIFICATION_MESSAGE\"",
        "description": "Auto-pause on API rate limits"
      }
    ]
  }
}
```

## Setup Instructions
1. Copy the `rate-limit-handler.sh` script to `.claude/hooks/rate-limit-handler.sh`.
2. Make it executable: `chmod +x .claude/hooks/rate-limit-handler.sh`.
3. Update your `.claude/settings.json` as shown above.