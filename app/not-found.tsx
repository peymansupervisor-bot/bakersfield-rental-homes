import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found | Bakersfield Rental Homes',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: '#F7F5F0' }}>

      <p className="text-xs font-semibold tracking-widest uppercase mb-3"
        style={{ color: '#C9A961', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
        404 — Page Not Found
      </p>
      <h1 className="text-4xl md:text-5xl font-bold mb-4"
        style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
        Page Not Found
      </h1>
      <p className="text-base max-w-sm mb-10" style={{ color: '#333333', fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/"
          className="px-8 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0', letterSpacing: '0.1em' }}>
          Go Home
        </Link>
        <Link href="/listings"
          className="px-8 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#C9A961', color: '#1C3D5A', letterSpacing: '0.1em' }}>
          Browse Listings
        </Link>
      </div>
    </main>
  )
}
