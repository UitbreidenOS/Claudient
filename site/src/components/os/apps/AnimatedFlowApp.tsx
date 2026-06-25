import { useState, useEffect } from "react";
import { Eyebrow, Card } from "./ui";

interface FlowStep {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: "idle" | "active" | "success" | "failure";
  logs: string[];
}

interface FlowPreset {
  id: string;
  name: string;
  description: string;
  steps: FlowStep[];
}

const PRESETS: FlowPreset[] = [
  {
    id: "eng",
    name: "Autonomous Engineering Loop",
    description: "Witness how the agent consumes a ticket, plans, writes code, checks builds, lints, and self-corrects.",
    steps: [
      {
        id: "step1",
        name: "Ticket Ingest",
        icon: "🎫",
        description: "Parse requirements, verify issue description, and set target state.",
        status: "idle",
        logs: ["Parsing task definition...", "Workspace environment status check: PASS"]
      },
      {
        id: "step2",
        name: "Planner Route",
        icon: "🧭",
        description: "Analyze codebase, map dependencies, and draft step-by-step execution plan.",
        status: "idle",
        logs: ["Running rip-grep search across workspace...", "Generating optimal plan DAG"]
      },
      {
        id: "step3",
        name: "Code Edit",
        icon: "✍️",
        description: "Invoke subagents with precise file write & replace ranges.",
        status: "idle",
        logs: ["Applying replace_file_content chunk...", "Saving file buffers"]
      },
      {
        id: "step4",
        name: "Verify & Lint",
        icon: "🧪",
        description: "Execute compiler and linter commands. Auto-catch failures.",
        status: "idle",
        logs: ["Running: npm run build...", "Build failed: SyntaxError on line 12. Retrying..."]
      },
      {
        id: "step5",
        name: "Commit & Close",
        icon: "💾",
        description: "Commit modified files with clean semantic commit message and push.",
        status: "idle",
        logs: ["Build succeeded!", "Running git commit -m 'feat: implement Feature X'"]
      }
    ]
  },
  {
    id: "lead",
    name: "Lead Qualification Pipeline",
    description: "Automated prospecting, personalization, and outbound pipeline.",
    steps: [
      {
        id: "lead1",
        name: "Source Query",
        icon: "🔍",
        description: "Scrape directories, APIs, or database records matching parameters.",
        status: "idle",
        logs: ["Querying professional nodes...", "Found 24 targets matching criteria"]
      },
      {
        id: "lead2",
        name: "Persona Filter",
        icon: "🎭",
        description: "Verify titles, company sizes, and industries against target profile.",
        status: "idle",
        logs: ["Validating ICP profiles...", "18 targets matching ideal persona profile"]
      },
      {
        id: "lead3",
        name: "Context Scraper",
        icon: "📄",
        description: "Pull target website metadata, news, and posts for customized hooks.",
        status: "idle",
        logs: ["Ingesting latest press releases...", "Key context: Launching new API product"]
      },
      {
        id: "lead4",
        name: "Draft Outreach",
        icon: "✍️",
        description: "Generate highly tailored messages with strict hallucination limits.",
        status: "idle",
        logs: ["Drafting hyper-customized intro hook...", "Temperature limit enforcement: OK"]
      },
      {
        id: "lead5",
        name: "Queue Delivery",
        icon: "📨",
        description: "Send directly to outbound sender queue or CRM integration.",
        status: "idle",
        logs: ["Pushing draft to HubSpot draft folders...", "Pipeline completed successfully!"]
      }
    ]
  }
];

export function AnimatedFlowApp() {
  const [activePresetId, setActivePresetId] = useState<string>("eng");
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([]);

  const activePreset = PRESETS.find(p => p.id === activePresetId) || PRESETS[0];

  useEffect(() => {
    setCurrentStepIdx(0);
    setSimulatedLogs(activePreset.steps[0].logs);
  }, [activePresetId]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStepIdx((prev) => {
        const next = (prev + 1) % activePreset.steps.length;
        // Append logs for the incoming step
        setSimulatedLogs((old) => [
          ...old,
          `>>> Entering Step: ${activePreset.steps[next].name}`,
          ...activePreset.steps[next].logs
        ].slice(-30)); // Cap logs

        // Dispatch status update for sidekick pet
        window.dispatchEvent(new CustomEvent("sidekick_status_change", {
          detail: {
            status: next === activePreset.steps.length - 1 ? "happy" : "working",
            message: `Simulating flow: ${activePreset.steps[next].name}`
          }
        }));

        return next;
      });
    }, 3200);

    return () => clearInterval(interval);
  }, [isPlaying, activePreset]);

  return (
    <div className="h-full flex flex-col p-5 overflow-y-auto space-y-4">
      {/* Header */}
      <div className="border-b border-hairline pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🧬</span>
          <div>
            <Eyebrow color="#3b82f6">Interactive Simulation</Eyebrow>
            <h1 className="text-xl font-extrabold text-ink">Ecosystem Flow Diagrams</h1>
          </div>
        </div>

        {/* Preset Selector & Controls */}
        <div className="flex items-center gap-2">
          <div className="flex bg-zinc-100 rounded-lg p-0.5 border border-hairline">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setActivePresetId(preset.id)}
                className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition ${
                  activePresetId === preset.id
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-mute hover:text-ink"
                }`}
              >
                {preset.name.split(" ")[0]}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded-lg border transition ${
              isPlaying
                ? "bg-blue-50 border-blue-200 text-blue-600"
                : "bg-white border-hairline text-mute hover:text-ink"
            }`}
            title={isPlaying ? "Pause simulation" : "Play simulation"}
          >
            {isPlaying ? "⏸️ Pause" : "▶️ Play"}
          </button>
        </div>
      </div>

      <p className="text-[12px] text-mute leading-relaxed max-w-2xl">
        {activePreset.description}
      </p>

      {/* Main Flow Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 items-stretch">
        
        {/* Step Flowchart Cards */}
        <div className="lg:col-span-2 space-y-3 flex flex-col justify-center">
          {activePreset.steps.map((step, idx) => {
            const isActive = idx === currentStepIdx;
            const isCompleted = idx < currentStepIdx;
            
            return (
              <div key={step.id} className="relative flex items-stretch">
                {/* Connector line */}
                {idx < activePreset.steps.length - 1 && (
                  <div className="absolute left-[23px] top-10 bottom-[-20px] w-0.5 bg-zinc-200 z-0">
                    <div 
                      className={`h-full bg-blue-500 transition-all duration-1000 origin-top ${
                        isCompleted ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                  </div>
                )}

                {/* Left side node */}
                <div className="flex flex-col items-center mr-4 shrink-0 z-10">
                  <div
                    className={`size-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isActive
                        ? "bg-blue-500 border-blue-600 text-white scale-110 shadow-lg shadow-blue-500/20 ring-4 ring-blue-500/10"
                        : isCompleted
                        ? "bg-emerald-500 border-emerald-600 text-white"
                        : "bg-white border-hairline text-mute"
                    }`}
                  >
                    <span className="text-[18px]">{step.icon}</span>
                  </div>
                </div>

                {/* Right side content card */}
                <Card
                  className={`flex-1 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "border-blue-500/80 bg-gradient-to-r from-blue-50/20 to-white shadow-sm ring-1 ring-blue-500/30"
                      : "border-hairline hover:border-zinc-300"
                  }`}
                  onClick={() => {
                    setCurrentStepIdx(idx);
                    setSimulatedLogs((old) => [...old, `Manual inspect: ${step.name}`]);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`text-[13px] font-bold ${isActive ? "text-blue-600" : "text-ink"}`}>
                        Step {idx + 1}: {step.name}
                      </h3>
                      <p className="text-[11.5px] text-mute mt-1 leading-normal">{step.description}</p>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive 
                        ? "bg-blue-100 text-blue-700 animate-pulse" 
                        : isCompleted 
                        ? "bg-emerald-100 text-emerald-700" 
                        : "bg-zinc-100 text-zinc-500"
                    }`}>
                      {isActive ? "Active" : isCompleted ? "Green" : "Pending"}
                    </span>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Live Simulator Console Log */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col overflow-hidden text-zinc-300 font-mono text-[11px] h-[360px] lg:h-auto">
          <div className="bg-zinc-800/80 border-b border-zinc-700 px-4 py-2.5 flex justify-between items-center shrink-0">
            <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400">Simulator Output</span>
            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
          </div>

          <div className="p-4 flex-1 overflow-y-auto space-y-1.5 flex flex-col justify-end">
            {simulatedLogs.map((log, index) => (
              <div 
                key={index}
                className={log.startsWith(">>>") ? "text-blue-400 font-bold mt-1" : log.includes("failed") ? "text-red-400" : "text-zinc-400"}
              >
                {log.startsWith(">>>") ? "" : "$ "} {log}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
