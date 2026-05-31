import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bakersfield Neighbor Board — Events, Farm, Jobs & More',
  description: 'Your local Bakersfield neighborhood board. Post social events, farm tools, ranch animals, free items, jobs, cars, housing swaps, home repair help and more. Free to join.',
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/community' },
  openGraph: {
    title: 'Bakersfield Community Board',
    description: 'Buy, sell, trade and connect with Bakersfield neighbors.',
    url: 'https://bakersfieldrentalhomes.com/community',
    siteName: 'Bakersfield Rental Homes',
    type: 'website',
  },
}

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
