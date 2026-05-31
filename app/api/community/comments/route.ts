import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

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
  try {
    const body = await req.json()
    const { post_id, user_id, body: commentBody } = body
    if (!post_id || !user_id || !commentBody) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const db = createServiceClient()
    const { data, error } = await db
      .from('community_comments')
      .insert({ post_id, user_id, body: commentBody })
      .select('*, profiles(display_name, avatar_url)')
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ comment: data })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
