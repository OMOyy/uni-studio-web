import { urlFor } from "@/lib/sanity/image"

type ServiceCard = {
  title: string
  desc: string
  target: string
  icon: any
}

type Props = {
  services: ServiceCard[]
}

export function Services({ services }: Props) {
  return (
    <section className="px-4 mt-6 grid grid-cols-2 gap-4">
      {services.map((s) => (
        <div
          key={s.title}
          className="bg-white rounded-2xl p-5 text-center shadow-sm"
        >
          {/* icon */}
          <div className="mb-3 flex justify-center">
            <div className="h-12 w-12 rounded-xl bg-[#efe6dc] flex items-center justify-center">
              {s.icon && (
                <img
                  src={urlFor(s.icon).width(48).height(48).url()}
                  alt={s.title}
                />
              )}
            </div>
          </div>

          {/* title */}
          <h3 className="text-[#8b7355] font-medium">{s.title}</h3>

          {/* desc */}
          <p className="mt-2 text-xs text-[#9c8b75] leading-relaxed">
            {s.desc.split("，").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      ))}
    </section>
  )
}
