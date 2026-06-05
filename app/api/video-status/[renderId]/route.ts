import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET(
  _req: NextRequest,
  { params }: { params: { renderId: string } }
) {
  const { renderId } = params

  const res = await fetch(`https://api.shotstack.io/stage/render/${renderId}`, {
    headers: { 'x-api-key': process.env.SHOTSTACK_API_KEY! },
    cache: 'no-store',
  })

  if (!res.ok) return NextResponse.json({ status: 'unknown' })

  const data = await res.json()
  const status: string = data?.response?.status ?? 'unknown'
  const url: string | null = data?.response?.url ?? null

  if (status === 'done' && url) {
    const db = createServiceClient()
    await db
      .from('listings')
      .update({ video_url: url, video_status: 'done' })
      .eq('video_render_id', renderId)
  } else if (status === 'failed') {
    const db = createServiceClient()
    await db
      .from('listings')
      .update({ video_status: 'failed' })
      .eq('video_render_id', renderId)
  }

  return NextResponse.json({ status, url })
}
