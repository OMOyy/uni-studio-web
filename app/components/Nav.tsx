type NavItem = {
  label: string
  target: string
}

type Props = {
  items: NavItem[]
  activeTab: string
  onChange: (key: string) => void
}

export function Nav({ items, activeTab, onChange }: Props) {
  return (
    <nav className="bg-[#fdfcfa]">
      <ul className="flex justify-around px-2 py-4">
        {items.map((item) => {
          const active = activeTab === item.target

          return (
            <li
              key={item.target}
              onClick={() => onChange(item.target)}
              className="
                cursor-pointer
                relative
                px-2
                text-base
                md:text-lg
                font-medium
                transition-colors
              "
            >
              {/* 文字 */}
              <span
                className={`
                  ${
                    active
                      ? "text-[#8b7355]"
                      : "text-[#b8aa99]"
                  }
                `}
              >
                {item.label}
              </span>

             
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
