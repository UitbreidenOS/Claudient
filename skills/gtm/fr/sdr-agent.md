---
name: sdr-agent
description: "AI SDR agent patterns: prospect research, personalised outreach, multi-step sequences, reply handling, meeting booking — with safety limits"
---

> 🇫🇷 Version française. [English version](../sdr-agent.md).

# Compétence Agent SDR

## Quand activer
- Construire un flux de travail de développement commercial alimenté par l'IA
- Automatiser la recherche de prospects et la génération de messages de prospection
- Mettre en place des séquences multi-touches e-mail/LinkedIn avec Claude
- Personnaliser la prospection à grande échelle (pas de simple remplacement de modèles — contexte réel)
- Ajouter des limites de sécurité et des portails d'approbation humaine à l'automatisation de la prospection

## Quand NE PAS utiliser
- Campagnes de spam — le volume sans personnalisation nuit à la délivrabilité et à la réputation
- Automatisation LinkedIn sans comprendre les limites de connexion (100-200/semaine maximum)
- Remplacement de la construction de relations humaines sur des comptes stratégiques
- Industries réglementées avec des exigences strictes de conformité des communications

## Instructions

### La boucle de l'agent SDR

```
Étape 1 : RECHERCHE     — recueillir le contexte sur l'entreprise/le contact
Étape 2 : QUALIFICATION — noter selon l'ICP (Profil Client Idéal)
Étape 3 : PERSONNALISATION — générer un message avec un contexte authentique
Étape 4 : PORTAIL HUMAIN — afficher le brouillon, obtenir l'approbation (pour la première prospection)
Étape 5 : ENVOI         — livrer par e-mail/LinkedIn
Étape 6 : SUIVI         — enregistrer l'activité, gérer les réponses
Étape 7 : RELANCE       — séquencer le prochain contact si pas de réponse
```

### Recherche de prospects (avant d'écrire un seul mot)

```typescript
interface ProspectContext {
  name: string
  title: string
  company: string
  recentNews: string[]       // financement, lancements de produits, nouvelles recrues dirigeants
  linkedInActivity: string[] // publications récentes, commentaires
  techStack: string[]        // depuis BuiltWith, offres d'emploi LinkedIn
  painPoints: string[]       // déduits du contexte
  icpScore: number           // 0-100
}

async function researchProspect(email: string): Promise<ProspectContext> {
  const [contact, company, news] = await Promise.all([
    enrichContactFromEmail(email),          // Clearbit/Apollo/Hunter
    enrichCompanyFromDomain(getDomain(email)),
    searchRecentNews(company.name),         // financement, recrutements, actualités produit
  ])

  const icpScore = scoreICP(contact, company)
  const painPoints = await inferPainPoints(company, contact.title)

  return { ...contact, ...company, recentNews: news, icpScore, painPoints }
}
```

### Notation ICP

```typescript
interface ICPCriteria {
  companySize: [number, number]  // [min, max] employés
  industries: string[]
  titles: string[]               // rôles décisionnaires
  techStack: string[]            // outils qu'ils utilisent
  geographies: string[]
}

function scoreICP(contact: Contact, company: Company, criteria: ICPCriteria): number {
  let score = 0

  // Taille de l'entreprise (30 points)
  const [min, max] = criteria.companySize
  if (company.employees >= min && company.employees <= max) score += 30

  // Correspondance sectorielle (25 points)
  if (criteria.industries.some(i => company.industry.toLowerCase().includes(i))) score += 25

  // Titre/ancienneté (25 points)
  if (criteria.titles.some(t => contact.title.toLowerCase().includes(t))) score += 25

  // Chevauchement tech stack (20 points)
  const overlap = criteria.techStack.filter(t => company.techStack.includes(t))
  score += Math.min(20, overlap.length * 5)

  return score
}
```

### Génération de messages personnalisés

La différence clé entre le spam IA et la véritable personnalisation est la **spécificité**. Claude génère des messages qui font référence exactement à ce qui rend ce prospect pertinent en ce moment.

```typescript
async function generateOutreachMessage(
  prospect: ProspectContext,
  sender: SenderContext,
  template: MessageTemplate
): Promise<string> {
  const prompt = `Write a cold outreach email from ${sender.name} at ${sender.company} to ${prospect.name}.

Context about ${prospect.name}:
- Title: ${prospect.title} at ${prospect.company}
- Recent company news: ${prospect.recentNews.slice(0, 2).join('; ')}
- Their likely pain points: ${prospect.painPoints.join(', ')}
- Why we're relevant: ${template.valueProposition}

Rules:
- Reference ONE specific recent event or achievement (not generic flattery)
- State the value in 1 sentence — what specific outcome we deliver
- Clear, low-friction CTA: "15-minute call this week?" not "I'd love to connect"
- Total length: 5-7 sentences MAX
- No buzzwords: no "synergies", "leverage", "circle back", "reach out"
- First line must NOT start with "I" or "My name is"
- Do not mention competitors

Output: just the email body, no subject line.`

  const { text } = await generateText({ model: anthropic('claude-opus-4-7'), prompt })
  return text
}
```

### Conception de séquences multi-touches

```typescript
const SEQUENCE: SequenceStep[] = [
  {
    day: 0,
    channel: 'email',
    type: 'initial',
    subject: '{{personalised_hook}}',
    waitForReply: true,
  },
  {
    day: 3,
    channel: 'linkedin',
    type: 'connection',
    message: 'Note courte faisant référence à l\'e-mail — 2 phrases maximum',
    waitForReply: true,
  },
  {
    day: 7,
    channel: 'email',
    type: 'followup_1',
    subject: 'Re: {{original_subject}}',
    message: 'Ajouter une nouvelle valeur — étude de cas, point de données pertinent',
    waitForReply: true,
  },
  {
    day: 14,
    channel: 'email',
    type: 'breakup',
    subject: 'Fermeture de la boucle',
    message: 'Reconnaître qu\'ils sont occupés. Laisser la porte ouverte. Pas de culpabilité.',
    waitForReply: false,
  },
]
```

### Limites de sécurité et conformité

```typescript
const SAFETY_LIMITS = {
  linkedInConnectionsPerWeek: 100,    // Limite souple de LinkedIn (dépend du score SSI)
  emailsPerDay: 50,                   // par domaine, pour éviter le marquage spam
  minDelayBetweenMessages: 30_000,    // 30 secondes minimum
  maxFollowUps: 3,                    // jamais plus de 4 contacts au total
  blacklistDomains: [                 // ne jamais contacter
    'competitor.com',
    'investor.com',
  ],
  requireHumanApproval: true,         // montrer le brouillon avant le premier envoi
}

function checkSafetyLimits(prospect: ProspectContext): SafetyResult {
  if (SAFETY_LIMITS.blacklistDomains.includes(getDomain(prospect.email))) {
    return { allowed: false, reason: 'Domain blacklisted' }
  }
  // Vérifier le nombre d'envois quotidiens, le nombre LinkedIn hebdomadaire, etc.
  return { allowed: true }
}
```

### Portail d'approbation humaine

```typescript
async function requestApproval(draft: OutreachDraft): Promise<boolean> {
  console.log('\n=== OUTREACH DRAFT FOR APPROVAL ===')
  console.log(`To:      ${draft.prospect.name} <${draft.prospect.email}>`)
  console.log(`Company: ${draft.prospect.company}`)
  console.log(`Score:   ${draft.prospect.icpScore}/100`)
  console.log(`\nSubject: ${draft.subject}`)
  console.log(`\n${draft.body}`)
  console.log('\nApprove? (y/n/edit): ')

  // Dans un contexte CLI, demander à l'utilisateur
  // Dans une application web, afficher dans un tableau de bord de révision
  const response = await getUserInput()
  return response.toLowerCase() === 'y'
}
```

### Gestion des réponses

```typescript
async function handleReply(reply: EmailReply): Promise<void> {
  const intent = await classifyReply(reply.body)

  switch (intent) {
    case 'interested':
      await bookMeeting(reply.from, reply.threadId)
      await updateCRM(reply.from, { status: 'meeting_booked' })
      break
    case 'not_now':
      await scheduleFutureFollowUp(reply.from, days: 90)
      break
    case 'not_interested':
      await markAsOptedOut(reply.from)
      break
    case 'referral':
      const referredContact = await extractReferral(reply.body)
      await addToSequence(referredContact)
      break
  }
}

async function classifyReply(body: string): Promise<ReplyIntent> {
  const { object } = await generateObject({
    model: anthropic('claude-opus-4-7'),
    schema: z.object({ intent: z.enum(['interested', 'not_now', 'not_interested', 'referral', 'question', 'other']) }),
    prompt: `Classify this email reply intent: "${body}"`,
  })
  return object.intent
}
```

## Exemple

**Utilisateur :** Créer un agent SDR qui prend une liste de fondateurs de startups (nom + URL LinkedIn), recherche chacun, génère un e-mail froid personnalisé sur notre produit (un outil d'analyse B2B), et me montre les brouillons pour approbation avant envoi.

**Résultat attendu :**
- `src/sdr/research.ts` — `researchProspect()` récupérant depuis LinkedIn, Clearbit
- `src/sdr/qualify.ts` — `scoreICP()` selon les critères des fondateurs de startups
- `src/sdr/generate.ts` — `generateOutreachEmail()` avec Claude, faisant référence à l'activité récente
- `src/sdr/approve.ts` — boucle d'approbation CLI affichant le brouillon + contexte du prospect
- `src/sdr/send.ts` — envoie via SendGrid/Resend à l'approbation, enregistre dans HubSpot
- Sécurité : vérifie la liste noire, respecte la limite de 50/jour par e-mail, nécessite une approbation

---

> **Travaillez avec nous :** Claudient est soutenu par [Uitbreiden](https://uitbreiden.com/) — nous créons des produits IA et des solutions B2B avec des communautés de développeurs.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
