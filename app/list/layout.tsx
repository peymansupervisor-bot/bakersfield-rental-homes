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
  },
}

export default function ListLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
