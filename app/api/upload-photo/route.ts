import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { createServiceClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const path = formData.get('path') as string | null

    if (!file || !path) {
      return NextResponse.json({ error: 'Missing file or path' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const processed = await sharp(buffer)
      .rotate()                          // apply EXIF orientation first
      .resize(1600, 1200, {
        fit: 'inside',                   // preserve aspect ratio (portrait stays portrait)
        withoutEnlargement: true,        // never upscale smaller images
      })
      .jpeg({ quality: 85, progressive: true })
      .toBuffer()

    const db = createServiceClient()
    const { error } = await db.storage
      .from('listing-photos')
      .upload(path, processed, { contentType: 'image/jpeg', upsert: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const { data: { publicUrl } } = db.storage.from('listing-photos').getPublicUrl(path)
    return NextResponse.json({ url: publicUrl })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 })
  }
}
