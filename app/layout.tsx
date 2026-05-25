import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bakersfield Rental Homes | Local Experts. Your Peace of Mind.',
  description:
    'Premium property management for long-distance investors. Bakersfield\'s trusted local contractor network keeps your investment maintained, occupied, and profitable.',
  keywords: 'Bakersfield rental homes, property management, long-distance investors, Bakersfield real estate',
  openGraph: {
    title: 'Bakersfield Rental Homes',
    description: 'Your team. Your property. Your peace of mind.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
