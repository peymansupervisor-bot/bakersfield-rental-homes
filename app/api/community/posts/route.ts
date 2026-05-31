import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

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
  return NextResponse.json({ posts: data })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { user_id, category, title, body: postBody, photo_url, contact_email } = body
    if (!user_id || !category || !title || !postBody) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const db = createServiceClient()
    const { data, error } = await db
      .from('community_posts')
      .insert({ user_id, category, title, body: postBody, photo_url, contact_email })
      .select('id')
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ id: data.id })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, user_id, title, body } = await req.json()
    if (!id || !user_id) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    const db = createServiceClient()
    const { error } = await db.from('community_posts').update({ title, body }).eq('id', id).eq('user_id', user_id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const user_id = searchParams.get('user_id')
  if (!id || !user_id) return NextResponse.json({ error: 'Missing id or user_id' }, { status: 400 })
  const db = createServiceClient()
  const { error } = await db.from('community_posts').delete().eq('id', id).eq('user_id', user_id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
