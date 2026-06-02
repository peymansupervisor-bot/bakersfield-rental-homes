import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const BOT_RESPONSES: Record<string, string> = {
  default: "Thanks for reaching out! We typically respond within a few hours. Want to leave your email so we can follow up?",
  greeting: "Hi there! 👋 I'm here to help. Are you looking to rent a home, or do you have a property to list?",
  rent: "Great! You can browse all available Bakersfield rentals at bakersfieldrentalhomes.com/listings. Want me to connect you with someone directly?",
  list: "We'd love to help you list your property. Head to bakersfieldrentalhomes.com/list to get started, or leave your contact info and we'll reach out.",
  pet: "Yes — many of our homes are pet-friendly with fenced yards. Filter by 'Pets Allowed' on the listings page, or ask us directly.",
  price: "Rental prices vary by property. Browse current listings at bakersfieldrentalhomes.com/listings for up-to-date pricing.",
  apply: "To apply for a home, find a listing you like at bakersfieldrentalhomes.com/listings and contact the landlord directly through the listing.",
  hours: "We answer within 24 hours, 7 days a week. You can also call us directly at (661) 381-1818.",
  contact: "You can reach us at (661) 381-1818 or use the contact form at the bottom of this page.",
  thanks: "You're welcome! Is there anything else I can help you with?",
  school: "We have rentals near several Bakersfield school districts — Panama-Buena Vista, Bakersfield City, Kern High, Fruitvale, Rosedale Union, and Norris. Filter by district on the listings page.",
  lease: "Most of our homes offer 12-month leases. Some landlords are flexible — check individual listings or ask us directly.",
  deposit: "Deposits vary by landlord and property. Typical deposits are equal to one month's rent. Details are listed on each property page.",
  neighborhood: "We have homes across Bakersfield — Northwest, Southwest, East, and Central areas. Use the map view on the listings page to explore neighborhoods.",
  parking: "Parking options vary by property — driveway, garage, or street. Each listing shows the parking details.",
  maintenance: "All our landlords are responsive to maintenance requests. We also have licensed vendors for gardening, pool, HVAC, and handyman work available 24/7.",
  utilities: "Utility arrangements vary by property. Some include water or trash — check individual listings for details.",
  bedroom: "We have 2, 3, and 4-bedroom homes available. Use the bedroom filter on the listings page to find the right fit.",
  sqft: "Our homes range in size. Each listing shows the square footage — browse at bakersfieldrentalhomes.com/listings.",
  community: "We have an active Facebook community with 11,900+ Bakersfield renters and investors. Join at bakersfieldrentalhomes.com/community.",
}

function getBotReply(message: string): string {
  const msg = message.toLowerCase()
  if (/\b(hi|hello|hey|howdy|good morning|good afternoon|good evening)\b/.test(msg)) return BOT_RESPONSES.greeting
  if (/\b(school|district|education|kids|children)\b/.test(msg)) return BOT_RESPONSES.school
  if (/\b(lease|term|month.to.month|contract|agreement)\b/.test(msg)) return BOT_RESPONSES.lease
  if (/\b(deposit|security|upfront|move.in cost)\b/.test(msg)) return BOT_RESPONSES.deposit
  if (/\b(neighborhood|area|location|part of town|where)\b/.test(msg)) return BOT_RESPONSES.neighborhood
  if (/\b(parking|garage|driveway|car|vehicle)\b/.test(msg)) return BOT_RESPONSES.parking
  if (/\b(maintenance|repair|fix|broken|issue|problem)\b/.test(msg)) return BOT_RESPONSES.maintenance
  if (/\b(utilities|water|electric|gas|trash|included)\b/.test(msg)) return BOT_RESPONSES.utilities
  if (/\b(bedroom|bed|br|bath|bathroom)\b/.test(msg)) return BOT_RESPONSES.bedroom
  if (/\b(sqft|square feet|square foot|size|big|large|small)\b/.test(msg)) return BOT_RESPONSES.sqft
  if (/\b(community|facebook|group|neighbors|forum)\b/.test(msg)) return BOT_RESPONSES.community
  if (/\b(list|landlord|owner|property|manage|management)\b/.test(msg)) return BOT_RESPONSES.list
  if (/\b(pet|dog|cat|animal)\b/.test(msg)) return BOT_RESPONSES.pet
  if (/\b(price|cost|how much|deposit|fee|afford|cheap|expensive)\b/.test(msg)) return BOT_RESPONSES.price
  if (/\b(apply|application|how do i|process|qualify|credit|income)\b/.test(msg)) return BOT_RESPONSES.apply
  if (/\b(hour|open|when|schedule|respond|response time)\b/.test(msg)) return BOT_RESPONSES.hours
  if (/\b(contact|call|phone|email|reach|talk|speak)\b/.test(msg)) return BOT_RESPONSES.contact
  if (/\b(thank|thanks|great|perfect|awesome|wonderful|helpful)\b/.test(msg)) return BOT_RESPONSES.thanks
  if (/\b(rent|find|looking|search|available|vacancy|vacancies|home|house|apartment|rental)\b/.test(msg)) return BOT_RESPONSES.rent
  return BOT_RESPONSES.default
}

const HANDOFF_EMAIL_HTML = (name: string, email: string) => `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f0ece4;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0ece4;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr>
          <td align="center" style="background-color:#1C3D5A;border-radius:16px 16px 0 0;padding:36px 40px 28px;">
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
              <p style="margin:0 0 8px;color:#C9A961;font-family:Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;">We got your message</p>
              <h1 style="margin:0;color:#F7F5F0;font-family:Georgia,serif;font-size:28px;font-weight:700;line-height:1.2;">We'll be in touch soon${name ? `, ${name.split(' ')[0]}` : ''}.</h1>
            </div>
          </td>
        </tr>
        <tr><td style="height:4px;background:linear-gradient(to right,#C9A961,#e8c97a,#C9A961);"></td></tr>
        <tr>
          <td style="background-color:#ffffff;padding:40px 40px 32px;">
            <p style="margin:0 0 20px;color:#2B2B2B;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;">
              Thanks for chatting with us. One of our team members will follow up at <strong>${email}</strong> within a few hours.
            </p>
            <p style="margin:0 0 28px;color:#2B2B2B;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;">
              In the meantime, you can browse available homes or explore our community:
            </p>
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td align="center" style="padding-bottom:12px;">
                  <a href="https://bakersfieldrentalhomes.com/listings"
                    style="display:inline-block;background-color:#1C3D5A;color:#F7F5F0;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;padding:14px 36px;border-radius:50px;">
                    Browse Listings
                  </a>
                </td>
              </tr>
              <tr>
                <td align="center">
                  <a href="tel:+16613811818" style="color:#1C3D5A;font-family:Arial,sans-serif;font-size:13px;text-decoration:none;">
                    Or call us directly: (661) 381-1818
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:#1C3D5A;border-radius:0 0 16px 16px;padding:28px 40px;text-align:center;">
            <p style="margin:0 0 6px;color:rgba(247,245,240,0.9);font-family:Georgia,serif;font-size:14px;">Bakersfield Rental Homes</p>
            <a href="tel:+16613811818" style="color:#C9A961;font-family:Arial,sans-serif;font-size:12px;text-decoration:none;">(661) 381-1818</a>
            <p style="margin:16px 0 0;color:rgba(247,245,240,0.3);font-family:Arial,sans-serif;font-size:11px;">
              You're receiving this because you chatted with us at bakersfieldrentalhomes.com
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

export async function POST(req: Request) {
  try {
    const { message, sessionId, name, email } = await req.json()

    if (!message || !sessionId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    await supabase.from('chat_messages').insert({
      session_id: sessionId, role: 'user', message, name: name || null, email: email || null,
    })

    const botReply = getBotReply(message)

    await supabase.from('chat_messages').insert({
      session_id: sessionId, role: 'bot', message: botReply,
    })

    if (email) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        // Notify owner
        await resend.emails.send({
          from: 'Bakersfield Rental Homes Chat <noreply@bakersfieldrentalhomes.com>',
          to: 'peymansupervisor@gmail.com',
          replyTo: email,
          subject: `New chat message from ${name || email}`,
          text: `Name: ${name || 'Not provided'}\nEmail: ${email}\n\nMessage:\n${message}\n\nBot replied:\n${botReply}`,
        })
        // Send handoff email to visitor
        await resend.emails.send({
          from: 'Bakersfield Rental Homes <noreply@bakersfieldrentalhomes.com>',
          to: email,
          subject: "We got your message — Bakersfield Rental Homes",
          text: `Hi${name ? ` ${name.split(' ')[0]}` : ''},\n\nThanks for chatting with us. One of our team members will follow up at ${email} within a few hours.\n\nIn the meantime, browse listings at bakersfieldrentalhomes.com/listings or call us at (661) 381-1818.\n\n— Bakersfield Rental Homes`,
          html: HANDOFF_EMAIL_HTML(name || '', email),
        })
      } catch {
        // Non-fatal
      }
    }

    return NextResponse.json({ reply: botReply })
  } catch {
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 })
  }
}
