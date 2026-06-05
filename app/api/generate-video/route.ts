import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

const ELEVENLABS_VOICE_ID = 'ErXwobaYiN019PkySvjV' // "Antoni" – warm, professional male voice
const SHOTSTACK_URL = 'https://api.shotstack.io/stage/render'

export async function POST(req: NextRequest) {
  const { listingId } = await req.json()
  if (!listingId) return NextResponse.json({ error: 'Missing listingId' }, { status: 400 })

  const db = createServiceClient()

  const { data: listing, error } = await db
    .from('listings')
    .select('*')
    .eq('id', listingId)
    .single()

  if (error || !listing) return NextResponse.json({ error: 'Listing not found' }, { status: 404 })

  if (!process.env.ELEVENLABS_API_KEY) {
    return NextResponse.json({ error: 'ELEVENLABS_API_KEY is not set in environment variables' }, { status: 500 })
  }
  if (!process.env.SHOTSTACK_API_KEY) {
    return NextResponse.json({ error: 'SHOTSTACK_API_KEY is not set in environment variables' }, { status: 500 })
  }

  // Mark as rendering immediately so UI shows spinner
  await db.from('listings').update({ video_status: 'rendering' }).eq('id', listingId)

  // ── 1. Generate voiceover with ElevenLabs ──────────────────────────────────
  const bedsLabel = listing.bedrooms === 0 ? 'a studio' : `${listing.bedrooms} bedroom${listing.bedrooms > 1 ? 's' : ''}`
  const ttsText = [
    `Welcome to ${listing.title}.`,
    listing.description,
    `This property features ${bedsLabel}, ${listing.bathrooms} bathroom${listing.bathrooms > 1 ? 's' : ''}, and ${listing.living_area_sqft.toLocaleString()} square feet of living space.`,
    `Located at ${listing.address} in ${listing.city}, California.`,
    listing.pets_allowed ? 'Pets are welcome.' : '',
    `Monthly rent is $${listing.monthly_rent.toLocaleString()}.`,
    'Contact us today to schedule a viewing.',
  ].filter(Boolean).join(' ')

  const ttsRes = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: ttsText,
        model_id: 'eleven_turbo_v2_5',
        voice_settings: { stability: 0.55, similarity_boost: 0.75 },
      }),
    }
  )

  if (!ttsRes.ok) {
    const detail = await ttsRes.text().catch(() => 'unknown')
    await db.from('listings').update({ video_status: 'failed' }).eq('id', listingId)
    return NextResponse.json({ error: `TTS generation failed (${ttsRes.status}): ${detail}` }, { status: 500 })
  }

  // Upload audio to Supabase Storage
  const audioBytes = await ttsRes.arrayBuffer()
  const audioPath = `videos/audio_${listingId}_${Date.now()}.mp3`

  const { error: uploadErr } = await db.storage
    .from('listing-photos')
    .upload(audioPath, audioBytes, { contentType: 'audio/mpeg', upsert: true })

  if (uploadErr) {
    await db.from('listings').update({ video_status: 'failed' }).eq('id', listingId)
    return NextResponse.json({ error: `Audio upload failed: ${uploadErr.message}` }, { status: 500 })
  }

  const { data: { publicUrl: audioUrl } } = db.storage.from('listing-photos').getPublicUrl(audioPath)

  // ── 2. Build Shotstack timeline ────────────────────────────────────────────
  const photos: string[] = (listing.photos ?? []).slice(0, 15)
  if (photos.length === 0) {
    await db.from('listings').update({ video_status: 'failed' }).eq('id', listingId)
    return NextResponse.json({ error: 'No photos available' }, { status: 400 })
  }

  const clipDuration = 4
  const totalDuration = photos.length * clipDuration
  const effects = ['zoomIn', 'zoomOut', 'slideLeft', 'slideRight']

  const photoClips = photos.map((url: string, i: number) => ({
    asset: { type: 'image', src: url },
    start: i * clipDuration,
    length: clipDuration + 0.5,
    effect: effects[i % effects.length],
    transition: { in: 'fade', out: 'fade' },
  }))

  // Title card — first clip
  const titleOverlay = {
    asset: {
      type: 'html',
      html: `<div style="font-family:Georgia,serif;color:#fff;text-align:center;padding:0 60px;text-shadow:2px 2px 12px rgba(0,0,0,0.85)"><p style="font-size:42px;font-weight:bold;margin:0 0 8px">${listing.title}</p><p style="font-size:26px;color:#C9A961;margin:0">${listing.city}, CA</p></div>`,
      width: 1280,
      height: 200,
    },
    start: 0,
    length: clipDuration,
    position: 'center',
    transition: { in: 'fade', out: 'fade' },
  }

  // Persistent price + specs bar at bottom
  const specsOverlay = {
    asset: {
      type: 'html',
      html: `<div style="background:rgba(28,61,90,0.82);padding:12px 32px;border-radius:8px;font-family:Georgia,serif;text-align:center"><span style="font-size:28px;font-weight:bold;color:#fff">$${listing.monthly_rent.toLocaleString()}/mo</span><span style="font-size:18px;color:#C9A961;margin-left:20px">${listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} BD`} · ${listing.bathrooms} BA · ${listing.living_area_sqft.toLocaleString()} sqft</span></div>`,
      width: 1280,
      height: 70,
    },
    start: 0,
    length: totalDuration,
    position: 'bottom',
    offset: { y: 0.06 },
    transition: { in: 'fade', out: 'fade' },
  }

  // "Direct Landlord · No Broker Fee" badge — last clip
  const badgeOverlay = {
    asset: {
      type: 'html',
      html: `<div style="background:rgba(201,169,97,0.9);padding:10px 24px;border-radius:8px;font-family:Georgia,serif;color:#1C3D5A;font-size:20px;font-weight:bold;text-align:center">Direct Landlord - No Broker Fee</div>`,
      width: 600,
      height: 60,
    },
    start: totalDuration - clipDuration,
    length: clipDuration,
    position: 'center',
    transition: { in: 'fade', out: 'fade' },
  }

  const shotstackBody = {
    timeline: {
      soundtrack: { src: audioUrl, effect: 'fadeOut', volume: 1 },
      tracks: [
        { clips: [titleOverlay, specsOverlay, badgeOverlay] },
        { clips: photoClips },
      ],
    },
    output: { format: 'mp4', resolution: 'hd', fps: 25 },
  }

  const shotstackRes = await fetch(SHOTSTACK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.SHOTSTACK_API_KEY!,
    },
    body: JSON.stringify(shotstackBody),
  })

  const shotstackData = await shotstackRes.json()
  const renderId = shotstackData?.response?.id

  if (!shotstackRes.ok || !renderId) {
    await db.from('listings').update({ video_status: 'failed' }).eq('id', listingId)
    return NextResponse.json({ error: `Shotstack render failed (${shotstackRes.status}): ${JSON.stringify(shotstackData)}` }, { status: 500 })
  }

  await db
    .from('listings')
    .update({ video_render_id: renderId, video_status: 'rendering' })
    .eq('id', listingId)

  return NextResponse.json({ renderId })
}
