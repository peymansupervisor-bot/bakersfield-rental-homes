/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/los-angeles', destination: '/listings', permanent: true },
    ]
  },
  devIndicators: { buildActivity: false, appIsrStatus: false },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uosxqpoxpzrqfazphhhd.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
