import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, phone } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await supabase
    .from('subscribers')
    .insert({ email, phone: phone || null, source: 'homepage' })

  if (error) {
    if (error.code === '23505') {
      // Already subscribed — treat as success so we don't leak info
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }

  // Send welcome email
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Bakersfield Rental Homes <onboarding@resend.dev>',
      to: email,
      subject: "You're on the list — Bakersfield Rental Homes",
      text: `Thanks for signing up!\n\nWe'll notify you as soon as new rental homes become available in Bakersfield.\n\nIn the meantime, browse current listings at bakersfieldrentalhomes.com/listings.\n\n— Bakersfield Rental Homes\n(661) 381-1818`,
    })
  } catch {
    // Welcome email failure is non-fatal — subscriber is already saved
  }

  return NextResponse.json({ success: true })
}
