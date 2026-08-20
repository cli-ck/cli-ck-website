import { SITE } from "./site"

const REPO_PATH = SITE.github.replace(/^https?:\/\/github\.com\//, "")
const NPM_PACKAGES = ["@codecollab.co/cli-ck", "@codecollab.co/oz"]
const DAY = 24 * 60 * 60 * 1000

function githubHeaders() {
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "cli-ck-website",
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  }
}

async function getGithubReleaseDownloads(): Promise<number | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO_PATH}/releases?per_page=100`,
      { headers: githubHeaders(), next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    const releases = (await res.json()) as Array<{
      assets: Array<{ download_count: number }>
    }>
    return releases.reduce(
      (sum, r) => sum + r.assets.reduce((s, a) => s + a.download_count, 0),
      0
    )
  } catch {
    return null
  }
}

const fmtDate = (d: Date) => d.toISOString().slice(0, 10)

async function getNpmPackageTotal(pkg: string): Promise<number> {
  try {
    const metaRes = await fetch(`https://registry.npmjs.org/${pkg}`, {
      next: { revalidate: 3600 },
    })
    if (!metaRes.ok) return 0
    const meta = (await metaRes.json()) as { time?: { created?: string } }
    const created = meta.time?.created ? new Date(meta.time.created) : null
    if (!created) return 0

    // npm's downloads/range endpoint caps a single query at ~18 months,
    // so we sum the package's whole lifetime in 1-year windows.
    const windows: Array<[Date, Date]> = []
    let start = created
    const now = new Date()
    while (start < now) {
      const end = new Date(Math.min(start.getTime() + 364 * DAY, now.getTime()))
      windows.push([start, end])
      start = new Date(end.getTime() + DAY)
    }

    const totals = await Promise.all(
      windows.map(async ([from, to]) => {
        const res = await fetch(
          `https://api.npmjs.org/downloads/range/${fmtDate(from)}:${fmtDate(to)}/${pkg}`,
          { next: { revalidate: 3600 } }
        )
        if (!res.ok) return 0
        const data = (await res.json()) as {
          downloads?: Array<{ downloads: number }>
        }
        return (data.downloads ?? []).reduce((s, d) => s + d.downloads, 0)
      })
    )
    return totals.reduce((a, b) => a + b, 0)
  } catch {
    return 0
  }
}

export async function getTotalDownloads(): Promise<number | null> {
  const [github, ...npm] = await Promise.all([
    getGithubReleaseDownloads(),
    ...NPM_PACKAGES.map(getNpmPackageTotal),
  ])
  if (github === null) return null
  return github + npm.reduce((a, b) => a + b, 0)
}
