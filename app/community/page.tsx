'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

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

function Avatar({ name, size = 36 }: { name: string; size?: number }) {
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

// ── Auth Modal ───────────────────────────────────────────────────────────────
function AuthModal({ onClose, onAuth }: { onClose: () => void; onAuth: (u: User) => void }) {
  const [mode, setMode]       = useState<'signin' | 'signup'>('signup')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [name, setName]       = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)

  const submit = async () => {
    setError(''); setLoading(true)
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
      role="dialog" aria-modal="true" aria-label={mode === 'signup' ? 'Create account' : 'Sign in'}>
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <button onClick={onClose} aria-label="Close"
          className="float-right text-gray-400 hover:text-gray-600 text-xl font-light">×</button>
        <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
          {mode === 'signup' ? 'Join the Community' : 'Welcome Back'}
        </h2>
        <p className="text-sm mb-6" style={{ color: '#888' }}>
          {mode === 'signup' ? 'Free to join — post, comment, connect.' : 'Sign in to post and comment.'}
        </p>

        {sent ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-3">📬</div>
            <p className="font-semibold" style={{ color: '#1C3D5A' }}>Check your email</p>
            <p className="text-sm mt-1" style={{ color: '#888' }}>We sent a confirmation link to {email}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label htmlFor="auth-name" className="block text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: '#1C3D5A' }}>
                  Display Name (optional)
                </label>
                <input id="auth-name" className={inputCls} style={inputStyle} placeholder="How others will see you"
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
              <label htmlFor="auth-password" className="block text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: '#1C3D5A' }}>
                Password
              </label>
              <input id="auth-password" type="password" className={inputCls} style={inputStyle} placeholder="Min 6 characters"
                value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submit()} />
            </div>
            {error && <p role="alert" className="text-sm px-3 py-2 rounded-lg" style={{ backgroundColor: 'rgba(220,53,69,0.08)', color: '#dc3545' }}>{error}</p>}
            <button onClick={submit} disabled={loading || !email || !password}
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
  const [email, setEmail]       = useState(user.email ?? '')
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
        body: JSON.stringify({ user_id: user.id, category, title: title.trim(), body: body.trim(), photo_url, contact_email: email }),
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
          <label htmlFor="post-email" className="block text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: '#1C3D5A' }}>Contact Email (shown on post)</label>
          <input id="post-email" type="email" className={inputCls} style={inputStyle}
            value={email} onChange={e => setEmail(e.target.value)} />
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
function PostCard({ post, currentUser, onDeleted }: { post: Post; currentUser: User | null; onDeleted: () => void }) {
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments]         = useState<Comment[]>([])
  const [commentText, setCommentText]   = useState('')
  const [loadingC, setLoadingC]         = useState(false)
  const [submitting, setSubmitting]     = useState(false)
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
            <Avatar name={post.profiles?.display_name ?? '?'} />
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
        <h3 className="font-semibold text-base mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
          {post.title}
        </h3>
        <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#444' }}>{post.body}</p>

        {post.contact_email && (
          <a href={`mailto:${post.contact_email}`}
            className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
            style={{ backgroundColor: 'rgba(201,169,97,0.12)', color: '#8a6d1f' }}>
            ✉️ Contact: {post.contact_email}
          </a>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 mt-4 pt-4" style={{ borderTop: '1px solid #f0ece4' }}>
          <button onClick={toggleComments}
            className="flex items-center gap-1.5 text-sm transition-all hover:opacity-70"
            style={{ color: '#616161' }}
            aria-expanded={showComments}>
            💬 {commentCount > 0 ? `${commentCount} comment${commentCount !== 1 ? 's' : ''}` : 'Comment'}
          </button>
          {currentUser?.id === post.user_id && (
            <button onClick={deletePost} className="ml-auto text-xs transition-all hover:opacity-70" style={{ color: '#B03A2E' }}
              aria-label="Delete post">
              Delete
            </button>
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
                  <span className="font-semibold mr-2" style={{ color: '#1C3D5A' }}>{c.profiles?.display_name}</span>
                  <span style={{ color: '#444' }}>{c.body}</span>
                  <span className="ml-2 text-[10px]" style={{ color: '#bbb' }}>{timeAgo(c.created_at)}</span>
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
  const [user, setUser]           = useState<User | null>(null)
  const [showAuth, setShowAuth]   = useState(false)
  const [posts, setPosts]         = useState<Post[]>([])
  const [loading, setLoading]     = useState(true)
  const [category, setCategory]   = useState('all')

  // Check existing session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null))
    return () => subscription.unsubscribe()
  }, [])

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    const url = category === 'all' ? '/api/community/posts' : `/api/community/posts?category=${category}`
    const res = await fetch(url)
    const { posts: data } = await res.json()
    setPosts(data ?? [])
    setLoading(false)
  }, [category])

  useEffect(() => { fetchPosts() }, [fetchPosts])

  const signOut = async () => { await supabase.auth.signOut(); setUser(null) }

  return (
    <main className="min-h-screen" id="main-content" style={{ backgroundColor: '#F7F5F0' }}>
      {/* Auth modal */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onAuth={u => { setUser(u); setShowAuth(false) }}
        />
      )}

      {/* Header */}
      <div className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(to bottom, #1C3D5A 0%, #2a5278 100%)' }}>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: '#C9A961', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
          Bakersfield Rental Homes
        </p>
        <h1 className="text-4xl font-bold mb-3"
          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
          Bakersfield Neighbor Board
        </h1>
        <p className="text-sm font-light mb-6" style={{ color: 'rgba(247,245,240,0.65)' }}>
          Your local board for events, trades, farm goods, jobs, and everything Bakersfield
        </p>
        {user ? (
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm" style={{ color: 'rgba(247,245,240,0.8)' }}>
              Signed in as <strong>{user.email}</strong>
            </span>
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
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide" role="tablist" aria-label="Filter by category">
          {CATEGORIES.map(c => (
            <button key={c.id}
              role="tab"
              aria-selected={category === c.id}
              onClick={() => setCategory(c.id)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap"
              style={{
                backgroundColor: category === c.id ? '#1C3D5A' : 'white',
                color: category === c.id ? '#F7F5F0' : '#555',
                border: `1.5px solid ${category === c.id ? '#1C3D5A' : '#e0ddd8'}`,
              }}>
              {c.emoji} {c.label}
            </button>
          ))}
        </div>

        {/* Post button / form */}
        {user ? (
          <NewPostForm user={user} onPosted={fetchPosts} />
        ) : (
          <button onClick={() => setShowAuth(true)}
            className="w-full py-4 rounded-2xl text-sm font-semibold tracking-widest uppercase mb-6 transition-all hover:opacity-90"
            style={{ backgroundColor: '#C9A961', color: '#1C3D5A', letterSpacing: '0.1em' }}>
            Sign In to Post
          </button>
        )}

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
              <PostCard key={p.id} post={p} currentUser={user} onDeleted={fetchPosts} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
