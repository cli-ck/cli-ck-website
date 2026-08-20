"use client"

import {
  Download04Icon,
  GithubIcon,
  StarIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { SITE } from "@/lib/site"
import { cn, formatCompactNumber } from "@/lib/utils"
import { ThemeToggleControl } from "./theme-toggle-control"
import logoImg from "@/public/cli_ck_icon_256.png"

function SimpleEyeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/about", label: "About" },
  { href: "/changelog", label: "Changelog" },
  { href: "/docs/reference/shortcuts", label: "Shortcuts" },
  { href: "/#faq", label: "FAQ" },
  { href: "/docs", label: "Docs" },
]

interface HeaderShellProps {
  stars: string | null
  rawStars: number | null
  downloads: number | null
  views: number | null
}

export function GlobalHeaderShell({
  stars,
  rawStars,
  downloads,
  views,
}: HeaderShellProps) {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-[var(--rename-banner-h,0px)] z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div
        className={cn(
          "mx-3 flex max-w-6xl items-center justify-between gap-4 px-4 sm:mx-auto sm:px-6",
          "rounded-full transition-all duration-300",
          scrolled &&
            "border border-white/10 bg-white/70 px-4 py-2 shadow-lg shadow-black/[0.04] backdrop-blur-xl dark:border-white/[0.08] dark:bg-zinc-950/60 dark:shadow-black/40"
        )}
      >
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-semibold tracking-tight"
            aria-label={`${SITE.name} home`}
          >
            <Image
              src={logoImg}
              alt=""
              width={28}
              height={28}
              priority
              className="rounded-md"
            />
            <span className="text-base">{SITE.name}</span>
          </Link>

          {stars ? (
            <motion.div
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <Link
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                aria-label={
                  rawStars != null ? `${rawStars} GitHub stars` : "GitHub stars"
                }
                className={cn(
                  "group ml-1 hidden items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-2.5 py-1 font-mono text-[11px] tracking-tight text-foreground/80 backdrop-blur-md transition-colors hover:border-foreground/30 hover:text-foreground sm:inline-flex"
                )}
              >
                <HugeiconsIcon
                  icon={StarIcon}
                  className="size-3 transition-transform group-hover:scale-110"
                  strokeWidth={2.5}
                />
                <span className="tabular-nums">{stars}</span>
              </Link>
            </motion.div>
          ) : null}

          {downloads != null || views != null ? (
            <motion.div
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              aria-label={
                [
                  downloads != null ? `${downloads} downloads` : null,
                  views != null ? `${views} views` : null,
                ]
                  .filter(Boolean)
                  .join(", ") || undefined
              }
              className="hidden items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-2.5 py-1 font-mono text-[11px] tracking-tight text-foreground/80 backdrop-blur-md sm:inline-flex"
            >
              {downloads != null ? (
                <span className="inline-flex items-center gap-1">
                  <HugeiconsIcon
                    icon={Download04Icon}
                    className="size-3"
                    strokeWidth={2.5}
                  />
                  <span className="tabular-nums">
                    {formatCompactNumber(downloads)}
                  </span>
                </span>
              ) : null}
              {downloads != null && views != null ? (
                <span className="text-muted-foreground/40">·</span>
              ) : null}
              {views != null ? (
                <span className="inline-flex items-center gap-1">
                  <SimpleEyeIcon className="size-3" />
                  <span className="tabular-nums">
                    {formatCompactNumber(views)}
                  </span>
                </span>
              ) : null}
            </motion.div>
          ) : null}
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <HugeiconsIcon
              icon={GithubIcon}
              className="size-3.5"
              strokeWidth={2}
            />
            GitHub
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggleControl />
          <div className="relative">
            <Button asChild size="sm" className="rounded-full">
              <Link href="#download">
                <HugeiconsIcon icon={Download04Icon} strokeWidth={2} />
                Downloads
              </Link>
            </Button>
            {downloads != null ? (
              <span
                aria-hidden
                className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center rounded-full bg-background px-1 py-px font-mono text-[9px] leading-tight text-foreground tabular-nums shadow-sm ring-1 ring-border/60"
              >
                {formatCompactNumber(downloads)}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}
