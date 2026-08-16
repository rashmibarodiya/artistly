

"use client";

import { useState } from "react";
import ArtistProfile from "../artist/ArtistProfile";
import BookingButton from "../BookingButton";

export default function ArtistCardClient({ artist, isUser }: { artist: any; isUser: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="ticket group cursor-pointer overflow-hidden hover:-translate-y-1.5 hover:rotate-[-0.5deg] hover:border-marquee-amber transition-all duration-300"
      >
        <div className="relative h-44">
          <img
            src={artist.media?.profileImage || "/artist/zara.jpg"}
            alt={artist.category}
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-marquee-bg via-marquee-bg/30 to-transparent" />
          <p className="absolute bottom-2 left-3 font-display text-2xl tracking-wide text-marquee-cream">
            {artist.userId?.name}
          </p>
        </div>

        <div className="p-4 border-t border-dashed border-marquee-plum space-y-2">
          <p className="font-display text-xl tracking-wide text-marquee-amber">
            {artist.category}
          </p>
          <p className="text-[11px] uppercase tracking-widest text-marquee-cream/60">
            {artist.genres?.join(" · ") || "No genres"}
          </p>
          <p className="text-xs text-marquee-cream/50 line-clamp-2">
            {artist.bio || "No bio"}
          </p>

          <div className="flex items-center justify-between pt-1">
            <span className="text-marquee-amber text-sm font-semibold">
              ₹{artist.priceRange?.min} – ₹{artist.priceRange?.max}
            </span>
            <span className="text-xs text-marquee-cream/70">
              ⭐ {artist.rating?.average?.toFixed(1) || 0}
            </span>
          </div>

          {isUser && (
            <div className="pt-2">
              <BookingButton artist={artist} />
            </div>
          )}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="max-h-[90vh] overflow-y-auto w-full max-w-4xl">
            <button
              onClick={() => setOpen(false)}
              className="mb-4 px-4 py-2 rounded-full bg-marquee-amber text-marquee-bg font-semibold hover:scale-105 transition"
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