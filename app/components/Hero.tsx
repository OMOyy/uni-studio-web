import { urlFor } from "@/lib/sanity/image"
import { SocialLinkButton } from "./SocialLinkButton"
// app/fonts.ts
import { Caveat } from "next/font/google"

export const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

type SocialLink = {
  platform: "instagram" | "threads"
  url: string
  enabled?: boolean
}

type HeroData = {
  brandName?: string
  tagline?: string
  logo?: any
}

type Props = {
  data: HeroData
  socialLinks?: SocialLink[]
}

export function Hero({ data, socialLinks }: Props) {
  if (!data) return null

  const links = socialLinks ?? []

  return (
    <section className="bg-[#efe6dc] pt-10 pb-8 text-center">
      {/* Logo */}
      {data.logo && (
        <div className="mb-6 flex justify-center">
          <img
            src={urlFor(data.logo).width(200).url()}
            className="
              h-24 w-24
              md:h-28 md:w-28
              rounded-full
              object-contain
              shadow-md
            "
            alt={data.brandName}
          />
        </div>
      )}

      {/* 品牌名稱 */}
      <h1
        className={`
         ${caveat.className}
          text-2xl
          md:text-4xl
          tracking-[0.25em]
          text-[#8b7355]
          font-semibold
        `}
      >
        {data.brandName}
      </h1>

      {/* 副標 */}
      {data.tagline && (
        <p
          className="
            mt-4
            text-base
            md:text-lg
            text-[#83715b]
            font-light
            tracking-wide
          "
        >
          {data.tagline}
        </p>
      )}

      {/* 社群連結 */}
      {links.length > 0 && (
        <div className="mt-4 flex justify-center gap-4">
          {links
            .filter(s => s.enabled)
            .map((s, i) => (
              <SocialLinkButton
                key={i}
                platform={s.platform}
                href={s.url}
              />
            ))}
        </div>
      )}
    </section>
  )
}
