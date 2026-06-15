import { useState, useMemo } from "react";
import { Eyebrow, Tag } from "./ui";

interface Guide {
  id: string;
  title: string;
  category: string;
  body: string;
}

const guides: Guide[] = [
  // Getting Started
  { id: "auto-mode", title: "Auto Mode", category: "Getting Started",
    body: "Auto Mode lets Claude Code work autonomously — executing multi-step tasks, creating files, running commands, and committing changes without requiring approval at each step." },
  { id: "auto-mode-guide", title: "Auto Mode (Detailed)", category: "Getting Started",
    body: "Deep dive into Auto Mode configuration, allowed tools, safety controls, and best practices for autonomous sessions." },
  { id: "claude-md-architecture", title: "CLAUDE.md Architecture", category: "Getting Started",
    body: "How CLAUDE.md files structure your project context, agent instructions, and tool configurations for Claude Code." },
  { id: "agents-md", title: "AGENTS.md Format", category: "Getting Started",
    body: "The AGENTS.md specification for defining agent roles, tools, and behaviors in a structured format." },
  { id: "context-management", title: "Context Management", category: "Getting Started",
    body: "Techniques for managing Claude's context window — summarization, priority filtering, and context compression strategies." },
  { id: "cli-reference", title: "CLI Reference", category: "Getting Started",
    body: "Complete reference for the Claude Code CLI — commands, flags, configuration, and environment variables." },

  // Agent Development
  { id: "agent-teams", title: "Agent Teams", category: "Agent Development",
    body: "Orchestrate multiple specialized agents working together. Each agent has its own tools, context, and domain knowledge, coordinated by an orchestrator." },
  { id: "agent-frameworks", title: "Agent Frameworks", category: "Agent Development",
    body: "Overview of agent orchestration frameworks, multi-agent patterns, and coordination strategies for complex workflows." },
  { id: "agent-frontmatter", title: "Agent Frontmatter", category: "Agent Development",
    body: "How to use YAML frontmatter in agent definition files to specify roles, capabilities, and tool permissions." },
  { id: "agent-orchestration", title: "Agent Orchestration", category: "Agent Development",
    body: "Patterns for coordinating multiple agents — supervisor/worker, sequential pipelines, and parallel execution." },
  { id: "agent-sdk-pack", title: "Agent SDK Pack", category: "Agent Development",
    body: "The Claudient Agent SDK — reusable building blocks for creating custom agents with tools, memory, and hooks." },
  { id: "agent-sdk-deep-dive", title: "Agent SDK Deep Dive", category: "Agent Development",
    body: "In-depth exploration of the Agent SDK API — tool definitions, memory interfaces, and event-driven architectures." },

  // Claude Code Features
  { id: "extended-thinking", title: "Extended Thinking", category: "Claude Code Features",
    body: "Extended thinking gives Claude more time to reason through complex problems. Enable it for architecture decisions, debugging, and complex refactoring." },
  { id: "claude-design", title: "Claude Design", category: "Claude Code Features",
    body: "Understanding Claude's design philosophy, interaction patterns, and how to write effective instructions." },
  { id: "claude-design-best-practices", title: "Design Best Practices", category: "Claude Code Features",
    body: "Best practices for structuring prompts, instructions, and project configurations for optimal Claude Code behavior." },
  { id: "claude-design-vs-tools", title: "Design vs Tools", category: "Claude Code Features",
    body: "When to use design patterns vs when to use tool definitions — trade-offs and decision framework." },
  { id: "advanced-tool-use", title: "Advanced Tool Use", category: "Claude Code Features",
    body: "Advanced patterns for tool use — chaining tools, conditional execution, and error handling in multi-tool workflows." },
  { id: "claude-code-new-features", title: "New Features", category: "Claude Code Features",
    body: "Latest Claude Code features, updates, and capabilities as they're released." },
  { id: "claude-cowork", title: "Claude Cowork", category: "Claude Code Features",
    body: "Using Claude as a collaborative coding partner — pair programming, code review, and knowledge sharing patterns." },
  { id: "claude-managed-agents", title: "Managed Agents", category: "Claude Code Features",
    body: "How to use Claude's managed agent capabilities for long-running tasks, background jobs, and automated workflows." },

  // Integrations
  { id: "hooks", title: "Hooks", category: "Integrations",
    body: "Hooks let you run custom logic at key points in Claude's workflow — before/after tool calls, on file changes, on errors, and on session events." },
  { id: "mcp-setup", title: "MCP Server Setup", category: "Integrations",
    body: "Model Context Protocol servers extend Claude's capabilities with external tools. Claudient provides 41 ready-to-use MCP configurations." },
  { id: "computer-use", title: "Computer Use", category: "Integrations",
    body: "Claude's computer use capability — controlling browsers, reading screens, and interacting with desktop applications." },
  { id: "computer-use-guide", title: "Computer Use Guide", category: "Integrations",
    body: "Complete guide to configuring and using computer use — browser automation, GUI interaction, and safety considerations." },

  // Use Cases
  { id: "claude-for-solopreneurs", title: "For Solopreneurs", category: "Use Cases",
    body: "How solo founders and solopreneurs can leverage Claude Code for rapid prototyping, development, and business operations." },
  { id: "claude-for-creators", title: "For Creators", category: "Use Cases",
    body: "Content creators using Claude Code for website building, automation, and creative project management." },
  { id: "claude-for-small-business", title: "For Small Business", category: "Use Cases",
    body: "Small business applications of Claude Code — invoicing, customer management, marketing automation, and operations." },
  { id: "claude-for-ecommerce", title: "For E-Commerce", category: "Use Cases",
    body: "E-commerce operators using Claude for product management, analytics, SEO, and storefront development." },
  { id: "claude-for-local-services", title: "For Local Services", category: "Use Cases",
    body: "Local service businesses leveraging Claude for scheduling, customer communication, and operational efficiency." },
  { id: "claude-for-coaches-consultants", title: "For Coaches & Consultants", category: "Use Cases",
    body: "How coaches and consultants use Claude for client management, content creation, and business automation." },
  { id: "claude-small-business-seo-strategy", title: "SEO Strategy", category: "Use Cases",
    body: "AI-powered SEO strategy for small businesses — keyword research, content optimization, and technical SEO with Claude." },

  // Role-Specific
  { id: "for-cto", title: "For CTO", category: "Role-Specific",
    body: "How CTOs can use Claude for architecture decisions, team management, and strategic technology planning." },
  { id: "for-founder", title: "For Founders", category: "Role-Specific",
    body: "Founder's guide to using Claude — from MVP building to scaling engineering teams." },
  { id: "for-software-engineer", title: "For Software Engineer", category: "Role-Specific",
    body: "Day-to-day development workflows with Claude — coding, debugging, testing, and documentation." },
  { id: "for-product-manager", title: "For Product Manager", category: "Role-Specific",
    body: "How product managers use Claude for requirements, user stories, roadmaps, and stakeholder communication." },
  { id: "for-data-analyst", title: "For Data Analyst", category: "Role-Specific",
    body: "Data analysis workflows with Claude — SQL queries, data visualization, and statistical analysis." },
  { id: "for-devops-engineer", title: "For DevOps Engineer", category: "Role-Specific",
    body: "DevOps automation with Claude — infrastructure as code, CI/CD, monitoring, and incident response." },
  { id: "for-growth-marketer", title: "For Growth Marketer", category: "Role-Specific",
    body: "Growth marketing workflows — analytics, A/B testing, campaign optimization, and attribution." },
  { id: "for-email-marketer", title: "For Email Marketer", category: "Role-Specific",
    body: "Email marketing with Claude — sequence writing, segmentation, deliverability, and analytics." },
  { id: "for-content-marketer", title: "For Content Marketer", category: "Role-Specific",
    body: "Content marketing workflows — research, writing, SEO optimization, and distribution." },
  { id: "for-sdr", title: "For SDR", category: "Role-Specific",
    body: "Sales development workflows — prospecting, outreach, qualification, and pipeline management." },
  { id: "for-finance-analyst", title: "For Finance Analyst", category: "Role-Specific",
    body: "Financial analysis with Claude — modeling, forecasting, variance analysis, and reporting." },
  { id: "for-legal-compliance", title: "For Legal & Compliance", category: "Role-Specific",
    body: "Legal workflows — contract review, compliance checks, regulatory research, and documentation." },
  { id: "for-healthcare-admin", title: "For Healthcare Admin", category: "Role-Specific",
    body: "Healthcare administration with Claude — scheduling, documentation, compliance, and patient communication." },
  { id: "for-real-estate-agent", title: "For Real Estate Agent", category: "Role-Specific",
    body: "Real estate workflows — listing management, client communication, market analysis, and document preparation." },
  { id: "for-educator", title: "For Educator", category: "Role-Specific",
    body: "Education workflows — lesson planning, curriculum development, grading, and student engagement." },
  { id: "for-recruiter", title: "For Recruiter", category: "Role-Specific",
    body: "Recruiting workflows — job descriptions, candidate screening, interview preparation, and pipeline management." },
  { id: "for-executive-assistant", title: "For Executive Assistant", category: "Role-Specific",
    body: "Executive assistant workflows — scheduling, communication, document management, and coordination." },
  { id: "for-investor", title: "For Investor", category: "Role-Specific",
    body: "Investment workflows — due diligence, market research, portfolio analysis, and reporting." },
  { id: "for-freelancer", title: "For Freelancer", category: "Role-Specific",
    body: "Freelancer workflows — project management, invoicing, client communication, and portfolio building." },
  { id: "for-account-executive", title: "For Account Executive", category: "Role-Specific",
    body: "Account executive workflows — deal management, forecasting, customer success, and renewal strategy." },
  { id: "for-technical-writer", title: "For Technical Writer", category: "Role-Specific",
    body: "Technical writing with Claude — documentation, API docs, tutorials, and style guides." },
  { id: "for-operations-manager", title: "For Operations Manager", category: "Role-Specific",
    body: "Operations management workflows — process optimization, resource planning, and reporting." },

  // Advanced
  { id: "deployment-patterns", title: "Deployment Patterns", category: "Advanced",
    body: "Deployment strategies for Claude Code workflows — CI/CD integration, automated releases, and rollback procedures." },
  { id: "decision-framework", title: "Decision Framework", category: "Advanced",
    body: "Framework for making decisions about when to use auto mode, which agents to deploy, and how to structure projects." },
  { id: "context-budget", title: "Context Budget", category: "Advanced",
    body: "Managing context window budget — summarization strategies, context pruning, and efficient token usage." },
  { id: "claude-security", title: "Claude Security", category: "Advanced",
    body: "Security best practices for Claude Code — sandboxing, permissions, data handling, and audit trails." },
  { id: "claude-mythos", title: "Claude Mythos", category: "Advanced",
    body: "Understanding Claude's capabilities, limitations, and the philosophy behind its design." },
  { id: "cross-harness-guide", title: "Cross-Harness Guide", category: "Advanced",
    body: "Working across multiple Claude Code instances — context sharing, agent coordination, and workflow synchronization." },
  { id: "cost-optimisation", title: "Cost Optimization", category: "Advanced",
    body: "Strategies for minimizing token costs while maximizing Claude's output quality and efficiency." },
  { id: "desktop-app", title: "Desktop App", category: "Advanced",
    body: "Using the Claude Code desktop application — installation, configuration, keyboard shortcuts, and workspace management." },
];

const categories = [...new Set(guides.map(g => g.category))];

export function GuidesApp() {
  const [active, setActive] = useState("auto-mode");
  const [search, setSearch] = useState("");

  const filteredGuides = useMemo(() => {
    if (!search.trim()) return guides;
    const q = search.toLowerCase();
    return guides.filter(g => g.title.toLowerCase().includes(q) || g.body.toLowerCase().includes(q));
  }, [search]);

  const filteredCategories = useMemo(() => {
    return categories.filter(cat => filteredGuides.some(g => g.category === cat));
  }, [filteredGuides]);

  const doc = filteredGuides.find(g => g.id === active) ?? filteredGuides[0];
  if (!doc) return <div className="p-6 text-mute text-sm">No guides found.</div>;

  return (
    <div className="h-full flex">
      <aside className="w-52 shrink-0 border-r border-hairline bg-cream flex flex-col overflow-hidden">
        <div className="p-3 pb-2">
          <Eyebrow color="#1078a3">Knowledge Base</Eyebrow>
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setActive(""); }}
            placeholder="Search guides..."
            className="mt-2 w-full rounded-lg border border-hairline bg-white px-2.5 py-1.5 text-[12px] text-ink placeholder:text-mute/60 focus:outline-none focus:ring-1 focus:ring-brand-blue/40"
          />
        </div>
        <div className="flex-1 overflow-auto px-2 pb-2">
          {filteredCategories.map(topic => (
            <div key={topic} className="mt-2 first:mt-0">
              <div className="text-[10px] font-bold text-mute uppercase tracking-wider px-2.5 py-1">{topic}</div>
              <div className="space-y-0.5">
                {filteredGuides.filter(g => g.category === topic).map(g => (
                  <button
                    key={g.id}
                    onClick={() => setActive(g.id)}
                    className={`w-full text-left rounded-md px-2.5 py-1.5 text-[12px] transition ${
                      g.id === active ? "bg-white border border-hairline font-semibold text-brand-teal" : "text-body hover:bg-white/60"
                    }`}
                  >
                    {g.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="px-3 py-2 border-t border-hairline text-[10px] text-mute">
          {guides.length} guides
        </div>
      </aside>

      <article className="flex-1 min-w-0 overflow-auto p-6">
        <Tag color="#1078a3">{doc.category}</Tag>
        <h1 className="mt-2 text-xl font-extrabold text-ink">{doc.title}</h1>
        <p className="mt-3 text-[13px] text-body leading-relaxed max-w-xl">{doc.body}</p>

        <div className="mt-5 rounded-lg border-l-4 border-brand-blue bg-brand-blue/10 px-4 py-3 text-[12px] text-body">
          💡 <strong>Full guide:</strong> Read the complete guide at <code className="bg-white px-1.5 py-0.5 rounded text-[11px] font-mono">guides/{doc.id}.md</code> in the repository.
        </div>
      </article>
    </div>
  );
}
