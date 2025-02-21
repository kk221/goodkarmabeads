'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import Image from 'next/image'

export default function SpiritRealm() {
  const [isRevealing, setIsRevealing] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [question, setQuestion] = useState('')
  const [reading, setReading] = useState(null)

  const products = [
    {
      id: 1,
      name: "Healing Crystal",
      price: 25.00,
      image: "/images/crystal.jpg",
      description: "Natural healing crystal for spiritual balance"
    },
    {
      id: 2,
      name: "Tarot Deck",
      price: 35.00,
      image: "/images/tarot.jpg",
      description: "Traditional tarot deck for divination"
    },
    {
      id: 3,
      name: "Meditation Cushion",
      price: 45.00,
      image: "/images/cushion.jpg",
      description: "Comfortable cushion for meditation practice"
    },
    {
      id: 4,
      name: "Sage Bundle",
      price: 15.00,
      image: "/images/sage.jpg",
      description: "Sacred sage for space cleansing"
    },
    {
      id: 5,
      name: "Crystal Pendant",
      price: 30.00,
      image: "/images/pendant.jpg",
      description: "Protective crystal pendant necklace"
    },
    {
      id: 6,
      name: "Incense Set",
      price: 20.00,
      image: "/images/incense.jpg",
      description: "Sacred incense for spiritual rituals"
    }
  ]

  const spiritMessages = {
    guidance: [
      "Trust in the path that lies before you",
      "Your spirit guides are watching over you",
      "A period of spiritual growth approaches",
      "Listen to your inner wisdom",
      "The universe is aligning in your favor",
      "Ancient wisdom seeks to reach you",
      "Your spiritual journey is unfolding perfectly",
      "Divine timing is at work in your life"
    ],
    signs: [
      "Watch for signs in nature",
      "Numbers will show you the way",
      "Dreams hold important messages",
      "Synchronicities are increasing",
      "Pay attention to recurring symbols",
      "Animal messengers bring wisdom",
      "The elements speak to you",
      "Ancestral guidance surrounds you"
    ],
    actions: [
      "Meditate on your question",
      "Light a candle for clarity",
      "Write your intentions down",
      "Cleanse your energy field",
      "Connect with nature",
      "Practice gratitude daily",
      "Create a sacred space",
      "Seek moments of silence"
    ]
  }

  const revealMessage = () => {
    if (!question.trim()) return

    setIsRevealing(true)
    setShowResult(false)

    setTimeout(() => {
      const guidance = spiritMessages.guidance[Math.floor(Math.random() * spiritMessages.guidance.length)]
      const sign = spiritMessages.signs[Math.floor(Math.random() * spiritMessages.signs.length)]
      const action = spiritMessages.actions[Math.floor(Math.random() * spiritMessages.actions.length)]

      setReading({
        guidance,
        sign,
        action
      })

      setShowResult(true)
      setIsRevealing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#1d2a3a] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-playfair text-[#d3ae8b] text-center mb-12">
          Spirit Realm Shop
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-[#2a3b4f]/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-[#d3ae8b]/20"
            >
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <h3 className="text-xl text-[#d3ae8b] font-semibold mb-2">
                {product.name}
              </h3>
              
              <p className="text-[#d3ae8b]/60 mb-4 text-sm">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-[#d3ae8b] text-lg font-semibold">
                  ${product.price.toFixed(2)}
                </span>
                
                <Button
                  className="bg-[#d3ae8b] hover:bg-[#d3ae8b]/90 text-[#1d2a3a] px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 