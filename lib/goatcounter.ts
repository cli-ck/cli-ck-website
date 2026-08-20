// Site traffic before GoatCounter was wired up wasn't tracked - offset the
// live count so the number reflects total views, not just post-setup ones.
const VIEWS_BASELINE = 1200

export async function getTotalViews(): Promise<number | null> {
  const code = process.env.GOATCOUNTER_CODE
  if (!code) {
    // ponytail: dev-only placeholder to eyeball the pill layout without a
    // real GoatCounter account. NODE_ENV is "production" for `pnpm build`,
    // so this never reaches the deployed static export.
    return process.env.NODE_ENV === "development" ? 1234 : null
  }
  try {
    const res = await fetch(
      `https://${code}.goatcounter.com/counter/TOTAL.json`,
      {
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return null
    const data = (await res.json()) as { count?: string }
    if (!data.count) return null
    const n = Number(data.count.replace(/[^0-9]/g, ""))
    return Number.isFinite(n) ? n + VIEWS_BASELINE : null
  } catch {
    return null
  }
}
