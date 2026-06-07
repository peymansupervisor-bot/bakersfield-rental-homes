import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Terms of Service | Bakersfield Rental Homes',
  description: 'Terms of Service governing your use of BakersfieldRentalHomes.com — including user conduct, content policies, arbitration, and limitation of liability.',
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/terms' },
  robots: { index: false, follow: false },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F7F5F0' }}>
      {/* Header */}
      <div className="py-16 px-6 text-center" style={{ background: 'linear-gradient(to bottom, #1C3D5A 0%, #2a5278 100%)' }}>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#C9A961', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
          Legal
        </p>
        <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
          Terms of Service
        </h1>
        <p className="text-sm font-light" style={{ color: 'rgba(247,245,240,0.65)' }}>
          Effective June 1, 2026 &nbsp;·&nbsp; Jurisdiction: Kern County, California
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-14">
        <div className="prose prose-sm max-w-none space-y-10" style={{ color: '#2a2a2a', fontFamily: 'Inter, sans-serif' }}>

          <p>
            Please read these Terms of Service (&quot;<strong>Terms</strong>&quot;) carefully before using
            BakersfieldRentalHomes.com (the &quot;<strong>Website</strong>&quot;) operated by Bakersfield Rental
            Homes (&quot;<strong>we</strong>,&quot; &quot;<strong>us</strong>,&quot; or &quot;<strong>our</strong>&quot;). By accessing
            or using the Website, you agree to be bound by these Terms. If you do not agree,
            you must discontinue use immediately.
          </p>

          {/* TOC */}
          <div className="rounded-2xl p-6" style={{ backgroundColor: '#fff', border: '1px solid rgba(201,169,97,0.2)' }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7d6019' }}>Table of Contents</p>
            <ol className="space-y-1 text-sm" style={{ color: '#1C3D5A' }}>
              {[
                'Acceptance of Terms',
                'Description of Services',
                'Eligibility',
                'User Accounts',
                'Acceptable Use Policy',
                'User-Generated Content',
                'Identity Verification',
                'No Guarantee of Results',
                'Intellectual Property',
                'Third-Party Services',
                'Disclaimers',
                'Limitation of Liability',
                'Indemnification',
                'ARBITRATION AND CLASS ACTION WAIVER',
                'Governing Law',
                'Termination',
                'Changes to These Terms',
                'Contact Information',
              ].map((item, i) => (
                <li key={i}><span className="font-semibold">{i + 1}.</span> {item}</li>
              ))}
            </ol>
          </div>

          <Section num="1" title="Acceptance of Terms">
            <p>
              By accessing or using BakersfieldRentalHomes.com, you confirm that you are at least
              18 years of age, have the legal capacity to enter into a binding agreement, and agree
              to comply with and be bound by these Terms and all applicable laws. These Terms
              constitute a legally binding agreement between you and Bakersfield Rental Homes.
            </p>
          </Section>

          <Section num="2" title="Description of Services">
            <p>
              BakersfieldRentalHomes.com is an online informational platform that allows independent
              landlords to post rental property listings and allows prospective tenants to browse
              those listings. The Website also provides a community board, vendor directory, and
              related informational content.
            </p>
            <p>
              The Website is a <strong>passive conduit of information only</strong>. We do not
              participate in, broker, negotiate, manage, or consummate any rental transaction,
              lease, or agreement between users. We are not a party to any agreement between
              landlords and tenants.
            </p>
          </Section>

          <Section num="3" title="Eligibility">
            <p>
              You must be at least 18 years of age to use this Website. By using the Website,
              you represent and warrant that you meet this requirement. We do not knowingly
              allow use of the Website by persons under 13 years of age in compliance with
              the Children&apos;s Online Privacy Protection Act (COPPA).
            </p>
          </Section>

          <Section num="4" title="User Accounts">
            <p>
              Some features of the Website (such as the Community Board) require account
              registration. You agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information during registration;</li>
              <li>Maintain the security of your account credentials;</li>
              <li>Notify us immediately of any unauthorized access to your account;</li>
              <li>Accept responsibility for all activity that occurs under your account.</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate accounts that violate these Terms
              or that we determine, in our sole discretion, pose a risk to other users or the
              integrity of the platform.
            </p>
          </Section>

          <Section num="5" title="Acceptable Use Policy">
            <p>You agree <strong>not</strong> to use the Website to:</p>
            <ul>
              <li>Post false, misleading, fraudulent, or deceptive content;</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity;</li>
              <li>Post listings for properties you do not own or have authority to rent;</li>
              <li>Violate any applicable federal, state, or local law, including fair housing laws;</li>
              <li>Harass, threaten, or harm other users;</li>
              <li>Collect or harvest personal information of other users without consent;</li>
              <li>Upload malicious code, viruses, or any software intended to disrupt the Website;</li>
              <li>Engage in any activity that interferes with or disrupts the Website&apos;s functionality;</li>
              <li>Use the Website for any commercial purpose other than posting or browsing rental listings as intended;</li>
              <li>Attempt to gain unauthorized access to any portion of the Website or its related systems.</li>
            </ul>
            <p>
              We reserve the right to remove any content that violates this policy and to
              terminate access for users who engage in prohibited conduct.
            </p>
          </Section>

          <Section num="6" title="User-Generated Content">
            <p>
              By submitting content to the Website — including listings, photos, community posts,
              messages, and vendor applications — you grant Bakersfield Rental Homes a
              non-exclusive, royalty-free, worldwide, perpetual license to use, display, reproduce,
              and distribute that content solely for the purpose of operating and promoting the
              Website.
            </p>
            <p>
              You represent and warrant that: (a) you own or have the right to submit the content;
              (b) the content does not infringe any third-party intellectual property, privacy,
              or other rights; and (c) the content complies with these Terms and all applicable laws.
            </p>
            <p>
              We are not responsible for user-generated content and do not endorse any opinions,
              listings, or other content submitted by users. We reserve the right, but have no
              obligation, to monitor, edit, or remove any content at our sole discretion.
            </p>
          </Section>

          <Section num="7" title="Identity Verification">
            <p>
              Landlords who submit listings are required to complete an identity verification
              process through Stripe Identity prior to their listing being published. This
              verification requires submission of a government-issued ID and a selfie.
            </p>
            <p>
              <strong>Identity verification does not constitute a warranty or guarantee</strong> that
              a landlord owns the listed property, that the listing is accurate, or that any
              transaction will be safe or successful. Users are independently responsible for
              conducting due diligence before entering into any agreement or transferring any funds.
            </p>
          </Section>

          <Section num="8" title="No Guarantee of Results">
            <p>
              We make no guarantee, representation, or warranty that: (a) any listing will result
              in a rental transaction; (b) any property will be available as described; (c) any
              landlord or tenant will follow through on any commitment; or (d) the Website will
              be available, error-free, or uninterrupted at any time.
            </p>
            <p>
              <strong>Fraud Risk:</strong> While we do our best to eliminate scammers and fraudulent
              individuals through identity verification and ongoing monitoring, we cannot guarantee
              100% protection against fraud or misrepresentation by third parties. By choosing to
              use this Website, you acknowledge and accept that you do so entirely at your own risk.
            </p>
          </Section>

          <Section num="9" title="Intellectual Property">
            <p>
              All original content on this Website — including but not limited to the design,
              layout, graphics, text, and code — is the property of Bakersfield Rental Homes
              and is protected by applicable copyright, trademark, and other intellectual property
              laws. You may not reproduce, distribute, or create derivative works from any
              Website content without our express written permission.
            </p>
          </Section>

          <Section num="10" title="Third-Party Services">
            <p>
              The Website integrates with third-party services including Stripe Identity (identity
              verification), Supabase (database and authentication), Vercel (hosting), and
              OpenStreetMap (address lookup). Your use of those services is subject to their
              respective terms of service and privacy policies. We are not responsible for the
              conduct of any third-party service provider.
            </p>
          </Section>

          <Section num="11" title="Disclaimers">
            <p>
              THE WEBSITE AND ALL CONTENT, SERVICES, AND FEATURES ARE PROVIDED &quot;AS IS&quot; AND
              &quot;AS AVAILABLE&quot; WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
              NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE WEBSITE WILL BE
              UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>
          </Section>

          <Section num="12" title="Limitation of Liability">
            <p>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, BAKERSFIELD RENTAL HOMES,
              ITS OWNERS, OFFICERS, EMPLOYEES, AGENTS, AND ASSIGNS SHALL NOT BE LIABLE FOR
              ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES
              — INCLUDING LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES — ARISING
              OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE WEBSITE, EVEN IF WE
              HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p>
              IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED ONE HUNDRED
              DOLLARS ($100.00). SOME JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS OF
              LIABILITY, SO SOME OF THE ABOVE MAY NOT APPLY TO YOU.
            </p>
          </Section>

          <Section num="13" title="Indemnification">
            <p>
              You agree to defend, indemnify, and hold harmless Bakersfield Rental Homes and
              its owners, officers, employees, agents, and assigns from and against any claims,
              liabilities, damages, losses, costs, and expenses (including reasonable attorneys&apos;
              fees) arising out of or related to: (a) your use of the Website; (b) any content
              you submit; (c) your violation of these Terms; (d) your violation of any law or
              the rights of a third party; or (e) any dispute between you and another user.
            </p>
          </Section>

          <Section num="14" title="ARBITRATION AND CLASS ACTION WAIVER">
            <div className="rounded-xl p-4 my-2" style={{ backgroundColor: '#fdf8ee', border: '1px solid rgba(201,169,97,0.35)' }}>
              <p className="font-semibold" style={{ color: '#7d6019' }}>
                PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS.
              </p>
            </div>
            <p>
              <strong>Binding Arbitration.</strong> Except for disputes that qualify for small
              claims court, you and Bakersfield Rental Homes agree that any dispute, claim, or
              controversy arising out of or relating to these Terms or the use of the Website
              shall be resolved by binding arbitration administered by the American Arbitration
              Association (AAA) under its Consumer Arbitration Rules, rather than in court.
              The arbitration shall take place in Kern County, California, or via video
              conference if mutually agreed. The arbitrator&apos;s decision shall be final and
              binding and may be entered as a judgment in any court of competent jurisdiction.
            </p>
            <p>
              <strong>Class Action Waiver.</strong> YOU AND BAKERSFIELD RENTAL HOMES AGREE THAT
              EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY
              AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE
              ACTION. Unless both parties agree, no arbitrator or judge may consolidate more
              than one person&apos;s claims or otherwise preside over any form of a representative
              or class proceeding.
            </p>
            <p>
              <strong>Opt-Out.</strong> You may opt out of this arbitration agreement by sending
              written notice to <a href="mailto:info@bakersfieldrentalhomes.com" style={{ color: '#7d6019' }}>info@bakersfieldrentalhomes.com</a> within
              30 days of first accepting these Terms. Your notice must include your name, address,
              and a clear statement that you wish to opt out of arbitration.
            </p>
          </Section>

          <Section num="15" title="Governing Law">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the
              State of California, without regard to its conflict-of-law provisions. To the extent
              any dispute is not subject to arbitration, the exclusive jurisdiction and venue shall
              be the state or federal courts located in Kern County, California.
            </p>
          </Section>

          <Section num="16" title="Termination">
            <p>
              We reserve the right to suspend or terminate your access to the Website at any
              time, with or without notice, for any reason, including violation of these Terms.
              Upon termination, your right to use the Website ceases immediately. Sections of
              these Terms that by their nature should survive termination (including Sections 6,
              9, 12, 13, and 14) shall survive.
            </p>
          </Section>

          <Section num="17" title="Changes to These Terms">
            <p>
              We reserve the right to update these Terms at any time. Changes will be effective
              upon posting with an updated effective date. Your continued use of the Website
              after changes constitutes acceptance of the revised Terms. We encourage you to
              review this page periodically.
            </p>
          </Section>

          <Section num="18" title="Contact Information">
            <p>
              If you have questions about these Terms, please contact us:
            </p>
            <p>
              <strong>Bakersfield Rental Homes</strong><br />
              Bakersfield, California<br />
              Phone: <a href="tel:+16613811818" style={{ color: '#7d6019' }}>(661) 381-1818</a><br />
              Email: <a href="mailto:info@bakersfieldrentalhomes.com" style={{ color: '#7d6019' }}>info@bakersfieldrentalhomes.com</a>
            </p>
          </Section>

          <div className="mt-10 pt-6 border-t text-xs text-center" style={{ borderColor: '#e0ddd8', color: '#aaa' }}>
            © 2026 Bakersfield Rental Homes · Bakersfield, CA
          </div>
        </div>
      </div>
    </main>
  )
}

function Section({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold mb-3" style={{ color: '#1C3D5A', fontFamily: 'Playfair Display, Georgia, serif' }}>
        {num}. {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed">
        {children}
      </div>
    </section>
  )
}
