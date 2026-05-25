'use client'

export default function Footer() {
  return (
    <footer
      className="py-12 px-6 md:px-10"
      style={{
        backgroundColor: '#F7F5F0',
        borderTop: '1px solid rgba(201,169,97,0.2)',
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 text-center">
        {/* Logo mark */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#C9A961' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 6V14H10V10H6V14H2V6L8 2Z" fill="#1C3D5A" />
            </svg>
          </div>
          <div className="leading-none text-left">
            <p
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: '#1C3D5A', fontFamily: 'Inter, sans-serif' }}
            >
              Bakersfield
            </p>
            <p
              className="text-xs tracking-wider uppercase"
              style={{ color: '#C9A961', fontFamily: 'Inter, sans-serif' }}
            >
              Rental Homes
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p
          className="text-sm font-light tracking-wide"
          style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            color: '#1C3D5A',
            fontStyle: 'italic',
            opacity: 0.7,
          }}
        >
          Your Team. Your Property. Your Peace of Mind.
        </p>

        {/* Divider */}
        <div
          className="w-24 h-px"
          style={{ background: 'linear-gradient(to right, transparent, #C9A961, transparent)' }}
        />

        {/* Legal */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs font-light" style={{ color: '#2B2B2B', opacity: 0.5 }}>
            © 2026 Bakersfield Rental Homes. All rights reserved.
          </p>
          <p className="text-xs font-light" style={{ color: '#2B2B2B', opacity: 0.45 }}>
            Owned by Bakersfield Brokers &nbsp;|&nbsp; DRE #01726653
          </p>
        </div>
      </div>
    </footer>
  )
}
