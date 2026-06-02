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
}

function getBotReply(message: string): string {
  const msg = message.toLowerCase()
  if (/\b(hi|hello|hey|howdy|good morning|good afternoon)\b/.test(msg)) return BOT_RESPONSES.greeting
  if (/\b(rent|find|looking|search|available|vacancy|vacancies|home|house|apartment)\b/.test(msg)) return BOT_RESPONSES.rent
  if (/\b(list|landlord|owner|property|manage|management)\b/.test(msg)) return BOT_RESPONSES.list
  if (/\b(pet|dog|cat|animal)\b/.test(msg)) return BOT_RESPONSES.pet
  if (/\b(price|cost|how much|rent|deposit|fee)\b/.test(msg)) return BOT_RESPONSES.price
  if (/\b(apply|application|how do i|process)\b/.test(msg)) return BOT_RESPONSES.apply
  if (/\b(hour|open|available|when|schedule)\b/.test(msg)) return BOT_RESPONSES.hours
  if (/\b(contact|call|phone|email|reach)\b/.test(msg)) return BOT_RESPONSES.contact
  if (/\b(thank|thanks|great|perfect|awesome|wonderful)\b/.test(msg)) return BOT_RESPONSES.thanks
  return BOT_RESPONSES.default
}

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

    // Save user message
    await supabase.from('chat_messages').insert({
      session_id: sessionId,
      role: 'user',
      message,
      name: name || null,
      email: email || null,
    })

    const botReply = getBotReply(message)

    // Save bot reply
    await supabase.from('chat_messages').insert({
      session_id: sessionId,
      role: 'bot',
      message: botReply,
    })

    // Email notification on first message in session (when name/email provided)
    if (email) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: 'Bakersfield Rental Homes Chat <noreply@bakersfieldrentalhomes.com>',
          to: 'peymansupervisor@gmail.com',
          replyTo: email,
          subject: `New chat message from ${name || email}`,
          text: `Name: ${name || 'Not provided'}\nEmail: ${email}\n\nMessage:\n${message}\n\nBot replied:\n${botReply}`,
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
