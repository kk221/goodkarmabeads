export default function Footer() {
  return (
    <footer className="bg-[#1d2a3a] text-[#d3ae8b]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-[#d3ae8b]/80">
              Discover your path to spiritual enlightenment with our daily oracle readings and personalized guidance.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>Email: contact@goodkarmabeads.com</li>
              <li>Follow us on social media</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#d3ae8b]/20 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Good Karma Beads. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}