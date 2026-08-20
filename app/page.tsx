import { ProductDemo } from "@/components/landing-layout/product-demo"
import { Downloads } from "@/components/landing-layout/downloads"
import { FAQ } from "@/components/landing-layout/faq"
import { GridFeatures } from "@/components/landing-layout/grid-features"
import { FeatureHighlights } from "@/components/landing-layout/feature-highlights"
import { GlobalFooter } from "@/components/landing-layout/global-footer"
import { GlobalHeader } from "@/components/landing-layout/global-header"
import { RenameBanner } from "@/components/landing-layout/rename-banner"
import { LandingHero } from "@/components/landing-layout/landing-hero"
import { ProductStats } from "@/components/landing-layout/product-stats"
import { DOWNLOADS, SITE, VERSION } from "@/lib/site"
import terminalImg from "@/public/terminal.webp"
import editorImg from "@/public/editor.webp"
import sourceControlImg from "@/public/source-control.webp"
import aiWorkflowImg from "@/public/ai_workflow.webp"
import webPreviewImg from "@/public/web_preview.webp"
import themesImg from "@/public/themes.webp"

import {
  BrowserIcon,
  CheckListIcon,
  CodeFolderIcon,
  CodeIcon,
  CommandIcon,
  CommandLineIcon,
  CpuIcon,
  EnergyIcon,
  GitBranchIcon,
  Image01Icon,
  Layout02Icon,
  Mic01Icon,
  Notebook01Icon,
  PaintBrush02Icon,
  RecordIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons"

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    description: SITE.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Linux, Windows",
    softwareVersion: VERSION,
    downloadUrl: DOWNLOADS.macSilicon.url,
    url: SITE.url,
    license: "https://opensource.org/licenses/Apache-2.0",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Organization", name: SITE.name, url: SITE.github },
    video: {
      "@type": "VideoObject",
      name: `${SITE.name} - demo`,
      description: `Quick walkthrough of ${SITE.name}: terminal, editor, AI agents, and web preview.`,
      thumbnailUrl: `https://i.ytimg.com/vi/${SITE.demoVideoId}/maxresdefault.jpg`,
      uploadDate: "2026-05-16",
      contentUrl: SITE.demoVideoUrl,
      embedUrl: `https://www.youtube-nocookie.com/embed/${SITE.demoVideoId}`,
    },
  }

  return (
    <>
      <RenameBanner />
      <GlobalHeader />
      <main className="relative pt-[var(--rename-banner-h,0px)] transition-[padding] duration-300">
        <LandingHero />
        <ProductStats />
        {/* <ProductDemo /> */}

        <div id="features" className="relative">
          <FeatureHighlights
            id="terminal"
            index="01"
            eyebrow="Terminal"
            title="A terminal you'll actually want to live in."
            description="xterm.js with a WebGL renderer, multi-tab, and a file explorer with Catppuccin icons. Keyboard-first, instantly fast."
            bullets={[
              {
                icon: CommandLineIcon,
                label: "WebGL-rendered xterm.js - silky at any scrollback",
              },
              {
                icon: Layout02Icon,
                label:
                  "Multi-tab terminals, editors, and previews side-by-side",
              },
              {
                icon: CodeFolderIcon,
                label: "File explorer with Catppuccin icons + keyboard nav",
              },
              {
                icon: Search01Icon,
                label: "Project-wide search at ripgrep speed",
              },
            ]}
            image={{
              src: terminalImg,
              alt: "cli-ck terminal showing fastfetch output and the file explorer",
              width: 2560,
              height: 1600,
              caption: "~/projects/cli-ck  ·  fastfetch",
            }}
            priority
          />

          <FeatureHighlights
            id="editor"
            index="02"
            eyebrow="Editor"
            title="An editor with real Vim mode and AI autocomplete."
            description="Built-in editor with context-aware completions, first-class Vim, and prebuilt themes. No language-server setup - it just works."
            bullets={[
              { icon: CodeIcon, label: "Context-aware AI autocomplete" },
              {
                icon: CommandIcon,
                label: "Real Vim mode (motions, registers, marks)",
              },
              {
                icon: PaintBrush02Icon,
                label: "Catppuccin, Tokyo Night, and more",
              },
              { icon: EnergyIcon, label: "Sub-millisecond keystroke latency" },
            ]}
            image={{
              src: editorImg,
              alt: "cli-ck code editor with AI autocomplete and Vim mode",
              width: 2560,
              height: 1600,
              caption: "src/modules/lib.rs",
            }}
            reverse
          />

          <FeatureHighlights
            id="source-control"
            index="03"
            eyebrow="Source control"
            title="Git, with a graph that finally makes sense."
            description="Stage hunks, commit with one shortcut, and read history through a real commit graph - all without leaving your tab."
            bullets={[
              {
                icon: GitBranchIcon,
                label: "Hunk-level stage / unstage / discard",
              },
              {
                icon: CommandIcon,
                label: "Commit with Cmd+Enter, push with upstream awareness",
              },
              {
                icon: Layout02Icon,
                label: "Commit graph with branches, merges, and refs",
              },
              {
                icon: Search01Icon,
                label: "Search commits, jump to the remote page",
              },
            ]}
            image={{
              src: sourceControlImg,
              alt: "cli-ck source control panel with diff and commit graph",
              width: 2560,
              height: 1600,
              caption: "source control · git history",
            }}
          />

          <FeatureHighlights
            id="agents"
            index="03"
            eyebrow="AI workflow"
            title="Agents that read, plan, and ship diffs."
            description="Multi-agents and sub-agents browse files, run commands, and propose changes - every edit lands in a reviewable diff before it touches disk."
            bullets={[
              {
                icon: RecordIcon,
                label: "AI Edit Diffs - review every change inline",
              },
              {
                icon: Notebook01Icon,
                label: "cli-ck.md memory + per-project configs in your repo",
              },
              {
                icon: CodeFolderIcon,
                label: "Snippets & skills - composable, callable workflows",
              },
              { icon: CpuIcon, label: "BYOK or fully local via LM Studio" },
              {
                icon: Mic01Icon,
                label: "Voice input - talk to your agents while you code",
              },
            ]}
            image={{
              src: aiWorkflowImg,
              alt: "cli-ck AI panel showing an agent listing dirs and proposing edit diffs",
              width: 2560,
              height: 1600,
              caption: "AI agents · edit diff",
            }}
          />

          <FeatureHighlights
            id="preview"
            index="04"
            eyebrow="Web preview"
            title="Preview your app without leaving the shell."
            description="Auto-detects dev servers - Vite, Next, anything - and opens them as a tab beside your editor."
            bullets={[
              {
                icon: BrowserIcon,
                label: "Auto-detect Vite, Next, Astro, and more",
              },
              {
                icon: Layout02Icon,
                label: "Live preview tab next to your editor",
              },
              {
                icon: CheckListIcon,
                label: "Plans, tasks, and TODOs tracked in-app",
              },
              {
                icon: EnergyIcon,
                label: "Hot-reload at the speed of your dev server",
              },
            ]}
            image={{
              src: webPreviewImg,
              alt: "cli-ck web preview showing a Vite app rendered in a side panel",
              width: 2560,
              height: 1600,
              caption: "preview · http://localhost:5173",
            }}
            reverse
          />

          <FeatureHighlights
            id="themes"
            index="05"
            eyebrow="Themes"
            title="Make it yours, down to the last pixel."
            description="Ten editor themes, ten app palettes, custom themes you build in-app, and a background image with adjustable opacity and blur."
            bullets={[
              {
                icon: PaintBrush02Icon,
                label: "Bundled: cli-ck-default, nord, tokyo-night, catppuccin, gruvbox, rose-pine, sage, caffeine, claude, tide",
              },
              {
                icon: Image01Icon,
                label: "Background image with opacity + blur sliders",
              },
              {
                icon: CodeIcon,
                label: "Build custom themes, export and share JSON",
              },
              {
                icon: CommandIcon,
                label: "Editor theme picks independently from the app",
              },
            ]}
            image={{
              src: themesImg,
              alt: "cli-ck theme picker showing bundled themes and a custom background image",
              width: 2560,
              height: 1600,
              caption: "settings · themes",
            }}
          />
        </div>

        <GridFeatures />
        <Downloads />
        <FAQ />
      </main>
      <GlobalFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
