'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'cookie_consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-5 md:bottom-24 md:max-w-sm z-50 bg-[#0d1b2e] text-white rounded-2xl shadow-2xl p-5"
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
          onClick={accept}
          className="flex-1 bg-amber-500 hover:bg-amber-400 text-white text-sm font-semibold rounded-xl py-2 transition-colors"
        >
          Accept
        </button>
        <button
          onClick={decline}
          className="flex-1 border border-gray-500 hover:border-gray-300 text-gray-300 hover:text-white text-sm font-semibold rounded-xl py-2 transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  )
}
