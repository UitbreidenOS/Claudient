import { getAllSkills, CATEGORY_LABELS, CATEGORY_COLORS, SKILL_CATEGORIES_LIST } from '@/lib/content'
import { SkillsClient } from './skills-client'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Skills' }

export default function SkillsPage() {
  const allSkills = getAllSkills()
  return <SkillsClient allSkills={allSkills} />
}
