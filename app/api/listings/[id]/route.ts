import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const db = createServiceClient()
  const { data, error } = await db
    .from('listings')
    .select('*')
    .eq('id', params.id)
    .eq('status', 'active')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json({ listing: data })
}
