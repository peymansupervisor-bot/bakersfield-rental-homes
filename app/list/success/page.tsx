'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const listingId = searchParams.get('listing_id')
  const [ready, setReady] = useState(false)
  const [listingSlug, setListingSlug] = useState<string | null>(null)

  // Poll until listing is active (webhook may take a second or two)
  useEffect(() => {
    if (!listingId) return
    const check = async () => {
      try {
        const res = await fetch(`/api/listings/${listingId}`)
        const { listing } = await res.json()
        if (listing?.status === 'active') {
          setListingSlug(listing.slug ?? listingId)
          setReady(true)
        }
      } catch {}
    }
    check()
    const interval = setInterval(check, 2000)
    return () => clearInterval(interval)
  }, [listingId])

  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: '#F7F5F0' }}>
      <div className="text-center max-w-md">
        {/* Check icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ backgroundColor: 'rgba(45,122,79,0.1)' }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M8 18L14 24L28 10" stroke="#2D7A4F" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="text-4xl font-bold mb-4"
          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
          Your Listing is {ready ? 'Live!' : 'Publishing…'}
        </h1>
        <p className="text-base font-light mb-8" style={{ color: 'rgba(43,43,43,0.7)' }}>
          {ready
            ? 'Your rental listing is now visible to Bakersfield renters.'
            : "We're activating your listing — this takes just a moment."}
        </p>

        {ready && listingSlug && (
          <Link
            href={`/listings/${listingSlug}`}
            className="inline-block px-8 py-4 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-90 mb-4"
            style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0', letterSpacing: '0.12em' }}
          >
            View My Listing →
          </Link>
        )}

        <div className="block mt-4">
          <Link href="/listings" className="text-sm underline" style={{ color: '#1C3D5A' }}>
            Browse all listings
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: '#F7F5F0' }} />}>
      <SuccessContent />
    </Suspense>
  )
}
