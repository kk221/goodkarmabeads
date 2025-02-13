import Navbar from '@/components/layout/Navbar'
import StarryBackground from '@/components/shared/StarryBackground'
import HeroSection from '@/components/home/HeroSection'
import DailyOracle from '@/components/home/DailyOracle'
import DivinationCarousel from '@/components/home/DivinationCarousel'
import SubscriptionPlans from '@/components/home/SubscriptionPlans'

export default function Home() {
  return (
    <>
      <StarryBackground />
      <Navbar />
      
      <main className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Daily Oracle Reading */}
        <section className="min-h-screen flex items-center justify-center">
          <DailyOracle />
        </section>

        {/* Divination Methods */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-playfair text-[#d3ae8b] text-center mb-12">
              Explore Your Spiritual Journey
            </h2>
            <DivinationCarousel />
          </div>
        </section>

        {/* Subscription Plans */}
        <section className="py-20 bg-gradient-to-b from-transparent to-[#1d2a3a]">
          <SubscriptionPlans />
        </section>
      </main>
    </>
  )
}