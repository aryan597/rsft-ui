import { Mail, Phone, MapPin } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="font-mono text-2xl font-bold mb-6 pb-4 border-b-2 border-black dark:border-white">{title}</h2>
      <div className="font-mono text-gray-700 dark:text-gray-300 space-y-4">{children}</div>
    </section>
  );
}

export default function Terms() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-indigo-600">Terms</span>
          <h1 className="font-mono text-5xl md:text-6xl font-black mt-6 mb-8">TERMS OF SERVICE</h1>
          <p className="font-mono text-lg text-gray-600 dark:text-gray-300">
            Last updated: March 15, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section title="1. ACCEPTANCE OF TERMS">
            <p>
              By accessing and using the Recept platform (the "Service"), you accept and agree to be bound by the terms and provisions of this Agreement. If you do not agree to these Terms, you should not use our Service.
            </p>
          </Section>

          <Section title="2. DESCRIPTION OF SERVICE">
            <p>
              Recept provides an online platform that connects employers and recruiters with job candidates. Our Service includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access to a database of candidate profiles</li>
              <li>AI-powered candidate matching</li>
              <li>Communication tools for recruiters and candidates</li>
              <li>Application tracking and management</li>
              <li>Analytics and reporting features</li>
            </ul>
          </Section>

          <Section title="3. USER ACCOUNTS">
            <p>
              To use our Service, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Promptly update any changes to your information</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </Section>

          <Section title="4. USER CONDUCT">
            <p>When using our Service, you agree NOT to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the rights of others</li>
              <li>Post false, misleading, or harmful content</li>
              <li>Upload viruses or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper operation of the Service</li>
              <li>Collect or store personal data about other users without consent</li>
              <li>Use the Service for any unlawful purpose</li>
            </ul>
          </Section>

          <Section title="5. INTELLECTUAL PROPERTY">
            <p>
              The Service and all content, features, and functionality are owned by Recept, Inc. and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Service without our prior written consent.
            </p>
          </Section>

          <Section title="6. PAYMENT TERMS">
            <p>
              Some features of our Service require payment. By subscribing to a paid plan, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pay all fees when due</li>
              <li>Provide valid payment information</li>
              <li>Authorize us to charge your payment method</li>
              <li>Accept our pricing and billing policies</li>
            </ul>
            <p className="mt-4">
              Subscriptions automatically renew unless cancelled at least 30 days before the end of the billing period. Refunds are available within 14 days of purchase for annual plans.
            </p>
          </Section>

          <Section title="7. DISCLAIMER OF WARRANTIES">
            <p>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. RECEPT MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </Section>

          <Section title="8. LIMITATION OF LIABILITY">
            <p>
              IN NO EVENT SHALL RECEPT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I) YOUR USE OR INABILITY TO USE THE SERVICE; (II) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SERVERS; (III) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICE.
            </p>
          </Section>

          <Section title="9. INDEMNIFICATION">
            <p>
              You agree to indemnify, defend, and hold harmless Recept and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with your access to or use of the Service.
            </p>
          </Section>

          <Section title="10. TERMINATION">
            <p>
              We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the Service will immediately cease.
            </p>
          </Section>

          <Section title="11. GOVERNING LAW">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the state or federal courts of California.
            </p>
          </Section>

          <Section title="12. CHANGES TO TERMS">
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on our website and updating the "Last updated" date. Your continued use of the Service after such changes constitutes acceptance of the new Terms.
            </p>
          </Section>

          <Section title="13. SEVERABILITY">
            <p>
              If any provision of these Terms is held to be unenforceable, such provision shall be reformed only to the extent necessary to make it enforceable, and the remaining provisions shall remain in full force and effect.
            </p>
          </Section>

          <Section title="14. CONTACT US">
            <p>If you have any questions about these Terms, please contact us:</p>
            <div className="mt-4 space-y-2">
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-indigo-600" />
                <span>Email: legal@recept.ai</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-indigo-600" />
                <span>Phone: +1 (415) 555-0123</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <span>Address: 548 Market St, Suite 300, San Francisco, CA 94104</span>
              </p>
            </div>
          </Section>
        </div>
      </section>
    </PageLayout>
  );
}
