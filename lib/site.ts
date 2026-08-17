export const VERSION = "0.2.6"

export const SITE = {
  name: "cli-ck",
  domain: "cli-ck.github.io/cli-ck-website",
  url: "https://cli-ck.github.io/cli-ck-website",
  tagline: "Terminal-first AI-native dev workspace",
  description:
    "cli-ck is a lightweight AI terminal with a built-in editor, AI agents, voice input, and live web preview. 7 MB on disk, 300 ms cold start. Free and open source. BYOK or fully local via LM Studio.",
  github: "https://github.com/cli-ck/cli-ck",
  githubReleases: "https://github.com/cli-ck/cli-ck/releases",
  issues: "https://github.com/cli-ck/cli-ck/issues",
  websiteRepo: "https://github.com/cli-ck/cli-ck-website",
  aur: "https://aur.archlinux.org/packages/cli-ck-bin",
  demoVideoId: "kykgXa7sm1g",
  demoVideoUrl: "https://youtu.be/kykgXa7sm1g",
  youtube: "https://www.youtube.com/@codecollab-co",
} as const

const releaseBase = `${SITE.githubReleases}/download/v${VERSION}`

export const DOWNLOADS = {
  macSilicon: {
    label: "macOS · Apple Silicon",
    file: `cli-ck_${VERSION}_aarch64.dmg`,
    arch: "Apple Silicon (M1+)",
    url: `${releaseBase}/cli-ck_${VERSION}_aarch64.dmg`,
    available: true,
  },
  macIntel: {
    label: "macOS · Intel",
    file: `cli-ck_${VERSION}_x64.dmg`,
    arch: "Intel (x86_64)",
    url: `${releaseBase}/cli-ck_${VERSION}_x64.dmg`,
    available: true,
  },
  linuxAppImage: {
    label: "Linux · AppImage",
    file: `cli-ck_${VERSION}_amd64.AppImage`,
    arch: "x86_64",
    url: `${releaseBase}/cli-ck_${VERSION}_amd64.AppImage`,
    available: true,
  },
  linuxDeb: {
    label: "Linux · .deb",
    file: `cli-ck_${VERSION}_amd64.deb`,
    arch: "Debian / Ubuntu",
    url: `${releaseBase}/cli-ck_${VERSION}_amd64.deb`,
    available: true,
  },
  linuxRpm: {
    label: "Linux · .rpm",
    file: `cli-ck-${VERSION}-1.x86_64.rpm`,
    arch: "Fedora / RHEL",
    url: `${releaseBase}/cli-ck-${VERSION}-1.x86_64.rpm`,
    available: true,
  },
  linuxAur: {
    label: "Linux · AUR",
    file: "cli-ck-bin",
    arch: "Arch Linux / Manjaro",
    url: "https://aur.archlinux.org/packages/cli-ck-bin",
    available: true,
  },
  windows: {
    label: "Windows",
    file: `cli-ck_${VERSION}_x64-setup.exe`,
    arch: "x86_64",
    url: `${releaseBase}/cli-ck_${VERSION}_x64-setup.exe`,
    available: true,
  },
} as const

export type DownloadKey = keyof typeof DOWNLOADS
