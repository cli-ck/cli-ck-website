import { SITE } from "./site"

const REPO_PATH = SITE.github.replace(/^https?:\/\/github\.com\//, "")

export function githubHeaders() {
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "cli-ck-website",
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  }
}

export async function getRepoStars(): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO_PATH}`, {
      headers: githubHeaders(),
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const data = (await res.json()) as { stargazers_count?: number }
    return typeof data.stargazers_count === "number"
      ? data.stargazers_count
      : null
  } catch {
    return null
  }
}
