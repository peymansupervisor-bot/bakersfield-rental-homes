'use client'

import Link from 'next/link'
import { NEIGHBORHOODS } from '@/lib/neighborhoods'

export default function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="py-16 px-6 md:px-10"
      style={{
        background: 'linear-gradient(160deg, #1C3D5A 0%, #0f2538 100%)',
        borderTop: '3px solid #B22234',
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-7 text-center">

        {/* Logo mark */}
        <div className="flex items-center gap-3" aria-hidden="true">
          <div className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#C9A961' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
              <path d="M8 2L14 6V14H10V10H6V14H2V6L8 2Z" fill="#1C3D5A" />
            </svg>
          </div>
          <div className="leading-none text-left">
            <p className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
              Bakersfield
            </p>
            <p className="text-xs tracking-wider uppercase"
              style={{ color: '#d4b56a', fontFamily: 'Inter, sans-serif' }}>
              Rental Homes
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl font-semibold max-w-xl leading-relaxed"
          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#ffffff' }}>
          1 Bakersfield. 1 community.<br />Together we grow stronger.
        </p>

        <p className="text-sm font-light max-w-lg leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter, sans-serif' }}>
          Rooted in hard work, driven by pride, and united by the belief that when neighbors lift each other up — the whole city rises.
        </p>

        {/* Key SEO pages */}
        <nav aria-label="Key pages" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <Link href="/blog" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(247,245,240,0.80)' }}>
            Renter's Blog
          </Link>
          <Link href="/direct-landlord-rentals" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(247,245,240,0.80)' }}>
            Direct Landlord Rentals
          </Link>
          <Link href="/pet-friendly-rentals-bakersfield" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(247,245,240,0.80)' }}>
            Pet Friendly Rentals
          </Link>
          <Link href="/2-bedroom-houses-for-rent-bakersfield" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(247,245,240,0.80)' }}>
            2 Bedroom Rentals
          </Link>
          <Link href="/3-bedroom-houses-for-rent-bakersfield" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(247,245,240,0.80)' }}>
            3 Bedroom Rentals
          </Link>
          <Link href="/4-bedroom-houses-for-rent-bakersfield" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(247,245,240,0.80)' }}>
            4 Bedroom Rentals
          </Link>
          <Link href="/insurance-housing-bakersfield" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(247,245,240,0.80)' }}>
            Insurance &amp; ALE Housing
          </Link>
          <Link href="/travel-nurse-housing-bakersfield" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(247,245,240,0.80)' }}>
            Travel Nurse Housing
          </Link>
          <Link href="/bakersfield-condors-player-housing" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(247,245,240,0.80)' }}>
            Condors Player Housing
          </Link>
          <Link href="/horse-property-for-rent-bakersfield" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(247,245,240,0.80)' }}>
            Horse Property Rentals
          </Link>
          <Link href="/neighborhoods" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(247,245,240,0.80)' }}>
            Rentals by Neighborhood
          </Link>
          <Link href="/los-angeles" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(247,245,240,0.80)' }}>
            Los Angeles &amp; West Hollywood
          </Link>
        </nav>

        {/* Neighborhood links */}
        <nav aria-label="Rentals by neighborhood" className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          {NEIGHBORHOODS.map(n => (
            <Link
              key={n.slug}
              href={`/neighborhoods/${n.slug}`}
              className="text-xs transition-all hover:opacity-80"
              style={{ color: '#d4b56a' }}
            >
              {n.name} Rentals
            </Link>
          ))}
        </nav>

        {/* Gold divider */}
        <div className="w-16 h-px" aria-hidden="true"
          style={{ background: 'linear-gradient(to right, transparent, #C9A961, transparent)' }} />

        {/* Legal */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs font-semibold tracking-wide" style={{ color: 'rgba(201,169,97,0.9)', fontFamily: 'Inter, sans-serif' }}>
            Bakersfield Brokers &nbsp;·&nbsp; DRE #01726653
          </p>
          <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.80)' }}>
            © 2026 Bakersfield Rental Homes. All rights reserved.
          </p>
          <a href="tel:+16613811818"
            className="text-xs font-semibold transition-all hover:opacity-80"
            style={{ color: 'rgba(255,255,255,0.7)' }}
            aria-label="Call us at (661) 381-1818">
            <span aria-hidden="true">📞 </span>(661) 381-1818
          </a>
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2">
            <Link href="/terms" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(255,255,255,0.80)' }}>
              Terms of Service
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }} aria-hidden="true">·</span>
            <Link href="/privacy" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(255,255,255,0.80)' }}>
              Privacy Policy
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }} aria-hidden="true">·</span>
            <Link href="/disclaimer" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(255,255,255,0.80)' }}>
              Disclaimer
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }} aria-hidden="true">·</span>
            <Link href="/accessibility" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(255,255,255,0.80)' }}>
              Accessibility
            </Link>
          </div>

          {/* Legal notice */}
          <div className="mt-4 max-w-2xl text-center border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter, sans-serif' }}>
              This website is an informational platform only — listings are posted by independent landlords and no brokerage, agency, or property management services are provided through this site. No content constitutes legal, financial, or professional advice.
            </p>
          </div>

          {/* Fair Housing Notice */}
          <div className="mt-3 max-w-2xl text-center border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'rgba(201,169,97,0.9)', fontFamily: 'Inter, sans-serif' }}>
              Fair Housing Notice
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif' }}>
              All properties and rentals advertised on this site are subject to the Fair Housing Act. It is illegal to advertise any preference, limitation, or discrimination because of race, color, religion, sex, handicap, familial status, or national origin, or intention to make any such preference, limitation, or discrimination. All dwellings advertised are available on an equal opportunity basis.
            </p>
          </div>

          {/* SMS Consent Notice */}
          <div className="mt-3 max-w-2xl text-center border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'rgba(201,169,97,0.9)', fontFamily: 'Inter, sans-serif' }}>
              SMS &amp; Notification Consent
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif' }}>
              By providing your phone number and submitting any form on this site, you consent to receive text messages (SMS), notifications, and alerts through automated technology regarding listings and our services. You are responsible for ensuring your consent is knowing and voluntary. Standard message and data rates may apply. We are not liable for any failure to obtain proper consent prior to submitting contact information. Your use of this site is subject to our{' '}
              <Link href="/privacy" className="underline hover:opacity-80" style={{ color: 'rgba(201,169,97,0.9)' }}>Privacy Policy</Link>
              {' '}and{' '}
              <Link href="/terms" className="underline hover:opacity-80" style={{ color: 'rgba(201,169,97,0.9)' }}>Terms of Service</Link>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
