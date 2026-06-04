import { sanityClient } from "@/lib/sanity/client"
import { getSanityWriteClient } from "@/lib/sanity/writeClient"

export const SITE_STATS_ID = "siteStats"

export type VisitStats = {
  dailyCount: number
  totalCount: number
}

type SiteStatsDoc = {
  dailyCount?: number
  totalCount?: number
  lastDate?: string
}

export function getTodayInTaipei(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
  }).format(new Date())
}

function toVisitStats(doc: SiteStatsDoc | null): VisitStats {
  if (!doc) return { dailyCount: 0, totalCount: 0 }

  const today = getTodayInTaipei()
  const dailyCount =
    doc.lastDate === today ? (doc.dailyCount ?? 0) : 0

  return {
    dailyCount,
    totalCount: doc.totalCount ?? 0,
  }
}

const statsProjection = `*[_type == "siteStats" && _id == $id][0]{
  dailyCount,
  totalCount,
  lastDate
}`

export async function getVisitStats(): Promise<VisitStats> {
  const doc = await sanityClient.fetch<SiteStatsDoc | null>(
    statsProjection,
    { id: SITE_STATS_ID },
    { cache: "no-store" }
  )
  return toVisitStats(doc)
}

export async function recordVisit(): Promise<VisitStats | null> {
  const writeClient = getSanityWriteClient()
  if (!writeClient) return null

  const today = getTodayInTaipei()
  const doc = await writeClient.fetch<SiteStatsDoc | null>(statsProjection, {
    id: SITE_STATS_ID,
  })

  if (!doc) {
    await writeClient.create({
      _id: SITE_STATS_ID,
      _type: "siteStats",
      dailyCount: 1,
      totalCount: 1,
      lastDate: today,
    })
    return { dailyCount: 1, totalCount: 1 }
  }

  const dailyCount =
    doc.lastDate === today ? (doc.dailyCount ?? 0) + 1 : 1
  const totalCount = (doc.totalCount ?? 0) + 1

  await writeClient
    .patch(SITE_STATS_ID)
    .set({ dailyCount, totalCount, lastDate: today })
    .commit()

  return { dailyCount, totalCount }
}
