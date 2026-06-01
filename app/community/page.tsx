'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

// ── Types ─────────────────────────────────────────────────────────────────────
type DM = {
  id: string
  created_at: string
  sender_id: string
  receiver_id: string
  body: string
  read: boolean
  sender: { id: string; display_name: string }
  receiver: { id: string; display_name: string }
}

type ChatPartner = { id: string; display_name: string }

// ── Chat Window ───────────────────────────────────────────────────────────────
function ChatWindow({ currentUser, partner, onClose }: {
  currentUser: User
  partner: ChatPartner
  onClose: () => void
}) {
  const [messages, setMessages] = useState<DM[]>([])
  const [text, setText]         = useState('')
  const [sending, setSending]   = useState(false)
  const bottomRef               = useRef<HTMLDivElement>(null)

  const loadMessages = useCallback(async () => {
    const res = await fetch(`/api/community/messages?user_id=${currentUser.id}&other_id=${partner.id}`)
    const { messages: data } = await res.json()
    setMessages(data ?? [])
  }, [currentUser.id, partner.id])

  useEffect(() => { loadMessages() }, [loadMessages])

  // Auto-scroll to bottom
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  // Real-time incoming messages
  useEffect(() => {
    const channel = supabase
      .channel(`dm-${currentUser.id}-${partner.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'direct_messages' }, payload => {
        const msg = payload.new as DM
        // Only add incoming messages — outgoing are handled optimistically
        if (msg.sender_id === partner.id && msg.receiver_id === currentUser.id) {
          setMessages(prev => [...prev, msg])
        }
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [currentUser.id, partner.id])

  const send = async () => {
    if (!text.trim() || sending) return
    const body = text.trim()
    setSending(true)
    setText('')
    // Show message immediately (optimistic)
    const optimistic: DM = {
      id: `temp-${Date.now()}`,
      created_at: new Date().toISOString(),
      sender_id: currentUser.id,
      receiver_id: partner.id,
      body,
      read: false,
      sender: { id: currentUser.id, display_name: '' },
      receiver: { id: partner.id, display_name: partner.display_name },
    }
    setMessages(prev => [...prev, optimistic])
    const res = await fetch('/api/community/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender_id: currentUser.id, receiver_id: partner.id, body }),
    })
    const { message } = await res.json()
    // Replace optimistic with real message
    if (message) {
      setMessages(prev => prev.map(m => m.id === optimistic.id ? message : m))
    }
    setSending(false)
  }

  return (
    <div className="fixed bottom-0 right-4 z-50 flex flex-col rounded-t-2xl shadow-2xl overflow-hidden"
      style={{ width: 320, height: 440, backgroundColor: 'white', border: '1px solid #e0ddd8' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: '#1C3D5A' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4ade80' }} />
          <p className="text-sm font-semibold" style={{ color: '#F7F5F0' }}>{partner.display_name}</p>
        </div>
        <button onClick={onClose} aria-label="Close chat"
          className="text-white opacity-60 hover:opacity-100 text-lg leading-none">×</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2" style={{ backgroundColor: '#F7F5F0' }}>
        {messages.length === 0 && (
          <p className="text-xs text-center mt-8" style={{ color: '#aaa' }}>
            No messages yet — say hello!
          </p>
        )}
        {messages.map(m => {
          const isMine = m.sender_id === currentUser.id
          return (
            <div key={m.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-snug"
                style={{
                  backgroundColor: isMine ? '#1C3D5A' : 'white',
                  color: isMine ? '#F7F5F0' : '#2B2B2B',
                  borderBottomRightRadius: isMine ? 4 : undefined,
                  borderBottomLeftRadius: !isMine ? 4 : undefined,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}>
                {m.body}
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 px-3 py-2 border-t" style={{ borderColor: '#e0ddd8' }}>
        <input
          className="flex-1 px-3 py-2 rounded-xl text-sm border outline-none focus:border-[#C9A961]"
          style={{ borderColor: '#e0ddd8' }}
          placeholder="Type a message…"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
          aria-label="Type a message"
        />
        <button onClick={send} disabled={sending || !text.trim()}
          aria-label="Send message"
          className="px-3 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-40"
          style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}

// ── Inbox ─────────────────────────────────────────────────────────────────────
function InboxPanel({ currentUser, onStartChat, onClose }: {
  currentUser: User
  onStartChat: (partner: ChatPartner) => void
  onClose: () => void
}) {
  const [conversations, setConversations] = useState<DM[]>([])
  const [allUsers, setAllUsers]           = useState<ChatPartner[]>([])
  const [search, setSearch]               = useState('')
  const [tab, setTab]                     = useState<'chats' | 'users'>('chats')

  useEffect(() => {
    fetch(`/api/community/messages?user_id=${currentUser.id}&inbox=1`)
      .then(r => r.json()).then(d => setConversations(d.conversations ?? []))
    fetch(`/api/community/users`)
      .then(r => r.json()).then(d => setAllUsers((d.users ?? []).filter((u: ChatPartner) => u.id !== currentUser.id)))
  }, [currentUser.id])

  const filtered = allUsers.filter(u => u.display_name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="fixed bottom-0 right-4 z-50 flex flex-col rounded-t-2xl shadow-2xl overflow-hidden"
      style={{ width: 320, height: 440, backgroundColor: 'white', border: '1px solid #e0ddd8' }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: '#1C3D5A' }}>
        <p className="text-sm font-semibold" style={{ color: '#F7F5F0' }}>Messages</p>
        <button onClick={onClose} aria-label="Close inbox"
          className="text-white opacity-60 hover:opacity-100 text-lg leading-none">×</button>
      </div>

      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: '#e0ddd8' }}>
        {(['chats', 'users'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-2 text-xs font-semibold tracking-widest uppercase transition-all"
            style={{
              color: tab === t ? '#1C3D5A' : '#aaa',
              borderBottom: tab === t ? '2px solid #C9A961' : '2px solid transparent',
            }}>
            {t === 'chats' ? 'Conversations' : 'All Users'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === 'chats' ? (
          conversations.length === 0 ? (
            <p className="text-xs text-center mt-8" style={{ color: '#aaa' }}>No conversations yet.<br />Go to All Users to start one.</p>
          ) : conversations.map(c => {
            const partner = c.sender_id === currentUser.id ? c.receiver : c.sender
            return (
              <button key={c.id} onClick={() => { onStartChat(partner); onClose() }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#f7f5f0] transition-colors border-b"
                style={{ borderColor: '#f0ece4' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: '#1C3D5A' }}>
                  {partner?.display_name?.slice(0, 1).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: '#1C3D5A' }}>{partner?.display_name}</p>
                  <p className="text-xs truncate" style={{ color: '#aaa' }}>{c.body}</p>
                </div>
                {!c.read && c.receiver_id === currentUser.id && (
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#C9A961' }} />
                )}
              </button>
            )
          })
        ) : (
          <div>
            <div className="px-3 pt-3 pb-2">
              <input className="w-full px-3 py-2 rounded-xl text-sm border outline-none focus:border-[#C9A961]"
                style={{ borderColor: '#e0ddd8' }}
                placeholder="Search users…"
                value={search} onChange={e => setSearch(e.target.value)}
                aria-label="Search users" />
            </div>
            {filtered.length === 0 ? (
              <p className="text-xs text-center mt-4" style={{ color: '#aaa' }}>No users found</p>
            ) : filtered.map(u => (
              <button key={u.id} onClick={() => { onStartChat(u); onClose() }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#f7f5f0] transition-colors border-b"
                style={{ borderColor: '#f0ece4' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: '#1C3D5A' }}>
                  {u.display_name.slice(0, 1).toUpperCase()}
                </div>
                <p className="text-sm font-semibold" style={{ color: '#1C3D5A' }}>{u.display_name}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Categories ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'all',           label: 'All Posts',                    emoji: '🏘️' },
  { id: 'events',        label: 'Social Events',                emoji: '🎉' },
  { id: 'furniture',     label: 'Furniture & Appliances',       emoji: '🛋️' },
  { id: 'repairs',       label: 'Home Repairs & Services',      emoji: '🔧' },
  { id: 'jobs',          label: 'Jobs & Work',                  emoji: '💼' },
  { id: 'free',          label: 'Free Items',                   emoji: '🎁' },
  { id: 'housing',       label: 'Housing — Swap, Lease, Buy, Sell', emoji: '🏠' },
  { id: 'cars',          label: 'Cars & Vehicles',              emoji: '🚗' },
  { id: 'farm',          label: 'Farm & Ranch',                 emoji: '🐴' },
  { id: 'farm-tools',    label: 'Farming Tools & Equipment',    emoji: '🚜' },
  { id: 'local-goods',   label: 'Local Goods & Produce',        emoji: '🌱' },
  { id: 'community',     label: 'Community Help',               emoji: '🤝' },
]

type Post = {
  id: string
  created_at: string
  user_id: string
  category: string
  title: string
  body: string
  photo_url: string | null
  contact_email: string | null
  profiles: { display_name: string; avatar_url: string | null }
  community_comments: { count: number }[]
}

type Comment = {
  id: string
  created_at: string
  body: string
  user_id: string
  profiles: { display_name: string }
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const inputCls = 'w-full px-4 py-3 rounded-xl text-sm border outline-none transition-colors duration-200 focus:border-[#C9A961]'
const inputStyle = { borderColor: '#e0ddd8', backgroundColor: 'white', color: '#2B2B2B' }

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1)  return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function Avatar({ name, size = 36, url }: { name: string; size?: number; url?: string | null }) {
  if (url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={name}
        className="flex-shrink-0 rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    )
  }
  const initials = name.slice(0, 2).toUpperCase()
  const hue = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center rounded-full font-bold text-white text-xs"
      style={{ width: size, height: size, backgroundColor: `hsl(${hue},45%,45%)`, fontSize: size * 0.35 }}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

// ── Profile Modal ─────────────────────────────────────────────────────────────
function ProfileModal({ user, currentAvatarUrl, displayName, onClose, onSaved }: {
  user: import('@supabase/supabase-js').User
  currentAvatarUrl: string | null
  displayName: string
  onClose: () => void
  onSaved: (url: string) => void
}) {
  const [preview, setPreview]   = useState<string | null>(currentAvatarUrl)
  const [file, setFile]         = useState<File | null>(null)
  const [saving, setSaving]     = useState(false)
  const [error, setError]       = useState('')
  const fileRef                 = useRef<HTMLInputElement>(null)

  const pickFile = (f: File | null) => {
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const save = async () => {
    if (!file) { onClose(); return }
    setSaving(true); setError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('user_id', user.id)
      const res = await fetch('/api/community/avatar', { method: 'POST', body: fd })
      const j = await res.json()
      if (j.error) throw new Error(j.error)
      onSaved(j.url)
      onClose()
    } catch (e: any) {
      setError(e.message || 'Upload failed')
    }
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      role="dialog" aria-modal="true" aria-label="Edit profile photo">
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl">
        <button onClick={onClose} aria-label="Close"
          className="float-right text-gray-400 hover:text-gray-600 text-xl font-light">×</button>
        <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
          Profile Photo
        </h2>
        <p className="text-sm mb-6" style={{ color: '#888' }}>Upload a photo — it will be cropped to a square.</p>

        <div className="flex flex-col items-center gap-4">
          <button type="button" onClick={() => fileRef.current?.click()}
            className="relative rounded-full overflow-hidden transition-all hover:opacity-80"
            style={{ width: 120, height: 120, flexShrink: 0 }}
            aria-label="Choose photo">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-xs font-semibold gap-1"
                style={{ backgroundColor: '#1C3D5A', color: '#C9A961' }}>
                <span style={{ fontSize: 32 }}>📷</span>
                <span>{displayName.slice(0, 2).toUpperCase()}</span>
              </div>
            )}
            <div className="absolute inset-0 flex items-end justify-center pb-2 opacity-0 hover:opacity-100 transition-opacity"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }}>
              <span className="text-white text-[10px] font-semibold">Change</span>
            </div>
          </button>

          <input ref={fileRef} type="file" accept="image/*" className="hidden" aria-label="Upload photo"
            onChange={e => pickFile(e.target.files?.[0] ?? null)} />

          {error && (
            <p role="alert" className="text-sm px-3 py-2 rounded-lg w-full text-center"
              style={{ backgroundColor: 'rgba(220,53,69,0.08)', color: '#dc3545' }}>{error}</p>
          )}

          <div className="flex gap-3 w-full mt-2">
            <button onClick={save} disabled={saving}
              className="flex-1 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button onClick={onClose}
              className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-70"
              style={{ border: '1px solid #e0ddd8', color: '#616161' }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Auth Modal ───────────────────────────────────────────────────────────────
function AuthModal({ onClose, onAuth }: { onClose: () => void; onAuth: (u: User) => void }) {
  const [mode, setMode]         = useState<'signin' | 'signup' | 'forgot'>('signup')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [name, setName]         = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [sent, setSent]         = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const modalRef                = useRef<HTMLDivElement>(null)

  // Focus trap — keep Tab/Shift+Tab inside the modal
  useEffect(() => {
    const modal = modalRef.current
    if (!modal) return
    const focusable = modal.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]
    first?.focus()
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }
    modal.addEventListener('keydown', trap)
    return () => modal.removeEventListener('keydown', trap)
  }, [mode, sent, resetSent])

  const handleReset = async () => {
    if (!email) { setError('Please enter your email address.'); return }
    setError(''); setLoading(true)
    const { error: e } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://bakersfieldrentalhomes.com/community',
    })
    setLoading(false)
    if (e) { setError(e.message); return }
    setResetSent(true)
  }

  const submit = async () => {
    setError(''); setLoading(true)
    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your name.'); setLoading(false); return
    }
    if (mode === 'signup') {
      const { data, error: e } = await supabase.auth.signUp({ email, password,
        options: { data: { display_name: name || email.split('@')[0] } }
      })
      if (e) { setError(e.message); setLoading(false); return }
      if (data.user && !data.session) { setSent(true); setLoading(false); return }
      if (data.user) onAuth(data.user)
    } else {
      const { data, error: e } = await supabase.auth.signInWithPassword({ email, password })
      if (e) { setError(e.message); setLoading(false); return }
      if (data.user) onAuth(data.user)
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      role="dialog" aria-modal="true"
      aria-label={mode === 'signup' ? 'Create account' : mode === 'forgot' ? 'Reset password' : 'Sign in'}>
      <div ref={modalRef} className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <button onClick={onClose} aria-label="Close"
          className="float-right text-gray-400 hover:text-gray-600 text-xl font-light">×</button>
        <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
          {mode === 'signup' ? 'Join the Community' : mode === 'forgot' ? 'Reset Password' : 'Welcome Back'}
        </h2>
        <p className="text-sm mb-6" style={{ color: '#888' }}>
          {mode === 'signup'
            ? 'Free to join — post, comment, connect.'
            : mode === 'forgot'
            ? 'Enter your email and we\'ll send a reset link.'
            : 'Sign in to post and comment.'}
        </p>

        {sent ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-3" aria-hidden="true">📬</div>
            <p className="font-semibold" style={{ color: '#1C3D5A' }}>Check your email</p>
            <p className="text-sm mt-1" style={{ color: '#888' }}>We sent a confirmation link to {email}</p>
          </div>
        ) : mode === 'forgot' ? (
          <div className="space-y-4">
            {resetSent ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'rgba(201,169,97,0.12)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A961" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <p className="font-semibold mb-1" style={{ color: '#1C3D5A' }}>Reset link sent</p>
                <p className="text-sm" style={{ color: '#888' }}>Check your inbox at <strong>{email}</strong> and follow the link to reset your password.</p>
                <button onClick={() => { setMode('signin'); setResetSent(false); setError('') }}
                  className="mt-5 text-sm font-semibold underline transition-opacity hover:opacity-70"
                  style={{ color: '#C9A961' }}>
                  Back to sign in
                </button>
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="reset-email" className="block text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: '#1C3D5A' }}>
                    Email
                  </label>
                  <input id="reset-email" type="email" className={inputCls} style={inputStyle} placeholder="you@example.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleReset()} />
                </div>
                {error && <p role="alert" className="text-sm px-3 py-2 rounded-lg" style={{ backgroundColor: 'rgba(220,53,69,0.08)', color: '#dc3545' }}>{error}</p>}
                <button onClick={handleReset} disabled={loading || !email}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>
                  {loading ? 'Sending…' : 'Send Reset Link'}
                </button>
                <p className="text-center text-sm" style={{ color: '#888' }}>
                  <button onClick={() => { setMode('signin'); setError('') }}
                    className="font-semibold underline transition-opacity hover:opacity-70"
                    style={{ color: '#C9A961' }}>
                    Back to sign in
                  </button>
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label htmlFor="auth-name" className="block text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: '#1C3D5A' }}>
                  Your Name <span style={{ color: '#B22234' }}>*</span>
                </label>
                <input id="auth-name" className={inputCls} style={inputStyle} placeholder="How others will see you" required
                  value={name} onChange={e => setName(e.target.value)} />
              </div>
            )}
            <div>
              <label htmlFor="auth-email" className="block text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: '#1C3D5A' }}>
                Email
              </label>
              <input id="auth-email" type="email" className={inputCls} style={inputStyle} placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="auth-password" className="block text-xs font-semibold tracking-widest uppercase" style={{ color: '#1C3D5A' }}>
                  Password
                </label>
                {mode === 'signin' && (
                  <button type="button"
                    onClick={() => { setMode('forgot'); setError('') }}
                    className="text-xs font-semibold transition-opacity hover:opacity-70"
                    style={{ color: '#C9A961' }}>
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input id="auth-password" type={showPw ? 'text' : 'password'} className={inputCls} style={{ ...inputStyle, paddingRight: '3rem' }} placeholder="Min 6 characters"
                  value={password} onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && submit()} />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold transition-opacity hover:opacity-70"
                  style={{ color: '#C9A961' }}>
                  {showPw ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            {error && <p role="alert" className="text-sm px-3 py-2 rounded-lg" style={{ backgroundColor: 'rgba(220,53,69,0.08)', color: '#dc3545' }}>{error}</p>}
            <button onClick={submit} disabled={loading || !email || !password || (mode === 'signup' && !name.trim())}
              className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>
              {loading ? 'Please wait…' : mode === 'signup' ? 'Create Account' : 'Sign In'}
            </button>
            <p className="text-center text-sm" style={{ color: '#888' }}>
              {mode === 'signup' ? 'Already have an account? ' : 'New here? '}
              <button onClick={() => { setMode(mode === 'signup' ? 'signin' : 'signup'); setError('') }}
                className="font-semibold underline" style={{ color: '#C9A961' }}>
                {mode === 'signup' ? 'Sign in' : 'Create account'}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── New Post Form ─────────────────────────────────────────────────────────────
function NewPostForm({ user, onPosted }: { user: User; onPosted: () => void }) {
  const [open, setOpen]         = useState(false)
  const [category, setCategory] = useState('')
  const [title, setTitle]       = useState('')
  const [body, setBody]         = useState('')
  const [photo, setPhoto]       = useState<File | null>(null)
  const [preview, setPreview]   = useState<string | null>(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const fileRef                 = useRef<HTMLInputElement>(null)

  const pickPhoto = (f: File | null) => {
    if (!f) return
    setPhoto(f)
    setPreview(URL.createObjectURL(f))
  }

  const submit = async () => {
    if (!category || !title.trim() || !body.trim()) { setError('Please fill in category, title, and description.'); return }
    setError(''); setLoading(true)
    try {
      let photo_url = null
      if (photo) {
        const fd = new FormData(); fd.append('file', photo)
        const r = await fetch('/api/community/upload', { method: 'POST', body: fd })
        const j = await r.json()
        if (j.error) throw new Error(j.error)
        photo_url = j.url
      }
      const res = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, category, title: title.trim(), body: body.trim(), photo_url }),
      })
      const j = await res.json()
      if (j.error) throw new Error(j.error)
      setOpen(false); setCategory(''); setTitle(''); setBody(''); setPhoto(null); setPreview(null)
      onPosted()
    } catch (e: any) { setError(e.message) }
    setLoading(false)
  }

  if (!open) return (
    <button onClick={() => setOpen(true)}
      className="w-full py-4 rounded-2xl text-sm font-semibold tracking-widest uppercase mb-6 transition-all hover:opacity-90"
      style={{ backgroundColor: '#C9A961', color: '#1C3D5A', letterSpacing: '0.1em' }}>
      + Post to Community
    </button>
  )

  return (
    <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm" style={{ border: '1px solid rgba(201,169,97,0.2)' }}>
      <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
        New Post
      </h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="post-category" className="block text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: '#1C3D5A' }}>Category</label>
          <select id="post-category" className={inputCls} style={inputStyle} value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">Select a category…</option>
            {CATEGORIES.filter(c => c.id !== 'all').map(c => (
              <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="post-title" className="block text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: '#1C3D5A' }}>Title</label>
          <input id="post-title" className={inputCls} style={inputStyle} placeholder="e.g. Free sofa — great condition"
            value={title} onChange={e => setTitle(e.target.value)} maxLength={120} />
        </div>
        <div>
          <label htmlFor="post-body" className="block text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: '#1C3D5A' }}>Description</label>
          <textarea id="post-body" className={inputCls + ' resize-none'} style={inputStyle} rows={4}
            placeholder="Tell the community more details…"
            value={body} onChange={e => setBody(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: '#1C3D5A' }}>Photo (optional)</label>
          {preview ? (
            <div className="relative w-40 h-32 rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <button onClick={() => { setPhoto(null); setPreview(null) }}
                className="absolute top-1 right-1 w-6 h-6 rounded-full text-white text-xs flex items-center justify-center"
                style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} aria-label="Remove photo">×</button>
            </div>
          ) : (
            <button type="button" onClick={() => fileRef.current?.click()}
              className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
              style={{ border: '1.5px dashed #d5d0c8', color: '#888', backgroundColor: '#faf9f7' }}>
              + Add Photo
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" aria-label="Upload photo"
            onChange={e => pickPhoto(e.target.files?.[0] ?? null)} />
        </div>
        {error && <p role="alert" className="text-sm px-3 py-2 rounded-lg" style={{ backgroundColor: 'rgba(220,53,69,0.08)', color: '#dc3545' }}>{error}</p>}
        <div className="flex gap-3">
          <button onClick={submit} disabled={loading}
            className="flex-1 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>
            {loading ? 'Posting…' : 'Post'}
          </button>
          <button onClick={() => setOpen(false)}
            className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-70"
            style={{ border: '1px solid #e0ddd8', color: '#616161' }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Post Card ─────────────────────────────────────────────────────────────────
function PostCard({ post, currentUser, onDeleted, onMessage }: { post: Post; currentUser: User | null; onDeleted: () => void; onMessage?: (p: ChatPartner) => void }) {
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments]         = useState<Comment[]>([])
  const [commentText, setCommentText]   = useState('')
  const [loadingC, setLoadingC]         = useState(false)
  const [submitting, setSubmitting]     = useState(false)
  // Post editing
  const [editingPost, setEditingPost]   = useState(false)
  const [editTitle, setEditTitle]       = useState(post.title)
  const [editBody, setEditBody]         = useState(post.body)
  const [savingPost, setSavingPost]     = useState(false)
  // Comment editing
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [editingCommentText, setEditingCommentText] = useState('')
  const cat = CATEGORIES.find(c => c.id === post.category)
  const commentCount = post.community_comments?.[0]?.count ?? 0

  const loadComments = useCallback(async () => {
    setLoadingC(true)
    const res = await fetch(`/api/community/comments?post_id=${post.id}`)
    const { comments: data } = await res.json()
    setComments(data ?? [])
    setLoadingC(false)
  }, [post.id])

  const toggleComments = () => {
    if (!showComments) loadComments()
    setShowComments(v => !v)
  }

  const submitComment = async () => {
    if (!commentText.trim() || !currentUser) return
    setSubmitting(true)
    await fetch('/api/community/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ post_id: post.id, user_id: currentUser.id, body: commentText.trim() }),
    })
    setCommentText('')
    await loadComments()
    setSubmitting(false)
  }

  const deletePost = async () => {
    if (!confirm('Delete this post?')) return
    await fetch(`/api/community/posts?id=${post.id}&user_id=${currentUser?.id}`, { method: 'DELETE' })
    onDeleted()
  }

  const savePost = async () => {
    if (!editTitle.trim() || !editBody.trim()) return
    setSavingPost(true)
    await fetch('/api/community/posts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: post.id, user_id: currentUser?.id, title: editTitle.trim(), body: editBody.trim() }),
    })
    post.title = editTitle.trim()
    post.body = editBody.trim()
    setEditingPost(false)
    setSavingPost(false)
  }

  const deleteComment = async (commentId: string) => {
    if (!confirm('Delete this comment?')) return
    await fetch(`/api/community/comments?id=${commentId}&user_id=${currentUser?.id}`, { method: 'DELETE' })
    setComments(prev => prev.filter(c => c.id !== commentId))
  }

  const saveComment = async (commentId: string) => {
    if (!editingCommentText.trim()) return
    await fetch('/api/community/comments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: commentId, user_id: currentUser?.id, body: editingCommentText.trim() }),
    })
    setComments(prev => prev.map(c => c.id === commentId ? { ...c, body: editingCommentText.trim() } : c))
    setEditingCommentId(null)
  }

  return (
    <article className="bg-white rounded-2xl overflow-hidden mb-4" style={{ border: '1px solid rgba(201,169,97,0.12)', boxShadow: '0 2px 8px rgba(28,61,90,0.04)' }}>
      {post.photo_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.photo_url} alt={post.title} className="w-full object-cover" style={{ maxHeight: 320 }} />
      )}
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <Avatar name={post.profiles?.display_name ?? '?'} url={post.profiles?.avatar_url} />
            <div>
              <p className="text-sm font-semibold" style={{ color: '#1C3D5A' }}>{post.profiles?.display_name}</p>
              <p className="text-[11px]" style={{ color: '#aaa' }}>{timeAgo(post.created_at)}</p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full flex-shrink-0"
            style={{ backgroundColor: '#f0ece4', color: '#616161' }}>
            {cat?.emoji} {cat?.label ?? post.category}
          </span>
        </div>

        {/* Content */}
        {editingPost ? (
          <div className="space-y-2 mb-3">
            <input className="w-full px-3 py-2 rounded-xl text-sm border outline-none focus:border-[#C9A961]"
              style={{ borderColor: '#e0ddd8' }} value={editTitle} onChange={e => setEditTitle(e.target.value)} />
            <textarea className="w-full px-3 py-2 rounded-xl text-sm border outline-none focus:border-[#C9A961] resize-none"
              style={{ borderColor: '#e0ddd8' }} rows={4} value={editBody} onChange={e => setEditBody(e.target.value)} />
            <div className="flex gap-2">
              <button onClick={savePost} disabled={savingPost}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold transition-all hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>
                {savingPost ? 'Saving…' : 'Save'}
              </button>
              <button onClick={() => setEditingPost(false)}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold transition-all hover:opacity-70"
                style={{ border: '1px solid #e0ddd8', color: '#616161' }}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="font-semibold text-base mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              {post.title}
            </h3>
            <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#444' }}>{post.body}</p>
          </>
        )}


        {/* Actions */}
        <div className="flex items-center gap-4 mt-4 pt-4" style={{ borderTop: '1px solid #f0ece4' }}>
          <button onClick={toggleComments}
            className="flex items-center gap-1.5 text-sm transition-all hover:opacity-70"
            style={{ color: '#616161' }}
            aria-expanded={showComments}>
            <span aria-hidden="true">💬</span>{' '}
            {commentCount > 0 ? `${commentCount} comment${commentCount !== 1 ? 's' : ''}` : 'Comment'}
          </button>
          {currentUser && currentUser.id !== post.user_id && onMessage && (
            <button
              onClick={() => onMessage({ id: post.user_id, display_name: post.profiles?.display_name ?? 'User' })}
              className="flex items-center gap-1 text-sm transition-all hover:opacity-70"
              style={{ color: '#C9A961' }}>
              <span aria-hidden="true">✉️</span>{' '}Message
            </button>
          )}
          {currentUser?.id === post.user_id && (
            <div className="ml-auto flex gap-3">
              <button onClick={() => { setEditTitle(post.title); setEditBody(post.body); setEditingPost(true) }}
                className="text-xs transition-all hover:opacity-70" style={{ color: '#1C3D5A' }}
                aria-label="Edit post">Edit</button>
              <button onClick={deletePost} className="text-xs transition-all hover:opacity-70" style={{ color: '#B03A2E' }}
                aria-label="Delete post">Delete</button>
            </div>
          )}
        </div>

        {/* Comments */}
        {showComments && (
          <div className="mt-4 space-y-3">
            {loadingC ? (
              <p className="text-xs" style={{ color: '#aaa' }}>Loading comments…</p>
            ) : comments.length === 0 ? (
              <p className="text-xs" style={{ color: '#aaa' }}>No comments yet — be the first!</p>
            ) : comments.map(c => (
              <div key={c.id} className="flex gap-2.5">
                <Avatar name={c.profiles?.display_name ?? '?'} size={28} />
                <div className="flex-1 px-3 py-2 rounded-xl text-sm" style={{ backgroundColor: '#f7f5f0' }}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-semibold mr-2" style={{ color: '#1C3D5A' }}>{c.profiles?.display_name}</span>
                      {editingCommentId === c.id ? (
                        <div className="mt-1 space-y-1">
                          <input className="w-full px-2 py-1 rounded-lg text-sm border outline-none focus:border-[#C9A961]"
                            style={{ borderColor: '#e0ddd8' }}
                            value={editingCommentText} onChange={e => setEditingCommentText(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && saveComment(c.id)} />
                          <div className="flex gap-2">
                            <button onClick={() => saveComment(c.id)}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-lg"
                              style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>Save</button>
                            <button onClick={() => setEditingCommentId(null)}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-lg"
                              style={{ border: '1px solid #e0ddd8', color: '#616161' }}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <span style={{ color: '#444' }}>{c.body}</span>
                      )}
                      <span className="ml-2 text-[10px]" style={{ color: '#bbb' }}>{timeAgo(c.created_at)}</span>
                    </div>
                    {currentUser?.id === c.user_id && editingCommentId !== c.id && (
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => { setEditingCommentId(c.id); setEditingCommentText(c.body) }}
                          className="text-[10px] transition-all hover:opacity-70" style={{ color: '#1C3D5A' }}>Edit</button>
                        <button onClick={() => deleteComment(c.id)}
                          className="text-[10px] transition-all hover:opacity-70" style={{ color: '#B03A2E' }}>Delete</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {currentUser ? (
              <div className="flex gap-2 pt-1">
                <Avatar name={currentUser.email ?? '?'} size={28} />
                <div className="flex-1 flex gap-2">
                  <input
                    className="flex-1 px-3 py-2 rounded-xl text-sm border outline-none focus:border-[#C9A961]"
                    style={{ borderColor: '#e0ddd8', backgroundColor: 'white' }}
                    placeholder="Write a comment…"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && submitComment()}
                    aria-label="Write a comment"
                  />
                  <button onClick={submitComment} disabled={submitting || !commentText.trim()}
                    className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-40"
                    style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>
                    {submitting ? '…' : 'Post'}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs pt-1" style={{ color: '#aaa' }}>Sign in to comment.</p>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CommunityPage() {
  const [user, setUser]               = useState<User | null>(null)
  const [displayName, setDisplayName] = useState<string>('')
  const [avatarUrl, setAvatarUrl]     = useState<string | null>(null)
  const [showAuth, setShowAuth]       = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [posts, setPosts]             = useState<Post[]>([])
  const [loading, setLoading]         = useState(true)
  const [category, setCategory]       = useState('all')
  const [notifications, setNotifications] = useState<{ id: string; postTitle: string; commenterName: string }[]>([])
  const [showNotifs, setShowNotifs]   = useState(false)
  const [chatPartner, setChatPartner] = useState<ChatPartner | null>(null)
  const [showInbox, setShowInbox]     = useState(false)
  const [unreadDMs, setUnreadDMs]     = useState(0)
  const userPostIds                   = useRef<Set<string>>(new Set())

  // Fetch display name and avatar from profiles table
  const fetchDisplayName = useCallback(async (uid: string) => {
    const { data } = await supabase.from('profiles').select('display_name, avatar_url').eq('id', uid).single()
    if (data?.display_name) setDisplayName(data.display_name)
    if (data?.avatar_url) setAvatarUrl(data.avatar_url)
  }, [])

  // Check existing session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null
      setUser(u)
      if (u) fetchDisplayName(u.id)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      const u = s?.user ?? null
      setUser(u)
      if (u) fetchDisplayName(u.id)
    })
    return () => subscription.unsubscribe()
  }, [fetchDisplayName])

  // Real-time notifications — watch for new comments on user's own posts
  useEffect(() => {
    if (!user) return
    const channel = supabase
      .channel('community-comments-notify')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'community_comments' },
        async (payload) => {
          const comment = payload.new as { post_id: string; user_id: string; body: string }
          if (comment.user_id === user.id) return // ignore own comments
          if (!userPostIds.current.has(comment.post_id)) return // not their post
          // Fetch post title and commenter name
          const [postRes, profileRes] = await Promise.all([
            fetch(`/api/community/posts`).then(r => r.json()),
            fetch(`/api/community/comments?post_id=${comment.post_id}`).then(r => r.json()),
          ])
          const post = (postRes.posts ?? []).find((p: Post) => p.id === comment.post_id)
          const postTitle = post?.title ?? 'your post'
          const commenterName = profileRes.comments?.slice(-1)[0]?.profiles?.display_name ?? 'Someone'
          setNotifications(prev => [{ id: Date.now().toString(), postTitle, commenterName }, ...prev.slice(0, 9)])
        }
      )
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [user])

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    const url = category === 'all' ? '/api/community/posts' : `/api/community/posts?category=${category}`
    const res = await fetch(url)
    const { posts: data } = await res.json()
    const fetched = data ?? []
    setPosts(fetched)
    if (user) {
      userPostIds.current = new Set(fetched.filter((p: Post) => p.user_id === user.id).map((p: Post) => p.id))
    }
    setLoading(false)
  }, [category, user])

  useEffect(() => { fetchPosts() }, [fetchPosts])

  const signOut = async () => { await supabase.auth.signOut(); setUser(null); setDisplayName(''); setAvatarUrl(null) }

  // Real-time unread DM count
  useEffect(() => {
    if (!user) return
    fetch(`/api/community/messages?user_id=${user.id}&inbox=1`)
      .then(r => r.json())
      .then(d => {
        const unread = (d.conversations ?? []).filter((c: DM) => !c.read && c.receiver_id === user.id).length
        setUnreadDMs(unread)
      })
    const channel = supabase
      .channel(`dm-notify-${user.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'direct_messages',
        filter: `receiver_id=eq.${user.id}` }, () => {
        setUnreadDMs(v => v + 1)
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [user])

  return (
    <main className="min-h-screen" id="main-content" style={{ backgroundColor: '#F7F5F0' }}>
      {/* Auth modal */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onAuth={u => { setUser(u); setShowAuth(false) }}
        />
      )}

      {/* Profile modal */}
      {showProfile && user && (
        <ProfileModal
          user={user}
          currentAvatarUrl={avatarUrl}
          displayName={displayName || user.email?.split('@')[0] || '?'}
          onClose={() => setShowProfile(false)}
          onSaved={url => setAvatarUrl(url)}
        />
      )}

      {/* Header */}
      <div className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(to bottom, #1C3D5A 0%, #2a5278 100%)' }}>
        <h1 className="text-4xl font-bold mb-3"
          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
          Bakersfield Community Board
        </h1>
        <p className="text-sm font-light mb-6" style={{ color: 'rgba(247,245,240,0.65)' }}>
          Your local board for events, trades, farm goods, jobs, and everything Bakersfield
        </p>
        {user ? (
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {/* Avatar / profile button */}
            <button
              onClick={() => setShowProfile(true)}
              aria-label="Edit profile photo"
              className="transition-all hover:opacity-80 rounded-full"
              style={{ padding: 0 }}
            >
              <Avatar name={displayName || user.email?.split('@')[0] || '?'} size={36} url={avatarUrl} />
            </button>

            <span className="text-sm" style={{ color: 'rgba(247,245,240,0.8)' }}>
              Signed in as <strong>{displayName || user.email?.split('@')[0]}</strong>
            </span>

            {/* Messages icon */}
            <div className="relative">
              <button
                onClick={() => { setShowInbox(v => !v); setUnreadDMs(0) }}
                aria-label={`Messages — ${unreadDMs} unread`}
                className="relative flex items-center justify-center w-9 h-9 rounded-full transition-all hover:opacity-80"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#F7F5F0' }}
              >
                <span aria-hidden="true">💬</span>
                {unreadDMs > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                    style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}>
                    {unreadDMs > 9 ? '9+' : unreadDMs}
                  </span>
                )}
              </button>
            </div>

            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => { setShowNotifs(v => !v); }}
                aria-label={`Notifications — ${notifications.length} unread`}
                className="relative flex items-center justify-center w-9 h-9 rounded-full transition-all hover:opacity-80"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#F7F5F0' }}
              >
                <span aria-hidden="true">🔔</span>
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                    style={{ backgroundColor: '#B22234', color: 'white' }}>
                    {notifications.length > 9 ? '9+' : notifications.length}
                  </span>
                )}
              </button>

              {showNotifs && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl shadow-xl overflow-hidden z-50"
                  style={{ backgroundColor: 'white', border: '1px solid #e0ddd8', top: '100%' }}>
                  <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: '#f0ece4' }}>
                    <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#1C3D5A' }}>Notifications</p>
                    {notifications.length > 0 && (
                      <button onClick={() => setNotifications([])} className="text-xs" style={{ color: '#aaa' }}>Clear all</button>
                    )}
                  </div>
                  {notifications.length === 0 ? (
                    <p className="text-sm text-center py-6" style={{ color: '#aaa' }}>No new notifications</p>
                  ) : (
                    <ul className="max-h-64 overflow-y-auto">
                      {notifications.map(n => (
                        <li key={n.id} className="px-4 py-3 border-b text-sm" style={{ borderColor: '#f0ece4', color: '#2B2B2B' }}>
                          <span className="font-semibold" style={{ color: '#1C3D5A' }}>{n.commenterName}</span> replied to your post:{' '}
                          <span style={{ color: '#616161' }}>"{n.postTitle}"</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <button onClick={signOut}
              className="text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#F7F5F0' }}>
              Sign Out
            </button>
          </div>
        ) : (
          <button onClick={() => setShowAuth(true)}
            className="px-6 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}>
            Sign In / Join Free
          </button>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6" role="tablist" aria-label="Filter by category">
          {CATEGORIES.map(c => (
            <button key={c.id}
              role="tab"
              aria-selected={category === c.id}
              aria-label={c.label}
              onClick={() => setCategory(c.id)}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 text-left"
              style={{
                backgroundColor: category === c.id ? '#1C3D5A' : 'white',
                color: category === c.id ? '#F7F5F0' : '#444',
                border: `1.5px solid ${category === c.id ? '#1C3D5A' : '#e0ddd8'}`,
                boxShadow: category === c.id ? '0 2px 8px rgba(28,61,90,0.15)' : 'none',
              }}>
              <span style={{ fontSize: 18 }} aria-hidden="true">{c.emoji}</span>
              <span className="leading-tight text-xs font-semibold">{c.label}</span>
            </button>
          ))}
        </div>

        {/* Post button / form */}
        {user && <NewPostForm user={user} onPosted={fetchPosts} />}

        {/* Posts feed */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 animate-pulse" style={{ border: '1px solid rgba(201,169,97,0.12)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full" style={{ backgroundColor: '#e8e5df' }} />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 rounded-full w-1/3" style={{ backgroundColor: '#e8e5df' }} />
                    <div className="h-2 rounded-full w-1/4" style={{ backgroundColor: '#e8e5df' }} />
                  </div>
                </div>
                <div className="h-4 rounded-full w-2/3 mb-2" style={{ backgroundColor: '#e8e5df' }} />
                <div className="h-3 rounded-full w-full mb-1" style={{ backgroundColor: '#e8e5df' }} />
                <div className="h-3 rounded-full w-4/5" style={{ backgroundColor: '#e8e5df' }} />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🏘️</div>
            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              No posts yet
            </h3>
            <p className="text-sm" style={{ color: '#888' }}>
              Be the first to post in {category === 'all' ? 'the community' : CATEGORIES.find(c => c.id === category)?.label}!
            </p>
          </div>
        ) : (
          <div>
            {posts.map(p => (
              <PostCard key={p.id} post={p} currentUser={user} onDeleted={fetchPosts} onMessage={p => setChatPartner(p)} />
            ))}
          </div>
        )}
      </div>
      {/* Inbox panel */}
      {showInbox && user && (
        <InboxPanel
          currentUser={user}
          onStartChat={p => { setChatPartner(p); setShowInbox(false) }}
          onClose={() => setShowInbox(false)}
        />
      )}

      {/* Chat window */}
      {chatPartner && user && (
        <ChatWindow
          currentUser={user}
          partner={chatPartner}
          onClose={() => setChatPartner(null)}
        />
      )}
    </main>
  )
}

