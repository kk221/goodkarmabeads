'use client'

import { motion } from 'framer-motion'

const zodiacSigns = [
  { name: 'Aries', dates: 'Mar 21 - Apr 19', element: 'Fire', symbol: '♈' },
  { name: 'Taurus', dates: 'Apr 20 - May 20', element: 'Earth', symbol: '♉' },
  { name: 'Gemini', dates: 'May 21 - Jun 20', element: 'Air', symbol: '♊' },
  { name: 'Cancer', dates: 'Jun 21 - Jul 22', element: 'Water', symbol: '♋' },
  { name: 'Leo', dates: 'Jul 23 - Aug 22', element: 'Fire', symbol: '♌' },
  { name: 'Virgo', dates: 'Aug 23 - Sep 22', element: 'Earth', symbol: '♍' },
  { name: 'Libra', dates: 'Sep 23 - Oct 22', element: 'Air', symbol: '♎' },
  { name: 'Scorpio', dates: 'Oct 23 - Nov 21', element: 'Water', symbol: '♏' },
  { name: 'Sagittarius', dates: 'Nov 22 - Dec 21', element: 'Fire', symbol: '♐' },
  { name: 'Capricorn', dates: 'Dec 22 - Jan 19', element: 'Earth', symbol: '♑' },
  { name: 'Aquarius', dates: 'Jan 20 - Feb 18', element: 'Air', symbol: '♒' },
  { name: 'Pisces', dates: 'Feb 19 - Mar 20', element: 'Water', symbol: '♓' }
]

export default function ZodiacSigns() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {zodiacSigns.map((sign, index) => (
        <motion.div
          key={sign.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-[#2a3b4f] rounded-xl p-6 text-center"
        >
          <div className="text-4xl mb-4">{sign.symbol}</div>
          <h3 className="text-xl font-playfair text-[#d3ae8b] mb-2">
            {sign.name}
          </h3>
          <p className="text-[#d3ae8b]/60 text-sm mb-2">{sign.dates}</p>
          <p className="text-[#d3ae8b]/80">Element: {sign.element}</p>
        </motion.div>
      ))}
    </div>
  )
}