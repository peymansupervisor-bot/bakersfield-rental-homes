import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/list/success'],
    },
    sitemap: 'https://bakersfieldrentalhomes.com/sitemap.xml',
  }
}
