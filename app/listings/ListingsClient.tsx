'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Listing } from '@/lib/supabase'
import { statusLabel, statusColor, showDaysOnMarket } from '@/lib/rentalStatus'

const BATH_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M4 12h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-4z"/><path d="M4 12V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1"/>
  </svg>
)
const BED_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M2 4v16M22 4v16M2 12h20M2 8h10M12 8h10"/>
  </svg>
)
const SQFT_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
  </svg>
)

function daysOnMarket(listing: Listing): number | null {
  if (!listing.listed_date) return null
  const start = new Date(listing.listed_date)
  const end = listing.rented_date ? new Date(listing.rented_date) : new Date()
  return Math.max(0, Math.floor((end.getTime() - start.getTime()) / 86400000))
}

// index < 3 → priority (above the fold); rest → lazy
function ListingCard({ listing, index }: { listing: Listing; index: number }) {
  const isPriority = index < 3
  return (
    <div className="card-animate" style={{ animationDelay: `${index * 0.06}s` }}>
      <Link
        href={`/listings/${listing.slug ?? listing.id}`}
        className="block group"
        aria-label={`${listing.title} — ${listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} bed`}, ${listing.bathrooms} bath, $${listing.monthly_rent.toLocaleString()}/mo${listing.rental_status ? ` — ${statusLabel(listing.rental_status)}` : ''}`}
      >
        <div className="bg-white rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg"
          style={{ border: '1px solid rgba(201,169,97,0.12)' }}
          aria-hidden="true"
        >
          {/* Photo */}
          <div className="relative overflow-hidden aspect-[4/3]" style={{ backgroundColor: '#e8e5df' }}>
            {listing.photos?.[0] ? (
              <Image
                src={listing.photos[0]}
                alt={`${listing.title} at ${listing.address}, ${listing.city}, CA — ${listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} bed`}, ${listing.bathrooms} bath`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={isPriority}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <rect width="40" height="40" rx="20" fill="#f0ece4"/>
                  <path d="M12 28l6-8 4 5 3-4 5 7H12z" fill="#C9A961" opacity="0.5"/>
                </svg>
              </div>
            )}
            {/* Rent badge */}
            <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-sm font-bold"
              style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>
              ${listing.monthly_rent.toLocaleString()}/mo
            </div>
            {/* Rental status ribbon */}
            {listing.rental_status && (
              <span
                className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                style={{
                  backgroundColor: statusColor(listing.rental_status),
                  color: '#fff',
                  letterSpacing: '0.1em',
                }}
              >
                <span aria-hidden="true">● </span>
                {statusLabel(listing.rental_status)}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-5">
            <h3 className="font-semibold text-base mb-1 line-clamp-1 group-hover:text-[#C9A961] transition-colors duration-200"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              {listing.title}
            </h3>
            <p className="text-xs mb-4 line-clamp-1" style={{ color: '#616161' }}>
              {listing.address}, {listing.city}, CA {listing.zip}
            </p>

            <div className="flex items-center gap-4 text-xs" style={{ color: '#555' }}>
              <span className="flex items-center gap-1.5">{BED_ICON}
                {listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} BD`}
              </span>
              <span className="flex items-center gap-1.5">{BATH_ICON}{listing.bathrooms} BA</span>
              <span className="flex items-center gap-1.5">{SQFT_ICON}
                {listing.living_area_sqft.toLocaleString()} sqft
              </span>
            </div>
            {(() => {
              const dom = daysOnMarket(listing)
              if (dom === null || !listing.rental_status || !showDaysOnMarket(listing.rental_status)) return null
              const isRented = listing.rental_status === 'rented'
              const color = statusColor(listing.rental_status)
              const label = isRented
                ? `Rented in ${dom} day${dom !== 1 ? 's' : ''}`
                : `${dom} day${dom !== 1 ? 's' : ''} on market`
              return (
                <div className="mt-3 flex items-center gap-1.5 text-[11px]"
                  style={{ color, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                  {label}
                </div>
              )
            })()}

            {listing.amenities?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {listing.amenities.slice(0, 3).map(a => (
                  <span key={a} className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: '#f0ece4', color: '#616161' }}>
                    {a}
                  </span>
                ))}
                {listing.amenities.length > 3 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: '#f0ece4', color: '#616161' }}>
                    +{listing.amenities.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

type SortKey = 'newest' | 'price_asc' | 'price_desc' | 'beds_desc' | 'sqft_desc'

function sortListings(listings: Listing[], sortBy: SortKey): Listing[] {
  const copy = [...listings]
  switch (sortBy) {
    case 'price_asc':  return copy.sort((a, b) => a.monthly_rent - b.monthly_rent)
    case 'price_desc': return copy.sort((a, b) => b.monthly_rent - a.monthly_rent)
    case 'beds_desc':  return copy.sort((a, b) => b.bedrooms - a.bedrooms)
    case 'sqft_desc':  return copy.sort((a, b) => b.living_area_sqft - a.living_area_sqft)
    case 'newest':
    default:
      return copy.sort((a, b) =>
        new Date(b.listed_date ?? b.created_at).getTime() -
        new Date(a.listed_date ?? a.created_at).getTime()
      )
  }
}

export default function ListingsClient({ initialListings, laListings = [] }: { initialListings: Listing[], laListings?: Listing[] }) {
  // Listings start populated from SSR — no loading spinner on first visit
  const [allListings, setAllListings] = useState<Listing[]>(initialListings)
  const [searching, setSearching]     = useState(false)

  // ── Server-side filters (trigger a new fetch) ──────────────────
  const [minBeds,   setMinBeds]   = useState('')
  const [minBaths,  setMinBaths]  = useState('')
  const [minRent,   setMinRent]   = useState('')
  const [maxRent,   setMaxRent]   = useState('')
  const [zip,       setZip]       = useState('')
  const [district,  setDistrict]  = useState('')

  // ── Client-side filters (instant, no fetch needed) ─────────────
  const [sortBy,     setSortBy]     = useState<SortKey>('newest')
  const [petsOnly,   setPetsOnly]   = useState(false)
  const [vacantOnly, setVacantOnly] = useState(false)
  const [horseOnly,  setHorseOnly]  = useState(false)

  const fetchListings = async () => {
    setSearching(true)
    try {
      const params = new URLSearchParams()
      if (minBeds)  params.set('minBeds', minBeds)
      if (minBaths) params.set('minBaths', minBaths)
      if (minRent)  params.set('minRent', minRent)
      if (maxRent)  params.set('maxRent', maxRent)
      if (zip)      params.set('zip', zip)
      if (district) params.set('district', district)
      const res = await fetch(`/api/listings?${params.toString()}`)
      if (!res.ok) throw new Error()
      const { listings: data } = await res.json()
      setAllListings(data || [])
    } catch {
      // keep existing listings visible on error
    } finally {
      setSearching(false)
    }
  }

  const displayed = useMemo(() => {
    let result = allListings
    if (petsOnly)   result = result.filter(l => l.pets_allowed)
    if (vacantOnly) result = result.filter(l => l.rental_status === 'vacant' || l.rental_status === 'coming_soon')
    if (horseOnly)  result = result.filter(l => l.amenities?.includes('Horse Property'))
    return sortListings(result, sortBy)
  }, [allListings, sortBy, petsOnly, vacantOnly, horseOnly])

  const clearAll = () => {
    setMinBeds(''); setMinBaths(''); setMinRent(''); setMaxRent('')
    setZip(''); setDistrict('')
    setSortBy('newest'); setPetsOnly(false); setVacantOnly(false); setHorseOnly(false)
    setAllListings(initialListings)
  }

  const inputCls = 'px-4 py-2.5 rounded-xl text-sm border outline-none transition-colors duration-200 focus:border-[#C9A961] focus-visible:ring-2 focus-visible:ring-[#C9A961] focus-visible:ring-offset-1'
  const inputStyle = { borderColor: '#e0ddd8', backgroundColor: 'white', color: '#2B2B2B', width: '100%' }

  return (
    <main className="min-h-screen" id="main-content" style={{ backgroundColor: '#F7F5F0' }}>
      {/* Header */}
      <div className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(to bottom, #1C3D5A 0%, #2a5278 100%)' }}>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: '#C9A961', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
          Bakersfield Rental Homes
        </p>
        <h1 className="text-4xl font-bold mb-3"
          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
          Houses for Rent in Bakersfield, CA
        </h1>
        <p
          className="text-sm font-light"
          style={{ color: 'rgba(247,245,240,0.65)' }}
          aria-live="polite"
          aria-atomic="true"
          role="status"
        >
          {displayed.length} {displayed.length === 1 ? 'property' : 'properties'} found
        </p>
      </div>

      {/* Niko pet-friendly banner */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-0">
        <div
          className="flex items-center gap-4 px-5 py-3 rounded-2xl mb-2"
          style={{
            backgroundColor: 'white',
            border: '1px solid rgba(201,169,97,0.25)',
            boxShadow: '0 2px 12px rgba(28,61,90,0.06)',
          }}
        >
          <Image
            src="/niko/niko-1.jpg"
            alt="Niko, our pet-friendly mascot"
            width={48}
            height={48}
            className="rounded-full object-cover flex-shrink-0"
            style={{ border: '2px solid #C9A961' }}
          />
          <div>
            <p className="text-sm font-semibold" style={{ color: '#1C3D5A', fontFamily: 'Playfair Display, Georgia, serif' }}>
              <span aria-hidden="true">🐾 </span>Pet-Friendly Rentals Available
            </p>
            <p className="text-xs" style={{ color: '#616161' }}>
              Niko-approved homes — ask us about our pet policy when you reach out.
            </p>
          </div>
        </div>
      </div>

      {/* $1 verification trust banner */}
      <div className="max-w-6xl mx-auto px-6 pt-4 pb-0">
        <div
          className="flex items-center gap-3 px-5 py-3 rounded-2xl mb-2"
          style={{
            backgroundColor: 'white',
            border: '1px solid rgba(201,169,97,0.25)',
            boxShadow: '0 2px 12px rgba(28,61,90,0.06)',
          }}
        >
          <span className="text-xl flex-shrink-0" aria-hidden="true">✅</span>
          <p className="text-xs" style={{ color: '#616161' }}>
            <span className="font-semibold" style={{ color: '#1C3D5A' }}>We charge a $1 fee</span> to verify that every landlord is real and every listing is legitimate — keeping scammers and fake listings off the platform.
          </p>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-10" aria-labelledby="bakersfield-listings-heading">
        <h2 id="bakersfield-listings-heading" className="sr-only">Bakersfield Rental Listings</h2>
        {/* ── Filter + Sort Panel ───────────────────────────────── */}
        <div
          role="search"
          aria-label="Filter and sort rental listings"
          className="mb-8 p-5 rounded-2xl bg-white"
          style={{ border: '1px solid rgba(201,169,97,0.15)', boxShadow: '0 2px 12px rgba(28,61,90,0.06)' }}
        >
          {/* Row 1 — server-side filters */}
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: '#595959' }}>
            Filter
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
            <div>
              <label htmlFor="filter-beds" className="block text-[10px] font-semibold tracking-widest uppercase mb-1.5"
                style={{ color: '#1C3D5A' }}>Min Beds</label>
              <select id="filter-beds" className={inputCls} style={inputStyle}
                value={minBeds} onChange={e => setMinBeds(e.target.value)}>
                <option value="">Any</option>
                {['1','2','3','4','5'].map(n => <option key={n} value={n}>{n}+ BD</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="filter-baths" className="block text-[10px] font-semibold tracking-widest uppercase mb-1.5"
                style={{ color: '#1C3D5A' }}>Min Baths</label>
              <select id="filter-baths" className={inputCls} style={inputStyle}
                value={minBaths} onChange={e => setMinBaths(e.target.value)}>
                <option value="">Any</option>
                {['1','1.5','2','2.5','3'].map(n => <option key={n} value={n}>{n}+ BA</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="filter-min-rent" className="block text-[10px] font-semibold tracking-widest uppercase mb-1.5"
                style={{ color: '#1C3D5A' }}>Min Rent</label>
              <select id="filter-min-rent" className={inputCls} style={inputStyle}
                value={minRent} onChange={e => setMinRent(e.target.value)}>
                <option value="">Any</option>
                {['800','1000','1200','1500','1800','2000','2500','3000'].map(r => (
                  <option key={r} value={r}>${Number(r).toLocaleString()}/mo</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="filter-max-rent" className="block text-[10px] font-semibold tracking-widest uppercase mb-1.5"
                style={{ color: '#1C3D5A' }}>Max Rent</label>
              <select id="filter-max-rent" className={inputCls} style={inputStyle}
                value={maxRent} onChange={e => setMaxRent(e.target.value)}>
                <option value="">Any</option>
                {['1000','1500','2000','2500','3000','4000','5000'].map(r => (
                  <option key={r} value={r}>${Number(r).toLocaleString()}/mo</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="filter-zip" className="block text-[10px] font-semibold tracking-widest uppercase mb-1.5"
                style={{ color: '#1C3D5A' }}>Zip Code</label>
              <input
                id="filter-zip"
                type="text"
                placeholder="e.g. 93309"
                maxLength={5}
                className={inputCls}
                style={inputStyle}
                value={zip}
                onChange={e => setZip(e.target.value.replace(/\D/g, ''))}
              />
            </div>

            <div>
              <label htmlFor="filter-district" className="block text-[10px] font-semibold tracking-widest uppercase mb-1.5"
                style={{ color: '#1C3D5A' }}>District</label>
              <select id="filter-district" className={inputCls} style={inputStyle}
                value={district} onChange={e => setDistrict(e.target.value)}>
                <option value="">Any</option>
                <option value="Panama-Buena Vista">Panama-Buena Vista</option>
                <option value="Bakersfield City">Bakersfield City</option>
                <option value="Kern High">Kern High</option>
                <option value="Fruitvale">Fruitvale</option>
                <option value="Rosedale Union">Rosedale Union</option>
                <option value="Norris">Norris</option>
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-1 pt-4 border-t" style={{ borderColor: '#f0ece4' }}>
            <button
              type="button"
              onClick={fetchListings}
              disabled={searching}
              aria-label="Search listings with selected filters"
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all duration-200 hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0', letterSpacing: '0.1em' }}>
              {searching ? 'Searching…' : 'Search'}
            </button>
            <button
              type="button"
              aria-label="Clear all filters and sorting"
              onClick={clearAll}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-70"
              style={{ backgroundColor: 'transparent', color: '#616161', border: '1px solid #e0ddd8' }}>
              Clear All
            </button>
          </div>

          {/* Row 2 — sort + instant toggles */}
          <div className="border-t pt-4 mt-4" style={{ borderColor: '#f0ece4' }}>
            <p className="text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: '#595959' }}>
              Sort &amp; Refine
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-[180px] max-w-[260px]">
                <label htmlFor="sort-by" className="text-[10px] font-semibold tracking-widest uppercase whitespace-nowrap"
                  style={{ color: '#1C3D5A' }}>
                  Sort by
                </label>
                <select
                  id="sort-by"
                  className={inputCls}
                  style={{ ...inputStyle, flex: 1 }}
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as SortKey)}
                  aria-label="Sort listings"
                >
                  <option value="newest">Newest First</option>
                  <option value="price_asc">Price: Low → High</option>
                  <option value="price_desc">Price: High → Low</option>
                  <option value="beds_desc">Most Bedrooms</option>
                  <option value="sqft_desc">Largest Home</option>
                </select>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={petsOnly}
                onClick={() => setPetsOnly(v => !v)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A961]"
                style={{
                  border: `1.5px solid ${petsOnly ? '#C9A961' : '#e0ddd8'}`,
                  backgroundColor: petsOnly ? 'rgba(201,169,97,0.1)' : 'white',
                  color: petsOnly ? '#8a6d1f' : '#555',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <span aria-hidden="true">🐾</span>
                Pets Allowed
              </button>

              <button
                type="button"
                role="switch"
                aria-checked={vacantOnly}
                onClick={() => setVacantOnly(v => !v)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A961]"
                style={{
                  border: `1.5px solid ${vacantOnly ? '#B03A2E' : '#e0ddd8'}`,
                  backgroundColor: vacantOnly ? 'rgba(176,58,46,0.08)' : 'white',
                  color: vacantOnly ? '#B03A2E' : '#555',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  aria-hidden="true"
                  style={{ backgroundColor: vacantOnly ? '#B03A2E' : '#ccc' }}
                />
                Coming Soon Only
              </button>

              <button
                type="button"
                role="switch"
                aria-checked={horseOnly}
                onClick={() => setHorseOnly(v => !v)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A961]"
                style={{
                  border: `1.5px solid ${horseOnly ? '#5a3e1b' : '#e0ddd8'}`,
                  backgroundColor: horseOnly ? 'rgba(90,62,27,0.08)' : 'white',
                  color: horseOnly ? '#5a3e1b' : '#555',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <span aria-hidden="true">🐴</span>
                Horse Property
              </button>
            </div>
          </div>
        </div>

        {/* ── Results header ────────────────────────────────────── */}
        {allListings.length > 0 && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm" style={{ color: '#616161' }}>
              Showing <strong style={{ color: '#1C3D5A' }}>{displayed.length}</strong> of{' '}
              {allListings.length} {allListings.length === 1 ? 'property' : 'properties'}
            </p>
            {(petsOnly || vacantOnly || horseOnly || sortBy !== 'newest') && (
              <div className="flex flex-wrap gap-2">
                {sortBy !== 'newest' && (
                  <span className="text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1"
                    style={{ backgroundColor: 'rgba(28,61,90,0.08)', color: '#1C3D5A' }}>
                    {{
                      price_asc:  'Price ↑',
                      price_desc: 'Price ↓',
                      beds_desc:  'Most Beds',
                      sqft_desc:  'Largest',
                    }[sortBy]}
                    <button onClick={() => setSortBy('newest')} aria-label="Remove sort filter" className="inline-flex items-center justify-center w-5 h-5 rounded-full hover:bg-black/10 transition-colors" style={{ color: '#616161', marginLeft: 2 }}>×</button>
                  </span>
                )}
                {petsOnly && (
                  <span className="text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1"
                    style={{ backgroundColor: 'rgba(201,169,97,0.12)', color: '#8a6d1f' }}>
                    🐾 Pets
                    <button onClick={() => setPetsOnly(false)} aria-label="Remove pets filter" className="inline-flex items-center justify-center w-5 h-5 rounded-full hover:bg-black/10 transition-colors" style={{ color: '#616161', marginLeft: 2 }}>×</button>
                  </span>
                )}
                {vacantOnly && (
                  <span className="text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1"
                    style={{ backgroundColor: 'rgba(176,58,46,0.08)', color: '#B03A2E' }}>
                    ● Coming Soon
                    <button onClick={() => setVacantOnly(false)} aria-label="Remove coming soon filter" className="inline-flex items-center justify-center w-5 h-5 rounded-full hover:bg-black/10 transition-colors" style={{ color: '#616161', marginLeft: 2 }}>×</button>
                  </span>
                )}
                {horseOnly && (
                  <span className="text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1"
                    style={{ backgroundColor: 'rgba(90,62,27,0.08)', color: '#5a3e1b' }}>
                    🐴 Horse Property
                    <button onClick={() => setHorseOnly(false)} aria-label="Remove horse property filter" className="inline-flex items-center justify-center w-5 h-5 rounded-full hover:bg-black/10 transition-colors" style={{ color: '#616161', marginLeft: 2 }}>×</button>
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Grid ─────────────────────────────────────────────── */}
        {searching ? (
          <div role="status" aria-live="polite" aria-label="Loading listings" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse"
                style={{ border: '1px solid rgba(201,169,97,0.12)' }}>
                <div className="aspect-[4/3]" style={{ backgroundColor: '#e8e5df' }} />
                <div className="p-5 space-y-3">
                  <div className="h-4 rounded-full" style={{ backgroundColor: '#e8e5df', width: '70%' }} />
                  <div className="h-3 rounded-full" style={{ backgroundColor: '#e8e5df', width: '50%' }} />
                  <div className="h-3 rounded-full" style={{ backgroundColor: '#e8e5df', width: '80%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div role="status" aria-live="polite" className="text-center py-24">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: '#f0ece4' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M16 4L28 10V28H20V22H12V28H4V10L16 4Z" fill="#C9A961" opacity="0.4"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              No properties match
            </h3>
            <p className="text-sm mb-6" style={{ color: '#616161' }}>
              Try adjusting your filters or clearing them to see all listings.
            </p>
            <button
              onClick={clearAll}
              className="inline-block px-8 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A961]"
              style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0', letterSpacing: '0.1em' }}>
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((l, i) => (
              <ListingCard key={l.id} listing={l} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* LA listings — only rendered if data exists */}
      {laListings.length > 0 && (
        <section
          className="max-w-6xl mx-auto px-6 md:px-10 py-16 border-t"
          style={{ borderColor: 'rgba(201,169,97,0.15)' }}
          aria-labelledby="la-listings-heading"
        >
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#7d6019' }}>
              Also Available · Los Angeles, CA
            </p>
            <h2
              id="la-listings-heading"
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}
            >
              Direct Landlord Rentals in Los Angeles
            </h2>
            <p className="text-sm max-w-xl" style={{ color: '#616161' }}>
              A select number of properties in Los Angeles are listed here — rented directly by the owner, no broker fees.
            </p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
            {laListings.map((l, i) => (
              <li key={l.id}>
                <ListingCard listing={l} index={i} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
