'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { SkillCard } from '@/components/skill-card'
import { CATEGORY_LABELS, CATEGORY_COLORS, SKILL_CATEGORIES_LIST, type SkillMeta } from '@/lib/constants'

export function SkillsClient({ allSkills }: { allSkills: SkillMeta[] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let skills = allSkills
    if (category) skills = skills.filter(s => s.category === category)
    if (query.trim()) {
      const q = query.toLowerCase()
      skills = skills.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.slug.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      )
    }
    return skills
  }, [allSkills, category, query])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-4xl font-black">Skills</h1>
        <p className="text-gray-600 mt-1">{allSkills.length} skills — slash commands for Claude Code</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search skills..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full border-2 border-black px-4 py-3 font-bold text-base bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:font-normal placeholder:text-gray-400"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 font-black text-gray-400 hover:text-black text-xl"
          >
            ×
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setCategory(null)}
          className={`neo-btn px-4 py-2 text-sm ${!category ? 'bg-black text-white' : 'bg-white text-black'}`}
        >
          All ({allSkills.length})
        </button>
        {SKILL_CATEGORIES_LIST.map(cat => {
          const count = allSkills.filter(s => s.category === cat).length
          const isActive = category === cat
          return (
            <button
              key={cat}
              onClick={() => setCategory(isActive ? null : cat)}
              className={`neo-btn px-4 py-2 text-sm flex items-center gap-1.5 ${isActive ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
              <span className={`inline-block w-2.5 h-2.5 ${CATEGORY_COLORS[cat]} border border-black`}></span>
              {CATEGORY_LABELS[cat]} ({count})
            </button>
          )
        })}
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <>
          {query && (
            <p className="text-sm text-gray-500 mb-4">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &quot;{query}&quot;
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </>
      ) : (
        <div className="neo-card p-10 text-center">
          <p className="font-bold text-gray-500 mb-2">No skills match &quot;{query}&quot;</p>
          <button onClick={() => { setQuery(''); setCategory(null) }} className="neo-btn px-4 py-2 bg-orange-500 text-black text-sm">
            Clear search
          </button>
        </div>
      )}
    </div>
  )
}
