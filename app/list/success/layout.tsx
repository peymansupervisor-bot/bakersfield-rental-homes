import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Listing Published — Bakersfield Rental Homes',
  robots: { index: false, follow: false },
}

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
