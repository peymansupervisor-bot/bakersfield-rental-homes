'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Replace with your form handler (Formspree, Resend, etc.)
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
      className="py-28 px-6 md:px-10"
      style={{ backgroundColor: '#F7F5F0' }}
    >
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#C9A961', letterSpacing: '0.2em' }}
          >
            Get in Touch
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-5"
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              color: '#1C3D5A',
              letterSpacing: '-0.02em',
            }}
          >
            Ready to Invest<br />with Confidence?
          </h2>
          <p className="text-base font-light" style={{ color: '#2B2B2B', opacity: 0.7 }}>
            Tell us about your property. We'll show you how Bakersfield's local team keeps it running.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-16"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: 'rgba(45,122,79,0.1)' }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M6 14L11 19L22 9" stroke="#2D7A4F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3
              className="text-2xl font-semibold mb-2"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}
            >
              Message Received
            </h3>
            <p className="text-sm font-light" style={{ color: '#2B2B2B', opacity: 0.7 }}>
              We'll be in touch within 24 hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={handleChange}
              style={inputBase}
              onFocus={e => (e.target.style.borderColor = '#C9A961')}
              onBlur={e => (e.target.style.borderColor = 'rgba(28,61,90,0.15)')}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={handleChange}
              style={inputBase}
              onFocus={e => (e.target.style.borderColor = '#C9A961')}
              onBlur={e => (e.target.style.borderColor = 'rgba(28,61,90,0.15)')}
            />
            <textarea
              name="message"
              placeholder="Tell us about your property or investment goals..."
              rows={5}
              required
              value={form.message}
              onChange={handleChange}
              style={{ ...inputBase, resize: 'vertical' }}
              onFocus={e => (e.target.style.borderColor = '#C9A961')}
              onBlur={e => (e.target.style.borderColor = 'rgba(28,61,90,0.15)')}
            />
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]"
              style={{
                backgroundColor: '#1C3D5A',
                color: '#F7F5F0',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.12em',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Send Message
            </button>
          </motion.form>
        )}
      </div>
    </section>
  )
}
