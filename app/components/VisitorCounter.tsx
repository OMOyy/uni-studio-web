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

    async function load() {
      const alreadyRecorded = sessionStorage.getItem(SESSION_KEY) === "1"

      try {
        const res = await fetch("/api/visit", {
          method: alreadyRecorded ? "GET" : "POST",
        })
        if (!res.ok) return
        const data = (await res.json()) as VisitStats
        if (!cancelled) setStats(data)
        if (!alreadyRecorded) sessionStorage.setItem(SESSION_KEY, "1")
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
