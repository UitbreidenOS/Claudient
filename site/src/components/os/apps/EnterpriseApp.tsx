import { useState } from "react";
import { Eyebrow, Tag } from "./ui";

interface ComplianceFramework {
  id: string;
  name: string;
  icon: string;
  color: string;
  desc: string;
  controls: { name: string; status: "implemented" | "partial" | "planned" }[];
  evidence: string;
  cli: string;
}

const FRAMEWORKS: ComplianceFramework[] = [
  {
    id: "soc2",
    name: "SOC2 Type II",
    icon: "🔒",
    color: "#1d4aff",
    desc: "Service Organization Control 2 — security, availability, processing integrity, confidentiality, and privacy.",
    evidence: "~/.claude/audit-logs/",
    cli: "claudient audit --framework soc2",
    controls: [
      { name: "Access Control (CC6.1)", status: "implemented" },
      { name: "Encryption at Rest (CC6.7)", status: "implemented" },
      { name: "Audit Trail (CC7.2)", status: "implemented" },
      { name: "Change Management (CC8.1)", status: "implemented" },
      { name: "Incident Response (CC7.3)", status: "implemented" },
      { name: "MFA Enforcement", status: "implemented" },
      { name: "Session Timeout", status: "implemented" },
      { name: "Vendor Risk Assessment", status: "partial" },
    ],
  },
  {
    id: "gdpr",
    name: "GDPR",
    icon: "🇪🇺",
    color: "#3fb950",
    desc: "General Data Protection Regulation — data minimization, consent management, right to erasure, and breach notification.",
    evidence: "~/.claude/gdpr-consent.jsonl",
    cli: "claudient audit --framework gdpr",
    controls: [
      { name: "Data Minimization (Art.5)", status: "implemented" },
      { name: "Consent Management (Art.7)", status: "implemented" },
      { name: "Right to Erasure (Art.17)", status: "implemented" },
      { name: "Data Portability (Art.20)", status: "partial" },
      { name: "Breach Notification (Art.33)", status: "implemented" },
      { name: "PII Scanning in Skills", status: "implemented" },
      { name: "Data Retention Policies", status: "implemented" },
      { name: "Cross-Border Transfer", status: "planned" },
    ],
  },
  {
    id: "eu-ai-act",
    name: "EU AI Act",
    icon: "🤖",
    color: "#b62ad9",
    desc: "EU Artificial Intelligence Act — transparency, risk classification, human oversight, and model documentation.",
    evidence: "~/.claude/eu-ai-risk-log.jsonl",
    cli: "claudient audit --framework eu-ai-act",
    controls: [
      { name: "Risk Classification (Art.6)", status: "implemented" },
      { name: "Transparency Logs (Art.13)", status: "implemented" },
      { name: "Human Oversight (Art.14)", status: "implemented" },
      { name: "Data Governance (Art.10)", status: "implemented" },
      { name: "Model Cards & Documentation", status: "implemented" },
      { name: "Bias Auditing", status: "partial" },
      { name: "Conformity Assessment", status: "partial" },
      { name: "Post-Market Monitoring", status: "planned" },
    ],
  },
];

const ENTERPRISE_FEATURES = [
  { icon: "🔐", name: "SSO (SAML 2.0)", desc: "Okta, Azure AD, Google Workspace integration. MFA enforcement + session management." },
  { icon: "👥", name: "RBAC", desc: "4 roles: admin, developer, auditor, viewer. Granular permission scoping." },
  { icon: "📋", name: "Audit Trails", desc: "Append-only, 7-year retention. Every action logged with timestamp + user context." },
  { icon: "🛡️", name: "PII Scanning", desc: "6 built-in patterns + custom regex. Scans skills, prompts, and outputs for personal data." },
  { icon: "💰", name: "Cost Governance", desc: "Per-team daily spend caps ($500 default). Automatic alerts at 80% threshold." },
  { icon: "🏗️", name: "Air-Gap Deploy", desc: "Self-hosted or VPC deployment. No outbound network required." },
  { icon: "🔒", name: "Encryption", desc: "AES-256 at rest, TLS 1.3 in transit. Customer-managed encryption keys (CMEK)." },
  { icon: "📊", name: "Compliance Reports", desc: "Monthly automated reports. SOC2 evidence bundles, GDPR logs, AI Act risk assessments." },
];

const SETTINGS_TEMPLATES = [
  { name: "Enterprise", file: "enterprise.json", desc: "Full governance with audit, compliance, and RBAC." },
  { name: "Security Hardened", file: "security-hardened.json", desc: "Maximum security: PII scanning, block dangerous, cost caps." },
  { name: "Team", file: "team.json", desc: "Shared settings for 5-50 person engineering teams." },
  { name: "Solo Dev", file: "solo-dev.json", desc: "Lightweight config for individual developers." },
  { name: "Minimal", file: "minimal.json", desc: "Bare minimum — just CLAUDE.md + core hooks." },
];

type Tab = "frameworks" | "features" | "settings";

export function EnterpriseApp() {
  const [tab, setTab] = useState<Tab>("frameworks");
  const [selected, setSelected] = useState(FRAMEWORKS[0]);

  const statusIcon = (s: string) =>
    s === "implemented" ? "✅" : s === "partial" ? "🟡" : "⬜";

  return (
    <div className="h-full flex flex-col sm:flex-row">
      {/* Left sidebar */}
      <aside className="sm:w-52 shrink-0 border-r border-hairline bg-cream flex flex-col overflow-hidden">
        <div className="p-3">
          <Eyebrow color="#1d4aff">Enterprise</Eyebrow>
        </div>
        <div className="px-2 pb-2 space-y-0.5">
          {(["frameworks", "features", "settings"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`w-full text-left rounded-lg px-2.5 py-2 text-[12px] font-semibold transition capitalize ${
                tab === t ? "bg-white border border-hairline text-ink shadow-sm" : "text-body hover:bg-white/60"
              }`}
            >
              {t === "frameworks" ? "🏛️ Compliance" : t === "features" ? "⚙️ Features" : "📋 Settings"}
            </button>
          ))}
        </div>
        {tab === "frameworks" && (
          <div className="flex-1 overflow-auto px-2 pb-2 space-y-0.5">
            {FRAMEWORKS.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelected(f)}
                className={`w-full text-left flex items-center gap-2 rounded-lg px-2.5 py-2 text-[12px] font-semibold transition ${
                  selected.id === f.id ? "bg-white border border-hairline text-ink shadow-sm" : "text-body hover:bg-white/60"
                }`}
              >
                <span>{f.icon}</span>
                <span className="truncate">{f.name}</span>
              </button>
            ))}
          </div>
        )}
        <div className="px-3 py-2.5 border-t border-hairline space-y-1">
          <a
            href="mailto:ceo@uitbreiden.com?subject=Enterprise%20Demo"
            className="block text-center rounded-md bg-brand-blue px-2 py-1.5 text-[10px] font-bold text-white hover:bg-brand-blue/90 transition"
          >
            Book a Demo →
          </a>
        </div>
      </aside>

      {/* Right pane */}
      <div className="flex-1 min-w-0 overflow-auto p-5">
        {tab === "frameworks" && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{selected.icon}</span>
              <div>
                <h2 className="text-lg font-extrabold text-ink">{selected.name}</h2>
                <Tag color={selected.color}>Compliance Framework</Tag>
              </div>
            </div>
            <p className="text-[13px] text-body leading-relaxed mb-4">{selected.desc}</p>

            <div className="mb-4">
              <div className="text-[11px] font-bold text-mute uppercase tracking-wider mb-2">Controls ({selected.controls.length})</div>
              <div className="rounded-xl border border-hairline bg-white overflow-hidden">
                <table className="w-full text-[12px]">
                  <thead className="bg-soft border-b border-hairline">
                    <tr>
                      <th className="text-left px-3 py-2 font-bold text-mute">Control</th>
                      <th className="text-center px-3 py-2 font-bold text-mute w-24">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected.controls.map((c) => (
                      <tr key={c.name} className="border-t border-hairline hover:bg-cream/50">
                        <td className="px-3 py-2 font-semibold text-ink">{c.name}</td>
                        <td className="px-3 py-2 text-center">
                          <span className="text-[12px]">{statusIcon(c.status)}</span>
                          <span className="ml-1 text-[10px] text-mute capitalize">{c.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="rounded-lg border border-hairline bg-white p-3">
                <div className="text-[11px] font-bold text-mute uppercase tracking-wider mb-1">Evidence Location</div>
                <code className="text-[11px] font-mono text-brand-purple">{selected.evidence}</code>
              </div>
              <div className="rounded-lg border border-hairline bg-white p-3">
                <div className="text-[11px] font-bold text-mute uppercase tracking-wider mb-1">Audit Command</div>
                <code className="text-[11px] font-mono text-brand-purple">{selected.cli}</code>
              </div>
            </div>
          </div>
        )}

        {tab === "features" && (
          <div>
            <h2 className="text-lg font-extrabold text-ink mb-1">Enterprise Features</h2>
            <p className="text-[12.5px] text-mute mb-4">Governance, security, and compliance for organizations at scale.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {ENTERPRISE_FEATURES.map((f) => (
                <div key={f.name} className="rounded-xl border border-hairline bg-white p-4 hover:border-brand-blue/40 transition">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg">{f.icon}</span>
                    <span className="text-[13px] font-bold text-ink">{f.name}</span>
                  </div>
                  <p className="text-[11.5px] text-body leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "settings" && (
          <div>
            <h2 className="text-lg font-extrabold text-ink mb-1">Settings Templates</h2>
            <p className="text-[12.5px] text-mute mb-4">Pre-built settings for different team sizes and security profiles.</p>
            <div className="space-y-2">
              {SETTINGS_TEMPLATES.map((s) => (
                <div key={s.file} className="rounded-xl border border-hairline bg-white p-4 hover:border-brand-blue/40 transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[13px] font-bold text-ink">{s.name}</span>
                      <p className="text-[11.5px] text-mute mt-0.5">{s.desc}</p>
                    </div>
                    <code className="text-[10px] font-mono text-brand-purple shrink-0">{s.file}</code>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-hairline bg-cream p-4">
              <div className="text-[11px] font-bold text-mute uppercase tracking-wider mb-1">Install</div>
              <pre className="text-[11px] font-mono text-ink">
                <code>{"cp settings-templates/enterprise.json .claude/settings.json"}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
