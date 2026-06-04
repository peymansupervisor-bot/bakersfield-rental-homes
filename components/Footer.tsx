'use client'

import Link from 'next/link'
import Image from 'next/image'
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
        <div className="flex items-center justify-center">
          <Image
            src="/logo-icon-transparent.png"
            alt="Bakersfield Rental Homes"
            width={160}
            height={160}
          />
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl font-semibold max-w-xl leading-relaxed"
          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#ffffff' }}>
          1 Bakersfield. 1 community.<br />Together we grow stronger.
        </p>

        <p className="text-sm font-light max-w-lg leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter, sans-serif' }}>
          Rooted in hard work, driven by pride, and united by the belief that when neighbors lift each other up — the whole city rises.
        </p>

        {/* Key SEO pages */}
        <nav aria-label="Key pages" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <Link href="/direct-landlord-rentals" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(247,245,240,0.55)' }}>
            Direct Landlord Rentals
          </Link>
          <Link href="/neighborhoods" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(247,245,240,0.55)' }}>
            Rentals by Neighborhood
          </Link>
        </nav>

        {/* Neighborhood links */}
        <nav aria-label="Rentals by neighborhood" className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          {NEIGHBORHOODS.map(n => (
            <Link
              key={n.slug}
              href={`/neighborhoods/${n.slug}`}
              className="text-xs transition-all hover:opacity-80"
              style={{ color: 'rgba(201,169,97,0.7)' }}
            >
              {n.name}
            </Link>
          ))}
        </nav>

        {/* Gold divider */}
        <div className="w-16 h-px" aria-hidden="true"
          style={{ background: 'linear-gradient(to right, transparent, #C9A961, transparent)' }} />

        {/* Legal */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.6)' }}>
            © 2026 Bakersfield Rental Homes. All rights reserved.
          </p>
          <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Owned by Bakersfield Brokers &nbsp;|&nbsp; DRE #01726653
          </p>
          <a href="tel:+16613811818"
            className="text-xs font-semibold transition-all hover:opacity-80"
            style={{ color: 'rgba(255,255,255,0.7)' }}
            aria-label="Call us at (661) 381-1818">
            <span aria-hidden="true">📞 </span>(661) 381-1818
          </a>
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Privacy Policy
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }} aria-hidden="true">·</span>
            <Link href="/disclaimer" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Disclaimer
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }} aria-hidden="true">·</span>
            <Link href="/accessibility" className="text-xs transition-all hover:opacity-80" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Accessibility
            </Link>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-4 max-w-2xl text-center border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'Inter, sans-serif' }}>
              This site is an informational platform only — not a licensed real estate broker, agent, or property manager. No content constitutes legal, financial, or professional advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
