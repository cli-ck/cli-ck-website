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

import { Button } from "@/components/ui/button"
import { DOWNLOADS, SITE, VERSION } from "@/lib/site"
import { cn } from "@/lib/utils"
import { ContentSection, SectionEyebrow, SectionHeading } from "./content-section"

interface BuildRow {
  arch: string
  file: string
  url?: string
  available: boolean
  command?: string
}

interface PlatformBlock {
  id: string
  icon: IconSvgElement
  name: string
  builds: BuildRow[]
  note?: string
}

const platforms: PlatformBlock[] = [
  {
    id: "macos",
    icon: AppleIcon,
    name: "macOS",
    builds: [
      {
        arch: "Apple Silicon · M1+",
        file: DOWNLOADS.macSilicon.file,
        url: DOWNLOADS.macSilicon.url,
        available: true,
      },
      {
        arch: "Intel · x86_64",
        file: DOWNLOADS.macIntel.file,
        url: DOWNLOADS.macIntel.url,
        available: true,
      },
    ],
  },
  {
    id: "linux",
    icon: ComputerIcon,
    name: "Linux",
    builds: [
      {
        arch: "AppImage · x86_64",
        file: DOWNLOADS.linuxAppImage.file,
        url: DOWNLOADS.linuxAppImage.url,
        available: true,
      },
      {
        arch: ".deb · Debian / Ubuntu",
        file: DOWNLOADS.linuxDeb.file,
        url: DOWNLOADS.linuxDeb.url,
        available: true,
      },
      {
        arch: ".rpm · Fedora / RHEL",
        file: DOWNLOADS.linuxRpm.file,
        url: DOWNLOADS.linuxRpm.url,
        available: true,
      },
      {
        arch: "AUR · Arch / Manjaro",
        file: DOWNLOADS.linuxAur.file,
        url: DOWNLOADS.linuxAur.url,
        available: true,
        command: "yay -S cli-ck-bin",
      },
    ],
  },
  {
    id: "windows",
    icon: MicrosoftIcon,
    name: "Windows",
    builds: [
      {
        arch: "x86_64 · NSIS installer",
        file: DOWNLOADS.windows.file,
        url: DOWNLOADS.windows.url,
        available: true,
      },
    ],
  },
]

export function Downloads() {
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
          <SectionEyebrow>06 - Downloads · v{VERSION}</SectionEyebrow>
          <SectionHeading className="mt-3">
            Pick a build. Run it.
          </SectionHeading>
          <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-[17px]">
            No account, no telemetry. Verified releases on GitHub. SHA256
            checksums published with every tag.
          </p>

          <div className="mt-8 space-y-6">
            {/* macOS Box */}
            <div className="rounded-2xl border border-border/60 bg-background/60 p-5 backdrop-blur-sm">
              <div className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                macOS
              </div>
              <div className="mt-2 text-sm text-foreground/85">
                Apple Silicon - Intel build below
              </div>
              <Button asChild size="lg" className="mt-4 w-full rounded-full">
                <Link href={DOWNLOADS.macSilicon.url} target="_blank" rel="noreferrer">
                  <HugeiconsIcon icon={Download04Icon} strokeWidth={2} />
                  Download for macOS
                </Link>
              </Button>
            </div>

            {/* Windows Box */}
            <div className="rounded-2xl border border-border/60 bg-background/60 p-5 backdrop-blur-sm">
              <div className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                Windows
              </div>
              <div className="mt-2 text-sm text-foreground/85">
                x86_64 · NSIS installer
              </div>
              <Button asChild size="lg" className="mt-4 w-full rounded-full">
                <Link href={DOWNLOADS.windows.url} target="_blank" rel="noreferrer">
                  <HugeiconsIcon icon={Download04Icon} strokeWidth={2} />
                  Download for Windows
                </Link>
              </Button>
            </div>

            {/* Linux Box */}
            <div className="rounded-2xl border border-border/60 bg-background/60 p-5 backdrop-blur-sm">
              <div className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                Linux
              </div>
              <div className="mt-2 text-sm text-foreground/85">
                AppImage · x86_64
              </div>
              <Button asChild size="lg" className="mt-4 w-full rounded-full">
                <Link href={DOWNLOADS.linuxAppImage.url} target="_blank" rel="noreferrer">
                  <HugeiconsIcon icon={Download04Icon} strokeWidth={2} />
                  Download for Linux
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href={SITE.githubReleases}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              All releases & checksums
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
                      {p.note && (
                        <div className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
                          {p.note}
                        </div>
                      )}
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
                      ) : b.available && b.url ? (
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
          </div>
        </div>
      </div>
    </ContentSection>
  )
}
