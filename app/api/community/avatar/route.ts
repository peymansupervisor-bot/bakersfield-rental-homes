import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { createServiceClient, getAuthUserId } from '@/lib/supabase'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

export async function POST(req: NextRequest) {
  const authUserId = await getAuthUserId(req)
  if (!authUserId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'Missing file' }, { status: 400 })
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'File too large (max 5 MB)' }, { status: 413 })
    const userId = authUserId

    const buffer = Buffer.from(await file.arrayBuffer())
    const processed = await sharp(buffer)
      .rotate()
      .resize(400, 400, { fit: 'cover' })
      .jpeg({ quality: 85 })
      .toBuffer()

    const safeUserId = userId.trim().replace(/[^a-zA-Z0-9_-]/g, '_')
    const path = `avatars/${safeUserId}.jpg`
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
