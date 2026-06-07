'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const LINES = [
  { speaker: 'niko',    text: "Did you hear? Another landlord just listed on Bakersfield Rental Homes!" },
  { speaker: 'picasso', text: "Squawk! Smart human! No broker fees, no middlemen — just real tenants!" },
  { speaker: 'niko',    text: "Local landlords, local renters. Honestly the best decision they've made all year." },
  { speaker: 'picasso', text: "And if it doesn't work out… it WILL work out. Trust the bird!" },
  { speaker: 'niko',    text: "Welcome to the family. 🐾" },
]

export default function NikoPicassoChat() {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    if (visible >= LINES.length) return
    const t = setTimeout(() => setVisible(v => v + 1), visible === 0 ? 600 : 1800)
    return () => clearTimeout(t)
  }, [visible])

  return (
    <div
      className="py-10 px-6"
      style={{ background: 'linear-gradient(135deg, #0D1F2D 0%, #1C3D5A 100%)' }}
    >
      <p className="text-center text-xs font-semibold tracking-widest uppercase mb-8"
        style={{ color: '#C9A961', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
        A word from Niko &amp; Picasso
      </p>

      <div className="max-w-2xl mx-auto space-y-5">
        {LINES.map((line, i) => {
          const isNiko = line.speaker === 'niko'
          return (
            <div
              key={i}
              className="flex items-end gap-3 transition-all duration-500"
              style={{
                opacity: i < visible ? 1 : 0,
                transform: i < visible ? 'translateY(0)' : 'translateY(12px)',
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
