"use client"

import { useState } from "react"
import html2canvas from "html2canvas"
import { zodiacSigns } from "../shared/ZodiacSigns"
/**
 * @typedef {import("/src/components/home/DailyOracle").DailyFortune} DailyFortune
 */
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog.tsx"
import { Button } from "../ui/button.tsx"
import { Download, Share2 } from "lucide-react"

/**
 * @typedef {Object} FortuneCardProps
 * @property {import("../../lib/utils/zodiac-data").DailyFortune} fortune
 * @property {string} selectedSign
 * @property {() => void} onClose
 * @property {boolean} isOpen
 */

/**
 * @param {FortuneCardProps} props
 */
export function FortuneCard({ fortune, selectedSign, onClose }) {
  if (!fortune) return null;

  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [error, setError] = useState(null)

  const selectedZodiac = zodiacSigns.find(z => z.sign === selectedSign)

  const handleDownload = async () => {
    try {
      const element = document.getElementById('fortune-card')
      const canvas = await html2canvas(element)
      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `${selectedSign}-horoscope.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      setError('Failed to download horoscope')
    }
  }

  const shareReading = async () => {
    const shareText = `
🌟 My Daily Oracle Reading for ${fortune.zodiacInfluence}

✨ Zodiac Energies:
${fortune.positiveEnergies.join("\n")}

👁️ Daily Guidance:
${Array.isArray(fortune.awareness) ? fortune.awareness.join("\n") : fortune.awareness}

🎯 Lucky Elements:
Number: ${fortune.lucky.number}
Time: ${fortune.lucky.time}
Color: ${fortune.lucky.color}

Get your reading at https://goodkarmabeads.com/
    `.trim()

    try {
      if (navigator.share) {
        await navigator.share({
          title: "My Daily Oracle Reading",
          text: shareText,
        })
      } else {
        await navigator.clipboard.writeText(shareText)
        alert("Reading copied to clipboard!")
      }
    } catch (error) {
      console.error("Error sharing:", error)
      try {
        await navigator.clipboard.writeText(shareText)
        alert("Reading copied to clipboard!")
      } catch (clipboardError) {
        console.error("Error copying to clipboard:", clipboardError)
        setError("Unable to share reading. Please try again.")
      }
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-[#1d2a3a] border-[#d3ae8b] text-[#d3ae8b] modal-animation sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-center flex items-center justify-center gap-2 text-[#d3ae8b]">
            <span className="text-3xl">{selectedZodiac?.symbol}</span>
            <span>{selectedZodiac?.name} Horoscope</span>
          </DialogTitle>
          <p className="text-center text-[#d3ae8b] text-sm">
            {fortune.date}
          </p>
        </DialogHeader>

        <div id="fortune-card" className="space-y-6 p-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#d3ae8b]">Daily Horoscope</h3>
            <p className="text-[#d3ae8b]">{fortune.zodiacInfluence}</p>
          </div>

          {fortune.positiveEnergies?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#d3ae8b]">Key Themes</h3>
              <div className="flex flex-wrap gap-2">
                {fortune.positiveEnergies.map((energy, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-transparent border border-[#d3ae8b] text-[#d3ae8b] rounded-full text-sm capitalize"
                  >
                    {energy}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#d3ae8b]">Focus Point</h3>
            <p className="text-[#d3ae8b]">{fortune.awareness}</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={handleDownload}
            className="bg-transparent text-[#d3ae8b] hover:bg-transparent border-[#d3ae8b]"
            variant="outline"
          >
            <Download size={16} className="mr-2" />
            Download
          </Button>
          <Button
            onClick={() => setIsShareModalOpen(true)}
            className="bg-transparent text-[#d3ae8b] hover:bg-transparent border-[#d3ae8b]"
            variant="outline"
          >
            <Share2 size={16} className="mr-2" />
            Share
          </Button>
        </div>

        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}
      </DialogContent>
    </Dialog>
  )
}

