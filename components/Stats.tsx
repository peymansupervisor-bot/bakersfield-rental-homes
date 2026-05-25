'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  {
    value: '100%',
    label: 'Occupancy Rate',
    sub: 'Properties consistently tenanted',
  },
  {
    value: '24hr',
    label: 'Response Time',
    sub: 'Maintenance requests handled fast',
  },
  {
    value: 'Local',
    label: 'Contractor Network',
    sub: 'Bakersfield-based, licensed & insured',
  },
]

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-24 px-6 md:px-10"
      style={{ backgroundColor: '#1C3D5A' }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-xs font-semibold tracking-widest uppercase mb-16"
          style={{ color: '#C9A961', letterSpacing: '0.2em' }}
        >
          By the Numbers
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.15 }}
              className="flex flex-col items-center"
            >
              {/* Divider line on mobile */}
              {i > 0 && (
                <div
                  className="md:hidden w-px h-12 mb-12"
                  style={{ background: 'rgba(201,169,97,0.3)' }}
                />
              )}

              <p
                className="text-5xl md:text-6xl font-bold mb-3"
                style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  color: '#C9A961',
                  letterSpacing: '-0.03em',
                }}
              >
                {stat.value}
              </p>
              <p
                className="text-base font-semibold mb-2 tracking-wide"
                style={{ color: '#F7F5F0' }}
              >
                {stat.label}
              </p>
              <p
                className="text-sm font-light"
                style={{ color: '#F7F5F0', opacity: 0.55 }}
              >
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Vertical dividers desktop */}
        <div className="hidden md:flex absolute inset-0 pointer-events-none" aria-hidden>
          {/* These are visual only, handled by grid gap */}
        </div>
      </div>
    </section>
  )
}
