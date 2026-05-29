'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: '100%', label: 'Occupied',    sub: 'No vacancy, no lost income — ever' },
  { value: '24hr', label: 'We Answer',   sub: 'Tenants call, we respond — same day' },
  { value: '3yr+', label: 'Avg. Tenancy',sub: 'Good management keeps good tenants' },
]

export default function Stats() {
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
    <section ref={ref} className="py-24 px-6 md:px-10" style={{ backgroundColor: '#1C3D5A' }}>
      <div className="max-w-5xl mx-auto">
        <p
          className={`text-center text-xs font-semibold tracking-widest uppercase mb-16 reveal-up ${inView ? 'in-view' : ''}`}
          style={{ color: '#C9A961', letterSpacing: '0.2em' }}
        >
          What the Results Look Like
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 text-center">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center reveal-up ${inView ? 'in-view' : ''}`}
              style={{ animationDelay: inView ? `${i * 0.15}s` : '0s' }}
            >
              {i > 0 && (
                <div className="md:hidden w-px h-12 mb-12"
                  style={{ background: 'rgba(201,169,97,0.3)' }} />
              )}
              <p className="text-5xl md:text-6xl font-bold mb-3"
                style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#C9A961', letterSpacing: '-0.03em' }}>
                {stat.value}
              </p>
              <p className="text-base font-semibold mb-2 tracking-wide" style={{ color: '#F7F5F0' }}>
                {stat.label}
              </p>
              <p className="text-sm font-light" style={{ color: '#F7F5F0', opacity: 0.55 }}>
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
