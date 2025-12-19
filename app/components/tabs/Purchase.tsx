"use client"

import { useState } from "react"
import { urlFor } from "@/lib/sanity/image"
import { Lightbox } from "../Lightbox"

type PurchaseData = {
    sections?: {
        image: any
        caption?: string
    }[]
    note?: string
}

export function Purchase({ data }: { data: PurchaseData }) {
    if (!data) return null
    const [activeImage, setActiveImage] = useState<string | null>(null)

    const sections = data.sections ?? []

    return (
        <section className="min-h-screen  py-12 md:py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-12">

                {/* 圖片說明區塊 */}
                {sections.map((section, i) => (
                    <article 
                        key={i} 
                        className="space-y-4"
                        style={{
                            animationDelay: `${i * 100}ms`
                        }}
                    >
                        {/* 圖片容器 */}
                        <div 
                            className="relative group cursor-pointer overflow-hidden bg-white"
                            onClick={() => setActiveImage(urlFor(section.image).width(1600).url())}
                        >
                            <img
                                src={urlFor(section.image).width(1200).url()}
                                alt={section.caption || ""}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            
                            {/* 簡約 hover 提示 */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                                <span className="text-white text-sm tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#8b7355] px-4 py-2 rounded-full">
                                    點擊查看
                                </span>
                            </div>
                        </div>

                        {/* 圖片說明 */}
                        {section.caption && (
                            <p className="text-sm md:text-base text-[#8b7355] text-center font-light tracking-wide leading-relaxed">
                                {section.caption}
                            </p>
                        )}
                    </article>
                ))}

                {/* 底部補充說明 */}
                {data.note && (
                    <div className="mt-16 pt-8 border-t border-[#8b7355]/10">
                        <p className="whitespace-pre-line text-sm md:text-base leading-loose text-[#6f5a43] text-center font-light">
                            {data.note}
                        </p>
                    </div>
                )}

            </div>

            {/* 燈箱 */}
            {activeImage && (
                <Lightbox
                    src={activeImage}
                    onClose={() => setActiveImage(null)}
                />
            )}
        </section>
    )
}