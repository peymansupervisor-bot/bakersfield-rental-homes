import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Listing Boosted — Bakersfield Rental Homes',
  robots: { index: false, follow: false },
}

export default function BoostSuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
