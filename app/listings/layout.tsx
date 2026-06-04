import type { Metadata } from 'next'

export const metadata: Metadata = {
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
    'Bakersfield rental homes direct from owner',
    'rent from owner Bakersfield CA',
    'houses for rent by owner Bakersfield CA',
    'Bakersfield no broker fee rentals',
    'houses for rent by owner Los Angeles CA',
    'direct landlord rentals Los Angeles',
  ],
  alternates: {
    canonical: 'https://bakersfieldrentalhomes.com/listings',
  },
}

export default function ListingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
