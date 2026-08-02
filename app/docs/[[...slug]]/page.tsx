import { source } from "@/lib/source"
import { DocsBody, DocsPage } from "fumadocs-ui/page"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import defaultMdxComponents from "fumadocs-ui/mdx"
import fs from "node:fs"
import path from "node:path"
import { PageActions } from "@/components/docs/page-actions"

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) notFound()

  const MDX = page.data.body

  const filePath =
    page.absolutePath || path.join(process.cwd(), "content/docs", page.path)
  const rawMarkdown = fs.readFileSync(filePath, "utf-8")

  const slugs = params.slug ?? []
  const slugPath = slugs.join("/")
  const gitUrl = `https://github.com/my-oz/oz-website/blob/main/content/docs/${page.path}`
  const rawMarkdownUrl = `/docs/${slugPath ? slugPath + ".md" : "index.md"}`
  const sciraUrl = `https://scira.app/?q=https://oz.app/docs/${slugPath ? slugPath + ".md" : "index.md"}`
  const chatgptUrl = `https://chatgpt.com/?q=Read+this+page:+https://oz.app/docs/${slugPath ? slugPath + ".md" : "index.md"}`
  const claudeUrl = `https://claude.ai/new?q=https://oz.app/docs/${slugPath ? slugPath + ".md" : "index.md"}`
  const cursorUrl = "https://cursor.com"

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <h1 className="mb-2 text-3xl font-bold tracking-tight">
        {page.data.title}
      </h1>
      <p className="mb-4 text-muted-foreground">{page.data.description}</p>
      <PageActions
        rawMarkdown={rawMarkdown}
        gitUrl={gitUrl}
        rawMarkdownUrl={rawMarkdownUrl}
        sciraUrl={sciraUrl}
        chatgptUrl={chatgptUrl}
        claudeUrl={claudeUrl}
        cursorUrl={cursorUrl}
      />
      <hr />
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) notFound()

  const slugs = params.slug ?? []
  const ogUrl = `/og/docs/${slugs.length === 0 ? "index" : slugs.join("/")}.png`

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: page.data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogUrl],
    },
  }
}
