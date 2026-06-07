'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const LINES = [
  { speaker: 'niko',    text: "Did you hear? Another landlord just listed on Bakersfield Rental Homes!" },
  { speaker: 'picasso', text: "Squawk! Smart human! No broker fees, no middlemen — just real tenants!" },
  { speaker: 'niko',    text: "Local landlords, local renters. Honestly the best decision they've made all year." },
  { speaker: 'picasso', text: "And if it doesn't work out… it WILL work out. Trust the bird!" },
  { speaker: 'niko',    text: "Welcome to the family." },
]

function speak(text: string, isNiko: boolean) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(text)
  // Pick a voice if available, fall back to defaults
  const voices = window.speechSynthesis.getVoices()
  if (isNiko) {
    utt.voice = voices.find(v => v.name.includes('Daniel') || v.name.includes('Alex') || v.name.includes('Google UK English Male')) ?? null
    utt.pitch = 0.85
    utt.rate = 0.95
  } else {
    utt.voice = voices.find(v => v.name.includes('Samantha') || v.name.includes('Google US English') || v.name.includes('Karen')) ?? null
    utt.pitch = 1.6
    utt.rate = 1.1
  }
  utt.volume = 1
  window.speechSynthesis.speak(utt)
}

export default function NikoPicassoChat() {
  const [started, setStarted] = useState(false)
  const [visible, setVisible] = useState(0)
  const indexRef = useRef(0)

  useEffect(() => {
    if (!started) return
    const line = LINES[indexRef.current]
    if (!line) return

    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()

    const voices = window.speechSynthesis.getVoices()
    const isNiko = line.speaker === 'niko'
    const utt = new SpeechSynthesisUtterance(line.text)
    if (isNiko) {
      utt.voice = voices.find(v => v.name.includes('Daniel') || v.name.includes('Alex') || v.name.includes('Google UK English Male')) ?? null
      utt.pitch = 0.85
      utt.rate = 0.95
    } else {
      utt.voice = voices.find(v => v.name.includes('Samantha') || v.name.includes('Google US English') || v.name.includes('Karen')) ?? null
      utt.pitch = 1.6
      utt.rate = 1.1
    }
    utt.volume = 1

    const advance = () => {
      indexRef.current += 1
      if (indexRef.current < LINES.length) setVisible(indexRef.current)
    }

    utt.onend = advance

    // Fallback in case onend doesn't fire (some browsers)
    const avgMs = line.text.length * 70
    const fallback = setTimeout(advance, avgMs + 500)

    utt.onend = () => { clearTimeout(fallback); advance() }

    window.speechSynthesis.speak(utt)

    return () => { clearTimeout(fallback); window.speechSynthesis.cancel() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, started])

  function handleStart() {
    // Voices may not be loaded yet — wait for them
    const go = () => { setStarted(true); setVisible(0); indexRef.current = 0 }
    if (window.speechSynthesis.getVoices().length > 0) { go() }
    else { window.speechSynthesis.onvoiceschanged = go }
  }

  return (
    <div
      className="py-10 px-6"
      style={{ background: 'linear-gradient(135deg, #0D1F2D 0%, #1C3D5A 100%)' }}
    >
      <div className="flex items-center justify-center gap-4 mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: '#C9A961', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
          A word from Niko &amp; Picasso
        </p>
        {!started ? (
          <button
            onClick={handleStart}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#C9A961', color: '#0D1F2D', fontFamily: 'Inter, sans-serif' }}
          >
            ▶ Play
          </button>
        ) : (
          <button
            onClick={() => { window.speechSynthesis.cancel(); setStarted(false); setVisible(0); indexRef.current = 0 }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-opacity hover:opacity-80"
            style={{ backgroundColor: 'rgba(201,169,97,0.15)', color: '#C9A961', border: '1px solid rgba(201,169,97,0.3)', fontFamily: 'Inter, sans-serif' }}
          >
            ↺ Replay
          </button>
        )}
      </div>

      <div className="max-w-2xl mx-auto space-y-5">
        {LINES.map((line, i) => {
          const isNiko = line.speaker === 'niko'
          const show = started && i <= visible
          return (
            <div
              key={i}
              className="flex items-end gap-3 transition-all duration-500"
              style={{
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(12px)',
                flexDirection: isNiko ? 'row' : 'row-reverse',
              }}
            >
              {/* Avatar */}
              <div
                className="flex-shrink-0 rounded-full overflow-hidden"
                style={{
                  width: 56, height: 56,
                  border: `2px solid ${isNiko ? 'rgba(201,169,97,0.5)' : 'rgba(255,140,0,0.5)'}`,
                  boxShadow: `0 0 12px ${isNiko ? 'rgba(201,169,97,0.2)' : 'rgba(255,140,0,0.2)'}`,
                  backgroundColor: '#0D1F2D',
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
