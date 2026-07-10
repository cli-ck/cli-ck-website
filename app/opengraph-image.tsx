import { SITE, VERSION } from "@/lib/site"
import { ImageResponse } from "next/og"

export const dynamic = "force-static"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = `${SITE.name} - ${SITE.tagline}`

export default function OG() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        background:
          "radial-gradient(1200px 600px at 20% 0%, #1e293b 0%, #09090b 55%, #000 100%)",
        color: "white",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "linear-gradient(135deg, #fff 0%, #94a3b8 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0a0a0a",
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: -1,
          }}
        >
          O
        </div>
        <div style={{ display: "flex", fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>
          {SITE.name}
        </div>
        <div
          style={{
            display: "flex",
            marginLeft: 12,
            padding: "6px 14px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.14)",
            fontSize: 18,
            color: "#cbd5e1",
          }}
        >
          v{VERSION}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          The AI-native terminal that ships at the speed of thought.
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#94a3b8",
            display: "flex",
            gap: 24,
          }}
        >
          <span>Under 10 MB</span>
          <span style={{ color: "#475569" }}>·</span>
          <span>300 ms cold start</span>
          <span style={{ color: "#475569" }}>·</span>
          <span>BYOK · Local LLMs · Open source</span>
        </div>
      </div>

      <div
        style={{
          fontSize: 22,
          color: "#64748b",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>{SITE.domain}</span>
        <span>github.com/codecollab-co/oz</span>
      </div>
    </div>,
    { ...size }
  )
}
