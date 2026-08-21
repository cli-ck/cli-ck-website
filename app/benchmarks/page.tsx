import {
  Alert01Icon,
  CheckmarkCircle02Icon,
  Coins01Icon,
  FlashIcon,
  XVariableCircleIcon,
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
    "cli-ck vs. OpenAI Codex CLI on identical coding tasks, same model, real code execution as the grader.",
  alternates: { canonical: `${SITE.url}/benchmarks` },
}

const RUN_DATE = "August 21, 2026"
const MODEL = "GPT-4o mini"

type Result = {
  tool: "cli-ck" | "codex"
  ms: number
  tokens: number
  pass: boolean
  note?: string
}

type Task = {
  id: string
  label: string
  description: string
  cliCk: Result
  codex: Result
}

const TASKS: Task[] = [
  {
    id: "pure-function",
    label: "Pure function + test",
    description:
      "Write factorial(n) and a test that checks it with node's assert module.",
    cliCk: { tool: "cli-ck", ms: 10298, tokens: 7512, pass: true },
    codex: {
      tool: "codex",
      ms: 12511,
      tokens: 41776,
      pass: false,
      note: "Generated code called this.factorial(...) inside a module.exports.factorial assignment — throws at runtime.",
    },
  },
  {
    id: "fix-off-by-one",
    label: "Off-by-one bug fix",
    description:
      "A failing test expects an inclusive range sum; fix the loop without touching the test.",
    cliCk: { tool: "cli-ck", ms: 12873, tokens: 19589, pass: true },
    codex: { tool: "codex", ms: 18115, tokens: 70243, pass: true },
  },
  {
    id: "dedup-refactor",
    label: "Dedup refactor",
    description:
      "Extract a shared helper to remove duplicated averaging logic across two functions.",
    cliCk: { tool: "cli-ck", ms: 9696, tokens: 11381, pass: true },
    codex: { tool: "codex", ms: 15813, tokens: 100942, pass: true },
  },
  {
    id: "boundary-error-handling",
    label: "Boundary error handling",
    description:
      "Make divide-by-zero throw a specific error message; leave normal division untouched.",
    cliCk: { tool: "cli-ck", ms: 10554, tokens: 10975, pass: true },
    codex: { tool: "codex", ms: 21030, tokens: 69759, pass: true },
  },
  {
    id: "cli-arg-parser",
    label: "CLI arg parser",
    description:
      "Parse --key value pairs and standalone --flag booleans into an object, plus a test.",
    cliCk: { tool: "cli-ck", ms: 6921, tokens: 7864, pass: true },
    codex: { tool: "codex", ms: 19072, tokens: 43515, pass: true },
  },
]

const totals = TASKS.reduce(
  (acc, t) => ({
    cliCkMs: acc.cliCkMs + t.cliCk.ms,
    codexMs: acc.codexMs + t.codex.ms,
    cliCkTokens: acc.cliCkTokens + t.cliCk.tokens,
    codexTokens: acc.codexTokens + t.codex.tokens,
    cliCkPass: acc.cliCkPass + (t.cliCk.pass ? 1 : 0),
    codexPass: acc.codexPass + (t.codex.pass ? 1 : 0),
  }),
  {
    cliCkMs: 0,
    codexMs: 0,
    cliCkTokens: 0,
    codexTokens: 0,
    cliCkPass: 0,
    codexPass: 0,
  }
)

const speedup = totals.codexMs / totals.cliCkMs
const tokenSavingsPct = Math.round(
  (1 - totals.cliCkTokens / totals.codexTokens) * 100
)

const headline = [
  {
    value: `${speedup.toFixed(2)}x`,
    label: "Faster wall-clock",
    icon: FlashIcon,
  },
  {
    value: `${tokenSavingsPct}%`,
    label: "Fewer tokens used",
    icon: Coins01Icon,
  },
  {
    value: `${totals.cliCkPass}/${TASKS.length}`,
    label: "cli-ck tasks passed",
    icon: CheckmarkCircle02Icon,
  },
  {
    value: `${totals.codexPass}/${TASKS.length}`,
    label: "Codex CLI tasks passed",
    icon: XVariableCircleIcon,
  },
]

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
        title="cli-ck vs. Codex CLI"
        lead={
          <>
            Same five coding tasks, the same model ({MODEL}), and the same
            grader: we actually run the code the agent produces. No
            self-reported scores.
          </>
        }
        meta={
          <>
            <span>Run {RUN_DATE}</span>
            <span className="size-1 rounded-full bg-muted-foreground/40" />
            <span>{MODEL} on both sides</span>
          </>
        }
      />

      <ContentSection className="!py-12 sm:!py-16">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 md:grid-cols-4">
          {headline.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center gap-2 bg-background px-6 py-8 text-center"
            >
              <HugeiconsIcon
                icon={s.icon}
                className="size-4 text-muted-foreground"
                strokeWidth={1.8}
              />
              <div className="font-mono text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {s.value}
              </div>
              <div className="text-xs tracking-wide text-muted-foreground uppercase">
                {s.label}
              </div>
            </div>
          ))}
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
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/30">
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  Task
                </th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  cli-ck
                </th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  Codex CLI
                </th>
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
                    <div className="mt-1 max-w-xs text-xs text-muted-foreground">
                      {t.description}
                    </div>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <ResultCell result={t.cliCk} />
                  </td>
                  <td className="px-5 py-4 align-top">
                    <ResultCell result={t.codex} />
                    {t.codex.note ? (
                      <div className="mt-2 max-w-xs text-xs text-muted-foreground/80">
                        {t.codex.note}
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))}
              <tr className="bg-muted/30">
                <td className="px-5 py-4 font-medium text-foreground">Total</td>
                <td className="px-5 py-4 font-mono text-sm font-semibold text-foreground">
                  {fmtMs(totals.cliCkMs)} · {fmtTokens(totals.cliCkTokens)} tok
                </td>
                <td className="px-5 py-4 font-mono text-sm font-semibold text-foreground">
                  {fmtMs(totals.codexMs)} · {fmtTokens(totals.codexTokens)} tok
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ContentSection>

      <Prose className="mt-4">
        <h2>Methodology</h2>
        <p>
          Both tools ran the same five self-contained coding tasks — a pure
          function, a seeded off-by-one bug fix, a dedup refactor, a
          boundary/error-handling fix, and a small CLI arg parser — against
          fresh scratch git repos, using {MODEL} through each tool&apos;s own
          agent harness (cli-ck&apos;s headless agent runner and OpenAI&apos;s{" "}
          <code>codex exec</code>). Neither tool got any special treatment: no
          project instructions, no prior context, no retries.
        </p>
        <p>
          Grading is not self-reported. After each run, we execute the code the
          agent produced with a plain <code>node</code> and check the real exit
          code. cli-ck&apos;s one failure-shaped result would have been Codex
          CLI reporting success on a task that actually throws at runtime — our
          grader caught that instead of trusting the agent&apos;s own summary.
        </p>
        <h3>Caveats</h3>
        <ul>
          <li>
            This is one run of five tasks, not a statistically averaged suite —
            treat it as a snapshot, not a permanent ranking.
          </li>
          <li>
            Token counts are each tool&apos;s own reported input + output
            tokens; a meaningful share of Codex CLI&apos;s input tokens were
            cached (not fully billed at first-use rates), but the raw count is
            what we report here.
          </li>
          <li>
            Warp&apos;s <code>oz agent run</code> was originally in scope too,
            but its plain (non-cloud) exec command is credit-gated with no
            bring-your-own-key path, so we substituted Codex CLI, which
            authenticates purely with an API key.
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
