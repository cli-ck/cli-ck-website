export const VERSION = "0.2.4"

export const SITE = {
  name: "Oz",
  domain: "my-oz.github.io/oz-website",
  url: "https://my-oz.github.io/oz-website",
  tagline: "Terminal-first AI-native dev workspace",
  description:
    "Oz is a lightweight AI terminal with a built-in editor, AI agents, voice input, and live web preview. 7 MB on disk, 300 ms cold start. Free and open source. BYOK or fully local via LM Studio.",
  github: "https://github.com/my-oz/oz",
  githubReleases: "https://github.com/my-oz/oz/releases",
  issues: "https://github.com/my-oz/oz/issues",
  websiteRepo: "https://github.com/my-oz/oz-website",
  aur: "https://aur.archlinux.org/packages/oz-bin",
  demoVideoId: "kykgXa7sm1g",
  demoVideoUrl: "https://youtu.be/kykgXa7sm1g",
  youtube: "https://www.youtube.com/@codecollab-co",
} as const

const releaseBase = `${SITE.githubReleases}/download/v${VERSION}`

export const DOWNLOADS = {
  macSilicon: {
    label: "macOS · Apple Silicon",
    file: `Oz_${VERSION}_aarch64.dmg`,
    arch: "Apple Silicon (M1+)",
    url: `${releaseBase}/Oz_${VERSION}_aarch64.dmg`,
    available: true,
  },
  macIntel: {
    label: "macOS · Intel",
    file: `Oz_${VERSION}_x64.dmg`,
    arch: "Intel (x86_64)",
    url: `${releaseBase}/Oz_${VERSION}_x64.dmg`,
    available: true,
  },
  linuxAppImage: {
    label: "Linux · AppImage",
    file: `Oz_${VERSION}_amd64.AppImage`,
    arch: "x86_64",
    url: `${releaseBase}/Oz_${VERSION}_amd64.AppImage`,
    available: true,
  },
  linuxDeb: {
    label: "Linux · .deb",
    file: `Oz_${VERSION}_amd64.deb`,
    arch: "Debian / Ubuntu",
    url: `${releaseBase}/Oz_${VERSION}_amd64.deb`,
    available: true,
  },
  linuxRpm: {
    label: "Linux · .rpm",
    file: `Oz-${VERSION}-1.x86_64.rpm`,
    arch: "Fedora / RHEL",
    url: `${releaseBase}/Oz-${VERSION}-1.x86_64.rpm`,
    available: true,
  },
  linuxAur: {
    label: "Linux · AUR",
    file: "oz-bin",
    arch: "Arch Linux / Manjaro",
    url: "https://aur.archlinux.org/packages/oz-bin",
    available: true,
  },
  windows: {
    label: "Windows",
    file: `Oz_${VERSION}_x64-setup.exe`,
    arch: "x86_64",
    url: `${releaseBase}/Oz_${VERSION}_x64-setup.exe`,
    available: true,
  },
} as const

export type DownloadKey = keyof typeof DOWNLOADS
