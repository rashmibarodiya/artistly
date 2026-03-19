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
        className="relative rounded-2xl overflow-hidden cursor-pointer 
        bg-gradient-to-br from-purple-900/80 via-purple-800/70 to-indigo-900/80
        border border-white/10 backdrop-blur-xl
        hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(255,215,0,0.2)]
        transition-all duration-300"
      >
        {/* Image */}
        <div className="relative">
          <img
            src={artist.media?.profileImage || "/artist/zara.jpg"}
            alt={artist.category}
            className="w-full h-48 object-cover opacity-90"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Name */}
          <p className="absolute bottom-2 left-3 text-white font-semibold text-lg">
            {artist.userId?.name}
          </p>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2 text-white">
          <h3 className="text-lg font-semibold text-purple-200">
            {artist.category}
          </h3>

          <p className="text-sm text-gray-300">
            {artist.genres?.join(", ") || "No genres"}
          </p>

          {/* ⭐ GOLD RATING */}
          <p className="text-sm text-yellow-400 font-medium">
            ⭐ {artist.rating?.average?.toFixed(1) || 0}
          </p>

          <p className="text-sm text-gray-400 line-clamp-2">
            {artist.bio || "No bio"}
          </p>

          {/* 💰 GOLD PRICE */}
          <p className="text-sm font-semibold text-yellow-300">
            ₹{artist.priceRange?.min} - ₹{artist.priceRange?.max}
          </p>

          {/* 🔥 Booking Button */}
          {isUser && (
            <div onClick={(e) => e.stopPropagation()} className="pt-2">
              <BookingButton artist={artist} />
            </div>
          )}
        </div>

        {/* ✨ Glow border on hover */}
        <div className="absolute inset-0 rounded-2xl border border-transparent hover:border-yellow-400/30 transition" />
      </div>

      {/* 🔥 MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
          
          <div className="max-h-[90vh] overflow-y-auto w-full max-w-4xl p-4">
            
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="mb-4 px-4 py-2 rounded-xl 
              bg-gradient-to-r from-yellow-400 to-yellow-600 
              text-black font-semibold shadow-md hover:scale-105 transition"
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