import type { Metadata } from "next"

import { PageShellWrapper } from "@/components/landing-layout/page-shell-wrapper"
import { UsageDashboard } from "@/components/dashboard/usage-dashboard"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Dashboard preview",
  description: "Preview of the cli-ck usage and release dashboard.",
  alternates: { canonical: `${SITE.url}/dashboard` },
}

export default function DashboardPage() {
  return (
    <PageShellWrapper>
      <UsageDashboard page="overview" />
    </PageShellWrapper>
  )
}
