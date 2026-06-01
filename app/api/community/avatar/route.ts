import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { createServiceClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const userId = formData.get('user_id') as string | null
    if (!file) return NextResponse.json({ error: 'Missing file' }, { status: 400 })
    if (!userId) return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())
    const processed = await sharp(buffer)
      .rotate()
      .resize(400, 400, { fit: 'cover' })
      .jpeg({ quality: 85 })
      .toBuffer()

    const path = `avatars/${userId}.jpg`
    const db = createServiceClient()
    const { error } = await db.storage
      .from('community-photos')
      .upload(path, processed, { contentType: 'image/jpeg', upsert: true })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const { data: { publicUrl } } = db.storage.from('community-photos').getPublicUrl(path)
    const publicUrlWithBust = `${publicUrl}?t=${Date.now()}`

    const { error: updateErr } = await db
      .from('profiles')
      .update({ avatar_url: publicUrlWithBust })
      .eq('id', userId)

    if (updateErr) return NextResponse.json({ error: updateErr.message }, { status: 500 })

    return NextResponse.json({ url: publicUrlWithBust })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 })
  }
}
