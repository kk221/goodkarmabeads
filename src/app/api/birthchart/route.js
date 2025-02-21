import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { datetime, name } = await req.json()
    if (!datetime) {
      return NextResponse.json(
        { error: 'Datetime is required' },
        { status: 400 }
      )
    }

    const birthDate = new Date(datetime)
    if (isNaN(birthDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid datetime format' },
        { status: 400 }
      )
    }
    
    // Get Western zodiac (sun sign)
    const sunSign = getZodiacSign(birthDate)
    
    try {
      // Get daily horoscope from Aztro API
      const response = await fetch(
        `https://aztro.sameerkumar.website/?sign=${sunSign.toLowerCase()}&day=today`,
        { method: 'POST' }
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch horoscope data')
      }
      
      const aztroData = await response.json()
      
      // Get Chinese zodiac
      const chineseSign = getChineseZodiac(birthDate)

      return NextResponse.json({
        planets: {
          sun: {
            sign: sunSign,
            house: getHouse(birthDate),
            interpretation: aztroData.description || 'Your sun sign represents your core personality',
            compatibility: aztroData.compatibility,
            luckyNumber: aztroData.lucky_number,
            luckyTime: aztroData.lucky_time,
            color: aztroData.color,
            mood: aztroData.mood
          },
          moon: {
            sign: getMoonSign(birthDate),
            interpretation: getMoonInterpretation(getMoonSign(birthDate))
          }
        },
        chinese: {
          sign: chineseSign,
          element: getChineseElement(birthDate),
          interpretation: getChineseInterpretation(chineseSign)
        },
        ascendant: {
          sign: getAscendant(birthDate),
          interpretation: getAscendantInterpretation(getAscendant(birthDate))
        }
      })
    } catch (apiError) {
      console.error('API call error:', apiError)
      // Fallback response if API call fails
      return NextResponse.json({
        planets: {
          sun: {
            sign: sunSign,
            house: getHouse(birthDate),
            interpretation: `As a ${sunSign}, you embody the core traits of your sign.`
          },
          moon: {
            sign: getMoonSign(birthDate),
            interpretation: getMoonInterpretation(getMoonSign(birthDate))
          }
        },
        chinese: {
          sign: getChineseZodiac(birthDate),
          element: getChineseElement(birthDate),
          interpretation: getChineseInterpretation(getChineseZodiac(birthDate))
        },
        ascendant: {
          sign: getAscendant(birthDate),
          interpretation: getAscendantInterpretation(getAscendant(birthDate))
        }
      })
    }
  } catch (error) {
    console.error('Birth chart calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate birth chart: ' + error.message },
      { status: 500 }
    )
  }
}

function getZodiacSign(date) {
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries"
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus"
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini"
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer"
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo"
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo"
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra"
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio"
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius"
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn"
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius"
  return "Pisces"
}

function getChineseZodiac(date) {
  const year = date.getFullYear()
  const animals = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"]
  return animals[(year - 4) % 12]
}

function getChineseElement(date) {
  const year = date.getFullYear()
  const elements = ["Wood", "Fire", "Earth", "Metal", "Water"]
  return elements[Math.floor((year - 4) % 10 / 2)]
}

function getMoonSign(date) {
  const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
                 "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
  return signs[date.getDate() % 12]
}

function getHouse(date) {
  return (date.getHours() % 12) + 1
}

function getAscendant(date) {
  const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
                 "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
  return signs[date.getHours() % 12]
}

function getMoonInterpretation(sign) {
  const interpretations = {
    Aries: "Your emotions are passionate and impulsive",
    Taurus: "You find emotional security in stability and comfort",
    Gemini: "Your emotions are adaptable and intellectually driven",
    Cancer: "You have deep emotional sensitivity and nurturing instincts",
    Leo: "Your emotions are warm, generous, and dramatic",
    Virgo: "You process emotions through practical analysis",
    Libra: "Your emotional nature seeks harmony and balance",
    Scorpio: "Your emotions are intense and transformative",
    Sagittarius: "Your emotions are optimistic and freedom-loving",
    Capricorn: "You approach emotions with practicality and restraint",
    Aquarius: "Your emotional nature is unique and humanitarian",
    Pisces: "Your emotions are deeply intuitive and compassionate"
  }
  return interpretations[sign] || "Your emotional nature is complex and deep"
}

function getChineseInterpretation(sign) {
  const interpretations = {
    Rat: "Clever, quick-witted, and resourceful",
    Ox: "Diligent, dependable, and determined",
    Tiger: "Brave, confident, and unpredictable",
    Rabbit: "Gentle, elegant, and alert",
    Dragon: "Energetic, fearless, and charismatic",
    Snake: "Wise, enigmatic, and graceful",
    Horse: "Energetic, independent, and adventurous",
    Goat: "Creative, gentle, and peace-loving",
    Monkey: "Clever, innovative, and versatile",
    Rooster: "Observant, hardworking, and courageous",
    Dog: "Loyal, honest, and friendly",
    Pig: "Compassionate, generous, and diligent"
  }
  return interpretations[sign] || "Your Chinese zodiac reveals deep wisdom"
}

function getAscendantInterpretation(sign) {
  const interpretations = {
    Aries: "You appear confident and energetic to others",
    Taurus: "Others see you as reliable and grounded",
    Gemini: "You come across as adaptable and communicative",
    Cancer: "People see you as nurturing and protective",
    Leo: "You appear charismatic and confident",
    Virgo: "Others perceive you as practical and analytical",
    Libra: "You come across as diplomatic and charming",
    Scorpio: "People see you as mysterious and intense",
    Sagittarius: "You appear optimistic and adventurous",
    Capricorn: "Others see you as responsible and ambitious",
    Aquarius: "You come across as unique and progressive",
    Pisces: "People see you as intuitive and compassionate"
  }
  return interpretations[sign] || "Your rising sign shapes how others see you"
} 