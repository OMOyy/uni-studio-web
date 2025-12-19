"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Nav } from "./Nav"

type Props = {
  nav: {
    items: { label: string; target: string }[]
  }
  tabs: Record<string, React.ReactNode>
}

export function HomeTabs({ nav, tabs }: Props) {
  const firstTab = nav.items[0]?.target
  const [activeTab, setActiveTab] = useState(firstTab)

  return (
    <div>
      {/* Tab 導覽列 */}
      <Nav
        items={nav.items}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* 動畫內容區 */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mt-0"
          >
            {tabs[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
