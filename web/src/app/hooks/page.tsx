import Link from 'next/link'
import { getAllHooks } from '@/lib/content'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Hooks' }

const EVENT_COLORS: Record<string, string> = {
  PreToolUse: 'bg-red-400',
  PostToolUse: 'bg-green-400',
  Lifecycle: 'bg-blue-400',
}

const EVENT_DESCRIPTIONS: Record<string, string> = {
  PreToolUse: 'Fires before a tool runs — can block or warn',
  PostToolUse: 'Fires after a tool completes — for logging, formatting',
  Lifecycle: 'Session-level events — start, compact, notification',
}

const CATEGORY_ORDER = ['pre-tool-use', 'post-tool-use', 'lifecycle']

export default function HooksPage() {
  const hooks = getAllHooks()
  const byCategory = CATEGORY_ORDER.reduce<Record<string, typeof hooks>>((acc, cat) => {
    acc[cat] = hooks.filter(h => h.category === cat)
    return acc
  }, {})

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-black">Hooks</h1>
        <p className="text-gray-600 mt-1">{hooks.length} event-driven automations — fire on PreToolUse, PostToolUse, and Lifecycle events</p>
      </div>

      {/* How hooks work */}
      <div className="neo-card p-6 mb-10 bg-black text-white">
        <h2 className="font-black text-lg mb-3">How hooks work</h2>
        <p className="text-sm text-gray-300 leading-relaxed mb-4">
          Hooks are shell scripts configured in <code className="bg-gray-800 px-1.5 py-0.5 text-orange-300 text-xs">.claude/settings.json</code>. Claude Code executes them automatically when specific events occur — before or after tool calls, or at session lifecycle points.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Object.entries(EVENT_COLORS).map(([event, color]) => (
            <div key={event} className="border border-gray-700 p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2.5 h-2.5 ${color} border border-white`}></span>
                <span className="font-bold text-sm">{event}</span>
              </div>
              <p className="text-xs text-gray-400">{EVENT_DESCRIPTIONS[event]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hooks by category */}
      <div className="space-y-10">
        {CATEGORY_ORDER.map(cat => {
          const catHooks = byCategory[cat]
          if (!catHooks?.length) return null
          const event = catHooks[0].event
          const color = EVENT_COLORS[event] ?? 'bg-gray-400'
          return (
            <div key={cat}>
              <div className="flex items-center gap-3 mb-4 border-b-2 border-black pb-2">
                <span className={`w-3 h-3 ${color} border-2 border-black`}></span>
                <h2 className="text-xl font-black">{event}</h2>
                <span className="text-sm text-gray-500 font-mono">{cat}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {catHooks.map(hook => (
                  <Link
                    key={hook.id}
                    href={`/hooks/${hook.slug}`}
                    className="neo-card neo-card-hover p-5 group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-black text-base group-hover:underline">{hook.title}</h3>
                      <span className={`shrink-0 text-xs font-bold px-2 py-0.5 border border-black ${color}`}>
                        {hook.event}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-gray-400">{hook.slug}.sh</p>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Install instructions */}
      <div className="neo-card p-6 mt-12 bg-orange-50">
        <h2 className="font-black text-lg mb-3">Installing a hook</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
          <li>Copy the <code className="bg-black text-white px-1.5 py-0.5 text-xs">.sh</code> file to <code className="bg-black text-white px-1.5 py-0.5 text-xs">.claude/hooks/</code> in your project</li>
          <li>Make it executable: <code className="bg-black text-white px-1.5 py-0.5 text-xs">chmod +x .claude/hooks/hook-name.sh</code></li>
          <li>Add the JSON snippet from the hook's documentation to <code className="bg-black text-white px-1.5 py-0.5 text-xs">.claude/settings.json</code></li>
          <li>Restart Claude Code</li>
        </ol>
      </div>
    </div>
  )
}
