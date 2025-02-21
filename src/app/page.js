"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import dynamic from 'next/dynamic'

// Components
import { StarsBackground } from '../components/shared/StarryBackground'
import DailyOracle from '../components/home/DailyOracle'
import DivinationCarousel from '../components/home/DivinationCarousel'
import SubscriptionPlans from "../components/home/SubscriptionPlans"
import Sidebar from "../components/home/Sidebar"
import Footer from "../components/layout/Footer"
import LoadingSpinner from "../components/shared/LoadingSpinner"

// Constants
import { COLORS, ANIMATIONS } from '../constants/theme'

// Dynamically import LayoutWrapper with no SSR
const LayoutWrapper = dynamic(() => import('../components/layout/LayoutWrapper'), {
  ssr: false,
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Head>
        <title>Good Karma Beads | Spiritual Guidance & Divination</title>
        <meta name="description" content="Discover spiritual guidance through ancient wisdom and modern insights at Good Karma Beads." />
      </Head>

      <div className="flex min-h-screen relative">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-secondary rounded-md text-accent hover:bg-secondary/80 transition-colors"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? "✕" : "☰"}
        </button>

        {/* Sidebar with animation */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 h-full z-40"
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <motion.main
              className={`relative flex-1 min-h-screen bg-primary text-white overflow-hidden transition-all duration-300 ${
                isSidebarOpen ? 'pl-64' : 'pl-0'
              }`}
            >
              <StarsBackground />
              
              {/* Daily Oracle Section */}
              <motion.section className="py-20 bg-secondary/50">
                <div className="container mx-auto px-4">
                  <h1 className="text-4xl md:text-5xl font-playfair text-accent text-center mb-12">
                    Daily Oracle
                  </h1>
                  <DailyOracle />
                </div>
              </motion.section>

              {/* Divination Carousel */}
              <motion.section className="py-20">
                <div className="container mx-auto px-4">
                  <h2 className="text-3xl md:text-4xl font-playfair text-accent text-center mb-12">
                    Featured Readings
                  </h2>
                  <DivinationCarousel />
                </div>
              </motion.section>

              {/* Subscription Section */}
              <motion.section className="py-20 bg-secondary/50">
                <div className="container mx-auto px-4 max-w-4xl">
                  <SubscriptionPlans />
                </div>
              </motion.section>

              <Footer />
            </motion.main>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}