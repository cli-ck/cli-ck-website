import Link from "next/link"

import { cn } from "@/lib/utils"

type UsageDay = {
  label: string
  input: number
  output: number
  cache: number
}

const usageDays: UsageDay[] = [
  { label: "Nov 01", input: 44, output: 20, cache: 14 },
  { label: "Nov 02", input: 56, output: 25, cache: 22 },
  { label: "Nov 03", input: 38, output: 17, cache: 12 },
  { label: "Nov 04", input: 72, output: 31, cache: 38 },
  { label: "Nov 05", input: 64, output: 28, cache: 34 },
  { label: "Nov 06", input: 82, output: 39, cache: 49 },
  { label: "Nov 07", input: 69, output: 34, cache: 43 },
  { label: "Nov 08", input: 91, output: 42, cache: 55 },
  { label: "Nov 09", input: 75, output: 36, cache: 48 },
  { label: "Nov 10", input: 96, output: 47, cache: 63 },
  { label: "Nov 11", input: 84, output: 40, cache: 57 },
  { label: "Nov 12", input: 78, output: 35, cache: 51 },
]

const models = [
  {
    name: "Claude Sonnet 4",
    provider: "Anthropic · API key",
    input: "682K",
    output: "214K",
    cache: "391K",
  },
  {
    name: "GPT-5",
    provider: "OpenAI · API key",
    input: "441K",
    output: "96K",
    cache: "184K",
  },
  {
    name: "Gemini 2.5 Pro",
    provider: "Google · API key",
    input: "218K",
    output: "61K",
    cache: "72K",
  },
  {
    name: "Qwen 2.5 Coder",
    provider: "LM Studio · local",
    input: "77K",
    output: "41K",
    cache: "—",
  },
]

export type DashboardPage = "overview" | "usage" | "releases" | "settings"

const navigation: { label: string; page: DashboardPage; href: string }[] = [
  { label: "Overview", page: "overview", href: "/dashboard" },
  { label: "Usage", page: "usage", href: "/dashboard/usage" },
  { label: "Releases", page: "releases", href: "/dashboard/releases" },
  { label: "Settings", page: "settings", href: "/dashboard/settings" },
]

function StatCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="border border-border/70 bg-card/70 p-4">
      <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] tabular-nums">
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </div>
  )
}

function UsageChart() {
  return (
    <div className="mt-6">
      <div className="flex h-64 items-end gap-1.5 border-b border-l border-border/70 px-3 pb-0 sm:gap-3 sm:px-5">
        {usageDays.map((day) => {
          const total = day.input + day.output + day.cache
          return (
            <div
              key={day.label}
              className="group flex min-w-0 flex-1 items-end justify-center gap-0.5"
              aria-label={`${day.label}: ${total} thousand tokens`}
              title={`${day.label}: ${total}K tokens`}
            >
              <div
                className="w-full max-w-5 bg-foreground/35 transition-colors group-hover:bg-foreground/50"
                style={{ height: `${(day.input / 220) * 100}%` }}
              />
              <div
                className="w-full max-w-5 bg-foreground/60 transition-colors group-hover:bg-foreground/75"
                style={{ height: `${(day.output / 220) * 100}%` }}
              />
              <div
                className="w-full max-w-5 bg-emerald-400/80 transition-colors group-hover:bg-emerald-300"
                style={{ height: `${(day.cache / 220) * 100}%` }}
              />
            </div>
          )
        })}
      </div>
      <div className="mt-3 flex justify-between pl-3 font-mono text-[10px] text-muted-foreground sm:pl-5">
        <span>Nov 01</span>
        <span>Nov 06</span>
        <span>Nov 12</span>
      </div>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
        <span className="inline-flex items-center gap-2">
          <span className="size-2 bg-foreground/35" /> Input
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2 bg-foreground/60" /> Output
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2 bg-emerald-400/80" /> Cache
        </span>
      </div>
    </div>
  )
}

export function UsageDashboard({ page }: { page: DashboardPage }) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden pt-28 pb-20 sm:pt-36">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-40" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[210px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Account preview
            </p>
            <nav className="mt-6 space-y-1" aria-label="Dashboard navigation">
              {navigation.map((item) => (
                <Link
                  key={item.page}
                  href={item.href}
                  className={cn(
                    "block border-l px-3 py-2 text-sm transition-colors hover:border-foreground hover:text-foreground",
                    page === item.page
                      ? "border-foreground text-foreground"
                      : "border-border/60 text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-10 border-t border-border/60 pt-4">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Demo data only. No account or usage data is connected yet.
              </p>
            </div>
          </div>
        </aside>

        <main id={page} className="min-w-0">
          <div className="flex flex-col gap-5 border-b border-border/70 pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-emerald-500 uppercase dark:text-emerald-300">
                {page === "overview" ? "Account dashboard · preview" : `${page} · preview`}
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                {page === "overview"
                  ? "Good morning, Alex."
                  : page === "usage"
                    ? "Usage across your sessions."
                    : page === "releases"
                      ? "Manage the Click roadmap."
                      : "Your account and data boundary."}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {page === "overview"
                  ? "See how Click is using models across your sessions. Counts below are illustrative and are not connected to a provider."
                  : page === "usage"
                    ? "Review input, output, and cache tokens by day, model, and provider."
                    : page === "releases"
                      ? "Feature requests and release controls will be connected after authentication."
                      : "Review what Click records and which fields are deliberately excluded."}
              </p>
            </div>
            {page === "usage" || page === "overview" ? (
              <div className="flex items-center gap-2">
              <select
                aria-label="Usage period"
                defaultValue="november"
                className="h-9 border border-border/70 bg-background px-3 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="november">Nov 1–30, 2026</option>
                <option value="october">Oct 1–31, 2026</option>
              </select>
              <select
                aria-label="Provider filter"
                defaultValue="all"
                className="h-9 border border-border/70 bg-background px-3 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All providers</option>
                <option value="anthropic">Anthropic</option>
                <option value="openai">OpenAI</option>
                <option value="google">Google</option>
                <option value="local">Local</option>
              </select>
              </div>
            ) : null}
          </div>

          {page === "overview" || page === "usage" ? (
            <section className="mt-7 grid gap-3 sm:grid-cols-3" aria-label="Usage summary">
              <StatCard label="Total tokens" value="1.84M" detail="Input + output + cache" />
              <StatCard label="Output tokens" value="412K" detail="Across 4 models" />
              <StatCard label="Models used" value="22" detail="From 4 providers" />
            </section>
          ) : null}

          {page === "overview" || page === "usage" ? <section className="mt-7 border border-border/70 bg-card/45 p-4 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                  Token activity
                </p>
                <h2 className="mt-2 text-lg font-semibold tracking-tight">Daily usage</h2>
              </div>
              <p className="text-xs text-muted-foreground">12-day preview window · values in thousands</p>
            </div>
            <UsageChart />
          </section> : null}

          {page === "usage" ? <section className="mt-7 border border-border/70 bg-card/45" aria-labelledby="model-heading">
            <div className="flex items-end justify-between gap-4 border-b border-border/70 p-4 sm:p-6">
              <div>
                <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                  Breakdown
                </p>
                <h2 id="model-heading" className="mt-2 text-lg font-semibold tracking-tight">
                  Models and providers
                </h2>
              </div>
              <span className="hidden font-mono text-[10px] text-muted-foreground sm:block">
                Provider-reported where available
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <caption className="sr-only">Token usage by model and provider</caption>
                <thead className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                  <tr>
                    <th className="px-4 py-3 font-normal sm:px-6">Model</th>
                    <th className="px-4 py-3 font-normal">Input</th>
                    <th className="px-4 py-3 font-normal">Output</th>
                    <th className="px-4 py-3 font-normal">Cache</th>
                    <th className="px-4 py-3 font-normal">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((model) => (
                    <tr key={model.name} className="border-t border-border/60">
                      <th className="px-4 py-4 font-medium sm:px-6">
                        <span className="block">{model.name}</span>
                        <span className="mt-1 block text-xs font-normal text-muted-foreground">
                          {model.provider}
                        </span>
                      </th>
                      <td className="px-4 py-4 font-mono text-xs tabular-nums">{model.input}</td>
                      <td className="px-4 py-4 font-mono text-xs tabular-nums">{model.output}</td>
                      <td className="px-4 py-4 font-mono text-xs tabular-nums">{model.cache}</td>
                      <td className="px-4 py-4 text-xs text-muted-foreground">
                        {model.name === "Qwen 2.5 Coder" ? "Local runtime" : "Click report"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section> : null}

          {page === "releases" ? <section className="mt-7 grid gap-3 md:grid-cols-2">
            <div className="border border-border/70 bg-card/45 p-5">
              <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                Releases
              </p>
              <h2 className="mt-2 text-lg font-semibold tracking-tight">Roadmap access</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Maintainers will manage roadmap moves and release changes here
                after authentication is connected.
              </p>
              <Link
                href="/repo/releases"
                className="mt-5 inline-flex border border-foreground bg-foreground px-3 py-2 text-xs font-medium text-background transition-opacity hover:opacity-80"
              >
                Open roadmap workspace
              </Link>
              <span className="ml-2 inline-flex border border-border/70 px-2 py-1 font-mono text-[10px] text-muted-foreground uppercase">
                Coming with auth
              </span>
            </div>
          </section> : null}

          {page === "settings" ? <section className="mt-7 grid gap-3 md:grid-cols-2">
            <div className="border border-border/70 bg-card/45 p-5">
              <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                Data boundary
              </p>
              <h2 className="mt-2 text-lg font-semibold tracking-tight">Privacy by field</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Click records token counts, model, provider, timestamp, and resource session ID.
                It does not record prompts, completions, API keys, file counts, or workspace paths.
              </p>
              <span className="mt-5 inline-flex border border-border/70 px-2 py-1 font-mono text-[10px] text-muted-foreground uppercase">
                Automatic recording
              </span>
            </div>
            <div className="border border-border/70 bg-card/45 p-5">
              <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                Account
              </p>
              <h2 className="mt-2 text-lg font-semibold tracking-tight">Authentication preview</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Google and GitHub login will be connected after the server-capable hosting move.
              </p>
              <span className="mt-5 inline-flex border border-border/70 px-2 py-1 font-mono text-[10px] text-muted-foreground uppercase">
                Coming with auth
              </span>
            </div>
          </section> : null}
        </main>
      </div>
    </div>
  )
}
