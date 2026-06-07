'use client'

import { useEffect, useRef, useState } from 'react'

export default function Subscribe() {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone }),
      })
      if (!res.ok) throw new Error()
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#F7F5F0',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section
      ref={ref}
      aria-label="Stay notified about new rental listings"
      className="py-24 px-6 md:px-10"
      style={{ backgroundColor: '#0f2538' }}
    >
      <div className="max-w-xl mx-auto text-center">
        <div className={`reveal-up ${inView ? 'in-view' : ''}`}>
          <p className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#C9A961', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
            New Listings
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0', letterSpacing: '-0.02em' }}>
            Be the First to Know
          </h2>
          <p className="text-sm font-light mb-10"
            style={{ color: 'rgba(247,245,240,0.82)', fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}>
            Get notified the moment a new rental home becomes available in Bakersfield.
            No spam — just listings.
          </p>
        </div>

        {done ? (
          <div
            role="status"
            aria-live="polite"
            className={`py-10 reveal-up ${inView ? 'in-view' : ''}`}
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'rgba(45,122,79,0.15)' }} aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true" focusable="false">
                <path d="M6 14L11 19L22 9" stroke="#2D7A4F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-xl font-semibold mb-1"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
              You're on the list
            </p>
            <p className="text-sm" style={{ color: 'rgba(247,245,240,0.55)' }}>
              We'll reach out as soon as something new comes available.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={`flex flex-col gap-3 reveal-up ${inView ? 'in-view' : ''}`}
            style={{ animationDelay: inView ? '0.15s' : '0s' }}
            aria-label="New listing notification sign-up"
            aria-describedby={error ? 'subscribe-error' : undefined}
            noValidate
          >
            <div>
              <label htmlFor="sub-email" className="sr-only">Email address</label>
              <input
                id="sub-email"
                type="email"
                name="email"
                placeholder="Email address"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#C9A961')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
              />
            </div>
            <div>
              <label htmlFor="sub-phone" className="sr-only">Phone number (optional, for SMS alerts)</label>
              <input
                id="sub-phone"
                type="tel"
                name="phone"
                placeholder="Phone number (optional — for SMS alerts)"
                autoComplete="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#C9A961')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
              />
            </div>
            {error && (
              <p id="subscribe-error" role="alert" className="text-sm" style={{ color: '#e57373' }}>{error}</p>
            )}
            <button
              type="submit"
              disabled={sending}
              className="w-full py-4 rounded-xl font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-90 hover:scale-[1.01]"
              style={{
                backgroundColor: '#C9A961',
                color: '#1C3D5A',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.12em',
                border: 'none',
                cursor: sending ? 'not-allowed' : 'pointer',
                opacity: sending ? 0.7 : 1,
                marginTop: '4px',
              }}
            >
              {sending ? 'Signing up…' : 'Notify Me'}
            </button>
            <p className="text-xs" style={{ color: 'rgba(247,245,240,0.65)', fontFamily: 'Inter, sans-serif' }}>
              No spam. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
