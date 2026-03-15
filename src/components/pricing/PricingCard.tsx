import React, { useState } from 'react';
import { Check, Loader } from 'lucide-react';
import { stripePromise } from '../../config/stripe';

interface PricingCardProps {
  title: string;
  price: string;
  tokens: string;
  features: string[];
  priceId: string;
  popular?: boolean;
}

export default function PricingCard({ title, price, tokens, features, priceId, popular }: PricingCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/`,
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`border-4 ${popular ? 'border-yellow-500 dark:border-yellow-400' : 'border-black dark:border-white'} p-8 transform transition duration-300 hover:-translate-y-2 hover:shadow-xl bg-white dark:bg-gray-800 relative`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 dark:bg-yellow-400 text-black px-4 py-1 font-mono text-sm">
          MOST POPULAR
        </div>
      )}
      <div className="text-center mb-8">
        <h3 className="font-mono text-2xl font-bold mb-2">{title}</h3>
        <div className="font-mono text-4xl font-bold mb-2">{price}</div>
        <div className="font-mono text-sm text-gray-600 dark:text-gray-400">{tokens}</div>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center font-mono text-sm">
            <Check className="w-5 h-5 mr-2 text-green-500" />
            {feature}
          </li>
        ))}
      </ul>
      {error && (
        <div className="mb-4 p-2 text-red-500 text-sm font-mono text-center bg-red-100 dark:bg-red-900 rounded">
          {error}
        </div>
      )}
      <button
        onClick={handleSubscribe}
        disabled={isLoading}
        className={`w-full py-4 font-mono font-bold transition duration-300 ${
          popular
            ? 'bg-yellow-500 hover:bg-yellow-600 text-black disabled:bg-yellow-300'
            : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 disabled:bg-gray-400 dark:disabled:bg-gray-600'
        } flex items-center justify-center`}
      >
        {isLoading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          'GET STARTED'
        )}
      </button>
    </div>
  );
}