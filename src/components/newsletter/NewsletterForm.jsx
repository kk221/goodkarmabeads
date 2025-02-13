'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [interests, setInterests] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, interests }),
      })

      if (!response.ok) throw new Error('Subscription failed')

      setStatus('success')
      setEmail('')
      setInterests([])
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="bg-[#2a3b4f] rounded-xl p-6 max-w-md mx-auto">
      <h3 className="text-2xl font-playfair text-[#d3ae8b] mb-4">
        Join Our Spiritual Journey
      </h3>
      
      <p className="text-[#d3ae8b]/80 mb-6">
        Subscribe to receive weekly insights, special offers, and exclusive content.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-[#d3ae8b] mb-2 block">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-[#1d2a3a] border border-[#d3ae8b]/20 rounded-lg focus:border-[#d3ae8b] focus:ring-1 focus:ring-[#d3ae8b] outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label className="text-[#d3ae8b] mb-2 block">
            Areas of Interest
          </label>
          <div className="space-y-2">
            {['Horoscope', 'Tarot', 'Birth Chart', 'Feng Shui'].map((interest) => (
              <label key={interest} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={interest}
                  checked={interests.includes(interest)}
                  onChange={(e) => {
                    setInterests(prev =>
                      e.target.checked
                        ? [...prev, interest]
                        : prev.filter(i => i !== interest)
                    )
                  }}
                  className="text-[#d3ae8b]"
                />
                <span className="text-[#d3ae8b]/80">{interest}</span>
              </label>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3 bg-[#d3ae8b] text-[#1d2a3a] rounded-lg font-semibold hover:bg-[#d3ae8b]/90 transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? 'Subscribing...' :
           status === 'success' ? 'Subscribed!' :
           status === 'error' ? 'Try Again' :
           'Subscribe Now'}
        </motion.button>
      </form>
    </div>
  )
}