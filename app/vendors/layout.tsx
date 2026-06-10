import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trusted Vendors & Contractors in Bakersfield CA | Home Services',
  description: 'Find trusted local vendors and contractors in Bakersfield, CA — plumbers, electricians, HVAC technicians, handymen, pest control, roofers, and more. Vetted service providers for Bakersfield rental homes.',
  keywords: [
    'Bakersfield contractors',
    'plumber Bakersfield CA',
    'electrician Bakersfield CA',
    'HVAC repair Bakersfield CA',
    'handyman Bakersfield CA',
    'pest control Bakersfield CA',
    'roofer Bakersfield CA',
    'home repair Bakersfield CA',
    'rental property maintenance Bakersfield',
    'Bakersfield home services',
    'trusted vendors Bakersfield CA',
    'Kern County contractors',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/vendors' },
  openGraph: {
    title: 'Trusted Vendors & Contractors in Bakersfield CA',
    description: 'Vetted local plumbers, electricians, HVAC technicians, handymen, and more — serving Bakersfield rental homes and landlords in Kern County.',
    url: 'https://bakersfieldrentalhomes.com/vendors',
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Trusted vendors and contractors in Bakersfield CA' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trusted Vendors & Contractors in Bakersfield CA',
    description: 'Vetted local plumbers, electricians, HVAC technicians, handymen, and more in Bakersfield CA.',
    images: ['/opengraph-image'],
  },
}

export default function VendorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
