'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const pathname = usePathname()
  const router   = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(false)
    if (pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/#contact')
    }
  }

  const navBg     = scrolled || menuOpen ? 'rgba(247,245,240,0.95)' : 'transparent'
  const navBorder = scrolled || menuOpen ? '1px solid rgba(201,169,97,0.2)' : 'none'

  return (
    <>
      <nav
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
          backgroundColor: navBg,
          borderBottom: navBorder,
          // Subtle slide-in via CSS on mount
          animation: 'fadeSlideInUp 0.6s ease both',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group" aria-label="Bakersfield Rental Homes — home">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#C9A961' }} aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 2L14 6V14H10V10H6V14H2V6L8 2Z" fill="#1C3D5A" />
                </svg>
              </div>
              <div className="leading-none" aria-hidden="true">
                <p className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: '#1C3D5A', fontFamily: 'Inter, sans-serif' }}>Bakersfield</p>
                <p className="text-xs tracking-wider uppercase"
                  style={{ color: '#C9A961', fontFamily: 'Inter, sans-serif' }}>Rental Homes</p>
              </div>
            </Link>
            <a href="tel:+16613811818"
              className="hidden sm:flex items-center gap-1 text-xs font-semibold transition-all hover:opacity-70"
              style={{ color: '#1C3D5A', fontFamily: 'Inter, sans-serif' }}
              aria-label="Call us at (661) 381-1818">
              <span style={{ color: '#C9A961' }}>📞</span> (661) 381-1818
            </a>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5" role="list">
            <Link href="/listings" role="listitem"
              className="text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-70"
              style={{ color: '#1C3D5A', letterSpacing: '0.15em' }}>Find a Home</Link>
            <Link href="/vendors" role="listitem"
              className="text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-70"
              style={{ color: '#1C3D5A', letterSpacing: '0.15em' }}>Vendors</Link>
            <Link href="/community" role="listitem"
              className="text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-70"
              style={{ color: '#1C3D5A', letterSpacing: '0.15em' }}>Community</Link>
            <a href="/#contact" role="listitem" onClick={handleContact}
              className="text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-70"
              style={{ color: '#1C3D5A', letterSpacing: '0.15em' }}>Contact</a>
            <Link href="/list" role="listitem"
              className="text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: '#C9A961', color: '#1C3D5A', letterSpacing: '0.12em' }}>
              List Your Home
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full transition-all duration-200"
            style={{ backgroundColor: menuOpen ? 'rgba(201,169,97,0.15)' : 'transparent' }}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="block transition-all duration-300" style={{ width: 20, height: 2, backgroundColor: '#1C3D5A', borderRadius: 2, transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none', marginBottom: menuOpen ? 0 : 4 }} />
            <span className="block transition-all duration-300" style={{ width: 20, height: 2, backgroundColor: '#1C3D5A', borderRadius: 2, opacity: menuOpen ? 0 : 1, marginBottom: menuOpen ? 0 : 4 }} />
            <span className="block transition-all duration-300" style={{ width: 20, height: 2, backgroundColor: '#1C3D5A', borderRadius: 2, transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>

        {/* Mobile menu — CSS transition */}
        <div
          id="mobile-menu"
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? '400px' : '0',
            opacity: menuOpen ? 1 : 0,
            backgroundColor: 'rgba(247,245,240,0.97)',
            borderTop: menuOpen ? '1px solid rgba(201,169,97,0.15)' : 'none',
          }}
          aria-hidden={!menuOpen}
        >
          <nav className="flex flex-col px-6 py-6 gap-5" aria-label="Mobile navigation">
            <Link href="/listings" onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold tracking-widest uppercase py-2 border-b transition-colors duration-200 hover:text-[#C9A961]"
              style={{ color: '#1C3D5A', borderColor: 'rgba(201,169,97,0.15)', letterSpacing: '0.15em' }}>
              Find a Home
            </Link>
            <Link href="/vendors" onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold tracking-widest uppercase py-2 border-b transition-colors duration-200 hover:text-[#C9A961]"
              style={{ color: '#1C3D5A', borderColor: 'rgba(201,169,97,0.15)', letterSpacing: '0.15em' }}>
              Vendors
            </Link>
            <Link href="/community" onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold tracking-widest uppercase py-2 border-b transition-colors duration-200 hover:text-[#C9A961]"
              style={{ color: '#1C3D5A', borderColor: 'rgba(201,169,97,0.15)', letterSpacing: '0.15em' }}>
              Community
            </Link>
            <a href="/#contact" onClick={handleContact}
              className="text-sm font-semibold tracking-widest uppercase py-2 border-b transition-colors duration-200 hover:text-[#C9A961]"
              style={{ color: '#1C3D5A', borderColor: 'rgba(201,169,97,0.15)', letterSpacing: '0.15em' }}>
              Contact
            </a>
            <Link href="/list" onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold tracking-widest uppercase px-5 py-3 rounded-full text-center transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: '#C9A961', color: '#1C3D5A', letterSpacing: '0.12em' }}>
              List Your Home
            </Link>
          </nav>
        </div>
      </nav>
    </>
  )
}
