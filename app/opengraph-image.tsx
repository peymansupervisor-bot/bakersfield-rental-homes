import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Bakersfield Rental Homes — Houses & Homes For Rent in Bakersfield CA'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1C3D5A',
          padding: '60px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#C9A961', marginRight: '16px' }} />
          <span style={{ color: '#C9A961', fontSize: '18px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Bakersfield, CA
          </span>
        </div>
        <div style={{ color: '#F7F5F0', fontSize: '64px', fontWeight: 700, textAlign: 'center', lineHeight: 1.1, marginBottom: '24px' }}>
          Bakersfield Rental Homes
        </div>
        <div style={{ color: 'rgba(247,245,240,0.7)', fontSize: '24px', textAlign: 'center', maxWidth: '700px', lineHeight: 1.4 }}>
          Quality houses &amp; homes for rent in Bakersfield, CA
        </div>
        <div style={{ display: 'flex', gap: '40px', marginTop: '48px' }}>
          {['100% Occupied', '24hr Response', '3yr+ Avg. Tenancy'].map((stat) => (
            <div key={stat} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ color: '#C9A961', fontSize: '14px', letterSpacing: '0.1em' }}>{stat}</span>
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: '32px', color: 'rgba(247,245,240,0.4)', fontSize: '16px' }}>
          bakersfieldrentalhomes.com
        </div>
      </div>
    ),
    { ...size }
  )
}
