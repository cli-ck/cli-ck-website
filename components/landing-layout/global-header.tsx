import { getTotalDownloads } from "@/lib/downloads"
import { getRepoStars } from "@/lib/github"
import { getTotalViews } from "@/lib/goatcounter"
import { formatCompactNumber } from "@/lib/utils"
import { GlobalHeaderShell } from "./global-header-shell"

export async function GlobalHeader() {
  const [stars, downloads, views] = await Promise.all([
    getRepoStars(),
    getTotalDownloads(),
    getTotalViews(),
  ])
  return (
    <GlobalHeaderShell
      stars={stars != null ? formatCompactNumber(stars) : null}
      rawStars={stars}
      downloads={downloads}
      views={views}
    />
  )
}
