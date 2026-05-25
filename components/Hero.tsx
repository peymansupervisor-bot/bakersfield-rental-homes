'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'

interface HeroOverlay {
  startPct: number
  endPct: number
  text: string
  sub?: string
}

const OVERLAYS: HeroOverlay[] = [
  { startPct: 0.15, endPct: 0.28, text: 'DISTANCE SHOULDN\'T MEAN WORRY', sub: 'Your property is far. Your anxiety doesn\'t have to be.' },
  { startPct: 0.40, endPct: 0.53, text: 'LOCAL EXPERTS. ON YOUR PROPERTY.', sub: 'Gardeners, pool techs, HVAC, handymen — Bakersfield\'s best, on call.' },
  { startPct: 0.68, endPct: 0.81, text: 'MAINTAINED. OCCUPIED. PROFITABLE.', sub: 'Every detail handled. Every month, on time.' },
  { startPct: 0.90, endPct: 1.00, text: 'INVEST FROM ANYWHERE.', sub: 'Your Bakersfield team. Your peace of mind.' },
]

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val))
}

function overlayOpacity(progress: number, start: number, end: number): number {
  const fadeIn = start
  const fullIn = start + 0.04
  const fullOut = end - 0.04
  const fadeOut = end

  if (progress < fadeIn) return 0
  if (progress < fullIn) return (progress - fadeIn) / (fullIn - fadeIn)
  if (progress < fullOut) return 1
  if (progress < fadeOut) return 1 - (progress - fullOut) / (fadeOut - fullOut)
  return 0
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [videoDuration, setVideoDuration] = useState(0)

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Load video metadata
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onMeta = () => setVideoDuration(video.duration)
    video.addEventListener('loadedmetadata', onMeta)
    if (video.readyState >= 1) onMeta()
    return () => video.removeEventListener('loadedmetadata', onMeta)
  }, [])

  // GSAP-style scroll sync via rAF
  useEffect(() => {
    if (isMobile) return

    let rafId: number

    const onScroll = () => {
      const container = containerRef.current
      const video = videoRef.current
      if (!container || !video || !videoDuration) return

      const rect = container.getBoundingClientRect()
      const containerHeight = container.offsetHeight
      const viewportH = window.innerHeight

      // Progress: 0 when top enters viewport, 1 when bottom exits
      const scrolled = -rect.top
      const scrollable = containerHeight - viewportH
      const pct = clamp(scrolled / scrollable, 0, 1)

      setProgress(pct)
      video.currentTime = pct * videoDuration
    }

    const tick = () => {
      onScroll()
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isMobile, videoDuration])

  return (
    <section
      ref={containerRef}
      style={{ height: '400vh', backgroundColor: '#F7F5F0' }}
    >
      {/* Sticky video frame */}
      <div className="sticky top-0 h-screen overflow-hidden" style={{ backgroundColor: '#F7F5F0' }}>

        {/* Desktop: scroll-synced video */}
        {!isMobile && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ backgroundColor: '#F7F5F0' }}
            src="/hero.mp4"
            muted
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
              backgroundColor: '#F7F5F0',
            }}
          />
        )}

        {/* Overlay gradient (subtle bottom fade for readability) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 40%, rgba(247,245,240,0.3) 100%)',
          }}
        />

        {/* Text overlays */}
        {OVERLAYS.map((overlay, i) => {
          const opacity = overlayOpacity(progress, overlay.startPct, overlay.endPct)
          return (
            <div
              key={i}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
              style={{ opacity, transition: 'opacity 0.1s linear' }}
            >
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: '#C9A961', letterSpacing: '0.2em' }}
              >
                Bakersfield Rental Homes
              </p>
              <h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl"
                style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  color: '#1C3D5A',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                {overlay.text}
              </h1>
              {overlay.sub && (
                <p
                  className="text-base md:text-lg max-w-xl font-light"
                  style={{ color: '#2B2B2B', opacity: 0.75 }}
                >
                  {overlay.sub}
                </p>
              )}
            </div>
          )
        })}

        {/* Scroll indicator — fades out after 10% scroll */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: clamp(1 - progress * 10, 0, 1) }}
        >
          <p className="text-xs tracking-widest uppercase" style={{ color: '#1C3D5A', opacity: 0.5 }}>
            Scroll
          </p>
          <div className="w-px h-8 bg-gradient-to-b from-transparent" style={{ background: 'linear-gradient(to bottom, transparent, #C9A961)' }} />
        </div>
      </div>
    </section>
  )
}
