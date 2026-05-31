'use client'

import { useEffect, useRef, useState } from 'react'

// Scene overlay definitions — keyed to video timecodes
const OVERLAYS = [
  {
    start: 0,
    end: 4.2,
    headline: 'This website connects\ntenants to landlords directly.',
    sub: '',
  },
]

interface HeroProps { heroHeadline?: string }

export default function Hero({ heroHeadline }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [muted, setMuted] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)

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

  // Track video time for scene overlays
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onTimeUpdate = () => setCurrentTime(video.currentTime)
    video.addEventListener('timeupdate', onTimeUpdate)
    return () => video.removeEventListener('timeupdate', onTimeUpdate)
  }, [])

  // Fix: imperatively toggle muted — React's muted prop doesn't reliably
  // update the DOM attribute after mount in all browsers
  const handleSoundToggle = () => {
    const video = videoRef.current
    if (video) {
      video.muted = !video.muted
      setMuted(video.muted)
    }
  }

  const headline = heroHeadline || OVERLAYS[0].headline
  const activeOverlay = OVERLAYS.find(
    (o) => currentTime >= o.start && currentTime < o.end
  )

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
          muted
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

      {/* Subtle vignette — darkens edges slightly for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.18) 100%)',
        }}
      />

      {/* Scene overlay text — centred, fades in/out with each scene */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: activeOverlay ? 1 : 0,
          transition: 'opacity 0.7s ease',
          zIndex: 5,
        }}
      >
        {activeOverlay && (
          <div className="text-center px-6" style={{ maxWidth: '640px' }}>
            <h1
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: 'clamp(2rem, 5vw, 3.4rem)',
                fontWeight: 700,
                color: '#F7F5F0',
                lineHeight: 1.18,
                letterSpacing: '-0.02em',
                whiteSpace: 'pre-line',
                textShadow: '0 2px 28px rgba(0,0,0,0.6)',
                marginBottom: '14px',
              }}
            >
              {headline}
            </h1>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(0.7rem, 1.4vw, 0.85rem)',
                fontWeight: 300,
                color: 'rgba(247,245,240,0.7)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textShadow: '0 1px 12px rgba(0,0,0,0.45)',
              }}
            >
              {activeOverlay.sub}
            </p>
          </div>
        )}
      </div>

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
          onClick={handleSoundToggle}
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-500"
        style={{ opacity: scrolled ? 0 : 1 }}
        aria-hidden="true"
      >
        <p
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: '#ffffff', fontFamily: 'Inter, sans-serif', letterSpacing: '0.18em', textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
        >
          Scroll
        </p>
        {/* Animated chevron arrows */}
        <div className="flex flex-col items-center" style={{ gap: '2px' }}>
          {[0, 1, 2].map((i) => (
            <svg
              key={i}
              width="18" height="10"
              viewBox="0 0 18 10"
              fill="none"
              style={{
                animation: `scrollChevron 1.4s ease infinite`,
                animationDelay: `${i * 0.18}s`,
                opacity: 0,
                filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))',
              }}
            >
              <path d="M1 1L9 9L17 1" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ))}
        </div>
        <style>{`
          @keyframes scrollChevron {
            0%   { opacity: 0;   transform: translateY(-4px); }
            40%  { opacity: 1;   transform: translateY(0px); }
            80%  { opacity: 0;   transform: translateY(4px); }
            100% { opacity: 0;   transform: translateY(4px); }
          }
        `}</style>
      </div>
    </section>
  )
}
