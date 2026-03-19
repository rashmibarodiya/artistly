"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useSession, signOut } from "next-auth/react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { data: session } = useSession()

  const role = session?.user?.role

  return (
    <header className="w-full px-6 py-4 bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white shadow-lg relative z-50">
      
      <div className="flex justify-between items-center">
        
        <Link href="/" className="text-3xl font-extrabold tracking-wide">
          Artistly
        </Link>

        {/* 🔥 Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* 💻 Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-lg font-medium">
          <Link href="/" className="hover:text-yellow-400 transition">
            Home
          </Link>

          <Link href="/artists" className="hover:text-yellow-400 transition">
            Browse Artists
          </Link>

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

          {role === "USER" && (
            <>
              <Link href="/user/mybookings" className="hover:text-yellow-400 transition">
                My Bookings
              </Link>
              <button onClick={() => signOut()} className="hover:text-red-400">
                Logout
              </button>
            </>
          )}

          {role === "ARTIST" && (
            <>
              <Link href="/dashboard/artist" className="hover:text-yellow-400 transition">
                Dashboard
              </Link>
              <button onClick={() => signOut()} className="hover:text-red-400">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>

      {/* 🔥 MOBILE MENU */}
      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <div className="mx-4 mt-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 space-y-4 shadow-2xl">
          
          <Link onClick={() => setMenuOpen(false)} href="/" className="block hover:text-yellow-400">
            Home
          </Link>

          <Link onClick={() => setMenuOpen(false)} href="/artists" className="block hover:text-yellow-400">
            Browse Artists
          </Link>

          {!session && (
            <>
              <Link onClick={() => setMenuOpen(false)} href="/login" className="block hover:text-yellow-400">
                Login
              </Link>
              <Link onClick={() => setMenuOpen(false)} href="/register" className="block hover:text-yellow-400">
                Register
              </Link>
            </>
          )}

          {role === "USER" && (
            <>
              <Link onClick={() => setMenuOpen(false)} href="/user/mybookings" className="block hover:text-yellow-400">
                My Bookings
              </Link>
              <button
                onClick={() => {
                  signOut()
                  setMenuOpen(false)
                }}
                className="block text-left w-full hover:text-red-400"
              >
                Logout
              </button>
            </>
          )}

          {role === "ARTIST" && (
            <>
              <Link onClick={() => setMenuOpen(false)} href="/dashboard/artist" className="block hover:text-yellow-400">
                Dashboard
              </Link>
              <button
                onClick={() => {
                  signOut()
                  setMenuOpen(false)
                }}
                className="block text-left w-full hover:text-red-400"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}