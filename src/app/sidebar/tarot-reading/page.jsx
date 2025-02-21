'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "../../../components/ui/button"

export default function TarotReading() {
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawnCards, setDrawnCards] = useState([])
  const [showMeaning, setShowMeaning] = useState(false)
  const [flippedCards, setFlippedCards] = useState([false, false, false])

  const tarotCards = [
    {
      name: "The Fool",
      meaning: "New beginnings, spontaneity, faith",
      desc: "A new journey begins, take that leap of faith",
      image_url: "https://www.trustedtarot.com/img/cards/the-fool.png"
    },
    {
      name: "The Magician",
      meaning: "Manifestation, power, action",
      desc: "You have all the tools you need to succeed",
      image_url: "https://www.trustedtarot.com/img/cards/the-magician.png"
    },
    {
      name: "The High Priestess",
      meaning: "Intuition, mystery, inner voice",
      desc: "Trust your intuition and inner wisdom",
      image_url: "https://www.trustedtarot.com/img/cards/the-high-priestess.png"
    },
    {
      name: "The Empress",
      meaning: "Abundance, nurturing, fertility",
      desc: "Embrace your creative and nurturing nature",
      image_url: "https://www.trustedtarot.com/img/cards/the-empress.png"
    },
    {
      name: "The Emperor",
      meaning: "Authority, structure, leadership",
      desc: "Take charge and establish order in your life",
      image_url: "https://www.trustedtarot.com/img/cards/the-emperor.png"
    },
    {
      name: "The Hierophant",
      meaning: "Tradition, spirituality, guidance",
      desc: "Seek wisdom from spiritual or traditional sources",
      image_url: "https://www.trustedtarot.com/img/cards/the-hierophant.png"
    },
    {
      name: "The Lovers",
      meaning: "Love, harmony, choices",
      desc: "A significant choice or relationship awaits",
      image_url: "https://www.trustedtarot.com/img/cards/the-lovers.png"
    },
    {
      name: "The Chariot",
      meaning: "Determination, willpower, success",
      desc: "Victory through determination and self-control",
      image_url: "https://www.trustedtarot.com/img/cards/the-chariot.png"
    },
    {
      name: "Strength",
      meaning: "Inner strength, courage, patience",
      desc: "Your inner strength will guide you through",
      image_url: "https://www.trustedtarot.com/img/cards/strength.png"
    },
    {
      name: "The Hermit",
      meaning: "Introspection, solitude, guidance",
      desc: "Take time for self-reflection and inner guidance",
      image_url: "https://www.trustedtarot.com/img/cards/the-hermit.png"
    }
  ]

  const handleCardClick = (index) => {
    if (!isDrawing && drawnCards[index]) {
      const newFlippedCards = [...flippedCards]
      newFlippedCards[index] = !newFlippedCards[index]
      setFlippedCards(newFlippedCards)
    }
  }

  const generateReading = (cards) => {
    return `Your reading reveals: In the past, ${cards[0].name} - ${cards[0].desc}. 
    Currently, ${cards[1].name} - ${cards[1].desc}. 
    For your future, ${cards[2].name} - ${cards[2].desc}.`
  }

  const drawCards = () => {
    setIsDrawing(true)
    setDrawnCards([])
    setShowMeaning(false)
    setFlippedCards([false, false, false])
    
    setTimeout(() => {
      const shuffled = [...tarotCards].sort(() => Math.random() - 0.5)
      const selected = shuffled.slice(0, 3)
      setDrawnCards(selected)
      
      setTimeout(() => {
        setFlippedCards([true, true, true])
        setShowMeaning(true)
        setIsDrawing(false)
      }, 2500)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#1d2a3a] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-playfair text-[#d3ae8b] text-center mb-12">
          Mystic Tarot Journey
        </h1>
        
        <div className="bg-[#2a3b4f]/50 backdrop-blur-sm rounded-xl p-12 text-center shadow-xl">
          <div className="flex justify-center gap-8 mb-12">
            {[0, 1, 2].map((index) => (
              <div key={index} className="relative">
                <p className="text-[#d3ae8b] mb-4">
                  {index === 0 ? "Past" : index === 1 ? "Present" : "Future"}
                </p>
                <motion.div
                  onClick={() => handleCardClick(index)}
                  initial={false}
                  animate={{ 
                    rotateY: flippedCards[index] ? 180 : 0,
                    scale: isDrawing ? 1.05 : 1
                  }}
                  transition={{ 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 50,
                    damping: 20
                  }}
                  className="w-48 h-72 relative cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Card Front (Back design) */}
                  <div 
                    className="absolute w-full h-full rounded-xl bg-gradient-to-br from-[#d3ae8b] to-[#b08e6d] shadow-xl border-2 border-[#d3ae8b]/20"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="w-full h-full rounded-lg bg-[#1d2a3a]/10 backdrop-blur-sm p-1">
                      <div className="w-full h-full rounded-lg border border-[#d3ae8b]/20 flex items-center justify-center">
                        <div className="text-4xl text-[#d3ae8b]/20">✦</div>
                      </div>
                    </div>
                  </div>

                  {/* Card Back (Content) */}
                  {drawnCards[index] && (
                    <div 
                      className="absolute w-full h-full rounded-xl bg-gradient-to-br from-[#2a3b4f] to-[#1d2a3a] shadow-xl border-2 border-[#d3ae8b]/20 p-4 flex flex-col items-center justify-between"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <h3 className="text-xl font-playfair text-[#d3ae8b]">
                        {drawnCards[index].name}
                      </h3>
                      <img 
                        src={drawnCards[index].image_url} 
                        alt={drawnCards[index].name}
                        className="w-32 h-auto my-2"
                      />
                      <p className="text-sm text-[#d3ae8b]/80">
                        {drawnCards[index].meaning}
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>

          {showMeaning && drawnCards.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12 p-6 bg-[#1d2a3a]/50 rounded-lg border border-[#d3ae8b]/20"
            >
              <p className="text-lg text-[#d3ae8b] leading-relaxed">
                {generateReading(drawnCards)}
              </p>
            </motion.div>
          )}

          <Button
            onClick={drawCards}
            disabled={isDrawing}
            className="bg-[#d3ae8b] hover:bg-[#d3ae8b]/90 text-[#1d2a3a] px-8 py-6 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            {isDrawing ? "Drawing Cards..." : "Draw Your Cards"}
          </Button>

          <p className="mt-8 text-[#d3ae8b]/60 text-sm max-w-md mx-auto">
            Clear your mind and focus on your question before drawing the cards
          </p>
        </div>
      </div>
    </div>
  )
} 