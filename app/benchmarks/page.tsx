import {
  Alert01Icon,
  CheckmarkCircle02Icon,
  Coins01Icon,
  FlashIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { Metadata } from "next"
import Link from "next/link"

import {
  PageHero,
  PageShellWrapper,
  Prose,
} from "@/components/landing-layout/page-shell-wrapper"
import {
  ContentSection,
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/landing-layout/content-section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Benchmarks",
  description:
    "cli-ck vs. Codex CLI, Goose, OpenCode, and Aider on identical coding tasks, same model, real code execution as the grader.",
  alternates: { canonical: `${SITE.url}/benchmarks` },
}

const RUN_DATE = "August 22, 2026"
const MODEL = "GPT-4o mini"

type ToolId = "cli-ck" | "codex" | "goose" | "opencode" | "aider"

type Result = {
  ms: number
  tokens: number
  pass: boolean
  note?: string
}

type Task = {
  id: string
  label: string
  description: string
  results: Record<ToolId, Result>
}

const TOOLS: { id: ToolId; label: string; approach: string }[] = [
  { id: "cli-ck", label: "cli-ck", approach: "agentic tool-calling" },
  { id: "codex", label: "Codex CLI", approach: "agentic tool-calling" },
  { id: "goose", label: "Goose", approach: "agentic tool-calling" },
  { id: "opencode", label: "OpenCode", approach: "agentic tool-calling" },
  { id: "aider", label: "Aider", approach: "whole-file edit" },
]

const TASKS: Task[] = [
  {
    id: "pure-function",
    label: "Pure function + test",
    description:
      "Write factorial(n) and a test that checks it with node's assert module.",
    results: {
      "cli-ck": { ms: 5328, tokens: 7537, pass: true },
      codex: {
        ms: 11788,
        tokens: 41806,
        pass: true,
      },
      goose: { ms: 8501, tokens: 4231, pass: true },
      opencode: { ms: 11927, tokens: 59660, pass: true },
      aider: { ms: 6477, tokens: 873, pass: true },
    },
  },
  {
    id: "fix-off-by-one",
    label: "Off-by-one bug fix",
    description:
      "A failing test expects an inclusive range sum; fix the loop without touching the test.",
    results: {
      "cli-ck": { ms: 9364, tokens: 19554, pass: true },
      codex: { ms: 12811, tokens: 56906, pass: true },
      goose: { ms: 12004, tokens: 4403, pass: true },
      opencode: { ms: 25743, tokens: 142556, pass: true },
      aider: { ms: 6661, tokens: 1122, pass: true },
    },
  },
  {
    id: "dedup-refactor",
    label: "Dedup refactor",
    description:
      "Extract a shared helper to remove duplicated averaging logic across two functions.",
    results: {
      "cli-ck": { ms: 33209, tokens: 83334, pass: true },
      codex: { ms: 10009, tokens: 42463, pass: true },
      goose: { ms: 6499, tokens: 4073, pass: true },
      opencode: { ms: 20739, tokens: 103658, pass: true },
      aider: { ms: 7319, tokens: 1284, pass: true },
    },
  },
  {
    id: "boundary-error-handling",
    label: "Boundary error handling",
    description:
      "Make divide-by-zero throw a specific error message; leave normal division untouched.",
    results: {
      "cli-ck": { ms: 5248, tokens: 10971, pass: true },
      codex: { ms: 15412, tokens: 85977, pass: true },
      goose: { ms: 4879, tokens: 3742, pass: true },
      opencode: { ms: 25283, tokens: 164768, pass: true },
      aider: { ms: 8493, tokens: 1017, pass: true },
    },
  },
  {
    id: "cli-arg-parser",
    label: "CLI arg parser",
    description:
      "Parse --key value pairs and standalone --flag booleans into an object, plus a test.",
    results: {
      "cli-ck": { ms: 6837, tokens: 7857, pass: true },
      codex: { ms: 12206, tokens: 42684, pass: true },
      goose: { ms: 8157, tokens: 4328, pass: true },
      opencode: { ms: 27218, tokens: 80875, pass: true },
      aider: { ms: 7010, tokens: 954, pass: true },
    },
  },
]

const totals = TOOLS.reduce(
  (acc, tool) => {
    acc[tool.id] = TASKS.reduce(
      (sum, t) => ({
        ms: sum.ms + t.results[tool.id].ms,
        tokens: sum.tokens + t.results[tool.id].tokens,
        pass: sum.pass + (t.results[tool.id].pass ? 1 : 0),
      }),
      { ms: 0, tokens: 0, pass: 0 }
    )
    return acc
  },
  {} as Record<ToolId, { ms: number; tokens: number; pass: number }>
)

const cliCk = totals["cli-ck"]

function speedDelta(toolId: ToolId) {
  const ratio = totals[toolId].ms / cliCk.ms
  return ratio >= 1
    ? { text: `${ratio.toFixed(2)}x faster`, win: true }
    : { text: `${(1 / ratio).toFixed(2)}x slower`, win: false }
}

function tokenDelta(toolId: ToolId) {
  const ratio = totals[toolId].tokens / cliCk.tokens
  return ratio >= 1
    ? { text: `${Math.round((1 - 1 / ratio) * 100)}% fewer tokens`, win: true }
    : { text: `${(1 / ratio).toFixed(1)}x more tokens`, win: false }
}

const competitors = TOOLS.filter((t) => t.id !== "cli-ck")

function fmtMs(ms: number) {
  return `${(ms / 1000).toFixed(1)}s`
}

function fmtTokens(n: number) {
  return `${(n / 1000).toFixed(1)}k`
}

function ResultCell({ result }: { result: Result }) {
  return (
    <div className="flex flex-col items-start gap-1.5">
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-sm font-semibold text-foreground">
          {fmtMs(result.ms)}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {fmtTokens(result.tokens)} tok
        </span>
      </div>
      <Badge variant={result.pass ? "secondary" : "destructive"}>
        {result.pass ? "Pass" : "Fail"}
      </Badge>
    </div>
  )
}

export default function BenchmarksPage() {
  return (
    <PageShellWrapper>
      <PageHero
        eyebrow="Benchmarks"
        title="cli-ck vs. 4 Coding Agent CLIs"
        lead={
          <>
            Same five coding tasks, the same model ({MODEL}), and the same
            grader against Codex CLI, Goose, OpenCode, and Aider: we actually
            run the code each agent produces. No self-reported scores — and no
            cherry-picking where cli-ck doesn&apos;t come out ahead.
          </>
        }
        meta={
          <>
            <span>Run {RUN_DATE}</span>
            <span className="size-1 rounded-full bg-muted-foreground/40" />
            <span>{MODEL} on every tool</span>
          </>
        }
      />

      <ContentSection className="!py-12 sm:!py-16">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-3">
          <div className="flex flex-col items-center justify-center gap-2 bg-background px-6 py-8 text-center">
            <HugeiconsIcon
              icon={CheckmarkCircle02Icon}
              className="size-4 text-muted-foreground"
              strokeWidth={1.8}
            />
            <div className="font-mono text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {cliCk.pass}/{TASKS.length}
            </div>
            <div className="text-xs tracking-wide text-muted-foreground uppercase">
              cli-ck tasks passed — tied with all 4
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 bg-background px-6 py-8 text-center">
            <HugeiconsIcon
              icon={FlashIcon}
              className="size-4 text-muted-foreground"
              strokeWidth={1.8}
            />
            <div className="font-mono text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {speedDelta("opencode").text}
            </div>
            <div className="text-xs tracking-wide text-muted-foreground uppercase">
              vs. OpenCode
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 bg-background px-6 py-8 text-center">
            <HugeiconsIcon
              icon={Coins01Icon}
              className="size-4 text-muted-foreground"
              strokeWidth={1.8}
            />
            <div className="font-mono text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {tokenDelta("codex").text}
            </div>
            <div className="text-xs tracking-wide text-muted-foreground uppercase">
              vs. Codex CLI
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection>
        <SectionEyebrow>Head to head</SectionEyebrow>
        <SectionHeading>The honest tradeoff</SectionHeading>
        <SectionLead>
          cli-ck comes out ahead of the other two tool-calling agents tested.
          Goose and Aider — leaner tools that make far fewer model round trips
          per task — beat cli-ck on raw speed and token count here. All five
          tools reached correct code on every task in this run.
        </SectionLead>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {competitors.map((tool) => {
            const speed = speedDelta(tool.id)
            const tokens = tokenDelta(tool.id)
            return (
              <div
                key={tool.id}
                className="rounded-2xl border border-border/60 p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium text-foreground">
                    cli-ck vs. {tool.label}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {tool.approach}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-6">
                  <div>
                    <div
                      className={cn(
                        "font-mono text-lg font-semibold",
                        speed.win ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {speed.text}
                    </div>
                    <div className="text-xs text-muted-foreground">speed</div>
                  </div>
                  <div>
                    <div
                      className={cn(
                        "font-mono text-lg font-semibold",
                        tokens.win ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {tokens.text}
                    </div>
                    <div className="text-xs text-muted-foreground">tokens</div>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="secondary">
                      {totals[tool.id].pass}/{TASKS.length} pass
                    </Badge>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </ContentSection>

      <ContentSection>
        <SectionEyebrow>Per-task results</SectionEyebrow>
        <SectionHeading>Every run, side by side</SectionHeading>
        <SectionLead>
          Time and token totals per task. Tokens are input + output tokens
          reported by each tool for that run.
        </SectionLead>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-border/60">
          <table className="w-full min-w-[820px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/30">
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  Task
                </th>
                {TOOLS.map((tool) => (
                  <th
                    key={tool.id}
                    className="px-5 py-3 text-left font-medium text-muted-foreground"
                  >
                    {tool.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TASKS.map((t, i) => (
                <tr
                  key={t.id}
                  className={cn(
                    i < TASKS.length - 1 && "border-b border-border/60"
                  )}
                >
                  <td className="px-5 py-4 align-top">
                    <div className="font-medium text-foreground">{t.label}</div>
                    <div className="mt-1 max-w-[16rem] text-xs text-muted-foreground">
                      {t.description}
                    </div>
                  </td>
                  {TOOLS.map((tool) => (
                    <td key={tool.id} className="px-5 py-4 align-top">
                      <ResultCell result={t.results[tool.id]} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="bg-muted/30">
                <td className="px-5 py-4 font-medium text-foreground">Total</td>
                {TOOLS.map((tool) => (
                  <td
                    key={tool.id}
                    className="px-5 py-4 font-mono text-sm font-semibold text-foreground"
                  >
                    {fmtMs(totals[tool.id].ms)} ·{" "}
                    {fmtTokens(totals[tool.id].tokens)} tok
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </ContentSection>

      <Prose className="mt-4">
        <h2>Methodology</h2>
        <p>
          All five tools ran the same five self-contained coding tasks — a pure
          function, a seeded off-by-one bug fix, a dedup refactor, a
          boundary/error-handling fix, and a small CLI arg parser — against
          fresh scratch git repos, using {MODEL} through each tool&apos;s own
          non-interactive mode: cli-ck&apos;s headless agent runner,{" "}
          <code>codex exec</code>, <code>goose run</code>,{" "}
          <code>opencode run</code>, and <code>aider --message</code>. Every
          tool authenticated with the same raw OpenAI API key — no subscription
          credits, no vendor account tier differences. None got project
          instructions, prior context, or retries.
        </p>
        <p>
          Grading is not self-reported. After each run, we execute the code the
          agent produced with a plain <code>node</code> and check the real exit
          code — a tool&apos;s own final message saying it succeeded
          doesn&apos;t count.
        </p>
        <p>
          The four competitors split into two architectures: cli-ck, Codex CLI,
          Goose, and OpenCode all run an agentic loop of individual
          read/write/shell tool calls; Aider defaults to a leaner
          whole-file-rewrite edit format with far fewer model round trips. That
          split shows up directly in the numbers — it&apos;s the most likely
          reason Aider and Goose use so many fewer tokens here, not a difference
          in code quality.
        </p>
        <h3>Caveats</h3>
        <ul>
          <li>
            This is one run of five tasks, not a statistically averaged suite —
            treat it as a snapshot, not a permanent ranking. Individual task
            times varied noticeably between runs during testing (cli-ck&apos;s
            dedup-refactor run, for example, took 33s here versus 12–15s in
            earlier runs on the same task).
          </li>
          <li>
            Token counts are each tool&apos;s own reported input + output
            tokens; a meaningful share of some tools&apos; input tokens were
            served from cache (not fully billed at first-use rates), but the raw
            count is what we report here.
          </li>
          <li>
            Warp&apos;s <code>oz agent run</code> was originally in scope too,
            but its plain (non-cloud) exec command is credit-gated with no
            bring-your-own-key path, so it isn&apos;t included.
          </li>
        </ul>
      </Prose>

      <ContentSection className="!pt-8">
        <div className="mx-auto flex max-w-2xl items-start gap-3 rounded-2xl border border-border/60 bg-card/40 px-5 py-4 backdrop-blur-sm">
          <HugeiconsIcon
            icon={Alert01Icon}
            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
            strokeWidth={1.8}
          />
          <p className="text-xs leading-relaxed text-muted-foreground">
            Want to reproduce this? The benchmark harness is open source in the{" "}
            <Link
              href={`${SITE.github}/tree/main/scripts/headless-agent`}
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
            >
              cli-ck repo
            </Link>
            .
          </p>
        </div>
      </ContentSection>

      <section className="relative mt-8 mb-24 px-4 sm:mb-32 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="sm" className="rounded-full">
            <Link href="/#download">Download cli-ck</Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="rounded-full">
            <Link href={SITE.github} target="_blank" rel="noreferrer">
              View source
            </Link>
          </Button>
        </div>
      </section>
    </PageShellWrapper>
  )
}
