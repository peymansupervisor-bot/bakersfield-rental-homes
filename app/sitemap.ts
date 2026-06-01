import { MetadataRoute } from 'next'

const SITE_URL = 'https://bakersfieldrentalhomes.com'
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/listings`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/list`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/vendors`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/community`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/accessibility`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Dynamic listing pages
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/listings?status=eq.active&select=slug,id,created_at`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        next: { revalidate: 3600 },
      }
    )
    if (res.ok) {
      const listings: { slug: string | null; id: string; created_at: string }[] = await res.json()
      const listingPages: MetadataRoute.Sitemap = listings.map(l => ({
        url: `${SITE_URL}/listings/${l.slug ?? l.id}`,
        lastModified: new Date(l.created_at),
        changeFrequency: 'weekly',
        priority: 0.8,
      }))
      return [...staticPages, ...listingPages]
    }
  } catch {}

  return staticPages
}
