import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vendor Application — Bakersfield, CA',
  description: 'Join our trusted network of licensed contractors in Bakersfield, CA. Apply to offer gardening, HVAC, plumbing, electrical, handyman, and other property maintenance services to local rental homeowners.',
  alternates: {
    canonical: 'https://bakersfieldrentalhomes.com/vendors',
  },
  openGraph: {
    title: 'Vendor Application — Bakersfield, CA',
    description: 'Apply to join our trusted network of licensed contractors and service providers in Bakersfield, CA.',
    url: 'https://bakersfieldrentalhomes.com/vendors',
    siteName: 'Bakersfield Rental Homes',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Vendor Application — Bakersfield, CA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vendor Application — Bakersfield, CA',
    description: 'Apply to join our trusted network of licensed contractors and service providers in Bakersfield, CA.',
    images: ['/opengraph-image'],
  },
}

export default function VendorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
