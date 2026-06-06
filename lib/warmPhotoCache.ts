/**
 * Pre-warms Vercel's Next.js image optimizer cache for all listing photos.
 * Called after a listing is activated so visitors never see a grey loading box.
 * Runs fire-and-forget — failures are logged but never block the response.
 */
export async function warmPhotoCache(photos: string[]): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bakersfieldrentalhomes.com'
  // Cover the widths Next.js actually requests for the main gallery and lightbox
  const widths = [828, 1080, 1200]

  const requests = photos.flatMap(photoUrl =>
    widths.map(w => {
      const optimizerUrl = `${baseUrl}/_next/image?url=${encodeURIComponent(photoUrl)}&w=${w}&q=88`
      return fetch(optimizerUrl, { method: 'GET' }).catch(err =>
        console.error('[warmPhotoCache] failed:', optimizerUrl, err.message)
      )
    })
  )

  await Promise.allSettled(requests)
}
