import { GithubIcon, RssIcon, Tag01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { Metadata } from "next"
import Link from "next/link"

import { PageHero, PageShellWrapper } from "@/components/landing-layout/page-shell-wrapper"
import { Button } from "@/components/ui/button"
import { CHANGELOG, type ChangeKind } from "@/lib/changelog"
import { SITE, VERSION } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Changelog",
  description: `Every notable change to ${SITE.name}, oldest to newest.`,
  alternates: { canonical: `${SITE.url}/changelog` },
}

const kindStyles: Record<ChangeKind, string> = {
  Added:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 dark:text-emerald-300",
  Changed:
    "border-sky-500/30 bg-sky-500/10 text-sky-300 dark:text-sky-300",
  Fixed:
    "border-amber-500/30 bg-amber-500/10 text-amber-300 dark:text-amber-300",
}

export default function ChangelogPage() {
  return (
    <PageShellWrapper>
      <PageHero
        eyebrow="Changelog"
        title="Changelog"
        lead="Notable changes across releases. SemVer, loosely - pre-1.0 minors may include breaking changes."
        meta={
          <>
            <span>Latest · v{VERSION}</span>
            <span className="size-1 rounded-full bg-muted-foreground/40" />
            <span>Apache-2.0</span>
          </>
        }
      />

      <div className="mx-auto mb-10 flex max-w-3xl flex-wrap items-center justify-center gap-3 px-4 sm:px-6">
        <Button asChild variant="outline" size="sm" className="rounded-full">
          <Link
            href={SITE.githubReleases}
            target="_blank"
            rel="noreferrer"
          >
            <HugeiconsIcon icon={GithubIcon} strokeWidth={2} />
            GitHub Releases
          </Link>
        </Button>
        <Button asChild variant="ghost" size="sm" className="rounded-full">
          <Link
            href={`${SITE.github}/blob/main/CHANGELOG.md`}
            target="_blank"
            rel="noreferrer"
          >
            <HugeiconsIcon icon={RssIcon} strokeWidth={2} />
            Source CHANGELOG.md
          </Link>
        </Button>
      </div>

      <section className="relative pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ol className="relative space-y-10 border-l border-border/60 pl-8 sm:pl-10">
            {CHANGELOG.map((entry, idx) => {
              const isLatest = idx === 0
              return (
                <li key={entry.version} className="relative">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -left-[37px] flex size-5 items-center justify-center rounded-full border bg-background sm:-left-[45px]",
                      isLatest
                        ? "border-foreground/70 shadow-[0_0_0_4px_color-mix(in_srgb,var(--foreground)_8%,transparent)]"
                        : "border-border"
                    )}
                  >
                    <HugeiconsIcon
                      icon={Tag01Icon}
                      className="size-2.5"
                      strokeWidth={2.4}
                    />
                  </span>

                  <div className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm sm:p-7">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h2 className="font-mono text-xl font-semibold tracking-tight">
                        v{entry.version}
                      </h2>
                      {entry.date ? (
                        <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
                          {entry.date}
                        </span>
                      ) : null}
                      {isLatest ? (
                        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-emerald-300 uppercase">
                          Latest
                        </span>
                      ) : null}
                    </div>

                    {entry.highlight ? (
                      <p className="mt-2 text-base text-foreground/85 sm:text-lg">
                        {entry.highlight}
                      </p>
                    ) : null}

                    {entry.note ? (
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {entry.note}
                      </p>
                    ) : null}

                    <div className="mt-5 space-y-5">
                      {entry.groups.map((g) => (
                        <div key={g.kind}>
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase",
                                kindStyles[g.kind]
                              )}
                            >
                              {g.kind}
                            </span>
                          </div>
                          <ul className="mt-3 space-y-2 pl-1">
                            {g.items.map((item, i) => (
                              <li
                                key={i}
                                className="relative pl-5 text-sm leading-relaxed text-foreground/75 before:absolute before:top-2.5 before:left-0 before:size-1 before:rounded-full before:bg-muted-foreground/50"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>
    </PageShellWrapper>
  )
}
