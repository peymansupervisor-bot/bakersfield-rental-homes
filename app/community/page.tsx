import type { Metadata } from 'next'
import { createServiceClient } from '@/lib/supabase'
import CommunityClient from './CommunityClient'

export const metadata: Metadata = {
  title: 'Community Forum | Bakersfield Rental Homes',
  description: 'Connect with local landlords and tenants in Bakersfield, CA. Ask questions, share tips, and stay informed about the local rental market.',
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/community' },
  openGraph: {
    title: 'Community Forum | Bakersfield Rental Homes',
    description: 'Connect with local landlords and tenants in Bakersfield, CA. Ask questions, share tips, and stay informed about the local rental market.',
    url: 'https://bakersfieldrentalhomes.com/community',
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Bakersfield Rental Homes Community' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Community Forum | Bakersfield Rental Homes',
    description: 'Connect with local landlords and tenants in Bakersfield, CA.',
    images: ['/opengraph-image'],
  },
}

async function getInitialPosts() {
  try {
    const db = createServiceClient()
    const { data } = await db
      .from('community_posts')
      .select('*, profiles(display_name, avatar_url), community_comments(count)')
      .eq('is_flagged', false)
      .order('created_at', { ascending: false })
      .limit(50)
    return data ?? []
  } catch {
    return []
  }
}

export const revalidate = 60

export default async function CommunityPage() {
  const initialPosts = await getInitialPosts()
  return <CommunityClient initialPosts={initialPosts} />
}
