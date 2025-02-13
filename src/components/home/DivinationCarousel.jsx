'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const readings = [
  {
    id: 1,
    title: 'Tarot Reading',
    description: 'Discover insights through ancient tarot wisdom',
    image: '/images/tarot-reading.svg',
    price: 49.99
  },
  {
    id: 2,
    title: 'Birth Chart Analysis',
    description: 'Understand your celestial blueprint',
    image: '/images/birth-chart.svg',
    price: 79.99
  },
  {
    id: 3,
    title: 'Feng Shui Consultation',
    description: 'Harmonize your space and energy',
    image: '/images/feng-shui.svg',
    price: 89.99
  },
  {
    id: 4,
    title: 'Zodiac Compatibility',
    description: 'Explore relationship dynamics',
    image: '/images/daily-zodiac.svg',
    price: 59.99
  }
]

export default function DivinationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => (
      (prevIndex + newDirection + readings.length) % readings.length
    ))
  }

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
          className="absolute w-full h-full"
        >
          <div className="relative h-full w-full">
            <Image
              src={readings[currentIndex].image}
              alt={readings[currentIndex].title}
              fill
              className="object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl">
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-3xl font-playfair text-white mb-2">
                  {readings[currentIndex].title}
                </h3>
                <p className="text-white/80 mb-4">
                  {readings[currentIndex].description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-[#d3ae8b] text-[#1d2a3a] rounded-lg font-semibold"
                >
                  Book Now - ${readings[currentIndex].price}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {readings.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-[#d3ae8b]' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
        onClick={() => paginate(-1)}
      >
        ←
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
        onClick={() => paginate(1)}
      >
        →
      </button>
    </div>
  )
}