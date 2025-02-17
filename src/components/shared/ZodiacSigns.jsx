"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "/src/components/ui/card"
import { zodiacSigns } from '../../lib/utils/zodiac-data'

export default function ZodiacSigns() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {zodiacSigns.map((sign, index) => (
        <motion.div
          key={sign.sign}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <CardHeader className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 transform group-hover:scale-105 transition-transform duration-300" />
              <div className="relative">
                <CardTitle className="text-3xl flex items-center gap-2">
                  {sign.symbol} {sign.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{sign.date}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{sign.description}</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">Element:</span>
                <span className="text-primary">{sign.element}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

