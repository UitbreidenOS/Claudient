import { useState, useEffect } from "react";
import { Eyebrow, Card } from "./ui";

interface ActivityLog {
  id: string;
  time: string;
  agent: string;
  action: string;
  category: "success" | "warn" | "info";
  detail: string;
}

const INITIAL_LOGS: ActivityLog[] = [
  { id: "l1", time: "02:27:00", agent: "Hermes Builder", action: "Refactored databases context", category: "success", detail: "Parsed SQLite schema and saved 15 lines of redundant typings." },
  { id: "l2", time: "02:26:45", agent: "Fugu Judge", action: "Gated security checklist", category: "success", detail: "Confirmed credentials check passed on main commits." },
  { id: "l3", time: "02:25:30", agent: "Hermes Planner", action: "Dispatched pipeline steps", category: "info", detail: "Chained 4 task nodes inside Pipeline Builder." },
  { id: "l4", time: "02:24:12", agent: "Oracle Scraper", action: "Ingested tech trends feed", category: "warn", detail: "HackerNews API rate limited. Recalibrating proxy targets." },
];

const AGENT_ACTIONS = [
  { agent: "Hermes Builder", action: "Optimized bundle weight", category: "success" as const, detail: "Reduced bundle exports by 22% via AST pruning." },
  { agent: "Fugu Judge", action: "Validated unit tests", category: "success" as const, detail: "18 compilation checks successfully executed." },
  { agent: "Hermes Planner", action: "Realigned Goal checklist", category: "info" as const, detail: "Refactored milestones list inside project backlog." },
  { agent: "Oracle Scraper", action: "Scraped GitHub releases", category: "success" as const, detail: "Discovered 3 new releases for NextJS configs." },
];

export function RadarFeedApp() {
  const [logs, setLogs] = useState<ActivityLog[]>(INITIAL_LOGS);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    // Set interval to inject mock live telemetry logs
    const interval = setInterval(() => {
      const randomAction = AGENT_ACTIONS[Math.floor(Math.random() * AGENT_ACTIONS.length)];
      const newLog: ActivityLog = {
        id: Math.random().toString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        ...randomAction
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 15)]);

      // Sync with Sidekick Pet
      window.dispatchEvent(new CustomEvent("sidekick_status_change", {
        detail: { status: "info" as any, message: `${newLog.agent}: ${newLog.action}` }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(l => {
    if (filter === "all") return true;
    return l.category === filter;
  });

  return (
    <div className="h-full flex flex-col p-5 overflow-y-auto space-y-4">
      {/* Header */}
      <div className="border-b border-hairline pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-3">
          <span className="text-4xl">📊</span>
          <div>
            <Eyebrow color="#0ea5e9">Radar Feed</Eyebrow>
            <h1 className="text-xl font-extrabold text-ink">Live Agent Activity Log</h1>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
          {([
            { id: "all", label: "All Logs" },
            { id: "success", label: "Success ✓" },
            { id: "warn", label: "Alerts ⚠️" },
            { id: "info", label: "Info ℹ️" },
          ]).map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-3 py-1 text-[12px] font-bold rounded-lg transition ${
                filter === btn.id ? "bg-white text-sky-600 shadow-sm" : "text-mute hover:text-ink"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feed listing container */}
      <Card className="flex-1 flex flex-col gap-3 min-h-[300px]">
        <div className="border-b border-hairline pb-2 flex justify-between items-center px-1">
          <h3 className="text-[13px] font-bold text-ink">Real-time Swarm Telemetry</h3>
          <span className="text-[10px] text-mute font-mono flex items-center gap-1.5">
            <span className="inline-block size-2 rounded-full bg-sky-500 animate-ping"></span>
            Telemetry Stream Active
          </span>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto max-h-[380px] pr-1">
          {filteredLogs.length === 0 && (
            <div className="text-center py-12 text-mute italic">No logs matched selected filter parameters.</div>
          )}
          {filteredLogs.map((log) => (
            <div 
              key={log.id}
              className="p-3.5 rounded-xl border border-hairline bg-white hover:border-sky-500/30 transition shadow-sm flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300"
            >
              {/* Category indicator icon */}
              <span className={`text-xl p-2 rounded-xl shrink-0 ${
                log.category === "success" ? "bg-emerald-50 text-emerald-600" :
                log.category === "warn" ? "bg-rose-50 text-rose-600" :
                "bg-blue-50 text-blue-600"
              }`}>
                {log.category === "success" ? "✓" : log.category === "warn" ? "⚠️" : "ℹ️"}
              </span>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-extrabold text-ink">{log.agent}</span>
                    <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-1.5 py-0.25 rounded">
                      {log.action}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-mute">{log.time}</span>
                </div>
                <p className="text-[12px] text-body leading-relaxed">{log.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
