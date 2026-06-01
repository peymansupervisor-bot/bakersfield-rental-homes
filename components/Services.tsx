'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
        <path d="M8 28C8 28 6 20 10 14C14 8 16 6 16 6C16 6 18 8 22 14C26 20 24 28 24 28" stroke="#2D7A4F" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 6V28" stroke="#2D7A4F" strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="16" cy="14" rx="4" ry="3" fill="#2D7A4F" opacity="0.3"/>
      </svg>
    ),
    title: 'Professional Gardening',
    description: 'An unkept yard is the first thing a tenant notices — and the first reason they leave. Weekly care, seasonal upkeep, and irrigation management keep your curb appeal and your tenants.',
    accent: '#2D7A4F',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
        <ellipse cx="16" cy="20" rx="10" ry="5" stroke="#1C3D5A" strokeWidth="2"/>
        <path d="M6 20C6 20 6 12 16 12C26 12 26 20 26 20" stroke="#1C3D5A" strokeWidth="2"/>
        <path d="M13 16C13 16 15 18 16 18C17 18 19 16 19 16" stroke="#C9A961" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Pool Maintenance',
    description: "A green pool ends a lease fast. Chemical balancing, routine cleaning, and equipment checks mean your tenants enjoy it — and your liability doesn't.",
    accent: '#1C3D5A',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
        <rect x="8" y="10" width="16" height="12" rx="2" stroke="#C9A961" strokeWidth="2"/>
        <path d="M12 10V8C12 6.89 12.89 6 14 6H18C19.11 6 20 6.89 20 8V10" stroke="#C9A961" strokeWidth="2"/>
        <path d="M8 16H24" stroke="#C9A961" strokeWidth="2"/>
        <circle cx="16" cy="16" r="2" fill="#C9A961"/>
        <path d="M16 22V26M12 26H20" stroke="#C9A961" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'HVAC Service',
    description: 'Nothing drives a tenant out faster than a broken AC in a Bakersfield summer. Regular tune-ups, filter changes, and same-day emergency calls keep your tenants comfortable — and renewing.',
    accent: '#C9A961',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
        <path d="M10 22L20 12" stroke="#1C3D5A" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M18 10L22 14L20 12" stroke="#1C3D5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="22" r="3" fill="#C9A961" opacity="0.6"/>
        <path d="M6 26L9 23" stroke="#1C3D5A" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Licensed Handyman',
    description: 'Small repairs ignored become big reasons to leave. Leaky faucet, broken door, scuffed walls — we handle it before your tenant starts looking elsewhere. Licensed, insured, and actually available.',
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
        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-5 reveal-up ${inView ? 'in-view' : ''}`}>
          {/* Landlord button */}
          <Link
            href="/list"
            className="flex-1 group flex items-center justify-between gap-4 px-10 py-8 rounded-2xl transition-all duration-300"
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
            className="flex-1 group flex items-center justify-between gap-4 px-10 py-8 rounded-2xl transition-all duration-300"
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
                  color: 'rgba(28,61,90,0.8)',
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
              <p className="text-sm leading-relaxed font-light" style={{ color: '#2B2B2B', opacity: 0.75 }}>
                {cmsServices?.[i]?.description || svc.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
