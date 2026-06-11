import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Manage Your Own Rental Property | Bakersfield Landlord Guide',
  description: 'Managing your own rental property is entirely doable — if you approach it with the right mindset. A practical guide for Bakersfield landlords covering maintenance, tenant relations, and what separates a great landlord from a difficult one.',
  keywords: [
    'how to manage rental property',
    'self-managing landlord Bakersfield',
    'landlord tips Bakersfield CA',
    'property management tips California',
    'how to be a good landlord',
    'rental property maintenance tips',
    'landlord tenant relations California',
    'property management without a manager',
    'Bakersfield rental property owner guide',
    'deferred maintenance rental property',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/blog/how-to-manage-your-rental-property' },
  openGraph: {
    title: 'How to Manage Your Own Rental Property',
    description: 'Managing your own rental property is entirely doable — if you approach it with the right mindset. A practical guide for Bakersfield landlords.',
    url: 'https://bakersfieldrentalhomes.com/blog/how-to-manage-your-rental-property',
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'How to manage your rental property' }],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Manage Your Own Rental Property',
    description: 'A practical guide for Bakersfield landlords — maintenance, tenant relations, and the mindset that separates great landlords from difficult ones.',
    images: ['/opengraph-image'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bakersfieldrentalhomes.com' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://bakersfieldrentalhomes.com/blog' },
    { '@type': 'ListItem', position: 3, name: 'How to Manage Your Own Rental Property', item: 'https://bakersfieldrentalhomes.com/blog/how-to-manage-your-rental-property' },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Manage Your Own Rental Property',
  description: 'Managing your own rental property is entirely doable — if you approach it with the right mindset. A practical guide for Bakersfield landlords covering maintenance, tenant relations, and what separates a great landlord from a difficult one.',
  datePublished: '2026-06-11',
  dateModified: '2026-06-11',
  author: { '@type': 'Organization', name: 'Bakersfield Brokers', url: 'https://bakersfieldrentalhomes.com' },
  publisher: {
    '@type': 'Organization',
    name: 'Bakersfield Brokers',
    url: 'https://bakersfieldrentalhomes.com',
    logo: { '@type': 'ImageObject', url: 'https://bakersfieldrentalhomes.com/og-image.jpg' },
  },
  mainEntityOfPage: 'https://bakersfieldrentalhomes.com/blog/how-to-manage-your-rental-property',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need a property manager to manage my rental property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Self-managing a rental property is entirely achievable if you understand the process, stay organized, and treat your tenants with respect. Most landlords who hire property managers do so because of time constraints or because they own multiple units — not because the process is inherently too complex to handle yourself.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the most important quality of a good landlord?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Being a good landlord starts with being a good person. Before thinking about leases, rent collection, or maintenance schedules, a landlord must internalize that their tenant is a human being with legal rights and a life that depends on having safe, functional housing. Landlords who approach the role with strong moral values — honesty, fairness, and responsiveness — consistently have better tenant relationships, fewer legal disputes, and better-maintained properties.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly should a landlord respond to maintenance requests?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'California law requires landlords to address habitability issues within a reasonable timeframe — typically 30 days for non-urgent repairs, and as quickly as possible for urgent issues like plumbing failures, heating outages, or anything affecting health and safety. In practice, the best landlords treat every maintenance request as urgent: the faster you respond, the smaller the problem stays, the lower the cost, and the more trust you build with your tenant.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is deferred maintenance and why is it dangerous?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Deferred maintenance is the practice of delaying repairs and upkeep — either to save money in the short term or simply because it feels non-urgent. It is one of the costliest mistakes a landlord can make. A small roof leak ignored for six months becomes a mold problem, structural damage, and a potential habitability lawsuit. A dripping faucet becomes a damaged cabinet. Every deferred repair compounds. The rule is simple: fix it now, before it becomes something much worse.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does a vacant property still need maintenance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — a vacant property needs just as much attention as an occupied one, and in some ways more. Without a tenant present to notice a dripping pipe, a pest intrusion, or water damage from a window seal failure, small problems can go undetected for weeks. Landlords should inspect vacant properties at least twice a week, maintain landscaping, check all systems (HVAC, plumbing, electrical), and address anything immediately rather than waiting until a new tenant moves in.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I handle a difficult tenant situation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Start by listening without judgment. Most tenant complaints — noise, maintenance delays, neighbor conflicts — have a practical resolution if both parties approach the conversation in good faith. Document everything in writing, respond promptly, and always assume the tenant has a legitimate concern until you verify otherwise. If a situation escalates beyond what you can resolve directly, consult a California landlord-tenant attorney before taking any formal action.',
      },
    },
  ],
}

const SECTIONS = [
  {
    id: 'mindset',
    title: 'Start Here: Being a Good Person Comes Before Being a Property Owner',
    content: [
      'Before you think about lease agreements, rent collection schedules, or maintenance checklists — before any of that — ask yourself a more fundamental question: am I approaching this role with the right values?',
      'Managing a rental property is not just a financial transaction. Your tenant is trusting you with something essential: the roof over their head, the place where their children sleep, where they recover from illness, where they begin and end every single day. That is a profound responsibility. And the landlords who truly understand that are the ones who handle the job well.',
      'A landlord with strong moral values does not need to be reminded to fix a broken heater — they fix it because they would want it fixed if it were their home. They do not need a law to tell them to return a security deposit on time — they do it because it is the right thing to do. They respond to maintenance requests quickly not to avoid a lawsuit but because they genuinely care about the person living in their property.',
      'This is not idealism. It is the most practical advice in this entire guide. Landlords who lead with integrity have fewer disputes, longer tenancies, better-maintained properties, and better reputations. The mindset shapes everything that follows.',
    ],
  },
  {
    id: 'rights',
    title: 'Your Tenant Has Rights — Know Them and Respect Them',
    content: [
      'California has some of the strongest tenant protections in the United States. As a self-managing landlord, you are responsible for knowing these laws — ignorance is not a defense, and violations can be costly.',
      'Every tenant has the right to a habitable home. California Civil Code §1941 defines habitability clearly: working plumbing and heating, weatherproofing, no pest infestations, functioning smoke and carbon monoxide detectors, adequate lighting in common areas, and premises free of mold and structural hazards. This is not optional. It is the baseline you must meet at all times.',
      'Tenants also have the right to quiet enjoyment — meaning you cannot enter the property without proper notice (generally 24 hours in California), cannot harass or intimidate them, and cannot interfere with their right to live peacefully in the home. Even if a tenant is behind on rent or in violation of their lease, you must follow the proper legal process. There are no shortcuts.',
      'Know the rules on security deposits, rent increases, eviction notice requirements, and retaliation. If a tenant files a complaint about habitability and you respond by raising their rent or threatening eviction — that is illegal retaliation under California law. The best protection against all of this is simple: treat your tenant the way you would want to be treated.',
    ],
  },
  {
    id: 'responsiveness',
    title: 'Act Immediately — Do Not Let Problems Sit',
    content: [
      'The single most common failure pattern among self-managing landlords is delay. A maintenance request comes in on a Friday afternoon, and the landlord thinks: "I\'ll deal with it Monday." Monday becomes next week. Next week becomes next month. What was a $200 repair becomes a $2,000 problem — and a tenant who no longer trusts you.',
      'Speed of response is one of the clearest signals a landlord can send. When a tenant submits a repair request and hears back within hours, they feel heard. They feel respected. They are far more likely to renew their lease, take care of the property, and communicate openly about future issues. When a landlord goes silent for days, the tenant starts to feel like they don\'t matter — and the relationship deteriorates from there.',
      'Set a personal rule: every maintenance request gets a response within 24 hours, even if the response is simply "I received your message and I\'m scheduling a repair for [date]." Acknowledgment matters. Silence is corrosive.',
      'For urgent issues — no hot water, a broken heater in winter, a plumbing leak, an electrical hazard — treat it as an emergency. Not because the law requires it (though it does), but because that is how you would want someone to respond if it were your home.',
    ],
  },
  {
    id: 'maintenance',
    title: 'Never Defer Maintenance — On Occupied or Vacant Properties',
    content: [
      'Deferred maintenance is the silent destroyer of rental property value. Every repair you push off compounds. A hairline crack in a bathroom caulk line becomes a water-damaged subfloor. A slow HVAC drain line becomes a ceiling stain and mold. A worn weatherstrip becomes a drafty unit, a higher energy bill, and a tenant complaint. None of these start as expensive problems. They become expensive because no one acted.',
      'The math is simple: a $150 repair today prevents a $1,500 repair in six months. A $400 plumber visit now prevents a $4,000 pipe replacement later. Proactive maintenance is not an expense — it is the cheapest form of property protection available to you.',
      'Build a maintenance calendar. Schedule annual HVAC servicing, biannual gutter cleaning, quarterly pest inspections, and regular walkthroughs of the exterior. Do not wait for something to break before you look at it. A good landlord inspects proactively, identifies wear before it becomes failure, and addresses it immediately.',
      'This discipline is especially important between tenancies. When a tenant moves out, do not rush to list the property before doing a thorough inspection and completing all necessary repairs. A property that is truly move-in ready — with everything functioning perfectly — commands a better tenant and a better rent. Cut corners on the turnover and you will pay for it later.',
    ],
  },
  {
    id: 'vacant-maintenance',
    title: 'Vacant Properties Still Need Your Attention',
    content: [
      'Many landlords make the mistake of treating a vacant property as a property on pause — as if nothing can go wrong while no one is living there. In reality, the opposite is often true. Without a tenant present to notice and report issues, small problems can develop undetected for weeks.',
      'A pipe fitting that begins to weep under the kitchen sink will cause no problem for three days. After three weeks, the cabinet base is rotted, the subfloor is saturated, and you are looking at a significant repair bill. A bird\'s nest in a dryer vent, a pest entry point behind a cabinet, a cracked window seal — all of these go unnoticed in a vacant property unless someone is actively looking.',
      'Visit your vacant property at least twice a week. Walk every room. Run the faucets, flush the toilets, check under sinks, look at the ceiling for any new stains, check the exterior for anything unusual. Keep the landscape maintained — an overgrown property signals vacancy and invites vandalism and unauthorized entry.',
      'Maintain all systems as if someone is living there. Keep utilities active. Run the HVAC system periodically to prevent seals from drying out and pests from nesting in ducts. A property that is maintained during vacancy is ready for a new tenant immediately — and a property that is ready immediately means zero lost rent days.',
    ],
  },
  {
    id: 'process',
    title: 'Know the Process and Stay Organized',
    content: [
      'Managing a rental property is not difficult — but it does require organization. The landlords who struggle are usually the ones who operate reactively, without systems. The landlords who thrive have simple, consistent processes that remove the guesswork.',
      'Keep a dedicated folder (physical or digital) for every property. It should contain: the signed lease, a move-in inspection report with photos, all maintenance requests and their resolutions, copies of any notices sent to the tenant, and records of all payments received. If a dispute ever arises, your documentation is everything.',
      'Use a separate bank account for rental income and expenses. Mixing rental income with personal finances makes accounting difficult and creates problems at tax time. Every repair, every mortgage payment, every insurance premium — keep it clean and separate.',
      'Screen tenants consistently and fairly. California\'s Fair Housing laws prohibit discrimination based on race, color, national origin, religion, sex, familial status, disability, source of income, sexual orientation, gender identity, and several other protected characteristics. Screen every applicant using the same objective criteria: income verification, rental history, and credit. Document your process so it is demonstrably consistent.',
      'When it is time to raise rent, raise it at the right time (lease renewal), give proper notice (30 days for increases of 10% or less, 90 days for more), and be reasonable. Losing a good tenant to save $100 a month in rent is almost never the right financial decision when you factor in vacancy, turnover costs, and the risk of a worse tenant.',
    ],
  },
  {
    id: 'relationship',
    title: 'The Landlord-Tenant Relationship Is a Partnership',
    content: [
      'The most successful landlords think of their tenants not as a source of income to be maximized, but as partners in the care of a shared asset. Your tenant is the person on the ground — the one who notices when something is wrong, who keeps the place clean, who interacts with the neighbors, who determines whether the property is well-maintained on a daily basis. A tenant who respects and trusts their landlord will treat the property with care. A tenant who feels ignored or taken advantage of will not.',
      'Communicate openly and honestly. If you need to enter the property, give proper notice and explain why. If a repair is going to take longer than expected, let the tenant know — and apologize for the inconvenience. Simple human decency goes an enormous distance in a landlord-tenant relationship.',
      'When a tenant raises a concern, listen before you respond. Resist the instinct to be defensive. Most tenant complaints are legitimate, and even when they are not, dismissing them immediately destroys trust. Ask questions, acknowledge the concern, and respond with a concrete plan of action.',
      'The Bakersfield rental market is a community. Tenants talk to each other, leave reviews, and share experiences. Your reputation as a landlord follows you. Build it on a foundation of fairness, responsiveness, and genuine care — and the practical rewards will follow: long-term tenancies, lower vacancy rates, and a property that holds its value.',
    ],
  },
]

export default function HowToManagePropertyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content">

        {/* Hero */}
        <section
          className="py-20 px-6 text-center"
          style={{ backgroundColor: '#1C3D5A' }}
          aria-labelledby="article-heading"
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#C9A961' }}>
              Bakersfield Brokers · Landlord Guide
            </p>
            <h1
              id="article-heading"
              className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}
            >
              How to Manage Your Own Rental Property
            </h1>
            <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: 'rgba(247,245,240,0.8)' }}>
              It is not as complicated as it seems — but it starts with the right values, not the right paperwork.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm" style={{ color: 'rgba(247,245,240,0.6)' }}>
              <span>June 2026</span>
              <span aria-hidden="true">·</span>
              <span>8 min read</span>
              <span aria-hidden="true">·</span>
              <span>Landlord Guide</span>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <nav className="max-w-3xl mx-auto px-6 py-8" aria-label="Article sections">
          <div className="rounded-2xl p-6" style={{ backgroundColor: '#fff', border: '1px solid rgba(201,169,97,0.2)' }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#C9A961' }}>In This Guide</p>
            <ol className="space-y-2 list-none p-0 m-0">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-sm hover:underline" style={{ color: '#1C3D5A' }}>
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#faq" className="text-sm hover:underline" style={{ color: '#1C3D5A' }}>
                  7. Frequently Asked Questions
                </a>
              </li>
            </ol>
          </div>
        </nav>

        {/* Article Body */}
        <article className="max-w-3xl mx-auto px-6 pb-16" aria-label="Article content">
          {SECTIONS.map((section) => (
            <section key={section.id} id={section.id} className="mb-12" aria-labelledby={`heading-${section.id}`}>
              <h2
                id={`heading-${section.id}`}
                className="text-2xl font-bold mb-5"
                style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}
              >
                {section.title}
              </h2>
              {section.content.map((para, i) => (
                <p key={i} className="text-base leading-relaxed mb-4" style={{ color: '#333' }}>
                  {para}
                </p>
              ))}
            </section>
          ))}

          {/* Pull Quote */}
          <blockquote
            className="rounded-2xl p-7 mb-12"
            style={{ backgroundColor: 'rgba(28,61,90,0.05)', borderLeft: '4px solid #C9A961' }}
          >
            <p className="text-lg font-medium leading-relaxed" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              &ldquo;Before being a property owner, think of yourself as a good person with moral codes. That is important — because then you will take action quickly to resolve issues as soon as they arise.&rdquo;
            </p>
            <p className="text-sm mt-3" style={{ color: '#888' }}>— Bakersfield Brokers</p>
          </blockquote>

          {/* FAQ */}
          <section id="faq" className="mb-12" aria-labelledby="faq-heading">
            <h2
              id="faq-heading"
              className="text-2xl font-bold mb-6"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqSchema.mainEntity.map((item, i) => (
                <div key={i} className="rounded-2xl p-6" style={{ backgroundColor: '#fff', border: '1px solid rgba(201,169,97,0.15)' }}>
                  <h3 className="text-base font-semibold mb-2" style={{ color: '#1C3D5A' }}>{item.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#555' }}>{item.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* CTA */}
        <section className="py-16 px-6 text-center" style={{ backgroundColor: '#1C3D5A' }}>
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
            Ready to List Your Bakersfield Rental?
          </h2>
          <p className="text-base mb-7 max-w-md mx-auto" style={{ color: 'rgba(247,245,240,0.8)' }}>
            Join the landlords listing directly on Bakersfield&apos;s platform — no broker fees, no middlemen. Your listing goes live after a quick identity verification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/list"
              className="px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}
            >
              List Your Property — Free
            </Link>
            <Link
              href="/listings"
              className="px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: 'transparent', color: '#F7F5F0', border: '1px solid rgba(247,245,240,0.4)' }}
            >
              Browse Listings
            </Link>
          </div>
        </section>

      </main>
    </>
  )
}
