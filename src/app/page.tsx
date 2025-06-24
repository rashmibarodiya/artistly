'use client'

import Categories from '@/components/Categories'
import Link from 'next/link'


export default function HomePage() {
  return (
    <section className="space-y-10 mt-16">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold">Connect with Top Performing Artists</h1>
        <p className="mt-4 text-2xl text-gray-600">
          Discover, shortlist, and book your perfect performer.
        </p>
        <Link
          href="/artists"
          className="m-6 inline-block bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition"
        >
          Explore Artists
        </Link>

        <Categories/>
      </div>

     
    </section>
  )
}
