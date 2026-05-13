import { notFound } from 'next/navigation'
import Link from 'next/link'
import { marked } from 'marked'
import { getAllHooks, readSkillContent } from '@/lib/content'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllHooks().map(h => ({ slug: h.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const hook = getAllHooks().find(h => h.slug === slug)
  return hook ? { title: `${hook.title} Hook` } : { title: 'Not Found' }
}

const EVENT_COLORS: Record<string, string> = {
  PreToolUse: 'bg-red-400',
  PostToolUse: 'bg-green-400',
  Lifecycle: 'bg-blue-400',
}

export default async function HookPage({ params }: Props) {
  const { slug } = await params
  const hook = getAllHooks().find(h => h.slug === slug)
  if (!hook) notFound()

  const mdContent = readSkillContent(hook.mdPath)
  const html = await marked(mdContent)

  const shContent = hook.shPath ? readSkillContent(hook.shPath) : ''
  const shHtml = shContent ? await marked(`\`\`\`bash\n${shContent}\n\`\`\``) : ''

  const eventColor = EVENT_COLORS[hook.event] ?? 'bg-gray-400'

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/hooks" className="font-bold hover:underline text-gray-500">Hooks</Link>
        <span className="text-gray-400">/</span>
        <span className="font-bold">{hook.title}</span>
      </div>

      <div className="neo-card p-6 mb-8 bg-orange-500">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black">{hook.title}</h1>
            <p className="font-mono text-sm text-gray-700 mt-2">{hook.slug}.sh · {hook.category}</p>
          </div>
          <span className={`neo-btn px-3 py-1 ${eventColor} text-black text-xs text-center border-black shrink-0`}>
            {hook.event}
          </span>
        </div>
      </div>

      {/* Documentation */}
      <div className="neo-card p-8 prose-retro mb-6" dangerouslySetInnerHTML={{ __html: html }} />

      {/* Shell script source */}
      {shHtml && (
        <div className="mb-8">
          <h2 className="font-black text-xl mb-3 border-b-2 border-black pb-2">Shell Script</h2>
          <div
            className="neo-card p-6 prose-retro overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: shHtml }}
          />
        </div>
      )}

      <div className="mt-8">
        <Link href="/hooks" className="neo-btn px-4 py-2 bg-orange-500 text-black text-sm">
          ← All Hooks
        </Link>
      </div>
    </div>
  )
}
