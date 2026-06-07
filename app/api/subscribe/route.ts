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

  if (error && error.code !== '23505') {
    console.error('Supabase subscribe error:', error)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }

  // Only send welcome email on fresh signups — skip duplicates (23505 = unique violation)
  if (error?.code === '23505') {
    return NextResponse.json({ success: true })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Bakersfield Rental Homes <noreply@bakersfieldrentalhomes.com>',
      to: email,
      subject: "You're on the list — Bakersfield Rental Homes",
      text: `Thanks for signing up!\n\nWe'll notify you as soon as new rental homes become available in Bakersfield.\n\nBrowse current listings: https://bakersfieldrentalhomes.com/listings\n\n— Bakersfield Rental Homes\n(661) 381-1818`,
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f0ece4;font-family:Georgia,serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0ece4;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Header -->
        <tr>
          <td align="center" style="background-color:#1C3D5A;border-radius:16px 16px 0 0;padding:36px 40px 28px;">
            <!-- Logo mark -->
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:middle;padding-right:12px;">
                  <div style="width:36px;height:36px;background-color:#C9A961;border-radius:50%;text-align:center;line-height:36px;">
                    <span style="color:#1C3D5A;font-size:18px;font-weight:bold;">⌂</span>
                  </div>
                </td>
                <td style="vertical-align:middle;text-align:left;">
                  <div style="color:#ffffff;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">BAKERSFIELD</div>
                  <div style="color:#C9A961;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;">RENTAL HOMES</div>
                </td>
              </tr>
            </table>

            <div style="margin-top:28px;">
              <p style="margin:0 0 8px;color:#C9A961;font-family:Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;">You're on the list</p>
              <h1 style="margin:0;color:#F7F5F0;font-family:Georgia,serif;font-size:32px;font-weight:700;line-height:1.2;letter-spacing:-0.02em;">First to know.<br>First to move in.</h1>
            </div>
          </td>
        </tr>

        <!-- Gold bar -->
        <tr><td style="height:4px;background:linear-gradient(to right,#C9A961,#e8c97a,#C9A961);"></td></tr>

        <!-- Body -->
        <tr>
          <td style="background-color:#ffffff;padding:40px 40px 32px;">
            <p style="margin:0 0 20px;color:#2B2B2B;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;">
              Thanks for signing up. We'll send you a heads-up the moment a new rental home becomes available in Bakersfield — before it's posted anywhere else.
            </p>

            <!-- Stats row -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;border:1px solid rgba(201,169,97,0.25);border-radius:12px;overflow:hidden;">
              <tr>
                <td width="33%" align="center" style="padding:20px 10px;border-right:1px solid rgba(201,169,97,0.2);">
                  <div style="color:#C9A961;font-family:Georgia,serif;font-size:24px;font-weight:700;">100%</div>
                  <div style="color:#1C3D5A;font-family:Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin-top:4px;">Occupied</div>
                </td>
                <td width="33%" align="center" style="padding:20px 10px;border-right:1px solid rgba(201,169,97,0.2);">
                  <div style="color:#C9A961;font-family:Georgia,serif;font-size:24px;font-weight:700;">24hr</div>
                  <div style="color:#1C3D5A;font-family:Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin-top:4px;">Response</div>
                </td>
                <td width="33%" align="center" style="padding:20px 10px;">
                  <div style="color:#C9A961;font-family:Georgia,serif;font-size:24px;font-weight:700;">3yr+</div>
                  <div style="color:#1C3D5A;font-family:Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin-top:4px;">Avg. Tenancy</div>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 28px;color:#2B2B2B;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;">
              In the meantime, browse what's currently available and see what Bakersfield Rental Homes is all about.
            </p>

            <!-- CTA Button -->
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td align="center">
                  <a href="https://bakersfieldrentalhomes.com/listings"
                    style="display:inline-block;background-color:#1C3D5A;color:#F7F5F0;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;padding:16px 40px;border-radius:50px;">
                    Browse Current Listings
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:#1C3D5A;border-radius:0 0 16px 16px;padding:28px 40px;text-align:center;">
            <p style="margin:0 0 6px;color:rgba(247,245,240,0.9);font-family:Georgia,serif;font-size:14px;">
              Bakersfield Rental Homes
            </p>
            <a href="tel:+16613811818" style="color:#C9A961;font-family:Arial,sans-serif;font-size:12px;text-decoration:none;">(661) 381-1818</a>
            <p style="margin:16px 0 0;color:rgba(247,245,240,0.3);font-family:Arial,sans-serif;font-size:11px;">
              You're receiving this because you signed up at bakersfieldrentalhomes.com
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`,
    })
  } catch (err) {
    console.error('Resend subscribe email error:', err)
  }

  return NextResponse.json({ success: true })
}
