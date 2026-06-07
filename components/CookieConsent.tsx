'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { inject } from '@vercel/analytics'

const STORAGE_KEY = 'cookie_consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const acceptRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY)
    if (!consent) {
      setVisible(true)
    } else if (consent === 'accepted') {
      inject()
    }
  }, [])

  // Move focus into dialog when it opens; restore when it closes
  useEffect(() => {
    if (visible) {
      triggerRef.current = document.activeElement as HTMLElement
      setTimeout(() => acceptRef.current?.focus(), 50)
    } else {
      triggerRef.current?.focus()
      triggerRef.current = null
    }
  }, [visible])

  // Trap focus inside the dialog while it is open
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { dismiss('declined'); return }
    if (e.key !== 'Tab') return
    const el = e.currentTarget as HTMLElement
    const focusable = Array.from(
      el.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    )
    if (focusable.length === 0) { e.preventDefault(); return }
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }

  const dismiss = (choice: 'accepted' | 'declined') => {
    localStorage.setItem(STORAGE_KEY, choice)
    if (choice === 'accepted') inject()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
      onKeyDown={handleKeyDown}
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-5 md:max-w-sm z-50 bg-[#0d1b2e] text-white rounded-2xl shadow-2xl p-5"
    >
      <p className="text-sm leading-relaxed mb-4 text-gray-200">
        We use cookies to keep you signed in and to understand how our site is used. See our{' '}
        <Link href="/privacy" className="underline text-amber-400 hover:text-amber-300">
          Privacy Policy
        </Link>{' '}
        for details.
      </p>
      <div className="flex gap-3">
        <button
          ref={acceptRef}
          onClick={() => dismiss('accepted')}
          className="flex-1 bg-amber-500 hover:bg-amber-400 text-white text-sm font-semibold rounded-xl py-2 transition-colors"
        >
          Accept
        </button>
        <button
          onClick={() => dismiss('declined')}
          className="flex-1 border border-gray-500 hover:border-gray-300 text-gray-300 hover:text-white text-sm font-semibold rounded-xl py-2 transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  )
}
