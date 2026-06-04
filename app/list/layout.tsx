import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'List Your Rental Property in Bakersfield, CA',
  description: 'Landlords: list your Bakersfield rental home for free. Reach qualified tenants fast. Simple form, quick approval, and professional property management support.',
  alternates: {
    canonical: 'https://bakersfieldrentalhomes.com/list',
  },
  openGraph: {
    title: 'List Your Rental Property in Bakersfield, CA',
    description: 'Landlords: list your Bakersfield rental home for free. Reach qualified tenants fast.',
    url: 'https://bakersfieldrentalhomes.com/list',
    siteName: 'Bakersfield Rental Homes',
    type: 'website',
    images: [{ url: 'https://bakersfieldrentalhomes.com/og-image.jpg', width: 1200, height: 630, alt: 'List Your Rental Property in Bakersfield, CA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'List Your Rental Property in Bakersfield, CA',
    description: 'Landlords: list your Bakersfield rental home for free. Reach qualified tenants fast.',
    images: ['https://bakersfieldrentalhomes.com/og-image.jpg'],
  },
}

export default function ListLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
