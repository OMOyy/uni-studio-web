"use client"

import { useEffect } from "react"

type Props = {
  src: string
  onClose: () => void
}

export function Lightbox({ src, onClose }: Props) {
  // ESC 關閉
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/70
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      {/* 圖片 */}
      <img
        src={src}
        onClick={(e) => e.stopPropagation()}
        className="
          max-h-[90vh]
          max-w-[90vw]
          rounded-2xl
          shadow-2xl
          animate-zoomIn
        "
        alt=""
      />

      {/* 關閉按鈕 */}
      <button
        onClick={onClose}
        className="
          absolute top-4 right-4
          text-white/80
          text-2xl
          hover:text-white
        "
      >
        ✕
      </button>
    </div>
  )
}
