import Link from 'next/link'
import { getAllWorkflows } from '@/lib/content'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Workflows' }

const WORKFLOW_DESCRIPTIONS: Record<string, string> = {
  'feature-development': 'End-to-end process for taking a feature from idea to merged PR.',
  'debugging-session': 'Structured approach to diagnosing and fixing bugs systematically.',
  'code-review': 'How to use Claude to review PRs thoroughly and consistently.',
  'refactor-safely': 'Incremental refactoring with test coverage at every step.',
  'new-project-bootstrap': 'Scaffold a new project with the right structure from day one.',
}

const WORKFLOW_ICONS: Record<string, string> = {
  'feature-development': 'F',
  'debugging-session': 'D',
  'code-review': 'R',
  'refactor-safely': 'S',
  'new-project-bootstrap': 'B',
}

const WORKFLOW_COLORS: Record<string, string> = {
  'feature-development': 'bg-blue-400',
  'debugging-session': 'bg-red-400',
  'code-review': 'bg-green-400',
  'refactor-safely': 'bg-purple-400',
  'new-project-bootstrap': 'bg-orange-400',
}

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'es', label: 'Español' },
]

export default function WorkflowsPage() {
  const workflows = getAllWorkflows()

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-black">Workflows</h1>
        <p className="text-gray-600 mt-1">
          {workflows.length} end-to-end multi-step processes — reference these before starting a task
        </p>
      </div>

      <div className="neo-card p-4 mb-10 bg-orange-50 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <p className="text-sm font-bold text-gray-700">
          Workflows are reference documents, not slash commands. Read one before starting a complex task.
        </p>
        <div className="flex gap-1 shrink-0 flex-wrap">
          {LANGUAGES.map(lang => (
            <span key={lang.code} className="text-xs font-bold px-2 py-1 border border-black bg-white">
              {lang.code.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workflows.map(wf => (
          <Link
            key={wf.slug}
            href={`/workflows/${wf.slug}`}
            className="neo-card neo-card-hover p-6 group flex gap-4"
          >
            <div className={`w-12 h-12 shrink-0 ${WORKFLOW_COLORS[wf.slug] ?? 'bg-gray-300'} border-2 border-black flex items-center justify-center font-black text-lg`}>
              {WORKFLOW_ICONS[wf.slug] ?? wf.title.charAt(0)}
            </div>
            <div>
              <h2 className="font-black text-lg group-hover:underline">{wf.title}</h2>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                {WORKFLOW_DESCRIPTIONS[wf.slug] ?? ''}
              </p>
              <div className="flex gap-1 mt-3 flex-wrap">
                {LANGUAGES.map(lang => (
                  <span key={lang.code} className="text-xs font-bold px-1.5 py-0.5 border border-black bg-orange-100">
                    {lang.code.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
