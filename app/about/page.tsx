import { CodeIcon, GithubIcon, Mail01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { Metadata } from "next"
import Link from "next/link"

import { PageHero, PageShellWrapper, Prose } from "@/components/landing-layout/page-shell-wrapper"
import { Button } from "@/components/ui/button"
import { SITE, VERSION } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description: `What ${SITE.name} is, who builds it, and how it's put together.`,
  alternates: { canonical: `${SITE.url}/about` },
}

const stack = [
  { label: "Rust + Tauri", note: "PTY, FS, IPC" },
  { label: "React + TypeScript", note: "Frontend" },
  { label: "xterm.js (WebGL)", note: "Terminal" },
  { label: "CodeMirror 6", note: "Editor" },
  { label: "Vercel AI SDK", note: "Provider routing" },
]

export default function AboutPage() {
  return (
    <PageShellWrapper>
      <PageHero
        eyebrow="About"
        title="About Oz"
        lead="A terminal, editor, web preview, and AI in one small binary. Free, open source, mostly built by one person."
        meta={
          <>
            <span>v{VERSION}</span>
            <span className="size-1 rounded-full bg-muted-foreground/40" />
            <span>Apache-2.0</span>
          </>
        }
      />

      <Prose>
        <h2>What it is</h2>
        <p>
          Oz is a desktop app that combines a terminal, a code editor, a file
          explorer, a web preview, and an AI workflow. It runs as a single ~7 MB
          binary on macOS, Linux, and Windows.
        </p>
        <p>
          You can use it as a plain terminal and ignore the AI side entirely.
          You can also bring your own keys (OpenAI, Anthropic, Google, Groq,
          Cerebras, xAI, anything OpenAI-compatible) or run fully offline
          through LM Studio.
        </p>

        <h2>Who builds it</h2>
        <p>
          Mostly one person, plus the CodeCollab team. Oz started as a side
          project because we wanted a faster terminal with AI built in, not
          bolted on. It&apos;s grown from there.
        </p>
        <p>
          Contributions, bug reports, and feature requests are welcome on{" "}
          <Link href={SITE.github} target="_blank" rel="noreferrer">
            GitHub
          </Link>
          . For anything else you can reach me at{" "}
          <Link href="mailto:info@oz.app">info@oz.app</Link>.
        </p>

        <h2>How it&apos;s built</h2>
        <p>
          Rust on the backend (PTY, filesystem, IPC), React on the frontend,
          Tauri to glue them together. The terminal is xterm.js with the WebGL
          renderer. The editor is CodeMirror 6. AI provider routing is handled
          by the Vercel AI SDK.
        </p>
      </Prose>

      <section className="relative mt-16 px-4 sm:mt-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <ul className="divide-y divide-border/60 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
            {stack.map((s) => (
              <li
                key={s.label}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <HugeiconsIcon
                    icon={CodeIcon}
                    className="size-4 text-muted-foreground"
                    strokeWidth={1.8}
                  />
                  <span className="text-sm font-medium">{s.label}</span>
                </div>
                <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                  {s.note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Prose className="mt-16">
        <h2>What it isn&apos;t</h2>
        <ul>
          <li>
            It isn&apos;t a hosted service. There&apos;s no account, no backend,
            no telemetry.
          </li>
          <li>It isn&apos;t a paid product. Apache-2.0, no upsell.</li>
          <li>
            It isn&apos;t a full IDE. If you need a debugger UI or refactoring
            tools, use one.
          </li>
        </ul>

        <h2>License</h2>
        <p>
          Apache-2.0. Use it, fork it, ship it. The full license is in the{" "}
          <Link
            href={`${SITE.github}/blob/main/LICENSE`}
            target="_blank"
            rel="noreferrer"
          >
            repo
          </Link>
          .
        </p>
      </Prose>

      <section className="relative mt-20 mb-24 px-4 sm:mt-24 sm:mb-32 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="outline" size="sm" className="rounded-full">
            <Link href={SITE.github} target="_blank" rel="noreferrer">
              <HugeiconsIcon icon={GithubIcon} strokeWidth={2} />
              GitHub
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="rounded-full">
            <Link href="mailto:info@oz.app">
              <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} />
              info@oz.app
            </Link>
          </Button>
        </div>
      </section>
    </PageShellWrapper>
  )
}
