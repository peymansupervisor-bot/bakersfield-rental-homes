'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

const CATEGORIES = [
  'Appliance Repair',
  'Carpentry & Siding',
  'Cleaning Services',
  'Electrical',
  'Flooring',
  'Gardener / Landscaping',
  'Handyman',
  'HVAC / Air Conditioning',
  'Locksmith',
  'Painting & Drywall Patch',
  'Pest Control',
  'Plumbing',
  'Pool Technician',
  'Roofing',
  'Stucco & Concrete',
  'Window & Door',
  'Other',
]

type DocKey = 'w9' | 'drivers_license' | 'business_license' | 'insurance_certificate'

const DOC_CONFIG: { key: DocKey; label: string; description: string; icon: string }[] = [
  {
    key: 'w9',
    label: 'W-9 Form',
    description: 'IRS W-9 (Request for Taxpayer Identification). PDF or image.',
    icon: '📄',
  },
  {
    key: 'drivers_license',
    label: "Driver's License",
    description: 'A clear photo or scan of your valid government-issued ID.',
    icon: '🪪',
  },
  {
    key: 'business_license',
    label: 'Business License',
    description: 'Your current contractor or business license. PDF or image.',
    icon: '🏢',
  },
  {
    key: 'insurance_certificate',
    label: 'Certificate of Insurance',
    description: 'Current COI showing liability coverage. PDF or image.',
    icon: '🛡️',
  },
]

function UploadBox({
  docKey, label, description, icon, file, onChange,
}: {
  docKey: DocKey; label: string; description: string; icon: string
  file: File | null; onChange: (key: DocKey, file: File | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const hasFile = !!file

  return (
    <div
      className="relative flex flex-col items-center justify-center p-5 rounded-2xl cursor-pointer transition-all duration-200 text-center"
      style={{
        border: hasFile ? '2px solid #C9A961' : '2px dashed #d0cdc8',
        backgroundColor: hasFile ? 'rgba(201,169,97,0.06)' : 'white',
        minHeight: 140,
      }}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      aria-label={`Upload ${label}`}
      onKeyDown={e => e.key === 'Enter' && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.heic"
        className="hidden"
        onChange={e => onChange(docKey, e.target.files?.[0] ?? null)}
        aria-label={label}
      />
      {hasFile ? (
        <>
          <div className="text-3xl mb-2">✅</div>
          <p className="text-xs font-semibold mb-1" style={{ color: '#1C3D5A' }}>{label}</p>
          <p className="text-[10px] truncate max-w-full" style={{ color: '#616161' }}>{file!.name}</p>
          <button
            type="button"
            className="mt-2 text-[10px] underline"
            style={{ color: '#B03A2E' }}
            aria-label={`Remove ${label}`}
            onClick={e => { e.stopPropagation(); onChange(docKey, null) }}
          >
            Remove
          </button>
        </>
      ) : (
        <>
          <div className="text-3xl mb-2">{icon}</div>
          <p className="text-xs font-semibold mb-1" style={{ color: '#1C3D5A' }}>{label}</p>
          <p className="text-[10px] leading-relaxed" style={{ color: '#aaa' }}>{description}</p>
          <p className="text-[10px] mt-2 font-semibold" style={{ color: '#C9A961' }}>
            Click to upload
          </p>
        </>
      )}
    </div>
  )
}

type Step = 1 | 2 | 3

export default function VendorsPage() {
  const [step, setStep] = useState<Step>(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Step 1 fields
  const [fullName, setFullName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [category, setCategory] = useState('')
  const [notes, setNotes] = useState('')

  // Insurance fields
  const [insuranceCompany, setInsuranceCompany] = useState('')
  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState('')
  const [insuranceExpiry, setInsuranceExpiry] = useState('')

  // Step 2 — documents
  const [docs, setDocs] = useState<Record<DocKey, File | null>>({
    w9: null,
    drivers_license: null,
    business_license: null,
    insurance_certificate: null,
  })

  const handleDocChange = (key: DocKey, file: File | null) =>
    setDocs(d => ({ ...d, [key]: file }))

  const step1Valid = fullName && email && phone && category && insuranceCompany && insurancePolicyNumber
  const step2Valid = docs.w9 && docs.drivers_license && docs.business_license && docs.insurance_certificate

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('full_name', fullName)
      fd.append('email', email)
      fd.append('phone', phone)
      fd.append('category', category)
      fd.append('insurance_company', insuranceCompany)
      fd.append('insurance_policy_number', insurancePolicyNumber)
      if (businessName) fd.append('business_name', businessName)
      if (licenseNumber) fd.append('license_number', licenseNumber)
      if (notes) fd.append('notes', notes)
      if (insuranceExpiry) fd.append('insurance_expiry', insuranceExpiry)
      fd.append('w9', docs.w9!)
      fd.append('drivers_license', docs.drivers_license!)
      fd.append('business_license', docs.business_license!)
      fd.append('insurance_certificate', docs.insurance_certificate!)

      const res = await fetch('/api/vendors', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Submission failed')
      setSubmitted(true)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputCls = 'w-full px-4 py-3 rounded-xl text-sm border outline-none transition-colors duration-200 focus:border-[#C9A961]'
  const inputStyle = { borderColor: '#e0ddd8', backgroundColor: 'white', color: '#2B2B2B' }

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6" id="main-content" style={{ backgroundColor: '#F7F5F0' }}>
        <div
          className="max-w-md w-full text-center p-10 rounded-3xl bg-white card-animate"
          style={{ boxShadow: '0 8px 48px rgba(28,61,90,0.12)', border: '1px solid rgba(201,169,97,0.2)' }}
        >
          <div className="text-6xl mb-5">🎉</div>
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
            Application Received!
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#666' }}>
            Thank you, <strong>{fullName}</strong>. We've received your vendor application for <strong>{category}</strong>.
            Our team will review your documents and reach out to <strong>{email}</strong> within 2–3 business days.
          </p>
          <Link href="/"
            className="inline-block px-8 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>
            Back to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen" id="main-content" style={{ backgroundColor: '#F7F5F0' }}>
      {/* Header */}
      <div className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(to bottom, #1C3D5A 0%, #2a5278 100%)' }}>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: '#C9A961', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
          Bakersfield Rental Homes
        </p>
        <h1 className="text-4xl font-bold mb-3"
          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
          Vendor Application
        </h1>
        <p className="text-sm font-light max-w-md mx-auto" style={{ color: 'rgba(247,245,240,0.65)' }}>
          Join our trusted network of licensed professionals. Applications are reviewed within 2–3 business days.
        </p>
      </div>

      {/* Promotional Banner */}
      <div
        className="px-6 py-4"
        style={{ backgroundColor: '#C9A961' }}
        role="region"
        aria-label="Limited-time promotion"
      >
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
          <span aria-hidden="true">🎉</span>
          <p className="text-sm font-semibold" style={{ color: '#1C3D5A', fontFamily: 'Inter, sans-serif' }}>
            <strong>Join now for free — limited time offer.</strong>{' '}
            A <strong>$95 onboarding fee</strong> will apply starting January 1, 2027.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Step indicator */}
        <nav aria-label="Application steps" className="flex items-center justify-center gap-3 mb-10">
          {([1, 2, 3] as Step[]).map((s) => {
            const stepLabels: Record<number, string> = { 1: 'Contact Info', 2: 'Upload Documents', 3: 'Review & Submit' }
            return (
              <div key={s} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                  aria-label={`Step ${s}: ${stepLabels[s]}${step === s ? ' (current)' : step > s ? ' (completed)' : ''}`}
                  aria-current={step === s ? 'step' : undefined}
                  style={{
                    backgroundColor: step >= s ? '#1C3D5A' : '#e0ddd8',
                    color: step >= s ? '#F7F5F0' : '#aaa',
                  }}
                >
                  {step > s ? '✓' : s}
                </div>
                {s < 3 && (
                  <div className="w-12 h-0.5 transition-all duration-300"
                    style={{ backgroundColor: step > s ? '#C9A961' : '#e0ddd8' }} />
                )}
              </div>
            )
          })}
        </nav>

        <div>

          {/* ── Step 1: Contact & Service Info ── */}
          {step === 1 && (
            <div key="step1" className="card-animate">
              <div className="bg-white rounded-3xl p-8" style={{ boxShadow: '0 4px 24px rgba(28,61,90,0.08)', border: '1px solid rgba(201,169,97,0.15)' }}>
                <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
                  Contact & Service Info
                </h2>
                <p className="text-xs mb-6" style={{ color: '#616161' }}>Tell us about yourself and what service you provide.</p>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="v-full-name" className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#1C3D5A' }}>
                        Full Name <span aria-hidden="true" style={{ color: '#B03A2E' }}>*</span>
                      </label>
                      <input id="v-full-name" className={inputCls} style={inputStyle} placeholder="John Smith"
                        required aria-required="true"
                        value={fullName} onChange={e => setFullName(e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor="v-business-name" className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#1C3D5A' }}>
                        Business Name
                      </label>
                      <input id="v-business-name" className={inputCls} style={inputStyle} placeholder="Smith Plumbing Co."
                        value={businessName} onChange={e => setBusinessName(e.target.value)} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="v-email" className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#1C3D5A' }}>
                        Email <span aria-hidden="true" style={{ color: '#B03A2E' }}>*</span>
                      </label>
                      <input id="v-email" type="email" className={inputCls} style={inputStyle} placeholder="john@example.com"
                        required aria-required="true"
                        value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor="v-phone" className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#1C3D5A' }}>
                        Phone <span aria-hidden="true" style={{ color: '#B03A2E' }}>*</span>
                      </label>
                      <input id="v-phone" type="tel" className={inputCls} style={inputStyle} placeholder="(661) 555-0100"
                        required aria-required="true"
                        value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="v-license" className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#1C3D5A' }}>
                      License / Contractor Number
                    </label>
                    <input id="v-license" className={inputCls} style={inputStyle} placeholder="CSLB # or business license #"
                      value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)} />
                  </div>

                  <div>
                    <label htmlFor="v-category" className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#1C3D5A' }}>
                      Service Category <span aria-hidden="true" style={{ color: '#B03A2E' }}>*</span>
                    </label>
                    <select id="v-category" className={inputCls} style={inputStyle}
                      required aria-required="true"
                      value={category} onChange={e => setCategory(e.target.value)}>
                      <option value="">Select a category…</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  {/* Insurance section */}
                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-4" aria-hidden="true">
                      <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(201,169,97,0.25)' }} />
                      <span className="text-[10px] font-semibold uppercase tracking-widest px-2" style={{ color: '#C9A961' }}>
                        🛡️ Insurance Information
                      </span>
                      <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(201,169,97,0.25)' }} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="v-ins-company" className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#1C3D5A' }}>
                          Insurance Company <span aria-hidden="true" style={{ color: '#B03A2E' }}>*</span>
                        </label>
                        <input id="v-ins-company" className={inputCls} style={inputStyle} placeholder="State Farm, Farmers, etc."
                          required aria-required="true"
                          value={insuranceCompany} onChange={e => setInsuranceCompany(e.target.value)} />
                      </div>
                      <div>
                        <label htmlFor="v-ins-policy" className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#1C3D5A' }}>
                          Policy Number <span aria-hidden="true" style={{ color: '#B03A2E' }}>*</span>
                        </label>
                        <input id="v-ins-policy" className={inputCls} style={inputStyle} placeholder="e.g. GL-123456789"
                          required aria-required="true"
                          value={insurancePolicyNumber} onChange={e => setInsurancePolicyNumber(e.target.value)} />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label htmlFor="v-ins-expiry" className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#1C3D5A' }}>
                        Policy Expiration Date
                      </label>
                      <input id="v-ins-expiry" type="date" className={inputCls} style={inputStyle}
                        value={insuranceExpiry} onChange={e => setInsuranceExpiry(e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="v-notes" className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#1C3D5A' }}>
                      Additional Notes
                    </label>
                    <textarea id="v-notes" className={inputCls} style={{ ...inputStyle, resize: 'none' }} rows={3}
                      placeholder="Years of experience, specialties, certifications…"
                      value={notes} onChange={e => setNotes(e.target.value)} />
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!step1Valid}
                  onClick={() => setStep(2)}
                  aria-label="Continue to upload documents"
                  className="w-full mt-6 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0', letterSpacing: '0.1em' }}>
                  Next: Upload Documents →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 2: Documents ── */}
          {step === 2 && (
            <div key="step2" className="card-animate">
              <div className="bg-white rounded-3xl p-8" style={{ boxShadow: '0 4px 24px rgba(28,61,90,0.08)', border: '1px solid rgba(201,169,97,0.15)' }}>
                <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
                  Upload Documents
                </h2>
                <p className="text-xs mb-6" style={{ color: '#616161' }}>
                  All four documents are required for approval. Accepted formats: PDF, JPG, PNG.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {DOC_CONFIG.map(d => (
                    <UploadBox
                      key={d.key}
                      docKey={d.key}
                      label={d.label}
                      description={d.description}
                      icon={d.icon}
                      file={docs[d.key]}
                      onChange={handleDocChange}
                    />
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    aria-label="Back to contact info"
                    className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-70"
                    style={{ backgroundColor: 'transparent', color: '#616161', border: '1px solid #e0ddd8' }}>
                    ← Back
                  </button>
                  <button
                    type="button"
                    disabled={!step2Valid}
                    onClick={() => setStep(3)}
                    aria-label="Continue to review and submit"
                    className="flex-1 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0', letterSpacing: '0.1em' }}>
                    Next: Review →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Step 3: Review & Submit ── */}
          {step === 3 && (
            <div key="step3" className="card-animate">
              <div className="bg-white rounded-3xl p-8" style={{ boxShadow: '0 4px 24px rgba(28,61,90,0.08)', border: '1px solid rgba(201,169,97,0.15)' }}>
                <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
                  Review & Submit
                </h2>
                <p className="text-xs mb-6" style={{ color: '#616161' }}>Please confirm your information before submitting.</p>

                {/* Summary */}
                <div className="rounded-2xl p-5 mb-6 space-y-3" style={{ backgroundColor: '#f9f8f5', border: '1px solid rgba(201,169,97,0.15)' }}>
                  {[
                    ['Name', fullName],
                    ['Business', businessName || '—'],
                    ['Email', email],
                    ['Phone', phone],
                    ['License #', licenseNumber || '—'],
                    ['Category', category],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm gap-4">
                      <span className="font-semibold flex-shrink-0" style={{ color: '#1C3D5A', minWidth: 100 }}>{k}</span>
                      <span className="text-right" style={{ color: '#555' }}>{v}</span>
                    </div>
                  ))}

                  {/* Insurance summary */}
                  <div className="pt-2 mt-1 border-t" style={{ borderColor: 'rgba(201,169,97,0.2)' }}>
                    <p className="text-xs font-semibold mb-2 flex items-center gap-1" style={{ color: '#1C3D5A' }}>
                      🛡️ Insurance
                    </p>
                    {[
                      ['Provider', insuranceCompany],
                      ['Policy #', insurancePolicyNumber],
                      ['Expires', insuranceExpiry || '—'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm gap-4 mb-1">
                        <span className="font-semibold flex-shrink-0" style={{ color: '#1C3D5A', minWidth: 100 }}>{k}</span>
                        <span className="text-right" style={{ color: '#555' }}>{v}</span>
                      </div>
                    ))}
                  </div>

                  {notes && (
                    <div className="pt-2 border-t text-sm" style={{ borderColor: 'rgba(201,169,97,0.2)' }}>
                      <span className="font-semibold" style={{ color: '#1C3D5A' }}>Notes </span>
                      <span style={{ color: '#555' }}>{notes}</span>
                    </div>
                  )}

                  <div className="pt-2 mt-1 border-t" style={{ borderColor: 'rgba(201,169,97,0.2)' }}>
                    <p className="text-xs font-semibold mb-2" style={{ color: '#1C3D5A' }}>Documents</p>
                    <div className="flex flex-wrap gap-2">
                      {DOC_CONFIG.map(d => (
                        <span key={d.key} className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
                          style={{ backgroundColor: 'rgba(201,169,97,0.15)', color: '#1C3D5A' }}>
                          ✓ {d.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {error && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="mb-4 px-4 py-3 rounded-xl text-sm"
                    style={{ backgroundColor: 'rgba(176,58,46,0.08)', color: '#B03A2E', border: '1px solid rgba(176,58,46,0.2)' }}
                  >
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    aria-label="Back to upload documents"
                    className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-70"
                    style={{ backgroundColor: 'transparent', color: '#616161', border: '1px solid #e0ddd8' }}>
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    onClick={handleSubmit}
                    aria-disabled={submitting}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all duration-200 hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: '#C9A961', color: '#1C3D5A', letterSpacing: '0.1em' }}>
                    {submitting ? 'Submitting…' : 'Submit Application'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Trust line */}
        <p className="text-center text-xs mt-8" style={{ color: '#aaa' }}>
          Your documents are stored securely and reviewed only by our team. Questions?{' '}
          <a href="tel:+16613811818" className="underline" style={{ color: '#C9A961' }}>(661) 381-1818</a>
        </p>
      </div>
    </main>
  )
}
