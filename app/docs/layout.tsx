import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { RootProvider } from "fumadocs-ui/provider/next"
import { source } from "@/lib/source"
import type { ReactNode } from "react"
import Image from "next/image"
import { SITE } from "@/lib/site"
import { ScrollGuard } from "@/components/docs/scroll-guard"
import logoImg from "@/public/cli_ck_icon_256.png"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-0 min-h-screen bg-background">
      <ScrollGuard />
      <RootProvider search={{ options: { type: "static" } }}>
        <DocsLayout
          tree={source.pageTree}
          githubUrl={SITE.github}
          nav={{
            title: (
              <div className="flex items-center gap-2.5 font-semibold">
                <Image
                  src={logoImg}
                  alt=""
                  width={24}
                  height={24}
                  className="rounded-md"
                />
                <span>{SITE.name} Docs</span>
              </div>
            ),
          }}
        >
          {children}
        </DocsLayout>
      </RootProvider>
    </div>
  )
}
