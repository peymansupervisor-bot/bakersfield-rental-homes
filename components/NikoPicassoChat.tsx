'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const LINES = [
  { speaker: 'picasso', text: "Hello! Another landlord is here to list on Bakersfield Rental Homes! Squawk!", audio: '/chat-audio/picasso1.mp3' },
  { speaker: 'niko',    text: "Smart human! No broker fees, no middlemen — just real tenants!", audio: '/chat-audio/niko1.mp3' },
  { speaker: 'niko',    text: "Yes. Local landlords, local renters. Honestly the best decision they've made all year.", audio: '/chat-audio/niko2.mp3' },
  { speaker: 'picasso', text: "And if it doesn't work out and your house isn't rented in 3 months… We will refund your $1. Trust the bird!", audio: '/chat-audio/picasso2.mp3' },
  { speaker: 'niko',    text: "Woof! Now scroll down to complete the form and join the family. 🐾", audio: '/chat-audio/niko3.mp3' },
]

export default function NikoPicassoChat() {
  const [visible, setVisible] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const indexRef = useRef(0)
  const startedRef = useRef(false)

  const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function playFrom(index: number) {
    if (index >= LINES.length) { setPlaying(false); return }
    indexRef.current = index
    setVisible(index)
    setPlaying(true)

    const audio = new Audio(LINES[index].audio)
    audioRef.current = audio
    audio.play().catch(() => {})
    audio.onended = () => playFrom(index + 1)
  }

  function showAll() {
    setVisible(LINES.length - 1)
    setPlaying(false)
  }

  function restart() {
    if (audioRef.current) { audioRef.current.onended = null; audioRef.current.pause() }
    if (prefersReducedMotion()) { showAll(); return }
    setVisible(-1)
    setTimeout(() => playFrom(0), 300)
  }

  // Autoplay when scrolled into view — fires only once; skipped for reduced-motion users
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (prefersReducedMotion()) { showAll(); return }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          setTimeout(() => playFrom(0), 600)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={sectionRef}
      className="py-10 px-6"
      style={{ background: 'linear-gradient(135deg, #0D1F2D 0%, #1C3D5A 100%)' }}
    >
      <div className="flex items-center justify-center gap-4 mb-8">
        <p id="niko-picasso-label" className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: '#C9A961', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
          A word from Niko &amp; Picasso
        </p>
        <button
          onClick={restart}
          aria-label={playing ? 'Replay the Niko and Picasso introduction' : 'Play the Niko and Picasso introduction'}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-opacity hover:opacity-80"
          style={{
            backgroundColor: playing ? 'rgba(201,169,97,0.15)' : '#C9A961',
            color: playing ? '#C9A961' : '#0D1F2D',
            border: playing ? '1px solid rgba(201,169,97,0.3)' : 'none',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <span aria-hidden="true">{playing ? '↺ Replay' : '▶ Play'}</span>
        </button>
      </div>

      <div className="max-w-2xl mx-auto space-y-5" aria-live="polite" aria-label="Niko and Picasso conversation" aria-atomic="false">
        {LINES.map((line, i) => {
          const isNiko = line.speaker === 'niko'
          const show = i <= visible
          return (
            <div
              key={i}
              className="flex items-end gap-3"
              aria-hidden={!show}
              style={{
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(14px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                flexDirection: isNiko ? 'row' : 'row-reverse',
              }}
            >
              {/* Avatar */}
              <div
                className="flex-shrink-0 rounded-full overflow-hidden"
                style={{
                  width: 56, height: 56,
                  border: `2px solid ${isNiko ? 'rgba(201,169,97,0.5)' : 'rgba(255,140,0,0.5)'}`,
                  boxShadow: `0 0 14px ${isNiko ? 'rgba(201,169,97,0.25)' : 'rgba(255,140,0,0.25)'}`,
                  backgroundColor: '#0D1F2D',
                  // Pulse ring when this line is actively playing
                  outline: i === visible && playing ? `2px solid ${isNiko ? '#C9A961' : '#FF8C00'}` : '2px solid transparent',
                  outlineOffset: 3,
                  transition: 'outline 0.3s ease',
                }}
              >
                <Image
                  src={isNiko ? '/niko/niko-1.jpg' : '/picasso/picasso-3.png'}
                  alt={isNiko ? 'Niko' : 'Picasso'}
                  width={56}
                  height={56}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Bubble */}
              <div
                className="relative max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed"
                style={{
                  backgroundColor: isNiko ? 'rgba(201,169,97,0.12)' : 'rgba(255,140,0,0.1)',
                  border: `1px solid ${isNiko ? 'rgba(201,169,97,0.25)' : 'rgba(255,140,0,0.25)'}`,
                  color: '#F7F5F0',
                  fontFamily: 'Inter, sans-serif',
                  borderBottomLeftRadius: isNiko ? 4 : 16,
                  borderBottomRightRadius: isNiko ? 16 : 4,
                }}
              >
                <span className="block text-[10px] font-bold uppercase tracking-widest mb-1"
                  style={{ color: isNiko ? '#C9A961' : '#FF8C00', opacity: 0.8 }}>
                  {isNiko ? 'Niko' : 'Picasso'}
                </span>
                {line.text}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
