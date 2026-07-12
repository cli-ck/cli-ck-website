"use client"

import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import FluidFlow from "../fluid-flow"

export function AccentBackdrop() {
  const { resolvedTheme } = useTheme()
  const pathname = usePathname()
  const isDark = resolvedTheme !== "light"

  if (pathname?.startsWith("/docs")) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0">
        <FluidFlow
          rotation={-25}
          speed={0.3}
          warpIntensity={0.4}
          innerLineCount={45}
          outerLineCount={12}
          edgeFadeWidth={0}
          colorCycleSpeed={0.5}
          brightness={isDark ? 0.28 : 0.55}
          color1="#047857"
          color2="#10b981"
          color3="#6ee7b7"
          enableMouseInteraction
          mouseInfluence={1.8}
        />
      </div>
      {/* Top + bottom fade so content remains readable */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      {/* Center vignette to anchor content */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_92%)] opacity-70"
        style={{ ["--background" as never]: "var(--background)" }}
      />
    </div>
  )
}
