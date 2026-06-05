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
    tagline: 'Top-rated schools and spacious family homes',
    description:
      'Northwest Bakersfield is one of the most sought-after rental areas in Kern County. Known for newer construction, wide streets, and highly rated schools in the Panama-Buena Vista and Rosedale Union districts. Direct landlord rentals here mean faster approvals and no broker fees.',
    zips: ['93312', '93314'],
    highlights: ['Top-rated schools', 'Newer homes', 'Safe neighborhoods', 'Easy freeway access'],
  },
  {
    slug: 'southwest-bakersfield',
    name: 'Southwest Bakersfield',
    tagline: 'Quiet suburban living at affordable prices',
    description:
      'Southwest Bakersfield offers a mix of established neighborhoods and newer developments with some of the best rental value in the city. Close to shopping, medical facilities, and Hwy 99, it\'s a practical choice for renters who want space without paying premium prices. Many properties here are rented directly by owners.',
    zips: ['93309', '93311'],
    highlights: ['Affordable rents', 'Established neighborhoods', 'Shopping nearby', 'Medical facilities close'],
  },
  {
    slug: 'rosedale',
    name: 'Rosedale',
    tagline: 'Peaceful suburban feel with great schools',
    description:
      'Rosedale is a quiet, established community on the northwest edge of Bakersfield with a strong sense of neighborhood. The Rosedale Union School District is highly regarded, and the area\'s mature trees and well-kept homes make it one of the most desirable rental markets in the city. Find homes rented directly by local landlords.',
    zips: ['93312'],
    highlights: ['Rosedale Union schools', 'Tree-lined streets', 'Low traffic', 'Community feel'],
  },
  {
    slug: 'east-bakersfield',
    name: 'East Bakersfield',
    tagline: 'Most affordable rentals close to downtown',
    description:
      'East Bakersfield offers some of the most affordable rental prices in the city. Close to downtown, the 58 freeway, and Bakersfield College, it\'s a practical location with strong community character. Many landlords rent directly, skipping the middleman.',
    zips: ['93305', '93307'],
    highlights: ['Lowest rents in Bakersfield', 'Near Bakersfield College', 'Downtown access', 'Strong community'],
  },
  {
    slug: 'oleander-sunset',
    name: 'Oleander-Sunset',
    tagline: 'Central location with walkable charm',
    description:
      'Oleander-Sunset sits in the heart of Bakersfield — walkable, central, and full of character. Mid-century homes, proximity to dining and parks, and easy access to all parts of the city make this a favorite for renters who want to be close to everything. Direct landlord rentals are common in this established area.',
    zips: ['93301', '93304'],
    highlights: ['Central location', 'Walkable streets', 'Character homes', 'Near dining and parks'],
  },
]

export function getNeighborhood(slug: string): Neighborhood | undefined {
  return NEIGHBORHOODS.find(n => n.slug === slug)
}
