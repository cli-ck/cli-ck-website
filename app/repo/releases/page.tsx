import type { Metadata } from "next"

import {
  PageHero,
  PageShellWrapper,
} from "@/components/landing-layout/page-shell-wrapper"
import { UpdatesBoard } from "@/components/updates/updates-board"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Releases",
  description: "Manage Click feature requests and follow the public roadmap.",
  alternates: { canonical: `${SITE.url}/repo/releases` },
}

export default function RepoReleasesPage() {
  return (
    <PageShellWrapper>
      <PageHero
        eyebrow="Releases"
        title="Manage the Click roadmap."
        lead="Sign in to create, edit, and delete your own feature requests. Roadmap changes remain visible on the public updates page."
        meta={
          <>
            <span>Authenticated workspace</span>
            <span className="size-1 rounded-full bg-muted-foreground/40" />
            <span>Clerk coming next</span>
          </>
        }
      />
      <UpdatesBoard />
    </PageShellWrapper>
  )
}
