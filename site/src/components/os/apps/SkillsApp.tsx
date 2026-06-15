import { useState, useMemo } from "react";
import { Eyebrow, Tag } from "./ui";

interface SkillDef {
  name: string;
  icon: string;
  count: number;
  desc: string;
  skills: string[];
}

const categories: SkillDef[] = [
  { name: "AI Engineering", icon: "🤖", count: 36,
    desc: "Agent construction, memory, teams, tool use, and orchestration patterns.",
    skills: ["Agent SDK", "Agent Composition", "AutoDream", "Channels Streaming", "Claude Batch API", "Context Mode Filtering", "Dispatch Background Jobs", "Managed Agents", "Modal", "Skill Composition"] },
  { name: "Backend", icon: "⚙️", count: 41,
    desc: "API frameworks, server runtimes, authentication, and backend services.",
    skills: ["Astro", "Bun", "Firebase", "Payload CMS", "React Native", "Resend", "Svelte", "Wasp", "FastAPI", "Express.js"] },
  { name: "DevOps & Infra", icon: "🏗️", count: 38,
    desc: "Cloud architecture, containers, CI/CD, observability, and platform engineering.",
    skills: ["AWS Architect", "ArgoCD", "Capacity Planner", "GCP Architect", "Kubernetes", "Northflank", "Observability Designer", "Terraform", "Terragrunt", "Docker"] },
  { name: "GTM / RevOps", icon: "📈", count: 32,
    desc: "Sales development, revenue operations, pipeline management, and expansion plays.",
    skills: ["Champion Builder", "Expansion Playbook", "Mutual Success Plan", "Personalization", "QBR Builder", "Revenue Operations", "SDR Prospecting", "SDR Objection Handler", "CRM Automation"] },
  { name: "Small Business", icon: "🏪", count: 47,
    desc: "Operations, bookkeeping, client management, and marketing for small businesses.",
    skills: ["Agency Operations", "Bookkeeper Practice", "Client Status Report", "Contractor Trades", "Content Repurposer", "Margin Analyzer", "Photography Studio", "Returns Handler"] },
  { name: "Productivity", icon: "⚡", count: 69,
    desc: "Task automation, document processing, debugging, and engineering strategy.",
    skills: ["ADR Writer", "BTW Side Question", "Debug", "Doc Site Builder", "Engineering Strategy", "Lesson Planner", "Tech Debt Tracker", "Valyu"] },
  { name: "Finance", icon: "💰", count: 16,
    desc: "Financial modeling, deal screening, portfolio monitoring, and KYC compliance.",
    skills: ["Budget vs Actual", "Comps Analysis", "DCF Model", "Deal Screening", "Earnings Analysis", "KYC Rules Evaluator", "KYC Screener", "Portfolio Monitor"] },
  { name: "Legal", icon: "⚖️", count: 21,
    desc: "GDPR, SOC2, contract review, legal research, and compliance frameworks.",
    skills: ["Brief Section Drafter", "Cold Start Interview", "Free Law", "GDPR Expert", "Legal Research", "SOC2 Compliance", "Thomson Reuters", "Vendor Contract Review"] },
  { name: "Marketing", icon: "📣", count: 22,
    desc: "SEO, email marketing, social media, brand guidelines, and analytics.",
    skills: ["Analytics Tracking", "Brand Guidelines", "Content Brief", "Email Sequence", "Experiment Tracker", "Page CRO", "Programmatic SEO", "Social Media Manager"] },
  { name: "Product", icon: "📋", count: 15,
    desc: "Product management, UX research, roadmaps, and usability testing.",
    skills: ["Code to PRD", "Product Analytics", "Product Manager Toolkit", "Product Roadmap", "Usability Report", "User Story Writer", "UX Audit", "UX Researcher"] },
  { name: "Data & ML", icon: "🧠", count: 15,
    desc: "Data engineering, machine learning frameworks, and ML pipeline management.",
    skills: ["Dashboard Narrator", "Kafka", "MLflow", "Pandas Polars", "PyTorch TensorFlow", "Reinforcement Learning", "Spark", "SQL"] },
  { name: "Database", icon: "🗄️", count: 12,
    desc: "Database design, ORMs, caching, and vector databases.",
    skills: ["Blockchain", "Drizzle", "Neon", "PostgreSQL", "Prisma", "Redis", "Supabase", "Vector Databases"] },
  { name: "SDR / Sales", icon: "📞", count: 18,
    desc: "Prospecting, cold outreach, qualification, and email strategy.",
    skills: ["Cold Email Sequence", "Company Intelligence", "Email Metrics", "ICP Scoring", "LinkedIn SDR", "MEDDPICC Qualification", "Outreach Categories", "Prospect Research"] },
  { name: "Automation", icon: "🔄", count: 14,
    desc: "Browser automation, IoT, embedded systems, and visual QA.",
    skills: ["Browser", "Claude Design", "Claude Design Branding", "Embedded", "IoT", "Legacy App Automation", "Playwright Pro", "SaaS Scaffolder", "Spec to Repo", "Visual QA"] },
  { name: "Frontend", icon: "🎨", count: 3,
    desc: "Design system extraction, data visualization, and browser testing.",
    skills: ["D3 Data Visualization", "Design System Extraction", "Playwright Browser Testing"] },
  { name: "Git", icon: "🔀", count: 3,
    desc: "PR descriptions, commit writing, and changelog generation.",
    skills: ["Changelog Generator", "Commit Writer", "PR Description"] },
  { name: "Computer Use", icon: "🖥️", count: 4,
    desc: "Browser automation, visual QA, and UI testing.",
    skills: ["Legacy App Automation", "Screenshot Verify", "UI Testing", "Visual QA"] },
  { name: "Finance & Payments", icon: "💳", count: 2,
    desc: "Stripe integration and webhook management.",
    skills: ["Stripe", "Webhooks"] },
];

export function SkillsApp() {
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState("");
  const cat = categories[active];

  const filtered = useMemo(() => {
    if (!search) return cat.skills;
    return cat.skills.filter(s => s.toLowerCase().includes(search.toLowerCase()));
  }, [cat, search]);

  return (
    <div className="h-full flex flex-col sm:flex-row">
      <aside className="sm:w-56 shrink-0 border-r border-hairline bg-cream flex flex-col overflow-hidden">
        <div className="p-3 pb-2">
          <Eyebrow color="#1d4aff">Skills Catalog</Eyebrow>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search skills..."
            className="mt-2 w-full rounded-lg border border-hairline bg-white px-2.5 py-1.5 text-[12px] text-ink placeholder:text-mute/60 focus:outline-none focus:ring-1 focus:ring-brand-blue/40"
          />
        </div>
        <div className="flex-1 overflow-auto px-2 pb-2 space-y-0.5">
          {categories.map((c, i) => (
            <button
              key={c.name}
              onClick={() => { setActive(i); setSearch(""); }}
              className={`w-full text-left flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold transition ${
                i === active ? "bg-white border border-hairline text-ink" : "text-body hover:bg-white/60"
              }`}
            >
              <span>{c.icon}</span>
              <span className="flex-1 truncate">{c.name}</span>
              <span className="text-[10px] text-mute">{c.count}</span>
            </button>
          ))}
        </div>
        <div className="px-3 py-2 border-t border-hairline text-[10px] text-mute">
          {categories.reduce((sum, c) => sum + c.count, 0)} skills in {categories.length} categories
        </div>
      </aside>

      <div className="flex-1 min-w-0 overflow-auto p-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{cat.icon}</span>
          <h1 className="text-xl font-extrabold text-ink">{cat.name}</h1>
          <Tag color="#1d4aff">{cat.count} skills</Tag>
        </div>
        <p className="mt-2 text-[13px] text-body max-w-lg">{cat.desc}</p>

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {filtered.map((s) => (
            <div key={s} className="rounded-lg border border-hairline bg-white px-3.5 py-3 text-[12px] font-medium text-ink hover:border-brand-blue/40 transition">
              <span className="text-brand-teal mr-1.5">&#x25B8;</span> {s}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-8 text-center text-sm text-mute">No skills matching "{search}"</div>
        )}

        <div className="mt-5 rounded-lg border-l-4 border-brand-blue bg-brand-blue/10 px-4 py-3 text-[12px] text-body">
          💡 <strong>Install all {cat.count} skills:</strong> <code className="bg-white px-1.5 py-0.5 rounded text-[11px] font-mono">npx claudient add skills {cat.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}</code>
        </div>
      </div>
    </div>
  );
}
