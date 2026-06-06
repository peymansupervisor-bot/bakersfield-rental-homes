import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'List Your Rental Property in Bakersfield, CA',
  description: 'Landlords: advertise your Bakersfield rental property and reach qualified local tenants directly. Simple listing form, no commissions, no broker fees.',
  alternates: {
    canonical: 'https://bakersfieldrentalhomes.com/list',
  },
  openGraph: {
    title: 'List Your Rental Property in Bakersfield, CA',
    description: 'Landlords: list your Bakersfield rental home for free. Reach qualified tenants fast.',
    url: 'https://bakersfieldrentalhomes.com/list',
    siteName: 'Bakersfield Rental Homes',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'List Your Rental Property in Bakersfield, CA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'List Your Rental Property in Bakersfield, CA',
    description: 'Landlords: list your Bakersfield rental home for free. Reach qualified tenants fast.',
    images: ['/opengraph-image'],
  },
}

export default function ListLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
