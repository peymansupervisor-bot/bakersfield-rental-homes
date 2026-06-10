'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function BoostSuccessContent() {
  const searchParams = useSearchParams()
  const listingId = searchParams.get('listing_id')

  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: '#F7F5F0' }}>
      <div className="text-center max-w-md">
        {/* Star icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ backgroundColor: 'rgba(201,169,97,0.15)' }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
            <path d="M18 4l3.9 8.1 8.9 1.3-6.4 6.3 1.5 8.9L18 24.3l-7.9 4.3 1.5-8.9L5.2 13.4l8.9-1.3L18 4z"
              fill="#C9A961" stroke="#C9A961" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="text-4xl font-bold mb-4"
          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
          Your Listing is Featured!
        </h1>
        <p className="text-base font-light mb-2" style={{ color: 'rgba(43,43,43,0.7)' }}>
          Your listing is now pinned to the top of search results for 30 days.
        </p>
        <p className="text-sm mb-8" style={{ color: '#595959' }}>
          Renters browsing Bakersfield will see your home first.
        </p>

        <div className="flex flex-col gap-3 items-center">
          {listingId && (
            <Link
              href={`/listings/${listingId}`}
              className="inline-block px-8 py-4 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0', letterSpacing: '0.12em' }}
            >
              View My Listing →
            </Link>
          )}
          <Link href="/listings" className="text-sm underline" style={{ color: '#1C3D5A' }}>
            Browse all listings
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function BoostSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: '#F7F5F0' }} />}>
      <BoostSuccessContent />
    </Suspense>
  )
}
