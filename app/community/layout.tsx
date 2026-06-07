import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bakersfield Community Board',
  description: 'Local Bakersfield neighborhood board. Post events, farm tools, animals, free items, jobs, housing swaps, and home repair help. Free to join.',
  openGraph: {
    title: 'Bakersfield Community Board',
    description: 'Buy, sell, trade and connect with Bakersfield neighbors.',
    url: 'https://bakersfieldrentalhomes.com/community',
    siteName: 'Bakersfield Rental Homes',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Bakersfield Community Board' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bakersfield Community Board',
    description: 'Buy, sell, trade and connect with Bakersfield neighbors.',
    images: ['/opengraph-image'],
  },
}

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
