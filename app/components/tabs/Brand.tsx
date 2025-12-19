type BrandData = {
  title?: string
  intro?: string[]
  whatIs?: {
    title?: string
    content?: string
  }
  benefits?: {
    title?: string
    items?: string[]
  }
  targets?: {
    title?: string
    items?: string[]
  }
}

function InfoCard({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl bg-white p-6 md:p-8 border border-[#e8dcc8]">
      {title && (
        <h3 className="text-lg md:text-xl font-semibold text-[#8b7355] mb-4 pb-3 border-b border-[#e8dcc8]">
          {title}
        </h3>
      )}
      <div className="text-base md:text-lg leading-relaxed text-[#6f5a43]">
        {children}
      </div>
    </div>
  )
}

function ListCard({
  title,
  items,
}: {
  title?: string
  items: string[]
}) {
  return (
    <div className="rounded-xl bg-white p-6 md:p-8 border border-[#e8dcc8]">
      {title && (
        <h3 className="text-lg md:text-xl font-semibold text-[#8b7355] mb-4 pb-3 border-b border-[#e8dcc8]">
          {title}
        </h3>
      )}

      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-[#6f5a43]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#c8a97e] flex-shrink-0" />
            <span className="text-base md:text-lg leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Brand({ data }: { data: BrandData }) {
  if (!data) return null

  const intro = data.intro ?? []
  const benefitItems = data.benefits?.items ?? []
  const targetItems = data.targets?.items ?? []

  return (
    <section className="px-6 py-12 bg-[#fdfcfa]">
      <div className="mx-auto max-w-2xl space-y-10">

        {/* ===== 頁面標題 ===== */}
        {data.title && (
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-wider text-[#8b7355]">
              {data.title}
            </h2>
            <div className="mt-3 h-0.5 w-16 mx-auto bg-[#c8a97e]" />
          </div>
        )}

        {/* ===== 核心理念 ===== */}
        {intro.length > 0 && (
          <div className="space-y-4 px-2 ">
            {intro.map((paragraph, i) => (
              <p
                key={i}
                className="text-base md:text-lg leading-relaxed text-[#6f5a43]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* ===== 什麼是穿戴甲 ===== */}
        {data.whatIs?.content && (
          <InfoCard title={data.whatIs.title}>
            <p className="whitespace-pre-line">
              {data.whatIs.content}
            </p>
          </InfoCard>
        )}

        {/* ===== 穿戴甲優點 ===== */}
        {benefitItems.length > 0 && (
          <ListCard
            title={data.benefits?.title}
            items={benefitItems}
          />
        )}

        {/* ===== 適合族群 ===== */}
        {targetItems.length > 0 && (
          <ListCard
            title={data.targets?.title}
            items={targetItems}
          />
        )}

      </div>
    </section>
  )
}