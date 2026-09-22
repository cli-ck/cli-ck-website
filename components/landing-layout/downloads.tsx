"use client"

import {
  AppleIcon,
  ArrowRight01Icon,
  ComputerIcon,
  Download04Icon,
  MicrosoftIcon,
} from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  getLatestBetaDownloads,
  type ReleaseDownload,
  type ReleaseDownloads,
} from "@/lib/beta-downloads"
import { DOWNLOADS, SITE, VERSION } from "@/lib/site"
import { cn } from "@/lib/utils"
import {
  ContentSection,
  SectionEyebrow,
  SectionHeading,
} from "./content-section"

interface BuildRow extends ReleaseDownload {
  arch: string
  command?: string
}

interface PlatformBlock {
  id: string
  icon: IconSvgElement
  name: string
  builds: BuildRow[]
}

type Channel = "normal" | "developer"

const stableDownloads: ReleaseDownloads = {
  version: VERSION,
  releaseUrl: `${SITE.githubReleases}/tag/v${VERSION}`,
  macSilicon: DOWNLOADS.macSilicon,
  macIntel: DOWNLOADS.macIntel,
  linuxAppImage: DOWNLOADS.linuxAppImage,
  linuxDeb: DOWNLOADS.linuxDeb,
  linuxRpm: DOWNLOADS.linuxRpm,
  windows: DOWNLOADS.windows,
}

function platformBlocks(
  downloads: ReleaseDownloads,
  includeAur: boolean
): PlatformBlock[] {
  const linuxBuilds: BuildRow[] = [
    { arch: "AppImage · x86_64", ...downloads.linuxAppImage },
    { arch: ".deb · Debian / Ubuntu", ...downloads.linuxDeb },
    { arch: ".rpm · Fedora / RHEL", ...downloads.linuxRpm },
  ]
  if (includeAur) {
    linuxBuilds.push({
      arch: "AUR · Arch / Manjaro",
      file: DOWNLOADS.linuxAur.file,
      url: DOWNLOADS.linuxAur.url,
      command: "yay -S cli-ck-bin",
    })
  }

  return [
    {
      id: "macos",
      icon: AppleIcon,
      name: "macOS",
      builds: [
        { arch: "Apple Silicon · M1+", ...downloads.macSilicon },
        { arch: "Intel · x86_64", ...downloads.macIntel },
      ],
    },
    { id: "linux", icon: ComputerIcon, name: "Linux", builds: linuxBuilds },
    {
      id: "windows",
      icon: MicrosoftIcon,
      name: "Windows",
      builds: [{ arch: "x86_64 · NSIS installer", ...downloads.windows }],
    },
  ]
}

export function Downloads() {
  const [channel, setChannel] = useState<Channel>("normal")
  const [beta, setBeta] = useState<ReleaseDownloads | null>(null)
  const [betaStatus, setBetaStatus] = useState<
    "idle" | "loading" | "loaded" | "failed"
  >("idle")
  const selectDeveloperMode = () => {
    setChannel("developer")
    if (beta || betaStatus === "loading") return
    setBetaStatus("loading")
    void getLatestBetaDownloads()
      .then((downloads) => {
        setBeta(downloads)
        setBetaStatus("loaded")
      })
      .catch(() => setBetaStatus("failed"))
  }
  const activeDownloads = channel === "normal" ? stableDownloads : beta
  const platforms = activeDownloads
    ? platformBlocks(activeDownloads, channel === "normal")
    : []

  return (
    <ContentSection
      id="download"
      className="overflow-hidden border-t border-border/40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-foreground/[0.025] [mask-image:radial-gradient(ellipse_55%_60%_at_50%_0%,black,transparent_70%)]"
      />
      <div className="relative grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionEyebrow>
            06 - Downloads ·{" "}
            {activeDownloads ? `v${activeDownloads.version}` : "Developer mode"}
          </SectionEyebrow>
          <SectionHeading className="mt-3">
            Pick a build. Run it.
          </SectionHeading>
          <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-[17px]">
            {channel === "normal"
              ? "Stable releases include automatic updates."
              : "Beta builds install separately and may be less reliable."}
          </p>

          <div className="mt-6" role="group" aria-label="Download mode">
            <div className="inline-flex rounded-full border border-border/60 bg-background/60 p-1">
              <button
                type="button"
                aria-pressed={channel === "normal"}
                onClick={() => setChannel("normal")}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  channel === "normal"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Normal mode
              </button>
              <button
                type="button"
                aria-pressed={channel === "developer"}
                onClick={selectDeveloperMode}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  channel === "developer"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Developer mode
              </button>
            </div>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {channel === "normal"
                ? "Use Developer mode only when you want to test the current beta."
                : "Developer mode does not switch your automatic updates to beta."}
            </p>
          </div>

          {activeDownloads ? (
            <div className="mt-8 space-y-6">
              <DownloadCard
                label="macOS"
                detail="Apple Silicon - Intel build below"
                download={activeDownloads.macSilicon}
              />
              <DownloadCard
                label="Windows"
                detail="x86_64 · NSIS installer"
                download={activeDownloads.windows}
              />
              <DownloadCard
                label="Linux"
                detail="AppImage · x86_64"
                download={activeDownloads.linuxAppImage}
              />
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-border/60 bg-background/60 p-5 text-sm text-muted-foreground">
              {betaStatus === "loading"
                ? "Finding the latest beta release…"
                : betaStatus === "failed"
                  ? "Could not load beta releases. Try again, or use the GitHub releases page."
                  : "No beta is published right now. Alphas are shared directly with invited testers."}
            </div>
          )}

          <div className="mt-6">
            <Link
              href={activeDownloads?.releaseUrl ?? SITE.githubReleases}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              {channel === "developer"
                ? "Beta releases on GitHub"
                : "All releases & checksums"}
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="size-3"
                strokeWidth={2}
              />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/60 backdrop-blur-sm">
            {platforms.map((p, i) => (
              <div
                key={p.id}
                className={cn(
                  "px-6 py-6",
                  i !== platforms.length - 1 && "border-b border-border/60"
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-9 items-center justify-center text-foreground/80">
                      <HugeiconsIcon
                        icon={p.icon}
                        className="size-5"
                        strokeWidth={1.8}
                      />
                    </span>
                    <div>
                      <div className="text-base font-medium tracking-tight">
                        {p.name}
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="mt-5 divide-y divide-border/40">
                  {p.builds.map((b) => (
                    <li
                      key={b.file + b.arch}
                      className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="text-sm text-foreground/85">
                          {b.arch}
                        </div>
                        <div className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground/80">
                          {b.file}
                        </div>
                      </div>
                      {b.command ? (
                        <div className="flex items-center gap-2">
                          <code className="rounded-full border border-border/60 bg-background/80 px-3 py-1.5 font-mono text-[12px] text-foreground/85">
                            {b.command}
                          </code>
                          {b.url ? (
                            <Button
                              asChild
                              size="sm"
                              variant="ghost"
                              className="rounded-full"
                            >
                              <Link
                                href={b.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                AUR
                                <HugeiconsIcon
                                  icon={ArrowRight01Icon}
                                  strokeWidth={2}
                                />
                              </Link>
                            </Button>
                          ) : null}
                        </div>
                      ) : b.url ? (
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="rounded-full"
                        >
                          <Link href={b.url} target="_blank" rel="noreferrer">
                            <HugeiconsIcon
                              icon={Download04Icon}
                              strokeWidth={2}
                            />
                            Download
                          </Link>
                        </Button>
                      ) : (
                        <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground/60 uppercase">
                          Soon
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {!activeDownloads && (
              <div className="px-6 py-10 text-center text-sm text-muted-foreground">
                Select Normal mode for the latest stable build.
              </div>
            )}
          </div>
        </div>
      </div>
    </ContentSection>
  )
}

function DownloadCard({
  label,
  detail,
  download,
}: {
  label: string
  detail: string
  download: ReleaseDownload
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background/60 p-5 backdrop-blur-sm">
      <div className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
        {label}
      </div>
      <div className="mt-2 text-sm text-foreground/85">{detail}</div>
      {download.url ? (
        <Button asChild size="lg" className="mt-4 w-full rounded-full">
          <Link href={download.url} target="_blank" rel="noreferrer">
            <HugeiconsIcon icon={Download04Icon} strokeWidth={2} />
            Download for {label}
          </Link>
        </Button>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          Not included in this beta.
        </p>
      )}
    </div>
  )
}
