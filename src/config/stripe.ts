import { loadStripe } from '@stripe/stripe-js';

// Ensure the public key exists
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  console.error('Missing Stripe public key');
}

export const stripePromise = loadStripe(stripePublicKey);

// Real price IDs from your Stripe dashboard
export const STRIPE_PRICES = {
  STARTER: 'price_1234567890',  // Replace with your actual Stripe price ID
  PRO: 'price_2345678901',      // Replace with your actual Stripe price ID
  UNLIMITED: 'price_3456789012' // Replace with your actual Stripe price ID
} as const;