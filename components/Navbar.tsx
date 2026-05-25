'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        backgroundColor: scrolled ? 'rgba(247,245,240,0.85)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(201,169,97,0.2)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          {/* SVG wordmark fallback — replace with <Image src="/logo.svg"> when ready */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#C9A961' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L14 6V14H10V10H6V14H2V6L8 2Z" fill="#1C3D5A" />
              </svg>
            </div>
            <div className="leading-none">
              <p
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: '#1C3D5A', fontFamily: 'Inter, sans-serif' }}
              >
                Bakersfield
              </p>
              <p
                className="text-xs tracking-wider uppercase"
                style={{ color: '#C9A961', fontFamily: 'Inter, sans-serif' }}
              >
                Rental Homes
              </p>
            </div>
          </div>
        </a>

        {/* Contact link */}
        <a
          href="#contact"
          onClick={scrollToContact}
          className="text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-70"
          style={{ color: '#1C3D5A', letterSpacing: '0.15em' }}
        >
          Contact
        </a>
      </div>
    </motion.nav>
  )
}
