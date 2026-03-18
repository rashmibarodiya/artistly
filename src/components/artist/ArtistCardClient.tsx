"use client";

import { useState } from "react";
import ArtistProfile from "../artist/ArtistProfile";
import BookingButton from "../BookingButton";

export default function ArtistCardClient({
  artist,
  isUser,
}: {
  artist: any;
  isUser: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🔥 CARD */}
      <div
        onClick={() => setOpen(true)}
        className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white cursor-pointer"
      >
        <div className="text-black p-2 flex justify-center">
          {artist.userId?.name}
        </div>

        <img
          src={artist.media?.profileImage || "/artist/zara.jpg"}
          alt={artist.category}
          className="w-full h-48 object-cover"
        />

        <div className="p-4 space-y-2">
          <h3 className="text-xl font-semibold text-gray-700">
            {artist.category}
          </h3>

          <p className="text-sm text-gray-600">
            {artist.genres?.join(", ") || "No genres"}
          </p>

          <p className="text-sm text-yellow-600">
            ⭐ {artist.rating?.average || 0}
          </p>

          <p className="text-sm text-gray-600">
            {artist.bio || "No bio"}
          </p>

          <p className="text-sm text-gray-700 font-medium">
            ₹{artist.priceRange?.min} - ₹{artist.priceRange?.max}
          </p>

          {/* 🔥 Prevent click propagation */}
          {isUser && (
            <div onClick={(e) => e.stopPropagation()}>
              <BookingButton artist={artist} />
            </div>
          )}
        </div>
      </div>

      {/* 🔥 MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          
          <div className="bg-transparent max-h-[90vh] overflow-y-auto p-4 w-full max-w-4xl">
            
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="mb-4 bg-white text-black px-3 py-1 rounded"
            >
              Close
            </button>

            <ArtistProfile artist={artist} />
          </div>
        </div>
      )}
    </>
  );
}