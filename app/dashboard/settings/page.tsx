import type { Metadata } from "next"

import { PageShellWrapper } from "@/components/landing-layout/page-shell-wrapper"
import { UsageDashboard } from "@/components/dashboard/usage-dashboard"

export const metadata: Metadata = { title: "Settings preview" }

export default function SettingsPage() {
  return (
    <PageShellWrapper>
      <UsageDashboard page="settings" />
    </PageShellWrapper>
  )
}
