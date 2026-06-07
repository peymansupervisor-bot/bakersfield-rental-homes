'use client'

import NikoPicassoChat from '@/components/NikoPicassoChat'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { supabase } from '@/lib/supabase'

// ─── Types ───────────────────────────────────────────────────────────────────

type FormData = {
  // Step 1 — Property details
  title: string
  address: string
  city: string
  state: string
  zip: string
  bedrooms: string
  bathrooms: string
  living_area_sqft: string
  lot_size_sqft: string
  monthly_rent: string
  deposit: string
  rental_status: 'vacant' | 'coming_soon'
  available_date: string
  lease_term: string
  pets_allowed: boolean
  solar: boolean
  parking: string
  // Step 2 — Description & amenities
  description: string
  amenities: string[]
  // Step 3 — Photos (stored as File objects client-side)
  photoFiles: File[]
  photoPreviewUrls: string[]
  // Step 4 — Contact
  contact_name: string
  contact_email: string
  contact_phone: string
}

const INITIAL: FormData = {
  title: '', address: '', city: '', state: 'CA', zip: '',
  bedrooms: '', bathrooms: '', living_area_sqft: '', lot_size_sqft: '',
  monthly_rent: '', deposit: '',
  rental_status: 'vacant', available_date: '', lease_term: '12 months', pets_allowed: false, solar: false, parking: 'Street',
  description: '', amenities: [],
  photoFiles: [], photoPreviewUrls: [],
  contact_name: '', contact_email: '', contact_phone: '',
}

const AMENITY_LIST = [
  'Central A/C', 'Heating', 'Washer/Dryer In Unit', 'Washer/Dryer Hookups',
  'Dishwasher', 'Refrigerator', 'Microwave', 'Pool', 'Spa/Hot Tub',
  'Backyard', 'Patio/Deck', 'Fireplace', 'Hardwood Floors', 'Carpet',
  'High Ceilings', 'Walk-in Closet', 'Storage', 'Gym/Fitness Center',
  'Horse Property',
]

const STEPS = ['Property Details', 'Description', 'Photos', 'Contact & Pay']

// ─── Helpers ─────────────────────────────────────────────────────────────────

const inputCls = `
  w-full px-4 py-3 rounded-xl text-sm text-[#2B2B2B]
  border border-[#e0ddd8] bg-white outline-none
  focus:border-[#C9A961] transition-colors duration-200
  placeholder:text-[#767676] font-[Inter,sans-serif]
`.trim()

const labelCls = 'text-xs font-semibold tracking-widest uppercase text-[#1C3D5A]'
const sectionCls = 'space-y-6'

function Field({ label, children, group }: { label: string; children: ReactNode; group?: boolean }) {
  if (group) {
    return (
      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend className={`${labelCls} block mb-2`}>{label}</legend>
        {children}
      </fieldset>
    )
  }
  return (
    <div>
      <label className={labelCls} style={{ display: 'block', cursor: 'default' }}>
        <span className="block mb-2">{label}</span>
        {children}
      </label>
    </div>
  )
}

// ─── Address Autocomplete ─────────────────────────────────────────────────────

type Suggestion = { display: string; address: string; city: string; zip: string }

function AddressAutocomplete({ inputCls, address, onAddressChange, onSelect }: {
  inputCls: string
  address: string
  onAddressChange: (v: string) => void
  onSelect: (address: string, city: string, zip: string) => void
}) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const listboxId = 'address-listbox'

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false); setActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const lookup = (val: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (val.length < 5) { setSuggestions([]); setOpen(false); setActiveIndex(-1); return }
    timerRef.current = setTimeout(async () => {
      try {
        const query = encodeURIComponent(`${val}, Bakersfield, California, USA`)
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=5&countrycodes=us&viewbox=-119.5,35.2,-118.5,35.6&bounded=0`,
          { headers: { 'Accept-Language': 'en' } }
        )
        const data = await res.json()
        const results: Suggestion[] = data
          .filter((r: any) => r.address && r.address.state === 'California')
          .map((r: any) => {
            const a = r.address
            const streetNum = a.house_number ?? ''
            const streetName = a.road ?? ''
            const street = [streetNum, streetName].filter(Boolean).join(' ')
            const city = a.city ?? a.town ?? a.village ?? ''
            const zip = a.postcode ?? ''
            return { display: r.display_name, address: street, city, zip }
          })
          .filter((r: Suggestion) => r.address)
        setSuggestions(results)
        setOpen(results.length > 0)
        setActiveIndex(-1)
      } catch { setSuggestions([]); setOpen(false) }
    }, 350)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => (i + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => (i - 1 + suggestions.length) % suggestions.length)
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      const s = suggestions[activeIndex]
      onSelect(s.address, s.city, s.zip)
      setOpen(false); setActiveIndex(-1)
    } else if (e.key === 'Escape') {
      setOpen(false); setActiveIndex(-1)
    }
  }

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <label htmlFor="address-input" className="text-xs font-semibold tracking-widest uppercase block mb-2"
        style={{ color: '#1C3D5A', cursor: 'default' }}>
        Street Address
      </label>
      <input
        id="address-input"
        className={inputCls}
        placeholder="123 Oak Street"
        value={address}
        autoComplete="off"
        onChange={e => { onAddressChange(e.target.value); lookup(e.target.value) }}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-activedescendant={activeIndex >= 0 ? `address-option-${activeIndex}` : undefined}
      />
      {open && suggestions.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Address suggestions"
          className="absolute left-0 right-0 z-50 rounded-xl overflow-hidden shadow-lg mt-1"
          style={{ backgroundColor: 'white', border: '1px solid #e0ddd8', top: '100%' }}
        >
          {suggestions.map((s, i) => (
            <li
              key={i}
              id={`address-option-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              style={{
                backgroundColor: i === activeIndex ? '#f7f5f0' : 'white',
                borderBottom: i < suggestions.length - 1 ? '1px solid #f0ece4' : 'none',
              }}
            >
              <button
                type="button"
                tabIndex={-1}
                className="w-full text-left px-4 py-3 text-sm"
                style={{ color: '#2B2B2B', background: 'none', border: 'none' }}
                onClick={() => { onSelect(s.address, s.city, s.zip); setOpen(false); setActiveIndex(-1) }}
              >
                <span className="font-medium">{s.address}</span>
                <span className="text-xs ml-2" style={{ color: '#767676' }}>{s.city}{s.zip ? `, ${s.zip}` : ''}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ─── Step components ─────────────────────────────────────────────────────────

function Step1({ form, set }: { form: FormData; set: (k: keyof FormData, v: any) => void }) {
  return (
    <div className={sectionCls}>
      <Field label="Listing Title">
        <input className={inputCls} placeholder="e.g. Charming 3BR in West Bakersfield"
          value={form.title} onChange={e => set('title', e.target.value)} />
      </Field>

      <p className="text-xs px-3 py-2 rounded-lg mb-1" style={{ backgroundColor: 'rgba(201,169,97,0.1)', color: '#8a6d1f' }}>
        🏡 California properties only
      </p>
      <AddressAutocomplete
        inputCls={inputCls}
        address={form.address}
        onAddressChange={val => set('address', val)}
        onSelect={(address, city, zip) => {
          set('address', address)
          set('city', city)
          set('zip', zip)
        }}
      />

      <div className="grid grid-cols-2 gap-4">
        <Field label="City">
          <input className={inputCls} placeholder="Bakersfield"
            value={form.city} onChange={e => set('city', e.target.value)} />
        </Field>
        <Field label="ZIP Code">
          <input className={inputCls} placeholder="93301"
            value={form.zip} onChange={e => set('zip', e.target.value)} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Bedrooms">
          <select className={inputCls} value={form.bedrooms} onChange={e => set('bedrooms', e.target.value)}>
            <option value="">Select</option>
            {['Studio', '1', '2', '3', '4', '5', '6+'].map(n => (
              <option key={n} value={n}>{n === 'Studio' ? 'Studio' : `${n} BR`}</option>
            ))}
          </select>
        </Field>
        <Field label="Bathrooms">
          <select className={inputCls} value={form.bathrooms} onChange={e => set('bathrooms', e.target.value)}>
            <option value="">Select</option>
            {['1', '1.5', '2', '2.5', '3', '3.5', '4+'].map(n => (
              <option key={n} value={n}>{n} Bath</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Living Area (sqft)">
          <input className={inputCls} type="number" placeholder="1,200"
            value={form.living_area_sqft} onChange={e => set('living_area_sqft', e.target.value)} />
        </Field>
        <Field label="Lot Size (sqft)">
          <input className={inputCls} type="number" placeholder="6,000 (optional)"
            value={form.lot_size_sqft} onChange={e => set('lot_size_sqft', e.target.value)} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Monthly Rent ($)">
          <input className={inputCls} type="number" placeholder="1,800"
            value={form.monthly_rent} onChange={e => set('monthly_rent', e.target.value)} />
        </Field>
        <Field label="Security Deposit ($)">
          <input className={inputCls} type="number" placeholder="1,800"
            value={form.deposit} onChange={e => set('deposit', e.target.value)} />
        </Field>
      </div>

      <Field label="Listing Status" group>
        <div role="radiogroup" aria-label="Listing Status" className="flex gap-3 mt-1">
          {([['vacant', 'Available Now'], ['coming_soon', 'Coming Soon']] as const).map(([val, label]) => (
            <button key={val} type="button"
              role="radio"
              aria-checked={form.rental_status === val}
              onClick={() => set('rental_status', val)}
              className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                backgroundColor: form.rental_status === val
                  ? (val === 'coming_soon' ? '#D4630A' : '#1C3D5A')
                  : 'white',
                color: form.rental_status === val ? '#F7F5F0' : '#2B2B2B',
                border: `1px solid ${form.rental_status === val ? (val === 'coming_soon' ? '#D4630A' : '#1C3D5A') : '#e0ddd8'}`,
              }}>
              {label}
            </button>
          ))}
        </div>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label={form.rental_status === 'coming_soon' ? 'Available Date *' : 'Available Date'}>
          <input className={inputCls} type="date"
            value={form.available_date} onChange={e => set('available_date', e.target.value)} />
          {form.rental_status === 'coming_soon' && (
            <p className="text-xs mt-1" style={{ color: '#D4630A' }}>
              Required for Coming Soon listings
            </p>
          )}
        </Field>
        <Field label="Lease Term">
          <select className={inputCls} value={form.lease_term} onChange={e => set('lease_term', e.target.value)}>
            {['Month-to-Month', '3 Months', '6 Months', '12 Months'].map(t => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Parking">
          <select className={inputCls} value={form.parking} onChange={e => set('parking', e.target.value)}>
            {['Street', 'Driveway', '1-Car Garage', '2-Car Garage', 'None'].map(p => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </Field>
        <Field label="Pets Allowed" group>
          <div role="radiogroup" aria-label="Pets Allowed" className="flex gap-3 mt-1">
            {[true, false].map(v => (
              <button key={String(v)} type="button"
                role="radio"
                aria-checked={form.pets_allowed === v}
                onClick={() => set('pets_allowed', v)}
                className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor: form.pets_allowed === v ? '#1C3D5A' : 'white',
                  color: form.pets_allowed === v ? '#F7F5F0' : '#2B2B2B',
                  border: `1px solid ${form.pets_allowed === v ? '#1C3D5A' : '#e0ddd8'}`,
                }}>
                {v ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <Field label="Solar Panels" group>
        <div role="radiogroup" aria-label="Solar Panels" className="flex gap-3 mt-1">
          {[true, false].map(v => (
            <button key={String(v)} type="button"
              role="radio"
              aria-checked={form.solar === v}
              onClick={() => set('solar', v)}
              className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                backgroundColor: form.solar === v ? '#1C3D5A' : 'white',
                color: form.solar === v ? '#F7F5F0' : '#2B2B2B',
                border: `1px solid ${form.solar === v ? '#1C3D5A' : '#e0ddd8'}`,
              }}>
              {v ? 'Yes' : 'No'}
            </button>
          ))}
        </div>
      </Field>
    </div>
  )
}

function Step2({ form, set }: { form: FormData; set: (k: keyof FormData, v: any) => void }) {
  const toggleAmenity = (a: string) => {
    const cur = form.amenities
    set('amenities', cur.includes(a) ? cur.filter(x => x !== a) : [...cur, a])
  }

  return (
    <div className={sectionCls}>
      <Field label="Property Description">
        <textarea
          className={inputCls + ' resize-none'}
          rows={6}
          placeholder="Describe the property — highlight what makes it special, nearby schools, commute, condition..."
          value={form.description}
          onChange={e => set('description', e.target.value)}
        />
        <p className="text-xs mt-1" style={{ color: form.description.length < 80 ? '#C9A961' : '#aaa' }}>
          {form.description.length}/80 characters minimum
        </p>
      </Field>

      <Field label="Amenities — select all that apply">
        <div className="flex flex-wrap gap-2">
          {AMENITY_LIST.map(a => {
            const active = form.amenities.includes(a)
            return (
              <button key={a} type="button" onClick={() => toggleAmenity(a)}
                aria-pressed={active}
                className="px-3 py-2 rounded-full text-xs font-medium transition-all duration-200"
                style={{
                  backgroundColor: active ? '#C9A961' : '#f4f2ed',
                  color: active ? '#1C3D5A' : '#555',
                  border: active ? '1px solid #C9A961' : '1px solid transparent',
                }}>
                {a}
              </button>
            )
          })}
        </div>
      </Field>
    </div>
  )
}

/** Read EXIF orientation tag from raw bytes (value 1–8, or 1 if absent). */
function readExifOrientation(buf: ArrayBuffer): number {
  const view = new DataView(buf)
  if (view.getUint16(0) !== 0xFFD8) return 1 // not JPEG
  let offset = 2
  while (offset < view.byteLength - 4) {
    const marker = view.getUint16(offset)
    const len = view.getUint16(offset + 2)
    if (marker === 0xFFE1) { // APP1 (EXIF)
      if (view.getUint32(offset + 4) !== 0x45786966) break // 'Exif'
      const tiffOffset = offset + 10
      const le = view.getUint16(tiffOffset) === 0x4949
      const rd16 = (o: number) => le ? view.getUint16(tiffOffset + o, true) : view.getUint16(tiffOffset + o)
      const rd32 = (o: number) => le ? view.getUint32(tiffOffset + o, true) : view.getUint32(tiffOffset + o)
      const ifdOffset = rd32(4)
      const entries = rd16(ifdOffset)
      for (let i = 0; i < entries; i++) {
        const entryOffset = ifdOffset + 2 + i * 12
        if (rd16(entryOffset) === 0x0112) return rd16(entryOffset + 8)
      }
      break
    }
    offset += 2 + len
  }
  return 1
}

/** Return a corrected-orientation Blob for the given image File. */
async function correctOrientation(file: File): Promise<Blob> {
  const buf = await file.arrayBuffer()
  const orientation = readExifOrientation(buf)
  if (orientation <= 1) return file // already upright

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const { naturalWidth: w, naturalHeight: h } = img
      const swap = orientation >= 5
      const canvas = document.createElement('canvas')
      canvas.width  = swap ? h : w
      canvas.height = swap ? w : h
      const ctx = canvas.getContext('2d')!
      // Apply the transform that maps EXIF orientation → upright pixels
      switch (orientation) {
        case 2: ctx.transform(-1, 0, 0, 1, w, 0); break
        case 3: ctx.transform(-1, 0, 0, -1, w, h); break
        case 4: ctx.transform(1, 0, 0, -1, 0, h); break
        case 5: ctx.transform(0, 1, 1, 0, 0, 0); break
        case 6: ctx.transform(0, 1, -1, 0, h, 0); break
        case 7: ctx.transform(0, -1, -1, 0, h, w); break
        case 8: ctx.transform(0, -1, 1, 0, 0, w); break
      }
      ctx.drawImage(img, 0, 0)
      canvas.toBlob(b => b ? resolve(b) : reject(new Error('canvas toBlob failed')), 'image/jpeg', 0.92)
    }
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

function Step3({ form, set }: { form: FormData; set: (k: keyof FormData, v: any) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const addFiles = useCallback(async (files: FileList | null) => {
    if (!files) return
    const originals = Array.from(files).filter(f => f.type.startsWith('image/'))
    const corrected = await Promise.all(
      originals.map(async (f) => {
        const blob = await correctOrientation(f)
        return new File([blob], f.name, { type: 'image/jpeg' })
      })
    )
    const newUrls = corrected.map(f => URL.createObjectURL(f))
    set('photoFiles', [...form.photoFiles, ...corrected])
    set('photoPreviewUrls', [...form.photoPreviewUrls, ...newUrls])
  }, [form.photoFiles, form.photoPreviewUrls, set])

  const removePhoto = (i: number) => {
    URL.revokeObjectURL(form.photoPreviewUrls[i])
    set('photoFiles', form.photoFiles.filter((_, j) => j !== i))
    set('photoPreviewUrls', form.photoPreviewUrls.filter((_, j) => j !== i))
  }

  const count = form.photoFiles.length
  const needed = Math.max(0, 10 - count)

  return (
    <div className={sectionCls}>
      <div>
        <label className={labelCls}>
          Photos ({count}/10 minimum)
          {needed > 0 && <span style={{ color: '#7d6019' }}> — add {needed} more</span>}
          {count >= 10 && <span style={{ color: '#2D7A4F' }}> ✓ requirement met</span>}
        </label>

        {/* Drop zone — keyboard accessible via role="button" + tabIndex + onKeyDown */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Click or press Enter to upload photos"
          onClick={() => inputRef.current?.click()}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click() } }}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); void addFiles(e.dataTransfer.files) }}
          className="border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 mb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A961]"
          style={{
            borderColor: dragging ? '#C9A961' : '#d5d0c8',
            backgroundColor: dragging ? 'rgba(201,169,97,0.05)' : '#faf9f7',
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="20" fill="#f0ece4"/>
              <path d="M20 14v12M14 20h12" stroke="#C9A961" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p className="text-sm font-medium" style={{ color: '#1C3D5A' }}>
              Click or drag photos here
            </p>
            <p className="text-xs" style={{ color: '#aaa' }}>
              JPG, PNG, WEBP — you can add multiple at once
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            aria-label="Upload property photos"
            className="hidden"
            onChange={e => { void addFiles(e.target.files) }}
          />
        </div>

        {/* Photo grid preview */}
        {count > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {form.photoPreviewUrls.map((url, i) => (
              <div key={url} className="relative rounded-xl overflow-hidden aspect-square group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Listing photo ${i + 1} of ${count}`} className="w-full h-full object-cover" />
                {/* Badge: cover photo */}
                {i === 0 && (
                  <span className="absolute top-1 left-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}>
                    Cover
                  </span>
                )}
                {/* Remove button */}
                <button
                  type="button"
                  aria-label={`Remove photo ${i + 1}`}
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '12px' }}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs mt-3" style={{ color: '#aaa' }}>
          The first photo will be used as the cover image. Drag to reorder (coming soon).
        </p>
      </div>
    </div>
  )
}

function Step4({ form, set, onSubmit, loading }: {
  form: FormData
  set: (k: keyof FormData, v: any) => void
  onSubmit: () => void
  loading: boolean
}) {
  return (
    <div className={sectionCls}>
      {/* Contact info */}
      <Field label="Your Name">
        <input className={inputCls} placeholder="Jane Smith" autoComplete="name"
          value={form.contact_name} onChange={e => set('contact_name', e.target.value)} />
      </Field>
      <Field label="Email Address">
        <input className={inputCls} type="email" placeholder="jane@example.com" autoComplete="email"
          value={form.contact_email} onChange={e => set('contact_email', e.target.value)} />
      </Field>
      <Field label="Phone (optional)">
        <input className={inputCls} type="tel" placeholder="(661) 555-0100" autoComplete="tel"
          value={form.contact_phone} onChange={e => set('contact_phone', e.target.value)} />
      </Field>

      {/* Summary card */}
      <div className="rounded-2xl p-5 space-y-2" style={{ backgroundColor: '#f0ece4' }}>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7d6019' }}>
          Listing Summary
        </p>
        <Row label="Property" value={form.title} />
        <Row label="Address" value={`${form.address}, ${form.city}, CA ${form.zip}`} />
        <Row label="Bedrooms / Baths" value={`${form.bedrooms} BD / ${form.bathrooms} BA`} />
        <Row label="Living Area" value={`${Number(form.living_area_sqft).toLocaleString()} sqft`} />
        {form.lot_size_sqft && <Row label="Lot Size" value={`${Number(form.lot_size_sqft).toLocaleString()} sqft`} />}
        <Row label="Monthly Rent" value={`$${Number(form.monthly_rent).toLocaleString()}`} />
        <Row label="Deposit" value={`$${Number(form.deposit).toLocaleString()}`} />
        <Row label="Photos" value={`${form.photoFiles.length} photos`} />
        <div className="border-t border-[#d5d0c8] mt-3 pt-3 flex justify-between">
          <span className="text-sm font-semibold" style={{ color: '#1C3D5A' }}>Listing fee</span>
          <span className="text-sm font-bold" style={{ color: '#2D7A4F' }}>$1.00</span>
        </div>
      </div>

      {/* Pay button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={loading}
        className="w-full py-4 rounded-2xl font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-90 disabled:opacity-50"
        style={{
          backgroundColor: '#1C3D5A',
          color: '#F7F5F0',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '0.12em',
        }}
      >
        {loading ? 'Processing…' : 'Pay $1 & Publish Listing →'}
      </button>

      <p className="text-xs text-center" style={{ color: '#595959' }}>
        We charge a $1 fee to verify that every landlord is real and every listing is legitimate — keeping scammers and fake listings off the platform.
      </p>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm gap-4">
      <span style={{ color: '#616161' }}>{label}</span>
      <span className="text-right font-medium" style={{ color: '#2B2B2B' }}>{value}</span>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ListPage() {
  const [step, setStep] = useState(0)
  const [form, setFormData] = useState<FormData>(INITIAL)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const stepHeadingRef = useRef<HTMLHeadingElement>(null)
  const errorRef = useRef<HTMLParagraphElement>(null)

  const set = useCallback((k: keyof FormData, v: any) => {
    setFormData(prev => ({ ...prev, [k]: v }))
  }, [])

  // ── Validation per step ────────────────────────────────────────────────────
  const validate = (): string => {
    if (step === 0) {
      if (!form.title.trim()) return 'Please enter a listing title'
      if (!form.address.trim()) return 'Please enter the street address'
      if (!form.city.trim()) return 'Please enter the city'
      if (!form.bedrooms) return 'Please select number of bedrooms'
      if (!form.bathrooms) return 'Please select number of bathrooms'
      if (!form.living_area_sqft) return 'Please enter the living area'
      if (!form.monthly_rent || Number(form.monthly_rent) <= 0) return 'Please enter the monthly rent'
      if (!form.deposit || Number(form.deposit) <= 0) return 'Please enter the security deposit'
      if (form.rental_status === 'coming_soon' && !form.available_date) return 'Please enter the available date for your Coming Soon listing'
    }
    if (step === 1) {
      if (form.description.length < 80) return 'Description must be at least 80 characters'
    }
    if (step === 2) {
      if (form.photoFiles.length < 10) return `Please add at least ${10 - form.photoFiles.length} more photo(s)`
    }
    if (step === 3) {
      if (!form.contact_name.trim()) return 'Please enter your name'
      if (!form.contact_email.trim() || !form.contact_email.includes('@')) return 'Please enter a valid email'
    }
    return ''
  }

  const advanceStep = (delta: 1 | -1) => {
    setStep(s => s + delta)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => stepHeadingRef.current?.focus(), 50)
  }

  const next = () => {
    const err = validate()
    if (err) { setError(err); setTimeout(() => errorRef.current?.focus(), 50); return }
    setError('')
    advanceStep(1)
  }

  const back = () => {
    setError('')
    advanceStep(-1)
  }

  // ── Photo upload via server route (rotates EXIF + resizes before storing) ──
  const uploadPhotos = async (): Promise<string[]> => {
    const urls: string[] = []
    const total = form.photoFiles.length
    for (let i = 0; i < total; i++) {
      const file = form.photoFiles[i]
      const path = `listings/${Date.now()}_${i}.jpg`
      const fd = new FormData()
      fd.append('file', file)
      fd.append('path', path)
      const res = await fetch('/api/upload-photo', { method: 'POST', body: fd })
      const { url, error } = await res.json()
      if (error || !url) throw new Error(`Photo upload failed: ${error ?? 'unknown error'}`)
      urls.push(url)
      setUploadProgress(Math.round(((i + 1) / total) * 100))
    }
    return urls
  }

  // ── Submit: upload → create listing → Stripe checkout ────────────────────
  const handleSubmit = async () => {
    const err = validate()
    if (err) { setError(err); return }
    setError('')
    setLoading(true)
    try {
      // 1. Upload photos
      setUploadProgress(0)
      const photoUrls = await uploadPhotos()

      // 2. Create pending listing
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          address: form.address,
          city: form.city,
          state: form.state,
          zip: form.zip,
          description: form.description,
          monthly_rent: Number(form.monthly_rent),
          deposit: Number(form.deposit),
          bedrooms: form.bedrooms === 'Studio' ? 0 : Number(form.bedrooms.replace('+', '')),
          bathrooms: Number(form.bathrooms.replace('+', '')),
          living_area_sqft: Number(form.living_area_sqft),
          lot_size_sqft: form.lot_size_sqft ? Number(form.lot_size_sqft) : null,
          rental_status: form.rental_status,
          available_date: form.available_date || null,
          lease_term: form.lease_term,
          pets_allowed: form.pets_allowed,
          parking: form.parking,
          amenities: form.solar ? [...form.amenities, 'Solar'] : form.amenities,
          photos: photoUrls,
          contact_name: form.contact_name,
          contact_email: form.contact_email,
          contact_phone: form.contact_phone || null,
        }),
      })
      const { id, error: listErr } = await res.json()
      if (listErr || !id) throw new Error(listErr || 'Failed to create listing')

      // 3. Attempt owner bypass — server decides if email qualifies, no secret on client
      const bypassRes = await fetch('/api/activate-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: id, contactEmail: form.contact_email }),
      })
      if (bypassRes.ok) {
        window.location.href = `/list/success?listing_id=${id}`
        return
      }

      // 3b. Standard flow — Stripe checkout
      const ckRes = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: id }),
      })
      const { url, error: ckErr } = await ckRes.json()
      if (ckErr || !url) throw new Error(ckErr || 'Failed to create checkout')

      window.location.href = url
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  // ── Progress bar for photo upload ─────────────────────────────────────────
  const isUploading = loading && uploadProgress > 0 && uploadProgress < 100

  return (
    <main className="min-h-screen" id="main-content" style={{ backgroundColor: '#F7F5F0' }}>
      {/* Header */}
      <div
        className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(to bottom, #1C3D5A 0%, #2a5278 100%)' }}
      >
        <h1 className="text-4xl font-bold mb-3"
          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
          List Your Rental Property in Bakersfield, CA
        </h1>
        <p className="text-sm font-light" style={{ color: 'rgba(247,245,240,0.87)' }}>
          We charge a $1 fee to verify that every landlord is real and every listing is legitimate — keeping scammers and fake listings off the platform.
        </p>
      </div>

      <NikoPicassoChat />

      {/* Step indicator */}
      <div className="max-w-2xl mx-auto px-6 pt-10 pb-2">
        <nav aria-label="Form progress">
          <ol className="flex items-center gap-0 list-none m-0 p-0">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-center flex-1 last:flex-none"
                aria-current={i === step ? 'step' : undefined}>
                <div className="flex flex-col items-center">
                  <div
                    aria-hidden="true"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                    style={{
                      backgroundColor: i < step ? '#2D7A4F' : i === step ? '#C9A961' : '#e0ddd8',
                      color: i <= step ? '#fff' : '#555',
                    }}
                  >
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span className="text-[10px] mt-1 font-medium whitespace-nowrap hidden sm:block"
                    style={{ color: i === step ? '#1C3D5A' : '#595959' }}>
                    {s}
                  </span>
                  <span className="sr-only">
                    {i < step ? `${s} — completed` : i === step ? `${s} — current step` : s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-px mx-2 transition-all duration-300" aria-hidden="true"
                    style={{ backgroundColor: i < step ? '#2D7A4F' : '#e0ddd8' }} />
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Form card */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm" style={{ border: '1px solid rgba(201,169,97,0.15)' }}>
          {/* Step title — receives focus on step change so screen readers announce the new step */}
          <h2
            ref={stepHeadingRef}
            tabIndex={-1}
            className="text-2xl font-bold mb-8 outline-none"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}
          >
            {STEPS[step]}
          </h2>

          {/* Step content */}
          <div key={step} className="card-animate">
            {step === 0 && <Step1 form={form} set={set} />}
            {step === 1 && <Step2 form={form} set={set} />}
            {step === 2 && <Step3 form={form} set={set} />}
            {step === 3 && <Step4 form={form} set={set} onSubmit={handleSubmit} loading={loading} />}
          </div>

          {/* Error message — role="alert" ensures screen readers announce it */}
          {error && (
            <p
              ref={errorRef}
              role="alert"
              aria-live="assertive"
              tabIndex={-1}
              className="mt-4 text-sm px-4 py-3 rounded-xl card-animate outline-none"
              style={{ backgroundColor: 'rgba(220,53,69,0.08)', color: '#dc3545' }}
            >
              {error}
            </p>
          )}

          {/* Upload progress */}
          {isUploading && (
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1" style={{ color: '#616161' }}>
                <span id="upload-progress-label">Uploading photos…</span>
                <span aria-hidden="true">{uploadProgress}%</span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={uploadProgress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-labelledby="upload-progress-label"
                aria-valuetext={`${uploadProgress}% uploaded`}
                className="h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: '#e0ddd8' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ backgroundColor: '#C9A961', width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Nav buttons */}
          {step < 3 && (
            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <button type="button" onClick={back}
                  className="flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-80"
                  style={{ backgroundColor: '#f0ece4', color: '#1C3D5A' }}>
                  ← Back
                </button>
              )}
              <button type="button" onClick={next}
                className="flex-1 py-3.5 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0', letterSpacing: '0.1em' }}>
                Continue →
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
