'use client'

export default function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="py-14 px-6 md:px-10"
      style={{
        background: 'linear-gradient(135deg, #1C3D5A 0%, #0f2538 100%)',
        borderTop: '4px solid #B22234',
      }}
    >
      {/* Red / White / Navy flag stripe accent */}
      <div className="flex h-1 max-w-6xl mx-auto mb-10 rounded-full overflow-hidden" aria-hidden="true">
        <div className="flex-1" style={{ backgroundColor: '#B22234' }} />
        <div className="flex-1" style={{ backgroundColor: '#ffffff' }} />
        <div className="flex-1" style={{ backgroundColor: '#1C3D5A' }} />
        <div className="flex-1" style={{ backgroundColor: '#ffffff' }} />
        <div className="flex-1" style={{ backgroundColor: '#B22234' }} />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 text-center">
        {/* Logo mark */}
        <div className="flex items-center gap-3" aria-hidden="true">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#C9A961' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
              <path d="M8 2L14 6V14H10V10H6V14H2V6L8 2Z" fill="#1C3D5A" />
            </svg>
          </div>
          <div className="leading-none text-left">
            <p className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
              Bakersfield
            </p>
            <p className="text-xs tracking-wider uppercase"
              style={{ color: '#C9A961', fontFamily: 'Inter, sans-serif' }}>
              Rental Homes
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p
          className="text-lg md:text-xl font-semibold max-w-xl leading-relaxed"
          style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            color: '#ffffff',
          }}
        >
          One Bakersfield. One community. Together we grow stronger.
        </p>
        <p
          className="text-sm font-light max-w-lg leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif' }}
        >
          Rooted in hard work, driven by pride, and united by the belief that when neighbors lift each other up — the whole city rises.
        </p>

        {/* Flag-colored divider */}
        <div className="flex items-center gap-2 my-1" aria-hidden="true">
          <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: '#B22234' }} />
          <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: '#ffffff' }} />
          <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: '#C9A961' }} />
          <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: '#ffffff' }} />
          <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: '#B22234' }} />
        </div>

        {/* Legal */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.4)' }}>
            © 2026 Bakersfield Rental Homes. All rights reserved.
          </p>
          <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Owned by Bakersfield Brokers &nbsp;|&nbsp; DRE #01726653
          </p>
        </div>
      </div>
    </footer>
  )
}
