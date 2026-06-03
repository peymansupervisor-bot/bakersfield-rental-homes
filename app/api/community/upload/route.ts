import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { createServiceClient, getAuthUserId } from '@/lib/supabase'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB

export async function POST(req: NextRequest) {
  const authUserId = await getAuthUserId(req)
  if (!authUserId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'Missing file' }, { status: 400 })
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'File too large (max 10 MB)' }, { status: 413 })

    const buffer = Buffer.from(await file.arrayBuffer())
    const processed = await sharp(buffer)
      .rotate()
      .resize(1200, 900, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, progressive: true })
      .toBuffer()

    const path = `posts/${Date.now()}.jpg`
    const db = createServiceClient()
    const { error } = await db.storage
      .from('community-photos')
      .upload(path, processed, { contentType: 'image/jpeg', upsert: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    const { data: { publicUrl } } = db.storage.from('community-photos').getPublicUrl(path)
    return NextResponse.json({ url: publicUrl })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 })
  }
}
