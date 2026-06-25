import { useState, useEffect } from "react";
import { Eyebrow, Card } from "./ui";

interface RoadmapWeek {
  week: number;
  title: string;
  focus: string;
  tasks: { id: string; text: string; done: boolean }[];
}

const INITIAL_WEEKS: RoadmapWeek[] = [
  {
    week: 1,
    title: "Zero to Setup 🚀",
    focus: "Establish core CLI configurations & doctor audits.",
    tasks: [
      { id: "w1t1", text: "Run local cli setup checklist config", done: true },
      { id: "w1t2", text: "Conduct local doctor health assessment", done: true },
      { id: "w1t3", text: "Install base agent rule file parameters", done: false },
    ],
  },
  {
    week: 2,
    title: "Iterative Loops 🔁",
    focus: "Automate build verification workflows.",
    tasks: [
      { id: "w2t1", text: "Execute custom loop verification runs", done: false },
      { id: "w2t2", text: "Configure safe commit git hooks", done: false },
    ],
  },
  {
    week: 3,
    title: "Multi-Model Deliberation 🤖",
    focus: "Deliberate architectural choices in boardroom.",
    tasks: [
      { id: "w3t1", text: "Execute parallel query on Fusion board", done: false },
      { id: "w3t2", text: "Trace data orbits in Memory Galaxy core", done: false },
    ],
  },
  {
    week: 4,
    title: "Scale & Compliance 🏢",
    focus: "Ingest custom JIT plugins and enforce SOC2 policies.",
    tasks: [
      { id: "w4t1", text: "Create custom learned markdown skill file", done: false },
      { id: "w4t2", text: "Bootstrap clean slate minimal tool boot", done: false },
    ],
  },
];

export function RoadmapApp() {
  const [weeks, setWeeks] = useState<RoadmapWeek[]>(INITIAL_WEEKS);

  useEffect(() => {
    const saved = localStorage.getItem("uitkit_roadmap_weeks");
    if (saved) {
      try { setWeeks(JSON.parse(saved)); } catch (_) {}
    }
  }, []);

  const handleToggleTask = (weekNum: number, taskId: string) => {
    const updated = weeks.map((w) => {
      if (w.week === weekNum) {
        return {
          ...w,
          tasks: w.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t)
        };
      }
      return w;
    });

    setWeeks(updated);
    localStorage.setItem("uitkit_roadmap_weeks", JSON.stringify(updated));

    // Update Sidekick Pet
    const project = updated.find(w => w.week === weekNum);
    const item = project?.tasks.find(t => t.id === taskId);
    if (item) {
      window.dispatchEvent(new CustomEvent("sidekick_status_change", {
        detail: { status: "working", message: `${item.done ? "Checked" : "Unchecked"} roadmap item.` }
      }));
    }
  };

  // Stats
  const totalTasks = weeks.reduce((sum, w) => sum + w.tasks.length, 0);
  const completedTasks = weeks.reduce((sum, w) => sum + w.tasks.filter(t => t.done).length, 0);
  const totalProgressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="h-full flex flex-col p-5 overflow-y-auto space-y-4">
      {/* Header */}
      <div className="border-b border-hairline pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🗺️</span>
          <div>
            <Eyebrow color="#f59e0b">30-Day Onboarding Roadmap</Eyebrow>
            <h1 className="text-xl font-extrabold text-ink">Ecosystem Training Milestones</h1>
          </div>
        </div>

        {/* Total Progress */}
        <div className="w-full sm:w-48 bg-zinc-50 border border-hairline p-3 rounded-xl">
          <div className="flex items-center justify-between text-[11px] font-bold text-ink mb-1">
            <span>Roadmap Progress</span>
            <span>{totalProgressPercent}%</span>
          </div>
          <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
            <div
              style={{ width: `${totalProgressPercent}%` }}
              className="bg-amber-500 h-full transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* 4-week grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
        {weeks.map((w) => {
          const weekTotal = w.tasks.length;
          const weekDone = w.tasks.filter(t => t.done).length;
          const weekPercent = weekTotal > 0 ? Math.round((weekDone / weekTotal) * 100) : 0;

          return (
            <Card key={w.week} className="flex flex-col gap-3 justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-hairline pb-1.5">
                  <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                    Week 0{w.week}
                  </span>
                  <span className="text-[10px] text-mute font-bold">{weekPercent}% done</span>
                </div>

                <h3 className="text-[13px] font-bold text-ink leading-tight">{w.title}</h3>
                <p className="text-[11.5px] text-mute leading-normal">{w.focus}</p>

                {/* Week checklist */}
                <div className="space-y-1.5 pt-2">
                  {w.tasks.map((t) => (
                    <label 
                      key={t.id}
                      className="flex items-start gap-2 text-[12px] text-body hover:text-ink cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() => handleToggleTask(w.week, t.id)}
                        className="mt-0.5 size-3.5 accent-amber-500 rounded"
                      />
                      <span className={t.done ? "line-through text-mute" : "font-semibold"}>
                        {t.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Progress bar inside week */}
              <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden border border-hairline mt-2">
                <div
                  style={{ width: `${weekPercent}%` }}
                  className="bg-amber-400 h-full transition-all duration-300"
                />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
