'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const { data: session } = useSession()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { title: 'Zodiac', path: '/zodiac' },
    { title: 'Horoscope', path: '/horoscope' },
    { title: 'Tarot', path: '/tarot' },
    { title: 'Birth Chart', path: '/birth-chart' },
    { title: 'Feng Shui', path: '/fengshui' },
    { title: 'Shop', path: '/shop' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#1d2a3a]/95 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="Good Karma Beads"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="ml-2 text-[#d3ae8b] font-playfair">Good Karma Beads</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-[#d3ae8b] hover:text-white transition-colors"
              >
                {item.title}
              </Link>
            ))}
            
            {session ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-[#d3ae8b] hover:text-white">
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 rounded-lg border border-[#d3ae8b] text-[#d3ae8b] hover:bg-[#d3ae8b] hover:text-[#1d2a3a] transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="px-4 py-2 rounded-lg bg-[#d3ae8b] text-[#1d2a3a] hover:bg-[#d3ae8b]/90 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#d3ae8b]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '×' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#1d2a3a] border-t border-[#d3ae8b]/20"
          >
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="block py-3 text-[#d3ae8b] hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block py-3 text-[#d3ae8b] hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full mt-4 px-4 py-2 rounded-lg border border-[#d3ae8b] text-[#d3ae8b] hover:bg-[#d3ae8b] hover:text-[#1d2a3a] transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    signIn()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full mt-4 px-4 py-2 rounded-lg bg-[#d3ae8b] text-[#1d2a3a] hover:bg-[#d3ae8b]/90 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}