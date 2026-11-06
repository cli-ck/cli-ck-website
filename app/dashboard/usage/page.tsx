import type { Metadata } from "next"

import { PageShellWrapper } from "@/components/landing-layout/page-shell-wrapper"
import { UsageDashboard } from "@/components/dashboard/usage-dashboard"

export const metadata: Metadata = { title: "Usage preview" }

export default function UsagePage() {
  return (
    <PageShellWrapper>
      <UsageDashboard page="usage" />
    </PageShellWrapper>
  )
}
