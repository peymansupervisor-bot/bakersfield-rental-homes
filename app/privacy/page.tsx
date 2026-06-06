import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Bakersfield Rental Homes',
  description: 'How Bakersfield Rental Homes collects, uses, and protects your personal information — CCPA compliant.',
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/privacy' },
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-sm font-light" style={{ color: 'rgba(247,245,240,0.65)' }}>
          Effective January 1, 2026
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm" style={{ border: '1px solid rgba(201,169,97,0.15)' }}>

          <p className="text-sm leading-relaxed mb-8" style={{ color: '#444' }}>
            Welcome to Bakersfield Rental Homes. This Privacy Policy explains how Bakersfield Rental Homes ("<strong>we</strong>," "<strong>us</strong>," or "<strong>our</strong>") collects, uses, and protects your personal information when you use our website, rental listings platform, Bakersfield Community Board, vendor directory, and direct messaging features (collectively, the "<strong>Services</strong>"). By using our Services, you agree to the practices described in this Privacy Policy.
          </p>

          <p className="text-sm leading-relaxed mb-8" style={{ color: '#444' }}>
            <strong>Contact Us:</strong> If you have questions about this Privacy Policy, please contact us at:<br />
            Bakersfield Rental Homes<br />
            Bakersfield, California, USA<br />
            Phone: (661) 381-1818<br />
            Email: <a href="mailto:info@bakersfieldrentalhomes.com" style={{ color: '#7d6019' }}>info@bakersfieldrentalhomes.com</a>
          </p>

          {/* TOC */}
          <nav aria-label="Privacy policy contents" className="rounded-2xl p-6 mb-10" style={{ backgroundColor: '#f7f5f0', border: '1px solid rgba(201,169,97,0.15)' }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7d6019' }}>Contents</p>
            <ol className="space-y-1 text-sm" style={{ color: '#1C3D5A' }}>
              {[
                'What Personal Information We Collect',
                'How We Use Your Personal Information',
                'How We Share Your Personal Information',
                'Your Choices and Rights',
                'How Long We Keep Your Information',
                'How We Protect Your Information',
                'Children\'s Privacy',
                'California Residents',
                'Cookies and Similar Technologies',
                'Changes to This Privacy Policy',
              ].map((item, i) => (
                <li key={i}><span className="font-semibold">{i + 1}.</span> {item}</li>
              ))}
            </ol>
          </nav>

          <Section num="1" title="What Personal Information We Collect">
            <Sub title="Information you provide to us">
              <ul>
                <li><strong>Account registration:</strong> When you create an account on the Bakersfield Community Board, we collect your name, email address, and password.</li>
                <li><strong>Listing submissions:</strong> When you list a property, we collect your property address, description, photos, contact name, email, and phone number.</li>
                <li><strong>Vendor applications:</strong> When you apply as a vendor, we collect your full name, business name, email, phone number, license number, insurance details, service category, and supporting documents (W-9, driver's license, business license, insurance certificate).</li>
                <li><strong>Community Board posts:</strong> When you post on the Community Board, we collect the content of your posts, the category selected, and any photos you upload.</li>
                <li><strong>Direct messages:</strong> We collect the content of private messages sent between users through our direct messaging feature.</li>
                <li><strong>Contact form:</strong> When you contact us, we collect your name, email address, and message.</li>
                <li><strong>Photos:</strong> When you upload photos, files may contain metadata such as location, date, and device information.</li>
              </ul>
            </Sub>
            <Sub title="Information collected automatically">
              <ul>
                <li><strong>Device and browser data:</strong> We may collect your IP address, browser type, operating system, and device identifiers.</li>
                <li><strong>Usage data:</strong> We collect information about how you use our Services, such as pages visited, features used, and time spent on the site.</li>
                <li><strong>Cookies &amp; similar technologies:</strong> We use cookies and similar technologies to operate our Services. See Section 9 below for full details.</li>
              </ul>
            </Sub>
            <Sub title="Information from third parties">
              <ul>
                <li><strong>Address data:</strong> We use OpenStreetMap to provide address autocomplete suggestions when you list a property.</li>
                <li><strong>Payment processing:</strong> Payments are processed by Stripe. We do not store your payment card details. Stripe's privacy policy governs their handling of payment data.</li>
                <li><strong>Authentication:</strong> User authentication is handled through Supabase. Please review Supabase's privacy policy for details on how authentication data is handled.</li>
              </ul>
            </Sub>
          </Section>

          <Section num="2" title="How We Use Your Personal Information">
            <p>We use the information we collect to:</p>
            <ul>
              <li>Create and manage your account on the Community Board</li>
              <li>Publish and display rental listings to prospective tenants</li>
              <li>Process vendor applications and maintain a trusted vendor directory</li>
              <li>Enable community posts, comments, and direct messaging between users</li>
              <li>Process listing payments through Stripe</li>
              <li>Send email confirmations, notifications, and account-related communications</li>
              <li>Notify users in real time when someone comments on their post or sends them a direct message</li>
              <li>Respond to support requests and inquiries</li>
              <li>Improve the functionality, design, and performance of our Services</li>
              <li>Detect and prevent fraud, abuse, and violations of our terms</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-3">We do not sell your personal information to third parties or use it for behavioral advertising.</p>
          </Section>

          <Section num="3" title="How We Share Your Personal Information">
            <Sub title="Information visible to other users">
              <p>Your display name and the content of your Community Board posts and comments are visible to other registered users. Your email address is never shown publicly. Direct messages are private and visible only to the sender and recipient.</p>
            </Sub>
            <Sub title="Rental listings">
              <p>Property listings you submit, including the address, description, photos, and contact name and phone number, are displayed publicly on the site to help connect landlords with tenants.</p>
            </Sub>
            <Sub title="Service providers">
              <p>We share personal information with trusted service providers who help us operate the Services, including:</p>
              <ul>
                <li><strong>Supabase</strong> — database, authentication, and file storage</li>
                <li><strong>Stripe</strong> — payment processing</li>
                <li><strong>Vercel</strong> — website hosting and deployment</li>
                <li><strong>OpenStreetMap / Nominatim</strong> — address lookup</li>
              </ul>
              <p>These providers are only permitted to use your information to provide services to us.</p>
            </Sub>
            <Sub title="Legal and safety reasons">
              <p>We may share your information with law enforcement, government authorities, or other parties when we believe in good faith that disclosure is necessary to comply with applicable law, protect the safety of any person, prevent fraud or abuse, or enforce our terms.</p>
            </Sub>
            <Sub title="Business transfers">
              <p>If Bakersfield Rental Homes is involved in a merger, acquisition, or sale of assets, your personal information may be transferred as part of that transaction.</p>
            </Sub>
          </Section>

          <Section num="4" title="Your Choices and Rights">
            <Sub title="Account and profile">
              <p>You may update your display name and account information at any time by signing in to your Community Board account.</p>
            </Sub>
            <Sub title="Posts and comments">
              <p>You may edit or delete your own posts and comments at any time directly from the Community Board.</p>
            </Sub>
            <Sub title="Direct messages">
              <p>Direct messages are private between you and the other user. You may close or delete a conversation at any time.</p>
            </Sub>
            <Sub title="Account deletion">
              <p>To request deletion of your account and associated data, contact us at <a href="mailto:info@bakersfieldrentalhomes.com" style={{ color: '#7d6019' }}>info@bakersfieldrentalhomes.com</a>. We will process your request within 30 days.</p>
            </Sub>
            <Sub title="California residents">
              <p>See Section 8 below for additional rights available to California residents under the California Consumer Privacy Act (CCPA).</p>
            </Sub>
          </Section>

          <Section num="5" title="How Long We Keep Your Information">
            <p>We retain your personal information for as long as necessary to provide our Services or as required by law. Specifically:</p>
            <ul>
              <li>Account information is retained until you delete your account</li>
              <li>Rental listing information is retained while the listing is active and for a reasonable period afterward for record-keeping</li>
              <li>Community posts and comments are retained until you delete them or your account is deleted</li>
              <li>Direct messages are retained until deleted by the user or upon account deletion</li>
              <li>Vendor application records may be retained for legal and compliance purposes</li>
              <li>Payment records are retained as required by applicable law and accounting standards</li>
            </ul>
          </Section>

          <Section num="6" title="How We Protect Your Information">
            <p>We implement reasonable technical and organizational measures to protect your personal information, including:</p>
            <ul>
              <li>Encrypted HTTPS connections for all pages</li>
              <li>Secure authentication and password hashing through Supabase</li>
              <li>Row-level security policies so users can only access their own data</li>
              <li>Private direct messages visible only to the sender and recipient</li>
              <li>Email addresses never displayed publicly on the Community Board</li>
            </ul>
            <p className="mt-3">However, no method of transmission over the internet is completely secure. We encourage you to use a strong, unique password and keep it confidential.</p>
          </Section>

          <Section num="7" title="Children's Privacy">
            <p>Our Services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us at <a href="mailto:info@bakersfieldrentalhomes.com" style={{ color: '#7d6019' }}>info@bakersfieldrentalhomes.com</a> and we will promptly delete it.</p>
          </Section>

          <Section num="8" title="California Residents">
            <p>If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA):</p>
            <ul>
              <li><strong>Right to Know:</strong> You may request information about the categories and specific pieces of personal information we have collected about you, and how it is used and shared.</li>
              <li><strong>Right to Delete:</strong> You may request that we delete your personal information, subject to certain exceptions.</li>
              <li><strong>Right to Correct:</strong> You may request that we correct inaccurate personal information we hold about you.</li>
              <li><strong>Right to Opt Out of Sale:</strong> We do not sell your personal information.</li>
              <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising any of your CCPA rights.</li>
            </ul>
            <p className="mt-3">To exercise your rights, contact us at <a href="mailto:info@bakersfieldrentalhomes.com" style={{ color: '#7d6019' }}>info@bakersfieldrentalhomes.com</a> or call (661) 381-1818. We will respond to verified requests within 45 days.</p>
          </Section>

          <Section num="9" title="Cookies and Similar Technologies">
            <p className="mb-3">This section explains how we use cookies and similar technologies on our website, what data they collect, and how you can control them.</p>
            <Sub title="What are cookies?">
              <p>Cookies are small text files placed on your device when you visit a website. They help the site remember information about your visit, such as your login session, so you don't have to re-enter it each time. Similar technologies include localStorage and session storage, which work in a comparable way.</p>
            </Sub>
            <Sub title="Cookies we use">
              <ul>
                <li><strong>Essential / functional cookies:</strong> We use session cookies managed by Supabase to keep you logged in while you use our Services. These are strictly necessary for the site to function and cannot be disabled. They are deleted when you sign out or close your browser session.</li>
                <li><strong>Analytics (cookie-free):</strong> We use Vercel Web Analytics to understand how visitors use our site (e.g., pages viewed, referrers). Vercel Analytics is designed to be privacy-first and does <em>not</em> use cookies or fingerprinting — it does not track you across sites or sessions.</li>
                <li><strong>No advertising or tracking cookies:</strong> We do not use advertising cookies, cross-site tracking pixels, or third-party behavioral profiling tools (e.g., Google Ads, Facebook Pixel, HotJar).</li>
              </ul>
            </Sub>
            <Sub title="Your choices">
              <ul>
                <li><strong>Browser settings:</strong> You can configure your browser to block or delete cookies at any time. Note that disabling essential cookies will prevent you from signing in to your account.</li>
                <li><strong>Cookie consent banner:</strong> When you first visit our site, you may accept or decline non-essential data collection via the banner at the bottom of the screen. Your preference is saved in your browser's localStorage and can be changed by clearing your browser data.</li>
                <li><strong>Do Not Track:</strong> We honor browser Do Not Track signals to the extent technically feasible.</li>
              </ul>
            </Sub>
            <Sub title="Third-party services">
              <p>Our site integrates with the following third-party services that may process data independently under their own privacy policies:</p>
              <ul>
                <li><strong>Supabase</strong> — authentication and database (<a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" style={{color:'#7d6019'}}>supabase.com/privacy</a>)</li>
                <li><strong>Vercel</strong> — hosting and analytics (<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{color:'#7d6019'}}>vercel.com/legal/privacy-policy</a>)</li>
                <li><strong>Stripe</strong> — payment processing (<a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" style={{color:'#7d6019'}}>stripe.com/privacy</a>)</li>
              </ul>
            </Sub>
          </Section>

          <Section num="10" title="Changes to This Privacy Policy">
            <p>We may update this Privacy Policy from time to time. When we make material changes, we will update the effective date at the top of this page and, where appropriate, notify you by email or by posting a notice on our website. Your continued use of our Services after any changes constitutes your acceptance of the updated Privacy Policy.</p>
          </Section>

          <div className="mt-10 pt-6 border-t text-xs text-center" style={{ borderColor: '#e0ddd8', color: '#aaa' }}>
            © 2026 Bakersfield Rental Homes · Bakersfield, CA
          </div>
        </div>
      </div>
    </main>
  )
}

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 pb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A', borderBottom: '1px solid rgba(201,169,97,0.2)' }}>
        {num}. {title}
      </h2>
      <div className="text-sm leading-relaxed space-y-3" style={{ color: '#444' }}>
        {children}
      </div>
    </section>
  )
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold mb-2" style={{ color: '#1C3D5A' }}>{title}</h3>
      <div className="text-sm leading-relaxed space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1" style={{ color: '#444' }}>
        {children}
      </div>
    </div>
  )
}
