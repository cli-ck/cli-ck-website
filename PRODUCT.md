# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: terminal-native power developers — people who already live in a keyboard-driven, terminal-first workflow and want AI woven into that existing habit rather than a separate app to context-switch into. Speed, minimal footprint, and staying "in flow" matter more to them than a feature checklist.

Secondary (confirmed, lower priority): privacy/local-first developers evaluating cli-ck specifically because it can run fully offline (LM Studio) or BYOK with no telemetry/accounts; and general AI-coding-assistant shoppers comparing cli-ck against tools like Cursor, Copilot, or Warp, for whom terminal-first is one factor among several.

## Product Purpose

cli-ck (the product, in a separate repo `cli-ck/cli-ck`) is a desktop app combining a terminal, code editor, file explorer, live web preview, and AI agents in a single ~7 MB binary for macOS, Linux, and Windows. This repo (`cli-ck-website`) is the marketing/docs site for it — no backend, statically exported.

Success for the site: a terminal-native developer lands, understands cli-ck is fast/small/AI-native (not Electron-bloated), and downloads or reads docs. Success for the product: the app is genuinely usable as a plain terminal with AI available but never mandatory.

## Positioning

The mechanism a competitor can't truthfully copy: **tiny native footprint** — ~7 MB single binary, ~300 ms cold start, built on Rust + Tauri instead of Electron. Terminal, editor, AI agents, and live web preview are unified in that one small binary, without the resource/bundle-size tax that Electron-based competitors (VS Code forks, Cursor, Warp, etc.) carry.

Secondary, also confirmed as a real differentiator: no backend, no accounts, no telemetry. AI is BYOK (OpenAI, Anthropic, Google, Groq, Cerebras, xAI, or any OpenAI-compatible endpoint) or fully local via LM Studio — nothing phones home.

## Operating Context

- The AI terminal/editor itself runs as a native desktop app (macOS/Linux/Windows); this website is where a developer first evaluates and downloads it, or later checks docs/changelog.
- Site is statically exported (`output: 'export'`) and hosted under a GitHub Pages subpath (`/cli-ck-website`), per `next.config.mjs` and `CLAUDE.md` — README's "Deployed on Vercel" line appears stale against this; flag rather than trust if it matters to a task.
- Docs (Fumadocs) cover: Overview/getting started, Features (terminal, editor, explorer, source control, preview, themes, notifications), AI (providers, composer, terminal agents, plans & subagents, sessions & memory, security), and Reference (shortcuts, settings, shell integration, workspaces, data).
- Live GitHub star count is fetched client/server-side from the GitHub API on the homepage (optional `GITHUB_TOKEN` raises rate limit).

## Capabilities and Constraints

- Free and open source, Apache-2.0, both the app (`cli-ck/cli-ck`) and this website (`cli-ck/cli-ck-website`).
- No accounts, no hosted backend, no telemetry for the product itself.
- AI is fully optional — cli-ck is usable as a plain terminal with zero AI configured.
- Stack (product, for reference/copy accuracy): Rust + Tauri (PTY, filesystem, IPC), React + TypeScript frontend, xterm.js (WebGL renderer) terminal, CodeMirror 6 editor, Vercel AI SDK for provider routing.
- Stack (this website): Next.js 16 (App Router) + React 19 + TypeScript, Tailwind CSS v4 + shadcn/ui, OGL for the WebGL shader background, Motion for animation, Hugeicons icon set, Fumadocs for docs.
- The animated hero background is a real-time WebGL/GLSL shader (`components/fluid-flow.tsx`), not video — treat as a signature, fragile asset.

## Brand Commitments

- Name: **cli-ck**. Tagline: "Terminal-first AI-native dev workspace" / "The AI-native terminal/editor/agentic env./everything."
- Built by a team of three: a DevOps engineer, an FDE (the user, in this conversation), and an ML engineer. **Founders stay unnamed/anonymous by deliberate choice** — do not surface names, headshots, or individual bios on the site. The About page's current "mostly built by one person, plus the CodeCollab team" framing is stale and should be corrected when that page is next touched, without naming individuals (e.g. "built by a small team," "a team of three").
- Company/org framing: CodeCollab (org name `codecollab-co` on GitHub) — keep as the collective identity, not individual credits.
- Voice: terse, confident, spec-sheet-like (exact numbers: "7 MB," "300 ms," "Apache-2.0") rather than marketing fluff.

## Evidence on Hand

- Real: demo video (YouTube, linked from `lib/site.ts`), live GitHub star count via API, changelog (`lib/changelog.ts`), actual release artifacts per platform (`DOWNLOADS` in `lib/site.ts`).
- **Absent — do not fabricate:** no customer logos, no testimonials/case studies, no named team bios, no benchmark comparisons against competitors. Any of these appearing in future copy must be flagged as new claims requiring the user's sign-off, not invented.

## Product Principles

1. Small and fast is the product, not a footnote — every design/copy decision should protect the "7 MB / 300 ms / no Electron tax" story rather than dilute it with heavier patterns.
2. AI is optional, never gatekeeping — the terminal/editor must read as fully functional and worth using with zero AI configured.
3. Nothing phones home — no dark patterns nudging toward accounts, cloud dependency, or telemetry; BYOK/local-first stays a first-class, equally-supported path, not a fallback.
4. Team stays anonymous by design — collective (CodeCollab) or role-based framing only; no individual names, faces, or bios.
5. Claims stay verifiable — exact numbers and confirmed facts over vague superlatives; no invented proof points.

## Accessibility & Inclusion

No product-specific accessibility requirement has been established beyond standard web accessibility practice.
