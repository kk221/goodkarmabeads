"use client"

import React, { useState } from "react"
import { zodiacSigns } from "../shared/ZodiacSigns"
import { FortuneCard } from "./FortuneCard"
import { Button } from "../ui/button"
import { Sparkles } from "lucide-react"

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

  const fetchHoroscope = async (sign) => {
    try {
      setIsLoading(true)
      setError(null)
      setDailyFortune(null)
      
      const response = await fetch(`/api/horoscope?sign=${sign}`)
      if (!response.ok) {
        throw new Error('Failed to fetch horoscope')
      }
      const data = await response.json()
      setDailyFortune(data)
      setIsModalOpen(true)
    } catch (err) {
      setError(err.message)
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

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
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
                  onChange={(e) => setSelectedSign(e.target.value)}
                  className="sr-only"
                  aria-label={`Select ${zodiac.name}`}
                />
                <label htmlFor={zodiac.sign}>
                  <Button
                    type="button"
                    variant={selectedSign === zodiac.sign ? "default" : "outline"}
                    className={`
                      flex flex-col items-center p-2 h-auto zodiac-button w-full
                      ${selectedSign === zodiac.sign 
                        ? 'bg-[#d3ae8b] text-[#1d2a3a]' 
                        : 'bg-[#2a3b4f] text-[#d3ae8b]/80 hover:text-[#d3ae8b]'
                      }
                    `}
                    onClick={() => setSelectedSign(zodiac.sign)}
                    aria-pressed={selectedSign === zodiac.sign}
                  >
                    <span className="text-xl" aria-hidden="true">{zodiac.symbol}</span>
                    <span className="text-xs mt-1">{zodiac.name}</span>
                    <span className="text-[10px] opacity-75 mt-0.5">{zodiac.dates}</span>
                  </Button>
                </label>
              </div>
            ))}
          </div>
        </fieldset>
        
        <Button 
          type="submit" 
          id="submitHoroscope"
          name="submitHoroscope"
          className={`
            w-full max-w-md mx-auto mt-8 py-4 flex items-center justify-center gap-2
            bg-[#d3ae8b] text-[#1d2a3a] hover:bg-[#d3ae8b]/90 
            transition-all duration-300 ease-in-out
            ${!selectedSign ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
          `}
          disabled={!selectedSign || isLoading}
          aria-label="Get your daily fortune"
        >
          <Sparkles className={`w-5 h-5 ${isLoading ? 'animate-spin' : 'animate-pulse'}`} aria-hidden="true" />
          <span className="text-lg font-medium">
            {isLoading ? "Reading the stars..." : "Get Your Daily Fortune"}
          </span>
        </Button>
      </form>

      {error && (
        <p role="alert" className="text-red-500 mt-4 text-center">{error}</p>
      )}

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

