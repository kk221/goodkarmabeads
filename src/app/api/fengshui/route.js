import { NextResponse } from 'next/server'

function calculateLuckyDirections(kuaNumber) {
  // Group 1 (East Life): 1, 3, 4, 9
  // Group 2 (West Life): 2, 5, 6, 7, 8
  const eastLifeGroup = [1, 3, 4, 9]
  
  if (eastLifeGroup.includes(kuaNumber)) {
    return ['east', 'south', 'north', 'southeast']
  } else {
    return ['west', 'northwest', 'southwest', 'northeast']
  }
}

function generateRecommendations(direction, purpose, element) {
  const elements = {
    north: { element: 'Water', colors: ['blue', 'black'], materials: ['glass', 'mirrors'] },
    east: { element: 'Wood', colors: ['green', 'brown'], materials: ['wood', 'plants'] },
    south: { element: 'Fire', colors: ['red', 'orange'], materials: ['candles', 'lighting'] },
    west: { element: 'Metal', colors: ['white', 'metallic'], materials: ['metal', 'stone'] },
    northeast: { element: 'Earth', colors: ['yellow', 'beige'], materials: ['ceramic', 'crystal'] },
    southeast: { element: 'Wood', colors: ['green', 'teal'], materials: ['bamboo', 'flowers'] },
    southwest: { element: 'Earth', colors: ['pink', 'yellow'], materials: ['clay', 'terracotta'] },
    northwest: { element: 'Metal', colors: ['white', 'gold'], materials: ['copper', 'brass'] }
  }

  const directionInfo = elements[direction]

  const recommendations = {
    wealth: [
      `Place a water feature or aquarium in the ${directionInfo.element} area`,
      `Use ${directionInfo.colors.join(' or ')} colored accessories`,
      `Incorporate ${directionInfo.materials.join(' and ')} elements`,
      'Keep this area well-lit and clutter-free'
    ],
    relationships: [
      'Add pairs of items to symbolize partnership',
      `Use ${directionInfo.colors[0]} accents in your bedroom`,
      'Place rose quartz crystals in the southwest corner',
      'Display artwork depicting peaceful scenes'
    ],
    career: [
      'Set up your desk facing your lucky direction',
      `Add ${directionInfo.element}-related items to your workspace`,
      'Keep your goals visible and well-organized',
      'Maintain good lighting in your work area'
    ],
    health: [
      'Ensure good air circulation',
      `Include living plants that thrive in ${directionInfo.element} energy`,
      'Remove any broken items promptly',
      'Keep windows clean and unobstructed'
    ],
    knowledge: [
      'Create a dedicated study or meditation space',
      `Use ${directionInfo.colors.join(' and ')} in your study area`,
      'Place inspiring artwork or quotes on walls',
      'Keep books and learning materials well-organized'
    ]
  }

  return {
    recommendations: recommendations[purpose],
    colors: directionInfo.colors,
    materials: directionInfo.materials,
    element: directionInfo.element
  }
}

export async function POST(req) {
  try {
    const { birthYear, direction, purpose } = await req.json()

    // Calculate Kua number
    const lastTwoDigits = birthYear % 100
    const sum = lastTwoDigits.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0)
    const kuaNumber = (10 - (sum % 9)) % 9 || 9

    // Get Chinese zodiac
    const animals = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"]
    const zodiac = animals[(birthYear - 4) % 12]

    // Get element
    const elements = ["Wood", "Fire", "Earth", "Metal", "Water"]
    const element = elements[Math.floor((birthYear - 4) % 10 / 2)]

    const luckyDirections = calculateLuckyDirections(kuaNumber)
    const { recommendations, colors, materials } = generateRecommendations(direction, purpose, element)

    return NextResponse.json({
      kuaNumber,
      zodiac,
      element,
      luckyDirections,
      colors,
      materials,
      recommendations
    })
  } catch (error) {
    console.error('Feng Shui calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate Feng Shui data' },
      { status: 500 }
    )
  }
} 