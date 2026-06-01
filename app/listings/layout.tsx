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
  ],
  alternates: {
    canonical: 'https://bakersfieldrentalhomes.com/listings',
  },
}

export default function ListingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
