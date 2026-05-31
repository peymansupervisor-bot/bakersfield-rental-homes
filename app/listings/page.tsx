import Link from 'next/link'
import type { Listing } from '@/lib/supabase'
import ListingsClient from './ListingsClient'

async function getListings(): Promise<Listing[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/listings?select=*&status=eq.active&order=created_at.desc`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
        next: { revalidate: 60 },
      }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function ListingsPage() {
  const listings = await getListings()
  return <ListingsClient initialListings={listings} />
}
