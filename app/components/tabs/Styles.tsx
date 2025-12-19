"use client"
import { urlFor } from "@/lib/sanity/image"
import { useState, useRef } from "react"

// 圖片輪播組件
function ImageCarousel({ 
  images, 
  categoryTitle, 
  onImageClick 
}: { 
  images: any[]
  categoryTitle?: string
  onImageClick: (url: string) => void 
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const goToSlide = (index: number) => {
    if (!containerRef.current) return
    const container = containerRef.current
    const scrollX = container.clientWidth * index
    container.scrollTo({
      left: scrollX,
      behavior: "smooth",
    })
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % images.length
    goToSlide(nextIndex)
  }

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    goToSlide(prevIndex)
  }

  return (
    <div className="relative group/carousel">
      {/* 輪播容器 */}
      <div
        ref={containerRef}
        className="flex overflow-x-scroll scroll-smooth snap-x snap-mandatory scrollbar-hide rounded-xl"
        onScroll={(e) => {
          const container = e.currentTarget
          const scrollX = container.scrollLeft
          const index = Math.round(scrollX / container.clientWidth)
          setCurrentIndex(index)
        }}
      >
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => onImageClick(urlFor(img).width(1200).url())}
            className="w-full flex-shrink-0 snap-center relative aspect-[4/3] md:aspect-[16/9] bg-[#fdfcfa]"
          >
            <img
              src={urlFor(img).width(1200).url()}
              className="w-full h-full object-cover"
              alt={`${categoryTitle} 範例 ${idx + 1}`}
            />
            {/* Hover 遮罩 */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
              <span className="opacity-0 hover:opacity-100 transition-opacity duration-300 text-white text-sm bg-[#8b7355] px-4 py-2 rounded-full">
                點擊放大
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* 左右箭頭 */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#e8dcc8] text-[#8b7355] shadow-md opacity-0 group-hover/carousel:opacity-100 hover:bg-[#fdfcfa] transition-all duration-300 z-10"
            aria-label="上一張"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#e8dcc8] text-[#8b7355] shadow-md opacity-0 group-hover/carousel:opacity-100 hover:bg-[#fdfcfa] transition-all duration-300 z-10"
            aria-label="下一張"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* 導航指示器 */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all duration-300 ${
                idx === currentIndex
                  ? "w-8 h-2 bg-[#8b7355] rounded-full"
                  : "w-2 h-2 bg-[#8b7355]/30 rounded-full hover:bg-[#8b7355]/50"
              }`}
              aria-label={`前往第 ${idx + 1} 張圖片`}
            />
          ))}
        </div>
      )}

      {/* 圖片計數 */}
      {images.length > 1 && (
        <div className="absolute bottom-4 right-4 bg-[#8b7355] text-white px-3 py-1 rounded-full text-xs">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}

type StylesPageData = {
  pageIntro?: {
    title?: string
    subtitle?: string
    note?: string
  }
  categories?: {
    title?: string
    description?: string
    price?: {
      min?: number
      max?: number
      note?: string
    }
    images?: any[]
  }[]
}

export function Styles({ data }: { data: StylesPageData }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  if (!data) return null

  const categories = data.categories ?? []

  return (
    <section className="px-6 py-12 bg-[#fdfcfa]">
      <div className="mx-auto max-w-2xl space-y-10">

        {/* 頁面標題區 */}
        {data.pageIntro && (
          <div className="text-center space-y-4">
            {data.pageIntro.title && (
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-[#8b7355] tracking-wider">
                  {data.pageIntro.title}
                </h1>
                <div className="mt-3 h-0.5 w-16 mx-auto bg-[#c8a97e]" />
              </div>
            )}
            {data.pageIntro.subtitle && (
              <p className="text-base md:text-lg text-[#6f5a43]">
                {data.pageIntro.subtitle}
              </p>
            )}
            {data.pageIntro.note && (
              <p className="text-sm md:text-base text-[#6f5a43] leading-relaxed pt-2">
                {data.pageIntro.note}
              </p>
            )}
          </div>
        )}

        {/* 分類內容區 */}
        {categories.map((cat, i) => (
          <article 
            key={i} 
            className="bg-white rounded-xl border border-[#e8dcc8] overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* 標題與描述 */}
            <div className="p-6 md:p-8 space-y-4">
              {/* 標題 */}
              {cat.title && (
                <h2 className="text-xl md:text-2xl font-semibold text-[#8b7355] pb-3 border-b border-[#e8dcc8]">
                  {cat.title}
                </h2>
              )}

              {/* 描述 */}
              {cat.description && (
                <p className="text-base md:text-lg text-[#6f5a43] leading-relaxed whitespace-pre-line">
                  {cat.description}
                </p>
              )}

              {/* 價格標籤 */}
              {(cat.price?.min || cat.price?.max) && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#8b7355]/60">
                      價格區間
                    </span>
                    <span className="text-lg font-semibold text-[#8b7355]">
                      NT$ {cat.price.min?.toLocaleString()} ~ {cat.price.max?.toLocaleString()}
                    </span>
                  </div>
                  {cat.price.note && (
                    <p className="text-xs text-[#8b7355]/60">
                      {cat.price.note}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* 圖片輪播 */}
            {cat.images && cat.images.length > 0 && (
              <div className="border-t border-[#e8dcc8] p-4 md:p-6">
                <ImageCarousel 
                  images={cat.images} 
                  categoryTitle={cat.title}
                  onImageClick={setSelectedImage}
                />
              </div>
            )}
          </article>
        ))}

      </div>

      {/* 圖片燈箱 */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={selectedImage}
            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
            alt="放大檢視"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}