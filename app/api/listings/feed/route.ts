import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// RESO Web API – Residential Lease (RES) feed
// Compatible with ListHub, Zillow feed ingestion, Zumper, and other aggregators
// Spec: https://www.reso.org/reso-web-api/
export async function GET() {
  const db = createServiceClient()
  const { data: listings, error } = await db
    .from('listings')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const baseUrl = 'https://bakersfieldrentalhomes.com'

  const value = (listings ?? []).map((l) => ({
    // ── RESO standard fields ──────────────────────────────────────────────────
    ListingKey:              l.id,
    ListingId:               l.slug ?? l.id,
    ModificationTimestamp:   l.created_at,
    ListingContractDate:     l.listed_date ?? l.created_at?.split('T')[0],
    PropertyType:            'Residential Lease',
    PropertySubType:         bedsToSubType(l.bedrooms),

    // Location
    UnparsedAddress:         `${l.address}, ${l.city}, ${l.state} ${l.zip ?? ''}`.trim(),
    StreetAddress:           l.address,
    City:                    l.city,
    StateOrProvince:         l.state ?? 'CA',
    PostalCode:              l.zip ?? '',
    Country:                 'US',
    Latitude:                l.lat ?? null,
    Longitude:               l.lng ?? null,

    // Property details
    PublicRemarks:           l.description,
    BedroomsTotal:           l.bedrooms,
    BathroomsTotalInteger:   Math.floor(l.bathrooms),
    BathroomsFull:           Math.floor(l.bathrooms),
    BathroomsHalf:           (l.bathrooms % 1 >= 0.5) ? 1 : 0,
    LivingArea:              l.living_area_sqft,
    LivingAreaUnits:         'Square Feet',
    LotSizeSquareFeet:       l.lot_size_sqft ?? null,

    // Rental-specific
    ListPrice:               l.monthly_rent,
    ListPriceLow:            l.monthly_rent,
    DepositAmount:           l.deposit,
    LeaseTerm:               l.lease_term ?? '12 Months',
    PetsAllowed:             l.pets_allowed ? ['Yes'] : ['No'],
    Parking:                 l.parking ?? 'Street',
    Amenities:               l.amenities ?? [],
    AvailabilityDate:        l.available_date ?? null,

    // Status
    MlsStatus:               'Active',
    StandardStatus:          'Active',
    RentableAreaUnits:       'Square Feet',

    // Media
    Media: (l.photos ?? []).map((url: string, i: number) => ({
      Order:        i + 1,
      MediaURL:     url,
      MediaType:    'Photo',
      IsPrimary:    i === 0,
    })),

    // Listing URL
    ListingURL: `${baseUrl}/listings/${l.slug ?? l.id}`,

    // Agent / contact — brand name used intentionally to avoid exposing landlord identity
    ListAgentFullName:  'Bakersfield Rental Homes',
    ListAgentEmail:     'info@bakersfieldrentalhomes.com',
    ListAgentPhone:     null,
    ListOfficeName:     'Bakersfield Rental Homes',
    ListOfficeURL:      baseUrl,
  }))

  const feed = {
    '@odata.context': `${baseUrl}/api/listings/feed/$metadata#Property`,
    '@odata.count':   value.length,
    value,
  }

  return NextResponse.json(feed, {
    headers: {
      'Content-Type': 'application/json;odata.metadata=minimal',
      // Allow aggregators to cache for 1 hour
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

function bedsToSubType(beds: number): string {
  if (beds === 0) return 'Studio'
  if (beds === 1) return 'Single Family Residence'
  if (beds <= 4) return 'Single Family Residence'
  return 'Multi Family'
}
