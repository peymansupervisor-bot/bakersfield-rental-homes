import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Legal Disclaimer | Bakersfield Rental Homes',
  description: 'Legal disclaimer, limitation of liability, no-agency notice, and terms of use for BakersfieldRentalHomes.com — governed by California and Kern County law.',
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/disclaimer' },
}

export default function DisclaimerPage() {
  return (
    <main id="main-content" className="min-h-screen" style={{ backgroundColor: '#F7F5F0' }}>
      {/* Header */}
      <div className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(to bottom, #1C3D5A 0%, #2a5278 100%)' }}>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: '#C9A961', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
          Legal
        </p>
        <h1 className="text-4xl font-bold mb-3"
          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
          Legal Disclaimer
        </h1>
        <p className="text-sm font-light" style={{ color: 'rgba(247,245,240,0.65)' }}>
          Effective June 1, 2026 &nbsp;·&nbsp; Jurisdiction: Kern County, California
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm" style={{ border: '1px solid rgba(201,169,97,0.15)' }}>

          <p className="text-sm leading-relaxed mb-8" style={{ color: '#444' }}>
            Please read this Legal Disclaimer carefully before using BakersfieldRentalHomes.com (the
            &quot;<strong>Website</strong>&quot;). By accessing or using the Website, you acknowledge that you have
            read, understood, and agree to be bound by this Disclaimer. If you do not agree, you must
            discontinue use of the Website immediately.
          </p>

          {/* TOC */}
          <div className="rounded-2xl p-6 mb-10" style={{ backgroundColor: '#f7f5f0', border: '1px solid rgba(201,169,97,0.15)' }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7d6019' }}>Contents</p>
            <ol className="space-y-1 text-sm" style={{ color: '#1C3D5A' }}>
              {[
                'Nature and Purpose of the Website',
                'No Agency Relationship Created',
                'No Professional Advice of Any Kind',
                'No Warranty on Third-Party Content',
                'User Responsibility and Due Diligence',
                'Fair Housing Compliance',
                'Limitation of Liability',
                'Indemnification and Hold Harmless',
                'Applicable California and Local Laws',
                'Third-Party Links and Content',
                'Governing Law and Dispute Resolution',
                'Changes to This Disclaimer',
                'Contact Information',
              ].map((item, i) => (
                <li key={i}><span className="font-semibold">{i + 1}.</span> {item}</li>
              ))}
            </ol>
          </div>

          <Section num="1" title="Nature and Purpose of the Website">
            <p>
              BakersfieldRentalHomes.com is an independent, online informational advertising and
              connection platform designed solely to help landlords and prospective tenants discover
              each other within the Bakersfield, California area. The Website provides a venue for
              users to post and browse rental listings and general community information.
            </p>
            <p>
              The Website <strong>does not participate in, negotiate, arrange, broker, manage, or
              consummate</strong> any rental transaction, lease agreement, sale, purchase, or any other
              contract between users. The Website is a passive conduit of information only.
            </p>
          </Section>

          <Section num="2" title="No Agency Relationship Created">
            <p>
              BakersfieldRentalHomes.com is an informational platform only. The Website itself does not
              BakersfieldRentalHomes.com is an informational platform. The Website itself does not
              act as a real estate agent or broker with respect to any transaction facilitated between
              users of the platform.
            </p>
            <div className="rounded-xl p-4 my-2" style={{ backgroundColor: '#fdf8ee', border: '1px solid rgba(201,169,97,0.35)' }}>
              <p className="font-semibold" style={{ color: '#7d6019' }}>
                Your use of this Website does not create, establish, or imply any agency,
                fiduciary, broker-client, or representative relationship between you and
                BakersfieldRentalHomes.com or any real estate licensee
                associated with this Website.
              </p>
            </div>
            <p>
              Merely accessing, browsing, or using this Website — including submitting a listing,
              sending a message, or contacting a landlord or tenant through this platform — does
              <strong> not</strong> constitute acceptance of representation by any real estate broker
              or agent, and no such relationship shall be implied or inferred from any such action.
              Under <strong>California Business and Professions Code § 10176 and § 10177</strong>,
              a valid agency relationship requires a written agreement executed by the parties;
              no agency is formed by use of this Website alone.
            </p>
            <p>
              No real estate broker or agent affiliated with this Website has authority to act on
              your behalf, bind you to any agreement, or represent your interests in any transaction
              unless you have separately and expressly entered into a written representation
              agreement with that individual under <strong>California Civil Code § 2079.14 et seq.</strong>
              (the Agency Disclosure Law).
            </p>
            <p>
              Users who wish to engage a licensed real estate professional to represent them in a
              transaction are advised to retain one independently and enter into a written agency
              agreement that complies with California law.
            </p>
          </Section>

          <Section num="3" title="No Professional Advice of Any Kind">
            <div className="rounded-xl p-4 my-2" style={{ backgroundColor: '#fdf8ee', border: '1px solid rgba(201,169,97,0.35)' }}>
              <p className="font-semibold" style={{ color: '#7d6019' }}>
                Nothing on this Website constitutes legal, financial, tax, accounting, real estate,
                investment, or any other form of professional advice. No information published here
                should be relied upon as a substitute for consultation with a qualified professional.
              </p>
            </div>
            <p>
              All content on this Website — including but not limited to articles, listing
              descriptions, neighborhood information, community posts, and any communications from
              the Website or its operators — is provided for <strong>general informational purposes
              only</strong>. It does not represent the advice or opinion of any licensed attorney,
              financial advisor, certified public accountant, real estate broker, mortgage lender,
              or any other regulated professional.
            </p>
            <p>
              <strong>Before making any decision</strong> regarding renting, leasing, purchasing,
              selling, or investing in real property, or before signing any contract or agreement,
              you should independently consult with:
            </p>
            <ul>
              <li>A <strong>licensed California attorney</strong> for legal advice specific to your situation;</li>
              <li>A <strong>licensed real estate broker or agent</strong> (DRE-licensed) for real estate guidance;</li>
              <li>A <strong>certified public accountant (CPA)</strong> or tax professional for tax and accounting matters;</li>
              <li>A <strong>licensed financial advisor</strong> for investment and financial planning decisions;</li>
              <li>A <strong>licensed mortgage broker or lender</strong> for financing matters.</li>
            </ul>
            <p>
              This Website does not offer, and expressly disclaims any intent to offer, any
              professional consultation, representation, or advisory services of any kind to any
              user. No communication with the Website, its owner(s), operators, or affiliates —
              whether by phone, email, chat, or through the Website&apos;s features — shall constitute
              or be construed as the formation of a professional-client relationship of any kind.
            </p>
            <p>
              Reliance on any information provided on this Website without seeking qualified
              professional advice is done entirely at your own risk. The Website and its
              owner(s) expressly disclaim all liability for any action taken or not taken based
              on the content of this Website.
            </p>
          </Section>

          <Section num="4" title="No Warranty on Third-Party Content">
            <p>
              All rental listings, property descriptions, photographs, pricing information, and
              other content displayed on this Website are submitted by unaffiliated, independent
              third-party users. The Website does <strong>not</strong> independently verify, screen,
              endorse, warrant, or guarantee:
            </p>
            <ul>
              <li>The accuracy, completeness, or truthfulness of any listing or user-submitted content;</li>
              <li>The identity, background, creditworthiness, or legal standing of any landlord, tenant, or other user;</li>
              <li>The legal ownership of any property listed;</li>
              <li>The habitability, safety, or condition of any property;</li>
              <li>The compliance of any listing with applicable federal, state, county, or city laws.</li>
            </ul>
            <p>
              The Website expressly disclaims all warranties, express or implied, including but not
              limited to implied warranties of merchantability, fitness for a particular purpose,
              and non-infringement, to the fullest extent permitted by California law.
            </p>
          </Section>

          <Section num="5" title="User Responsibility and Due Diligence">
            <p>
              <strong>All users of this Website — whether landlords, tenants, or other visitors —
              are solely and exclusively responsible</strong> for conducting their own thorough
              independent investigation and due diligence before taking any action, including but
              not limited to:
            </p>
            <ul>
              <li>Verifying the identity and good standing of any other party;</li>
              <li>Inspecting any property in person prior to signing any agreement or paying any funds;</li>
              <li>Confirming ownership of a property through the Kern County Assessor-Recorder&apos;s Office;</li>
              <li>Verifying that a listing complies with all applicable local, state, and federal laws;</li>
              <li>Consulting with qualified legal, financial, or real estate professionals as appropriate;</li>
              <li>Reviewing and negotiating the terms of any lease, rental agreement, or contract independently.</li>
            </ul>
            <p>
              The Website strongly cautions all users against sending money, signing documents, or
              providing sensitive personal information to any party without first completing adequate
              due diligence. The Website assumes no responsibility for losses arising from a
              user&apos;s failure to exercise appropriate caution.
            </p>
          </Section>

          <Section num="6" title="Fair Housing Compliance">
            <p>
              All landlords and property owners posting listings on this Website are independently
              required to comply with all applicable fair housing laws, including:
            </p>
            <ul>
              <li><strong>Federal Fair Housing Act</strong> (42 U.S.C. § 3601 et seq.);</li>
              <li><strong>California Fair Employment and Housing Act</strong> (Gov. Code § 12955 et seq.), which prohibits discrimination based on race, color, national origin, religion, sex, familial status, disability, sexual orientation, source of income, marital status, ancestry, and other protected classes;</li>
              <li><strong>Kern County Human Relations Commission</strong> guidelines;</li>
              <li><strong>City of Bakersfield Municipal Code</strong> anti-discrimination provisions.</li>
            </ul>
            <p>
              The Website does not endorse, condone, or permit discriminatory listings or conduct.
              Any listing found to violate fair housing laws may be removed at the Website&apos;s sole
              discretion. The Website is not liable for discriminatory acts committed independently
              by third-party users.
            </p>
          </Section>

          <Section num="7" title="Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable California law, BakersfieldRentalHomes.com,
              its owner(s), operators, officers, agents, successors, and assigns shall <strong>not
              be liable</strong> for any direct, indirect, incidental, special, consequential,
              punitive, or exemplary damages of any kind, including but not limited to:
            </p>
            <ul>
              <li>Physical injury, property damage, or personal harm arising from interactions between users;</li>
              <li>Financial loss, fraud, or theft resulting from reliance on user-submitted content;</li>
              <li>Intellectual or reputational harm caused by third-party postings;</li>
              <li>Loss of data, revenue, profits, or business opportunity;</li>
              <li>Any damages resulting from unauthorized access to or use of the Website&apos;s servers or data.</li>
            </ul>
            <p>
              This limitation applies regardless of the legal theory asserted — whether in contract,
              tort (including negligence), strict liability, or otherwise — even if the Website has
              been advised of the possibility of such damages. Where liability cannot be fully
              excluded by law, it is limited to the maximum extent permitted under California Civil
              Code § 1668 and related statutes.
            </p>
          </Section>

          <Section num="8" title="Indemnification and Hold Harmless">
            <p>
              By using this Website, you agree to <strong>defend, indemnify, and hold harmless</strong>{' '}
              BakersfieldRentalHomes.com, their respective
              owner(s), officers, employees, agents, affiliates, successors, and assigns from and
              against any and all claims, actions, demands, damages, losses, liabilities, costs,
              and expenses — including reasonable attorneys&apos; fees — arising out of or related to:
            </p>
            <ul>
              <li>Your use of or access to the Website;</li>
              <li>Any content you submit, post, or transmit through the Website;</li>
              <li>Your violation of this Disclaimer or any applicable law;</li>
              <li>Your interactions with any other user of the Website, whether online or in person;</li>
              <li>Any claim that your content or conduct caused damage to a third party.</li>
            </ul>
            <p>
              The Website reserves the right to assume the exclusive defense and control of any matter
              subject to indemnification by you, at your expense, and you agree to cooperate fully
              in the defense of any such claims.
            </p>
          </Section>

          <Section num="9" title="Applicable California and Local Laws">
            <p>
              Users of this Website operating as landlords or tenants in the Bakersfield and Kern
              County area are independently responsible for compliance with all applicable laws,
              including but not limited to:
            </p>
            <ul>
              <li><strong>California Civil Code §§ 1940–1954.06</strong> (Landlord-Tenant Law) — governing habitability, security deposits (max 1 month&apos;s rent for unfurnished residential units per Cal. Civ. Code § 1950.5 as amended by AB 12), entry rights, and lease terms;</li>
              <li><strong>California Civil Code § 1947.12</strong> (AB 1482 — Tenant Protection Act of 2019) — rent increase caps and just-cause eviction requirements for covered units;</li>
              <li><strong>California Health and Safety Code §§ 17920–17928</strong> — minimum habitability and building standards;</li>
              <li><strong>California Code of Civil Procedure §§ 1161–1179a</strong> — unlawful detainer and eviction procedures;</li>
              <li><strong>Kern County Code of Ordinances</strong> — zoning, rental registration, and housing codes;</li>
              <li><strong>City of Bakersfield Municipal Code</strong> — building permits, code enforcement, and rental housing regulations;</li>
              <li><strong>California SB 9 and SB 10</strong> (where applicable) — housing density laws;</li>
              <li><strong>California Consumer Privacy Act (CCPA)</strong> — user data rights.</li>
            </ul>
            <p>
              Users are advised to consult qualified legal counsel to understand how these laws apply
              to their specific situation. This Website does not provide legal advice.
            </p>
          </Section>

          <Section num="10" title="Third-Party Links and Content">
            <p>
              The Website may contain links to third-party websites, services, or resources. These
              links are provided for convenience only. The Website has no control over and assumes
              no responsibility for the content, privacy practices, or conduct of any third-party
              sites. Accessing any third-party link is done entirely at your own risk.
            </p>
          </Section>

          <Section num="11" title="Governing Law and Dispute Resolution">
            <p>
              This Disclaimer and any dispute arising out of or related to your use of this Website
              shall be governed by and construed in accordance with the laws of the <strong>State
              of California</strong>, without regard to its conflict-of-law provisions.
            </p>
            <p>
              Any legal action or proceeding arising out of this Disclaimer shall be brought
              exclusively in the state or federal courts located in <strong>Kern County,
              California</strong>, and you hereby irrevocably consent to the personal jurisdiction
              and venue of such courts. Before filing any claim, users agree to make a good-faith
              effort to resolve the dispute directly by contacting the Website at the address below.
            </p>
          </Section>

          <Section num="12" title="Changes to This Disclaimer">
            <p>
              The Website reserves the right to modify this Disclaimer at any time. Changes will
              be effective upon posting to the Website with an updated effective date. Your continued
              use of the Website after any changes constitutes your acceptance of the revised
              Disclaimer. Users are encouraged to review this page periodically.
            </p>
          </Section>

          <Section num="13" title="Contact Information">
            <p>
              If you have questions about this Disclaimer or wish to report potentially fraudulent
              or illegal content, please contact us:
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
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 pb-2"
        style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A', borderBottom: '1px solid rgba(201,169,97,0.2)' }}>
        {num}. {title}
      </h2>
      <div className="text-sm leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2" style={{ color: '#444' }}>
        {children}
      </div>
    </section>
  )
}
