import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Accessibility Statement | Bakersfield Rental Homes',
  description: 'Bakersfield Rental Homes accessibility statement and WCAG 2.1 AA conformance information.',
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/accessibility' },
}

export default function AccessibilityPage() {
  return (
    <main id="main-content" className="min-h-screen" style={{ backgroundColor: '#F7F5F0' }}>
      {/* Header */}
      <div className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(to bottom, #1C3D5A 0%, #2a5278 100%)' }}>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: '#C9A961', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
          Commitment
        </p>
        <h1 className="text-4xl font-bold mb-3"
          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
          Accessibility Statement
        </h1>
        <p className="text-sm font-light" style={{ color: 'rgba(247,245,240,0.65)' }}>
          Last updated: June 7, 2026
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm" style={{ border: '1px solid rgba(201,169,97,0.15)' }}>

          {/* Intro */}
          <p className="text-sm leading-relaxed mb-8" style={{ color: '#444' }}>
            Bakersfield Rental Homes is committed to ensuring that our website is accessible to
            people with disabilities. We continually work to improve the user experience for
            everyone and apply relevant accessibility standards across all pages and features of
            our platform.
          </p>

          <Section title="Conformance Status">
            <p>
              We aim to conform to the{' '}
              <a
                href="https://www.w3.org/TR/WCAG21/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1C3D5A', textDecoration: 'underline' }}
              >
                Web Content Accessibility Guidelines (WCAG) 2.1
                <span className="sr-only"> (opens in a new tab)</span>
              </a>{' '}
              at <strong>Level AA</strong>. These guidelines explain how to make web content more
              accessible to people with disabilities including visual, auditory, physical, speech,
              cognitive, and neurological disabilities.
            </p>
            <p className="mt-3">
              Our site has been audited using the axe-core 4.9 automated testing engine and manual
              review across all primary pages: homepage, listings, list your property, vendor
              application, and community board.
            </p>
          </Section>

          <Section title="Measures We Take">
            <p>Bakersfield Rental Homes takes the following measures to ensure accessibility:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-3 text-sm" style={{ color: '#444' }}>
              <li>Skip-to-main-content link available on all pages</li>
              <li>All pages include a descriptive <code>&lt;html lang="en"&gt;</code> attribute</li>
              <li>All form inputs have explicit labels</li>
              <li>Keyboard navigation supported throughout, including photo gallery and lightbox</li>
              <li>Focus is trapped and managed in modal dialogs</li>
              <li>All decorative images are marked <code>aria-hidden="true"</code></li>
              <li>All meaningful images have descriptive alt text</li>
              <li>Interactive controls have accessible names via <code>aria-label</code></li>
              <li>Status messages announced to screen readers via <code>aria-live</code></li>
              <li>Color contrast meets or exceeds 4.5:1 for body text and 3:1 for large text</li>
              <li>ARIA roles follow the WAI-ARIA 1.2 specification</li>
              <li>Correct heading hierarchy (h1 → h2 → h3) maintained on all pages</li>
              <li>Error messages associated with form fields and announced to screen readers</li>
              <li>Video content in the hero is muted by default and marked decorative</li>
              <li>Map iframes include descriptive <code>title</code> attributes</li>
              <li>Structured data (JSON-LD) included for search engine and assistive technology use</li>
            </ul>
          </Section>

          <Section title="Known Limitations">
            <p>
              While we strive for full WCAG 2.1 AA conformance, some areas may have
              limitations. We are actively working to resolve these:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-3 text-sm" style={{ color: '#444' }}>
              <li>
                <strong>Community Board:</strong> User-generated content (posts, comments, images)
                may not always meet accessibility standards. We encourage users to provide
                meaningful descriptions for any images they upload.
              </li>
              <li>
                <strong>Third-party map embeds:</strong> The Google Maps iframe used on property
                listing pages is provided by a third party and may have limited keyboard
                accessibility.
              </li>
            </ul>
          </Section>

          <Section title="Technical Specifications">
            <p>
              Accessibility of Bakersfield Rental Homes relies on the following technologies:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-3 text-sm" style={{ color: '#444' }}>
              <li>HTML5 semantic elements</li>
              <li>CSS (Tailwind CSS)</li>
              <li>JavaScript / React (Next.js)</li>
              <li>WAI-ARIA roles, states, and properties</li>
            </ul>
            <p className="mt-3">
              These technologies are relied upon for conformance with the accessibility standards
              listed above.
            </p>
          </Section>

          <Section title="Feedback & Contact">
            <p>
              We welcome your feedback on the accessibility of Bakersfield Rental Homes. If you
              encounter any barrier, have difficulty accessing any content, or need information
              in an alternative format, please contact us:
            </p>
            <div className="mt-4 p-5 rounded-2xl space-y-2" style={{ backgroundColor: '#f7f5f0', border: '1px solid rgba(201,169,97,0.15)' }}>
              <p className="text-sm" style={{ color: '#1C3D5A' }}>
                <strong>Bakersfield Rental Homes</strong><br />
                Bakersfield, California
              </p>
              <p className="text-sm" style={{ color: '#1C3D5A' }}>
                <span aria-hidden="true">📧 </span>
                <a href="mailto:info@bakersfieldrentalhomes.com" style={{ color: '#1C3D5A', textDecoration: 'underline' }}>
                  info@bakersfieldrentalhomes.com
                </a>
              </p>
              <p className="text-sm" style={{ color: '#1C3D5A' }}>
                <span aria-hidden="true">📞 </span>
                <a href="tel:+16613811818" style={{ color: '#1C3D5A', textDecoration: 'underline' }}>
                  (661) 381-1818
                </a>
              </p>
            </div>
            <p className="mt-4 text-sm" style={{ color: '#444' }}>
              We aim to respond to accessibility feedback within <strong>2 business days</strong>.
              We will work with you to provide the information or complete the transaction you need
              in an accessible manner.
            </p>
          </Section>

          <Section title="Formal Complaints">
            <p>
              If you are not satisfied with our response, you may contact the{' '}
              <a
                href="https://www.ada.gov/filing-a-complaint/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1C3D5A', textDecoration: 'underline' }}
              >
                U.S. Department of Justice ADA Information Line
                <span className="sr-only"> (opens in a new tab)</span>
              </a>{' '}
              at 1-800-514-0301 (voice) or 1-800-514-0383 (TTY).
            </p>
          </Section>

          <div className="mt-10 pt-6 border-t text-xs text-center" style={{ borderColor: '#e0ddd8', color: '#595959' }}>
            © 2026 Bakersfield Rental Homes · Bakersfield, CA
          </div>
        </div>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 pb-2"
        style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A', borderBottom: '1px solid rgba(201,169,97,0.2)' }}>
        {title}
      </h2>
      <div className="text-sm leading-relaxed space-y-3" style={{ color: '#444' }}>
        {children}
      </div>
    </section>
  )
}
