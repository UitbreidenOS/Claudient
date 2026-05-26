# Claude Design — Real-World Best Practices

This guide covers what the official documentation won't: the hard-won patterns from production use. Claude Design runs on Opus 4.7, the most capable and most token-expensive model in the Claude lineup. That changes how you should approach every session.

---

## Token Economics

### The Problem

Claude Design deploys Opus 4.7 for every generation. Opus 4.7 is not a lightweight model — it's the same model class used for complex reasoning and long-context document work. In practice:

- 50–58% of a Pro plan's weekly quota disappears after two moderately complex sessions
- One reviewer building three landing page variations hit 80% of their weekly allowance in 25 minutes
- A session exploring five visual directions can cost as much as a full afternoon of Claude Code work

This is not a complaint — Opus 4.7 produces materially better first drafts than smaller models, and the time savings are real. But treating Claude Design like a free-form sketchpad will crater your quota before the week ends.

### The Five Strategies That Actually Work

**Strategy 1: Build a design system once, inherit it on every project.**

This is the highest-leverage action you can take in Claude Design. A design system setup session is expensive upfront — you're paying to have Opus 4.7 read your codebase, extract your tokens, and understand your component conventions. But every subsequent project session skips that inference work entirely. The model already knows your color ramp, your type scale, your spacing rhythm, and your component vocabulary. Without this, every session starts cold, and Claude Design falls back on its defaults — which are immediately recognizable as generic Claude output.

The one-time cost saves tokens on every future project. If you're building more than two projects in Claude Design, this investment pays off by the third session.

**Strategy 2: Use the Tweaks panel before you prompt.**

The Tweaks panel — typography sliders, color controls, spacing and layout toggles — consumes no chat tokens. This is the most underused capability in Claude Design. A common mistake is prompting "make the heading larger" or "increase the padding between sections" when those exact adjustments are available as free panel controls.

Before writing any refinement prompt, exhaust the Tweaks panel. If the adjustment is there, use it. Reserve chat prompts for structural changes, content changes, and things the panel cannot handle — new components, layout reorganization, variant exploration.

**Strategy 3: Write dense, batched prompts.**

Three related requests in one paragraph cost roughly the same as one request. Three separate messages cost three times as much and each one adds context overhead to subsequent messages.

Instead of:
```
Make the hero section bigger.
```
```
Also change the CTA to use our primary blue.
```
```
And add a subtitle under the main heading.
```

Write:
```
Hero section: increase vertical padding to give the headline more breathing room,
change the CTA button to primary brand blue (#0057FF), and add a 16px subtitle
line under the main H1 describing the product in one sentence.
```

This approach also reduces the chance of Claude Design misinterpreting an instruction that contradicts a previous one — when the full intent is visible in one pass, the model resolves conflicts itself.

**Strategy 4: Reset sessions proactively.**

A Claude Design session accumulates context as it runs. Early messages, rejected variations, and correction cycles all stay in the context window. By session message 15, you're paying to re-process all of that context on every generation — even if the early iterations are irrelevant to your current goal.

When you've validated a direction and want to continue refining a specific component or section, start a fresh session. Bring in a tight summary of what you established (your design system file, a screenshot of the approved direction, and a one-paragraph brief). The fresh session costs less per generation and produces cleaner output because the model isn't working around a cluttered history.

**Strategy 5: Use external tools to sketch before uploading.**

Image uploads are context-expensive. A rough layout sketch from Google Stitch, a wireframe in any tool, or even a plaintext ASCII-art layout description gives Claude Design spatial intent without the cost of processing a high-resolution image in the first message.

Describe the structure in text: "Three-column grid at desktop, single column at mobile. Left column: logo + nav. Center: hero headline + CTA. Right: product screenshot." This often produces a better first draft than an unclear image upload and costs a fraction of the context.

---

## Avoiding the "Claude Aesthetic"

### What It Looks Like

Without design constraints, Opus 4.7 trained on a large corpus of web design defaults to a recognizable visual fingerprint: serif headings paired with sans-serif body text, card-heavy layouts with subtle drop shadows, colored left-side accent bars on sections, and a muted pastel color palette. It's competent. It's also immediately identifiable as AI-generated output to anyone who has used these tools for more than a week.

This default aesthetic is not wrong — it's just generic. If generic works for your project, skip this section. If you need distinctive output, the default requires active suppression.

### Techniques That Work

**Upload finished product screenshots, not brand specs.**

Brand guidelines describe rules. Finished screenshots show visual results. Claude Design learns more from seeing how your brand actually looks in production than from reading typographic hierarchy rules. Upload a screenshot of your live homepage, your most polished marketing email, or your most recent pitch deck slide. This gives the model concrete visual evidence of what your brand resolves to in practice.

**Reference cultural aesthetics with specificity.**

Generic aesthetic references ("modern", "clean", "professional") produce Claude's interpretation of those terms, which loops back to the default aesthetic. Specific cultural aesthetics give the model a concrete visual vocabulary to work from:

- "Swiss editorial design — Neue Haas Grotesk, tight leading, strong grid, high contrast, no decorative elements"
- "1980s brutalist print — heavy black borders, industrial typefaces, dense information hierarchy"
- "Solarpunk — warm earth tones, organic curves, community-first visual language"
- "Scandinavian minimalism — muted natural palette, generous whitespace, functional over decorative"

These references constrain the model to a specific visual tradition. The output may need refinement, but it starts somewhere distinctive.

**Explicitly deny defaults in your brief.**

State what you don't want as clearly as what you do want. Add a constraint block to every initial prompt:

```
Do not use: card layouts, colored accent bars, pastel backgrounds, serif/sans-serif
headline pairings, or centered hero sections with a single CTA. Make choices that
feel specific to this product's context, not generic SaaS startup defaults.
```

Denial constraints are not defensive — they're load-bearing. Without them, the model fills unconstrained decisions with defaults.

**Ask for distinctive, context-specific choices explicitly.**

Instruct the model to reason about the product context when making visual decisions. "Choose typography that reflects what this product does — a developer tool, a financial dashboard, a consumer fitness app — not what generic design sites recommend." This prompt pattern produces output that tries to be contextually appropriate rather than aesthetically safe.

---

## Prompting Techniques

### What Actually Works

**Dense single-paragraph prompts produce a usable first draft roughly 66% of the time.** The other 34% requires one targeted refinement pass. Multi-pass vague iteration — "make it better", "try something different", "I don't like this" — produces mediocre output and expensive context.

**The three-version pattern.** Ask for variations upfront rather than iterating sequentially:

```
Generate three versions of this landing page hero section. Each version should take
a meaningfully different visual direction — different layout structure, not just
different colors. Label them A, B, and C.
```

Claude Design renders all three in one pass. You then identify the best elements from each and compose a synthesis:

```
Apply version A's typography and headline hierarchy to version B's layout structure.
Keep version C's CTA button treatment.
```

This is faster and cheaper than sequential iteration, and it produces better results because you're working from a range of options rather than incrementally nudging one direction.

**Inline comments for targeted precision.** Click an element, add a comment, describe exactly what changes for that element only. This constrains the generation scope — the model knows you're not asking for a full redesign. Use this for typography tweaks, color adjustments, spacing corrections, and copy changes.

Known behavior: inline comments occasionally disappear from the interface after generation. If this happens, paste the comment content into the chat as a targeted follow-up prompt rather than starting over.

**Draw mode for layout restructuring.** When you need to reposition major sections — move the sidebar from left to right, shift the nav from top to bottom, create a split-screen layout — use Draw mode to indicate spatial intent directly. Drawing is faster than describing spatial relationships in text and produces more accurate layout changes than chat prompts for structural moves.

**Device preview toggle.** Switch between phone, tablet, and desktop views at any time. This costs no tokens. Before prompting for responsive fixes, check whether the issue is actually visible in the current breakpoint — many responsive problems that look severe at desktop are already handled at mobile, or vice versa.

### What to Specify in Your Initial Brief

Every strong initial prompt includes:

- **Success criteria**: what does "done" look like? ("The hero section should communicate the product value prop without requiring the user to scroll")
- **Output constraints**: format, dimensions, component count, content length
- **What stays fixed**: "Keep the navigation structure exactly as described — do not add or remove nav items"
- **What can change**: "Color palette, typography, spacing, and section ordering are all open"
- **One or two non-negotiables**: "The primary CTA must be visible above the fold on desktop"

### What to Avoid

- Subjective adjectives without referents: "more premium", "feels trustworthy", "looks modern" — all interpreted by the model's priors
- Contradictory constraints without resolution: "minimal but information-dense" — specify which wins when they conflict
- Open-ended structure prompts late in a session: asking for a full layout restructure after 10 messages of refinement produces expensive and often inconsistent output
- Correction loops without clear direction: "I don't like this" without specifying what's wrong wastes a generation pass

---

## Session Management

Treat each Claude Design session as planned production work, not open-ended exploration. The token cost makes unstructured sessions expensive. Sessions with clear scope and preparation produce better output at lower cost.

### Before the Session

List every component or section you need to produce in this session. Write them down. Batch related components into a single prompt where possible — a card component and its empty state are one prompt, not two.

Decide what assets you're uploading. Design system file, reference screenshots, codebase token file — assemble these before starting. Uploading mid-session adds context overhead.

Define the output you need to validate direction. You don't need pixel-perfect output to confirm you're going in the right direction. Know the minimum that tells you the approach is working, and stop refining when you reach it.

### During the Session

Use the Tweaks panel first. Always. Check whether the adjustment you want is available as a free slider before writing a prompt.

Batch related changes. If you have three refinements queued, write them all in one message.

Watch your session length. After 10–12 message exchanges, consider whether a fresh session would be faster. If you're generating a fundamentally new component or direction, it almost certainly will be.

### When to Export

Export when:
- The visual direction is validated (stakeholder or self-review has confirmed the approach)
- Core layout and information hierarchy are established
- The component structure is clear enough for Claude Code to reason about

Do not export when:
- You're still exploring fundamentally different directions
- Major structural changes remain
- You're making iterative refinements that could be done more cheaply in Claude Code directly

The handoff bundle is not a pixel-perfect spec. Claude Code will adapt it for responsive behavior, component library conventions, and production constraints. Expecting pixel-perfect output from Claude Design before handing off adds cost without proportional value.

### After Exporting

Do not re-export after implementation begins. Modifications after handoff happen in Claude Code directly — re-exporting creates a second source of truth and breaks the design-to-code relationship. If a major design change is needed post-handoff, treat it as a new design session for that specific component, not a full re-export.

---

## Design System Setup

This section deserves its own treatment because it is the single action most likely to improve both output quality and token efficiency for teams using Claude Design across multiple projects.

### Why It Matters

Without a design system in Claude Design, every session produces output calibrated to generic web design conventions. The model doesn't know your color ramp, your type scale, your component vocabulary, or your spacing rhythm. It defaults to its trained aesthetic. You spend tokens correcting it toward your brand on every session.

With a design system, every session starts on-brand. The model knows your tokens and can apply them without correction. Refinement passes focus on layout and content rather than brand alignment.

### What to Upload

Upload in this order of priority:

1. Your `tokens.json` or CSS custom properties file — direct machine-readable token definitions are the highest-fidelity input
2. Your `tailwind.config.js` or equivalent theme configuration — gives Claude Design your utility class mappings and breakpoints
3. Finished screenshots of your live product or most recent release — visual evidence of what your brand resolves to in practice
4. Your Storybook URL or component screenshots — establishes which components already exist and what they look like
5. Your brand PDF or style guide — for tone, logo usage, and typographic hierarchy rules

### What Claude Design Extracts

From these inputs, Claude Design extracts:
- Color tokens with semantic naming (primary, secondary, destructive, muted, etc.)
- Typography scale (size ramp, weight conventions, line-height rules)
- Spacing system (your base unit, common spacing values)
- Component conventions (existing component names, variants, states)
- Grid and layout patterns (column counts, gutter widths, max-width constraints)

### Validating the Setup

Before using the design system in production sessions, generate one test component — something simple and well-defined, like a button in all states or a card component. Review whether the output accurately reflects your brand tokens and component conventions. If not, identify what's missing from your uploads and refine the setup before continuing.

Validation costs tokens. Budget for one test session per design system setup.

### Maintenance

When your design system evolves — new color tokens, new component patterns, updated typography — update your Claude Design setup files to match. A stale design system setup produces output that diverges from your current production design over time.

---

## Variation Exploration

### Ask for Variations Upfront

Requesting three variations in the initial prompt costs roughly the same as requesting one — Claude Design renders all in one generation pass. Sequential variation exploration (generate one, reject it, generate another) costs three times as much and accumulates context overhead.

### Blending Variations

After reviewing three variations, use the Tweaks panel and targeted chat prompts to blend features from different versions. This is free for panel-adjustable properties and cheap for chat-driven changes because the scope is narrow and the intent is clear.

Document what you're taking from each version before making changes: "Version A's color treatment, version B's layout structure, version C's CTA hierarchy." This brief is also useful for the handoff bundle annotation.

### Document Before Closing

Before ending a session, note:
- Which direction was selected and why
- What was rejected and why
- What refinements remain for the next session
- Any design decisions that need stakeholder review

This documentation lives outside Claude Design (a note, a project file, a brief). Claude Design session history is not a reliable design record.

---

## Real Productivity Data

Community research across freelancers, agencies, and product teams using Claude Design in 2025–2026 produced these benchmarks. These numbers vary by project complexity and designer experience, but the directional patterns are consistent.

| Task | Without Claude Design | With Claude Design | Savings |
|------|----------------------|-------------------|---------|
| Product prototype (3–5 screens) | 14 hours | 3.5 hours | 75% |
| Freelance project delivery | Baseline | 3.8x faster | — |
| Agency client handoff preparation | Baseline | 62% faster | — |
| Landing page (idea to deployable HTML) | Multiple days | 45 minutes | — |
| Pitch deck (full presentation) | 4–6 hours | Under 30 minutes | — |
| Mobile app flow (3–5 screens) | 1–2 days | 1–2 hours | — |

These numbers represent time savings, not quality equivalence. Claude Design output typically requires implementation work in Claude Code for production readiness. The savings are in exploration, alignment, and validated direction — not finished production assets.

---

## When Claude Design Fails

Understanding the failure modes before you hit them saves time and quota.

**Absence of a design system.** This is the most common failure mode. Without a design system, Claude Design cannot produce on-brand output. Every session requires complete restyle corrections. Teams that skip design system setup spend their session tokens on brand correction rather than design exploration. If you need on-brand output and cannot set up a design system, Claude Design is not the right tool for that project.

**Overly complex briefs with contradictory constraints.** A brief with 10+ specific requirements that conflict with each other produces output that satisfies none of them. The model resolves contradictions according to its training priors, not your intent. If your brief has more than 6–7 hard constraints, prioritize them explicitly and drop the lowest-priority ones from the initial prompt.

**Data visualization.** Claude Design prioritizes aesthetic quality over data usability in chart and graph output. A bar chart will look beautiful. The axis labels may be unreadable at scale, the color choices may be inaccessible, and the data-to-ink ratio may be poor. If you're generating data visualization, add explicit correction prompts: "Prioritize readability and accessibility over aesthetics. Ensure all labels are legible at this resolution."

**Custom illustrations.** Claude Design is not an illustration tool. It can place illustration-style elements and suggest illustration concepts, but precise custom illustration work — custom icons, brand mascots, complex infographics — requires a real design tool. Use Claude Design to specify the illustration brief, then execute in Figma, Illustrator, or a specialized AI illustration tool.

**Multiplayer and team review workflows.** Claude Design has no real-time collaboration. One person drives the session. If your team needs simultaneous editing, comment threads, version history accessible to multiple stakeholders, or Dev Mode measurements — use Figma. Claude Design does not compete with Figma on collaboration.

---

## Handoff to Claude Code — The Right Moment

The handoff decision is where most time is lost. Teams either export too early (before direction is clear, causing rework) or too late (spending tokens pixel-perfecting in Claude Design when Claude Code would handle it in minutes).

### Export When These Are True

- **Visual direction is validated**: at least one stakeholder (or you, for solo projects) has confirmed the approach is correct
- **Core layout is established**: the information hierarchy, section structure, and primary user flow are clear
- **Component structure is clear**: Claude Code can reason about what components exist and how they relate
- **Content is close enough**: placeholder content is fine; the structure and relative sizing of content areas are established

### Do Not Export When

- You're still exploring whether a fundamentally different approach is better
- The design has major structural questions unresolved ("should this be a sidebar or a top nav?" is a structural question — resolve it before handing off)
- You're making small iterative refinements that Claude Code handles more cheaply directly

### What Happens at Handoff

The handoff bundle contains layout specs, design tokens, component annotations, and responsive breakpoint notes. Claude Code uses this to implement the design — but it will adapt the layout for real component libraries, real breakpoint behavior, and production constraints. Some deviation from the visual design is expected and correct. Treat the bundle as a strong brief, not a pixel-perfect specification.

After handoff begins, modify in Claude Code. Do not re-export and re-handoff for incremental changes — this creates two sources of truth and makes the implementation harder to maintain.

---

## Checklists

### Before Your First Session

- [ ] Design system files assembled: `tokens.json` or CSS variables, `tailwind.config.js` or theme config
- [ ] Reference screenshots collected: live product, most recent designs, key brand examples
- [ ] Design system setup session completed and validated with one test component
- [ ] Session scope defined: list of components or screens this session will produce
- [ ] Brief written: success criteria, output constraints, non-negotiables, what can change
- [ ] External layout sketch done (optional): rough structure described in text or roughed in Google Stitch

### Per-Session Checklist

- [ ] Tweaks panel checked before writing refinement prompts
- [ ] Requests batched: related changes combined into single messages
- [ ] Three-version exploration used for first draft of new components
- [ ] Session length monitored: fresh session started if history is growing stale
- [ ] Inline comments used for element-level precision rather than full-generation prompts
- [ ] Rejected directions documented (what was tried, why it was rejected)

### Before Handing Off to Claude Code

- [ ] Visual direction validated (stakeholder sign-off or self-review complete)
- [ ] Core layout and information hierarchy established
- [ ] Component structure clear: what exists, what's nested, what's a standalone element
- [ ] Handoff bundle exported and reviewed: confirm `layout.json`, `tokens.json`, `components.md`, and `preview.png` are present
- [ ] Implementation notes added to bundle: anything Claude Code should know that isn't visible in the layout spec
- [ ] Team informed: anyone touching the codebase knows the handoff is in progress and where the bundle lives
