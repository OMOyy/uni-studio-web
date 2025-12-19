import { createClient } from "@sanity/client"

export const sanityClient = createClient({
  projectId: "8d5pq5u5", // ← 從 sanity.config.ts 拿
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true, // 展示站一定要 true
})
