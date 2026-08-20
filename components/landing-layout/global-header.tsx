import { getTotalDownloads } from "@/lib/downloads"
import { formatStars, getRepoStars } from "@/lib/github"
import { getTotalViews } from "@/lib/goatcounter"
import { GlobalHeaderShell } from "./global-header-shell"

export async function GlobalHeader() {
  const [stars, downloads, views] = await Promise.all([
    getRepoStars(),
    getTotalDownloads(),
    getTotalViews(),
  ])
  return (
    <GlobalHeaderShell
      stars={stars != null ? formatStars(stars) : null}
      rawStars={stars}
      downloads={downloads}
      views={views}
    />
  )
}
