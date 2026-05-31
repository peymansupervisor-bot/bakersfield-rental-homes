/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
