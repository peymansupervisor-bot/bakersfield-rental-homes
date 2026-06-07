'use client'

import { useState } from 'react'
import Image from 'next/image'

const PHOTOS = [
  { src: '/picasso/picasso-1.png', alt: 'Picasso the sun conure perched indoors in a bright Bakersfield home' },
  { src: '/picasso/picasso-2.png', alt: 'Picasso the sun conure outside enjoying a sunny Bakersfield backyard' },
  { src: '/picasso/picasso-3.png', alt: 'Picasso the sun conure — vibrant close-up portrait' },
]

const CARDS = [
  { icon: '🌴', title: 'Vibrant Living',      desc: 'Life in Bakersfield is full of color — just ask Picasso. Sunny skies and warm days make every home feel like a retreat.' },
  { icon: '🏡', title: 'Pet-Friendly Spaces', desc: 'Feathered friends are family too. Many of our homes offer bright, open layouts perfect for bird owners.' },
  { icon: '☀️', title: '300 Days of Sun',     desc: 'Bakersfield\'s golden sunshine keeps every home warm and radiant — a paradise for sun-loving companions.' },
  { icon: '🎨', title: 'Picasso Approved',    desc: 'If Picasso loves it, it\'s exceptional. He\'s our exotic stamp of approval on every property we manage.' },
]

export default function Picasso() {
  const [active, setActive] = useState(0)

  return (
    <section
      className="py-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: '#0D1F2D' }}
      aria-label="Meet Picasso — our exotic sun conure mascot"
    >
      {/* Decorative tropical gradient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(220,100,20,0.18) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 15% 30%, rgba(255,180,0,0.10) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: '#E8A030', letterSpacing: '0.22em', fontFamily: 'Inter, sans-serif' }}
          >
            Exotic Bakersfield Living
          </p>
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#FFF8EE' }}
          >
            Meet Picasso
          </h2>
          <p
            className="text-sm font-light max-w-xl mx-auto leading-relaxed"
            style={{ color: '#B0A898', fontFamily: 'Inter, sans-serif' }}
          >
            A sun conure with 5 years of Bakersfield wisdom. Picasso brings vivid color and joy to every home he visits — and he reminds us that the best spaces feel alive, warm, and full of personality.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Photo display */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              aspectRatio: '4/5',
              boxShadow: '0 30px 80px rgba(220,100,20,0.35), 0 0 0 1px rgba(232,160,48,0.2)',
            }}
          >
            {PHOTOS.map((p, i) => (
              <Image
                key={p.src}
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
                style={{ opacity: active === i ? 1 : 0, transition: 'opacity 0.4s ease' }}
              />
            ))}
            {/* Badge */}
            <div
              className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'linear-gradient(135deg, rgba(220,100,20,0.92), rgba(255,180,0,0.92))',
                color: '#0D1F2D',
                backdropFilter: 'blur(8px)',
                letterSpacing: '0.08em',
                boxShadow: '0 4px 16px rgba(220,100,20,0.4)',
              }}
            >
              <span aria-hidden="true">🦜 </span>Picasso's Pick
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-8">
            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {PHOTOS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`View photo ${i + 1} of Picasso`}
                  aria-pressed={active === i}
                  className="relative rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    aspectRatio: '1/1',
                    outline: active === i ? '2.5px solid #E8A030' : '2.5px solid rgba(232,160,48,0.2)',
                    outlineOffset: '2px',
                    opacity: active === i ? 1 : 0.55,
                    transform: active === i ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: active === i ? '0 8px 24px rgba(220,100,20,0.4)' : 'none',
                  }}
                >
                  <Image src={p.src} alt={p.alt} fill sizes="120px" className="object-cover" />
                </button>
              ))}
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CARDS.map((card) => (
                <div
                  key={card.title}
                  className="p-4 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                    border: '1px solid rgba(232,160,48,0.18)',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.25)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <div className="text-2xl mb-2" aria-hidden="true">{card.icon}</div>
                  <h3
                    className="font-semibold text-sm mb-1"
                    style={{ color: '#FFF8EE', fontFamily: 'Playfair Display, Georgia, serif' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#8A9BAA' }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <blockquote
              className="text-sm italic leading-relaxed pl-4"
              style={{
                borderLeft: '3px solid #E8A030',
                color: '#B0A898',
                fontFamily: 'Playfair Display, Georgia, serif',
              }}
            >
              "A home worth living in should feel as vibrant as Picasso's feathers — warm, alive, and impossible to forget."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
