import { useState } from 'react';
import { Check, X, ChevronRight, Sparkles, Users, Headphones, Zap, ArrowUpRight } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: { text: string; included: boolean }[];
  cta: string;
  popular?: boolean;
  seats: string;
}

function PricingCard({ tier, billingCycle }: { tier: PricingTier; billingCycle: 'monthly' | 'annual' }) {
  const isAnnual = billingCycle === 'annual';
  const price = isAnnual ? tier.price : tier.price;
  
  return (
    <div className={`relative p-8 border-2 bg-white dark:bg-gray-800 transition-all duration-300 ${
      tier.popular 
        ? 'border-indigo-600 dark:border-indigo-400 shadow-[8px_8px_0px_0px_rgba(99,102,241,1)] transform scale-105' 
        : 'border-black dark:border-white hover:shadow-[4px_4px_0px_0px_rgba(99,102,241,0.5)]'
    }`}>
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white font-mono text-sm font-bold">
          MOST POPULAR
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="font-mono text-2xl font-bold mb-2">{tier.name}</h3>
        <p className="font-mono text-sm text-gray-500">{tier.description}</p>
      </div>
      
      <div className="text-center mb-8">
        <div className="flex items-baseline justify-center gap-1">
          <span className="font-mono text-sm text-gray-500">$</span>
          <span className="font-mono text-5xl font-black">{price}</span>
          <span className="font-mono text-gray-500">/{tier.period}</span>
        </div>
        {isAnnual && (
          <p className="font-mono text-sm text-green-600 mt-2">Save 20% with annual billing</p>
        )}
        <p className="font-mono text-sm text-gray-500 mt-4">{tier.seats}</p>
      </div>
      
      <ul className="space-y-4 mb-8">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            {feature.included ? (
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            ) : (
              <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
            )}
            <span className={`font-mono text-sm ${feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}`}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
      
      <button className={`w-full py-4 font-mono font-bold text-lg border-2 transition-all duration-300 flex items-center justify-center gap-2 ${
        tier.popular
          ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
          : 'border-black dark:border-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900'
      }`}>
        {tier.cta}
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-2 border-black dark:border-white">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <span className="font-mono font-bold text-lg">{question}</span>
        <ChevronRight className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="font-mono text-gray-600 dark:text-gray-300">{answer}</p>
        </div>
      )}
    </div>
  );
}

function ComparisonRow({ feature, starter, professional, enterprise }: { feature: string; starter: string | boolean; professional: string | boolean; enterprise: string | boolean }) {
  const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-gray-300" />;
    }
    return <span className="font-mono text-sm">{value}</span>;
  };
  
  return (
    <div className="grid grid-cols-4 border-b border-gray-200 dark:border-gray-700">
      <div className="p-4 font-mono text-sm font-bold">{feature}</div>
      <div className="p-4 flex justify-center">{renderValue(starter)}</div>
      <div className="p-4 flex justify-center">{renderValue(professional)}</div>
      <div className="p-4 flex justify-center">{renderValue(enterprise)}</div>
    </div>
  );
}

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  
  const tiers: PricingTier[] = [
    {
      name: 'STARTER',
      price: '49',
      period: 'month',
      description: 'Perfect for small teams and startups',
      seats: 'Up to 3 team members',
      features: [
        { text: 'Access to candidate database', included: true },
        { text: '100 candidate searches/month', included: true },
        { text: 'Basic AI matching', included: true },
        { text: 'Email support', included: true },
        { text: '5 job postings', included: true },
        { text: 'Basic analytics', included: true },
        { text: 'Advanced AI screening', included: false },
        { text: 'API access', included: false },
        { text: 'Custom integrations', included: false },
        { text: 'Dedicated account manager', included: false }
      ],
      cta: 'START FREE TRIAL'
    },
    {
      name: 'PROFESSIONAL',
      price: '149',
      period: 'month',
      description: 'For growing teams that need more power',
      seats: 'Up to 10 team members',
      popular: true,
      features: [
        { text: 'Access to candidate database', included: true },
        { text: 'Unlimited candidate searches', included: true },
        { text: 'Advanced AI matching', included: true },
        { text: 'Priority email & chat support', included: true },
        { text: 'Unlimited job postings', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Advanced AI screening', included: true },
        { text: 'API access', included: true },
        { text: 'Custom integrations', included: false },
        { text: 'Dedicated account manager', included: false }
      ],
      cta: 'START FREE TRIAL'
    },
    {
      name: 'ENTERPRISE',
      price: 'Custom',
      period: 'month',
      description: 'For large organizations with custom needs',
      seats: 'Unlimited team members',
      features: [
        { text: 'Access to candidate database', included: true },
        { text: 'Unlimited candidate searches', included: true },
        { text: 'Advanced AI matching', included: true },
        { text: '24/7 dedicated support', included: true },
        { text: 'Unlimited job postings', included: true },
        { text: 'Custom analytics', included: true },
        { text: 'Advanced AI screening', included: true },
        { text: 'Full API access', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'Dedicated account manager', included: true }
      ],
      cta: 'CONTACT SALES'
    }
  ];

  const faqs = [
    { 
      question: 'What payment methods do you accept?', 
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual Enterprise plans. We also offer invoicing for Enterprise customers.'
    },
    { 
      question: 'Can I change my plan later?', 
      answer: 'Yes! You can upgrade or downgrade your plan at any time. When upgrading, you\'ll be charged the prorated difference. When downgrading, you\'ll receive credit towards future billing cycles.'
    },
    { 
      question: 'Is there a free trial?', 
      answer: 'Yes, we offer a 14-day free trial for all plans. No credit card required to start. You\'ll have full access to all features during the trial period.'
    },
    { 
      question: 'What happens if I exceed my search limit?', 
      answer: 'We\'ll notify you when you\'re approaching your limit. You can either upgrade your plan or purchase additional searches as needed. Unused searches do not roll over.'
    },
    { 
      question: 'Do you offer discounts for nonprofits?', 
      answer: 'Yes! We offer a 30% discount for registered nonprofits and educational institutions. Contact our sales team to learn more about our nonprofit pricing.'
    },
    { 
      question: 'How secure is my data?', 
      answer: 'We take data security very seriously. All data is encrypted in transit and at rest. We\'re SOC 2 Type II certified and fully GDPR compliant. We never sell your data.'
    }
  ];

  const comparisonData = [
    { feature: 'Candidate Searches', starter: '100/mo', professional: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'Job Postings', starter: '5', professional: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'AI Matching', starter: true, professional: true, enterprise: true },
    { feature: 'AI Screening', starter: false, professional: true, enterprise: true },
    { feature: 'API Access', starter: false, professional: true, enterprise: true },
    { feature: 'Custom Branding', starter: false, professional: true, enterprise: true },
    { feature: 'SSO/SAML', starter: false, professional: false, enterprise: true },
    { feature: 'Dedicated Support', starter: false, professional: false, enterprise: true }
  ];

  const benefits = [
    { icon: Zap, title: 'FAST SETUP', description: 'Get started in minutes, not days. Our onboarding team will help you migrate your existing data.' },
    { icon: Headphones, title: '24/7 SUPPORT', description: 'Our support team is available around the clock to help you succeed.' },
    { icon: Users, title: 'SCALABLE', description: 'From startup to enterprise, our platform grows with your hiring needs.' }
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-32 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)', top: '-20%', right: '-10%' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-indigo-600">Pricing</span>
            <h1 className="font-mono text-5xl md:text-7xl font-black mt-6 mb-8">
              SIMPLE, TRANSPARENT
              <span className="block text-indigo-600">PRICING</span>
            </h1>
            <p className="font-mono text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose the plan that fits your hiring needs. All plans include a 14-day free trial.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-16">
            <div className={`flex border-2 border-black dark:border-white ${billingCycle === 'annual' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 font-mono font-bold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                MONTHLY
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-3 font-mono font-bold transition-all flex items-center gap-2 ${
                  billingCycle === 'annual'
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                ANNUAL
                <span className="px-2 py-0.5 bg-green-500 text-white text-xs">SAVE 20%</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier, i) => (
              <PricingCard key={i} tier={tier} billingCycle={billingCycle} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="text-center p-8 border-2 border-black dark:border-white bg-white dark:bg-gray-900">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-indigo-600 text-white">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="font-mono text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="font-mono text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-mono text-4xl font-bold mb-4">COMPARE PLANS</h2>
            <p className="font-mono text-gray-600 dark:text-gray-300">See exactly what's included in each plan</p>
          </div>
          
          <div className="border-2 border-black dark:border-white overflow-hidden">
            <div className="grid grid-cols-4 bg-gray-900 text-white">
              <div className="p-4 font-mono font-bold">FEATURE</div>
              <div className="p-4 font-mono font-bold text-center">STARTER</div>
              <div className="p-4 font-mono font-bold text-center">PROFESSIONAL</div>
              <div className="p-4 font-mono font-bold text-center">ENTERPRISE</div>
            </div>
            {comparisonData.map((row, i) => (
              <ComparisonRow key={i} {...row} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-gray-500">FAQ</span>
            <h2 className="font-mono text-4xl font-bold mt-4">FREQUENTLY ASKED QUESTIONS</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (<FAQItem key={i} {...faq} />))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-mono text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            STILL HAVE QUESTIONS?
          </h2>
          <p className="font-mono text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Our team is here to help you find the perfect plan for your hiring needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono font-bold text-lg border-2 border-gray-900 dark:border-white hover:bg-white hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-white transition-all duration-300 flex items-center gap-3">
              <span>CONTACT SALES</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-mono font-bold text-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 flex items-center gap-3">
              <Sparkles className="w-5 h-5" />
              <span>START FREE TRIAL</span>
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
