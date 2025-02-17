export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const sign = searchParams.get('sign')

  if (!sign) {
    return new Response(JSON.stringify({ error: 'Zodiac sign is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  try {
    const response = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign.toLowerCase()}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch horoscope from API')
    }

    const apiData = await response.json()
    
    // Transform the API response with all available data
    const fortune = {
      date: apiData.data.date,
      zodiacInfluence: apiData.data.horoscope_data,
      status: apiData.status,
      success: apiData.success,
      positiveEnergies: extractKeywords(apiData.data.horoscope_data), // Extract keywords from horoscope text
      awareness: generateAwareness(apiData.data.horoscope_data) // Generate a short awareness message
    }

    return new Response(JSON.stringify(fortune), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })

  } catch (error) {
    console.error('API Error:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch horoscope' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

// Helper function to extract keywords from horoscope text
function extractKeywords(text) {
  const keywords = text.match(/\b(love|career|money|health|relationship|work|energy|success|opportunity|challenge)\b/gi) || []
  return [...new Set(keywords)].slice(0, 3) // Get unique keywords, max 3
}

// Helper function to generate a short awareness message
function generateAwareness(text) {
  // Get the first sentence as awareness message
  const firstSentence = text.split('.')[0] + '.'
  return firstSentence
} 