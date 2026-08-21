import type { MetadataRoute } from "next"
import { SITE } from "@/lib/site"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const routes: {
    path: string
    priority: number
    changeFrequency: "weekly" | "monthly"
  }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/benchmarks", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/changelog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/security", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.4, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.4, changeFrequency: "monthly" },
  ]
  return routes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}
