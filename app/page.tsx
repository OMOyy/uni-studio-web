import { Hero } from "./components/Hero"
import { SocialLinkButton } from "./components/SocialLinkButton"
import { HomeTabs } from "./components/HomeTabs"

import { sanityClient } from "@/lib/sanity/client"
import {
  homePageQuery,
  homeTabQuery,
  stylesQuery,
  purchaseQuery,
  brandQuery,
  faqQuery,
} from "@/lib/sanity/queries"
 
import { HomeTab } from "./components/tabs/HomeTab"
import { Styles } from "./components/tabs/Styles"
import { Purchase } from "./components/tabs/Purchase"
import { Brand } from "./components/tabs/Brand"
import { FAQ } from "./components/tabs/FAQ"
export const dynamic = "force-dynamic"
export default async function HomePage() {
  
  const [
    homePage,
    homeTab,
    styles,
    purchase,
    brand,
    faq,
  ] = await Promise.all([
    sanityClient.fetch(homePageQuery, undefined,
  { cache: "no-store" }),
    sanityClient.fetch(homeTabQuery, undefined,
  { cache: "no-store" }),
    sanityClient.fetch(stylesQuery, undefined,
  { cache: "no-store" }),
    sanityClient.fetch(purchaseQuery, undefined,
  { cache: "no-store" }),
    sanityClient.fetch(brandQuery, undefined,
  { cache: "no-store" }),
    sanityClient.fetch(faqQuery, undefined,
  { cache: "no-store" }),
    
  ])
  console.log("🔥 FETCH TIME", new Date().toISOString())

  if (!homePage?.nav?.items?.length) {
    return <p className="p-10">請先在後台設定導覽分頁</p>
  }

  return (
    <main className="min-h-screen bg-[#f5efe8]">
      {/* Hero */}
      <Hero
        data={homePage.hero}
        socialLinks={homePage.socialLinks}
      />


      {/* Tabs */}
      <HomeTabs
        nav={homePage.nav}
        tabs={{
          home: <HomeTab data={homeTab} />,
          styles: <Styles data={styles} />,
          purchase: <Purchase data={purchase} />,
          brand: <Brand data={brand} />,
          faq: <FAQ data={faq} />,
        }}
      />

      {/* iOS safe area */}
      <div className="h-16" />
    </main>
  )
}
