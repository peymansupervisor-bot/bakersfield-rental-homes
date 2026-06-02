'use client'

import { useEffect, useRef, useState } from 'react'

interface Message { role: 'user' | 'bot'; text: string; quickReplies?: string[] }

const INITIAL_MESSAGE: Message = {
  role: 'bot',
  text: "Hi! 👋 Looking to rent a home or list a property in Bakersfield? I'm here to help.",
  quickReplies: ["I'm looking to rent", "I have a property to list", "I have a question"],
}

function generateSessionId() {
  return `chat_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [sessionId] = useState(generateSessionId)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [step, setStep] = useState<'chat' | 'collect'>('chat')
  const [unread, setUnread] = useState(0)
  const [quickRepliesUsed, setQuickRepliesUsed] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || sending) return
    setQuickRepliesUsed(true)
    const userMsg: Message = { role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setSending(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId, name: name || null, email: email || null }),
      })
      const data = await res.json()
      const botMsg: Message = { role: 'bot', text: data.reply || "Sorry, something went wrong. Please call us at (661) 381-1818." }
      setMessages(prev => [...prev, botMsg])
      if (!open) setUnread(u => u + 1)

      // After 2 exchanges without email, prompt for contact info
      const totalMessages = messages.length + 2
      if (!email && totalMessages >= 4) setStep('collect')
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, something went wrong. Please call us at (661) 381-1818." }])
    } finally {
      setSending(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleCollect = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('chat')
    if (name || email) {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: `Got it${name ? `, ${name.split(' ')[0]}` : ''}! We'll follow up at ${email || 'the contact info you provided'}. You'll also get a confirmation email shortly.`,
      }])
      if (email) {
        fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: `[Contact info collected] Name: ${name}, Email: ${email}`, sessionId, name, email }),
        }).catch(() => {})
      }
    }
  }

  const btnBase: React.CSSProperties = {
    padding: '7px 13px', borderRadius: '50px', border: '1px solid rgba(201,169,97,0.5)',
    backgroundColor: 'transparent', color: '#1C3D5A', fontFamily: 'Inter, sans-serif',
    fontSize: '12px', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
    transition: 'background-color 0.15s, color 0.15s',
  }

  return (
    <>
      {/* Chat panel */}
      <div
        role="dialog"
        aria-label="Live chat with Bakersfield Rental Homes"
        aria-modal="true"
        aria-hidden={!open}
        style={{
          position: 'fixed', bottom: '90px', right: '20px', width: '340px', maxWidth: 'calc(100vw - 40px)',
          backgroundColor: '#ffffff', borderRadius: '20px', zIndex: 1000,
          boxShadow: '0 20px 60px rgba(28,61,90,0.22), 0 4px 16px rgba(28,61,90,0.12)',
          border: '1px solid rgba(201,169,97,0.2)',
          display: 'flex', flexDirection: 'column',
          maxHeight: '540px',
          transform: open ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(12px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'transform 0.22s ease, opacity 0.22s ease',
          transformOrigin: 'bottom right',
        }}
      >
        {/* Header */}
        <div style={{ backgroundColor: '#1C3D5A', borderRadius: '20px 20px 0 0', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#C9A961', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 2L14 6V14H10V10H6V14H2V6L8 2Z" fill="#1C3D5A" />
              </svg>
            </div>
            <div>
              <p style={{ margin: 0, color: '#F7F5F0', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600 }}>Bakersfield Rental Homes</p>
              <p style={{ margin: 0, color: '#C9A961', fontFamily: 'Inter, sans-serif', fontSize: '11px' }}>
                <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: '#4caf50', borderRadius: '50%', marginRight: '5px', verticalAlign: 'middle' }} aria-hidden="true" />
                Typically replies within hours
              </p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close chat"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(247,245,240,0.6)', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div
          style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}
          aria-live="polite"
          aria-label="Chat messages"
        >
          {messages.map((msg, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '82%', padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  backgroundColor: msg.role === 'user' ? '#1C3D5A' : '#F7F5F0',
                  color: msg.role === 'user' ? '#F7F5F0' : '#2B2B2B',
                  fontFamily: 'Inter, sans-serif', fontSize: '13px', lineHeight: 1.55,
                  border: msg.role === 'bot' ? '1px solid rgba(201,169,97,0.15)' : 'none',
                }}>
                  {msg.text}
                </div>
              </div>
              {/* Quick reply buttons — only on last bot message, before user has typed */}
              {msg.quickReplies && !quickRepliesUsed && i === messages.length - 1 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }} role="group" aria-label="Quick reply options">
                  {msg.quickReplies.map(qr => (
                    <button
                      key={qr}
                      onClick={() => sendMessage(qr)}
                      style={btnBase}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1C3D5A'; e.currentTarget.style.color = '#F7F5F0' }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1C3D5A' }}
                    >
                      {qr}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {sending && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ padding: '10px 16px', borderRadius: '18px 18px 18px 4px', backgroundColor: '#F7F5F0', border: '1px solid rgba(201,169,97,0.15)' }} aria-label="Bot is typing">
                <span style={{ display: 'inline-flex', gap: '4px' }} aria-hidden="true">
                  {[0,1,2].map(i => (
                    <span key={i} style={{ width: '6px', height: '6px', backgroundColor: '#C9A961', borderRadius: '50%', animation: 'chatBounce 1.2s ease infinite', animationDelay: `${i * 0.2}s` }} />
                  ))}
                </span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Contact collect prompt */}
        {step === 'collect' && (
          <div style={{ padding: '12px 16px', backgroundColor: '#f9f7f3', borderTop: '1px solid rgba(201,169,97,0.15)', flexShrink: 0 }}>
            <p style={{ margin: '0 0 10px', fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#1C3D5A', fontWeight: 600 }}>Leave your info and we'll follow up:</p>
            <form onSubmit={handleCollect} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <label htmlFor="chat-name" className="sr-only">Your name</label>
                <input id="chat-name" type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(28,61,90,0.15)', fontFamily: 'Inter, sans-serif', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label htmlFor="chat-email" className="sr-only">Your email address</label>
                <input id="chat-email" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(28,61,90,0.15)', fontFamily: 'Inter, sans-serif', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="submit" style={{ flex: 1, padding: '8px', borderRadius: '8px', backgroundColor: '#1C3D5A', color: '#F7F5F0', fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                  Submit
                </button>
                <button type="button" onClick={() => setStep('chat')} style={{ padding: '8px 12px', borderRadius: '8px', backgroundColor: 'transparent', color: '#888', fontFamily: 'Inter, sans-serif', fontSize: '12px', border: '1px solid rgba(28,61,90,0.15)', cursor: 'pointer' }}>
                  Skip
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Input */}
        {step === 'chat' && (
          <form onSubmit={handleSubmit} style={{ padding: '12px 16px', borderTop: '1px solid rgba(201,169,97,0.12)', display: 'flex', gap: '8px', flexShrink: 0 }}>
            <label htmlFor="chat-input" className="sr-only">Type your message</label>
            <input
              id="chat-input"
              ref={inputRef}
              type="text"
              placeholder="Type a message…"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={sending}
              style={{ flex: 1, padding: '10px 14px', borderRadius: '50px', border: '1px solid rgba(28,61,90,0.15)', fontFamily: 'Inter, sans-serif', fontSize: '13px', outline: 'none', backgroundColor: '#F7F5F0' }}
            />
            <button type="submit" disabled={!input.trim() || sending} aria-label="Send message"
              style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: input.trim() && !sending ? '#1C3D5A' : 'rgba(28,61,90,0.2)', border: 'none', cursor: input.trim() && !sending ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background-color 0.2s' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F7F5F0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
        )}
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Open live chat'}
        aria-expanded={open}
        aria-controls="chat-panel"
        style={{
          position: 'fixed', bottom: '20px', right: '20px', width: '56px', height: '56px',
          borderRadius: '50%', backgroundColor: '#1C3D5A', border: '2px solid rgba(201,169,97,0.4)',
          boxShadow: '0 4px 20px rgba(28,61,90,0.35)', cursor: 'pointer', zIndex: 1001,
          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F7F5F0" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F7F5F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
        {unread > 0 && (
          <span aria-label={`${unread} unread message`} style={{ position: 'absolute', top: '-4px', right: '-4px', width: '20px', height: '20px', backgroundColor: '#e53935', borderRadius: '50%', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
            {unread}
          </span>
        )}
      </button>

      <style>{`
        @keyframes chatBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  )
}
