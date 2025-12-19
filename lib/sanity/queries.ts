export const homePageQuery = `
*[_type == "homePage"][0]{
  hero{
    logo,
    brandName,
    tagline
  },
  nav{
    items[]{
      label,
      target
    }
  },
  socialLinks[]{
    platform,
    url,
    enabled
  }
}
`


export const homeTabQuery = `
*[_type == "homeTab"][0]{
  announcements[]{
    title,
    content,
    highlight
  },
  carousel
}
`
export const stylesQuery = `
*[_type == "stylesPage"][0]{
  pageIntro {
    title,
    subtitle,
    note
  },
  categories[] {
    title,
    description,
    price {
      min,
      max,
      note
    },
    images
  }
}
`

export const purchaseQuery = `
*[_type == "purchasePage"][0]{
  sections[]{
    image,
    caption
  },
  note
}
`

export const brandQuery = `
*[_type == "brandPage"][0]{
  title,
  intro,
  whatIs {
    title,
    content
  },
  benefits {
    title,
    items
  },
  targets {
    title,
    items
  }
}
`

export const faqQuery = `*[_type=="faqPage"][0]{ items[]{ question, answer } }`
