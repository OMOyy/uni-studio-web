"use client"
import { useState } from "react"

export function FAQ({ data }: any) {
  const [open, setOpen] = useState<number | null>(null)

  if (!data?.items?.length) {
    return (
      <p className="p-6 text-center text-[#8b7355]">
        尚無常見問題
      </p>
    )
  }

  return (
    <section className="px-6 py-12 ">
      <div className="mx-auto max-w-2xl space-y-4">
        {data.items.map((f: any, i: number) => {
          const active = open === i

          return (
            <div
              key={i}
              className="bg-white rounded-xl border border-[#e8dcc8] overflow-hidden transition-shadow hover:shadow-md"
            >
              {/* 問題 */}
              <button
                onClick={() => setOpen(active ? null : i)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
              >
                <span className="text-base md:text-lg font-semibold text-[#8b7355] leading-relaxed">
                  {f.question}
                </span>

                <span
                  className={`
                    text-2xl
                    text-[#c8a97e]
                    transition-transform
                    duration-300
                    flex-shrink-0
                    ${active ? "rotate-45" : ""}
                  `}
                >
                  +
                </span>
              </button>

              {/* 答案 - 動畫開合 */}
              <div
                className={`
                  grid
                  transition-all
                  duration-300
                  ease-in-out
                  ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                `}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-5 pt-2 border-t border-[#e8dcc8]">
                    <p className="text-base md:text-lg text-[#6f5a43] leading-relaxed whitespace-pre-line">
                      {f.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}