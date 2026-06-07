'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// Scene overlay definitions — keyed to video timecodes
const OVERLAYS = [
  {
    start: 0,
    end: 4.2,
    headline: 'Real landlords.\nReal listings.\nNo broker fees.',
    sub: '',
  },
]

interface HeroProps { heroHeadline?: string }

export default function Hero({ heroHeadline }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Reactively track prefers-reduced-motion and pause/play video accordingly
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = (matches: boolean) => {
      setPrefersReducedMotion(matches)
      setPlaying(!matches)
      const video = videoRef.current
      if (video) matches ? video.pause() : video.play().catch(() => {})
    }
    apply(mq.matches)
    const handler = (e: MediaQueryListEvent) => apply(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
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

  const handlePlayToggle = () => {
    const video = videoRef.current
    if (video) {
      playing ? video.pause() : video.play()
      setPlaying(!playing)
    }
  }

  const headline = heroHeadline || OVERLAYS[0].headline
  const activeOverlay = OVERLAYS.find(
    (o) => currentTime >= o.start && currentTime < o.end
  )

  return (
    <section
      aria-label="Hero — Bakersfield Rental Homes"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', backgroundColor: '#d6cfc4' }}
    >
      {/* Priority background image — always rendered immediately for fast LCP on both desktop and mobile */}
      <div className="absolute inset-0 w-full h-full" aria-hidden="true">
        <Image
          src="/hero-mobile.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Desktop: autoplay video layered on top — fades in once playing */}
      {!isMobile && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero.mp4"
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
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

      {/* Always-present h1 for screen readers and SEO */}
      <h1 className="sr-only">{headline} — Houses for Rent in Bakersfield, CA — Direct from Landlords</h1>

      {/* Scene overlay text — centred, visible only during first scene */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          zIndex: 5,
          opacity: activeOverlay ? 1 : 0,
          // Only transition OUT (when leaving scene), not on initial paint
          transition: currentTime > 0 ? 'opacity 0.7s ease' : 'none',
        }}
        aria-hidden="true"
      >
        <div className="text-center px-6" style={{ maxWidth: '640px' }}>
          <p
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 700,
              color: '#E8845A',
              lineHeight: 1.18,
              letterSpacing: '-0.02em',
              whiteSpace: 'pre-line',
              textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.5)',
              marginBottom: '14px',
            }}
          >
            {headline}
          </p>
          {activeOverlay?.sub && (
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
          )}
        </div>
      </div>


      {/* Video controls — bottom-left: pause/play + mute */}
      {!isMobile && (
        <div className="absolute bottom-8 left-6 md:left-10 flex items-center gap-2" style={{ zIndex: 20 }}>
          <button
            onClick={handlePlayToggle}
            aria-label={playing ? 'Pause background video' : 'Play background video'}
            aria-pressed={!playing}
            className="flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A961]"
            style={{
              backgroundColor: 'rgba(247,245,240,0.15)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(247,245,240,0.25)',
              color: 'rgba(247,245,240,0.85)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.1em',
              cursor: 'pointer',
            }}
          >
            {playing ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                <span>Play</span>
              </>
            )}
          </button>
          <button
            onClick={handleSoundToggle}
            aria-label={muted ? 'Unmute background video' : 'Mute background video'}
            aria-pressed={!muted}
            className="flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A961]"
            style={{
              backgroundColor: 'rgba(247,245,240,0.15)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(247,245,240,0.25)',
              color: 'rgba(247,245,240,0.85)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.1em',
              cursor: 'pointer',
            }}
          >
          {muted ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
              <span>Sound On</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
              <span>Mute</span>
            </>
          )}
        </button>
        </div>
      )}

      {/* Watermark cover — bottom-right corner */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        aria-hidden="true"
        style={{
          width: '220px',
          height: '72px',
          background: 'linear-gradient(to top left, rgba(201,169,97,0.55) 35%, transparent 100%)',
          backdropFilter: 'blur(6px)',
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
          style={{ color: '#E8845A', fontFamily: 'Inter, sans-serif', letterSpacing: '0.18em', textShadow: '0 1px 4px rgba(0,0,0,0.25)' }}
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
              <path d="M1 1L9 9L17 1" stroke="#E8845A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
