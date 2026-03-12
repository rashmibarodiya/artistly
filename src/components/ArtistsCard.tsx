import BookingButton from "./BookingButton";

export default function ArtistCard({ artist }: { artist: any }) {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white">

      <img
        src={artist.media?.profileImage || "/artist/zara.jpg"}
        alt={artist.category}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 space-y-2">

        {/* Category */}
        <h3 className="text-xl font-semibold">
          {artist.category}
        </h3>

        {/* Genres */}
        <p className="text-sm text-gray-600">
          {artist.genres?.join(", ") || "No genres"}
        </p>

        {/* Rating */}
        <p className="text-sm text-yellow-600">
          ⭐ {artist.rating?.average || 0} ({artist.rating?.count || 0} reviews)
        </p>

        {/* Price */}
        <p className="text-sm text-gray-700 font-medium">
          ₹{artist.priceRange?.min} - ₹{artist.priceRange?.max}
        </p>

       <BookingButton artist={artist} />

      </div>
    </div>
  );
}