'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

import StarryBackground from '/src/components/shared/StarryBackground'
import DailyOracle from '/src/components/home/DailyOracle'
import DivinationCarousel from '/src/components/home/DivinationCarousel'
import NewsletterForm from '/src/components/newsletter/NewsletterForm'


export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#1d2a3a] text-white overflow-hidden">
      {/* Background */}
      <StarryBackground />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-playfair text-[#d3ae8b] mb-6">
            Good Karma Beads
          </h1>
          <p className="text-xl md:text-2xl text-[#d3ae8b]/80 max-w-2xl mx-auto mb-8">
            Discover your spiritual path through ancient wisdom and modern guidance
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-[#d3ae8b] text-[#1d2a3a] rounded-lg font-semibold text-lg"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </section>

      {/* Navigation Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-playfair text-[#d3ae8b] text-center mb-12">
            Explore Your Path
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Zodiac', icon: '♈', path: '/zodiac' },
              { title: 'Horoscope', icon: '🌟', path: '/horoscope' },
              { title: 'Tarot', icon: '🎴', path: '/tarot' },
              { title: 'Birth Chart', icon: '📊', path: '/birth-chart' },
              { title: 'Feng Shui', icon: '☯️', path: '/feng-shui' },
              { title: 'Shop', icon: '🛍️', path: '/shop' },
            ].map((item) => (
              <motion.a
                key={item.title}
                href={item.path}
                whileHover={{ y: -5 }}
                className="block p-6 bg-[#2a3b4f] rounded-xl text-center hover:bg-[#2a3b4f]/80 transition-colors"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-playfair text-[#d3ae8b]">
                  {item.title}
                </h3>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Oracle Section */}
      <section className="py-20 bg-[#2a3b4f]/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-playfair text-[#d3ae8b] text-center mb-12">
            Daily Oracle
          </h2>
          <DailyOracle />
        </div>
      </section>

      {/* Divination Carousel */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-playfair text-[#d3ae8b] text-center mb-12">
            Featured Readings
          </h2>
          <DivinationCarousel />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-[#2a3b4f]/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-playfair text-[#d3ae8b] text-center mb-12">
            Join Our Spiritual Community
          </h2>
          <NewsletterForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#1d2a3a]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-playfair text-[#d3ae8b] mb-4">
                About Us
              </h3>
              <p className="text-[#d3ae8b]/80">
                Guiding you through life's journey with ancient wisdom and modern insights.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-playfair text-[#d3ae8b] mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-[#d3ae8b]/80">
                <li><a href="/about" className="hover:text-[#d3ae8b]">About</a></li>
                <li><a href="/services" className="hover:text-[#d3ae8b]">Services</a></li>
                <li><a href="/contact" className="hover:text-[#d3ae8b]">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-playfair text-[#d3ae8b] mb-4">
                Connect
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="text-[#d3ae8b]/80 hover:text-[#d3ae8b]">
                  Instagram
                </a>
                <a href="#" className="text-[#d3ae8b]/80 hover:text-[#d3ae8b]">
                  Facebook
                </a>
                <a href="#" className="text-[#d3ae8b]/80 hover:text-[#d3ae8b]">
                  Twitter
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#d3ae8b]/20 text-center text-[#d3ae8b]/60">
            <p>&copy; {new Date().getFullYear()} Good Karma Beads. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}