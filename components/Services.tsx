'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 28C8 28 6 20 10 14C14 8 16 6 16 6C16 6 18 8 22 14C26 20 24 28 24 28" stroke="#2D7A4F" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 6V28" stroke="#2D7A4F" strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="16" cy="14" rx="4" ry="3" fill="#2D7A4F" opacity="0.3"/>
      </svg>
    ),
    title: 'Professional Gardening',
    description: 'Weekly lawn care, seasonal planting, hedge trimming and irrigation management — your property stays immaculate year-round.',
    accent: '#2D7A4F',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <ellipse cx="16" cy="20" rx="10" ry="5" stroke="#1C3D5A" strokeWidth="2"/>
        <path d="M6 20C6 20 6 12 16 12C26 12 26 20 26 20" stroke="#1C3D5A" strokeWidth="2"/>
        <path d="M13 16C13 16 15 18 16 18C17 18 19 16 19 16" stroke="#C9A961" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Pool Maintenance',
    description: 'Chemical balancing, cleaning, equipment checks and seasonal prep — your pool stays sparkling for tenants and inspections alike.',
    accent: '#1C3D5A',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="8" y="10" width="16" height="12" rx="2" stroke="#C9A961" strokeWidth="2"/>
        <path d="M12 10V8C12 6.89 12.89 6 14 6H18C19.11 6 20 6.89 20 8V10" stroke="#C9A961" strokeWidth="2"/>
        <path d="M8 16H24" stroke="#C9A961" strokeWidth="2"/>
        <circle cx="16" cy="16" r="2" fill="#C9A961"/>
        <path d="M16 22V26M12 26H20" stroke="#C9A961" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'HVAC Service',
    description: 'Filter changes, seasonal tune-ups, emergency repairs and system inspections — keeping your tenants comfortable and your systems efficient.',
    accent: '#C9A961',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M10 22L20 12" stroke="#1C3D5A" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M18 10L22 14L20 12" stroke="#1C3D5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="22" r="3" fill="#C9A961" opacity="0.6"/>
        <path d="M6 26L9 23" stroke="#1C3D5A" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Licensed Handyman',
    description: 'Plumbing fixes, electrical checks, paint touch-ups, carpentry and general repairs — no job too small, always licensed and insured.',
    accent: '#1C3D5A',
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="services"
      className="py-28 px-6 md:px-10"
      style={{ backgroundColor: '#F7F5F0' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#C9A961', letterSpacing: '0.2em' }}
          >
            Our Local Team
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              color: '#1C3D5A',
              letterSpacing: '-0.02em',
            }}
          >
            Bakersfield's Best,<br />On Your Property.
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto font-light" style={{ color: '#2B2B2B', opacity: 0.7 }}>
            A handpicked network of licensed local contractors — available, reliable, and accountable to you.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 + i * 0.12 }}
              whileHover={{ scale: 1.02 }}
              className="group relative p-8 rounded-2xl cursor-default transition-all duration-300"
              style={{
                backgroundColor: 'white',
                border: '1px solid rgba(201,169,97,0.15)',
                boxShadow: '0 2px 20px rgba(28,61,90,0.04)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.boxShadow = `0 8px 40px rgba(201,169,97,0.18), 0 2px 20px rgba(28,61,90,0.06)`
                el.style.borderColor = 'rgba(201,169,97,0.4)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.boxShadow = '0 2px 20px rgba(28,61,90,0.04)'
                el.style.borderColor = 'rgba(201,169,97,0.15)'
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${svc.accent}12` }}
              >
                {svc.icon}
              </div>

              {/* Title */}
              <h3
                className="text-xl font-semibold mb-3"
                style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  color: '#1C3D5A',
                }}
              >
                {svc.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed font-light" style={{ color: '#2B2B2B', opacity: 0.75 }}>
                {svc.description}
              </p>

              {/* Gold accent bar */}
              <div
                className="absolute bottom-0 left-8 right-8 h-px transition-all duration-300"
                style={{
                  background: 'linear-gradient(to right, transparent, #C9A961, transparent)',
                  opacity: 0,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
