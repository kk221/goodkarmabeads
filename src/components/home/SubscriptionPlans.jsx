'use client'

import { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Checkbox } from "../ui/checkbox"
import { PlusCircle, X } from 'lucide-react'

const plans = [
  {
    name: "Divine Moment",
    price: "5.99",
    features: [
      "Daily Oracle Reading",
      "Basic Birth Chart",
      "Limited Tarot Spreads",
      "Email Support"
    ]
  },
  {
    name: "Mystic Flow",
    price: "19.99",
    features: [
      "All Basic Features",
      "Advanced Birth Chart Analysis",
      "Full Tarot Deck Access",
      "Priority Email Support",
      "Monthly Personal Reading"
    ]
  },
  {
    name: "Infinite Wisdom",
    price: "89.99",
    features: [
      "All Premium Features",
      "1-on-1 Spiritual Guidance",
      "Custom Birth Chart Reports",
      "Unlimited Readings",
      "24/7 Priority Support",
      "Exclusive Spiritual Events"
    ]
  }
]

const defaultInterests = [
  { id: 'zodiac', label: 'Zodiac' },
  { id: 'birthchart', label: 'Birth Chart' },
  { id: 'tarot', label: 'Tarot' },
  { id: 'fengshui', label: 'Feng Shui' },
  { id: 'luckydraw', label: 'Lucky Draw' }
]

export default function SubscriptionPlans() {
  const { data: session } = useSession()
  const [email, setEmail] = useState(session?.user?.email || '')
  const [interests, setInterests] = useState(defaultInterests)
  const [selectedInterests, setSelectedInterests] = useState([])
  const [newInterest, setNewInterest] = useState('')
  const [status, setStatus] = useState('idle')

  const handleAddInterest = (e) => {
    e.preventDefault()
    if (newInterest.trim()) {
      const newId = newInterest.toLowerCase().replace(/\s+/g, '')
      setInterests([...interests, { id: newId, label: newInterest.trim() }])
      setNewInterest('')
    }
  }

  const handleRemoveInterest = (idToRemove) => {
    setInterests(interests.filter(interest => interest.id !== idToRemove))
    setSelectedInterests(selectedInterests.filter(id => id !== idToRemove))
  }

  const handleSubscribe = async (planId) => {
    if (!session) {
      signIn()
      return
    }
    setStatus('loading')
    try {
      // Add your subscription logic here
      setStatus('success')
    } catch (error) {
      setStatus('error')
      console.error('Subscription error:', error)
    }
  }

  return (
    <section className="py-20 bg-[#1d2a3a]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-playfair text-center text-[#d3ae8b] mb-4">
          Choose Your Journey
        </h2>
        <p className="text-center text-[#d3ae8b] mb-12 max-w-2xl mx-auto">
          Select the perfect plan for your spiritual journey
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-transparent border border-[#d3ae8b] rounded-lg p-6`}
            >
              <h3 className="text-xl font-semibold text-[#d3ae8b] mb-2">{plan.name}</h3>
              <p className="text-3xl text-[#d3ae8b] mb-6">
                ${plan.price}
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-[#d3ae8b]">
                    <span className="mr-2">✦</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleSubscribe(plan.name)}
                disabled={status === 'loading'}
                className="w-full bg-transparent hover:bg-transparent text-[#d3ae8b] border border-[#d3ae8b]"
              >
                {status === 'loading' ? 'Processing...' : 'Subscribe Now'}
              </Button>
            </div>
          ))}
        </div>

        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-[#d3ae8b] mb-4">Your Interests</h3>
          
          <form onSubmit={handleAddInterest} className="mb-6 flex gap-2">
            <Input
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="Add your interest..."
              className="bg-transparent border-[#d3ae8b] text-[#d3ae8b] placeholder:text-[#d3ae8b]/50"
            />
            <Button 
              type="submit"
              className="bg-[#d3ae8b] hover:bg-[#d3ae8b]/80"
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </form>

          <div className="grid grid-cols-1 gap-3">
            {interests.map((interest) => (
              <div
                key={interest.id}
                className="flex items-center justify-between bg-[#2a3b4f] p-3 rounded-lg"
              >
                <label className="flex items-center space-x-2 text-[#d3ae8b]">
                  <Checkbox
                    checked={selectedInterests.includes(interest.id)}
                    onCheckedChange={(checked) => {
                      setSelectedInterests(prev =>
                        checked
                          ? [...prev, interest.id]
                          : prev.filter(i => i !== interest.id)
                      )
                    }}
                    className="border-[#d3ae8b]"
                  />
                  <span>{interest.label}</span>
                </label>
                {!defaultInterests.find(i => i.id === interest.id) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveInterest(interest.id)}
                    className="text-[#d3ae8b] hover:text-[#d3ae8b]/80"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}