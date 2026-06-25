import { useState, useEffect, useRef } from "react";
import { Eyebrow, YellowButton, Tag, Card } from "./ui";

interface StackDef {
  id: string;
  name: string;
  icon: string;
  desc: string;
  color: string;
  persona: string;
  skills: { name: string; purpose: string }[];
  cmds: { name: string; desc: string }[];
  hooks: { name: string; desc: string }[];
}

const STACKS: StackDef[] = [
  {
    id: "ai_sdr",
    name: "AI SDR",
    icon: "📞",
    desc: "Prospecting outreach and human-in-the-loop sales development pipeline.",
    color: "#f54e00",
    persona: "You are a senior SDR agent focused on outbound business development, hyper-personalized messaging, and CRM consistency. You do not deploy code, and you never contact opted-out prospects.",
    skills: [
      { name: "lead-scorer", purpose: "Score prospects 0-100 against ideal company profiles." },
      { name: "email-personalizer", purpose: "Draft targeted cold outreach using company trigger signals." },
      { name: "follow-up-scheduler", purpose: "Sequence Day 3/7/14 touchpoints to maximize replies." },
      { name: "crm-logger", purpose: "Safely sync outreach history to CRM without duplicates." }
    ],
    cmds: [
      { name: "/score-lead", desc: "Evaluate a prospect's seniority, company size, and fit." },
      { name: "/prospect-batch", desc: "Grade and queue a list of new inbound leads." },
      { name: "/execute-sequence", desc: "Stage outreach touchpoints pending manual approval." }
    ],
    hooks: [
      { name: "approval-gate", desc: "Stop send actions until a human explicitly reviews the copy." },
      { name: "email-compliance", desc: "Audit drafts for unsubscribe links and sender identity." }
    ]
  },
  {
    id: "fullstack",
    name: "Full-Stack Developer",
    icon: "⚡",
    desc: "End-to-end component engineering, database migrations, and testing.",
    color: "#3fb950",
    persona: "You are a principal fullstack engineer. You enforce rigorous testing, architectural design logging (ADRs), type safety, and clean database schemas.",
    skills: [
      { name: "test-generator", purpose: "Write complete unit and integration tests for new features." },
      { name: "refactoring-recommender", purpose: "Audit files for code duplication, complex nesting, and tech debt." },
      { name: "adr-writer", purpose: "Draft and append Architecture Decision Records to the docs folder." },
      { name: "performance-analyzer", purpose: "Evaluate algorithm complexity, runtime metrics, and database hits." }
    ],
    cmds: [
      { name: "/review-pr", desc: "Audit changed files for unit test coverage and compliance rules." },
      { name: "/generate-tests", desc: "Create unit and integration test stubs for the current module." },
      { name: "/write-adr", desc: "Document a technical design decision with context and consequences." }
    ],
    hooks: [
      { name: "test-coverage-enforcer", desc: "Block execution if code edits drop project test coverage." },
      { name: "shadow-compiler", desc: "Auto-run the project's compiler (tsc, cargo check) after edits." }
    ]
  },
  {
    id: "devops",
    name: "DevOps Platform",
    icon: "🏗️",
    desc: "Infrastructure-as-code, Docker builds, Kubernetes, and logs auditing.",
    color: "#1d4aff",
    persona: "You are a senior site reliability and infrastructure architect. You ensure cost limits are respected, policies are strictly scanned, and downtime risks are mitigated.",
    skills: [
      { name: "iac-reviewer", purpose: "Audit Terraform files for security violations and cost leaks." },
      { name: "incident-runbook-builder", purpose: "Draft response manuals with detailed rollback procedures." },
      { name: "config-auditor", purpose: "Scan configuration states for credentials leaks and policy drifts." }
    ],
    cmds: [
      { name: "/review-iac", desc: "Scan Terraform modules for security and cost compliance." },
      { name: "/build-runbook", desc: "Create a play-by-play incident recovery step sheet." }
    ],
    hooks: [
      { name: "security-policy-check", desc: "Block edits containing plain-text keys or open firewall rules." },
      { name: "resource-limit-validator", desc: "Validate scaling limits and resource quotas before deploys." }
    ]
  }
];

interface TriggerJob {
  id: string;
  name: string;
  cron: string;
  active: boolean;
  desc: string;
}

const DEBATE_PERSONAS = [
  { id: "cto", name: "CTO Advisor", icon: "💻", role: "Architecture, trade-offs, scalability" },
  { id: "sre", name: "SRE Leader", icon: "🛡️", role: "Downtime, error budgets, robustness" },
  { id: "legal", name: "General Counsel", icon: "⚖️", role: "Compliance, licensing, liability" },
  { id: "cfo", name: "CFO Advisor", icon: "📈", role: "SaaS costs, token usage, margins" }
];

function PixelPet({ state }: { state: "idle" | "working" | "debating" | "sleeping" }) {
  return (
    <div className="flex flex-col items-center justify-center p-3 bg-[#1e1e24] text-[#a6accd] rounded-lg border border-hairline font-mono text-xs h-28 relative overflow-hidden select-none">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]" />
      
      {state === "sleeping" && (
        <>
          <div className="absolute top-2 right-4 text-[10px] text-blue-400 animate-bounce">z</div>
          <div className="absolute top-4 right-6 text-[11px] text-blue-400 animate-bounce">Z</div>
          <div className="absolute top-1 right-8 text-[12px] text-blue-400 animate-bounce">Z</div>
        </>
      )}
      
      <div className={`text-base mb-1 ${
        state === "working" ? "animate-spin" :
        state === "debating" ? "animate-bounce" :
        state === "sleeping" ? "opacity-60" :
        "animate-bounce"
      }`}>
        {state === "idle" && "🐱"}
        {state === "working" && "🤖"}
        {state === "debating" && "🐯"}
        {state === "sleeping" && "😴"}
      </div>

      <div className="font-bold text-[10px] text-center whitespace-pre leading-normal font-mono text-cyan-400">
        {state === "idle" && " /\\_/\\ \n( o.o )\n > ^ <"}
        {state === "working" && " /\\_/\\ \n( >.< ) ⚡\n > 💻 <"}
        {state === "debating" && " /\\_/\\ \n( ◣_◢ ) ⚔️\n > ⚔️ <"}
        {state === "sleeping" && " /\\_/\\ \n( -.- )\n > 💤 <"}
      </div>

      <div className="mt-2 text-[9px] uppercase tracking-wider font-extrabold text-mute">
        Pet: <span className={
          state === "working" ? "text-amber-400" :
          state === "debating" ? "text-purple-400" :
          state === "sleeping" ? "text-blue-400" :
          "text-green-400"
        }>{state}</span>
      </div>
    </div>
  );
}

export function SwarmApp() {
  const [activeTab, setActiveTab] = useState<"swarm" | "debate" | "triggers" | "memory" | "metrics">("swarm");
  const [petSleep, setPetSleep] = useState(false);

  // --- SWARM SANDBOX STATE ---
  const [selectedStack, setSelectedStack] = useState<string>("ai_sdr");
  const [objective, setObjective] = useState<string>(
    "Draft a personalized cold email sequence for VP of Engineering at Vercel targeting Next.js cost optimizations."
  );
  const [simulationState, setSimulationState] = useState<"idle" | "assembling" | "chatting" | "done">("idle");
  const [progressMsg, setProgressMsg] = useState<string>("");
  const [progressPct, setProgressPct] = useState<number>(0);
  const [logs, setLogs] = useState<{ sender: string; text: string; type: "system" | "agent" | "hook" | "success" }[]>([]);

  const stack = STACKS.find((s) => s.id === selectedStack) || STACKS[0];
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const runSimulation = async () => {
    setSimulationState("assembling");
    setLogs([]);

    const steps = [
      { msg: `Resolving stack folder for "${stack.name}"...`, pct: 15 },
      { msg: "Loading primary swarm persona...", pct: 35 },
      { msg: `Deploying specialized skills: [${stack.skills.map((s) => s.name).join(", ")}]...`, pct: 60 },
      { msg: `Mapping command keys: [${stack.cmds.map((c) => c.name).join(", ")}]...`, pct: 85 },
      { msg: `Activating compliance hooks: [${stack.hooks.map((h) => h.name).join(", ")}]...`, pct: 100 }
    ];

    for (const step of steps) {
      setProgressMsg(step.msg);
      setProgressPct(step.pct);
      setLogs((prev) => [...prev, { sender: "System", text: step.msg, type: "system" }]);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    setSimulationState("chatting");

    const dialogue: { sender: string; text: string; type: "system" | "agent" | "hook" | "success"; delay: number }[] = [];

    if (stack.id === "ai_sdr") {
      dialogue.push(
        { sender: "Persona: SDR Leader", text: `Triggered with objective: "${objective}"`, type: "agent", delay: 800 },
        { sender: "Skill: lead-scorer", text: "Evaluating lead target: 'VP of Engineering at Vercel'. Fit metrics scored against ICP table: Role Fit: 25/25, Company Size: 25/25, Tech Fit: 25/25. Result: Score 95/100 -> [GO].", type: "agent", delay: 1000 },
        { sender: "Command: /prospect-batch", text: "Prospect researched: Vercel is growing rapidly, using cloud-native stack. Key trigger found: Next.js compiler optimizations rollout. Staging for sequencing.", type: "agent", delay: 1200 },
        { sender: "Skill: email-personalizer", text: "Drafting cold email:\n\nSubject: Next.js build speeds & compile costs\n\nHi [Name],\n\nSaw the recent release notes on Next.js compiler upgrades. Impressive build speedups.\n\nQuick question: when scaling Next.js across 100+ devs, how is Vercel auditing token overhead and developer build execution costs?\n\nWe built a lightweight checker that saves teams ~40% on API test suites without breaking deployments.\n\nOpen to a quick exchange next Tuesday?\n\nBest,\n[Sender]", type: "agent", delay: 1600 },
        { sender: "Hook: email-compliance", text: "✓ Audit check: Unsubscribe footer detected. Sender address matched. CAN-SPAM validated.", type: "hook", delay: 800 },
        { sender: "Hook: approval-gate", text: "🚨 Swarm execution paused: PreToolUse hook 'approval-gate' blocked outgoing delivery. Outreach draft saved to session queue for human confirmation.", type: "hook", delay: 1000 },
        { sender: "System", text: "Swarm session completed successfully. Instructions exported to COUNCIL_INSTRUCTIONS.md.", type: "success", delay: 500 }
      );
    } else if (stack.id === "fullstack") {
      dialogue.push(
        { sender: "Persona: Principal Dev", text: `Beginning task: "${objective}"`, type: "agent", delay: 800 },
        { sender: "Command: /write-adr", text: "Drafting ADR-0004 for feature implementation structure.", type: "agent", delay: 1000 },
        { sender: "Skill: test-generator", text: "Constructing unit test suites matching specifications. Asserting null-checks, routing outputs, and boundary conditions.", type: "agent", delay: 1200 },
        { sender: "Hook: shadow-compiler", text: "⚡ PostToolUse: Executing silently 'npm run build' & 'tsc --noEmit'. Found 0 errors. Compilation verified.", type: "hook", delay: 1200 },
        { sender: "Hook: test-coverage-enforcer", text: "✓ PostToolUse: Executing test coverage analyzer. Coverage diff: 88.5% -> 88.6% (+0.1%). Check passed.", type: "hook", delay: 800 },
        { sender: "System", text: "Workspace code edits and validation steps verified successfully.", type: "success", delay: 500 }
      );
    } else {
      dialogue.push(
        { sender: "Persona: Swarm Core", text: `Simulating swarm execution for "${objective}"...`, type: "agent", delay: 800 },
        { sender: `Skill: ${stack.skills[0]?.name || "primary-skill"}`, text: `Running stack workflow tool: ${stack.skills[0]?.purpose || "processing"}`, type: "agent", delay: 1000 },
        { sender: `Command: ${stack.cmds[0]?.name || "/command"}`, text: `Running command: ${stack.cmds[0]?.desc || "executing"}`, type: "agent", delay: 1000 },
        { sender: "System", text: "Simulation complete. Swarm objectives resolved.", type: "success", delay: 500 }
      );
    }

    for (const d of dialogue) {
      await new Promise((resolve) => setTimeout(resolve, d.delay));
      setLogs((prev) => [...prev, { sender: d.sender, text: d.text, type: d.type }]);
    }

    setSimulationState("done");
  };

  // --- MULTI-AGENT DEBATE STATE ---
  const [debateTopic, setDebateTopic] = useState<string>("Should we implement TDD blindly on a new pre-PMF MVP?");
  const [debaterA, setDebaterA] = useState<string>("cto");
  const [debaterB, setDebaterB] = useState<string>("sre");
  const [debateLogs, setDebateLogs] = useState<{ speaker: string; icon: string; text: string }[]>([]);
  const [debateState, setDebateState] = useState<"idle" | "running" | "done">("idle");

  const runDebate = async () => {
    setDebateState("running");
    setDebateLogs([]);

    const agentA = DEBATE_PERSONAS.find(p => p.id === debaterA)!;
    const agentB = DEBATE_PERSONAS.find(p => p.id === debaterB)!;

    const debateSteps = [
      { speaker: agentA.name, icon: agentA.icon, text: `Analyzing topic: "${debateTopic}". I believe that in the early stages, speed is paramount. We cannot spend 50% of our cycles writing test assertions for features that might be completely thrown out next week.` },
      { speaker: agentB.name, icon: agentB.icon, text: `I disagree. Writing zero tests is a trap. The time saved is immediately lost when a breaking regression is introduced during refactoring. A basic test suite acting as a safety net prevents silent failures and allows us to pivot safely.` },
      { speaker: agentA.name, icon: agentA.icon, text: `A safety net is fine, but heavy TDD slows down structural pivots. If we change a schema, we have to rewrite 30 tests. That's friction. Pragmatic testing — only write tests for complex logic or business models, not for UI layout components.` },
      { speaker: agentB.name, icon: agentB.icon, text: `Pragmatic testing is acceptable. I can compromise on skipping TDD for mock UI controllers, provided we strictly run automated unit validation on the database schema and critical core business functions.` }
    ];

    for (const step of debateSteps) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setDebateLogs((prev) => [...prev, step]);
    }

    setDebateState("done");
  };

  // --- TRIGGERS STATE ---
  const [triggers, setTriggers] = useState<TriggerJob[]>([
    { id: "standup", name: "Daily Standup Routine", cron: "0 9 * * 1-5", active: false, desc: "Collect git logs and summarize standup updates." },
    { id: "sre_audit", name: "SRE Incident Watch", cron: "*/5 * * * *", active: false, desc: "Scan metrics, logs, and trace anomalies." },
    { id: "sec_scan", name: "Vulnerability Scan", cron: "0 0 * * 0", active: false, desc: "Weekly credentials, secrets and compliance scanner." }
  ]);
  const [triggerLogs, setTriggerLogs] = useState<string[]>(["[System] Cron controller initialized."]);

  const toggleTrigger = (id: string) => {
    setTriggers(prev => prev.map(t => {
      if (t.id === id) {
        const nextState = !t.active;
        setTriggerLogs(logs => [
          `[Controller] ${nextState ? "Scheduled" : "Descheduled"} "${t.name}" (${t.cron})`,
          ...logs
        ]);
        return { ...t, active: nextState };
      }
      return t;
    }));
  };

  // --- MEMORY INTEGRATIONS STATE ---
  const [obsidianLinked, setObsidianLinked] = useState(false);
  const [obsidianProgress, setObsidianProgress] = useState(0);
  const [notebookLMLinked, setNotebookLMLinked] = useState(false);
  const [notebookLMProgress, setNotebookLMProgress] = useState(0);

  const triggerObsidianSync = () => {
    if (obsidianLinked) {
      setObsidianLinked(false);
      setObsidianProgress(0);
      return;
    }
    setObsidianProgress(10);
    const interval = setInterval(() => {
      setObsidianProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setObsidianLinked(true);
          return 100;
        }
        return p + 30;
      });
    }, 450);
  };

  const triggerNotebookLMSync = () => {
    if (notebookLMLinked) {
      setNotebookLMLinked(false);
      setNotebookLMProgress(0);
      return;
    }
    setNotebookLMProgress(10);
    const interval = setInterval(() => {
      setNotebookLMProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setNotebookLMLinked(true);
          return 100;
        }
        return p + 25;
      });
    }, 500);
  };

  // --- METRICS / MISSION CONTROL ---
  const [simulatedLoad, setSimulatedLoad] = useState(12);
  const [activeSubagents, setActiveSubagents] = useState(4);
  const [tokenBudget, setTokenBudget] = useState(87.5);

  const petState = petSleep
    ? "sleeping"
    : debateState === "running"
    ? "debating"
    : simulationState === "assembling" || simulationState === "chatting"
    ? "working"
    : "idle";

  useEffect(() => {
    const t = setInterval(() => {
      setSimulatedLoad(Math.floor(10 + Math.random() * 8));
      if (simulationState === "chatting") {
        setSimulatedLoad(65 + Math.floor(Math.random() * 15));
        setActiveSubagents(8);
      } else {
        setActiveSubagents(4 + triggers.filter(t => t.active).length);
      }
    }, 3000);
    return () => clearInterval(t);
  }, [simulationState, triggers]);

  return (
    <div className="h-full flex flex-col bg-[#eeefe9] text-[#2d2d2d] font-sans overflow-hidden">
      {/* Top Header Tabs */}
      <header className="border-b border-hairline bg-cream px-4 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("swarm")}
            className={`rounded-md px-3 py-1.5 text-[12.5px] font-extrabold transition ${
              activeTab === "swarm" ? "bg-white text-ink shadow-sm" : "text-mute hover:text-body"
            }`}
          >
            🤝 Swarm Sandbox
          </button>
          <button
            onClick={() => setActiveTab("debate")}
            className={`rounded-md px-3 py-1.5 text-[12.5px] font-extrabold transition ${
              activeTab === "debate" ? "bg-white text-ink shadow-sm" : "text-mute hover:text-body"
            }`}
          >
            ⚔️ Debate Arena
          </button>
          <button
            onClick={() => setActiveTab("triggers")}
            className={`rounded-md px-3 py-1.5 text-[12.5px] font-extrabold transition ${
              activeTab === "triggers" ? "bg-white text-ink shadow-sm" : "text-mute hover:text-body"
            }`}
          >
            ⏰ Triggers & Cron
          </button>
          <button
            onClick={() => setActiveTab("memory")}
            className={`rounded-md px-3 py-1.5 text-[12.5px] font-extrabold transition ${
              activeTab === "memory" ? "bg-white text-ink shadow-sm" : "text-mute hover:text-body"
            }`}
          >
            💾 Memory & Sync
          </button>
          <button
            onClick={() => setActiveTab("metrics")}
            className={`rounded-md px-3 py-1.5 text-[12.5px] font-extrabold transition ${
              activeTab === "metrics" ? "bg-white text-ink shadow-sm" : "text-mute hover:text-body"
            }`}
          >
            📊 Mission Control
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white border border-hairline rounded-md px-2 py-1 shadow-2xs select-none">
            <span className="text-[10px] font-extrabold text-mute tracking-wider font-mono">PET STATUS:</span>
            <span className={`size-1.5 rounded-full ${
              petState === "working" ? "bg-amber-500 animate-pulse" :
              petState === "debating" ? "bg-purple-500 animate-ping" :
              petState === "sleeping" ? "bg-blue-400" :
              "bg-green-500"
            }`} />
            <span className="text-[11px] font-mono font-bold capitalize text-ink">
              {petState === "idle" && "🐱 Idle"}
              {petState === "working" && "🤖 Working"}
              {petState === "debating" && "🐯 Debating"}
              {petState === "sleeping" && "😴 Sleeping"}
            </span>
          </div>
          <div className="text-[11px] text-mute font-mono hidden lg:block">
            uitkit.os --controller-v1.1
          </div>
        </div>
      </header>

      {/* Workspace Area */}
      <div className="flex-1 flex flex-col sm:flex-row overflow-hidden min-h-0">
        
        {/* --- SWARM SANDBOX --- */}
        {activeTab === "swarm" && (
          <>
            <aside className="sm:w-80 shrink-0 border-r border-hairline bg-cream p-4 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <Eyebrow color="#f54e00">Swarm Sandbox</Eyebrow>
                  <p className="text-[12px] text-mute mt-1 leading-relaxed">
                    Test out multi-agent stacks and goal-driven auto tasks.
                  </p>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-mute uppercase tracking-wider block mb-1">
                    Select Domain Stack
                  </label>
                  <select
                    value={selectedStack}
                    onChange={(e) => setSelectedStack(e.target.value)}
                    disabled={simulationState === "assembling" || simulationState === "chatting"}
                    className="w-full rounded-md border border-hairline bg-white px-3 py-2 text-[13px] font-semibold focus:outline-none"
                  >
                    {STACKS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.icon} {s.name} Stack
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-mute uppercase tracking-wider block mb-1">
                    Swarm Objective / Goal Mode
                  </label>
                  <textarea
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    disabled={simulationState === "assembling" || simulationState === "chatting"}
                    rows={4}
                    className="w-full rounded-md border border-hairline bg-white px-3 py-2 text-[13px] leading-relaxed resize-none focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-hairline mt-4">
                <YellowButton
                  onClick={runSimulation}
                  disabled={simulationState === "assembling" || simulationState === "chatting" || !objective}
                  className="w-full justify-center"
                >
                  {simulationState === "assembling" || simulationState === "chatting"
                    ? "Running Objectives..."
                    : "Launch Goal Mode 🚀"}
                </YellowButton>
              </div>
            </aside>

            <main className="flex-1 bg-white p-4 flex flex-col min-w-0 overflow-y-auto">
              <div className="flex-1 bg-code-bg rounded-lg border border-hairline p-4 font-mono text-[12.5px] text-code-text overflow-y-auto flex flex-col">
                {logs.length === 0 && (
                  <div className="flex-1 grid place-items-center text-center text-mute max-w-xs mx-auto">
                    <div>
                      <div className="text-4xl mb-2">🎯</div>
                      <div className="font-bold text-ink">Ready to Initialize</div>
                      <p className="text-[11px] mt-1">Configure your stack on the left and start the autonomous loop.</p>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2.5 flex-1">
                  {logs.map((log, i) => (
                    <div key={i} className={
                      log.type === "system" ? "text-yellow-500 font-semibold" :
                      log.type === "hook" ? "text-red-400 p-2 border border-red-500/10 bg-red-950/10 rounded" :
                      log.type === "success" ? "text-green-400 font-bold p-2 border border-green-500/10 bg-green-950/10 rounded" :
                      "border border-hairline/10 bg-white/5 rounded p-2.5"
                    }>
                      {log.type !== "system" && log.type !== "success" && (
                        <div className="text-[10px] font-bold text-brand-yellow mb-0.5">{log.sender}</div>
                      )}
                      <div className="whitespace-pre-wrap leading-relaxed">{log.text}</div>
                    </div>
                  ))}
                  <div ref={logEndRef} />
                </div>

                {simulationState === "assembling" && (
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <div className="flex justify-between text-[11px] font-bold mb-1">
                      <span>Initializing Loop: {progressMsg}</span>
                      <span>{progressPct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-yellow" style={{ width: `${progressPct}%` }} />
                    </div>
                  </div>
                )}
              </div>
            </main>
          </>
        )}

        {/* --- DEBATE ARENA --- */}
        {activeTab === "debate" && (
          <>
            <aside className="sm:w-80 shrink-0 border-r border-hairline bg-cream p-4 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <Eyebrow color="#b62ad9">Debate Arena</Eyebrow>
                  <p className="text-[12px] text-mute mt-1 leading-relaxed">
                    Watch competing specialist agents debate architectural trade-offs and build solutions.
                  </p>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-mute uppercase tracking-wider block mb-1">Debater A</label>
                  <select value={debaterA} onChange={e => setDebaterA(e.target.value)} className="w-full rounded-md border border-hairline bg-white px-2.5 py-1.5 text-xs">
                    {DEBATE_PERSONAS.map(p => <option key={p.id} value={p.id}>{p.icon} {p.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-mute uppercase tracking-wider block mb-1">Debater B</label>
                  <select value={debaterB} onChange={e => setDebaterB(e.target.value)} className="w-full rounded-md border border-hairline bg-white px-2.5 py-1.5 text-xs">
                    {DEBATE_PERSONAS.map(p => <option key={p.id} value={p.id}>{p.icon} {p.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-mute uppercase tracking-wider block mb-1">Topic</label>
                  <textarea value={debateTopic} onChange={e => setDebateTopic(e.target.value)} rows={3} className="w-full rounded-md border border-hairline bg-white px-2.5 py-1.5 text-xs resize-none" />
                </div>
              </div>

              <div className="pt-4 border-t border-hairline mt-4">
                <button
                  onClick={runDebate}
                  disabled={debateState === "running" || debaterA === debaterB}
                  className="w-full bg-[#b62ad9] hover:bg-[#971ebd] text-white rounded px-3 py-2 text-xs font-bold transition disabled:opacity-50"
                >
                  {debateState === "running" ? "Agents Debating..." : "Start Debate Arena ⚔️"}
                </button>
              </div>
            </aside>

            <main className="flex-1 bg-white p-4 flex flex-col min-w-0 overflow-y-auto">
              <div className="flex-1 border border-hairline rounded-lg bg-cream/10 p-4 space-y-4 overflow-y-auto">
                {debateLogs.length === 0 && debateState !== "running" && (
                  <div className="h-full flex flex-col items-center justify-center text-center text-mute max-w-xs mx-auto">
                    <span className="text-4xl mb-2">⚔️</span>
                    <h4 className="font-bold text-ink text-sm">Debate Arena Idle</h4>
                    <p className="text-[11px] mt-1">Select debaters, enter your architectural topic, and hit Start.</p>
                  </div>
                )}

                {debateLogs.map((log, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="size-8 rounded-full bg-[#2d2d2d] text-white flex items-center justify-center text-base shrink-0 select-none shadow-sm">
                      {log.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="text-[11.5px] font-extrabold text-ink">{log.speaker}</div>
                      <p className="bg-white border border-hairline p-3 rounded-lg text-xs leading-relaxed text-body shadow-sm">{log.text}</p>
                    </div>
                  </div>
                ))}

                {debateState === "running" && debateLogs.length < 4 && (
                  <div className="flex gap-3 animate-pulse">
                    <div className="size-8 rounded-full bg-mute text-white flex items-center justify-center text-base shrink-0">🤔</div>
                    <div className="space-y-2 w-full">
                      <div className="h-3 w-28 bg-mute rounded" />
                      <div className="h-10 w-2/3 bg-cream border border-hairline rounded-lg" />
                    </div>
                  </div>
                )}

                {debateState === "done" && (
                  <div className="p-3 border border-green-500/20 bg-green-50 rounded-lg flex items-center gap-2 text-xs text-green-800 font-semibold select-none">
                    <span>✓</span> Consensus achieved. Architectural design record queued for generation.
                  </div>
                )}
              </div>
            </main>
          </>
        )}

        {/* --- TRIGGERS / CRON --- */}
        {activeTab === "triggers" && (
          <>
            <aside className="sm:w-80 shrink-0 border-r border-hairline bg-cream p-4 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <Eyebrow color="#1078a3">Triggers & Cron</Eyebrow>
                  <p className="text-[12px] text-mute mt-1 leading-relaxed">
                    Set up scheduled tasks and system hooks to run background loops.
                  </p>
                </div>

                <div className="space-y-3">
                  {triggers.map(t => (
                    <div key={t.id} className="p-3 bg-white border border-hairline rounded-lg space-y-2 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-ink">{t.name}</span>
                        <input
                          type="checkbox"
                          checked={t.active}
                          onChange={() => toggleTrigger(t.id)}
                          className="accent-cyan-600 cursor-pointer size-3.5"
                        />
                      </div>
                      <div className="text-[10px] font-mono text-mute">{t.cron}</div>
                      <p className="text-[11px] text-mute leading-relaxed">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <main className="flex-1 bg-white p-4 flex flex-col min-w-0 overflow-y-auto">
              <div className="flex-1 bg-code-bg rounded-lg border border-hairline p-4 font-mono text-xs text-code-text overflow-y-auto">
                <div className="font-bold text-yellow-500 mb-2 border-b border-white/5 pb-1 select-none">RUNNING CRON DAEMON CONTROLLER</div>
                <div className="space-y-1">
                  {triggerLogs.map((l, i) => (
                    <div key={i} className={l.includes("Controller") ? "text-cyan-400" : "text-gray-400"}>{l}</div>
                  ))}
                </div>
              </div>
            </main>
          </>
        )}

        {/* --- MEMORY & INTEGRATIONS --- */}
        {activeTab === "memory" && (
          <main className="flex-1 bg-white p-6 overflow-y-auto space-y-6">
            <div>
              <Eyebrow color="#a855f7">Sync & Integrations</Eyebrow>
              <h2 className="text-xl font-extrabold text-ink mt-1">Obsidian & NotebookLM Sync</h2>
              <p className="text-xs text-mute leading-relaxed max-w-xl">
                Build a unified shared knowledge brain by linking your UitKit skill vault directly to Obsidian vault nodes or sync project documents into NotebookLM.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-3xl">
              {/* Obsidian card */}
              <div className="border border-hairline rounded-xl p-4 bg-cream/20 space-y-4 flex flex-col justify-between shadow-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl select-none">🗂️</span>
                    <span className="font-extrabold text-sm text-ink">Obsidian Second Brain</span>
                  </div>
                  <p className="text-xs text-mute leading-relaxed">
                    Map folder paths to index your vault files and skills into a bidirectional knowledge map.
                  </p>
                  <input
                    type="text"
                    disabled={obsidianProgress > 0 && obsidianProgress < 100}
                    defaultValue="~/Obsidian/UitKitBrain/"
                    className="w-full text-xs bg-white rounded border border-hairline px-2.5 py-1.5 focus:outline-none"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  {obsidianProgress > 0 && obsidianProgress < 100 && (
                    <div className="space-y-1">
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: `${obsidianProgress}%` }} />
                      </div>
                      <div className="text-[10px] text-mute font-mono">Linking nodes... {obsidianProgress}%</div>
                    </div>
                  )}

                  {obsidianLinked && (
                    <div className="text-xs font-semibold text-green-700 bg-green-50 border border-green-500/10 p-2 rounded">
                      ✓ Successfully Linked & Synced (1,138 nodes).
                    </div>
                  )}

                  <button
                    onClick={triggerObsidianSync}
                    disabled={obsidianProgress > 0 && obsidianProgress < 100}
                    className="w-full bg-[#a855f7] hover:bg-[#8f36df] text-white rounded px-3 py-1.5 text-xs font-bold transition disabled:opacity-50"
                  >
                    {obsidianLinked ? "Unlink Obsidian Vault" : "Sync Obsidian Vault"}
                  </button>
                </div>
              </div>

              {/* NotebookLM card */}
              <div className="border border-hairline rounded-xl p-4 bg-cream/20 space-y-4 flex flex-col justify-between shadow-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl select-none">📓</span>
                    <span className="font-extrabold text-sm text-ink">NotebookLM Knowledge Base</span>
                  </div>
                  <p className="text-xs text-mute leading-relaxed">
                    Sync your skills vault and agent guidelines directly into Google NotebookLM for audio podcasts synthesis or Q&A.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {notebookLMProgress > 0 && notebookLMProgress < 100 && (
                    <div className="space-y-1">
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: `${notebookLMProgress}%` }} />
                      </div>
                      <div className="text-[10px] text-mute font-mono">Syncing sources... {notebookLMProgress}%</div>
                    </div>
                  )}

                  {notebookLMLinked && (
                    <div className="text-xs font-semibold text-green-700 bg-green-50 border border-green-500/10 p-2 rounded">
                      ✓ NotebookLM source synchronized.
                    </div>
                  )}

                  <button
                    onClick={triggerNotebookLMSync}
                    disabled={notebookLMProgress > 0 && notebookLMProgress < 100}
                    className="w-full bg-[#a855f7] hover:bg-[#8f36df] text-white rounded px-3 py-1.5 text-xs font-bold transition disabled:opacity-50"
                  >
                    {notebookLMLinked ? "Unlink NotebookLM" : "Sync to NotebookLM"}
                  </button>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* --- MISSION CONTROL METRICS --- */}
        {activeTab === "metrics" && (
          <main className="flex-1 bg-white p-6 overflow-y-auto space-y-6">
            <div>
              <Eyebrow color="#f54e00">Mission Control</Eyebrow>
              <h2 className="text-xl font-extrabold text-ink mt-1">Real-Time Core Performance</h2>
              <p className="text-xs text-mute leading-relaxed">
                Monitor CPU load, active subagent tasks, token efficiency budget, and connection nodes dynamically.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-3xl">
              <div className="border border-hairline rounded-xl p-4 bg-cream/10 space-y-1 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-mute block">Agent System Load</span>
                <div className="text-2xl font-black text-ink">{simulatedLoad}%</div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-brand-orange transition-all duration-300" style={{ width: `${simulatedLoad}%` }} />
                </div>
              </div>

              <div className="border border-hairline rounded-xl p-4 bg-cream/10 space-y-1 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-mute block">Active Subagents (Tasks)</span>
                <div className="text-2xl font-black text-ink flex items-center gap-2">
                  {activeSubagents}
                  <span className="size-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <p className="text-[10px] text-mute mt-2">Running loops & cron schedule listeners.</p>
              </div>

              <div className="border border-hairline rounded-xl p-4 bg-cream/10 space-y-1 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-mute block">Token Efficiency</span>
                <div className="text-2xl font-black text-ink">+{tokenBudget}%</div>
                <div className="text-[10px] text-green-600 font-semibold mt-2">Save: Prompt caching activated.</div>
              </div>

              <div className="border border-hairline rounded-xl p-4 bg-cream/10 flex flex-col justify-between shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-mute block">OS Pixel Pet</span>
                  <label className="flex items-center gap-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={petSleep}
                      onChange={(e) => setPetSleep(e.target.checked)}
                      className="size-3 cursor-pointer"
                    />
                    <span className="text-[9px] font-bold text-mute uppercase">Sleep</span>
                  </label>
                </div>
                <div className="mt-2 flex-1">
                  <PixelPet state={petState} />
                </div>
              </div>
            </div>

            <div className="border border-hairline rounded-xl p-5 bg-[#0d0e12] max-w-3xl text-gray-200 font-mono text-xs space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold text-mute border-b border-white/5 pb-2">
                <span>ACTIVE COORDINATION EDGE CONNECTIONS</span>
                <span className="text-brand-yellow">LIVE STREAM</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="size-1.5 bg-cyan-400 rounded-full animate-ping" />
                  <span>[Memory Brain] &arr; [SRE Agent] linked (shared context)</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400">
                  <span className="size-1.5 bg-purple-400 rounded-full animate-ping" />
                  <span>[CTO Agent] &arr; [Goal Mode loop] triggered</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="size-1.5 bg-gray-500 rounded-full" />
                  <span>[Hubspot MCP] &arr; Idle (waiting for triggers)</span>
                </div>
              </div>
            </div>
          </main>
        )}

      </div>
    </div>
  );
}
