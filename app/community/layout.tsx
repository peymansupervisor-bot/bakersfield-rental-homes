import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community Board — Bakersfield Neighbors',
  description: 'Connect with Bakersfield neighbors. Buy, sell, trade furniture, appliances, cars, farm goods, find jobs, home repair help, and more. Free to join.',
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
