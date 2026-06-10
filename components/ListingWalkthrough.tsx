'use client'

import { useEffect, useRef, useState } from 'react'

const STEPS = [
  {
    number: 1,
    title: 'Property Details',
    tip: 'Start by typing your street address — it auto-fills the city and ZIP for you. Then enter bedrooms, bathrooms, square footage, monthly rent, and deposit.',
    duration: '~2 min',
    mockup: <Step1Mockup />,
  },
  {
    number: 2,
    title: 'Description & Amenities',
    tip: 'Write at least 80 characters describing your home. Mention the neighborhood, nearby schools, and commute. Then tap the amenities that apply.',
    duration: '~3 min',
    mockup: <Step2Mockup />,
  },
  {
    number: 3,
    title: 'Upload Photos',
    tip: 'Upload at least 10 photos — you can drag & drop or tap to select multiple at once. The first photo becomes your cover image. Bright daytime shots work best.',
    duration: '~2 min',
    mockup: <Step3Mockup />,
  },
  {
    number: 4,
    title: 'Contact & Verify',
    tip: 'Enter your name and email so tenants can reach you. Then complete a quick free identity check — a selfie + ID scan — to confirm you\'re a real landlord. No credit card needed.',
    duration: '~1 min',
    mockup: <Step4Mockup />,
  },
]

export default function ListingWalkthrough() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActive(a => (a + 1) % STEPS.length)
    }, 4000)
  }

  useEffect(() => {
    if (!paused) startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused])

  const goTo = (i: number) => {
    setActive(i)
    setPaused(true)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  return (
    <section
      aria-labelledby="walkthrough-heading"
      className="max-w-2xl mx-auto px-6 pt-10 pb-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 id="walkthrough-heading" className="text-center text-lg font-bold mb-1"
        style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
        How It Works — 4 Simple Steps
      </h2>
      <p className="text-center text-xs mb-6" style={{ color: '#595959' }}>
        Total time: about 8 minutes from start to live listing
      </p>

      {/* Step tabs */}
      <div className="flex gap-2 mb-5" role="tablist" aria-label="Listing steps">
        {STEPS.map((s, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={active === i}
            aria-controls={`walkthrough-panel-${i}`}
            id={`walkthrough-tab-${i}`}
            onClick={() => goTo(i)}
            className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300"
            style={{
              backgroundColor: active === i ? '#1C3D5A' : '#f0ece4',
              color: active === i ? '#F7F5F0' : '#595959',
              border: active === i ? '1px solid #1C3D5A' : '1px solid transparent',
            }}
          >
            <span aria-hidden="true">{s.number}</span>
            <span className="hidden sm:inline ml-1">{s.title.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Panel */}
      {STEPS.map((s, i) => (
        <div
          key={i}
          id={`walkthrough-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`walkthrough-tab-${i}`}
          hidden={active !== i}
        >
          <div className="rounded-3xl overflow-hidden shadow-sm"
            style={{ border: '1px solid rgba(201,169,97,0.2)' }}>
            {/* Mockup area */}
            <div className="px-6 pt-6 pb-4" style={{ backgroundColor: '#f8f6f2' }}>
              {s.mockup}
            </div>

            {/* Tip bar */}
            <div className="px-6 py-5 bg-white">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}>
                  {s.number}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold" style={{ color: '#1C3D5A' }}>{s.title}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: '#f0ece4', color: '#595959' }}>
                      {s.duration}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#595959' }}>{s.tip}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-4" aria-hidden="true">
            {STEPS.map((_, j) => (
              <button
                key={j}
                onClick={() => goTo(j)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: j === active ? 20 : 6,
                  height: 6,
                  backgroundColor: j === active ? '#C9A961' : '#d5d0c8',
                }}
                aria-label={`Go to step ${j + 1}`}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

/* ── Mockup components ─────────────────────────────────────────────────── */

function MockInput({ label, placeholder, wide }: { label: string; placeholder: string; wide?: boolean }) {
  return (
    <div className={wide ? 'col-span-2' : ''}>
      <p className="text-[9px] font-bold tracking-widest uppercase mb-1" style={{ color: '#1C3D5A' }}>{label}</p>
      <div className="rounded-lg px-3 py-2 text-[11px]"
        style={{ border: '1px solid #e0ddd8', backgroundColor: 'white', color: '#aaa' }}>
        {placeholder}
      </div>
    </div>
  )
}

function MockSelect({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] font-bold tracking-widest uppercase mb-1" style={{ color: '#1C3D5A' }}>{label}</p>
      <div className="rounded-lg px-3 py-2 text-[11px] flex justify-between items-center"
        style={{ border: '1px solid #e0ddd8', backgroundColor: 'white', color: '#2B2B2B' }}>
        <span>{value}</span>
        <span style={{ color: '#aaa' }}>▾</span>
      </div>
    </div>
  )
}

function Step1Mockup() {
  return (
    <div className="space-y-3">
      <MockInput label="Listing Title" placeholder="Charming 3BR in West Bakersfield…" wide />
      <MockInput label="Street Address" placeholder="Start typing — address auto-fills" wide />
      <div className="grid grid-cols-2 gap-3">
        <MockInput label="City" placeholder="Bakersfield" />
        <MockInput label="ZIP" placeholder="93301" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <MockSelect label="Bedrooms" value="3 BR" />
        <MockSelect label="Bathrooms" value="2 Bath" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <MockInput label="Monthly Rent ($)" placeholder="1,800" />
        <MockInput label="Deposit ($)" placeholder="1,800" />
      </div>
    </div>
  )
}

function Step2Mockup() {
  const active = ['Central A/C', 'Backyard', 'Pool', 'Washer/Dryer']
  const rest = ['Dishwasher', 'Fireplace', 'Patio/Deck']
  return (
    <div className="space-y-3">
      <div>
        <p className="text-[9px] font-bold tracking-widest uppercase mb-1" style={{ color: '#1C3D5A' }}>
          Property Description
        </p>
        <div className="rounded-lg px-3 py-2 text-[11px] leading-relaxed"
          style={{ border: '1px solid #C9A961', backgroundColor: 'white', color: '#2B2B2B', minHeight: 64 }}>
          Spacious 3-bedroom home in Northwest Bakersfield with a large backyard, 2-car garage, and updated kitchen…
        </div>
        <p className="text-[9px] mt-1" style={{ color: '#2D7A4F' }}>✓ 134/80 characters</p>
      </div>
      <div>
        <p className="text-[9px] font-bold tracking-widest uppercase mb-2" style={{ color: '#1C3D5A' }}>Amenities</p>
        <div className="flex flex-wrap gap-1.5">
          {active.map(a => (
            <span key={a} className="px-2.5 py-1 rounded-full text-[10px] font-medium"
              style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}>{a}</span>
          ))}
          {rest.map(a => (
            <span key={a} className="px-2.5 py-1 rounded-full text-[10px] font-medium"
              style={{ backgroundColor: '#f0ece4', color: '#595959' }}>{a}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Step3Mockup() {
  const colors = ['#ddd', '#c9c4bc', '#d4cec6', '#e0dbd3', '#cbc5bc', '#d8d3ca']
  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div className="border-2 border-dashed rounded-xl p-5 text-center"
        style={{ borderColor: '#C9A961', backgroundColor: 'rgba(201,169,97,0.04)' }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2"
          style={{ backgroundColor: '#f0ece4' }}>
          <span style={{ color: '#C9A961', fontSize: 18 }}>+</span>
        </div>
        <p className="text-[11px] font-medium" style={{ color: '#1C3D5A' }}>Click or drag photos here</p>
        <p className="text-[10px] mt-0.5" style={{ color: '#aaa' }}>JPG, PNG, WEBP — multiple at once</p>
      </div>
      {/* Photo grid */}
      <div className="grid grid-cols-6 gap-1.5">
        {colors.map((c, i) => (
          <div key={i} className="rounded-lg aspect-square relative overflow-hidden"
            style={{ backgroundColor: c }}>
            {i === 0 && (
              <span className="absolute bottom-0.5 left-0.5 text-[8px] font-bold px-1 rounded"
                style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}>Cover</span>
            )}
          </div>
        ))}
      </div>
      <p className="text-[10px]" style={{ color: '#2D7A4F' }}>✓ 6 of 10 photos added — add 4 more</p>
    </div>
  )
}

function Step4Mockup() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <MockInput label="Your Name" placeholder="Jane Smith" />
        <MockInput label="Email Address" placeholder="jane@example.com" />
      </div>
      <MockInput label="Phone (optional)" placeholder="(661) 555-0100" wide />
      {/* Summary card */}
      <div className="rounded-xl p-3 space-y-1.5" style={{ backgroundColor: '#f0ece4' }}>
        <p className="text-[9px] font-bold tracking-widest uppercase mb-2" style={{ color: '#7d6019' }}>
          Listing Summary
        </p>
        {[
          ['Property', '3BR/2BA on Oak Street'],
          ['Rent', '$1,800/mo'],
          ['Photos', '10 photos'],
        ].map(([l, v]) => (
          <div key={l} className="flex justify-between text-[10px]">
            <span style={{ color: '#616161' }}>{l}</span>
            <span className="font-medium" style={{ color: '#2B2B2B' }}>{v}</span>
          </div>
        ))}
        <div className="flex justify-between text-[10px] pt-1.5 border-t" style={{ borderColor: '#d5d0c8' }}>
          <span className="font-semibold" style={{ color: '#1C3D5A' }}>Identity Verification</span>
          <span className="font-bold" style={{ color: '#2D7A4F' }}>Free</span>
        </div>
      </div>
      <div className="rounded-xl py-3 text-center text-[11px] font-semibold"
        style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>
        Verify Identity &amp; Publish Listing →
      </div>
    </div>
  )
}
