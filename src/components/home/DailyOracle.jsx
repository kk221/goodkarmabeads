"use client"

import React, { useState, useEffect } from "react"
import { zodiacSigns } from "../shared/ZodiacSigns"
import { FortuneCard } from "./FortuneCard"
import { Button } from "../ui/button"
import { Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

/**
 * @typedef {Object} DailyFortune
 * @property {string} zodiacInfluence
 * @property {string[]} positiveEnergies
 * @property {string|string[]} awareness
 * @property {Object} lucky
 * @property {number} lucky.number
 * @property {string} lucky.time
 * @property {string} lucky.color
 */

export default function DailyOracle() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSign, setSelectedSign] = useState("")
  const [dailyFortune, setDailyFortune] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [prediction, setPrediction] = useState("")
  const [mounted, setMounted] = useState(false)

  // Handle hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignSelect = (sign) => {
    setSelectedSign(sign)
    if (dailyFortune && selectedSign === sign) {
      return
    }
    setPrediction("")
    setDailyFortune(null)
    setIsModalOpen(false)
  }

  const fetchHoroscope = async (sign) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch(`/api/horoscope?sign=${sign}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch horoscope')
      }
      
      const data = await response.json()
      setDailyFortune(data)
      setPrediction(data.prediction || "The stars are aligning to reveal your destiny...")
      setIsModalOpen(true)
    } catch (err) {
      setError(err.message)
      console.error('Horoscope fetch error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selectedSign) {
      await fetchHoroscope(selectedSign)
    }
  }

  if (!mounted) {
    return null // Prevent hydration issues
  }

  return (
    <div className="container mx-auto px-4">
     

      <form onSubmit={handleSubmit} className="space-y-4" id="horoscopeForm" name="horoscopeForm">
        <fieldset>
          <legend className="sr-only">Choose your zodiac sign</legend>
          <div className="grid grid-cols-4 gap-2">
            {zodiacSigns.map((zodiac) => (
              <div key={zodiac.sign}>
                <input
                  type="radio"
                  id={zodiac.sign}
                  name="zodiacSign"
                  value={zodiac.sign}
                  checked={selectedSign === zodiac.sign}
                  onChange={(e) => handleSignSelect(e.target.value)}
                  className="sr-only"
                  aria-label={`Select ${zodiac.name}`}
                />
                <label htmlFor={zodiac.sign}>
                  <Button
                    type="button"
                    variant={selectedSign === zodiac.sign ? "default" : "outline"}
                    className="w-full flex flex-col items-center p-2 h-auto bg-transparent text-[#d3ae8b] border-[#d3ae8b] hover:bg-transparent hover:border-[#d3ae8b] [&:not(:disabled)]:border-[#d3ae8b]"
                    onClick={() => handleSignSelect(zodiac.sign)}
                  >
                    <span className="text-xl">{zodiac.symbol}</span>
                    <span className="text-xs mt-1">{zodiac.name}</span>
                    <span className="text-[10px] opacity-75 mt-0.5">{zodiac.dates}</span>
                  </Button>
                </label>
              </div>
            ))}
          </div>
        </fieldset>
        
        <div className="relative mt-8 flex justify-center">
          <Button 
            type="submit" 
            id="submitHoroscope"
            name="submitHoroscope"
            onClick={handleSubmit}
            className={`
              relative z-10 w-full max-w-md py-6 px-8
              bg-[#2a3b4f] hover:bg-[#2a3b4f]/90 
              shadow-lg hover:shadow-xl
              border-2 border-[#d3ae8b]/50
              rounded-lg
              transition-all duration-300 ease-in-out
              ${!selectedSign ? 'opacity-50 cursor-not-allowed' : 'hover:scale-102 hover:translate-y-[-2px]'}
            `}
            disabled={!selectedSign || isLoading}
            aria-label="Get your daily fortune"
          >
            <div className="flex items-center justify-center gap-3">
              <Sparkles 
                className={`w-6 h-6 text-[#d3ae8b] ${isLoading ? 'animate-spin' : 'animate-pulse'}`} 
                aria-hidden="true"
              />
              <span className="text-xl font-bold text-[#d3ae8b]">
                {isLoading ? "Reading the stars..." : "Get Your Daily Fortune"}
              </span>
            </div>
          </Button>
          
          <div 
            className={`
              absolute inset-0 max-w-md mx-auto
              bg-[#1d2a3a]/20 blur-md
              transition-opacity duration-300
              ${selectedSign ? 'opacity-100' : 'opacity-0'}
            `}
            aria-hidden="true"
          />
        </div>
      </form>

      {error && (
        <p role="alert" className="text-red-500 mt-4 text-center">{error}</p>
      )}

      <AnimatePresence mode="wait">
        {dailyFortune && isModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8"
          >
            <Card className="bg-[#2a3b4f] hover:bg-[#2a3b4f]/90 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-[#d3ae8b]">
                  {selectedSign}'s Daily Oracle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#d3ae8b]/90 mb-6 leading-relaxed">
                  {prediction}
                </p>
                <Button
                  className="w-full py-3 px-6 bg-[#2a3b4f] hover:bg-[#2a3b4f]/80 text-[#d3ae8b] 
                    font-semibold rounded-lg transition-colors duration-300 border-2 border-[#d3ae8b]/50"
                  onClick={() => fetchHoroscope(selectedSign)}
                >
                  Get New Prediction
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {dailyFortune && isModalOpen && (
        <FortuneCard
          fortune={dailyFortune}
          selectedSign={selectedSign}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

