import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessibility Statement — Bakersfield Rental Homes',
  description: 'Bakersfield Rental Homes is committed to digital accessibility for people with disabilities. Learn about our WCAG 2.1 AA conformance efforts and how to reach us for assistance.',
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/accessibility' },
}

export default function AccessibilityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
