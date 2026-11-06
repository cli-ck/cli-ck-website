import type { Metadata } from "next"

import { PageShellWrapper } from "@/components/landing-layout/page-shell-wrapper"
import { UsageDashboard } from "@/components/dashboard/usage-dashboard"

export const metadata: Metadata = { title: "Releases preview" }

export default function ReleasesPage() {
  return (
    <PageShellWrapper>
      <UsageDashboard page="releases" />
    </PageShellWrapper>
  )
}
