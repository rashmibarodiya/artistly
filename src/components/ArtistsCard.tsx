import { ArtistFormData } from '@/app/types/artist'

export default function ArtistCard({ artist }: { artist: ArtistFormData }) {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={
          artist.image
            ? typeof artist.image === 'string'
              ? artist.image
              : URL.createObjectURL(artist.image[0])
            : '/artist/zara.jpg'
        }
        alt={artist.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold">{artist.name}</h3>
        <p className="text-sm text-gray-600">
          {artist.categories?.join(', ') ?? 'No Category'} · {artist.location}

        </p>
        <p className="text-sm text-gray-600">Price: {artist.priceRange}</p>
        <button className="mt-2 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
          Ask for Quote
        </button>
      </div>
    </div>
  )
}
