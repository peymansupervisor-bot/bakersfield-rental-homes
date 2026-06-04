import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bakersfield Community Board',
  description: 'Local Bakersfield neighborhood board. Post events, farm tools, animals, free items, jobs, housing swaps, and home repair help. Free to join.',
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
