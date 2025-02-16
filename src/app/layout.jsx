import { Inter } from "next/font/google"
import '@/styles/globals.css'  // assuming it's in src/styles/
import { ThemeProvider } from "@/components/theme-provider"


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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

