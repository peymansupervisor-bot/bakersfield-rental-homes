import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient, getAuthUserId } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const post_id = searchParams.get('post_id')
  if (!post_id) return NextResponse.json({ error: 'Missing post_id' }, { status: 400 })
  const db = createServiceClient()
  const { data, error } = await db
    .from('community_comments')
    .select('*, profiles(display_name, avatar_url)')
    .eq('post_id', post_id)
    .order('created_at', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ comments: data })
}

export async function POST(req: NextRequest) {
  const authUserId = await getAuthUserId(req)
  if (!authUserId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { post_id, body: commentBody } = body
    if (!post_id || !commentBody) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const db = createServiceClient()
    const { data, error } = await db
      .from('community_comments')
      .insert({ post_id, user_id: authUserId, body: commentBody })
      .select('*, profiles(display_name, avatar_url)')
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ comment: data })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function PATCH(req: NextRequest) {
  const authUserId = await getAuthUserId(req)
  if (!authUserId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id, body } = await req.json()
    if (!id || !body) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    const db = createServiceClient()
    const { error } = await db.from('community_comments').update({ body }).eq('id', id).eq('user_id', authUserId)
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
  const { error } = await db.from('community_comments').delete().eq('id', id).eq('user_id', authUserId)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
