'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full px-6 py-4 bg-purple-600 text-white shadow-md flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold tracking-wide">
        Artistly
      </Link>
      <nav className="space-x-4">
        <Link href="/" className="hover:underline font-semibold text-xl">
         Home
        </Link>
        <Link href="/artists" className="hover:underline font-semibold text-xl">
          Browse Artists
        </Link>
        <Link href="/onboard" className="hover:underline text-xl">
          Onboard Artist
        </Link>
        
      </nav>
    </header>
  )
}
