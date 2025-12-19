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
    sanityClient.fetch(homePageQuery),
    sanityClient.fetch(homeTabQuery),
    sanityClient.fetch(stylesQuery),
    sanityClient.fetch(purchaseQuery),
    sanityClient.fetch(brandQuery),
    sanityClient.fetch(faqQuery),
    
  ])
  
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
