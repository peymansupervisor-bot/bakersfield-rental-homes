'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Listing } from '@/lib/supabase'
import { statusLabel, statusColor, statusBg, showDaysOnMarket } from '@/lib/rentalStatus'

function VideoTour({ listing }: { listing: Listing }) {
  const [videoUrl, setVideoUrl]     = useState<string | null>(listing.video_url ?? null)
  const [status, setStatus]         = useState<string | null>(listing.video_status ?? null)
  const [renderId, setRenderId]     = useState<string | null>(listing.video_render_id ?? null)
  const [generating, setGenerating] = useState(false)
  const [error, setError]           = useState('')
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopPolling = () => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null }
  }

  useEffect(() => {
    // Resume polling if we already have a render ID but no video yet
    if (renderId && status === 'rendering' && !videoUrl) startPolling(renderId)
    return stopPolling
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const startPolling = (id: string) => {
    stopPolling()
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/video-status/${id}`)
        const data = await res.json()
        if (data.status === 'done' && data.url) {
          setVideoUrl(data.url)
          setStatus('done')
          stopPolling()
        } else if (data.status === 'failed') {
          setStatus('failed')
          setError('Video generation failed. Please try again.')
          stopPolling()
        }
      } catch { /* keep polling */ }
    }, 6000)
  }

  const handleGenerate = async () => {
    setGenerating(true)
    setError('')
    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: listing.id }),
      })
      const data = await res.json()
      if (!res.ok || !data.renderId) throw new Error(data.error || 'Failed to start')
      setRenderId(data.renderId)
      setStatus('rendering')
      startPolling(data.renderId)
    } catch (e: any) {
      const msg = e.message || 'Something went wrong'
      setError(msg.length > 120 ? 'Video generation failed. Please try again.' : msg)
      setStatus(null)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4"
        style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
        Video Tour
      </h2>

      {videoUrl ? (
        <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9', backgroundColor: '#000' }}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            src={videoUrl}
            controls
            playsInline
            poster={listing.photos?.[0]}
            className="w-full h-full object-contain"
            aria-label={`Video tour of ${listing.title}`}
          />
        </div>
      ) : status === 'rendering' ? (
        <div className="rounded-2xl flex flex-col items-center justify-center gap-4 py-14"
          style={{ backgroundColor: '#f0ece4', border: '1px solid rgba(201,169,97,0.2)' }}>
          <div className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
            style={{ borderColor: '#C9A961', borderTopColor: 'transparent' }} aria-hidden="true" />
          <p className="text-sm font-medium" style={{ color: '#1C3D5A' }}>
            Generating your video tour… this takes 1–2 minutes
          </p>
        </div>
      ) : (
        <div className="rounded-2xl flex flex-col items-center justify-center gap-5 py-12"
          style={{ backgroundColor: '#f8f6f2', border: '1px dashed rgba(201,169,97,0.4)' }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(201,169,97,0.12)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A961" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
          <div className="text-center px-6">
            <p className="text-sm font-semibold mb-1" style={{ color: '#1C3D5A' }}>
              AI-Narrated Video Tour
            </p>
            <p className="text-xs" style={{ color: '#616161' }}>
              Auto-generates a slideshow with voiceover from the property description
            </p>
          </div>
          {error && (
            <p className="text-xs px-5 py-2 rounded-lg" style={{ backgroundColor: 'rgba(220,53,69,0.08)', color: '#dc3545' }}>
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="px-7 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all duration-200 hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0', letterSpacing: '0.1em' }}>
            {generating ? 'Starting…' : 'Generate Video Tour'}
          </button>
        </div>
      )}
    </div>
  )
}

export default function ListingDetailClient({ listing }: { listing: Listing }) {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [lightbox, setLightbox]     = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactName, setContactName]   = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMsg, setContactMsg]     = useState('')
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault()
    setContactStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: `Inquiry about: ${listing.title}\n\n${contactMsg}`,
        }),
      })
      setContactStatus(res.ok ? 'sent' : 'error')
    } catch {
      setContactStatus('error')
    }
  }

  const closeButtonRef  = useRef<HTMLButtonElement>(null)
  const galleryRef      = useRef<HTMLDivElement>(null)
  const lightboxRef     = useRef<HTMLDivElement>(null)

  const totalPhotos = listing.photos.length

  // Arrow key navigation — only when focus is inside the gallery region
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightbox) return
      if (!galleryRef.current?.contains(document.activeElement)) return
      if (e.key === 'ArrowRight') { e.preventDefault(); setPhotoIndex(i => (i + 1) % totalPhotos) }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); setPhotoIndex(i => (i - 1 + totalPhotos) % totalPhotos) }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox, totalPhotos])

  // Lightbox: keyboard nav + focus trap
  const getFocusableInLightbox = useCallback(() => {
    if (!lightboxRef.current) return []
    return Array.from(
      lightboxRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.hasAttribute('disabled'))
  }, [])

  useEffect(() => {
    if (!lightbox) return
    setTimeout(() => closeButtonRef.current?.focus(), 50)
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setLightbox(false); return }
      if (e.key === 'ArrowRight') { e.preventDefault(); setPhotoIndex(i => (i + 1) % totalPhotos); return }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); setPhotoIndex(i => (i - 1 + totalPhotos) % totalPhotos); return }
      // Focus trap: keep Tab inside the lightbox
      if (e.key === 'Tab') {
        const focusable = getFocusableInLightbox()
        if (focusable.length === 0) { e.preventDefault(); return }
        const first = focusable[0]
        const last  = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus() }
        } else {
          if (document.activeElement === last)  { e.preventDefault(); first.focus() }
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox, totalPhotos, getFocusableInLightbox])

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
        <h1 className="text-2xl font-semibold mb-6"
          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
          {listing.title.toLowerCase().startsWith(listing.address.toLowerCase())
            ? `${listing.title}, ${listing.city}, CA`
            : `${listing.address} — ${listing.bedrooms}bd/${listing.bathrooms}ba For Rent in ${listing.city}, CA`}
        </h1>

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
                  className="relative rounded-2xl overflow-hidden"
                  style={{ aspectRatio: '16/9', backgroundColor: '#e8e5df' }}
                >
                  <button
                    type="button"
                    aria-label={`Open photo ${photoIndex + 1} of ${totalPhotos} in full screen`}
                    className="absolute inset-0 w-full h-full cursor-zoom-in"
                    style={{ border: 'none', background: 'none', padding: 0 }}
                    onClick={() => setLightbox(true)}
                  />
                  {listing.photos?.[photoIndex] && (
                    <Image
                      src={listing.photos[photoIndex]}
                      alt={`${listing.title} — photo ${photoIndex + 1} of ${totalPhotos}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      quality={90}
                      className="object-cover pointer-events-none"
                      priority
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
                        style={{ backgroundColor: 'rgba(0,0,0,0.45)', color: 'white', zIndex: 1 }}>
                        <span aria-hidden="true">‹</span>
                      </button>
                      <button
                        aria-label={`Next photo (${(photoIndex + 2) > totalPhotos ? 1 : photoIndex + 2} of ${totalPhotos})`}
                        onClick={e => { e.stopPropagation(); setPhotoIndex(i => (i + 1) % totalPhotos) }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ backgroundColor: 'rgba(0,0,0,0.45)', color: 'white', zIndex: 1 }}>
                        <span aria-hidden="true">›</span>
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setLightbox(true)}
                  className="mt-2 text-xs underline transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A961] rounded"
                  style={{ color: '#616161', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px' }}
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
                      minWidth: '44px', minHeight: '44px',
                      outline: i === photoIndex ? '2px solid #C9A961' : '2px solid transparent',
                      outlineOffset: '2px',
                    }}
                  >
                    <Image
                      src={url}
                      alt={`${listing.title} — photo ${i + 1} of ${totalPhotos}`}
                      fill
                      sizes="72px"
                      className="object-cover"
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

            {/* Video Tour */}
            <VideoTour listing={listing} />

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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-3"
                style={{ backgroundColor: 'rgba(201,169,97,0.12)', color: '#6b5316', border: '1px solid rgba(201,169,97,0.3)' }}>
                <span aria-hidden="true">✓</span> Direct Landlord · No Broker Fee
              </div>
              {listing.rental_status && (
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-3"
                  role="status"
                  aria-label={`Rental status: ${listing.rental_status}`}
                  style={{
                    backgroundColor: statusBg(listing.rental_status),
                    color: statusColor(listing.rental_status),
                  }}>
                  <span className="w-1.5 h-1.5 rounded-full inline-block" aria-hidden="true" style={{
                    backgroundColor: statusColor(listing.rental_status),
                  }} />
                  {statusLabel(listing.rental_status)}
                </div>
              )}
              <p className="text-2xl font-bold mb-1"
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

              {listing.listed_date && listing.rental_status && showDaysOnMarket(listing.rental_status) && (() => {
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

              <dl className="grid grid-cols-2 gap-3 mb-6">
                <StatBox label="Bedrooms" value={listing.bedrooms === 0 ? 'Studio' : String(listing.bedrooms)} />
                <StatBox label="Bathrooms" value={String(listing.bathrooms)} />
                <StatBox label="Living Area" value={`${listing.living_area_sqft.toLocaleString()} sqft`} />
                {listing.lot_size_sqft ? (
                  <StatBox label="Lot Size" value={`${listing.lot_size_sqft.toLocaleString()} sqft`} />
                ) : (
                  <StatBox label="Solar" value={listing.amenities?.includes('Solar') ? 'Yes' : 'No'} />
                )}
              </dl>

              <dl className="space-y-2 text-sm border-t border-[#f0ece4] pt-4 mb-6">
                {listing.available_date && (
                  <DetailRow label="Available" value={new Date(listing.available_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} />
                )}
                <DetailRow label="Lease" value={listing.lease_term} />
                <DetailRow label="Pets" value={listing.pets_allowed ? 'Allowed' : 'Not allowed'} />
              </dl>

              {!showContactForm && contactStatus !== 'sent' && (
                <button
                  onClick={() => setShowContactForm(true)}
                  className="block w-full text-center py-4 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0', fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}>
                  Contact Landlord
                </button>
              )}

              {showContactForm && contactStatus !== 'sent' && (
                <form onSubmit={handleContactSubmit} className="space-y-2 mt-2">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium mb-1" style={{ color: '#1C3D5A' }}>Your name</label>
                    <input
                      id="contact-name"
                      type="text" required
                      value={contactName} onChange={e => setContactName(e.target.value)}
                      className="w-full border border-[#ddd8ce] rounded-lg px-3 py-2 text-sm"
                      style={{ color: '#1C3D5A' }} />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium mb-1" style={{ color: '#1C3D5A' }}>Your email</label>
                    <input
                      id="contact-email"
                      type="email" required
                      value={contactEmail} onChange={e => setContactEmail(e.target.value)}
                      className="w-full border border-[#ddd8ce] rounded-lg px-3 py-2 text-sm"
                      style={{ color: '#1C3D5A' }} />
                  </div>
                  <div>
                    <label htmlFor="contact-msg" className="block text-xs font-medium mb-1" style={{ color: '#1C3D5A' }}>Your message</label>
                    <textarea
                      id="contact-msg"
                      required rows={3}
                      value={contactMsg} onChange={e => setContactMsg(e.target.value)}
                      className="w-full border border-[#ddd8ce] rounded-lg px-3 py-2 text-sm"
                      style={{ color: '#1C3D5A' }} />
                  </div>
                  <button
                    type="submit" disabled={contactStatus === 'sending'}
                    className="w-full py-3 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>
                    {contactStatus === 'sending' ? 'Sending…' : 'Send Message'}
                  </button>
                  {contactStatus === 'error' && (
                    <p role="alert" className="text-xs text-red-600 text-center">Something went wrong. Please try again.</p>
                  )}
                </form>
              )}

              {contactStatus === 'sent' && (
                <p role="status" aria-live="polite" className="text-center text-sm py-4 rounded-xl" style={{ backgroundColor: '#f0ece4', color: '#1C3D5A' }}>
                  ✓ Message sent! The landlord will be in touch.
                </p>
              )}

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

            <Link href="/direct-landlord-rentals"
              className="block rounded-2xl p-4 text-center transition-opacity hover:opacity-80"
              style={{ backgroundColor: 'rgba(201,169,97,0.08)', border: '1px solid rgba(201,169,97,0.2)' }}>
              <p className="text-xs font-semibold mb-0.5" style={{ color: '#1C3D5A' }}>
                Why rent direct?
              </p>
              <p className="text-xs" style={{ color: '#6b5316' }}>
                No broker fees · Faster approvals →
              </p>
            </Link>

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
          ref={lightboxRef}
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
          <div
            className="relative rounded-xl overflow-hidden"
            style={{ width: 'min(90vw, calc(90vh * 4 / 3))', height: 'min(90vh, calc(90vw * 3 / 4))' }}
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={listing.photos[photoIndex]}
              alt={`${listing.title} — photo ${photoIndex + 1} of ${totalPhotos}`}
              fill
              sizes="90vw"
              quality={90}
              className="object-contain"
              priority
            />
          </div>
          {/* Preload next photo so lightbox navigation feels instant */}
          {totalPhotos > 1 && listing.photos[(photoIndex + 1) % totalPhotos] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={listing.photos[(photoIndex + 1) % totalPhotos]}
              alt=""
              aria-hidden="true"
              className="hidden"
            />
          )}
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
      <dd className="text-lg font-bold mb-0.5" style={{ color: '#1C3D5A' }}>{value}</dd>
      <dt className="text-xs" style={{ color: '#595959' }}>{label}</dt>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt style={{ color: '#595959' }}>{label}</dt>
      <dd className="font-medium" style={{ color: '#2B2B2B' }}>{value}</dd>
    </div>
  )
}
