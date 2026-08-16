"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useSession, signOut } from "next-auth/react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { data: session } = useSession()

  const role = session?.user?.role

  const navLink =
    "relative pb-1 hover:text-marquee-amber transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-0 after:bg-marquee-amber after:transition-all after:duration-300 hover:after:w-full"

  const mobileLink =
    "block text-marquee-cream hover:text-marquee-amber transition-colors"

  return (
    <header className="w-full h-20 px-6 flex items-center bg-marquee-bg border-b border-marquee-plum/50 text-marquee-cream relative z-50">

      <div className="flex justify-between items-center w-full">

        <Link
          href="/"
          className="font-display text-3xl tracking-wide text-marquee-cream hover:text-marquee-amber transition-colors"
          style={{ textShadow: "0 0 12px rgba(232,163,61,0.25)" }}
        >
          Artistly
        </Link>

        <button
          className="md:hidden text-marquee-cream hover:text-marquee-amber transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium">
          <Link href="/" className={navLink}>Home</Link>
          <Link href="/artists" className={navLink}>Browse Artists</Link>

          {!session && (
            <>
              <Link href="/login" className={navLink}>Login</Link>
              <Link
                href="/register"
                className="bg-marquee-amber text-marquee-bg px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
              >
                Register
              </Link>
            </>
          )}

          {role === "USER" && (
            <>
              <Link href="/user/mybookings" className={navLink}>Bookings</Link>
              <button onClick={() => signOut()} className="text-marquee-cream/60 hover:text-marquee-velvet transition-colors">
                Logout
              </button>
            </>
          )}

          {role === "ARTIST" && (
            <>
              <Link href="/dashboard/artist" className={navLink}>Dashboard</Link>
              <button onClick={() => signOut()} className="text-marquee-cream/60 hover:text-marquee-velvet transition-colors">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <div className="ticket mx-4 mt-4 p-6 space-y-4 shadow-2xl">
          <Link onClick={() => setMenuOpen(false)} href="/" className={mobileLink}>Home</Link>
          <Link onClick={() => setMenuOpen(false)} href="/artists" className={mobileLink}>Browse Artists</Link>

          {!session && (
            <>
              <Link onClick={() => setMenuOpen(false)} href="/login" className={mobileLink}>Login</Link>
              <Link
                onClick={() => setMenuOpen(false)}
                href="/register"
                className="block w-fit bg-marquee-amber text-marquee-bg px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
              >
                Register
              </Link>
            </>
          )}

          {role === "USER" && (
            <>
              <Link onClick={() => setMenuOpen(false)} href="/user/mybookings" className={mobileLink}>Bookings</Link>
              <button onClick={() => { signOut(); setMenuOpen(false); }} className="block text-left w-full text-marquee-cream/60 hover:text-marquee-velvet transition-colors">
                Logout
              </button>
            </>
          )}

          {role === "ARTIST" && (
            <>
              <Link onClick={() => setMenuOpen(false)} href="/dashboard/artist" className={mobileLink}>Dashboard</Link>
              <button onClick={() => { signOut(); setMenuOpen(false); }} className="block text-left w-full text-marquee-cream/60 hover:text-marquee-velvet transition-colors">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}