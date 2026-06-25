import { useState, useEffect, useRef } from "react";
import { Eyebrow, Card, YellowButton, GhostButton } from "./ui";

interface TakeoverStep {
  action: "move" | "click" | "type" | "verify";
  target: string;
  detail: string;
  status: "pending" | "running" | "done";
}

const PRESET_TAKEOVERS = [
  {
    task: "Automate test suite fixes in workspace",
    steps: [
      { action: "move" as const, target: "terminal", detail: "Move cursor to bottom dev panel...", status: "pending" as const },
      { action: "type" as const, target: "command", detail: "Running: npm run test", status: "pending" as const },
      { action: "click" as const, target: "file-tree", detail: "Opening src/auth/utils.ts file", status: "pending" as const },
      { action: "type" as const, target: "editor", detail: "Correcting validation regex mismatch...", status: "pending" as const },
      { action: "verify" as const, target: "terminal", detail: "Re-verifying compiler tests: PASS", status: "pending" as const },
    ],
  },
  {
    task: "Scan repository for credentials leak",
    steps: [
      { action: "move" as const, target: "search", detail: "Open global search panel...", status: "pending" as const },
      { action: "type" as const, target: "search-input", detail: "Searching for regex key patterns...", status: "pending" as const },
      { action: "click" as const, target: "env-file", detail: "Selecting .env config stub", status: "pending" as const },
      { action: "verify" as const, target: "lockfile", detail: "Confirming keys are ignored: SAFE", status: "pending" as const },
    ],
  },
];

export function TakeoverApp() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState<TakeoverStep[]>(PRESET_TAKEOVERS[0].steps);
  const [activeStepIdx, setActiveStepIdx] = useState(-1);
  const [cursorPos, setCursorPos] = useState({ x: 40, y: 40 });
  const [screenText, setScreenText] = useState("System standby. Awaiting script execution...");
  
  const stepTimer = useRef<NodeJS.Timeout | null>(null);

  const startTakeover = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStepIdx(0);
    setScreenText("AOS Takeover engaged. Connecting input driver...");
    setSteps(PRESET_TAKEOVERS[selectedIdx].steps.map(s => ({ ...s, status: "pending" })));

    // Update Sidekick Pet
    window.dispatchEvent(new CustomEvent("sidekick_status_change", {
      detail: { status: "working", message: "Takeover Engine engaged!" }
    }));
  };

  const stopTakeover = () => {
    if (stepTimer.current) clearTimeout(stepTimer.current);
    setIsRunning(false);
    setActiveStepIdx(-1);
    setScreenText("Execution suspended.");
    window.dispatchEvent(new CustomEvent("sidekick_status_change", {
      detail: { status: "idle", message: "Takeover suspended." }
    }));
  };

  useEffect(() => {
    if (!isRunning || activeStepIdx < 0) return;

    if (activeStepIdx >= steps.length) {
      setIsRunning(false);
      setScreenText("🎉 Task completed autonomously. Input driver disengaged.");
      window.dispatchEvent(new CustomEvent("sidekick_status_change", {
        detail: { status: "done", message: "Takeover tasks complete!" }
      }));
      return;
    }

    const currentStep = steps[activeStepIdx];
    
    // Update step status
    setSteps(prev => prev.map((s, idx) => idx === activeStepIdx ? { ...s, status: "running" } : s));
    setScreenText(`[DRIVER] Executing ${currentStep.action.toUpperCase()} on "${currentStep.target}": ${currentStep.detail}`);

    // Update Sidekick Pet with progress details
    window.dispatchEvent(new CustomEvent("sidekick_status_change", {
      detail: { status: "working", message: `Agent: ${currentStep.detail}` }
    }));

    // Animate cursor coordinates based on target
    if (currentStep.target === "terminal") setCursorPos({ x: 80, y: 160 });
    else if (currentStep.target === "file-tree") setCursorPos({ x: 20, y: 60 });
    else if (currentStep.target === "editor") setCursorPos({ x: 120, y: 80 });
    else if (currentStep.target === "search") setCursorPos({ x: 20, y: 30 });
    else if (currentStep.target === "search-input") setCursorPos({ x: 90, y: 30 });

    const timer = setTimeout(() => {
      setSteps(prev => prev.map((s, idx) => idx === activeStepIdx ? { ...s, status: "done" } : s));
      setActiveStepIdx(activeStepIdx + 1);
    }, 2800);

    stepTimer.current = timer;
    return () => clearTimeout(timer);
  }, [isRunning, activeStepIdx]);

  return (
    <div className="h-full flex flex-col md:flex-row gap-5 p-5 overflow-y-auto">
      {/* Left panel: Task parameters */}
      <div className="w-full md:w-80 flex flex-col gap-4 shrink-0">
        <Card className="flex flex-col gap-3">
          <Eyebrow color="#ef4444">Computer Use Engine</Eyebrow>
          <h2 className="text-[14px] font-bold text-ink">Takeover Tasks</h2>

          <div className="space-y-2">
            {PRESET_TAKEOVERS.map((t, idx) => (
              <button
                key={idx}
                disabled={isRunning}
                onClick={() => {
                  setSelectedIdx(idx);
                  setSteps(t.steps);
                }}
                className={`w-full text-left p-3 rounded-xl border text-[12.5px] font-semibold transition ${
                  selectedIdx === idx ? "bg-red-50 border-red-200 text-red-800" : "border-hairline hover:bg-cream"
                }`}
              >
                {t.task}
              </button>
            ))}
          </div>

          <div className="flex gap-2 mt-2 pt-2 border-t border-hairline">
            {!isRunning ? (
              <YellowButton onClick={startTakeover} className="flex-1 justify-center bg-red-500 border-red-700 text-white hover:bg-red-600">
                Start Takeover 🖥️
              </YellowButton>
            ) : (
              <GhostButton onClick={stopTakeover} className="flex-1 justify-center border-red-300 text-red-600">
                Stop Takeover 🛑
              </GhostButton>
            )}
          </div>
        </Card>
      </div>

      {/* Right panel: Virtual screen display */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Virtual Desktop Window */}
        <Card className="flex-1 flex flex-col bg-zinc-900 border-none shadow-xl rounded-2xl relative overflow-hidden min-h-[300px]">
          {/* Window header */}
          <div className="bg-zinc-950 px-4 py-2.5 flex items-center gap-2 border-b border-zinc-800 shrink-0">
            <span className="size-3 rounded-full bg-rose-500" />
            <span className="size-3 rounded-full bg-amber-500" />
            <span className="size-3 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-mono text-zinc-500 ml-2">AOS-Takeover-Screen-Driver.png</span>
          </div>

          {/* Virtual desktop space */}
          <div className="flex-1 p-4 font-mono text-[12px] text-zinc-300 relative select-none">
            {/* Folder structures on left */}
            <div className="space-y-1.5 text-zinc-500 text-[11px] max-w-[80px]">
              <div className="flex items-center gap-1.5">📂 src</div>
              <div className="flex items-center gap-1.5 pl-3">📂 auth</div>
              <div className="flex items-center gap-1.5 pl-6">📄 utils.ts</div>
              <div className="flex items-center gap-1.5">📄 .env</div>
            </div>

            {/* Target cursor mock */}
            <div 
              style={{ left: cursorPos.x, top: cursorPos.y }}
              className="absolute text-xl pointer-events-none transition-all duration-[1500ms] ease-in-out z-30"
            >
              🎯
            </div>

            {/* Subtitles Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/90 border border-zinc-800 p-3 rounded-xl shadow-lg text-[11.5px] leading-relaxed text-zinc-200">
              <span className="block text-[9px] font-bold text-red-500 uppercase tracking-wider mb-1">Input Driver Status</span>
              {screenText}
            </div>
          </div>
        </Card>

        {/* Steps roadmap checklist */}
        <Card className="p-4 space-y-3 shrink-0">
          <h3 className="text-[13px] font-bold text-ink border-b border-hairline pb-1.5">Input Driver Sequence Checklist</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {steps.map((s, idx) => (
              <div 
                key={idx} 
                className={`p-2.5 rounded-lg border text-[11.5px] font-semibold flex flex-col justify-between ${
                  s.status === "done" ? "bg-emerald-50 border-emerald-200 text-emerald-800" :
                  s.status === "running" ? "bg-blue-50 border-blue-200 text-blue-800 ring-1 ring-blue-200" :
                  "bg-zinc-50/50 border-hairline text-mute"
                }`}
              >
                <div>
                  <span className="block text-[9px] uppercase font-mono font-bold">{s.action}</span>
                  <span className="font-bold">{s.target}</span>
                </div>
                <span className="text-[10px] text-mute mt-1.5 block leading-normal">{s.detail.substring(0, 18)}...</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
