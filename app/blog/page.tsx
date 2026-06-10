import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bakersfield Rental Blog | Local Renter Guides & Market Insights',
  description: 'Local guides for Bakersfield renters — average rent prices, neighborhood breakdowns, tenant tips, and Kern County market insights. Updated regularly by Bakersfield Brokers.',
  keywords: [
    'Bakersfield rental blog',
    'Bakersfield renter guide',
    'average rent Bakersfield CA',
    'Bakersfield rental market',
    'Kern County rental tips',
    'Bakersfield neighborhood guide',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/blog' },
  openGraph: {
    title: 'Bakersfield Rental Blog | Local Renter Guides & Market Insights',
    description: 'Local guides for Bakersfield renters — average rent prices, neighborhood breakdowns, tenant tips, and Kern County market insights.',
    url: 'https://bakersfieldrentalhomes.com/blog',
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Bakersfield Rental Blog' }],
    type: 'website',
  },
}

const POSTS = [
  {
    slug: 'tenant-rights-california-2026',
    title: 'Tenant Rights in California 2026: A Bakersfield Renter\'s Guide',
    excerpt: 'Security deposits, eviction protections, rent increase limits, and habitability standards — everything Bakersfield renters need to know about California tenant law in 2026.',
    date: 'June 2026',
    readTime: '8 min read',
    category: 'Renter\'s Guide',
  },
  {
    slug: 'average-rent-bakersfield-2026',
    title: 'Average Rent in Bakersfield CA 2026: What Renters Are Actually Paying',
    excerpt: 'A complete breakdown of average rent prices in Bakersfield by bedroom count, neighborhood, and ZIP code — with data updated for 2026.',
    date: 'June 2026',
    readTime: '5 min read',
    category: 'Market Data',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bakersfieldrentalhomes.com' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://bakersfieldrentalhomes.com/blog' },
  ],
}

export default function BlogIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main id="main-content">

        {/* Hero */}
        <section
          className="py-20 px-6 text-center"
          style={{ backgroundColor: '#1C3D5A' }}
          aria-labelledby="blog-heading"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#C9A961' }}>
            Bakersfield Rental Homes · Local Insights
          </p>
          <h1
            id="blog-heading"
            className="text-4xl md:text-5xl font-bold mb-5"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}
          >
            The Bakersfield Renter's Guide
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(247,245,240,0.8)' }}>
            Local market data, neighborhood breakdowns, and practical advice for renters in Bakersfield, CA.
          </p>
        </section>

        {/* Posts */}
        <section className="py-16 px-6 md:px-10" style={{ backgroundColor: '#F7F5F0' }} aria-labelledby="posts-heading">
          <div className="max-w-3xl mx-auto">
            <h2 id="posts-heading" className="sr-only">Blog Posts</h2>
            <ul className="space-y-6 list-none p-0 m-0">
              {POSTS.map(post => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block rounded-2xl p-7 transition-all hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A961]"
                    style={{ backgroundColor: '#fff', border: '1px solid rgba(201,169,97,0.2)' }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                        style={{ backgroundColor: 'rgba(201,169,97,0.12)', color: '#7d6019' }}>
                        {post.category}
                      </span>
                      <span className="text-xs" style={{ color: '#888' }}>{post.date} · {post.readTime}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
                      {post.title}
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ color: '#555' }}>
                      {post.excerpt}
                    </p>
                    <p className="mt-4 text-sm font-semibold" style={{ color: '#C9A961' }}>
                      Read the guide →
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 text-center" style={{ backgroundColor: '#1C3D5A' }}>
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
            Ready to Find Your Next Home?
          </h2>
          <p className="text-base mb-7 max-w-md mx-auto" style={{ color: 'rgba(247,245,240,0.8)' }}>
            Browse direct landlord rentals in Bakersfield — no broker fees, no middlemen.
          </p>
          <Link href="/listings"
            className="px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
            style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}>
            Browse Listings
          </Link>
        </section>

      </main>
    </>
  )
}
