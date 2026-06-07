'use client'

import { useEffect, useRef, useState } from 'react'

const DEFAULT_STATS = [
  { value: '$1',   label: 'To List',      sub: 'Post your rental for just $1 — no commissions' },
  { value: '0%',   label: 'Broker Fees',  sub: 'Tenants pay no finder\'s fees, ever' },
  { value: '100%', label: 'Local Owners', sub: 'Every listing comes directly from the landlord' },
]

interface StatItem { value: string; label: string; sub: string }
interface StatsProps { stats?: StatItem[] }

export default function Stats({ stats }: StatsProps) {
  const items = stats?.length ? stats : DEFAULT_STATS
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { rootMargin: '-80px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} aria-label="Performance statistics" className="py-24 px-6 md:px-10" style={{ backgroundColor: '#1C3D5A' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className={`text-center text-xs font-semibold tracking-widest uppercase mb-16 reveal-up ${inView ? 'in-view' : ''}`}
          style={{ color: '#C9A961', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}
        >
          What the Results Look Like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 text-center">
          {items.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center reveal-up ${inView ? 'in-view' : ''}`}
              style={{ animationDelay: inView ? `${i * 0.15}s` : '0s' }}
            >
              {i > 0 && (
                <div className="md:hidden w-px h-12 mb-12" style={{ background: 'rgba(201,169,97,0.3)' }} />
              )}
              <p className="text-5xl md:text-6xl font-bold mb-3"
                style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#C9A961', letterSpacing: '-0.03em' }}>
                {stat.value}
              </p>
              <p className="text-base font-semibold mb-2 tracking-wide" style={{ color: '#F7F5F0' }}>
                {stat.label}
              </p>
              <p className="text-sm font-light" style={{ color: '#F7F5F0', opacity: 0.7 }}>
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
