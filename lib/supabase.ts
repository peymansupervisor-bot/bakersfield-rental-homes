import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role (bypasses RLS — only use in API routes)
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export type Listing = {
  id: string
  created_at: string
  status: 'pending' | 'active'
  stripe_session_id: string | null
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
  // Photos
  photos: string[]
  // Contact
  contact_name: string
  contact_email: string
  contact_phone: string | null
}
