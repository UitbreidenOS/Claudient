# Top MCP Servers for Indie Builders

The definitive installation guide for the most useful MCP servers in 2026. Each server extends what Claude Code can do — connect to databases, automate browsers, manage code, handle payments, and more.

**Start here:** Most indie builders get 80% of the value from 5 servers — GitHub, a database (PostgreSQL/Supabase), Stripe, Playwright, and Memory. Install those first.

---

## How to install any MCP server

Add to `~/.claude.json` (global) or `.claude/mcp.json` (project-level):

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@scope/package-name"],
      "env": {
        "API_KEY": "your-key-here"
      }
    }
  }
}
```

Then restart Claude Code for changes to take effect.

---

## 🏆 Essential — Install These First

### 1. GitHub
**What it does:** PR reviews, issue triage, code search, file reading, branch management from inside Claude Code.

```json
"github": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github"],
  "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..." }
}
```
Get token: [github.com/settings/tokens](https://github.com/settings/tokens) → New token → repo, read:org scopes

---

### 2. Memory (Persistent Knowledge Graph)
**What it does:** Remembers facts, decisions, and context across Claude Code sessions. The single most-requested capability.

```json
"memory": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-memory"],
  "env": {
    "MEMORY_FILE_PATH": "/Users/your-name/.claude/memory/knowledge.json"
  }
}
```

---

### 3. Playwright (Browser Automation)
**What it does:** Control a real browser — navigate, click, fill forms, take screenshots, scrape JavaScript-rendered pages.

```json
"playwright": {
  "command": "npx",
  "args": ["-y", "@playwright/mcp@latest"],
  "env": { "BROWSER": "chromium" }
}
```

---

### 4. PostgreSQL
**What it does:** Run SQL queries against your database, explore schemas, answer business questions without exporting data.

```json
"postgres": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
}
```
Note: use a read-only connection string for safety — don't give Claude write access unless intentional.

---

### 5. Filesystem
**What it does:** Read, write, and search files outside the current project directory. Useful for cross-project tasks.

```json
"filesystem": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/your-name/projects"]
}
```

---

## 💻 Development Tools

### 6. Context7 (Live Documentation)
**What it does:** Fetches up-to-date library documentation. Prevents Claude from using outdated APIs.

```json
"context7": {
  "command": "npx",
  "args": ["-y", "@upstash/context7-mcp@latest"]
}
```

---

### 7. Supabase
**What it does:** Full Supabase project management — database, auth, storage, functions, edge configs.

```json
"supabase": {
  "command": "npx",
  "args": ["-y", "@supabase/mcp-server-supabase@latest"],
  "env": {
    "SUPABASE_ACCESS_TOKEN": "sbp_...",
    "SUPABASE_PROJECT_REF": "your-project-ref"
  }
}
```

---

### 8. GitLab
**What it does:** Same as GitHub MCP but for GitLab — MRs, issues, pipelines, repositories.

```json
"gitlab": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-gitlab"],
  "env": {
    "GITLAB_PERSONAL_ACCESS_TOKEN": "glpat-...",
    "GITLAB_API_URL": "https://gitlab.com/api/v4"
  }
}
```

---

### 9. Sentry
**What it does:** Query Sentry errors, create issues, get error details and stack traces directly in Claude Code.

```json
"sentry": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-sentry"],
  "env": {
    "SENTRY_AUTH_TOKEN": "sntrys_...",
    "SENTRY_ORGANIZATION": "your-org-slug"
  }
}
```

---

### 10. Docker
**What it does:** Manage Docker containers, images, volumes, and networks from Claude Code.

```json
"docker": {
  "command": "npx",
  "args": ["-y", "mcp-server-docker"]
}
```

---

### 11. MySQL
**What it does:** Query MySQL databases — schema exploration, SQL execution, table inspection.

```json
"mysql": {
  "command": "npx",
  "args": ["-y", "@benborla29/mcp-server-mysql"],
  "env": {
    "MYSQL_HOST": "localhost",
    "MYSQL_PORT": "3306",
    "MYSQL_USER": "root",
    "MYSQL_PASSWORD": "password",
    "MYSQL_DATABASE": "mydb"
  }
}
```

---

### 12. Redis
**What it does:** Read/write Redis keys, inspect data, manage cache from Claude Code.

```json
"redis": {
  "command": "npx",
  "args": ["-y", "mcp-server-redis"],
  "env": { "REDIS_URL": "redis://localhost:6379" }
}
```

---

## 💰 Payments & Finance

### 13. Stripe
**What it does:** Customer lookup, payment queries, subscription management, refund processing.

```json
"stripe": {
  "command": "npx",
  "args": ["-y", "@stripe/agent-toolkit"],
  "env": { "STRIPE_SECRET_KEY": "sk_test_..." }
}
```

---

### 14. Shopify
**What it does:** Manage products, orders, inventory, and customers on a Shopify store.

```json
"shopify": {
  "command": "npx",
  "args": ["-y", "@shopify/dev-mcp"],
  "env": {
    "SHOPIFY_ACCESS_TOKEN": "shpat_...",
    "MYSHOPIFY_DOMAIN": "your-store.myshopify.com"
  }
}
```

---

## 📊 Analytics & Monitoring

### 15. Grafana
**What it does:** Query metrics, explore dashboards, investigate alerts from Claude Code.

```json
"grafana": {
  "command": "npx",
  "args": ["-y", "@grafana/mcp-grafana"],
  "env": {
    "GRAFANA_URL": "http://localhost:3000",
    "GRAFANA_API_KEY": "glsa_..."
  }
}
```

---

### 16. Datadog
**What it does:** Query metrics, logs, traces, monitors and alerts.

```json
"datadog": {
  "command": "npx",
  "args": ["-y", "@datadog/mcp-server"],
  "env": {
    "DD_API_KEY": "...",
    "DD_APP_KEY": "...",
    "DD_SITE": "datadoghq.com"
  }
}
```

---

### 17. PostHog
**What it does:** Product analytics, feature flags, session recordings.

```json
"posthog": {
  "command": "npx",
  "args": ["-y", "posthog-mcp-server"],
  "env": {
    "POSTHOG_API_KEY": "phx_...",
    "POSTHOG_HOST": "https://app.posthog.com"
  }
}
```

---

## 📋 Project Management

### 18. Linear
**What it does:** Create issues, update status, query projects, manage sprints.

```json
"linear": {
  "command": "npx",
  "args": ["-y", "@linear/mcp-server"],
  "env": { "LINEAR_API_KEY": "lin_api_..." }
}
```

---

### 19. Notion
**What it does:** Read/write Notion pages, query databases, create and update content.

```json
"notion": {
  "command": "npx",
  "args": ["-y", "@notionhq/notion-mcp-server"],
  "env": { "NOTION_API_KEY": "secret_..." }
}
```

---

### 20. Jira
**What it does:** Query issues, create tickets, update sprints, manage projects in Jira.

```json
"jira": {
  "command": "npx",
  "args": ["-y", "@sooperset/mcp-atlassian"],
  "env": {
    "CONFLUENCE_URL": "https://your-domain.atlassian.net/wiki",
    "CONFLUENCE_USERNAME": "you@email.com",
    "CONFLUENCE_API_TOKEN": "...",
    "JIRA_URL": "https://your-domain.atlassian.net",
    "JIRA_USERNAME": "you@email.com",
    "JIRA_API_TOKEN": "..."
  }
}
```

---

### 21. Asana
**What it does:** Manage tasks, projects, teams and timelines in Asana.

```json
"asana": {
  "command": "npx",
  "args": ["-y", "asana-mcp-server"],
  "env": { "ASANA_ACCESS_TOKEN": "..." }
}
```

---

## 💬 Communication

### 22. Slack
**What it does:** Read channels, search messages, post updates, manage workspace.

```json
"slack": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-slack"],
  "env": {
    "SLACK_BOT_TOKEN": "xoxb-...",
    "SLACK_TEAM_ID": "T..."
  }
}
```

---

### 23. Gmail
**What it does:** Search, read, send, and reply to emails.

```json
"gmail": {
  "command": "npx",
  "args": ["-y", "gmail-mcp-server"],
  "env": {
    "GMAIL_CLIENT_ID": "...",
    "GMAIL_CLIENT_SECRET": "...",
    "GMAIL_REFRESH_TOKEN": "..."
  }
}
```

---

## 🔍 Search & Research

### 24. Brave Search
**What it does:** Web search without tracking. Free tier available (2,000 queries/month).

```json
"brave-search": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-brave-search"],
  "env": { "BRAVE_API_KEY": "BSA..." }
}
```

---

### 25. Firecrawl
**What it does:** Scrape any website into clean markdown — JavaScript-rendered pages included.

```json
"firecrawl": {
  "command": "npx",
  "args": ["-y", "firecrawl-mcp"],
  "env": { "FIRECRAWL_API_KEY": "fc-..." }
}
```

---

### 26. Exa
**What it does:** Neural web search — semantic search across the web.

```json
"exa": {
  "command": "npx",
  "args": ["-y", "exa-mcp-server"],
  "env": { "EXA_API_KEY": "..." }
}
```

---

### 27. Tavily
**What it does:** AI-optimised search designed for RAG and AI agents.

```json
"tavily": {
  "command": "npx",
  "args": ["-y", "tavily-mcp-server"],
  "env": { "TAVILY_API_KEY": "tvly-..." }
}
```

---

## ☁️ Cloud & Infrastructure

### 28. AWS
**What it does:** Query AWS resources, manage services, run CLI operations.

```json
"aws": {
  "command": "npx",
  "args": ["-y", "@aws/aws-mcp-server"],
  "env": {
    "AWS_ACCESS_KEY_ID": "AKIA...",
    "AWS_SECRET_ACCESS_KEY": "...",
    "AWS_DEFAULT_REGION": "us-east-1"
  }
}
```

---

### 29. Cloudflare
**What it does:** Manage Workers, KV, D1, R2, DNS, and Pages from Claude Code.

```json
"cloudflare": {
  "command": "npx",
  "args": ["-y", "@cloudflare/mcp-server-cloudflare"],
  "env": { "CLOUDFLARE_API_TOKEN": "..." }
}
```

---

### 30. Vercel
**What it does:** Deploy projects, manage domains, view logs, and control Vercel from Claude Code.

```json
"vercel": {
  "command": "npx",
  "args": ["-y", "@vercel/mcp-server"],
  "env": { "VERCEL_TOKEN": "..." }
}
```

---

### 31. Kubernetes
**What it does:** Manage pods, deployments, services, and namespaces in a Kubernetes cluster.

```json
"kubernetes": {
  "command": "npx",
  "args": ["-y", "mcp-server-kubernetes"]
}
```
Uses your existing `~/.kube/config` credentials.

---

### 32. Terraform
**What it does:** Run Terraform plans, applies, and state management from Claude Code.

```json
"terraform": {
  "command": "npx",
  "args": ["-y", "terraform-mcp-server"]
}
```

---

## 📁 Productivity & Content

### 33. Google Drive
**What it does:** Search, read, create, and manage Google Drive files.

```json
"gdrive": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-gdrive"],
  "env": { "GDRIVE_CREDENTIALS_PATH": "/path/to/credentials.json" }
}
```

---

### 34. Google Calendar
**What it does:** Read and create calendar events, manage schedules.

```json
"gcal": {
  "command": "npx",
  "args": ["-y", "google-calendar-mcp"],
  "env": { "GOOGLE_CREDENTIALS": "/path/to/credentials.json" }
}
```

---

### 35. Google Sheets
**What it does:** Read and write Google Sheets — great for reporting and data pipelines.

```json
"gsheets": {
  "command": "npx",
  "args": ["-y", "google-sheets-mcp"],
  "env": { "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/credentials.json" }
}
```

---

### 36. Airtable
**What it does:** Read/write Airtable bases — use as a lightweight database or CMS.

```json
"airtable": {
  "command": "npx",
  "args": ["-y", "airtable-mcp-server"],
  "env": { "AIRTABLE_API_KEY": "pat..." }
}
```

---

### 37. Obsidian
**What it does:** Read and write Obsidian vault notes — your second brain connected to Claude.

```json
"obsidian": {
  "command": "npx",
  "args": ["-y", "mcp-obsidian"],
  "env": { "OBSIDIAN_VAULT_PATH": "/path/to/your/vault" }
}
```

---

### 38. WordPress
**What it does:** Create posts, manage pages, handle media in a WordPress site.

```json
"wordpress": {
  "command": "npx",
  "args": ["-y", "wordpress-mcp"],
  "env": {
    "WORDPRESS_URL": "https://yoursite.com",
    "WORDPRESS_USERNAME": "admin",
    "WORDPRESS_APP_PASSWORD": "..."
  }
}
```

---

## 🔔 Notifications

### 39. ntfy (Mobile Push)
**What it does:** Send push notifications to your phone from agent flows.

```json
"ntfy": {
  "command": "npx",
  "args": ["-y", "ntfy-mcp-server"],
  "env": {
    "NTFY_TOPIC": "your-unique-topic",
    "NTFY_SERVER": "https://ntfy.sh"
  }
}
```

---

### 40. Zapier
**What it does:** Trigger 7,000+ Zapier automations from Claude Code.

```json
"zapier": {
  "command": "npx",
  "args": ["-y", "@zapier/mcp"],
  "env": { "ZAPIER_MCP_API_KEY": "..." }
}
```

---

## 🧠 AI & Data

### 41. Sequential Thinking
**What it does:** Forces Claude to think step-by-step with explicit reasoning chains before answering.

```json
"sequential-thinking": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
}
```

---

### 42. HubSpot
**What it does:** CRM automation — contacts, companies, deals, tickets, notes.

```json
"hubspot": {
  "command": "npx",
  "args": ["-y", "@hubspot/mcp-server"],
  "env": { "HUBSPOT_ACCESS_TOKEN": "pat-..." }
}
```

---

### 43. Snowflake
**What it does:** Query Snowflake data warehouse, manage databases and schemas.

```json
"snowflake": {
  "command": "npx",
  "args": ["-y", "snowflake-mcp"],
  "env": {
    "SNOWFLAKE_ACCOUNT": "your-account",
    "SNOWFLAKE_USER": "username",
    "SNOWFLAKE_PASSWORD": "password",
    "SNOWFLAKE_DATABASE": "MY_DB",
    "SNOWFLAKE_WAREHOUSE": "COMPUTE_WH"
  }
}
```

---

### 44. dbt
**What it does:** Run dbt models, tests, and explore documentation from Claude Code.

```json
"dbt": {
  "command": "npx",
  "args": ["-y", "dbt-mcp-server"],
  "env": { "DBT_PROJECT_DIR": "/path/to/dbt/project" }
}
```

---

### 45. Fetch (HTTP Requests)
**What it does:** Make HTTP requests to any URL — fetch web pages, call REST APIs.

```json
"fetch": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-fetch"]
}
```

---

### 46. Excalidraw
**What it does:** Generate architecture diagrams and sketches.

```json
"excalidraw": {
  "command": "npx",
  "args": ["-y", "excalidraw-mcp-server"]
}
```

---

### 47. Puppeteer
**What it does:** Browser automation alternative to Playwright — navigate, click, scrape.

```json
"puppeteer": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-puppeteer"],
  "env": { "PUPPETEER_HEADLESS": "true" }
}
```

---

### 48. Desktop Commander
**What it does:** Execute terminal commands, manage files, and control the desktop.

```json
"desktop-commander": {
  "command": "npx",
  "args": ["-y", "@wonderwhy-er/desktop-commander"]
}
```

---

### 49. Figma
**What it does:** Read designs, extract components, inspect styles from Figma files.

```json
"figma": {
  "command": "npx",
  "args": ["-y", "figma-mcp"],
  "env": { "FIGMA_TOKEN": "figd_..." }
}
```

---

### 50. Serena (Code Intelligence)
**What it does:** Symbolic code understanding — find functions, trace calls, semantic code search.

```json
"serena": {
  "command": "npx",
  "args": ["-y", "serena-mcp"]
}
```

---

## Quick-Start Bundles

### Indie SaaS Builder (5 servers)
```json
{
  "mcpServers": {
    "github": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"], "env": {"GITHUB_PERSONAL_ACCESS_TOKEN": "..."} },
    "memory": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-memory"] },
    "postgres": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"] },
    "stripe": { "command": "npx", "args": ["-y", "@stripe/agent-toolkit"], "env": {"STRIPE_SECRET_KEY": "sk_test_..."} },
    "brave-search": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-brave-search"], "env": {"BRAVE_API_KEY": "..."} }
  }
}
```

### Full-Stack Developer (10 servers)
Add to the Indie SaaS bundle: `context7`, `sentry`, `playwright`, `linear`, `slack`

### Data & Analytics (5 servers)
`postgres` + `snowflake` + `grafana` + `firecrawl` + `fetch`

### Content & Marketing (5 servers)
`notion` + `wordpress` + `gmail` + `google-sheets` + `brave-search`

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
