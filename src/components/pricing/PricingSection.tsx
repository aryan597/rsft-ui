import React from 'react';
import PricingCard from './PricingCard';
import { STRIPE_PRICES } from '../../config/stripe';

const pricingPlans = [
  {
    title: 'STARTER',
    price: '£9.99',
    tokens: '20,000 Token / day',
    priceId: STRIPE_PRICES.STARTER,
    features: [
      'AI Resume Analysis',
      'Basic Job Matching',
      'Email Support',
      'Export to PDF',
    ]
  },
  {
    title: 'PRO',
    price: '£19.99',
    tokens: '60,000 Tokens / day',
    priceId: STRIPE_PRICES.PRO,
    popular: true,
    features: [
      'Everything in Starter',
      'Advanced Job Matching',
      'Priority Support',
      'Custom Resume Templates',
      'Auto Email support'
    ]
  },
  {
    title: 'UNLIMITED',
    price: '£59.99',
    tokens: 'Unlimited Tokens / day',
    priceId: STRIPE_PRICES.UNLIMITED,
    features: [
      'Everything in Pro',
      'Unlimited Analysis',
      'Personalised Career Coach',
      'Custom Branding',
      'API Access',
      '24/7 Support',
    ]
  }
];

export default function PricingSection() {
  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-mono text-4xl font-bold mb-4">
            Flexible Plans for Recruiters and Hiring Teams
          </h2>
          <p className="font-mono text-lg text-gray-600 dark:text-gray-400">
            Start small or scale your AI recruiting team.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.title}
              title={plan.title}
              price={plan.price}
              tokens={plan.tokens}
              features={plan.features}
              priceId={plan.priceId}
              popular={plan.popular}
            />
          ))}
        </div>
      </div>
    </div>
  );
}