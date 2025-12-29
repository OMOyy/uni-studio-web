"use client"
import { urlFor } from "@/lib/sanity/image"
import { useEffect, useRef, useState } from "react"

export function AutoCarousel({ images }: { images: any[] }) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (!containerRef.current || images.length === 0) return

        const container = containerRef.current
        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                const nextIndex = (prev + 1) % images.length
                const scrollX = container.clientWidth * nextIndex
                container.scrollTo({
                    left: scrollX,
                    behavior: "smooth",
                })
                return nextIndex
            })
        }, 4000)

        return () => clearInterval(interval)
    }, [images.length])

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

    return (
        <div className="relative group">
            <div
                ref={containerRef}
                className="flex overflow-x-scroll scroll-smooth snap-x snap-mandatory gap-0 scrollbar-hide"
            >
                {images.map((img, i) => (
                    <div
                        key={i}
                        className="w-full flex-shrink-0 snap-center relative"
                    >
                        <img
                            src={urlFor(img).width(1200).url()}
                            className="w-full h-[300px] md:h-[400px] object-cover rounded-2xl"
                            alt={`輪播圖片 ${i + 1}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none" />
                    </div>
                ))}
            </div>

            {/* 導航點 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`transition-all duration-300 rounded-full ${i === currentIndex
                            ? "w-8 h-2 bg-[#8b7355]"
                            : "w-2 h-2 bg-white/60 hover:bg-white/80"
                            }`}
                        aria-label={`前往第 ${i + 1} 張圖片`}
                    />
                ))}
            </div>

            {/* 左右箭頭 - 桌面版顯示 */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={() => goToSlide((currentIndex - 1 + images.length) % images.length)}
                        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-[#8b7355] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white shadow-lg"
                        aria-label="上一張"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => goToSlide((currentIndex + 1) % images.length)}
                        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-[#8b7355] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white shadow-lg"
                        aria-label="下一張"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}
        </div>
    )
}

export function HomeTab({ data }: any) {
    //console.log("🔥 homeTab data =", data)

    return (
        <div className="min-h-screen bg-gradient-to-b ">
            <div className="max-w-6xl mx-auto space-y-8 px-4 sm:px-6 py-8 md:py-12">
                {/* 公告區 */}
                {data.announcements?.length > 0 && (
                    <section className="bg-white rounded-2xl p-4 shadow-sm">
                        <h3 className="text-center text-xl md:text-2xl font-semibold text-[#8b7355] mb-2">
                            🪧最新公告🪧
                        </h3>

                        <ul className="space-y-3 text-center">
                            {data.announcements.map((a: any, i: number) => (
                                <li
                                    key={i}
                                    className={`p-3 rounded-xl 
                                    }`}
                                >
                                    <p className="font-medium text-center text-xl md:text-2xl text-[#8b7355] ">{a.title}</p>
                                    {a.content && (
                                        <p className="text-[#8b7355] mt-1">{a.content}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
                {/* 圖片輪播區 */}
                {data.carousel?.length > 0 && (
                    <section className="overflow-hidden rounded-2xl shadow-xl">
                        <AutoCarousel images={data.carousel} />
                    </section>
                )}
                {/* 優惠活動區 */}
                {data.promotions?.length > 0 && (
                    <section className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
                        <h3 className="text-center text-xl md:text-2xl font-semibold text-[#8b7355] mb-4">
                            🎁 優惠活動 🎁
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {data.promotions
                                .filter((img: any) => img)
                                .map((img: any, i: number) => (
                                    <div
                                        key={i}
                                        className="overflow-hidden rounded-xl shadow hover:shadow-md transition"
                                    >
                                        <img
                                            src={urlFor(img).width(800).url()}
                                            alt={`優惠活動 ${i + 1}`}
                                            className="w-full h-[220px] object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                        </div>
                    </section>
                )}


                {/* 包裝展示區 */}
                {data.packaging?.length > 0 && (
                    <section className="bg-white rounded-2xl p-4 md:p-6 shadow-sm space-y-6">
                        <h3 className="text-center text-xl md:text-2xl font-semibold text-[#8b7355]">
                            🎀 包裝展示 🎀
                        </h3>

                        <div className="space-y-6">
                            {data.packaging
                                .filter((item: any) => item.image)
                                .map((item: any, i: number) => (
                                    <div
                                        key={i}
                                        className="flex flex-col md:flex-row gap-4 md:gap-6 items-center"
                                    >
                                        <div className="w-full md:w-1/2 overflow-hidden rounded-xl shadow">
                                            <img
                                                src={urlFor(item.image).width(800).url()}
                                                alt={item.title}
                                                className="w-full h-[220px] object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>

                                        <div className="w-full md:w-1/2 space-y-2 text-[#6f5a43]">
                                            <h4 className="text-lg md:text-xl font-semibold">
                                                {item.title}
                                            </h4>
                                            {item.desc && (
                                                <p className="text-sm md:text-base leading-relaxed whitespace-pre-line">
                                                    {item.desc}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </section>
                )}



            </div>
        </div>
    )
}

{/* 隱藏滾動條的 CSS */ }
<style jsx global>{`
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
`}</style>