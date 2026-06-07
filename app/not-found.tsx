import Link from 'next/link'

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: '#F7F5F0' }}>

      {/* Niko + Picasso together */}
      <div className="flex items-end justify-center gap-2 mb-2">
        <img
          src="/niko/niko-nobg.png"
          alt="Niko the dog looking confused"
          width={180}
          height={180}
          style={{ objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(28,61,90,0.15))' }}
        />
        <img
          src="/picasso/picasso-3-nobg.png"
          alt="Picasso the sun conure"
          width={110}
          height={150}
          style={{ objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(220,100,20,0.3))', marginBottom: 12 }}
        />
      </div>

      <p className="text-xs font-semibold tracking-widest uppercase mb-3"
        style={{ color: '#C9A961', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
        404 — Page Not Found
      </p>
      <h1 className="text-4xl md:text-5xl font-bold mb-4"
        style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
        Even Niko can't find it
      </h1>
      <p className="text-base max-w-sm mb-10" style={{ color: '#616161', fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}>
        Picasso flew off with that page. Let's get you back somewhere familiar.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/"
          className="px-8 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0', letterSpacing: '0.1em' }}>
          Go Home
        </Link>
        <Link href="/listings"
          className="px-8 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#C9A961', color: '#1C3D5A', letterSpacing: '0.1em' }}>
          Browse Listings
        </Link>
      </div>
    </main>
  )
}
