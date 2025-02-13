'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'

const plans = [
  {
    id: 'single',
    name: 'Single Reading',
    price: 9.99,
    features: [
      'One detailed reading of your choice',
      'PDF download',
      'Valid for 30 days',
      'Email support'
    ],
    popular: false
  },
  {
    id: '10pack',
    name: '10 Readings Pack',
    price: 79.99,
    features: [
      '10 readings of your choice',
      'PDF downloads',
      'Valid for 90 days',
      'Priority email support',
      '20% savings vs single readings'
    ],
    popular: true
  },
  {
    id: 'monthly',
    name: 'Monthly Access',
    price: 29.99,
    features: [
      'Unlimited readings',
      'Weekly newsletters',
      'PDF downloads',
      'Priority support',
      'Exclusive monthly content',
      'Cancel anytime'
    ],
    popular: false
  },
  {
    id: 'yearly',
    name: 'Yearly Access',
    price: 299.99,
    features: [
      'All Monthly Access features',
      'Two months free',
      'Personal consultation',
      'Early access to new features',
      'Exclusive workshops',
      'VIP support'
    ],
    popular: false
  }
]

export default function SubscriptionPlans() {
  const { data: session } = useSession()
  const [selectedPlan, setSelectedPlan] = useState(null)

  const handleSubscribe = async (planId) => {
    if (!session) {
      signIn()
      return
    }
    // Handle subscription logic
    console.log(`Subscribing to plan: ${planId}`)
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-4xl font-playfair text-center text-[#d3ae8b] mb-4">
        Choose Your Journey
      </h2>
      <p className="text-center text-[#d3ae8b]/80 mb-12 max-w-2xl mx-auto">
        Unlock the mysteries of the universe with our flexible subscription plans.
        Choose the perfect option for your spiritual journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ y: -5 }}
            className={`relative bg-[#2a3b4f] rounded-xl p-6 border-2 ${
              plan.popular ? 'border-[#d3ae8b]' : 'border-[#d3ae8b]/20'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d3ae8b] text-[#1d2a3a] px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            )}

            <h3 className="text-xl font-playfair text-[#d3ae8b] mb-2">{plan.name}</h3>
            <div className="text-3xl font-bold text-white mb-6">
              ${plan.price}
              <span className="text-sm font-normal text-[#d3ae8b]/60">
                {plan.id === 'monthly' ? '/month' : plan.id === 'yearly' ? '/year' : ''}
              </span>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-[#d3ae8b]/80">
                  <span className="text-[#d3ae8b]">✦</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.id)}
              className={`w-full py-3 rounded-lg transition-colors ${
                plan.popular
                  ? 'bg-[#d3ae8b] text-[#1d2a3a] hover:bg-[#d3ae8b]/90'
                  : 'border border-[#d3ae8b] text-[#d3ae8b] hover:bg-[#d3ae8b] hover:text-[#1d2a3a]'
              }`}
            >
              Get Started
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}