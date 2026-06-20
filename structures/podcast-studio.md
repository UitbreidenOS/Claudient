# Podcast Studio Operations — Project Structure

> For podcast creators and multi-show networks managing the full production lifecycle — from guest booking and recording through editing, distribution, monetization, and community growth — in a single Claude Code workspace.

## Stack

- **Remote recording:** Riverside.fm (separate audio/video tracks, local recording) or SquadCast (similar; preferred for audio-only shows)
- **Editing + transcription:** Descript (word-based editing, Studio Sound, overdub, transcript export)
- **Hosting + RSS:** Buzzsprout (single show, analytics, Spotify/Apple auto-submit) or RSS.com (multi-show; supports IAB-certified download stats)
- **Multi-show management:** Transistor (multiple shows under one account, team access, private podcasts)
- **Website:** Podpage (auto-generated from RSS feed; episode pages, guest bios, listener reviews)
- **Distribution:** Spotify for Podcasters, Apple Podcasts Connect, YouTube (video podcast + clips)
- **Email list:** ConvertKit (automation sequences, episode broadcasts, premium subscriber segments)
- **Premium content + payments:** Stripe (subscription billing for bonus episodes, ad-free feeds)
- **Audiogram / social clips:** Descript (clip export), Headliner (audiograms with waveform), CapCut (short-form video reels)
- **Scheduling:** Calendly (guest booking, automated reminders) linked to Riverside.fm session invite
- **Analytics:** Buzzsprout/Transistor built-in stats, Chartable (cross-platform attribution), Spotify for Podcasters dashboard

## Directory tree

```
podcast-studio/
├── .claude/
│   ├── CLAUDE.md                              # Workspace instructions for Claude Code
│   ├── settings.json                          # MCP servers, hooks, permissions
│   └── commands/
│       ├── new-episode.md                     # /new-episode — scaffold episode folder + brief
│       ├── show-notes.md                      # /show-notes — generate show notes from transcript
│       ├── social-promo.md                    # /social-promo — create platform-native social posts
│       ├── guest-outreach.md                  # /guest-outreach — draft personalized pitch email
│       ├── sponsor-pitch.md                   # /sponsor-pitch — write sponsorship proposal from kit
│       ├── newsletter-episode.md              # /newsletter-episode — convert show notes to ConvertKit email
│       └── performance-review.md              # /performance-review — summarize episode analytics
├── episodes/
│   ├── _template/                             # Copy this folder when starting a new episode
│   │   ├── brief.md                           # Guest + topic context, angle, key questions
│   │   ├── outline.md                         # Segment-by-segment talk track (intro, questions, close)
│   │   ├── shownotes.md                       # Published show notes: summary, links, chapters
│   │   ├── transcript.md                      # Descript-exported cleaned transcript
│   │   ├── social-promo.md                    # LinkedIn, Twitter/X, Instagram, YouTube description
│   │   └── performance.md                     # Download counts, listener retention, ratings delta
│   ├── ep001-[guest-slug]/
│   │   ├── brief.md                           # Pre-call research + question stack
│   │   ├── outline.md                         # Segment timing, ad placement markers
│   │   ├── recorded-2026-05-14.md             # Recording session notes (tech issues, key timestamps)
│   │   ├── shownotes.md                       # Final published show notes with chapter timestamps
│   │   ├── transcript.md                      # Full Descript transcript, speaker-labeled
│   │   ├── social-promo.md                    # All social copy variants for launch week
│   │   └── performance.md                     # 7/30/90-day download stats + listener feedback
│   ├── ep002-[guest-slug]/
│   │   ├── brief.md
│   │   ├── outline.md
│   │   ├── recorded-2026-05-28.md
│   │   ├── shownotes.md
│   │   ├── transcript.md
│   │   ├── social-promo.md
│   │   └── performance.md
│   └── ep003-[topic-slug]/                    # Solo episode — no guest; brief covers research only
│       ├── brief.md
│       ├── outline.md
│       ├── recorded-2026-06-04.md
│       ├── shownotes.md
│       ├── transcript.md
│       ├── social-promo.md
│       └── performance.md
├── production/
│   ├── recording-sop.md                       # Riverside.fm session checklist (mic check, backup rec)
│   ├── editing-checklist.md                   # Descript edit steps: clean, Studio Sound, chapters, export
│   ├── distribution-checklist.md              # Buzzsprout upload, Spotify/Apple submit, Podpage refresh
│   ├── thumbnail-specs.md                     # Cover art sizes: 3000x3000px (podcast), 1280x720px (YT)
│   ├── audio-settings.md                      # Export specs: 128kbps MP3, 44.1kHz, stereo, -16 LUFS
│   └── release-schedule.md                   # Weekly/bi-weekly calendar, episode queue, publishing times
├── guests/
│   ├── prospect-list.md                       # Ranked list of target guests with contact info + notes
│   ├── outreach-templates.md                  # Cold pitch, warm intro, and follow-up email templates
│   ├── prep-guide.md                          # Guest prep doc: format, tech setup, Riverside.fm link
│   ├── post-interview-followup.md             # Thank-you email + social share ask template
│   ├── booking-tracker.md                     # Pipeline: prospecting / pitched / booked / recorded / aired
│   └── past-guests/
│       ├── [guest-slug].md                    # Per-guest: bio, episode link, social handles, feedback
│       └── vip-guests.md                      # High-value guests worth re-booking or cross-promoting
├── marketing/
│   ├── social-templates/
│   │   ├── linkedin-episode-launch.md         # LinkedIn post template for new episode drops
│   │   ├── twitter-thread-template.md         # Twitter/X thread structure for key episode takeaways
│   │   ├── instagram-caption-template.md      # IG caption with audiogram context + CTA
│   │   ├── youtube-description-template.md    # YT video description with chapters + links
│   │   └── tiktok-hook-template.md            # 3-second hook scripts for TikTok/Reels clips
│   ├── clip-strategy.md                       # Which moments to clip, clip length per platform, tools
│   ├── newsletter-promo.md                    # ConvertKit episode broadcast template + subject lines
│   ├── cross-promo-tracker.md                 # Guest swaps, ad reads, and co-marketing partnerships
│   └── launch-playbook.md                     # Full release-week campaign: day-by-day posting schedule
├── monetization/
│   ├── sponsor-kit.md                         # One-pager: show stats, audience demographics, ad formats
│   ├── ad-rates.md                            # Pre-roll / mid-roll / post-roll CPM rates by tier
│   ├── sponsor-tracker.md                     # Active sponsors: contract dates, deliverables, payment status
│   ├── premium-content.md                     # Stripe subscription tiers, bonus episode cadence, perks
│   └── affiliate-tracker.md                   # Affiliate partners, unique links, commission rates, payouts
└── analytics/
    ├── episode-performance.md                 # Per-episode table: downloads, completion rate, ratings
    ├── growth-dashboard.md                    # Monthly subscriber growth, platform breakdown, top episodes
    ├── audience-survey-2026-q1.md             # Listener survey results + key insights
    └── benchmarks.md                          # Industry CPD benchmarks, download targets by show tier
```

## Key files explained

| Path | Purpose |
|---|---|
| `episodes/_template/brief.md` | Pre-recording research doc: guest bio, past content, talking points, 10-12 interview questions organized by segment; copy to new episode folder before every recording |
| `episodes/_template/shownotes.md` | Published show notes template with summary paragraph, key takeaways, guest bio block, resource links, chapter timestamps, and transcript link; drives Buzzsprout episode description |
| `production/recording-sop.md` | Step-by-step Riverside.fm session checklist covering mic levels, local recording backup, network test, permissions, and contingency if a guest's connection drops |
| `production/editing-checklist.md` | Descript editing workflow: remove filler words, apply Studio Sound, set chapter markers, add intro/outro music, export at correct LUFS, and upload to Buzzsprout |
| `production/distribution-checklist.md` | Post-edit publish checklist: Buzzsprout upload settings, Spotify/Apple submit confirmation, Podpage cache refresh, YouTube upload, and newsletter trigger in ConvertKit |
| `guests/prospect-list.md` | Scored list of target guests with column for relevance, audience size, relationship warmth, and outreach status — the single source of truth for guest pipeline |
| `monetization/sponsor-kit.md` | Pitch deck in Markdown: show description, listener demographics (age, role, income), download stats, ad format options, sample ad scripts, and testimonials from past sponsors |
| `analytics/growth-dashboard.md` | Monthly snapshot of total subscribers, per-platform download split, top 5 episodes, average downloads per episode in first 7 days, and MoM growth percentage |

## Quick scaffold

```bash
# Create workspace root
mkdir -p podcast-studio && cd podcast-studio

# Claude Code directories
mkdir -p .claude/commands

# Episode template
mkdir -p episodes/_template
touch episodes/_template/brief.md
touch episodes/_template/outline.md
touch episodes/_template/shownotes.md
touch episodes/_template/transcript.md
touch episodes/_template/social-promo.md
touch episodes/_template/performance.md

# First three episode stubs
for ep in ep001-guest-placeholder ep002-guest-placeholder ep003-solo-placeholder; do
  mkdir -p "episodes/$ep"
  for f in brief.md outline.md shownotes.md transcript.md social-promo.md performance.md; do
    touch "episodes/$ep/$f"
  done
done

# Production SOPs
mkdir -p production
touch production/recording-sop.md
touch production/editing-checklist.md
touch production/distribution-checklist.md
touch production/thumbnail-specs.md
touch production/audio-settings.md
touch production/release-schedule.md

# Guest pipeline
mkdir -p guests/past-guests
touch guests/prospect-list.md
touch guests/outreach-templates.md
touch guests/prep-guide.md
touch guests/post-interview-followup.md
touch guests/booking-tracker.md
touch guests/past-guests/vip-guests.md

# Marketing assets
mkdir -p marketing/social-templates
touch marketing/social-templates/linkedin-episode-launch.md
touch marketing/social-templates/twitter-thread-template.md
touch marketing/social-templates/instagram-caption-template.md
touch marketing/social-templates/youtube-description-template.md
touch marketing/social-templates/tiktok-hook-template.md
touch marketing/clip-strategy.md
touch marketing/newsletter-promo.md
touch marketing/cross-promo-tracker.md
touch marketing/launch-playbook.md

# Monetization
mkdir -p monetization
touch monetization/sponsor-kit.md
touch monetization/ad-rates.md
touch monetization/sponsor-tracker.md
touch monetization/premium-content.md
touch monetization/affiliate-tracker.md

# Analytics
mkdir -p analytics
touch analytics/episode-performance.md
touch analytics/growth-dashboard.md
touch analytics/benchmarks.md

# Initialize config files
touch .claude/CLAUDE.md
touch .claude/settings.json

# Install podcast production skills
npx claudient add skill productivity/stakeholder-comms
npx claudient add skill productivity/doc-site-builder
npx claudient add skill data-ml/stakeholder-report
npx claudient add skill marketing/social-media-manager
npx claudient add skill small-business/content-repurposer

# Add custom slash commands
npx claudient add command new-episode
npx claudient add command show-notes
npx claudient add command social-promo
npx claudient add command guest-outreach
npx claudient add command sponsor-pitch
npx claudient add command newsletter-episode
npx claudient add command performance-review

echo "Podcast studio workspace ready."
```

## CLAUDE.md template

```markdown
# Podcast Studio — Claude Instructions

## What this is

This workspace manages end-to-end podcast operations: guest prospecting, pre-interview
research, recording session prep, editing workflow, show notes production, multi-platform
distribution, social clip strategy, email marketing, sponsorship sales, and analytics.

The show publishes weekly. All episode work lives in episodes/<ep-slug>/. Do not draft
anything outside that structure.

## Stack

- Remote recording: Riverside.fm — separate audio/video tracks, local backup enabled
- Editing + transcription: Descript — word-based editing, Studio Sound noise removal
- Hosting: Buzzsprout — RSS feed, Spotify/Apple auto-distribution, download analytics
- Website: Podpage — auto-generated from Buzzsprout RSS; refresh after each publish
- Email: ConvertKit — episode broadcast sequence, premium subscriber segment (tag: premium)
- Payments: Stripe — $9/month premium tier (bonus episodes, ad-free feed)
- Distribution: Spotify for Podcasters, Apple Podcasts Connect, YouTube (video podcast)
- Clips: Descript (clip export), Headliner (audiograms), CapCut (Reels/TikTok)
- Analytics: Buzzsprout stats + Chartable (cross-platform attribution)

## Directory conventions

- episodes/<ep-slug>/ — one folder per episode; copy from episodes/_template/
- episodes/_template/ — master template; never publish directly from this folder
- production/ — SOPs and checklists; update when the workflow changes, not per episode
- guests/ — prospect pipeline and templates; past-guests/ for archived per-guest records
- marketing/social-templates/ — reusable frameworks; populate per episode in episode folder
- monetization/ — live sponsor contracts in sponsor-tracker.md; rates in ad-rates.md
- analytics/ — update episode-performance.md at day 7 and day 30 post-publish

## Episode folder naming

Format: ep<NNN>-<guest-or-topic-slug>
Examples: ep042-sarah-jones, ep043-ai-in-healthcare, ep044-solo-q-and-a

## Common tasks — exact commands

**Scaffold a new episode folder:**
/new-episode number=043 guest="First Last" topic="[topic]" record-date="YYYY-MM-DD"

**Generate show notes from transcript:**
/show-notes transcript=episodes/ep043-[slug]/transcript.md guest="First Last" links="[comma-separated URLs]"

**Create launch-week social copy:**
/social-promo episode=episodes/ep043-[slug]/shownotes.md platforms="linkedin,twitter,instagram,youtube"

**Draft a guest outreach email:**
/guest-outreach guest="First Last" company="[Company]" topic="[pitch angle]" warm="[mutual contact or no]"

**Write a sponsorship proposal:**
/sponsor-pitch sponsor="[Brand]" format="mid-roll" episodes=4 rate=episodes

**Generate ConvertKit episode email:**
/newsletter-episode shownotes=episodes/ep043-[slug]/shownotes.md subject-variants=3

**Pull episode performance summary:**
/performance-review episode=episodes/ep043-[slug]/performance.md period=30d

## Recording conventions

- Riverside.fm: always enable local recording backup before starting; check guest's mic in
  first 30 seconds; stop and re-record if audio is below -24 LUFS peak
- Audio export from Descript: 128kbps MP3, 44.1kHz, stereo, -16 LUFS integrated
- Episode file naming for Buzzsprout upload: show-name-ep043-guest-slug.mp3
- Timestamps in transcript.md use HH:MM:SS format; chapter markers match shownotes.md

## Show notes conventions

- Summary: 3-4 sentences, no fluff, front-load the guest's main insight
- Key takeaways: 3-5 bullet points, each actionable or quotable
- Guest bio: 2 sentences max, link to their site and LinkedIn
- Resources: every link mentioned in the episode, labeled clearly
- Chapter timestamps: every segment boundary, minimum 5 chapters per episode
- CTA: one primary CTA (subscribe, review, or premium) — never stack three CTAs

## Distribution checklist (run after Buzzsprout upload)

1. Confirm Spotify auto-submit delivered within 4 hours of publish
2. Submit to Apple Podcasts Connect if manual approval required
3. Refresh Podpage (Settings > Refresh Feed)
4. Upload video version to YouTube with description from social-promo.md
5. Schedule ConvertKit broadcast for 8 AM listener timezone (Tuesday preferred)
6. Post social clips: LinkedIn same day, Twitter/X thread day 2, Instagram day 3
7. Log episode in analytics/episode-performance.md

## Monetization conventions

- Ad placements: pre-roll 60s (max), mid-roll 90s at the 20-minute mark, post-roll 30s
- Host-read ads only — no dynamically inserted ads below 10k downloads/episode
- Sponsor copy lives in the episode outline.md under "AD BREAK" markers
- New sponsor rates require approval; use ad-rates.md tiers, never negotiate below floor
- Log every deliverable and payment in monetization/sponsor-tracker.md same day

## Analytics cadence

- Day 7 post-publish: log downloads in analytics/episode-performance.md
- Day 30: update with 30-day total and completion rate from Spotify for Podcasters
- Monthly: update analytics/growth-dashboard.md with subscriber count and MoM delta
- Quarterly: run listener survey; archive results in analytics/audience-survey-YYYY-QN.md
```

## MCP servers

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/${USER}/podcast-studio"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_PERSONAL_ACCESS_TOKEN}"
      }
    },
    "convertkit": {
      "command": "npx",
      "args": ["-y", "@convertkit/mcp-server"],
      "env": {
        "CONVERTKIT_API_KEY": "${CONVERTKIT_API_KEY}",
        "CONVERTKIT_API_SECRET": "${CONVERTKIT_API_SECRET}"
      }
    },
    "stripe": {
      "command": "npx",
      "args": ["-y", "@stripe/agent-toolkit"],
      "env": {
        "STRIPE_SECRET_KEY": "${STRIPE_SECRET_KEY}"
      }
    }
  }
}
```

## Recommended hooks

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_FILE_PATH\"; if [[ \"$FILE\" == */episodes/*/shownotes.md ]]; then echo \"[hook] Show notes saved: $FILE — run /social-promo and /newsletter-episode before publishing\"; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_FILE_PATH\"; if [[ \"$FILE\" == */monetization/sponsor-tracker.md ]]; then echo \"[hook] Sponsor tracker updated: verify ad-rates.md alignment and confirm deliverable dates\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'cd \"${CLAUDE_PROJECT_DIR}\" && MISSING=$(find episodes/ -mindepth 2 -name \"transcript.md\" -empty 2>/dev/null | wc -l | tr -d \" \"); [ \"$MISSING\" -gt 0 ] && echo \"[reminder] $MISSING episode(s) have empty transcript.md — export from Descript and paste in\" || true'"
          }
        ]
      }
    ]
  }
}
```

## Skills to install

```bash
npx claudient add skill productivity/stakeholder-comms
npx claudient add skill productivity/doc-site-builder
npx claudient add skill productivity/process-mapper
npx claudient add skill productivity/vendor-evaluator
npx claudient add skill data-ml/stakeholder-report
npx claudient add skill marketing/social-media-manager
npx claudient add skill small-business/content-repurposer
```

## Related

- [Guide: Claude for Content Creators](../guides/for-content-marketer.md)
- [Workflow: Content Creation end-to-end](../workflows/content-creation.md)
