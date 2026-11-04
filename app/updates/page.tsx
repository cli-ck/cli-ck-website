import type { Metadata } from "next"
import Link from "next/link"

import {
  PageHero,
  PageShellWrapper,
} from "@/components/landing-layout/page-shell-wrapper"
import { Button } from "@/components/ui/button"
import { UpdatesBoard } from "@/components/updates/updates-board"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Updates",
  description:
    "Follow the cli-ck roadmap, request features, and see what the team is building in public.",
  alternates: { canonical: `${SITE.url}/updates` },
}

export default function UpdatesPage() {
  return (
    <PageShellWrapper>
      <PageHero
        eyebrow="Updates"
        title="Build the roadmap with us."
        lead="A public view of what’s being requested, planned, built, and delayed — plus the latest benchmarks, changelog, docs, and source code."
        meta={
          <>
            <span>Public roadmap</span>
            <span className="size-1 rounded-full bg-muted-foreground/40" />
            <span>Community shaped</span>
          </>
        }
      />
      <div className="mx-auto mb-12 flex max-w-3xl flex-wrap justify-center gap-2 px-4 sm:px-6">
        <Button asChild variant="outline" size="sm">
          <Link href="/benchmarks">Benchmarks</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href="/changelog">Changelog</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href="/docs">Docs</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href={SITE.github} target="_blank" rel="noreferrer">
            GitHub
          </Link>
        </Button>
      </div>
      <UpdatesBoard />
    </PageShellWrapper>
  )
}
