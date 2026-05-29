import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Homes & Houses For Rent in Bakersfield CA | Browse Listings',
  description:
    'Browse available houses and homes for rent in Bakersfield, CA. Filter by bedrooms, bathrooms, and price. Single-family homes, pet-friendly rentals, and short-term leases in Kern County.',
  keywords: [
    'houses for rent in Bakersfield CA',
    'homes for rent Bakersfield',
    'Bakersfield rental listings',
    'rent a house Bakersfield CA',
    'available rentals Bakersfield',
    'Bakersfield homes for lease',
    'pet friendly houses for rent Bakersfield',
    'Kern County rental homes',
    '3 bedroom houses for rent Bakersfield',
    '4 bedroom houses for rent Bakersfield',
    'affordable rentals Bakersfield CA',
    'Bakersfield CA rental market',
  ],
  openGraph: {
    title: 'Homes & Houses For Rent in Bakersfield CA',
    description:
      'Browse available rental homes in Bakersfield, CA. Single-family homes, pet-friendly rentals, short and long-term leases in Kern County.',
    url: 'https://bakersfieldrentalhomes.com/listings',
  },
  alternates: {
    canonical: 'https://bakersfieldrentalhomes.com/listings',
  },
}

export default function ListingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
