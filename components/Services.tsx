'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
        <path d="M16 4L4 14h4v14h8v-8h8v8h-4v2h6V14h4L16 4z" stroke="#2D7A4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Advertise Your Property',
    description: 'Landlords: post your Bakersfield rental directly to local tenants — completely free. No commissions, no agents, no middlemen — just your listing in front of real renters.',
    accent: '#2D7A4F',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
        <circle cx="13" cy="13" r="8" stroke="#1C3D5A" strokeWidth="2"/>
        <path d="M19 19l7 7" stroke="#1C3D5A" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Browse Homes for Rent',
    description: 'Tenants: search available homes across Bakersfield by price, bedrooms, zip code, and pet policy. Every listing comes straight from the owner — no broker fees, ever.',
    accent: '#1C3D5A',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
        <path d="M6 10h20M6 16h14M6 22h10" stroke="#C9A961" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'No Broker Fees',
    description: 'This is a direct-to-owner platform. Tenants never pay a finder\'s fee or broker commission. Landlords keep 100% of their rent — no agent cuts, no management fees.',
    accent: '#C9A961',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
        <path d="M16 4C16 4 8 10 8 18a8 8 0 0016 0c0-8-8-14-8-14z" stroke="#1C3D5A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 18v-6" stroke="#C9A961" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="16" cy="20" r="1.5" fill="#C9A961"/>
      </svg>
    ),
    title: 'Local & Community-Driven',
    description: 'Every listing on this platform is a real home in Bakersfield — owned by real people, not national corporations or faceless investment funds.',
    accent: '#1C3D5A',
  },
]

interface ServiceCms { title?: string; description?: string }
interface ServicesProps { services?: ServiceCms[] }

export default function Services({ services: cmsServices }: ServicesProps) {
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
      id="services"
      className="py-28 px-6 md:px-10"
      style={{ backgroundColor: '#F7F5F0' }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8" style={{ color: '#1C3D5A' }}>Why Use This Platform</h2>
        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-5 reveal-up ${inView ? 'in-view' : ''}`}>
          {/* Landlord button */}
          <Link
            href="/list"
            aria-label="I'm a Landlord — list your property"
            className="flex-1 group flex items-center justify-between gap-4 px-10 py-8 rounded-2xl transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A961]"
            style={{
              backgroundColor: '#1C3D5A',
              border: '1px solid rgba(201,169,97,0.25)',
              boxShadow: '0 4px 32px rgba(28,61,90,0.18)',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = '#163150'
              el.style.boxShadow = '0 8px 48px rgba(28,61,90,0.32)'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = '#1C3D5A'
              el.style.boxShadow = '0 4px 32px rgba(28,61,90,0.18)'
              el.style.transform = 'translateY(0)'
            }}
            onFocus={e => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = '#163150'
              el.style.boxShadow = '0 8px 48px rgba(28,61,90,0.32)'
              el.style.transform = 'translateY(-2px)'
            }}
            onBlur={e => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = '#1C3D5A'
              el.style.boxShadow = '0 4px 32px rgba(28,61,90,0.18)'
              el.style.transform = 'translateY(0)'
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#C9A961',
                  marginBottom: '6px',
                }}
              >
                I'm a
              </p>
              <p
                style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  fontWeight: 700,
                  color: '#F7F5F0',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                Landlord
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.82rem',
                  fontWeight: 300,
                  color: 'rgba(247,245,240,0.8)',
                  marginTop: '8px',
                  letterSpacing: '0.02em',
                }}
              >
                List your property
              </p>
            </div>
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C9A961"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ flexShrink: 0, transition: 'transform 0.3s ease' }}
              className="group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>

          {/* Tenant button */}
          <Link
            href="/listings"
            aria-label="I'm a Tenant — find a home"
            className="flex-1 group flex items-center justify-between gap-4 px-10 py-8 rounded-2xl transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C3D5A]"
            style={{
              backgroundColor: '#C9A961',
              border: '1px solid rgba(201,169,97,0.4)',
              boxShadow: '0 4px 32px rgba(201,169,97,0.22)',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = '#b8963f'
              el.style.boxShadow = '0 8px 48px rgba(201,169,97,0.38)'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = '#C9A961'
              el.style.boxShadow = '0 4px 32px rgba(201,169,97,0.22)'
              el.style.transform = 'translateY(0)'
            }}
            onFocus={e => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = '#b8963f'
              el.style.boxShadow = '0 8px 48px rgba(201,169,97,0.38)'
              el.style.transform = 'translateY(-2px)'
            }}
            onBlur={e => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = '#C9A961'
              el.style.boxShadow = '0 4px 32px rgba(201,169,97,0.22)'
              el.style.transform = 'translateY(0)'
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#1C3D5A',
                  marginBottom: '6px',
                }}
              >
                I'm a
              </p>
              <p
                style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  fontWeight: 700,
                  color: '#1C3D5A',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                Tenant
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.82rem',
                  fontWeight: 300,
                  color: '#1C3D5A',
                  marginTop: '8px',
                  letterSpacing: '0.02em',
                }}
              >
                Find a home
              </p>
            </div>
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1C3D5A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ flexShrink: 0, transition: 'transform 0.3s ease' }}
              className="group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {services.map((svc, i) => (
            <div
              key={svc.title}
              className={`group relative p-8 rounded-2xl cursor-default transition-all duration-300 reveal-up ${inView ? 'in-view' : ''}`}
              style={{
                backgroundColor: 'white',
                border: '1px solid rgba(201,169,97,0.15)',
                boxShadow: '0 2px 20px rgba(28,61,90,0.04)',
                animationDelay: inView ? `${0.1 + i * 0.12}s` : '0s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.boxShadow = '0 8px 40px rgba(201,169,97,0.18), 0 2px 20px rgba(28,61,90,0.06)'
                el.style.borderColor = 'rgba(201,169,97,0.4)'
                el.style.transform = 'scale(1.02)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.boxShadow = '0 2px 20px rgba(28,61,90,0.04)'
                el.style.borderColor = 'rgba(201,169,97,0.15)'
                el.style.transform = 'scale(1)'
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${svc.accent}12` }}
              >
                {svc.icon}
              </div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}
              >
                {cmsServices?.[i]?.title || svc.title}
              </h3>
              <p className="text-sm leading-relaxed font-light" style={{ color: '#555555' }}>
                {cmsServices?.[i]?.description || svc.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
