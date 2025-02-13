export default function Footer() {
  return (
    <footer className="bg-[#1d2a3a] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-playfair text-[#d3ae8b] mb-4">
              Good Karma Beads
            </h3>
            <p className="text-[#d3ae8b]/80 mb-4 max-w-md">
              Discover your spiritual path through ancient wisdom and modern guidance.
              We offer personalized readings, crystals, and spiritual guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#d3ae8b]/60 hover:text-[#d3ae8b]">
                Instagram
              </a>
              <a href="#" className="text-[#d3ae8b]/60 hover:text-[#d3ae8b]">
                Facebook
              </a>
              <a href="#" className="text-[#d3ae8b]/60 hover:text-[#d3ae8b]">
                Twitter
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-playfair text-[#d3ae8b] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Shop', 'Readings', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase()}`}
                    className="text-[#d3ae8b]/60 hover:text-[#d3ae8b]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-playfair text-[#d3ae8b] mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {[
                'Tarot Readings',
                'Birth Chart Analysis',
                'Crystal Healing',
                'Feng Shui'
              ].map((service) => (
                <li key={service}>
                  <a
                    href={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-[#d3ae8b]/60 hover:text-[#d3ae8b]"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-[#d3ae8b]/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#d3ae8b]/60 text-sm">
              © {new Date().getFullYear()} Good Karma Beads. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-[#d3ae8b]/60 hover:text-[#d3ae8b] text-sm">
                Privacy Policy
              </a>
              <a href="/terms" className="text-[#d3ae8b]/60 hover:text-[#d3ae8b] text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}