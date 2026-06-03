import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient, getAuthUserId } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// GET — fetch conversation between two users, or all conversations for a user
export async function GET(req: NextRequest) {
  const authUserId = await getAuthUserId(req)
  if (!authUserId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const userId    = authUserId  // always use the verified user, not a query param
  const otherId   = searchParams.get('other_id')
  const inboxOnly = searchParams.get('inbox')

  if (!userId) return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })

  const db = createServiceClient()

  if (inboxOnly) {
    // Return latest message per conversation partner
    const { data, error } = await db
      .from('direct_messages')
      .select('*, sender:profiles!direct_messages_sender_id_fkey(id,display_name), receiver:profiles!direct_messages_receiver_id_fkey(id,display_name)')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Deduplicate — one entry per conversation partner
    const seen = new Set<string>()
    const conversations = (data ?? []).filter(m => {
      const partnerId = m.sender_id === userId ? m.receiver_id : m.sender_id
      if (seen.has(partnerId)) return false
      seen.add(partnerId)
      return true
    })

    return NextResponse.json({ conversations })
  }

  if (!otherId) return NextResponse.json({ error: 'Missing other_id' }, { status: 400 })

  const { data, error } = await db
    .from('direct_messages')
    .select('*, sender:profiles!direct_messages_sender_id_fkey(id,display_name), receiver:profiles!direct_messages_receiver_id_fkey(id,display_name)')
    .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherId}),and(sender_id.eq.${otherId},receiver_id.eq.${userId})`)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Mark received messages as read
  await db.from('direct_messages')
    .update({ read: true })
    .eq('receiver_id', userId)
    .eq('sender_id', otherId)
    .eq('read', false)

  return NextResponse.json({ messages: data })
}

// POST — send a message
export async function POST(req: NextRequest) {
  const authUserId = await getAuthUserId(req)
  if (!authUserId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { receiver_id, body } = await req.json()
    if (!receiver_id || !body?.trim()) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }
    if (authUserId === receiver_id) {
      return NextResponse.json({ error: 'Cannot message yourself' }, { status: 400 })
    }
    const db = createServiceClient()
    const { data, error } = await db
      .from('direct_messages')
      .insert({ sender_id: authUserId, receiver_id, body: body.trim() })
      .select('*, sender:profiles!direct_messages_sender_id_fkey(id,display_name)')
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ message: data })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
