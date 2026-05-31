'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Listing } from '@/lib/supabase'

export default function ListingDetailClient({ listing }: { listing: Listing }) {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [lightbox, setLightbox]     = useState(false)

  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const galleryRef     = useRef<HTMLDivElement>(null)

  const totalPhotos = listing.photos.length

  // Arrow key navigation for main gallery
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightbox) return
      if (e.key === 'ArrowRight') setPhotoIndex(i => (i + 1) % totalPhotos)
      else if (e.key === 'ArrowLeft') setPhotoIndex(i => (i - 1 + totalPhotos) % totalPhotos)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox, totalPhotos])

  // Lightbox keyboard nav + focus trap
  useEffect(() => {
    if (!lightbox) return
    setTimeout(() => closeButtonRef.current?.focus(), 50)
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false)
      else if (e.key === 'ArrowRight') setPhotoIndex(i => (i + 1) % totalPhotos)
      else if (e.key === 'ArrowLeft')  setPhotoIndex(i => (i - 1 + totalPhotos) % totalPhotos)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox, totalPhotos])

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const fullAddress = `${listing.address}, ${listing.city}, CA ${listing.zip}`
  const mapQuery = encodeURIComponent(fullAddress)

  return (
    <main className="min-h-screen" id="main-content" style={{ backgroundColor: '#F7F5F0' }}>
      <div className="px-6 md:px-10 pt-20">
        <Link href="/listings"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-opacity hover:opacity-70"
          style={{ color: '#1C3D5A', letterSpacing: '0.12em' }}>
          ← All Listings
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8">
        {/* SR-only h1 must appear before any h2 in DOM order for correct heading hierarchy */}
        <h1 className="sr-only">{listing.title} — {listing.address}, {listing.city}, CA</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Left / Main ─────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Photo gallery */}
            <div>
              <div
                ref={galleryRef}
                role="region"
                aria-label={`Photo gallery — ${totalPhotos} photos. Use arrow keys to navigate.`}
              >
                {/* Main photo */}
                <div
                  className="relative rounded-2xl overflow-hidden cursor-zoom-in"
                  style={{ aspectRatio: '16/9', backgroundColor: '#e8e5df' }}
                  onClick={() => setLightbox(true)}
                >
                  {listing.photos?.[photoIndex] && (
                    <Image
                      src={listing.photos[photoIndex]}
                      alt={`${listing.title} — photo ${photoIndex + 1} of ${totalPhotos}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover"
                      priority={photoIndex === 0}
                      unoptimized
                    />
                  )}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs"
                    style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: 'white' }}
                    aria-hidden="true">
                    {photoIndex + 1} / {totalPhotos}
                  </div>
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs"
                    style={{ backgroundColor: 'rgba(0,0,0,0.45)', color: 'white' }}
                    aria-hidden="true">
                    Click to enlarge
                  </div>
                  {totalPhotos > 1 && (
                    <>
                      <button
                        aria-label={`Previous photo (${photoIndex === 0 ? totalPhotos : photoIndex} of ${totalPhotos})`}
                        onClick={e => { e.stopPropagation(); setPhotoIndex(i => (i - 1 + totalPhotos) % totalPhotos) }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ backgroundColor: 'rgba(0,0,0,0.45)', color: 'white' }}>
                        <span aria-hidden="true">‹</span>
                      </button>
                      <button
                        aria-label={`Next photo (${(photoIndex + 2) > totalPhotos ? 1 : photoIndex + 2} of ${totalPhotos})`}
                        onClick={e => { e.stopPropagation(); setPhotoIndex(i => (i + 1) % totalPhotos) }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ backgroundColor: 'rgba(0,0,0,0.45)', color: 'white' }}>
                        <span aria-hidden="true">›</span>
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setLightbox(true)}
                  className="mt-2 text-xs underline transition-opacity hover:opacity-70"
                  style={{ color: '#616161', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  aria-label={`Open photo ${photoIndex + 1} in full screen view`}>
                  View full screen
                </button>
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1"
                role="tablist" aria-label="Photo thumbnails">
                {listing.photos.map((url, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === photoIndex}
                    aria-label={`Photo ${i + 1} of ${totalPhotos}`}
                    onClick={() => setPhotoIndex(i)}
                    className="flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200 relative"
                    style={{
                      width: '72px', height: '54px',
                      outline: i === photoIndex ? '2px solid #C9A961' : '2px solid transparent',
                      outlineOffset: '2px',
                    }}
                  >
                    <Image
                      src={url}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      sizes="72px"
                      className="object-cover"
                      unoptimized
                    />
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
                <ul className="flex flex-wrap gap-2" aria-label="Property amenities">
                  {listing.amenities.map(a => (
                    <li key={a}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: '#f0ece4', color: '#555' }}>
                      <span style={{ color: '#C9A961' }} aria-hidden="true">✓</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Map */}
            <div>
              <h2 className="text-xl font-semibold mb-4"
                style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
                Location
              </h2>
              <p className="text-sm mb-3" style={{ color: '#616161' }}>{fullAddress}</p>
              <div className="rounded-2xl overflow-hidden" style={{ height: '320px' }}>
                <iframe
                  title={`Map showing location of ${fullAddress}`}
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
            <div className="bg-white rounded-2xl p-6 sticky top-6"
              style={{ border: '1px solid rgba(201,169,97,0.2)', boxShadow: '0 4px 24px rgba(28,61,90,0.07)' }}>
              {listing.rental_status && (
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-3"
                  role="status"
                  aria-label={`Rental status: ${listing.rental_status}`}
                  style={{
                    backgroundColor:
                      listing.rental_status === 'rented' ? 'rgba(45,122,79,0.12)' :
                      listing.rental_status === 'pending' ? 'rgba(201,169,97,0.15)' : 'rgba(176,58,46,0.1)',
                    color:
                      listing.rental_status === 'rented' ? '#2D7A4F' :
                      listing.rental_status === 'pending' ? '#8a6d1f' : '#B03A2E',
                  }}>
                  <span className="w-1.5 h-1.5 rounded-full inline-block" aria-hidden="true" style={{
                    backgroundColor:
                      listing.rental_status === 'rented' ? '#2D7A4F' :
                      listing.rental_status === 'pending' ? '#C9A961' : '#B03A2E',
                  }} />
                  {listing.rental_status.charAt(0).toUpperCase() + listing.rental_status.slice(1)}
                </div>
              )}
              <p className="text-2xl font-bold mb-1" aria-hidden="true"
                style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
                {listing.title}
              </p>
              <p className="text-sm mb-4" style={{ color: '#616161' }}>
                {listing.address}, {listing.city}
              </p>

              <div className="text-3xl font-bold mb-1" style={{ color: '#1C3D5A' }}>
                <span aria-label={`$${listing.monthly_rent.toLocaleString()} per month`}>
                  ${listing.monthly_rent.toLocaleString()}
                  <span className="text-base font-light text-[#616161]" aria-hidden="true">/mo</span>
                </span>
              </div>
              <p className="text-sm mb-3" style={{ color: '#616161' }}>
                ${listing.deposit.toLocaleString()} deposit
              </p>

              {listing.listed_date && (() => {
                const start = new Date(listing.listed_date)
                const end = listing.rented_date ? new Date(listing.rented_date) : new Date()
                const dom = Math.max(0, Math.floor((end.getTime() - start.getTime()) / 86400000))
                return (
                  <div className="inline-flex items-center gap-1.5 mb-6 px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: '#f0ece4', color: '#1C3D5A', fontFamily: 'Inter, sans-serif' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                    </svg>
                    {dom} day{dom !== 1 ? 's' : ''} on market
                  </div>
                )
              })()}

              <div className="grid grid-cols-2 gap-3 mb-6">
                <StatBox label="Bedrooms" value={listing.bedrooms === 0 ? 'Studio' : String(listing.bedrooms)} />
                <StatBox label="Bathrooms" value={String(listing.bathrooms)} />
                <StatBox label="Living Area" value={`${listing.living_area_sqft.toLocaleString()} sqft`} />
                {listing.lot_size_sqft ? (
                  <StatBox label="Lot Size" value={`${listing.lot_size_sqft.toLocaleString()} sqft`} />
                ) : (
                  <StatBox label="Solar" value={listing.amenities?.includes('Solar') ? 'Yes' : 'No'} />
                )}
              </div>

              <div className="space-y-2 text-sm border-t border-[#f0ece4] pt-4 mb-6">
                {listing.available_date && (
                  <DetailRow label="Available" value={new Date(listing.available_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} />
                )}
                <DetailRow label="Lease" value={listing.lease_term} />
                <DetailRow label="Pets" value={listing.pets_allowed ? 'Allowed' : 'Not allowed'} />
              </div>

              <a
                href={`mailto:${listing.contact_email}?subject=Inquiry: ${encodeURIComponent(listing.title)}`}
                aria-label={`Email to inquire about ${listing.title}`}
                className="block w-full text-center py-4 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0', fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}>
                Contact Landlord
              </a>

              {listing.contact_phone && (
                <a
                  href={`tel:${listing.contact_phone}`}
                  aria-label={`Call ${listing.contact_phone}`}
                  className="block w-full text-center py-3 rounded-xl text-sm font-semibold mt-3 transition-all duration-200 hover:opacity-80"
                  style={{ backgroundColor: '#f0ece4', color: '#1C3D5A' }}>
                  {listing.contact_phone}
                </a>
              )}
            </div>

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

      {/* ── Lightbox ────────────────────────────────────────── */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Full screen photo viewer — ${listing.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
          onClick={() => setLightbox(false)}
        >
          <button
            ref={closeButtonRef}
            aria-label="Close full screen photo viewer"
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-xl"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}
            onClick={() => setLightbox(false)}>
            <span aria-hidden="true">×</span>
          </button>
          <button
            aria-label={`Previous photo (${photoIndex === 0 ? totalPhotos : photoIndex} of ${totalPhotos})`}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}
            onClick={e => { e.stopPropagation(); setPhotoIndex(i => (i - 1 + totalPhotos) % totalPhotos) }}>
            <span aria-hidden="true">‹</span>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={listing.photos[photoIndex]}
            alt={`${listing.title} — photo ${photoIndex + 1} of ${totalPhotos}`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
            onClick={e => e.stopPropagation()}
          />
          <button
            aria-label={`Next photo (${(photoIndex + 2) > totalPhotos ? 1 : photoIndex + 2} of ${totalPhotos})`}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}
            onClick={e => { e.stopPropagation(); setPhotoIndex(i => (i + 1) % totalPhotos) }}>
            <span aria-hidden="true">›</span>
          </button>
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm"
            style={{ color: 'rgba(255,255,255,0.5)' }}
            aria-live="polite" aria-atomic="true">
            {photoIndex + 1} / {totalPhotos}
          </div>
        </div>
      )}
    </main>
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
