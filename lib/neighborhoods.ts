export type Neighborhood = {
  slug: string
  name: string
  tagline: string
  description: string
  zips: string[]
  highlights: string[]
}

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    slug: 'northwest-bakersfield',
    name: 'Northwest Bakersfield',
    tagline: 'Newer construction and spacious homes',
    description:
      'Northwest Bakersfield features newer construction, wide streets, and convenient access to major shopping centers and parks. The Panama-Buena Vista and Rosedale Union school districts serve this area. Direct landlord rentals here mean faster approvals and no broker fees.',
    zips: ['93312', '93314'],
    highlights: ['Newer homes', 'Near shopping', 'Easy freeway access', 'Parks nearby'],
  },
  {
    slug: 'southwest-bakersfield',
    name: 'Southwest Bakersfield',
    tagline: 'Established neighborhoods at competitive rents',
    description:
      'Southwest Bakersfield offers a mix of established neighborhoods and newer developments with competitive rental rates. Close to shopping, medical facilities, and Hwy 99, it\'s a convenient location with a range of home sizes and styles. Many properties here are rented directly by owners.',
    zips: ['93309', '93311'],
    highlights: ['Competitive rents', 'Established neighborhoods', 'Shopping nearby', 'Medical facilities close'],
  },
  {
    slug: 'rosedale',
    name: 'Rosedale',
    tagline: 'Established community on the northwest edge',
    description:
      'Rosedale is an established community on the northwest edge of Bakersfield with tree-lined streets and well-maintained homes. The area offers easy access to parks, shopping, and major roads. Find homes rented directly by local landlords.',
    zips: ['93312'],
    highlights: ['Tree-lined streets', 'Low traffic', 'Parks nearby', 'Community feel'],
  },
  {
    slug: 'east-bakersfield',
    name: 'East Bakersfield',
    tagline: 'Affordable rentals close to downtown',
    description:
      'East Bakersfield offers some of the most affordable rental prices in the city. Close to downtown, the 58 freeway, and Bakersfield College, it\'s a convenient location with strong community character. Many landlords rent directly, skipping the middleman.',
    zips: ['93305', '93307'],
    highlights: ['Affordable rents', 'Near Bakersfield College', 'Downtown access', 'Strong community'],
  },
  {
    slug: 'oleander-sunset',
    name: 'Oleander-Sunset',
    tagline: 'Central location with walkable streets',
    description:
      'Oleander-Sunset sits in the heart of Bakersfield — centrally located and close to dining, parks, and transit. Mid-century homes and easy access to all parts of the city make this a convenient area for renters. Direct landlord rentals are common in this established neighborhood.',
    zips: ['93301', '93304'],
    highlights: ['Central location', 'Walkable streets', 'Near dining and parks', 'Transit access'],
  },
]

export function getNeighborhood(slug: string): Neighborhood | undefined {
  return NEIGHBORHOODS.find(n => n.slug === slug)
}
