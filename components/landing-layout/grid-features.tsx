import {
  AiIdeaIcon,
  CheckListIcon,
  CodeFolderIcon,
  CommandIcon,
  CpuIcon,
  EnergyIcon,
  Layout02Icon,
  Mic01Icon,
  Notebook01Icon,
  PaintBrush02Icon,
  RecordIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { ContentSection, SectionEyebrow, SectionHeading } from "./content-section"

const items = [
  {
    icon: Mic01Icon,
    title: "Voice input",
    desc: "Talk to your terminal. Whisper or your provider of choice.",
  },
  {
    icon: CpuIcon,
    title: "Local LLMs",
    desc: "Run fully offline through LM Studio. Your code stays on disk.",
  },
  {
    icon: AiIdeaIcon,
    title: "AI autocomplete",
    desc: "Fast AI autocompletion inside code editor.",
  },
  {
    icon: Notebook01Icon,
    title: "cli-ck.md",
    desc: "Per-project memory and config - versioned with your repo.",
  },
  {
    icon: CheckListIcon,
    title: "Plans & tasks",
    desc: "Break work into tracked steps. Agents pick up where you left off.",
  },
  {
    icon: PaintBrush02Icon,
    title: "Prebuilt themes",
    desc: "Atomone, Tokyo Night, and friends - drop-in.",
  },
  {
    icon: Layout02Icon,
    title: "Multi-tab",
    desc: "Terminals, editors, and previews side by side.",
  },
  {
    icon: Search01Icon,
    title: "Fast search",
    desc: "Ripgrep-class speed across files, with keyboard navigation.",
  },
  {
    icon: RecordIcon,
    title: "AI Edit Diffs",
    desc: "Review every agent change inline before it touches disk.",
  },
  {
    icon: CommandIcon,
    title: "Vim mode",
    desc: "Modal editing first-class. Bring your dotfiles.",
  },
  {
    icon: CodeFolderIcon,
    title: "Snippets & skills",
    desc: "Reusable workflows your agents can call by name.",
  },
  {
    icon: EnergyIcon,
    title: "Tiny footprint",
    desc: "Under 10 MB on disk. Boots in 300 ms. No Electron tax.",
  },
]

export function GridFeatures() {
  return (
    <ContentSection id="more">
      <div className="mx-auto max-w-3xl">
        <SectionEyebrow>05 - Toolkit</SectionEyebrow>
        <SectionHeading>More built in. No plugins required.</SectionHeading>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.title}
            className="group relative bg-background/70 p-6 backdrop-blur-sm transition-colors hover:bg-background"
          >
            <div className="inline-flex size-8 items-center justify-center text-foreground/70 transition-colors group-hover:text-foreground">
              <HugeiconsIcon
                icon={it.icon}
                className="size-5"
                strokeWidth={1.6}
              />
            </div>
            <div className="mt-5 text-[15px] font-medium tracking-tight">
              {it.title}
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {it.desc}
            </p>
          </div>
        ))}
      </div>
    </ContentSection>
  )
}
