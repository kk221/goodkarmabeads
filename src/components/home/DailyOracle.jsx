'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const oracleMessages = [
  {
    message: "Trust your intuition today. The answers you seek are within.",
    crystal: "Amethyst",
    element: "Air",
    direction: "North"
  },
  {
    message: "A period of transformation approaches. Embrace the change.",
    crystal: "Citrine",
    element: "Fire",
    direction: "South"
  },
  {
    message: "Your spiritual path is illuminated. Take the next step forward.",
    crystal: "Clear Quartz",
    element: "Spirit",
    direction: "Center"
  }
  // Add more messages as needed
]

export default function DailyOracle() {
  const [oracle, setOracle] = useState(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    // Get today's date to ensure same oracle for the whole day
    const today = new Date().toDateString()
    const index = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % oracleMessages.length
    setOracle(oracleMessages[index])
  }, [])

  if (!oracle) return null

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#2a3b4f] rounded-xl p-8 text-center relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d3ae8b]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d3ae8b]/20 to-transparent" />
        
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="unrevealed"
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-playfair text-[#d3ae8b]">
                Your Daily Oracle Awaits
              </h3>
              <p className="text-[#d3ae8b]/80">
                Center yourself and click to receive today's guidance
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsRevealed(true)}
                className="px-6 py-3 bg-[#d3ae8b] text-[#1d2a3a] rounded-lg font-semibold"
              >
                Reveal Message
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-2xl font-playfair text-[#d3ae8b] leading-relaxed">
                "{oracle.message}"
              </div>
              <div className="grid grid-cols-3 gap-4 text-[#d3ae8b]/80">
                <div>
                  <p className="text-sm uppercase tracking-wide">Crystal</p>
                  <p className="font-semibold">{oracle.crystal}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wide">Element</p>
                  <p className="font-semibold">{oracle.element}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wide">Direction</p>
                  <p className="font-semibold">{oracle.direction}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsRevealed(false)}
                className="px-6 py-3 border border-[#d3ae8b] text-[#d3ae8b] rounded-lg font-semibold hover:bg-[#d3ae8b] hover:text-[#1d2a3a] transition-colors"
              >
                Draw Another
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}