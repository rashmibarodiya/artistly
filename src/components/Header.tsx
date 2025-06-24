'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react' // optional: install lucide-react for icons

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <header className="w-full px-6 py-4 bg-purple-600 text-white shadow-md">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-wide">
          Artistly
        </Link>

        {/* Hamburger Icon (only visible on mobile) */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex space-x-6 text-xl font-medium">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/artists" className="hover:underline">Browse Artists</Link>
          <Link href="/onboard" className="hover:underline">Onboard Artist</Link>
        </nav>
      </div>

      {/* Navigation Links - Mobile */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col space-y-4 mt-4 text-lg font-medium">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:underline">Home</Link>
          <Link href="/artists" onClick={() => setMenuOpen(false)} className="hover:underline">Browse Artists</Link>
          <Link href="/onboard" onClick={() => setMenuOpen(false)} className="hover:underline">Onboard Artist</Link>
        </nav>
      )}
    </header>
  )
}
