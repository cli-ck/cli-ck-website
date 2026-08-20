import * as React from "react"

import { cn } from "@/lib/utils"
import { GlobalFooter } from "./global-footer"
import { GlobalHeader } from "./global-header"
import { RenameBanner } from "./rename-banner"

export function PageShellWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RenameBanner />
      <GlobalHeader />
      <main className="relative pt-[var(--rename-banner-h,0px)] transition-[padding] duration-300">
        {children}
      </main>
      <GlobalFooter />
    </>
  )
}

export function PageHero({
  eyebrow,
  title,
  lead,
  meta,
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  meta?: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden pt-36 pb-12 sm:pt-44 sm:pb-16",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[50vh] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,255,255,0.05),transparent_70%)]"
      />
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        {eyebrow ? (
          <div className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            {eyebrow}
          </div>
        ) : null}
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {lead ? (
          <p className="mx-auto mt-6 max-w-2xl text-base text-balance text-foreground/70 sm:text-lg">
            {lead}
          </p>
        ) : null}
        {meta ? (
          <div className="mt-6 flex items-center justify-center gap-3 font-mono text-[11px] tracking-[0.12em] text-foreground/60 uppercase">
            {meta}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "prose-cli-ck mx-auto max-w-3xl px-4 sm:px-6",
        "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] sm:[&_h2]:text-3xl",
        "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:tracking-[-0.01em]",
        "[&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-foreground/75",
        "[&_ul]:mt-4 [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:marker:text-muted-foreground/50",
        "[&_ol]:mt-4 [&_ol]:space-y-2 [&_ol]:pl-5 [&_ol]:list-decimal [&_ol]:marker:text-muted-foreground/50",
        "[&_li]:text-foreground/75 [&_li]:leading-relaxed",
        "[&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-muted-foreground/40 hover:[&_a]:decoration-foreground",
        "[&_code]:rounded-md [&_code]:border [&_code]:border-border/60 [&_code]:bg-muted/40 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em]",
        "[&_strong]:text-foreground [&_strong]:font-semibold",
        "[&_hr]:my-12 [&_hr]:border-border/60",
        className
      )}
    >
      {children}
    </div>
  )
}
