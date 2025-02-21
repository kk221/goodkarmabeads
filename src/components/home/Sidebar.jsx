'use client'

import Link from "next/link"
import { Button } from "../../components/ui/button"
import { 
  MdCasino,
  MdStyle,
  MdStars,
  MdExplore,
  MdNightsStay
} from 'react-icons/md'

export default function Sidebar() {
  const navigationLinks = [
    { title: 'LUCKY DRAW', href: '/sidebar/lucky-draw', icon: <MdCasino className="mr-2 h-4 w-4" /> },
    { title: 'TAROT READING', href: '/sidebar/tarot-reading', icon: <MdStyle className="mr-2 h-4 w-4" /> },
    { title: 'BIRTH CHART', href: '/sidebar/birth-chart', icon: <MdStars className="mr-2 h-4 w-4" /> },
    { title: 'FENG SHUI', href: '/sidebar/feng-shui', icon: <MdExplore className="mr-2 h-4 w-4" /> },
    { title: 'SPIRIT REALM', href: '/sidebar/spirit-realm', icon: <MdNightsStay className="mr-2 h-4 w-4" /> }
  ]

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#2a3b4f] p-6 space-y-4">
      <nav className="space-y-2">
        {navigationLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href}
            prefetch={false}
          >
            <Button
              variant="ghost"
              className="w-full justify-start text-[#d3ae8b] hover:bg-[#1d2a3a] hover:text-[#d3ae8b]"
            >
              {link.icon}
              {link.title}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  )
} 