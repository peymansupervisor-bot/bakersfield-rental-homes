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

  // All pages have a dark hero by default — only listing detail pages (/listings/[slug]) have a light background
  const hasDarkHero = !(pathname.startsWith('/listings/') && pathname !== '/listings')

  const navBg     = scrolled || menuOpen ? 'rgba(247,245,240,0.95)' : 'transparent'
  const navBorder = scrolled || menuOpen ? '1px solid rgba(201,169,97,0.2)' : 'none'
  const textColor = scrolled || menuOpen ? '#1C3D5A' : hasDarkHero ? '#E8845A' : '#1C3D5A'
  const hamColor  = scrolled || menuOpen ? '#1C3D5A' : hasDarkHero ? '#E8845A' : '#1C3D5A'
  // Dark gold (#7d6019) on light navbar background meets WCAG AA (5.8:1); bright gold on dark hero also passes (4.99:1)
  const logoGoldColor = scrolled || menuOpen ? '#7d6019' : '#C9A961'

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
                  style={{ color: textColor, fontFamily: 'Inter, sans-serif' }}>Bakersfield</p>
                <p className="text-xs tracking-wider uppercase"
                  style={{ color: scrolled || menuOpen ? '#1C3D5A' : '#F7F5F0', fontFamily: 'Inter, sans-serif' }}>Brokers</p>
              </div>
            </Link>
          </div>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-7 list-none m-0 p-0">
            <li className="flex items-center gap-3">
              <Link href="/listings"
                className="text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-90 hover:underline underline-offset-4 decoration-2"
                style={{ color: textColor, letterSpacing: '0.15em' }}>Find a Home</Link>
              <Link href="/direct-landlord-rentals"
                aria-label="No broker fees — direct landlord rentals"
                className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full transition-all duration-300 hover:opacity-80"
                style={{ backgroundColor: '#1C3D5A', color: '#C9A961', letterSpacing: '0.1em', border: '1px solid rgba(201,169,97,0.3)' }}>
                No Fees
              </Link>
            </li>
            <li>
              <Link href="/vendors"
                className="text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-90 hover:underline underline-offset-4 decoration-2"
                style={{ color: textColor, letterSpacing: '0.15em' }}>Vendors</Link>
            </li>
            <li>
              <Link href="/community"
                className="text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-90 hover:underline underline-offset-4 decoration-2"
                style={{ color: textColor, letterSpacing: '0.15em' }}>Community</Link>
            </li>
            <li>
              <a href="/#contact" onClick={handleContact}
                className="text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-90 hover:underline underline-offset-4 decoration-2"
                style={{ color: textColor, letterSpacing: '0.15em' }}>Contact</a>
            </li>
            <li>
              <Link href="/list"
                className="text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: '#C9A961', color: '#1C3D5A', letterSpacing: '0.12em' }}>
                List Your Home
              </Link>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-11 h-11 rounded-full transition-all duration-200"
            style={{ backgroundColor: menuOpen ? 'rgba(201,169,97,0.15)' : 'transparent' }}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="block transition-all duration-300" style={{ width: 20, height: 2, backgroundColor: hamColor, borderRadius: 2, transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none', marginBottom: menuOpen ? 0 : 4 }} />
            <span className="block transition-all duration-300" style={{ width: 20, height: 2, backgroundColor: hamColor, borderRadius: 2, opacity: menuOpen ? 0 : 1, marginBottom: menuOpen ? 0 : 4 }} />
            <span className="block transition-all duration-300" style={{ width: 20, height: 2, backgroundColor: hamColor, borderRadius: 2, transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>

        {/* Mobile menu — CSS transition */}
        <div
          id="mobile-menu"
          className="lg:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? '400px' : '0',
            opacity: menuOpen ? 1 : 0,
            backgroundColor: 'rgba(247,245,240,0.97)',
            borderTop: menuOpen ? '1px solid rgba(201,169,97,0.15)' : 'none',
          }}
          aria-hidden={!menuOpen}
        >
          <nav className="flex flex-col px-6 py-6 gap-5" aria-label="Mobile navigation">
            <Link href="/listings" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}
              className="text-sm font-semibold tracking-widest uppercase py-2 border-b transition-colors duration-200 hover:text-[#C9A961]"
              style={{ color: '#1C3D5A', borderColor: 'rgba(201,169,97,0.15)', letterSpacing: '0.15em' }}>
              Find a Home
            </Link>
            <Link href="/direct-landlord-rentals" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}
              className="text-sm font-semibold tracking-widest uppercase py-2 border-b transition-colors duration-200 hover:text-[#C9A961]"
              style={{ color: '#1C3D5A', borderColor: 'rgba(201,169,97,0.15)', letterSpacing: '0.15em' }}>
              Direct Landlord Rentals
            </Link>
            <Link href="/neighborhoods" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}
              className="text-sm font-semibold tracking-widest uppercase py-2 border-b transition-colors duration-200 hover:text-[#C9A961]"
              style={{ color: '#1C3D5A', borderColor: 'rgba(201,169,97,0.15)', letterSpacing: '0.15em' }}>
              Neighborhoods
            </Link>
            <Link href="/vendors" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}
              className="text-sm font-semibold tracking-widest uppercase py-2 border-b transition-colors duration-200 hover:text-[#C9A961]"
              style={{ color: '#1C3D5A', borderColor: 'rgba(201,169,97,0.15)', letterSpacing: '0.15em' }}>
              Vendors
            </Link>
            <Link href="/community" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}
              className="text-sm font-semibold tracking-widest uppercase py-2 border-b transition-colors duration-200 hover:text-[#C9A961]"
              style={{ color: '#1C3D5A', borderColor: 'rgba(201,169,97,0.15)', letterSpacing: '0.15em' }}>
              Community
            </Link>
            <a href="/#contact" onClick={handleContact} tabIndex={menuOpen ? 0 : -1}
              className="text-sm font-semibold tracking-widest uppercase py-2 border-b transition-colors duration-200 hover:text-[#C9A961]"
              style={{ color: '#1C3D5A', borderColor: 'rgba(201,169,97,0.15)', letterSpacing: '0.15em' }}>
              Contact
            </a>
            <Link href="/list" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}
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
