import { notFound } from 'next/navigation'
import Link from 'next/link'
import { marked } from 'marked'
import { getAllWorkflows, readSkillContent, SUPPORTED_LANGS, LANG_LABELS, type Lang } from '@/lib/content'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ lang?: string }>
}

export async function generateStaticParams() {
  return getAllWorkflows().map(w => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const wf = getAllWorkflows().find(w => w.slug === slug)
  return wf ? { title: wf.title } : { title: 'Not Found' }
}

export default async function WorkflowPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { lang: langParam } = await searchParams
  const lang: Lang = SUPPORTED_LANGS.includes(langParam as Lang) ? (langParam as Lang) : 'en'

  const wf = getAllWorkflows(lang).find(w => w.slug === slug)
    ?? getAllWorkflows('en').find(w => w.slug === slug)
  if (!wf) notFound()

  const html = await marked(readSkillContent(wf.filePath))
  const baseUrl = `/workflows/${slug}`

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/workflows" className="font-bold hover:underline text-gray-500">Workflows</Link>
        <span className="text-gray-400">/</span>
        <span className="font-bold">{wf.title}</span>
      </div>

      <div className="neo-card p-6 mb-6 bg-orange-500">
        <h1 className="text-3xl font-black">{wf.title}</h1>
        <p className="text-sm text-gray-800 mt-1 font-medium">Multi-step workflow — reference document</p>
      </div>

      <div className="flex items-center gap-2 mb-8 flex-wrap">
        <span className="text-sm font-bold text-gray-500">Language:</span>
        {SUPPORTED_LANGS.map(l => (
          <Link
            key={l}
            href={l === 'en' ? baseUrl : `${baseUrl}?lang=${l}`}
            className={`text-xs font-bold px-3 py-1.5 border-2 border-black transition-colors ${
              lang === l ? 'bg-black text-white' : 'bg-white text-black hover:bg-orange-500 hover:text-white'
            }`}
          >
            {LANG_LABELS[l]}
          </Link>
        ))}
      </div>

      <div className="neo-card p-8 prose-retro" dangerouslySetInnerHTML={{ __html: html }} />

      <div className="mt-8">
        <Link href="/workflows" className="neo-btn px-4 py-2 bg-orange-500 text-black text-sm">
          ← All Workflows
        </Link>
      </div>
    </div>
  )
}
