"use client"

import Link from "next/link"
import * as React from "react"

const STORAGE_KEY = "cli-ck-rename-banner-dismissed"

/** Survives remounts so client navigations don't wait another effect. */
let remembered: boolean | null = null

function readDismissed(): boolean {
  return localStorage.getItem(STORAGE_KEY) === "1"
}

function persistDismissed() {
  localStorage.setItem(STORAGE_KEY, "1")
  remembered = true
}

export function RenameBanner() {
  const ref = React.useRef<HTMLDivElement>(null)
  // null = not read yet. Defaulting to false painted the banner on every
  // SSR/hydration, then hid it after localStorage — a flash after dismiss.
  const [dismissed, setDismissed] = React.useState<boolean | null>(remembered)

  React.useEffect(() => {
    const next = readDismissed()
    remembered = next
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDismissed(next)
  }, [])

  React.useEffect(() => {
    const el = ref.current
    if (!el || dismissed !== false) {
      document.documentElement.style.setProperty("--rename-banner-h", "0px")
      return
    }
    const setHeight = () =>
      document.documentElement.style.setProperty(
        "--rename-banner-h",
        `${el.offsetHeight}px`
      )
    setHeight()
    const observer = new ResizeObserver(setHeight)
    observer.observe(el)
    return () => observer.disconnect()
  }, [dismissed])

  React.useEffect(() => {
    return () => {
      document.documentElement.style.setProperty("--rename-banner-h", "0px")
    }
  }, [])

  if (dismissed !== false) return null

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between gap-4 bg-primary px-4 py-2.5 text-primary-foreground sm:px-6"
    >
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="size-1.5 shrink-0 rounded-full bg-primary-foreground opacity-70" />
        <span className="font-semibold">Oz is now cli-ck.</span>
        <span className="opacity-70">
          Update your install to keep getting new releases.
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <Link
          href="/changelog"
          className="hidden rounded-full border border-primary-foreground/30 px-3 py-1 font-mono text-xs tracking-tight opacity-90 transition-opacity hover:opacity-100 sm:inline-flex"
        >
          How to update
        </Link>
        <button
          type="button"
          onClick={() => {
            persistDismissed()
            setDismissed(true)
          }}
          aria-label="Dismiss"
          className="text-base leading-none opacity-60 transition-opacity hover:opacity-100"
        >
          &times;
        </button>
      </div>
    </div>
  )
}
