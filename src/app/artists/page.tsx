'use client'

import { useEffect, useState } from 'react'
import ArtistCard from '../../components/ArtistsCard'
import { ArtistFormData } from '@/types/artist'
import Filter from "../../components/Filters"

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
    <div className="space-y-14 mt-8">
      <h1 className="text-5xl font-semibold text-center stroke-yellow-50 ">Browse Artists</h1>

      {/* Filters */}
  
    <Filter filters={filters} setFilters={setFilters} />
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
