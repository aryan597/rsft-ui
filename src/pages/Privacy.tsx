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

export default function Privacy() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-indigo-600">Privacy</span>
          <h1 className="font-mono text-5xl md:text-6xl font-black mt-6 mb-8">PRIVACY POLICY</h1>
          <p className="font-mono text-lg text-gray-600 dark:text-gray-300">
            Last updated: March 15, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section title="1. INTRODUCTION">
            <p>
              Recept, Inc. ("Recept," "we," "us," or "our") operates the website located at www.recept.ai and the Recept platform (collectively, the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing or using the Service, you agree to be bound by the terms of this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the Service.
            </p>
          </Section>

          <Section title="2. INFORMATION WE COLLECT">
            <h3 className="font-bold text-lg mt-6 mb-3">Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Register for an account</li>
              <li>Fill out a profile</li>
              <li>Upload your resume or CV</li>
              <li>Apply for a job</li>
              <li>Communicate with us</li>
            </ul>
            <p className="mt-4">This information may include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, and phone number</li>
              <li>Resume, CV, and work history</li>
              <li>Education history and qualifications</li>
              <li>Skills and professional experience</li>
              <li>Profile photo</li>
              <li>Links to professional social media profiles</li>
            </ul>

            <h3 className="font-bold text-lg mt-6 mb-3">Automatically Collected Information</h3>
            <p>When you access our Service, we may automatically collect certain information including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address and device identifiers</li>
              <li>Browser type and operating system</li>
              <li>Pages viewed and features used</li>
              <li>Access times and referring URLs</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </Section>

          <Section title="3. HOW WE USE YOUR INFORMATION">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our Service</li>
              <li>Match candidates with job opportunities</li>
              <li>Enable communication between recruiters and candidates</li>
              <li>Send you important updates and notifications</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Analyze usage patterns and improve user experience</li>
              <li>Prevent fraud and ensure security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </Section>

          <Section title="4. INFORMATION SHARING & DISCLOSURE">
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Employers and recruiters who use our platform</li>
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners with your consent</li>
            </ul>
            <p className="mt-4">
              We do not sell your personal information to third parties. We do not share your resume or personal information with employers without your explicit consent.
            </p>
          </Section>

          <Section title="5. DATA SECURITY">
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Employee training on data protection</li>
            </ul>
            <p className="mt-4">
              While we strive to protect your personal information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="6. YOUR RIGHTS">
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of certain data sharing</li>
              <li>Export your data in a portable format</li>
              <li>Object to certain processing activities</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at privacy@recept.ai.
            </p>
          </Section>

          <Section title="7. DATA RETENTION">
            <p>
              We retain your personal information for as long as your account is active or as needed to provide you services. We will retain and use your information as necessary to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Comply with our legal obligations</li>
              <li>Resolve disputes</li>
              <li>Enforce our agreements</li>
            </ul>
          </Section>

          <Section title="8. CHILDREN'S PRIVACY">
            <p>
              Our Service is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </Section>

          <Section title="9. CHANGES TO THIS POLICY">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </Section>

          <Section title="10. CONTACT US">
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <div className="mt-4 space-y-2">
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-indigo-600" />
                <span>Email: privacy@recept.ai</span>
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
