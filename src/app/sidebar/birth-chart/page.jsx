'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"

export default function BirthChart() {
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: ''
  })
  const [reading, setReading] = useState(null)
  const [error, setError] = useState(null)

  const calculateChart = async (e) => {
    e.preventDefault()
    setIsCalculating(true)
    setShowResult(false)
    setError(null)

    try {
      const birthDate = new Date(formData.date + 'T' + formData.time)
      
      const chartResponse = await fetch('/api/birthchart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          datetime: birthDate.toISOString(),
          latitude: 0, // Default values since we're not using geocoding
          longitude: 0,
          name: formData.name
        })
      })

      if (!chartResponse.ok) {
        throw new Error('Failed to calculate birth chart')
      }

      const chartData = await chartResponse.json()
      setReading({
        sunSign: chartData.planets.sun.sign,
        moonSign: chartData.planets.moon.sign,
        ascendant: chartData.ascendant.sign,
        interpretation: `
          Your Sun in ${chartData.planets.sun.sign} (${chartData.planets.sun.house}th house): ${chartData.planets.sun.interpretation}
          Your Moon in ${chartData.planets.moon.sign} (${chartData.planets.moon.house}th house): ${chartData.planets.moon.interpretation}
          Your Ascendant in ${chartData.ascendant.sign}: ${chartData.ascendant.interpretation}
        `
      })

      setShowResult(true)
    } catch (err) {
      setError('Unable to calculate birth chart. Please try again.')
      console.error('Birth chart calculation error:', err)
    } finally {
      setIsCalculating(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-[#1d2a3a] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-playfair text-[#d3ae8b] text-center mb-12">
          Celestial Birth Chart
        </h1>
        
        <div className="bg-[#2a3b4f]/50 backdrop-blur-sm rounded-xl p-12 shadow-xl">
          <form onSubmit={calculateChart} className="space-y-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#d3ae8b] mb-2">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#1d2a3a] border-[#d3ae8b]/20 text-[#d3ae8b]"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-[#d3ae8b] mb-2">Birth Date</label>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#1d2a3a] border-[#d3ae8b]/20 text-[#d3ae8b]"
                />
              </div>
              <div>
                <label className="block text-[#d3ae8b] mb-2">Birth Time</label>
                <Input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#1d2a3a] border-[#d3ae8b]/20 text-[#d3ae8b]"
                />
              </div>
              <div>
                <label className="block text-[#d3ae8b] mb-2">Birth Location</label>
                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#1d2a3a] border-[#d3ae8b]/20 text-[#d3ae8b]"
                  placeholder="City, Country"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isCalculating}
              className="w-full bg-[#d3ae8b] hover:bg-[#d3ae8b]/90 text-[#1d2a3a] py-6 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
            >
              {isCalculating ? "Calculating Chart..." : "Calculate Birth Chart"}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              {error}
            </div>
          )}

          {showResult && reading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 p-8 bg-[#1d2a3a]/50 rounded-xl border border-[#d3ae8b]/20"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <h3 className="text-[#d3ae8b] font-semibold mb-2">Sun Sign</h3>
                  <p className="text-2xl text-[#d3ae8b]">{reading.sunSign}</p>
                </div>
                <div className="text-center">
                  <h3 className="text-[#d3ae8b] font-semibold mb-2">Moon Sign</h3>
                  <p className="text-2xl text-[#d3ae8b]">{reading.moonSign}</p>
                </div>
                <div className="text-center">
                  <h3 className="text-[#d3ae8b] font-semibold mb-2">Ascendant</h3>
                  <p className="text-2xl text-[#d3ae8b]">{reading.ascendant}</p>
                </div>
              </div>
              
              <div className="text-[#d3ae8b]/80 leading-relaxed whitespace-pre-line">
                {reading.interpretation}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
} 