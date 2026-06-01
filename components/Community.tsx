'use client'

import { useEffect, useRef, useState } from 'react'

const DEFAULT_HEADLINE = 'Thousands of Bakersfield\nRenters Trust This Group.'
const DEFAULT_DESCRIPTION = 'Our Facebook community is where Bakersfield tenants and investors ask real questions, share honest experiences, and find homes that are actually taken care of. No ads. No spam. Just people who know this city.'
const DEFAULT_FB_URL = 'https://www.facebook.com/groups/376465349735154'

interface CommunityProps {
  headline?: string
  description?: string
  facebookUrl?: string
}

export default function Community({ headline, description, facebookUrl }: CommunityProps) {
  const displayHeadline = headline || DEFAULT_HEADLINE
  const displayDesc = description || DEFAULT_DESCRIPTION
  const fbUrl = facebookUrl || DEFAULT_FB_URL

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
    <section
      ref={ref}
      aria-labelledby="community-heading"
      className="py-28 px-6 md:px-10 relative overflow-hidden"
      style={{ backgroundColor: '#1C3D5A' }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,169,97,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(201,169,97,0.06) 0%, transparent 60%)' }} />

      <div className="max-w-5xl mx-auto relative">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className={`flex-1 text-center md:text-left reveal-left ${inView ? 'in-view' : ''}`}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#C9A961', letterSpacing: '0.2em' }}>
              Join the Conversation
            </p>
            <h2 id="community-heading" className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              {displayHeadline.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
            <p className="text-base md:text-lg font-light mb-8 max-w-lg"
              style={{ color: 'rgba(247,245,240,0.7)', lineHeight: 1.75 }}>
              {displayDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href={fbUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: '#C9A961', color: '#1C3D5A', fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em', textDecoration: 'none' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Join the Facebook Group
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-white/10"
                style={{ border: '1px solid rgba(247,245,240,0.3)', color: '#F7F5F0', fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em', textDecoration: 'none' }}>
                Talk to Us Directly
              </a>
            </div>
          </div>

          <div className={`flex flex-col gap-5 w-full md:w-64 reveal-right ${inView ? 'in-view' : ''}`}>
            {[
              { value: '11.9K+', label: 'Active Members', desc: 'Bakersfield tenants & owners' },
              { value: 'Daily',  label: 'New Posts',      desc: 'Real questions, real answers' },
              { value: '100%',   label: 'Local',          desc: 'Only Bakersfield — no noise' },
            ].map((item, i) => (
              <div key={item.label} className={`reveal-up ${inView ? 'in-view' : ''} p-5 rounded-2xl`}
                style={{ backgroundColor: 'rgba(247,245,240,0.07)', border: '1px solid rgba(201,169,97,0.2)', animationDelay: inView ? `${0.2 + i * 0.1}s` : '0s' }}>
                <p className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#C9A961' }}>{item.value}</p>
                <p className="text-sm font-semibold mb-0.5" style={{ color: '#F7F5F0' }}>{item.label}</p>
                <p className="text-xs font-light" style={{ color: 'rgba(247,245,240,0.7)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
