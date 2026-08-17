import { source } from "@/lib/source"
import { SITE } from "@/lib/site"
import { ImageResponse } from "next/og"
import { notFound } from "next/navigation"
import fs from "node:fs"
import path from "node:path"

export async function generateStaticParams() {
  return source.getPages().map((page) => {
    const slug = [...page.slugs]
    if (slug.length === 0) {
      return { slug: ["index.png"] }
    }
    const lastIdx = slug.length - 1
    slug[lastIdx] = `${slug[lastIdx]}.png`
    return { slug }
  })
}

// Load logo once during module load / build time
let logoDataUrl = ""
try {
  const logoPath = path.join(process.cwd(), "public/cli_ck_icon_256.png")
  const logoBuffer = fs.readFileSync(logoPath)
  logoDataUrl = `data:image/png;base64,${logoBuffer.toString("base64")}`
} catch (e) {
  console.error("Failed to load logo from filesystem:", e)
}

export async function GET(
  request: Request,
  props: { params: Promise<{ slug: string[] }> }
) {
  const params = await props.params
  let cleanSlug = [...params.slug]
  if (cleanSlug.length > 0) {
    const lastIdx = cleanSlug.length - 1
    if (cleanSlug[lastIdx].endsWith(".png")) {
      cleanSlug[lastIdx] = cleanSlug[lastIdx].slice(0, -4)
    }
  }
  if (cleanSlug && cleanSlug.length > 0 && cleanSlug[cleanSlug.length - 1] === "index") {
    cleanSlug = cleanSlug.slice(0, -1)
  }
  const page = source.getPage(cleanSlug)

  if (!page) {
    return notFound()
  }

  // Construct breadcrumbs
  const breadcrumbs =
    page.slugs.length > 1
      ? page.slugs
          .slice(0, -1)
          .map((s) => s.replace(/-/g, " "))
          .join(" > ")
      : "Docs"

  // Sibling pages for file-tree fallback
  const parentPath = page.slugs.slice(0, -1)
  const siblingPages = source.getPages().filter((p) => {
    return (
      p.slugs.length === page.slugs.length &&
      p.slugs.slice(0, -1).join("/") === parentPath.join("/")
    )
  })

  const toc = page.data.toc || []
  const hasToc = toc.length > 0

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "48px 48px 0 48px",
        background:
          "radial-gradient(1200px 600px at 20% 0%, #1e293b 0%, #09090b 55%, #000 100%)",
        color: "white",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Logo Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "28px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {logoDataUrl ? (
            <img
              src={logoDataUrl}
              alt=""
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
              }}
            />
          ) : (
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "linear-gradient(135deg, #fff 0%, #94a3b8 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0a0a0a",
                fontSize: 24,
                fontWeight: 800,
              }}
            >
              O
            </div>
          )}
          <span
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            cli-ck
          </span>
          <span
            style={{
              display: "flex",
              fontSize: 22,
              color: "#64748b",
              marginLeft: 4,
            }}
          >
            / Docs
          </span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: "#64748b",
            fontFamily: "monospace",
          }}
        >
          cli-ck.app/docs/{page.slugs.join("/")}
        </div>
      </div>

      {/* Terminal Window */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          background: "#09090b",
          border: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "none",
          borderRadius: "16px 16px 0 0",
          overflow: "hidden",
          boxShadow: "0 25px 60px -15px rgba(0,0,0,0.8)",
          position: "relative",
        }}
      >
        {/* Window Title Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "18px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          {/* Window controls */}
          <div style={{ display: "flex", gap: 10 }}>
            <div
              style={{
                display: "flex",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#ff5f56",
              }}
            />
            <div
              style={{
                display: "flex",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#ffbd2e",
              }}
            />
            <div
              style={{
                display: "flex",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#27c93f",
              }}
            />
          </div>
          <div
            style={{
              marginLeft: "24px",
              fontFamily: "monospace",
              fontSize: "18px",
              color: "#4b5563",
              display: "flex",
            }}
          >
            cli-ck
          </div>
          <div
            style={{
              marginLeft: "8px",
              marginRight: "8px",
              fontFamily: "monospace",
              fontSize: "18px",
              color: "#374151",
              display: "flex",
            }}
          >
            ·
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "18px",
              color: "#cbd5e1",
              flexGrow: 1,
              display: "flex",
            }}
          >
            /content/docs/{page.slugs.join("/") || "index"}.mdx
          </div>
        </div>

        {/* Window Body */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
            padding: "40px 48px",
            alignItems: "stretch",
          }}
        >
          {/* Left Column: Text Info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              justifyContent: "center",
              paddingRight: "48px",
            }}
          >
            {/* Category Breadcrumb */}
            <div
              style={{
                fontSize: "18px",
                fontWeight: 600,
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#94a3b8",
                marginBottom: "16px",
                display: "flex",
              }}
            >
              {breadcrumbs}
            </div>

            {/* Page Title */}
            <div
              style={{
                fontSize: "64px",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "white",
                marginBottom: "20px",
                display: "flex",
                flexWrap: "wrap",
                maxWidth: "580px",
              }}
            >
              {page.data.title}
            </div>

            {/* Page Description */}
            <div
              style={{
                fontSize: "26px",
                color: "#94a3b8",
                lineHeight: 1.4,
                maxWidth: "580px",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {page.data.description}
            </div>
          </div>

          {/* Right Column: Content Sidebar (TOC or File Tree) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "360px",
              borderLeft: "1px dashed rgba(255,255,255,0.08)",
              paddingLeft: "48px",
              justifyContent: "center",
            }}
          >
            {hasToc ? (
              // Table of Contents list
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: "18px",
                    color: "white",
                    fontWeight: 700,
                    marginBottom: "20px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "flex",
                  }}
                >
                  On This Page
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  {toc.slice(0, 5).map((heading, i) => (
                    <div
                      key={i}
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <span
                        style={{
                          display: "flex",
                          color: "#cbd5e1",
                          fontSize: "24px",
                          paddingLeft: heading.depth > 2 ? "12px" : "0px",
                        }}
                      >
                        •
                      </span>
                      <span
                        style={{
                          display: "flex",
                          fontSize: "22px",
                          color: "white",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "280px",
                        }}
                      >
                        {heading.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Directory File Tree fallback
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: "18px",
                    color: "white",
                    fontWeight: 700,
                    marginBottom: "20px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "flex",
                  }}
                >
                  Directory
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    fontFamily: "monospace",
                    fontSize: "22px",
                    color: "#cbd5e1",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      color: "#94a3b8",
                      fontSize: "20px",
                      marginBottom: 8,
                    }}
                  >
                    📁{" "}
                    {page.slugs.length > 1
                      ? page.slugs[page.slugs.length - 2]
                      : "docs"}
                  </div>
                  {siblingPages.slice(0, 5).map((sibling, i) => {
                    const isCurrent = sibling.url === page.url
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            color: isCurrent ? "white" : "#64748b",
                            fontSize: "24px",
                          }}
                        >
                          •
                        </span>
                        <span
                          style={{
                            display: "flex",
                            color: isCurrent ? "white" : "#cbd5e1",
                            fontWeight: isCurrent ? "bold" : "normal",
                            fontSize: "22px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "260px",
                          }}
                        >
                          {sibling.slugs[sibling.slugs.length - 1]}.mdx
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fade overlay at the bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "140px",
            background:
              "linear-gradient(to bottom, rgba(9,9,11,0) 0%, #000 100%)",
            display: "flex",
          }}
        />
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  )
}
