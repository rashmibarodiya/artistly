"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useSession, signOut } from "next-auth/react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const role = session?.user?.role

  return (
    <header className="w-full px-6 py-4 bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white shadow-lg">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-3xl font-extrabold tracking-wide">
          Artistly
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-lg font-medium">
          
          <Link href="/" className="hover:text-yellow-400 transition">
            Home
          </Link>

          <Link href="/artists" className="hover:text-yellow-400 transition">
            Browse Artists
          </Link>

          {/* 🔐 Not Logged In */}
          {!session && (
            <>
              <Link href="/login" className="hover:text-yellow-400 transition">
                Login
              </Link>
              <Link href="/register" className="hover:text-yellow-400 transition">
                Register
              </Link>
            </>
          )}

          {/* 👤 USER */}
          {role === "USER" && (
            <>
              <Link href="/dashboard/user" className="hover:text-yellow-400 transition">
                My Bookings
              </Link>
              <button
                onClick={() => signOut()}
                className="hover:text-red-400 transition"
              >
                Logout
              </button>
            </>
          )}

          {/* 🎤 ARTIST */}
          {role === "ARTIST" && (
            <>
              <Link href="/dashboard/artist" className="hover:text-yellow-400 transition">
                Artist Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="hover:text-red-400 transition"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}