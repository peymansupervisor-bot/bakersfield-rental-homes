import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient, getAuthUserId } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const db = createServiceClient()
  let query = db
    .from('community_posts')
    .select('*, profiles(display_name, avatar_url), community_comments(count)')
    .eq('is_flagged', false)
    .order('created_at', { ascending: false })
    .limit(50)
  if (category && category !== 'all') query = query.eq('category', category)
  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ posts: data }, {
    headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' },
  })
}

export async function POST(req: NextRequest) {
  const authUserId = await getAuthUserId(req)
  if (!authUserId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { category, title, body: postBody, photo_url, contact_email } = body
    if (!category || !title || !postBody) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const db = createServiceClient()
    const { data, error } = await db
      .from('community_posts')
      .insert({ user_id: authUserId, category, title, body: postBody, photo_url, contact_email })
      .select('id')
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ id: data.id })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function PATCH(req: NextRequest) {
  const authUserId = await getAuthUserId(req)
  if (!authUserId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id, title, body, photo_url } = await req.json()
    if (!id) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    const db = createServiceClient()
    const updates: Record<string, unknown> = { title, body }
    if (photo_url !== undefined) updates.photo_url = photo_url
    const { error } = await db.from('community_posts').update(updates).eq('id', id).eq('user_id', authUserId)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function DELETE(req: NextRequest) {
  const authUserId = await getAuthUserId(req)
  if (!authUserId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const db = createServiceClient()
  const { error } = await db.from('community_posts').delete().eq('id', id).eq('user_id', authUserId)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
