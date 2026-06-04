import { createServiceClient } from '@/lib/supabase'
import CommunityClient from './CommunityClient'

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
