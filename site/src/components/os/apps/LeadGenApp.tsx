import { useState, useEffect } from "react";
import { Eyebrow, Card, YellowButton } from "./ui";

interface Lead {
  name: string;
  company: string;
  role: string;
  email: string;
  score: "A+" | "A" | "B" | "C";
  pitchDraft: string;
}

const PRESET_LEADS: Lead[] = [
  {
    name: "Sarah Jenkins",
    company: "SaaSify Inc.",
    role: "VP of Engineering",
    email: "s.jenkins@saasify.io",
    score: "A+",
    pitchDraft: "Hi Sarah,\n\nI noticed SaaSify's engineering team recently scaled past 30 contributors. Given your focus on Next.js 15, I thought you'd appreciate a quick look at how our custom token compactor templates slash baseline Sonnet context costs by 45%. Let me know if you want a quick link to check out the repo.\n\nBest,\n[Your Agent]",
  },
  {
    name: "Marcus Aurelius",
    company: "Roma Cloud Services",
    role: "CTO",
    email: "marcus@roma-cloud.it",
    score: "A",
    pitchDraft: "Hi Marcus,\n\nI came across Roma Cloud's stack detail and saw you support large Python repositories. We compiled standard rules to ignore bloated test coverage bundles for local LLM runs, which saves about 5 minutes per compile iteration. Let me know if you'd like the config stubs.\n\nBest,\n[Your Agent]",
  },
];

const PIPELINE_STEPS = [
  { id: "find", label: "Find Leads 🔎", detail: "Scraping California SaaS profiles..." },
  { id: "enrich", label: "Enrich Data 💎", detail: "Retrieving company size, roles, and emails..." },
  { id: "score", label: "Score Leads 📊", detail: "Grading alignment based on developer stacks..." },
  { id: "draft", label: "Draft Emails ✉️", detail: "Generating context-aware email pitches..." },
];

export function LeadGenApp() {
  const [keyword, setKeyword] = useState("California CTOs in SaaS");
  const [isSearching, setIsSearching] = useState(false);
  const [pipelineIndex, setPipelineIndex] = useState(-1);
  const [logs, setLogs] = useState<string[]>([]);
  const [leads, setLeads] = useState<Lead[]>(PRESET_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(PRESET_LEADS[0]);

  const handleStartPipeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setIsSearching(true);
    setPipelineIndex(0);
    setLogs(["[SYSTEM] Launching Lead Gen Agent Swarm pipeline...", `[QUERY] Niche keyword targeting: "${keyword}"`]);
    setSelectedLead(null);

    // Update Sidekick Pet
    window.dispatchEvent(new CustomEvent("sidekick_status_change", {
      detail: { status: "thinking", message: "Starting Lead Gen pipeline..." }
    }));
  };

  useEffect(() => {
    if (!isSearching || pipelineIndex < 0) return;

    if (pipelineIndex >= PIPELINE_STEPS.length) {
      setIsSearching(false);
      const newLead: Lead = {
        name: "Alex Rivera",
        company: "Stripe-Integration Devs",
        role: "Lead Architect",
        email: "alex.rivera@stripe-devs.com",
        score: "A+",
        pitchDraft: `Hi Alex,\n\nI noticed you specialize in Node-based API design. We just compiled pre-wired SQLite database config stubs that automate AST parsing rules. Thought this might interest Roma Cloud's setup loops. Let me know if you want the details.\n\nBest,\n[Your Agent]`,
      };

      setLeads((prev) => [newLead, ...prev]);
      setSelectedLead(newLead);
      setLogs((prev) => [
        ...prev,
        "[SYSTEM] 🎉 Pipeline complete! Found 1 target lead.",
        "[AGENT] Generated context-aware email draft matching profile bio."
      ]);

      // Celebrate with Sidekick Pet
      window.dispatchEvent(new CustomEvent("sidekick_status_change", {
        detail: { status: "done", message: "Lead pipeline complete!" }
      }));
      return;
    }

    const currentStep = PIPELINE_STEPS[pipelineIndex];
    
    // Update Sidekick Pet with progress details
    window.dispatchEvent(new CustomEvent("sidekick_status_change", {
      detail: { status: "working", message: `LeadGen: ${currentStep.detail}` }
    }));

    const timer = setTimeout(() => {
      setLogs((prev) => [...prev, `[PIPELINE] ${currentStep.label}: ${currentStep.detail}`]);
      setPipelineIndex(pipelineIndex + 1);
    }, 1800);

    return () => clearTimeout(timer);
  }, [isSearching, pipelineIndex]);

  return (
    <div className="h-full flex flex-col md:flex-row gap-5 p-5 overflow-y-auto">
      {/* Left panel: configure parameters */}
      <div className="w-full md:w-80 flex flex-col gap-4 shrink-0">
        <Card className="flex flex-col gap-3">
          <Eyebrow color="#1078a3">Lead Gen Pipeline</Eyebrow>
          <h2 className="text-[14px] font-bold text-ink">Target Niche Parameters</h2>

          <form onSubmit={handleStartPipeline} className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-mute uppercase mb-1">Target Keyword</label>
              <input
                disabled={isSearching}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. CTOs in California fintech"
                className="w-full text-[12px] border border-hairline rounded-lg px-2.5 py-1.5 outline-none focus:border-cyan-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-mute uppercase mb-1">Email copy template template</label>
              <textarea
                disabled={isSearching}
                placeholder="Hi [Name], saw you write [Language] code..."
                className="w-full text-[12px] border border-hairline rounded-lg p-2 h-20 outline-none focus:border-cyan-600 bg-white resize-none"
              />
            </div>
            <YellowButton 
              disabled={isSearching}
              className="w-full justify-center bg-cyan-600 border-cyan-800 text-white hover:brightness-[1.05]"
            >
              {isSearching ? "Crawling Web..." : "Run Lead Gen Pipeline"}
            </YellowButton>
          </form>
        </Card>

        {/* Console logs */}
        <Card className="bg-slate-900 border-none text-slate-100 p-4 font-mono text-[11px] h-[160px] overflow-y-auto">
          <h4 className="text-[11px] font-bold text-slate-400 border-b border-slate-800 pb-1.5 mb-2 uppercase tracking-wider">
            🤖 LeadGen Agent Console
          </h4>
          <div className="space-y-1">
            {logs.length === 0 && (
              <div className="text-slate-500 italic">Console standby. Run pipeline to trace.</div>
            )}
            {logs.map((log, idx) => (
              <div key={idx} className={log.startsWith("[SYSTEM]") ? "text-emerald-400 font-bold" : "text-cyan-300"}>
                {log}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Right panel: pipeline progress and leads catalog */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Progress pipeline steps cards */}
        <Card className="flex flex-col gap-3 relative overflow-hidden bg-slate-50/50 p-4">
          <h3 className="text-[12.5px] font-bold text-ink border-b border-hairline pb-1.5">Ecosystem Pipeline Staging</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1">
            {PIPELINE_STEPS.map((s, idx) => (
              <div 
                key={s.id}
                className={`p-2 rounded-lg border text-[11px] font-semibold transition ${
                  isSearching && pipelineIndex === idx ? "bg-blue-50 border-blue-200 text-blue-800 ring-1 ring-blue-200" :
                  isSearching && pipelineIndex > idx ? "bg-emerald-50 border-emerald-200 text-emerald-800" :
                  "bg-white border-hairline text-mute"
                }`}
              >
                <span className="block font-bold">{s.label}</span>
                <span className="text-[10px] text-mute leading-normal mt-1 block">{s.detail}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Lead profile detail and Email Preview */}
        {selectedLead ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[220px]">
            {/* Target profile card */}
            <Card className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-hairline pb-2">
                <h3 className="text-[13px] font-bold text-ink">Lead Target Profile</h3>
                <span className="text-[10.5px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  Grade Score: {selectedLead.score}
                </span>
              </div>

              <div className="space-y-2 text-[12.5px]">
                <div>
                  <span className="block text-[10px] font-bold text-mute uppercase">Name</span>
                  <span className="font-bold text-ink">{selectedLead.name}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-mute uppercase">Company / Role</span>
                  <span className="font-semibold text-zinc-500">{selectedLead.company} — {selectedLead.role}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-mute uppercase">Email Coordinates</span>
                  <span className="font-semibold text-zinc-500 font-mono text-[11.5px]">{selectedLead.email}</span>
                </div>
              </div>
            </Card>

            {/* Email draft preview container */}
            <Card className="bg-zinc-950 text-zinc-350 p-4 font-mono text-[11.5px] overflow-y-auto">
              <h4 className="text-[11px] font-bold text-zinc-500 border-b border-zinc-900 pb-1.5 mb-2 uppercase tracking-wider">
                Customized Pitch Email Preview
              </h4>
              <pre className="text-zinc-100 whitespace-pre-wrap">{selectedLead.pitchDraft}</pre>
            </Card>
          </div>
        ) : (
          <Card className="flex-1 flex flex-col items-center justify-center text-center text-mute border border-hairline bg-white/50 rounded-xl p-10">
            <span className="text-5xl mb-3">📧</span>
            <h3 className="font-bold text-ink">Lead Result Card Preview</h3>
            <p className="text-[12.5px] mt-1 max-w-sm">
              Launch the pipeline scraper on the left panel to enrich data and draft outreach pitches.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
