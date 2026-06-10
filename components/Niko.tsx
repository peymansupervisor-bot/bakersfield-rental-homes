'use client'

import { useState } from 'react'
import Image from 'next/image'

const DEFAULT_PHOTOS = [
  { src: '/niko/niko-1.jpg', alt: 'Niko the dog relaxing in a fenced backyard at a pet-friendly Bakersfield rental home' },
  { src: '/niko/niko-2.jpg', alt: 'Niko lounging inside a well-maintained Bakersfield rental house' },
  { src: '/niko/niko-3.jpg', alt: 'Niko sitting on the front porch of a rental home in Bakersfield, CA' },
  { src: '/niko/niko-4.jpg', alt: 'Niko exploring a tree-lined Bakersfield neighborhood near rental properties' },
]

const DEFAULT_CARDS = [
  { icon: '🏡', title: 'Fenced Yards',        desc: 'Several of our homes feature fully fenced yards — perfect for pets to roam safely.' },
  { icon: '🐕', title: 'Pet-Friendly Listings', desc: 'Many homes on this site welcome pets. Filter by pet-friendly when you browse to find the right fit.' },
  { icon: '🌳', title: 'Great Neighborhoods', desc: 'Tree-lined streets and nearby parks make Bakersfield a wonderful place for dogs.' },
  { icon: '💛', title: 'Niko Approved',        desc: 'If Niko loves it, you will too. He\'s our unofficial seal of approval.' },
]

interface Photo { src: string; alt: string }
interface Card  { icon: string; title: string; desc: string }
interface NikoProps {
  headline?:    string
  description?: string
  photos?:      Photo[]
  cards?:       Card[]
}

export default function Niko({ headline, description, photos, cards }: NikoProps) {
  const displayPhotos = photos?.length ? photos : DEFAULT_PHOTOS
  const displayCards  = cards?.length  ? cards  : DEFAULT_CARDS
  const displayHeadline = headline || 'Meet Niko'
  const displayDesc = description || 'Our beloved companion and unofficial mascot. At Bakersfield Rental Homes, we know pets are family — many of our properties welcome them with open arms (and open yards).'

  const [active, setActive] = useState(0)

  const switchPhoto = (i: number) => { setActive(i) }

  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#F7F5F0' }} aria-label="Meet Niko — our pet-friendly mascot">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: '#1C3D5A', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
            Pet-Friendly Homes
          </p>
          <h2 className="text-4xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
            {displayHeadline}
          </h2>
          <p className="text-sm font-light max-w-xl mx-auto leading-relaxed"
            style={{ color: '#666', fontFamily: 'Inter, sans-serif' }}>
            {displayDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-3xl overflow-hidden"
            style={{ aspectRatio: '4/5', boxShadow: '0 24px 64px rgba(28,61,90,0.18)', border: '1px solid rgba(201,169,97,0.2)' }}>
            {displayPhotos.map((p, i) => (
              <Image key={p.src} src={p.src} alt={p.alt}
                fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover"
                loading="lazy"
                style={{ opacity: active === i ? 1 : 0, transition: 'opacity 0.3s ease' }} />
            ))}
            <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ backgroundColor: 'rgba(201,169,97,0.92)', color: '#1C3D5A', backdropFilter: 'blur(6px)', letterSpacing: '0.08em' }}>
              <span aria-hidden="true">🐾 </span>Pets Welcome
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-4 gap-3">
              {displayPhotos.map((p, i) => (
                <button key={i} onClick={() => switchPhoto(i)} aria-label={`View photo ${i + 1} of Niko`} aria-pressed={active === i}
                  className="relative rounded-xl overflow-hidden transition-all duration-300 min-h-[44px]"
                  style={{ aspectRatio: '1/1', outline: active === i ? '2.5px solid #C9A961' : '2.5px solid transparent', outlineOffset: '2px', opacity: active === i ? 1 : 0.65, transform: active === i ? 'scale(1.05)' : 'scale(1)' }}>
                  <Image src={p.src} alt={p.alt} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {displayCards.map((card) => (
                <div key={card.title} className="p-4 rounded-2xl"
                  style={{ backgroundColor: 'white', border: '1px solid rgba(201,169,97,0.15)', boxShadow: '0 2px 12px rgba(28,61,90,0.06)' }}>
                  <div className="text-2xl mb-2" aria-hidden="true">{card.icon}</div>
                  <h3 className="font-semibold text-sm mb-1"
                    style={{ color: '#1C3D5A', fontFamily: 'Playfair Display, Georgia, serif' }}>
                    {card.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#5a5a5a' }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
