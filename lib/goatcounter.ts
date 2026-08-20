export async function getTotalViews(): Promise<number | null> {
  const code = process.env.GOATCOUNTER_CODE
  if (!code) return null
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
    return Number.isFinite(n) ? n : null
  } catch {
    return null
  }
}
