'use client'

import { useEffect, useState } from 'react'
import ArtistCard from '../../components/ArtistsCard'
import { ArtistFormData } from '@/types/artist'

export default function ArtistListingPage() {
  const [artists, setArtists] = useState<ArtistFormData[]>([])
  const [filtered, setFiltered] = useState<ArtistFormData[]>([])
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    priceRange: ''
  })

  // Load JSON on mount
  useEffect(() => {
    fetch('/data/artists.json')
      .then(res => res.json())
      .then(data => {

        setArtists(data)
        setFiltered(data)
        console.log("i am here *****************************")
        // console.log(artists)
      })
  }, [])

  // Filter logic
  useEffect(() => {
    let result = [...artists]
    if (filters.category) {
      result = result.filter(a => a.categories.includes(filters.category))
    }
    if (filters.location) result = result.filter(a => a.location === filters.location)
    if (filters.priceRange) result = result.filter(a => a.priceRange === filters.priceRange)
    setFiltered(result)
  }, [filters, artists])

  return (
    <div className="space-y-14">
      <h1 className="text-5xl font-semibold text-center stroke-yellow-50">Browse Artists</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option className="text-black" value="">All Categories</option>
          <option className="text-black" value="Singer">Singer</option>
          <option className="text-black" value="DJ">DJ</option>
          <option className="text-black" value="Speaker">Speaker</option>
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <option value="">All Locations</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Chennai">Chennai</option>
          <option value="Pune">Pune</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Ahmedabad">Ahmedabad</option>
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
        >
          <option value="">All Price Ranges</option>
          <option value="₹5k - ₹10k">₹5k - ₹10k</option>
          <option value="₹10k - ₹20k">₹10k - ₹20k</option>
          <option value="₹15k - ₹25k">₹15k - ₹25k</option>
        </select>
      </div>

      {/* Artist Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No artists match your filters.</p>
        ) : (
          filtered.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))
        )}
      </div>
    </div>
  )
}
