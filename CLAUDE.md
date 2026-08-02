# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The marketing/docs website for **Oz** ([oz.app](https://oz.app)), a terminal-first AI-native dev workspace. The product itself lives in a separate repo (`my-oz/oz`); this repo is only the landing page + docs site. It's statically exported and deployed to GitHub Pages under the `/oz-website` subpath — there is no backend, no server runtime, no database.

## Commands

```bash
pnpm install
pnpm dev          # next dev --turbopack, http://localhost:3000
pnpm build        # production static export (writes to out/)
pnpm start        # serve the production build
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint
pnpm format       # prettier --write "**/*.{ts,tsx}"
```

There is no test suite/runner in this repo — verification is `typecheck` + `lint` + manually checking the page in a browser (`pnpm dev`).

An optional `GITHUB_TOKEN` env var (read-only, public-repo scope) raises the GitHub API rate limit used to show the live star count on the homepage. Not required for local dev.

## Architecture

**Static export, subpath-hosted.** `next.config.mjs` sets `output: 'export'`, `trailingSlash: true`, and `basePath: '/oz-website'` (deployed at `my-oz.github.io/oz-website`, not a custom domain root). Any hardcoded internal link, asset path, or image `src` must be prefixed with the basePath (see the icon URLs in `app/layout.tsx` for the pattern: `/oz-website/favicon.ico`). Images are `unoptimized: true` since there's no image-optimization server in a static export. Deploy is `.github/workflows/deploy.yml`: on push to `main`, it runs `pnpm build` and publishes `out/` to GitHub Pages.

**Single source of truth for site content:** `lib/site.ts` holds the `SITE` object (name, taglines, all external URLs, version) and the `DOWNLOADS` map (per-platform release artifact filenames/URLs, derived from `VERSION`). Bumping the app version or changing a download link happens here, not in components. `lib/changelog.ts` holds changelog entries. `lib/github.ts` fetches the live star count from the GitHub API (cached via `next: { revalidate: 3600 }`).

**Two halves of the app:**
- Marketing pages (`app/page.tsx`, `about`, `changelog`, `privacy`, `terms`, `security`) are built from section components in `components/landing-layout/` (hero, feature grid, FAQ, footer, product demo, etc.) plus shared primitives in `components/ui/` (shadcn/ui, generated via `components.json` — style `radix-luma`, icon library `hugeicons`).
- Docs (`app/docs/[[...slug]]`) are powered by **Fumadocs**: MDX content lives in `content/docs/**`, with page ordering/grouping controlled by `content/docs/meta.json` (top-level nav sections: Overview, Features, AI, Reference). `source.config.ts` + the generated `.source/` directory wire MDX into Fumadocs via `fumadocs-mdx`. `lib/source.ts` builds the doc tree loader and maps icon name strings from `meta.json`/frontmatter (e.g. `"Terminal"`, `"Rocket"`) to Hugeicons components via `iconMap` — new icons used in docs frontmatter must be added to that map or they silently render nothing. `app/docs/layout.tsx` wraps docs pages in Fumadocs' `DocsLayout`/`RootProvider`.
- `lib/get-llm-text.ts` + `app/llms.txt`, `app/llms-full.txt` expose the docs content as plain text for LLM consumption (llms.txt convention), built from the same Fumadocs `source`.

**Styling:** Tailwind CSS v4 (see `app/globals.css` for the theme/tokens — `components.json` points `tailwind.css` there). Prettier is configured with `prettier-plugin-tailwindcss` and treats `cn`/`cva` as class-sorting targets — always run `pnpm format` (or rely on editor-on-save) rather than hand-ordering Tailwind classes.

**The animated background** is a real-time WebGL/GLSL shader (not video/Lottie): `components/fluid-flow.tsx` holds the [OGL](https://github.com/oframe/ogl) setup and fragment shader, mounted via `components/landing-layout/accent-backdrop.tsx` (`AccentBackdrop`, rendered globally in `app/layout.tsx`). This is the most bespoke/fragile piece of the UI — treat shader edits carefully and check both light/dark themes (`components/theme-provider.tsx`, `next-themes`) when touching it.

## Conventions

- Path alias `@/*` maps to repo root; `collections/*` maps to the generated `.source/` directory (Fumadocs).
- Prettier: no semicolons, double quotes, 2-space tabs, 80 print width — run `pnpm format` before committing.
- `out/` and `.next/` are build artifacts, not source; don't hand-edit them.
