import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role (bypasses RLS — only use in API routes)
// Uses cache: 'no-store' to prevent Next.js 14 from caching Supabase fetch responses
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      global: {
        fetch: (url: RequestInfo | URL, options: RequestInit = {}) =>
          fetch(url, { ...options, cache: 'no-store' }),
      },
    }
  )
}

export type Vendor = {
  id: string
  created_at: string
  status: 'pending' | 'approved' | 'rejected'
  full_name: string
  business_name: string | null
  email: string
  phone: string
  license_number: string | null
  category: string
  service_areas: string[]
  notes: string | null
  w9_path: string | null
  drivers_license_path: string | null
  business_license_path: string | null
  insurance_company: string
  insurance_policy_number: string
  insurance_expiry: string | null
  insurance_certificate_path: string | null
}

/**
 * Verify the Bearer JWT in the Authorization header using the anon key client.
 * Returns the authenticated user's ID, or null if missing/invalid.
 */
export async function getAuthUserId(req: NextRequest): Promise<string | null> {
  const authHeader = req.headers.get('authorization') ?? ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) return null

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { fetch: (url, opts = {}) => fetch(url, { ...opts, cache: 'no-store' }) } }
  )
  const { data: { user }, error } = await client.auth.getUser(token)
  if (error || !user) return null
  return user.id
}

export function generateSlug(address: string): string {
  return address
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')  // strip special chars
    .trim()
    .replace(/\s+/g, '-')           // spaces → hyphens
    .replace(/-+/g, '-')            // collapse multiple hyphens
}

export type Listing = {
  id: string
  slug: string | null
  created_at: string
  status: 'pending' | 'active'
  stripe_session_id: string | null
  rental_status: 'rented' | 'pending' | 'vacant' | null
  // Location
  address: string
  city: string
  state: string
  zip: string
  lat: number | null
  lng: number | null
  // Property
  title: string
  description: string
  monthly_rent: number
  deposit: number
  bedrooms: number
  bathrooms: number
  living_area_sqft: number
  lot_size_sqft: number | null
  // Details
  available_date: string | null
  lease_term: string
  pets_allowed: boolean
  parking: string
  amenities: string[]
  // Market timing
  listed_date: string | null
  rented_date: string | null
  // Photos
  photos: string[]
  // Contact
  contact_name: string
  contact_email: string
  contact_phone: string | null
}
