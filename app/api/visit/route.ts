import { NextResponse } from "next/server"
import { getVisitStats, recordVisit } from "@/lib/visitStats"

export const dynamic = "force-dynamic"

export async function GET() {
  const stats = await getVisitStats()
  return NextResponse.json(stats)
}

export async function POST() {
  const stats = await recordVisit()
  if (!stats) {
    return NextResponse.json(
      { error: "人次統計尚未設定寫入權杖" },
      { status: 503 }
    )
  }
  return NextResponse.json(stats)
}
