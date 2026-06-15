import { useState } from "react";
import { Eyebrow, Tag } from "./ui";

interface AgentCat {
  name: string;
  icon: string;
  desc: string;
  agents: { name: string; role: string }[];
}

const agentCategories: AgentCat[] = [
  { name: "Role Agents", icon: "👤",
    desc: "Domain-specific engineering roles — from Zig engineers to chaos engineers.",
    agents: [
      { name: "Angular Architect", role: "Frontend" },
      { name: "Chaos Engineer", role: "Reliability" },
      { name: "Computer Vision Engineer", role: "ML" },
      { name: "Diagram Generator", role: "Documentation" },
      { name: "DotNet Architect", role: "Backend" },
      { name: "Java Architect", role: "Backend" },
      { name: "ML Platform Engineer", role: "ML Infrastructure" },
      { name: "Prompt Optimizer", role: "AI" },
      { name: "RL Engineer", role: "Reinforcement Learning" },
      { name: "WordPress Master", role: "CMS" },
      { name: "Zig Engineer", role: "Systems" },
    ] },
  { name: "Advisory Agents", icon: "🎓",
    desc: "C-suite and executive advisory agents for strategic decisions.",
    agents: [
      { name: "CEO Advisor", role: "Executive Strategy" },
      { name: "CFO Advisor", role: "Finance" },
      { name: "CAIO Advisor", role: "AI Strategy" },
      { name: "CDO Advisor", role: "Data" },
      { name: "CISO Advisor", role: "Security" },
      { name: "CMO Advisor", role: "Marketing" },
      { name: "COO Advisor", role: "Operations" },
      { name: "CPO Advisor", role: "Product" },
      { name: "CRO Advisor", role: "Revenue" },
      { name: "CTO Advisor", role: "Technology" },
      { name: "Chief of Staff", role: "Strategy" },
      { name: "VPE Advisor", role: "Engineering" },
    ] },
  { name: "Specialist Agents", icon: "🔬",
    desc: "Niche industry experts and specialized consultants.",
    agents: [
      { name: "B2B SaaS Advisor", role: "SaaS" },
      { name: "Brand System Builder", role: "Branding" },
      { name: "DevTools GTM Specialist", role: "GTM" },
      { name: "EdTech Specialist", role: "Education" },
      { name: "InsurTech Specialist", role: "Insurance" },
      { name: "Local Services Specialist", role: "Local Business" },
      { name: "Marketplace Architect", role: "Marketplace" },
      { name: "Performance Auditor", role: "Performance" },
      { name: "PropTech Specialist", role: "Real Estate" },
      { name: "SaaS Pricing Strategist", role: "Pricing" },
      { name: "Small Business Advisor", role: "Small Business" },
      { name: "Vision Analyst", role: "Vision AI" },
    ] },
  { name: "Core Agents", icon: "🧠",
    desc: "Fundamental agents for code review, architecture, and planning.",
    agents: [
      { name: "Architect", role: "System Design" },
      { name: "Code Reviewer", role: "Code Quality" },
      { name: "Planner", role: "Task Planning" },
      { name: "Security Reviewer", role: "Security" },
    ] },
  { name: "SDR Agents", icon: "📞",
    desc: "Sales development agents for prospecting, research, and outreach.",
    agents: [
      { name: "SDR Copywriter", role: "Outreach Writing" },
      { name: "SDR Prospector", role: "Prospecting" },
      { name: "SDR Qualifier", role: "Qualification" },
      { name: "SDR Researcher", role: "Research" },
    ] },
  { name: "Build Resolvers", icon: "🔧",
    desc: "Language-specific build and error resolution agents.",
    agents: [
      { name: "Python Resolver", role: "Python" },
      { name: "TypeScript Resolver", role: "TypeScript" },
    ] },
];

export function AgentsApp() {
  const [active, setActive] = useState(0);
  const cat = agentCategories[active];

  return (
    <div className="h-full flex flex-col sm:flex-row">
      <aside className="sm:w-56 shrink-0 border-r border-hairline bg-cream flex flex-col overflow-hidden">
        <div className="p-3">
          <Eyebrow color="#b62ad9">Specialist Agents</Eyebrow>
        </div>
        <div className="flex-1 overflow-auto px-2 pb-2 space-y-0.5">
          {agentCategories.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setActive(i)}
              className={`w-full text-left flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold transition ${
                i === active ? "bg-white border border-hairline text-ink" : "text-body hover:bg-white/60"
              }`}
            >
              <span>{c.icon}</span>
              <span className="flex-1 truncate">{c.name}</span>
              <span className="text-[10px] text-mute">{c.agents.length}</span>
            </button>
          ))}
        </div>
        <div className="px-3 py-2 border-t border-hairline text-[10px] text-mute">
          {agentCategories.reduce((sum, c) => sum + c.agents.length, 0)} agents total
        </div>
      </aside>

      <div className="flex-1 min-w-0 overflow-auto p-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{cat.icon}</span>
          <h1 className="text-xl font-extrabold text-ink">{cat.name}</h1>
          <Tag color="#b62ad9">{cat.agents.length} agents</Tag>
        </div>
        <p className="mt-2 text-[13px] text-body max-w-lg">{cat.desc}</p>

        <div className="mt-4 grid sm:grid-cols-2 gap-2.5">
          {cat.agents.map((a) => (
            <div key={a.name} className="rounded-xl border border-hairline bg-white p-3.5 flex items-center gap-3 hover:border-brand-purple/40 transition">
              <div className="grid place-items-center size-9 rounded-lg text-lg bg-accent-purple/10 shrink-0">🤖</div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-bold text-ink">{a.name}</div>
                <div className="text-[11px] text-mute">{a.role}</div>
              </div>
              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold text-brand-purple bg-brand-purple/10">Ready</span>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-lg border-l-4 border-brand-purple bg-brand-purple/10 px-4 py-3 text-[12px] text-body">
          💡 <strong>Note:</strong> The repository contains {agentCategories.reduce((sum, c) => sum + c.agents.length, 0)}+ agents across {agentCategories.length} categories. These are the most-used ones.
        </div>
      </div>
    </div>
  );
}
