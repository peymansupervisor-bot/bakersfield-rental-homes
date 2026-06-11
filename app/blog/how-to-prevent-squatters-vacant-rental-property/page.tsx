import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Prevent Squatters in Your Vacant Rental Property | Bakersfield Landlord Guide',
  description: 'Practical steps Bakersfield landlords can take to keep squatters out of vacant rental properties — security cameras, smart locks, alarm systems, and legal remedies under California law.',
  keywords: [
    'how to prevent squatters',
    'squatters vacant rental property California',
    'prevent squatters Bakersfield',
    'landlord tips vacant property security',
    'squatter laws California',
    'Vivint security system landlord',
    'home security vacant rental',
    'how to protect empty rental property',
    'adverse possession California',
    'squatter removal California',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/blog/how-to-prevent-squatters-vacant-rental-property' },
  openGraph: {
    title: 'How to Prevent Squatters in Your Vacant Rental Property',
    description: 'Practical steps Bakersfield landlords can take to keep squatters out of vacant rental properties — security cameras, alarm systems, and California legal remedies.',
    url: 'https://bakersfieldrentalhomes.com/blog/how-to-prevent-squatters-vacant-rental-property',
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'How to prevent squatters in vacant rental property' }],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Prevent Squatters in Your Vacant Rental Property',
    description: 'Security cameras, smart locks, alarm systems, and California legal steps to protect your vacant rental from squatters.',
    images: ['/opengraph-image'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bakersfieldrentalhomes.com' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://bakersfieldrentalhomes.com/blog' },
    { '@type': 'ListItem', position: 3, name: 'How to Prevent Squatters in Your Vacant Rental Property', item: 'https://bakersfieldrentalhomes.com/blog/how-to-prevent-squatters-vacant-rental-property' },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Prevent Squatters in Your Vacant Rental Property',
  description: 'Practical steps Bakersfield landlords can take to keep squatters out of vacant rental properties — security cameras, alarm systems, and California legal remedies.',
  datePublished: '2026-06-11',
  dateModified: '2026-06-11',
  author: { '@type': 'Organization', name: 'Bakersfield Brokers', url: 'https://bakersfieldrentalhomes.com' },
  publisher: {
    '@type': 'Organization',
    name: 'Bakersfield Brokers',
    url: 'https://bakersfieldrentalhomes.com',
    logo: { '@type': 'ImageObject', url: 'https://bakersfieldrentalhomes.com/og-image.jpg' },
  },
  mainEntityOfPage: 'https://bakersfieldrentalhomes.com/blog/how-to-prevent-squatters-vacant-rental-property',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do squatters gain legal rights in California?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In California, squatters can claim adverse possession rights after continuously occupying a property for 5 years while paying property taxes, openly using the property, and meeting other legal requirements. This is why acting quickly to remove unauthorized occupants — before they establish a long-term presence — is critical for landlords.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I remove squatters from my property without going to court in California?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If the squatter has been on the property for fewer than 3 days you may be able to involve local law enforcement to remove them as trespassers. However, if the person has established residency — receiving mail, storing belongings, or been there longer — you will likely need to go through the formal unlawful detainer (eviction) court process. Self-help removal such as changing locks or removing belongings without a court order is illegal in California.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best way to prevent squatters from entering a vacant rental?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most effective prevention is making the property look occupied and monitored at all times. Install a visible security camera system with remote monitoring, use smart locks with access logs, set interior lights on timers, maintain the landscaping, and check on the property regularly. A professional alarm system with 24/7 monitoring — such as Vivint — provides both deterrence and immediate response capability.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do security cameras actually deter squatters?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — visible cameras are one of the most effective deterrents. Studies consistently show that properties with visible surveillance equipment are significantly less likely to be targeted for unauthorized entry. Cameras positioned at entry points (front door, back door, garage) that are clearly visible send a strong signal that the property is actively monitored, even when vacant.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I get a Vivint security system at a discounted installation cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bakersfield Brokers has a referral arrangement with Vivint. When you contact us at Bakersfield Brokers and mention the referral, you will receive a credit applied toward your Vivint installation fee. Contact us through the listings page or reach out directly to get your referral code before scheduling your Vivint consultation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long can a property be vacant before squatters become a problem?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no fixed timeline — unauthorized occupants can attempt entry at any time. However, properties that appear visibly vacant (overgrown landscaping, dark at night, no visible activity) are targeted faster. Properties in between tenancies are most vulnerable during the first 2–4 weeks when it becomes apparent to observers that no one is living there.',
      },
    },
  ],
}

const SECTIONS = [
  {
    id: 'why-vacant-properties',
    title: 'Why Vacant Rental Properties Are Targeted',
    content: [
      'A vacant rental property is one of the most vulnerable assets a landlord can have. Between tenancies — even if just for a few weeks — your property is exposed to unauthorized entry, vandalism, and squatting. In Bakersfield and across Kern County, the risk is real, and the legal process to remove an established squatter in California can take weeks and thousands of dollars.',
      'Squatters typically target properties that look unoccupied: uncut grass, no lights at night, mail piling up, or windows left uncovered. They move in quickly, sometimes within days of a property going vacant. Once inside and established, California\'s tenant protections — ironically — make removal significantly more complicated than it should be.',
      'The good news: with the right preparation, you can make your vacant property an unattractive target and ensure any unauthorized entry is detected and addressed before it becomes a legal problem.',
    ],
  },
  {
    id: 'security-cameras',
    title: 'Install a Professional Security Camera System',
    content: [
      'Visible security cameras are the single most effective deterrent against unauthorized entry. When someone scoping a property sees cameras at the front door, back entrance, and garage — with a monitoring company sticker on the window — they move on. The goal is to make your property look actively watched at all times.',
      'We recommend Vivint as the security system of choice for Bakersfield landlords. Vivint offers professional-grade outdoor cameras with motion detection, night vision, and real-time mobile alerts. You can monitor your vacant property from anywhere via the Vivint app and receive an instant notification the moment motion is detected near any entry point.',
      'Vivint\'s professional monitoring service means that even if you\'re unavailable, trained operators are watching 24/7 and can dispatch law enforcement when needed. For a vacant property, this is the closest thing to having someone physically present at all times.',
      'Key camera placement for a vacant rental: front door (covering the driveway approach), back door or sliding glass door, garage entrance, and any side gates or alley access points. Vivint\'s outdoor cameras are weatherproof and designed for exactly this type of perimeter coverage.',
    ],
  },
  {
    id: 'vivint-referral',
    title: 'Get a Vivint Installation Credit Through Bakersfield Brokers',
    content: [
      'As a Bakersfield Brokers client or landlord listing on our platform, you have access to our Vivint referral program. When you contact us for your referral code before scheduling your Vivint installation, you will receive a credit applied directly to your installation fee — lowering your upfront cost to get your system up and running.',
      'To get your referral code, simply reach out to us through the contact form on our listings page or message us directly. We\'ll send you the code to use when you call Vivint or schedule your consultation online. It takes about 30 seconds and can save you a meaningful amount on installation.',
      'This is not a paid advertisement — we recommend Vivint because it\'s the system we\'ve seen work well for Bakersfield landlords managing vacant properties, and the referral credit is a genuine benefit we can pass on to our landlord community.',
    ],
  },
  {
    id: 'additional-security',
    title: 'Additional Steps to Harden Your Vacant Property',
    content: [
      'Security cameras are your most important tool, but a layered approach works best. Here\'s what experienced Bakersfield landlords do between tenancies to keep their properties secure:',
      '**Smart locks:** Replace standard deadbolts with a smart lock (Schlage Encode, Kwikset Halo, or Vivint\'s integrated smart lock). Smart locks give you a complete access log — you know exactly when the door was opened and by whom. You can also issue and revoke codes remotely, eliminating the risk of copied keys.',
      '**Interior light timers:** Plug-in smart plugs connected to a floor lamp or overhead light on a randomized timer make the property look occupied at night. A home that appears to have someone inside is almost never targeted.',
      '**Maintain the exterior:** Overgrown landscaping is a billboard that says "no one has been here in a while." Keep the grass cut, remove mail and packages immediately, and make sure the property looks maintained. A well-kept exterior is one of the most underrated deterrents.',
      '**Notify your neighbors:** Let immediate neighbors know the property is temporarily vacant and ask them to call you — or 911 — if they see anyone on the property who doesn\'t belong there. Neighborhood awareness is free and highly effective.',
      '**Post No Trespassing signs:** While they won\'t stop a determined squatter, visible No Trespassing signs strengthen your legal position and make it harder for an occupant to later claim they didn\'t know they were trespassing.',
      '**Check on it regularly:** Visit the property at irregular intervals — at least twice a week during a vacancy. Drive by at different times of day. The more often a property is visited, the harder it is for unauthorized occupants to get established.',
    ],
  },
  {
    id: 'california-law',
    title: 'What California Law Says About Squatters',
    content: [
      'California\'s squatter laws are among the most complex in the country, which is exactly why prevention is so much better than cure. Under California Civil Code, a squatter who meets certain conditions — continuous occupation for 5 years while paying property taxes, open use, and a claim of ownership — can theoretically pursue adverse possession. While this is rare in practice, it underscores why allowing a squatter to remain for any extended period is a serious risk.',
      'In more practical terms: once a squatter has established what courts consider "residency" — receiving mail, storing furniture, sleeping there regularly — they gain many of the same legal protections as a paying tenant. That means you cannot simply remove them by changing the locks or calling the police. You would need to file an Unlawful Detainer (eviction) lawsuit, which takes 3–6 weeks at minimum and can cost $2,000–$5,000 in legal fees.',
      'California law does allow for a faster process if the person has been there fewer than 3 days and clearly has not established residency. In those cases, you may be able to work with law enforcement to have them removed as trespassers under Penal Code 602. But this window is short — the faster you detect unauthorized entry, the more options you have.',
      'Bottom line: the moment you discover someone in your vacant property who shouldn\'t be there, call an attorney and document everything. Do not attempt self-help removal (changing locks while they\'re inside, removing their belongings). It is illegal in California and can expose you to significant liability.',
    ],
  },
  {
    id: 'checklist',
    title: 'Vacant Property Security Checklist for Bakersfield Landlords',
    content: [
      'Use this checklist every time a tenant moves out and before a new tenant moves in:',
      '✅ Schedule Vivint camera installation before or immediately after tenant vacates',
      '✅ Change all locks and install a smart lock with access logging',
      '✅ Put interior lights on smart timers (randomized schedule)',
      '✅ Cut grass and clear all exterior vegetation',
      '✅ Forward or stop mail delivery to the property',
      '✅ Post No Trespassing signs at all entry points',
      '✅ Notify immediate neighbors and provide your contact number',
      '✅ Document the condition of the property with photos and video (date-stamped)',
      '✅ Schedule regular walkthroughs at least twice per week',
      '✅ Make sure your landlord insurance covers the property while vacant (some policies exclude vacancies over 30–60 days)',
    ],
  },
]

export default function SquatterPreventionPage() {
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
              How to Prevent Squatters in Your Vacant Rental Property
            </h1>
            <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: 'rgba(247,245,240,0.8)' }}>
              Security cameras, smart locks, and the legal steps every Bakersfield landlord should take before a property goes vacant.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm" style={{ color: 'rgba(247,245,240,0.6)' }}>
              <span>June 2026</span>
              <span aria-hidden="true">·</span>
              <span>7 min read</span>
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
                  <a
                    href={`#${s.id}`}
                    className="text-sm hover:underline"
                    style={{ color: '#1C3D5A' }}
                  >
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

          {/* Vivint CTA Box */}
          <div
            className="rounded-2xl p-7 mb-12"
            style={{ backgroundColor: '#1C3D5A', border: '1px solid rgba(201,169,97,0.3)' }}
            aria-label="Vivint referral offer"
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#C9A961' }}>
              Landlord Perk
            </p>
            <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
              Get a Vivint Installation Credit
            </h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(247,245,240,0.85)' }}>
              We have a referral arrangement with Vivint. Contact us before scheduling your installation and we&apos;ll give you a referral code that applies a credit toward your Vivint installation fee — no strings attached.
            </p>
            <Link
              href="/listings"
              className="inline-block px-6 py-3 rounded-full text-sm font-semibold tracking-wider uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}
            >
              Contact Us for Your Referral Code
            </Link>
          </div>

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
            List Your Property on Bakersfield&apos;s #1 Landlord Platform
          </h2>
          <p className="text-base mb-7 max-w-md mx-auto" style={{ color: 'rgba(247,245,240,0.8)' }}>
            Direct landlord rentals — no broker fees, no middlemen. Get your listing in front of qualified Bakersfield renters today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/list"
              className="px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}
            >
              List Your Property
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
