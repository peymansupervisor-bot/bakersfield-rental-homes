'use client'

import { useEffect, useRef, useState } from 'react'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent('Property Inquiry — Bakersfield Rental Homes')
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)
    window.location.href = `mailto:peymansupervisor@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  const inputBase = {
    width: '100%',
    padding: '14px 18px',
    borderRadius: '10px',
    border: '1px solid rgba(28,61,90,0.15)',
    backgroundColor: 'white',
    color: '#2B2B2B',
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section
      ref={ref}
      id="contact"
      aria-labelledby="contact-heading"
      className="py-28 px-6 md:px-10"
      style={{ backgroundColor: '#F7F5F0' }}
    >
      <div className="max-w-xl mx-auto">
        <div className={`text-center mb-12 reveal-up ${inView ? 'in-view' : ''}`}>
          <p className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#C9A961', letterSpacing: '0.2em' }} aria-hidden="true">
            Looking for a Home or Managing One?
          </p>
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold mb-5"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A', letterSpacing: '-0.02em' }}>
            Let's Make It<br />Simple from Here.
          </h2>
          <p className="text-base font-light" style={{ color: '#2B2B2B', opacity: 0.7 }}>
            Whether you're a tenant looking for a home that's actually taken care of, or an investor who's tired of managing from a distance — we handle it. Tell us where you are and we'll take it from there.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-16 card-animate" role="status" aria-live="polite">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: 'rgba(45,122,79,0.1)' }} aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" focusable="false">
                <path d="M6 14L11 19L22 9" stroke="#2D7A4F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Message Received
            </h3>
            <p className="text-sm font-light" style={{ color: '#2B2B2B', opacity: 0.7 }}>
              We'll be in touch within 24 hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={`flex flex-col gap-4 reveal-up ${inView ? 'in-view' : ''}`}
            style={{ animationDelay: inView ? '0.2s' : '0s' }}
            noValidate
            aria-label="Contact form"
          >
            <div>
              <label htmlFor="contact-name" className="sr-only">Your full name</label>
              <input id="contact-name" type="text" name="name" placeholder="Your Name" required
                autoComplete="name" value={form.name} onChange={handleChange} style={inputBase}
                onFocus={e => (e.target.style.borderColor = '#C9A961')}
                onBlur={e => (e.target.style.borderColor = 'rgba(28,61,90,0.15)')} />
            </div>
            <div>
              <label htmlFor="contact-email" className="sr-only">Your email address</label>
              <input id="contact-email" type="email" name="email" placeholder="Email Address" required
                autoComplete="email" value={form.email} onChange={handleChange} style={inputBase}
                onFocus={e => (e.target.style.borderColor = '#C9A961')}
                onBlur={e => (e.target.style.borderColor = 'rgba(28,61,90,0.15)')} />
            </div>
            <div>
              <label htmlFor="contact-message" className="sr-only">Your message</label>
              <textarea id="contact-message" name="message" rows={5} required
                placeholder="Looking for a home, or need help managing your property? Tell us a little about your situation..."
                value={form.message} onChange={handleChange}
                style={{ ...inputBase, resize: 'vertical' }}
                onFocus={e => (e.target.style.borderColor = '#C9A961')}
                onBlur={e => (e.target.style.borderColor = 'rgba(28,61,90,0.15)')} />
            </div>
            <button type="submit"
              className="w-full py-4 rounded-xl font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]"
              style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0', fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.12em', border: 'none', cursor: 'pointer' }}>
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
