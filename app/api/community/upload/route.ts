import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { createServiceClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'Missing file' }, { status: 400 })

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
