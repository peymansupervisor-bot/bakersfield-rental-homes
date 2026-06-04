import CommunityClient from './CommunityClient'

async function getInitialPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bakersfieldrentalhomes.com'
    const res = await fetch(`${baseUrl}/api/community/posts`, {
      next: { revalidate: 60 }, // cache for 60 seconds
    })
    if (!res.ok) return []
    const { posts } = await res.json()
    return posts ?? []
  } catch {
    return []
  }
}

export default async function CommunityPage() {
  const initialPosts = await getInitialPosts()
  return <CommunityClient initialPosts={initialPosts} />
}
