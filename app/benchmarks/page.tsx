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
      "cli-ck": { ms: 6255, tokens: 6898, pass: true },
      codex: { ms: 10249, tokens: 42108, pass: true },
      goose: { ms: 7454, tokens: 4094, pass: true },
      opencode: { ms: 13682, tokens: 59497, pass: true },
      aider: { ms: 7010, tokens: 873, pass: true },
    },
  },
  {
    id: "fix-off-by-one",
    label: "Off-by-one bug fix",
    description:
      "A failing test expects an inclusive range sum; fix the loop without touching the test.",
    results: {
      "cli-ck": {
        ms: 2117,
        tokens: 568,
        pass: true,
        note: "Single-shot fast path — skipped the tool-calling loop entirely",
      },
      codex: { ms: 10835, tokens: 70260, pass: true },
      goose: {
        ms: 1693,
        tokens: 3479,
        pass: false,
        note: "Goose's fix didn't actually resolve the bug (test still failed: 10 !== 15)",
      },
      opencode: { ms: 27334, tokens: 81106, pass: true },
      aider: { ms: 6665, tokens: 1122, pass: true },
    },
  },
  {
    id: "dedup-refactor",
    label: "Dedup refactor",
    description:
      "Extract a shared helper to remove duplicated averaging logic across two functions.",
    results: {
      "cli-ck": { ms: 15080, tokens: 12580, pass: true },
      codex: { ms: 20236, tokens: 71683, pass: true },
      goose: { ms: 12286, tokens: 4215, pass: true },
      opencode: { ms: 20751, tokens: 102363, pass: true },
      aider: { ms: 7447, tokens: 1297, pass: true },
    },
  },
  {
    id: "boundary-error-handling",
    label: "Boundary error handling",
    description:
      "Make divide-by-zero throw a specific error message; leave normal division untouched.",
    results: {
      "cli-ck": {
        ms: 2206,
        tokens: 565,
        pass: true,
        note: "Single-shot fast path — skipped the tool-calling loop entirely",
      },
      codex: { ms: 10740, tokens: 83525, pass: true },
      goose: { ms: 6982, tokens: 4026, pass: true },
      opencode: { ms: 24919, tokens: 122775, pass: true },
      aider: { ms: 6125, tokens: 1017, pass: true },
    },
  },
  {
    id: "cli-arg-parser",
    label: "CLI arg parser",
    description:
      "Parse --key value pairs and standalone --flag booleans into an object, plus a test.",
    results: {
      "cli-ck": { ms: 7378, tokens: 7432, pass: true },
      codex: { ms: 13690, tokens: 42781, pass: true },
      goose: { ms: 9473, tokens: 4372, pass: true },
      opencode: { ms: 20305, tokens: 81140, pass: true },
      aider: { ms: 7299, tokens: 954, pass: true },
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
      {result.note && (
        <div className="max-w-[12rem] text-[11px] leading-snug text-muted-foreground">
          {result.note}
        </div>
      )}
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
            cherry-picking where cli-ck doesn&apos;t come out ahead. This run
            includes an experimental single-shot fast path (still in review, not
            yet shipped) that skips the tool-calling loop entirely for small,
            simple edits.
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
              cli-ck tasks passed
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
          cli-ck beats the other two tool-calling agents tested — Codex CLI and
          OpenCode — on both speed and tokens outright, and is the fastest tool
          in this run overall. Two of the five tasks here took a new single-shot
          fast path that skips the tool-calling loop for small, self-contained
          edits — those two dropped 15–17x in tokens on their own. The other
          three fell back to the normal tool-calling loop, which is by design:
          it only takes the fast path when it&apos;s confident, and falls back
          rather than risk a wrong edit. Aider still uses fewer tokens per task
          overall: it skips tool-calling entirely, for every task, and rewrites
          whole files in one shot. Goose uses fewer tokens too, but its fix for
          the off-by-one bug didn&apos;t actually pass the test — every other
          tool, including Goose on its remaining four tasks, reached correct
          code.
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
            times and token counts vary noticeably between runs; this page
            doesn&apos;t hide that behind a favorable run.
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
          <li>
            cli-ck&apos;s numbers here reflect a set of token-efficiency fixes
            (lite system prompt, trimmed idle tools, history pruning, a
            code-enforced do-not-touch guard, and a verify-before-declaring-done
            hint) — see{" "}
            <Link
              href="https://github.com/cli-ck/cli-ck/pull/314"
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
            >
              PR #314
            </Link>{" "}
            for the exact changes and what was deliberately left out (a more
            aggressive tool cut was tested but not shipped, since it would have
            cost real capability like codebase search and subagents).
          </li>
          <li>
            On top of those fixes, this run also used an experimental
            single-shot fast path: for a small, freshly-started scope, one
            structured-output call proposes edits directly instead of running
            the full tool-calling loop, verified with a syntax check before
            being accepted. It only took that path on 2 of 5 tasks here — the
            other 3 didn&apos;t clear its own eligibility or verification bar
            and fell back to the normal agent loop at roughly the same cost as
            without it. Neither this nor the fixes above have shipped in cli-ck
            yet — see{" "}
            <Link
              href="https://github.com/cli-ck/cli-ck/pull/315"
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
            >
              PR #315
            </Link>{" "}
            (stacked on PR #314, both still open) and isn&apos;t wired into the
            live chat UI yet — it&apos;s a headless-only capability for now,
            deliberately kept out of the streaming/approval UX until it&apos;s
            proven out further.
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
