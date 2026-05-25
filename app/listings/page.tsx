'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Listing } from '@/lib/supabase'

const BATH_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-4z"/><path d="M4 12V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1"/>
  </svg>
)
const BED_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4v16M22 4v16M2 12h20M2 8h10M12 8h10"/>
  </svg>
)
const SQFT_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
  </svg>
)

function ListingCard({ listing, index }: { listing: Listing; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <Link href={`/listings/${listing.id}`} className="block group">
        <div className="bg-white rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg"
          style={{ border: '1px solid rgba(201,169,97,0.12)' }}>
          {/* Photo */}
          <div className="relative overflow-hidden aspect-[4/3]" style={{ backgroundColor: '#e8e5df' }}>
            {listing.photos?.[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={listing.photos[0]}
                alt={listing.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
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
          </div>

          {/* Info */}
          <div className="p-5">
            <h3 className="font-semibold text-base mb-1 line-clamp-1 group-hover:text-[#C9A961] transition-colors duration-200"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              {listing.title}
            </h3>
            <p className="text-xs mb-4 line-clamp-1" style={{ color: '#888' }}>
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

            {listing.amenities?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {listing.amenities.slice(0, 3).map(a => (
                  <span key={a} className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: '#f0ece4', color: '#888' }}>
                    {a}
                  </span>
                ))}
                {listing.amenities.length > 3 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: '#f0ece4', color: '#888' }}>
                    +{listing.amenities.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [minBeds, setMinBeds] = useState('')
  const [maxRent, setMaxRent] = useState('')

  const fetchListings = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (minBeds) params.set('minBeds', minBeds)
    if (maxRent) params.set('maxRent', maxRent)
    const res = await fetch(`/api/listings?${params.toString()}`)
    const { listings: data } = await res.json()
    setListings(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchListings() }, []) // eslint-disable-line

  const inputCls = 'px-4 py-2.5 rounded-xl text-sm border outline-none transition-colors duration-200 focus:border-[#C9A961]'

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F5F0' }}>
      {/* Header */}
      <div className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(to bottom, #1C3D5A 0%, #2a5278 100%)' }}>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: '#C9A961', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
          Bakersfield Rental Homes
        </p>
        <h1 className="text-4xl font-bold mb-3"
          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
          Available Rentals
        </h1>
        <p className="text-sm font-light" style={{ color: 'rgba(247,245,240,0.65)' }}>
          {listings.length} {listings.length === 1 ? 'property' : 'properties'} available in Bakersfield
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 items-end">
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase mb-1.5"
              style={{ color: '#1C3D5A' }}>Min Bedrooms</label>
            <select className={inputCls} style={{ borderColor: '#e0ddd8', backgroundColor: 'white', color: '#2B2B2B' }}
              value={minBeds} onChange={e => setMinBeds(e.target.value)}>
              <option value="">Any</option>
              {['1', '2', '3', '4', '5'].map(n => (
                <option key={n} value={n}>{n}+ BD</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase mb-1.5"
              style={{ color: '#1C3D5A' }}>Max Rent</label>
            <select className={inputCls} style={{ borderColor: '#e0ddd8', backgroundColor: 'white', color: '#2B2B2B' }}
              value={maxRent} onChange={e => setMaxRent(e.target.value)}>
              <option value="">Any</option>
              {['1000','1500','2000','2500','3000','4000','5000'].map(r => (
                <option key={r} value={r}>${Number(r).toLocaleString()}/mo</option>
              ))}
            </select>
          </div>
          <button onClick={fetchListings}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0', letterSpacing: '0.1em' }}>
            Search
          </button>

          <div className="ml-auto">
            <Link href="/list"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}>
              + List Your Property — $1
            </Link>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        ) : listings.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: '#f0ece4' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4L28 10V28H20V22H12V28H4V10L16 4Z" fill="#C9A961" opacity="0.4"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              No listings yet
            </h3>
            <p className="text-sm mb-6" style={{ color: '#888' }}>
              Be the first to list a property in Bakersfield.
            </p>
            <Link href="/list"
              className="inline-block px-8 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase"
              style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0', letterSpacing: '0.1em' }}>
              List Your Property
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((l, i) => (
              <ListingCard key={l.id} listing={l} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
