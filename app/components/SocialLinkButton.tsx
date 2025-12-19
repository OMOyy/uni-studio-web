import { Instagram, AtSign } from "lucide-react"

type Platform = "instagram" | "threads"

type Props = {
  platform: Platform
  href: string
}

const platformConfig: Record<
  Platform,
  {
    icon: React.ReactNode
    aria: string
    bgClass: string
  }
> = {
  instagram: {
    icon: <Instagram size={20} />,
    aria: "Instagram",
    bgClass: "bg-[#fdfcfa]", // 奶茶淡底
  },
  threads: {
    icon: <AtSign size={20} />,
    aria: "Threads",
    bgClass: "bg-[#fdfcfa]",
  },
}


export function SocialLinkButton({ platform, href }: Props) {
  const config = platformConfig[platform]

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={config.aria}
      className={`
        flex items-center justify-center
        w-9 h-9
        rounded-xl
        shadow-sm
        transition
        active:scale-95

        ${config.bgClass}

        text-[#8b7355]
        hover:text-[#6f5a43]
      `}
    >
      {config.icon}
    </a>
  )
}
