'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  const starFieldRef = useRef(null)

  useEffect(() => {
    const starField = starFieldRef.current
    if (!starField) return

    // Create animated star background
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div')
      star.className = 'star'
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`
      star.style.animationDelay = `${Math.random() * 3}s`
      starField.appendChild(star)
    }
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div
        ref={starFieldRef}
        className="absolute inset-0 bg-[#1d2a3a]"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-playfair text-[#d3ae8b] mb-6">
            Good Karma Beads
          </h1>
          <p className="text-xl md:text-2xl text-[#d3ae8b]/80 mb-8 max-w-2xl mx-auto">
            Discover your spiritual path through ancient wisdom and modern guidance
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-[#d3ae8b] text-[#1d2a3a] rounded-lg font-semibold text-lg"
            >
              Start Your Journey
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-[#d3ae8b] text-[#d3ae8b] rounded-lg font-semibold text-lg hover:bg-[#d3ae8b] hover:text-[#1d2a3a] transition-colors"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#d3ae8b]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#d3ae8b]/5 rounded-full blur-3xl" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-[#d3ae8b]/30 rounded-full p-1">
          <div className="w-1.5 h-1.5 bg-[#d3ae8b] rounded-full animate-bounce mx-auto" />
        </div>
      </motion.div>
    </section>
  )
}