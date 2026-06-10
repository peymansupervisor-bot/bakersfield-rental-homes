export type NeighborhoodFaq = {
  q: string
  a: string
}

export type Neighborhood = {
  slug: string
  name: string
  tagline: string
  description: string
  zips: string[]
  highlights: string[]
  avgRent: string
  bestFor: string
  vibe: string
  schools: string[]
  commute: string
  nearbyLandmarks: string[]
  faqs: NeighborhoodFaq[]
}

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    slug: 'northwest-bakersfield',
    name: 'Northwest Bakersfield',
    tagline: 'Newer construction and spacious homes',
    vibe: 'Suburban, family-friendly, and fast-growing',
    description:
      'Northwest Bakersfield is the city\'s fastest-growing corridor — a stretch of newer master-planned communities, wide streets, and well-maintained parks that attracts young families and professionals alike. Built largely since 2000, homes here are more modern than in older Bakersfield neighborhoods, with open floor plans, attached garages, and landscaped front yards. The area borders Rosedale and the unincorporated communities of Kern County, giving it a quieter suburban character while still being minutes from major retail on Rosedale Highway and the Haggin Oaks shopping center. Rental prices are competitive given the home quality, and landlords in this corridor frequently rent direct — no broker fees, no middlemen.',
    zips: ['93312', '93314'],
    highlights: ['Newer homes', 'Near shopping', 'Easy freeway access', 'Parks nearby'],
    avgRent: '$1,600–$2,400/mo',
    bestFor: 'Families, professionals relocating from larger cities, anyone wanting newer construction',
    schools: ['Panama-Buena Vista USD', 'Rosedale Union SD', 'Centennial High School', 'Norris SD (southern portions)'],
    commute: 'Easy access to Hwy 99 and the 58 freeway. Downtown Bakersfield is ~15–20 min. Meadows Field Airport is ~10 min north.',
    nearbyLandmarks: ['Haggin Oaks Shopping Center', 'The Marketplace', 'Frugatti\'s Italian Eatery', 'Riverlakes Golf Course', 'Northwest Bakersfield Regional Park'],
    faqs: [
      {
        q: 'What is the average rent in Northwest Bakersfield?',
        a: 'As of 2026, rental homes in Northwest Bakersfield typically range from $1,600 to $2,400 per month for single-family homes. Newer construction and larger square footage push rents toward the higher end of this range compared to older Bakersfield neighborhoods.',
      },
      {
        q: 'What school district serves Northwest Bakersfield?',
        a: 'Most of Northwest Bakersfield is served by Panama-Buena Vista Unified School District and Rosedale Union School District — both consistently rated among the better-performing districts in Kern County. High school students typically attend Centennial or Liberty High.',
      },
      {
        q: 'Is Northwest Bakersfield a good place to live?',
        a: 'Yes — Northwest Bakersfield is one of the most sought-after rental areas in the city. The combination of newer homes, good schools, low traffic, and proximity to retail makes it popular with families and professionals.',
      },
    ],
  },
  {
    slug: 'southwest-bakersfield',
    name: 'Southwest Bakersfield',
    tagline: 'Established neighborhoods at competitive rents',
    vibe: 'Convenient, central, and well-connected',
    description:
      'Southwest Bakersfield sits between the urban core and the newer suburban communities to the north and west. It\'s one of the most convenient locations in the city — close to the main shopping corridors on Ming Avenue and Panama Lane, with easy access to Hwy 99 and Highway 58. The area includes a mix of established neighborhoods from the 1970s–1990s and newer pockets of development, offering renters a wide range of home styles and price points. Panama-Buena Vista USD serves much of the area, and the proximity to Bakersfield Memorial Hospital and other medical facilities makes it particularly popular with healthcare workers. Many homes here are rented directly by owners — a common pattern in this established, stable community.',
    zips: ['93309', '93311'],
    highlights: ['Competitive rents', 'Established neighborhoods', 'Shopping nearby', 'Medical facilities close'],
    avgRent: '$1,400–$2,100/mo',
    bestFor: 'Healthcare workers, families, renters who want central access without downtown prices',
    schools: ['Panama-Buena Vista USD', 'South High School', 'Stockdale High School', 'Kern High School District'],
    commute: 'Centrally located — Hwy 99 access via Ming Ave. Downtown Bakersfield ~10–15 min. Major employers along Coffee Road corridor are 5–10 min away.',
    nearbyLandmarks: ['Valley Plaza Mall', 'Ming Avenue Shopping District', 'Bakersfield Memorial Hospital', 'Yokuts Park', 'The Marketplace (nearby)'],
    faqs: [
      {
        q: 'How much does it cost to rent in Southwest Bakersfield?',
        a: 'Rental homes in Southwest Bakersfield typically range from $1,400 to $2,100 per month as of 2026, making it one of the more affordable options for established neighborhoods with good schools and convenient access to shopping and medical facilities.',
      },
      {
        q: 'What schools serve Southwest Bakersfield?',
        a: 'Southwest Bakersfield is primarily served by Panama-Buena Vista Unified School District. High school students typically attend South High School or Stockdale High School, both part of the Kern High School District.',
      },
      {
        q: 'Is Southwest Bakersfield safe?',
        a: 'Southwest Bakersfield is considered one of the more stable and family-friendly areas of the city. The established neighborhoods along Ming Avenue and Panama Lane corridors have lower crime rates than East or Central Bakersfield.',
      },
    ],
  },
  {
    slug: 'rosedale',
    name: 'Rosedale',
    tagline: 'Established community on the northwest edge',
    vibe: 'Quiet, tree-lined, and community-oriented',
    description:
      'Rosedale occupies the northwest edge of Bakersfield, straddling the city limits and unincorporated Kern County. It\'s known for its mature tree canopy, well-kept streets, and a strong sense of neighborhood identity that distinguishes it from the newer developments to its east. Many of the homes are from the 1980s and 1990s — built to last, with real yards and established landscaping. Rosedale\'s residents tend to stay long-term, and the area has a low rental turnover rate. When homes do become available to rent, they go quickly — often rented directly by long-time local owners who prefer to avoid brokers. The nearby Rosedale Highway retail corridor provides convenient shopping without the traffic of larger commercial zones.',
    zips: ['93312'],
    highlights: ['Tree-lined streets', 'Low traffic', 'Parks nearby', 'Community feel'],
    avgRent: '$1,500–$2,200/mo',
    bestFor: 'Long-term renters, families who want stability and community, pet owners with dogs who need real yards',
    schools: ['Rosedale Union School District', 'Norris SD', 'Liberty High School', 'Centennial High School'],
    commute: 'Rosedale Highway connects directly to Hwy 99. Downtown Bakersfield is ~20 min. Less freeway noise than eastern neighborhoods.',
    nearbyLandmarks: ['Rosedale Highway Retail Corridor', 'Bakersfield Country Club (adjacent)', 'Riverlakes Golf Course', 'Hart Memorial Park', 'Vons and Stater Bros shopping centers'],
    faqs: [
      {
        q: 'What is rent like in Rosedale Bakersfield?',
        a: 'Rents in Rosedale typically range from $1,500 to $2,200 per month as of 2026 for single-family homes. The neighborhood\'s mature character, good schools, and low turnover keep demand steady.',
      },
      {
        q: 'What schools are in the Rosedale area of Bakersfield?',
        a: 'Rosedale is served by Rosedale Union School District for K-8 and Kern High School District for high school, with students typically attending Liberty or Centennial High. Rosedale Union is one of the higher-rated elementary districts in Kern County.',
      },
      {
        q: 'Is Rosedale a good neighborhood to rent in Bakersfield?',
        a: 'Rosedale is consistently one of the most desirable rental areas in Bakersfield. The combination of tree-lined streets, good schools, low crime, and a genuine neighborhood feel makes it popular with families and long-term renters. Availability is limited — listings move quickly.',
      },
    ],
  },
  {
    slug: 'east-bakersfield',
    name: 'East Bakersfield',
    tagline: 'Affordable rentals close to downtown',
    vibe: 'Historic, diverse, and close to the action',
    description:
      'East Bakersfield is one of the oldest and most historically significant parts of the city — a neighborhood with deep roots in Bakersfield\'s oil, railroad, and agriculture heritage. Home to Bakersfield College, the area has a lively, diverse community with a concentration of local restaurants, independent businesses, and cultural institutions that you won\'t find in the newer suburban corridors. Rents are among the lowest in the city, making East Bakersfield attractive for students, young professionals, and anyone prioritizing budget without sacrificing access to downtown, transit, and community character. The 58 freeway runs nearby, and the Kern River trails are a short drive. Many properties in the area are rented directly by owners — keeping costs lower and approvals faster.',
    zips: ['93305', '93307'],
    highlights: ['Affordable rents', 'Near Bakersfield College', 'Downtown access', 'Strong community'],
    avgRent: '$1,000–$1,600/mo',
    bestFor: 'Students, budget-conscious renters, people who value walkability and local culture over suburban amenities',
    schools: ['Bakersfield City School District', 'Kern High School District', 'East High School', 'Bakersfield College (nearby)'],
    commute: 'Close to downtown and the 58 freeway. Transit routes are more accessible here than in suburban areas. Bakersfield College is walkable from many addresses.',
    nearbyLandmarks: ['Bakersfield College', 'The Padre Hotel (downtown)', 'Kern County Museum', 'Mechanics Bank Arena', 'Bakersfield Amtrak Station', 'Kern River Parkway'],
    faqs: [
      {
        q: 'How much is rent in East Bakersfield?',
        a: 'East Bakersfield is one of the most affordable rental markets in the city, with homes typically ranging from $1,000 to $1,600 per month as of 2026. It\'s the best option for renters who want the most space for their budget while staying close to downtown and Bakersfield College.',
      },
      {
        q: 'Is East Bakersfield safe to rent in?',
        a: 'East Bakersfield has historically had higher crime rates than the city\'s western neighborhoods. However, many streets — particularly those near Bakersfield College and the established residential blocks — are stable and family-occupied. Research specific streets and zip codes (93305 vs 93307) before committing.',
      },
      {
        q: 'Is East Bakersfield good for college students?',
        a: 'Yes — East Bakersfield is the most practical area for Bakersfield College students. Many rental homes are within walking or biking distance of campus, and rents are significantly lower than the northwest or southwest corridors. Direct landlord rentals in this area are common and tend to have flexible lease terms.',
      },
    ],
  },
  {
    slug: 'oleander-sunset',
    name: 'Oleander-Sunset',
    tagline: 'Central location with walkable streets',
    vibe: 'Mid-century charm, central, and walkable',
    description:
      'Oleander-Sunset sits at the geographic and cultural heart of Bakersfield — a neighborhood of mid-century homes, mature shade trees, and walkable streets that connect to the city\'s dining, arts, and transit infrastructure. Unlike the newer suburban communities to the northwest, Oleander-Sunset has character: bungalows from the 1940s–60s, neighborhood parks, and a mix of long-time residents and newer arrivals who chose the area specifically for its proximity to everything. The neighborhood is popular with young professionals, artists, and renters who want to walk to coffee shops and restaurants rather than drive. Rents are moderate — higher than East Bakersfield, lower than Northwest — and many properties are rented directly by local owners who have held them for years.',
    zips: ['93301', '93304'],
    highlights: ['Central location', 'Walkable streets', 'Near dining and parks', 'Transit access'],
    avgRent: '$1,200–$1,900/mo',
    bestFor: 'Young professionals, creatives, renters who value walkability, mid-century architecture enthusiasts',
    schools: ['Bakersfield City School District', 'Kern High School District', 'Bakersfield High School', 'Garces Memorial High School (nearby)'],
    commute: 'Central location means equal access to all parts of the city. Downtown Bakersfield is walkable or a 5-min drive. Hwy 99 access via California Ave or Truxtun Ave.',
    nearbyLandmarks: ['Bakersfield Museum of Art', 'Centennial Garden & Arena', 'McMurtrey Aquatics Center', 'Oleander Park', 'Downtown Bakersfield restaurants and bars', 'California Avenue corridor'],
    faqs: [
      {
        q: 'What is the average rent in Oleander-Sunset Bakersfield?',
        a: 'Rental homes in the Oleander-Sunset area typically range from $1,200 to $1,900 per month as of 2026. The central location and neighborhood character command a modest premium over East Bakersfield while remaining more affordable than Northwest Bakersfield.',
      },
      {
        q: 'What is Oleander-Sunset like as a neighborhood?',
        a: 'Oleander-Sunset is one of Bakersfield\'s most distinct neighborhoods — known for its mid-century homes, mature trees, and walkable character. It\'s popular with young professionals and anyone who wants a real neighborhood feel rather than a suburban development. The area has a strong sense of community identity.',
      },
      {
        q: 'Is Oleander-Sunset walkable?',
        a: 'By Bakersfield standards, yes — Oleander-Sunset is one of the more walkable neighborhoods in the city. Residents can walk to parks, local restaurants along the California Avenue corridor, and several transit stops. It\'s significantly more walkable than the northwest or southwest suburban areas.',
      },
    ],
  },
]

export function getNeighborhood(slug: string): Neighborhood | undefined {
  return NEIGHBORHOODS.find(n => n.slug === slug)
}
