import { Inter } from "next/font/google"
import "/src/styles/globals.css"
import { Providers } from "/src/components/providers"  // Update this import path



const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Good Karma Beads",
  description:
    "Discover your cosmic journey with personalized zodiac, horoscope, tarot, birth-chart, and feng-shui readings.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}