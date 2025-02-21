'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"

export default function FengShui() {
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [formData, setFormData] = useState({
    birthYear: '',
    direction: 'north',
    purpose: 'wealth'
  })
  const [reading, setReading] = useState(null)

  const directions = [
    { value: 'north', label: 'North', element: 'Water' },
    { value: 'northeast', label: 'Northeast', element: 'Earth' },
    { value: 'east', label: 'East', element: 'Wood' },
    { value: 'southeast', label: 'Southeast', element: 'Wood' },
    { value: 'south', label: 'South', element: 'Fire' },
    { value: 'southwest', label: 'Southwest', element: 'Earth' },
    { value: 'west', label: 'West', element: 'Metal' },
    { value: 'northwest', label: 'Northwest', element: 'Metal' }
  ]

  const purposes = [
    { value: 'wealth', label: 'Wealth & Prosperity' },
    { value: 'relationships', label: 'Love & Relationships' },
    { value: 'career', label: 'Career & Success' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'knowledge', label: 'Knowledge & Wisdom' }
  ]

  const calculateKuaNumber = async (year) => {
    try {
      // Get Chinese Zodiac data
      const response = await fetch(`https://zodiac.apis.craft.me/api/zodiac/chinese/${year}`)
      const zodiacData = await response.json()
      
      // Calculate Kua number based on birth year
      const lastTwoDigits = year % 100
      const sum = lastTwoDigits.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0)
      const kuaNumber = (10 - (sum % 9)) % 9 || 9

      return {
        kuaNumber,
        zodiac: zodiacData.animal,
        element: zodiacData.element
      }
    } catch (error) {
      console.error('Error fetching zodiac data:', error)
      // Fallback calculation if API fails
      const lastTwoDigits = year % 100
      const sum = lastTwoDigits.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0)
      return {
        kuaNumber: (10 - (sum % 9)) % 9 || 9,
        zodiac: getChineseZodiac(year),
        element: getChineseElement(year)
      }
    }
  }

  const getChineseZodiac = (year) => {
    const animals = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"]
    return animals[(year - 4) % 12]
  }

  const getChineseElement = (year) => {
    const elements = ["Wood", "Fire", "Earth", "Metal", "Water"]
    return elements[Math.floor((year - 4) % 10 / 2)]
  }

  const getFengShuiRecommendations = (kuaNumber, direction, purpose) => {
    const elements = {
      north: { element: 'Water', colors: ['blue', 'black'], materials: ['glass', 'mirrors'] },
      east: { element: 'Wood', colors: ['green', 'brown'], materials: ['wood', 'plants'] },
      south: { element: 'Fire', colors: ['red', 'orange'], materials: ['candles', 'lighting'] },
      west: { element: 'Metal', colors: ['white', 'metallic'], materials: ['metal', 'stone'] },
      northeast: { element: 'Earth', colors: ['yellow', 'beige'], materials: ['ceramic', 'crystal'] },
      southeast: { element: 'Wood', colors: ['green', 'teal'], materials: ['bamboo', 'flowers'] },
      southwest: { element: 'Earth', colors: ['pink', 'yellow'], materials: ['clay', 'terracotta'] },
      northwest: { element: 'Metal', colors: ['white', 'gold'], materials: ['copper', 'brass'] }
    }

    const directionInfo = elements[direction]
    const luckyDirections = ['north', 'south', 'east', 'west'].filter(d => 
      calculateKuaNumber(parseInt(formData.birthYear)) % 2 === 0 ? 
      ['north', 'west'].includes(d) : ['south', 'east'].includes(d)
    )

    return {
      kuaNumber,
      element: directionInfo.element,
      colors: directionInfo.colors,
      materials: directionInfo.materials,
      luckyDirections,
      recommendations: generateRecommendations(purpose, directionInfo)
    }
  }

  const generateRecommendations = (purpose, directionInfo) => {
    const recommendations = {
      wealth: [
        `Place a water feature or aquarium in the ${directionInfo.element} area`,
        `Use ${directionInfo.colors.join(' or ')} colored accessories`,
        `Incorporate ${directionInfo.materials.join(' and ')} elements`,
        'Keep this area well-lit and clutter-free'
      ],
      relationships: [
        'Add pairs of items to symbolize partnership',
        `Use ${directionInfo.colors[0]} accents in your bedroom`,
        'Place rose quartz crystals in the southwest corner',
        'Display artwork depicting peaceful scenes'
      ],
      career: [
        'Set up your desk facing your lucky direction',
        `Add ${directionInfo.element}-related items to your workspace`,
        'Keep your goals visible and well-organized',
        'Maintain good lighting in your work area'
      ],
      health: [
        'Ensure good air circulation',
        `Include living plants that thrive in ${directionInfo.element} energy`,
        'Remove any broken items promptly',
        'Keep windows clean and unobstructed'
      ],
      knowledge: [
        'Create a dedicated study or meditation space',
        `Use ${directionInfo.colors.join(' and ')} in your study area`,
        'Place inspiring artwork or quotes on walls',
        'Keep books and learning materials well-organized'
      ]
    }

    return recommendations[purpose]
  }

  const handleCalculate = async (e) => {
    e.preventDefault()
    setIsCalculating(true)
    setShowResult(false)

    try {
      const response = await fetch('/api/fengshui', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to calculate Feng Shui')
      }

      const data = await response.json()
      setReading(data)
      setShowResult(true)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsCalculating(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1d2a3a] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-playfair text-[#d3ae8b] text-center mb-12">
          Personal Feng Shui Guide
        </h1>
        
        <div className="bg-[#2a3b4f]/50 backdrop-blur-sm rounded-xl p-12 shadow-xl">
          <form onSubmit={handleCalculate} className="space-y-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#d3ae8b] mb-2">Birth Year</label>
                <Input
                  type="number"
                  value={formData.birthYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, birthYear: e.target.value }))}
                  required
                  min="1900"
                  max="2099"
                  className="w-full bg-[#1d2a3a] border-[#d3ae8b]/20 text-[#d3ae8b]"
                  placeholder="Enter your birth year"
                />
              </div>
              <div>
                <label className="block text-[#d3ae8b] mb-2">Room Direction</label>
                <select
                  value={formData.direction}
                  onChange={(e) => setFormData(prev => ({ ...prev, direction: e.target.value }))}
                  className="w-full bg-[#1d2a3a] border-[#d3ae8b]/20 text-[#d3ae8b] rounded-md p-2"
                >
                  {directions.map(dir => (
                    <option key={dir.value} value={dir.value}>
                      {dir.label} ({dir.element})
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-[#d3ae8b] mb-2">Purpose</label>
                <select
                  value={formData.purpose}
                  onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                  className="w-full bg-[#1d2a3a] border-[#d3ae8b]/20 text-[#d3ae8b] rounded-md p-2"
                >
                  {purposes.map(purpose => (
                    <option key={purpose.value} value={purpose.value}>
                      {purpose.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isCalculating}
              className="w-full bg-[#d3ae8b] hover:bg-[#d3ae8b]/90 text-[#1d2a3a] py-6 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
            >
              {isCalculating ? "Calculating..." : "Get Feng Shui Recommendations"}
            </Button>
          </form>

          {showResult && reading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 p-8 bg-[#1d2a3a]/50 rounded-xl border border-[#d3ae8b]/20"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-[#d3ae8b] font-semibold mb-2">Your Kua Number</h3>
                  <p className="text-2xl text-[#d3ae8b] mb-4">{reading.kuaNumber}</p>
                  <p className="text-[#d3ae8b]/80">
                    Element: {reading.element}
                  </p>
                </div>
                <div>
                  <h3 className="text-[#d3ae8b] font-semibold mb-2">Favorable Elements</h3>
                  <p className="text-[#d3ae8b]/80 mb-2">
                    Colors: {reading.colors.join(', ')}
                  </p>
                  <p className="text-[#d3ae8b]/80">
                    Materials: {reading.materials.join(', ')}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-[#d3ae8b] font-semibold mb-4">Lucky Directions</h3>
                <p className="text-[#d3ae8b]/80">
                  {reading.luckyDirections.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ')}
                </p>
              </div>
              
              <div>
                <h3 className="text-[#d3ae8b] font-semibold mb-4">Recommendations</h3>
                <ul className="space-y-3">
                  {reading.recommendations.map((rec, index) => (
                    <li key={index} className="text-[#d3ae8b]/80 flex items-start">
                      <span className="mr-2 text-[#d3ae8b]">✦</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
} 