'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "../../../components/ui/button"

export default function LuckyDraw() {
  const [isDrawing, setIsDrawing] = useState(false)
  const [result, setResult] = useState(null)
  const [showStick, setShowStick] = useState(false)

  const fortunes = [
    "Great fortune awaits you",
    "A positive change is coming",
    "Trust your intuition today",
    "An unexpected blessing will arrive",
    "Your kindness will be rewarded",
    "A new opportunity is on the horizon",
    "Good karma is heading your way",
    "Your spiritual path is becoming clearer"
  ]

  const drawStick = () => {
    setIsDrawing(true)
    setResult(null)
    setShowStick(false)
    
    setTimeout(() => {
      setShowStick(true)
      const randomIndex = Math.floor(Math.random() * fortunes.length)
      setResult(fortunes[randomIndex])
      setIsDrawing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#1d2a3a] py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-playfair text-[#d3ae8b] text-center mb-12">
          Fortune Sticks
        </h1>
        
        <div className="bg-[#2a3b4f]/50 backdrop-blur-sm rounded-xl p-12 text-center shadow-xl">
          <div className="relative h-64 mb-12">
            {/* Decorative elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-[#d3ae8b]/10 animate-pulse" />
            </div>

            {/* Fortune Tube */}
            <div className="w-28 h-56 bg-gradient-to-b from-[#d3ae8b] to-[#b08e6d] rounded-2xl mx-auto relative overflow-hidden shadow-lg">
              <motion.div
                animate={{ 
                  rotate: isDrawing ? [-2, 2, -2, 2, 0] : 0,
                }}
                transition={{ 
                  duration: 0.3,
                  repeat: isDrawing ? 5 : 0
                }}
                className="w-full h-full relative"
              >
                {/* Multiple sticks in the tube */}
                <div className="absolute inset-2 bg-[#1d2a3a]/20 rounded-xl" />
                {[...Array(24)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bottom-0 bg-gradient-to-b from-[#8b6b4d] to-[#6d513a] rounded-full"
                    style={{
                      width: '2px',
                      height: '90%',
                      left: `${8 + (i * 3.5)}%`,
                      transform: `rotate(${Math.random() * 4 - 2}deg)`,
                      opacity: showStick && i === 12 ? 0 : 1,
                      transition: 'opacity 0.3s ease'
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Drawn Stick */}
            {showStick && (
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: -120 }}
                transition={{ 
                  type: "spring", 
                  damping: 12,
                  stiffness: 100 
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-0.5 h-48 bg-gradient-to-b from-[#8b6b4d] to-[#6d513a] rounded-full shadow-xl"
              />
            )}
          </div>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 p-6 bg-[#1d2a3a]/50 rounded-lg border border-[#d3ae8b]/20"
            >
              <p className="text-2xl text-[#d3ae8b] font-playfair">
                {result}
              </p>
            </motion.div>
          )}

          <Button
            onClick={drawStick}
            disabled={isDrawing}
            className="bg-[#d3ae8b] hover:bg-[#d3ae8b]/90 text-[#1d2a3a] px-8 py-6 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            {isDrawing ? "Drawing Fortune..." : "Draw Your Fortune"}
          </Button>

          <p className="mt-8 text-[#d3ae8b]/60 text-sm max-w-md mx-auto">
            Take a deep breath, clear your mind, and focus on your question before drawing a fortune stick
          </p>
        </div>
      </div>
    </div>
  )
} 


