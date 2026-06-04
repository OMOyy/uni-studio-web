"use client"

import { useEffect, useState } from "react"

type VisitStats = {
  dailyCount: number
  totalCount: number
}

const SESSION_KEY = "uni-studio-visit-recorded"

function formatCount(n: number) {
  return n.toLocaleString("zh-TW")
}

export function VisitorCounter() {
  const [stats, setStats] = useState<VisitStats | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchStats(method: "GET" | "POST") {
      const res = await fetch("/api/visit", { method })
      if (!res.ok) return null
      return (await res.json()) as VisitStats
    }

    async function load() {
      const alreadyRecorded = sessionStorage.getItem(SESSION_KEY) === "1"

      try {
        let data: VisitStats | null = null

        if (alreadyRecorded) {
          data = await fetchStats("GET")
        } else {
          const recorded = await fetchStats("POST")
          if (recorded) {
            data = recorded
            sessionStorage.setItem(SESSION_KEY, "1")
          } else {
            // 正式環境常漏設 SANITY_API_WRITE_TOKEN，POST 503；仍讀取並顯示既有數字
            data = await fetchStats("GET")
          }
        }

        if (!cancelled && data) setStats(data)
      } catch {
        // 靜默失敗，不影響主要頁面
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <footer className="border-t border-[#8b7355]/15 bg-[#f5efe8] px-4 pb-8 pt-6">
      <p className="text-center text-sm text-[#8b7355]/80">
        每日人次{" "}
        <span className="tabular-nums font-medium text-[#8b7355]">
          {stats ? formatCount(stats.dailyCount) : "—"}
        </span>
        <span className="mx-3 text-[#8b7355]/40">|</span>
        累計人次{" "}
        <span className="tabular-nums font-medium text-[#8b7355]">
          {stats ? formatCount(stats.totalCount) : "—"}
        </span>
      </p>
    </footer>
  )
}
