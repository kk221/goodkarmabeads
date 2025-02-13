import { Inter, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'  // Updated import path

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata = {
  title: 'Good Karma Beads',
  description: 'Discover your spiritual path through ancient wisdom and modern guidance',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  )
}