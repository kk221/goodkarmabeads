'use client'

import { useState } from 'react'
import { useCart } from '@/lib/hooks/useCart'
import { loadStripe } from '@stripe/stripe-js'
import { motion } from 'framer-motion'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

export default function CheckoutForm() {
  const { items, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Create checkout session
      const response = await fetch('/api/shop/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      })

      if (!response.ok) throw new Error('Checkout failed')

      const { sessionId } = await response.json()
      
      // Redirect to Stripe checkout
      const stripe = await stripePromise
      const { error } = await stripe.redirectToCheckout({ sessionId })
      
      if (error) throw error

    } catch (err) {
      setError('Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-[#2a3b4f] rounded-xl">
      <h2 className="text-2xl font-playfair text-[#d3ae8b] mb-6">Checkout</h2>
      
      {/* Order Summary */}
      <div className="mb-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-[#d3ae8b]/80">
            <span>{item.name} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        
        <div className="border-t border-[#d3ae8b]/20 pt-4">
          <div className="flex justify-between text-[#d3ae8b] font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        disabled={loading || items.length === 0}
        className="w-full py-3 bg-[#d3ae8b] text-[#1d2a3a] rounded-lg font-semibold hover:bg-[#d3ae8b]/90 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Processing...' : 'Proceed to Payment'}
      </motion.button>
    </div>
  )
}