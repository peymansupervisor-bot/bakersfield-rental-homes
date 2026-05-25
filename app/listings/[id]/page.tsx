'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Listing } from '@/lib/supabase'

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch(`/api/listings/${id}`)
      .then(r => r.json())
      .then(({ listing }) => { setListing(listing); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F5F0' }}>
        <div className="w-8 h-8 rounded-full border-2 border-[#C9A961] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F5F0' }}>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-3"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
            Listing not found
          </h2>
          <Link href="/listings" className="text-sm" style={{ color: '#C9A961' }}>← Back to listings</Link>
        </div>
      </div>
    )
  }

  const fullAddress = `${listing.address}, ${listing.city}, CA ${listing.zip}`
  const mapQuery = encodeURIComponent(fullAddress)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F5F0' }}>
      {/* Back nav */}
      <div className="px-6 md:px-10 pt-6">
        <Link href="/listings"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-opacity hover:opacity-70"
          style={{ color: '#1C3D5A', letterSpacing: '0.12em' }}>
          ← All Listings
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Left / Main ─────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Photo gallery */}
            <div>
              {/* Main photo */}
              <div
                className="relative rounded-2xl overflow-hidden cursor-zoom-in"
                style={{ aspectRatio: '16/9', backgroundColor: '#e8e5df' }}
                onClick={() => setLightbox(true)}
              >
                {listing.photos?.[photoIndex] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={listing.photos[photoIndex]}
                    alt={`${listing.title} — photo ${photoIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs"
                  style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: 'white' }}>
                  {photoIndex + 1} / {listing.photos.length}
                </div>
                {/* Arrow buttons */}
                {listing.photos.length > 1 && (
                  <>
                    <button
                      onClick={e => { e.stopPropagation(); setPhotoIndex(i => (i - 1 + listing.photos.length) % listing.photos.length) }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                      style={{ backgroundColor: 'rgba(0,0,0,0.45)', color: 'white' }}>
                      ‹
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); setPhotoIndex(i => (i + 1) % listing.photos.length) }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                      style={{ backgroundColor: 'rgba(0,0,0,0.45)', color: 'white' }}>
                      ›
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {listing.photos.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setPhotoIndex(i)}
                    className="flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200"
                    style={{
                      width: '72px', height: '54px',
                      outline: i === photoIndex ? '2px solid #C9A961' : '2px solid transparent',
                      outlineOffset: '2px',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-3"
                style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
                About This Property
              </h2>
              <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#444' }}>
                {listing.description}
              </p>
            </div>

            {/* Amenities */}
            {listing.amenities?.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
                  Amenities
                </h2>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.map(a => (
                    <span key={a}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: '#f0ece4', color: '#555' }}>
                      <span style={{ color: '#C9A961' }}>✓</span> {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            <div>
              <h2 className="text-xl font-semibold mb-4"
                style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
                Location
              </h2>
              <p className="text-sm mb-3" style={{ color: '#888' }}>
                {fullAddress}
              </p>
              <div className="rounded-2xl overflow-hidden" style={{ height: '320px' }}>
                <iframe
                  title="Property location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${mapQuery}&output=embed&z=15`}
                />
              </div>
            </div>
          </div>

          {/* ── Right / Sidebar ──────────────────────────────── */}
          <div className="space-y-5">

            {/* Price card */}
            <div className="bg-white rounded-2xl p-6 sticky top-6"
              style={{ border: '1px solid rgba(201,169,97,0.2)', boxShadow: '0 4px 24px rgba(28,61,90,0.07)' }}>
              <h1 className="text-2xl font-bold mb-1"
                style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
                {listing.title}
              </h1>
              <p className="text-sm mb-4" style={{ color: '#888' }}>
                {listing.address}, {listing.city}
              </p>

              <div className="text-3xl font-bold mb-1" style={{ color: '#1C3D5A' }}>
                ${listing.monthly_rent.toLocaleString()}
                <span className="text-base font-light text-[#888]">/mo</span>
              </div>
              <p className="text-sm mb-6" style={{ color: '#888' }}>
                ${listing.deposit.toLocaleString()} deposit
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <StatBox label="Bedrooms" value={listing.bedrooms === 0 ? 'Studio' : String(listing.bedrooms)} />
                <StatBox label="Bathrooms" value={String(listing.bathrooms)} />
                <StatBox label="Living Area" value={`${listing.living_area_sqft.toLocaleString()} sqft`} />
                {listing.lot_size_sqft ? (
                  <StatBox label="Lot Size" value={`${listing.lot_size_sqft.toLocaleString()} sqft`} />
                ) : (
                  <StatBox label="Parking" value={listing.parking} />
                )}
              </div>

              {/* Extra details */}
              <div className="space-y-2 text-sm border-t border-[#f0ece4] pt-4 mb-6">
                {listing.available_date && (
                  <DetailRow label="Available" value={new Date(listing.available_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} />
                )}
                <DetailRow label="Lease" value={listing.lease_term} />
                <DetailRow label="Pets" value={listing.pets_allowed ? 'Allowed' : 'Not allowed'} />
                <DetailRow label="Parking" value={listing.parking} />
              </div>

              {/* Contact button */}
              <a
                href={`mailto:${listing.contact_email}?subject=Inquiry: ${encodeURIComponent(listing.title)}`}
                className="block w-full text-center py-4 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-90"
                style={{
                  backgroundColor: '#1C3D5A',
                  color: '#F7F5F0',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '0.12em',
                }}
              >
                Contact Landlord
              </a>

              {listing.contact_phone && (
                <a
                  href={`tel:${listing.contact_phone}`}
                  className="block w-full text-center py-3 rounded-xl text-sm font-semibold mt-3 transition-all duration-200 hover:opacity-80"
                  style={{ backgroundColor: '#f0ece4', color: '#1C3D5A' }}
                >
                  {listing.contact_phone}
                </a>
              )}
            </div>

            {/* List your own CTA */}
            <div className="rounded-2xl p-5 text-center"
              style={{ background: 'linear-gradient(135deg, #1C3D5A 0%, #2a5278 100%)' }}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2"
                style={{ color: '#C9A961', letterSpacing: '0.18em' }}>
                Have a property?
              </p>
              <p className="text-sm mb-4" style={{ color: 'rgba(247,245,240,0.8)' }}>
                List yours for just $1.
              </p>
              <Link href="/list"
                className="inline-block px-5 py-2.5 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all hover:opacity-90"
                style={{ backgroundColor: '#C9A961', color: '#1C3D5A', letterSpacing: '0.1em' }}>
                List Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-xl"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}
            onClick={() => setLightbox(false)}
          >
            ×
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}
            onClick={e => { e.stopPropagation(); setPhotoIndex(i => (i - 1 + listing.photos.length) % listing.photos.length) }}
          >
            ‹
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={listing.photos[photoIndex]}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}
            onClick={e => { e.stopPropagation(); setPhotoIndex(i => (i + 1) % listing.photos.length) }}
          >
            ›
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            {photoIndex + 1} / {listing.photos.length}
          </div>
        </div>
      )}
    </div>
  )
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl p-3 text-center" style={{ backgroundColor: '#f8f6f2' }}>
      <p className="text-lg font-bold mb-0.5" style={{ color: '#1C3D5A' }}>{value}</p>
      <p className="text-xs" style={{ color: '#aaa' }}>{label}</p>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span style={{ color: '#aaa' }}>{label}</span>
      <span className="font-medium" style={{ color: '#2B2B2B' }}>{value}</span>
    </div>
  )
}
