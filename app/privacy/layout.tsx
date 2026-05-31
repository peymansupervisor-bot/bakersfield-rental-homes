import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Bakersfield Rental Homes',
  description: 'Privacy Policy for Bakersfield Rental Homes and the Bakersfield Community Board. Learn how we collect, use, and protect your personal information.',
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/privacy' },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
