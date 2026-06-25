import { useState, useEffect } from "react";
import { Eyebrow, Card, YellowButton } from "./ui";

interface LearnedSkill {
  name: string;
  category: string;
  description: string;
  rules: string[];
  markdownTemplate: string;
}

const SAMPLE_INPUTS = [
  {
    label: "SQLite MCP Configuration Example",
    category: "database",
    text: `sqlite-server:
  command: npx
  args:
    - -y
    - @modelcontextprotocol/server-sqlite
    - --db
    - /path/to/shared.db`,
  },
  {
    label: "Next.js 15 Partial Prerendering rule",
    category: "frontend",
    text: `Ensure all Next.js 15 routes inside app directory default to dynamic dynamicParams = true unless experimental PPR config is explicitly flagged in next.config.ts file.`,
  },
];

export function LearnEngineApp() {
  const [selectedSample, setSelectedSample] = useState(SAMPLE_INPUTS[0]);
  const [customText, setCustomText] = useState("");
  const [skillCategory, setSkillCategory] = useState("database");
  const [skillName, setSkillName] = useState("SQLite MCP Setup");

  const [isCompiling, setIsCompiling] = useState(false);
  const [compileLogs, setCompileLogs] = useState<string[]>([]);
  const [createdSkill, setCreatedSkill] = useState<LearnedSkill | null>(null);

  const handleLearn = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCompiling) return;

    setIsCompiling(true);
    setCreatedSkill(null);
    setCompileLogs([
      "[LEARN] Initializing Learn-Anything Engine pipeline...",
      `[INPUT] Ingesting parameters for category: ${skillCategory}`,
      "[AST] Parsing reference syntax tokens..."
    ]);

    // Update Sidekick Pet
    window.dispatchEvent(new CustomEvent("sidekick_status_change", {
      detail: { status: "thinking", message: "Learning new skill structure..." }
    }));
  };

  useEffect(() => {
    if (!isCompiling) return;

    const timer1 = setTimeout(() => {
      setCompileLogs((prev) => [
        ...prev,
        "[PLANNER] Structuring markdown instructions...",
        "[COMPILER] Writing rules frontmatter matches..."
      ]);
    }, 1500);

    const timer2 = setTimeout(() => {
      const generatedYaml = `---
name: ${skillName || "Custom Learned Skill"}
description: Auto-generated from developer ingested reference guides.
category: ${skillCategory}
rules:
  - Always enforce native stdlib checks.
  - Verify AST imports before outputting edits.
---
# ${skillName || "Custom Learned Skill"}

This skill enables Claude to automatically integrate the following syntax pattern:

\`\`\`yaml
${customText || selectedSample.text}
\`\`\`
`;

      setCreatedSkill({
        name: skillName || "Custom Learned Skill",
        category: skillCategory,
        description: "Auto-generated from developer ingested reference guides.",
        rules: [
          "Always enforce native stdlib checks.",
          "Verify AST imports before outputting edits."
        ],
        markdownTemplate: generatedYaml
      });
      setCompileLogs((prev) => [
        ...prev,
        "[SYSTEM] 🎉 Skill generation complete! Committed to local knowledge memory.",
        "[ORACLE] Syncing Memory Galaxy node links..."
      ]);
      setIsCompiling(false);

      // Celebrate with Sidekick Pet
      window.dispatchEvent(new CustomEvent("sidekick_status_change", {
        detail: { status: "done", message: `Learned: ${skillName || "Custom Skill"}!` }
      }));
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isCompiling]);

  return (
    <div className="h-full flex flex-col md:flex-row gap-5 p-5 overflow-y-auto">
      {/* Left panel: Form parameters */}
      <div className="w-full md:w-80 flex flex-col gap-4 shrink-0">
        <Card className="flex flex-col gap-3">
          <Eyebrow color="#6366f1">Learn-Anything Engine</Eyebrow>
          <h2 className="text-[14px] font-bold text-ink">Skill Creator</h2>

          <form onSubmit={handleLearn} className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-mute uppercase mb-1">Skill Name</label>
              <input
                disabled={isCompiling}
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                placeholder="e.g. SQLite Config server"
                className="w-full text-[12px] border border-hairline rounded-lg px-2.5 py-1.5 outline-none focus:border-indigo-500 bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-mute uppercase mb-1">Category</label>
                <select
                  disabled={isCompiling}
                  value={skillCategory}
                  onChange={(e) => setSkillCategory(e.target.value)}
                  className="w-full text-[12px] border border-hairline rounded-lg px-2 py-1 outline-none focus:border-indigo-500 bg-white"
                >
                  <option value="database">Database</option>
                  <option value="frontend">Frontend</option>
                  <option value="devops">DevOps</option>
                  <option value="security">Security</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-mute uppercase mb-1">Preset Samples</label>
                <select
                  disabled={isCompiling}
                  onChange={(e) => {
                    const sample = SAMPLE_INPUTS[Number(e.target.value)];
                    setSelectedSample(sample);
                    setSkillName(sample.label);
                    setSkillCategory(sample.category);
                    setCustomText("");
                  }}
                  className="w-full text-[12px] border border-hairline rounded-lg px-2 py-1 outline-none focus:border-indigo-500 bg-white"
                >
                  {SAMPLE_INPUTS.map((s, i) => (
                    <option key={i} value={i}>{s.label.substring(0, 16)}...</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-mute uppercase mb-1">Source context / Guide code</label>
              <textarea
                disabled={isCompiling}
                value={customText || selectedSample.text}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Paste code examples or command formats here..."
                className="w-full text-[11.5px] border border-hairline rounded-lg p-2 h-32 outline-none focus:border-indigo-500 bg-white font-mono"
              />
            </div>

            <YellowButton 
              disabled={isCompiling}
              className="w-full justify-center bg-indigo-500 border-indigo-700 text-white hover:brightness-[1.05]"
            >
              {isCompiling ? "Compiling Skill..." : "Create Skill File 🎓"}
            </YellowButton>
          </form>
        </Card>
      </div>

      {/* Right panel: outputs and compiled template */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Progress logs */}
        <Card className="bg-slate-900 border-none text-slate-100 p-4 font-mono text-[11.5px] h-[140px] overflow-y-auto shrink-0">
          <h4 className="text-[11px] font-bold text-slate-400 border-b border-slate-800 pb-1.5 mb-2 uppercase tracking-wider">
            🎓 Compilation Logs
          </h4>
          <div className="space-y-1">
            {compileLogs.length === 0 && (
              <div className="text-slate-500 italic">Idle. Ingest a context source block to begin training.</div>
            )}
            {compileLogs.map((log, idx) => (
              <div key={idx} className={log.startsWith("[SYSTEM]") ? "text-emerald-400 font-bold" : "text-indigo-300"}>
                {log}
              </div>
            ))}
          </div>
        </Card>

        {/* Skill card output details */}
        {createdSkill ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[220px]">
            <Card className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-hairline pb-2">
                <h3 className="text-[13px] font-bold text-ink">Ingested Skill Card</h3>
                <Tag color="#10b981">Local Storage Cached</Tag>
              </div>

              <div className="space-y-2 text-[12.5px]">
                <div>
                  <span className="block text-[10px] font-bold text-mute uppercase">Name</span>
                  <span className="font-bold text-ink">{createdSkill.name}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-mute uppercase">Category</span>
                  <span className="font-semibold text-zinc-500 capitalize">{createdSkill.category}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-mute uppercase">Target Agent Rules</span>
                  <ul className="list-disc pl-4 space-y-0.5 text-body">
                    {createdSkill.rules.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="bg-zinc-950 text-zinc-350 p-4 font-mono text-[11.5px] overflow-y-auto">
              <h4 className="text-[11px] font-bold text-zinc-500 border-b border-zinc-900 pb-1.5 mb-2 uppercase tracking-wider">
                Generated Markdown Skill Configuration
              </h4>
              <pre className="text-zinc-100 whitespace-pre-wrap">{createdSkill.markdownTemplate}</pre>
            </Card>
          </div>
        ) : (
          <Card className="flex-1 flex flex-col items-center justify-center text-center text-mute border border-hairline bg-white/50 rounded-xl p-10">
            <span className="text-5xl mb-3">📄</span>
            <h3 className="font-bold text-ink">Skill Ingestion Template Preview</h3>
            <p className="text-[12.5px] mt-1 max-w-sm">
              Press the "Create Skill File" trigger button to draft and compile structured frontmatter rules.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
