import { SITE } from "./site"

type GithubReleaseAsset = {
  name: string
  browser_download_url: string
}

type GithubRelease = {
  tag_name: string
  html_url: string
  draft: boolean
  assets: GithubReleaseAsset[]
}

export type ReleaseDownload = {
  file: string
  url?: string
}

export type ReleaseDownloads = {
  version: string
  releaseUrl: string
  macSilicon: ReleaseDownload
  macIntel: ReleaseDownload
  linuxAppImage: ReleaseDownload
  linuxDeb: ReleaseDownload
  linuxRpm: ReleaseDownload
  windows: ReleaseDownload
}

function asset(
  assets: GithubReleaseAsset[],
  matches: (name: string) => boolean
): ReleaseDownload {
  const found = assets.find((candidate) => matches(candidate.name))
  return found
    ? { file: found.name, url: found.browser_download_url }
    : { file: "Not included in this beta" }
}

export function selectBetaDownloads(
  releases: GithubRelease[]
): ReleaseDownloads | null {
  const release = releases.find(
    (candidate) => !candidate.draft && /-beta$/.test(candidate.tag_name)
  )
  if (!release) return null

  return {
    version: release.tag_name.replace(/^v/, ""),
    releaseUrl: release.html_url,
    macSilicon: asset(release.assets, (name) => name.endsWith("_aarch64.dmg")),
    macIntel: asset(release.assets, (name) => name.endsWith("_x64.dmg")),
    linuxAppImage: asset(release.assets, (name) => name.endsWith(".AppImage")),
    linuxDeb: asset(release.assets, (name) => name.endsWith("_amd64.deb")),
    linuxRpm: asset(release.assets, (name) => name.endsWith(".x86_64.rpm")),
    windows: asset(release.assets, (name) => name.endsWith("_x64-setup.exe")),
  }
}

export async function getLatestBetaDownloads(): Promise<ReleaseDownloads | null> {
  const response = await fetch(
    `${SITE.github}/releases?per_page=100`.replace(
      "github.com/",
      "api.github.com/repos/"
    )
  )
  if (!response.ok) throw new Error(`GitHub API ${response.status}`)
  return selectBetaDownloads((await response.json()) as GithubRelease[])
}
