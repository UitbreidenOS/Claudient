import { useState } from "react";
import { Eyebrow, Card } from "./ui";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarBg: string;
  avatarText: string;
  category: "Developer" | "Founder" | "Enterprise";
  quote: string;
  metric: string;
  stars: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Alex Rivera",
    role: "Senior Staff Engineer",
    company: "DevFlow Inc.",
    avatarBg: "from-blue-400 to-indigo-600",
    avatarText: "AR",
    category: "Developer",
    quote: "Autonomous mode has completely changed my daily workflow. It spins up subagents to resolve lint errors and commits to git when green. I just watch the logs fly by. Pure magic.",
    metric: "Saved 18h / week",
    stars: 5
  },
  {
    id: "t2",
    name: "Sarah Chen",
    role: "CTO & Co-founder",
    company: "ScribeAI",
    avatarBg: "from-pink-400 to-rose-600",
    avatarText: "SC",
    category: "Founder",
    quote: "Building our MVP with the custom plugins and loop engineering setups was a breeze. We launched three weeks ahead of schedule. The productivity boost is real.",
    metric: "3.5x faster MVP",
    stars: 5
  },
  {
    id: "t3",
    name: "David K.",
    role: "Director of Engineering",
    company: "Global Scale Corp",
    avatarBg: "from-emerald-400 to-teal-600",
    avatarText: "DK",
    category: "Enterprise",
    quote: "Our engineers were skeptical about letting agents write code autonomously. Once they saw the safe commit loops and Doctor audits running in real-time, the confidence skyrocketed.",
    metric: "-80% index bugs",
    stars: 5
  },
  {
    id: "t4",
    name: "Elena Rostova",
    role: "Full Stack Engineer",
    company: "HypeStack",
    avatarBg: "from-amber-400 to-orange-600",
    avatarText: "ER",
    category: "Developer",
    quote: "The voice assistant (Jarvis) and local context management are brilliant. I can prompt Claude using natural language while editing complex workspaces, keeping my focus fully aligned.",
    metric: "Zero context drift",
    stars: 5
  },
  {
    id: "t5",
    name: "Marcus Vance",
    role: "Solopreneur",
    company: "LaunchPad Labs",
    avatarBg: "from-violet-400 to-purple-600",
    avatarText: "MV",
    category: "Founder",
    quote: "I use the Lead Gen pipelines coupled with autonomous SEO audits to run my entire SaaS marketing site. It feels like having a team of five senior developers and marketers working 24/7.",
    metric: "$2.4k / mo saved",
    stars: 5
  }
];

export function TestimonialsApp() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Developer", "Founder", "Enterprise"];

  const filtered = activeCategory === "All"
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.category === activeCategory);

  const handleHeartClick = (name: string) => {
    window.dispatchEvent(new CustomEvent("sidekick_status_change", {
      detail: {
        status: "happy",
        message: `Liked testimonial from ${name}! 💖`
      }
    }));
  };

  return (
    <div className="h-full flex flex-col p-5 overflow-y-auto space-y-4">
      {/* Header */}
      <div className="border-b border-hairline pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-4xl">💬</span>
          <div>
            <Eyebrow color="#fb7185">Wall of Love</Eyebrow>
            <h1 className="text-xl font-extrabold text-ink">Ecosystem Testimonials</h1>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex bg-zinc-100 rounded-lg p-0.5 border border-hairline">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition ${
                activeCategory === cat
                  ? "bg-white text-rose-600 shadow-sm"
                  : "text-mute hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
        {filtered.map((t) => (
          <Card key={t.id} className="flex flex-col justify-between hover:border-rose-200 hover:shadow-sm transition-all p-5">
            <div>
              {/* Top rating and category */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
                  {t.category}
                </span>
              </div>

              {/* Quote */}
              <p className="text-[12px] text-body italic leading-relaxed mb-4">
                "{t.quote}"
              </p>
            </div>

            {/* User Bio */}
            <div className="border-t border-hairline/60 pt-4 mt-auto flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`size-9 rounded-full bg-gradient-to-br ${t.avatarBg} flex items-center justify-center text-white text-[11px] font-bold shadow-sm`}>
                  {t.avatarText}
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-ink leading-tight">{t.name}</h4>
                  <p className="text-[10px] text-mute leading-tight mt-0.5">{t.role}, {t.company}</p>
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-1">
                <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                  {t.metric}
                </span>
                <button
                  onClick={() => handleHeartClick(t.name)}
                  className="text-mute hover:text-rose-500 transition-colors text-[13px]"
                  title="Like testimonial"
                >
                  💖
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
