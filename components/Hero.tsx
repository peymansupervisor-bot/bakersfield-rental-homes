'use client'

import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Fade out scroll indicator on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const [muted, setMuted] = useState(true)

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', backgroundColor: '#0a0a0a' }}
    >
      {/* Desktop: autoplay video */}
      {!isMobile && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero.mp4"
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="auto"
        />
      )}

      {/* Mobile: static fallback image */}
      {isMobile && (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(/hero-mobile.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      {/* Subtle vignette — darkens edges slightly for depth, does not cover video text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.18) 100%)',
        }}
      />

      {/* Brand name — top-left corner, clear of video action area */}
      <div
        className="absolute top-20 left-6 md:left-10 pointer-events-none"
        style={{ opacity: 0.92 }}
      >
        <p
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: '#C9A961', letterSpacing: '0.22em', fontFamily: 'Inter, sans-serif' }}
        >
          Bakersfield Rental Homes
        </p>
      </div>

      {/* Tagline — bottom-left, clear of video content */}
      <div
        className="absolute bottom-16 left-6 md:left-10 max-w-xs pointer-events-none"
      >
        <p
          className="text-sm md:text-base font-light"
          style={{ color: 'rgba(247,245,240,0.82)', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}
        >
          Your property. Our people.<br />Bakersfield&rsquo;s finest, on call.
        </p>
      </div>

      {/* Sound toggle — bottom-right */}
      {!isMobile && (
        <button
          onClick={() => setMuted(m => !m)}
          className="absolute bottom-8 right-6 md:right-10 flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: 'rgba(247,245,240,0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(247,245,240,0.25)',
            color: 'rgba(247,245,240,0.85)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            zIndex: 20,
          }}
        >
          {muted ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
              <span>Sound On</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
              <span>Mute</span>
            </>
          )}
        </button>
      )}

      {/* Watermark cover — bottom-right corner */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: '220px',
          height: '72px',
          background: 'linear-gradient(to top left, rgba(10,10,10,0.97) 35%, transparent 100%)',
          zIndex: 10,
        }}
      />

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500"
        style={{ opacity: scrolled ? 0 : 1 }}
      >
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: 'rgba(247,245,240,0.5)', fontFamily: 'Inter, sans-serif' }}
        >
          Scroll
        </p>
        <div
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, transparent, #C9A961)' }}
        />
      </div>
    </section>
  )
}
