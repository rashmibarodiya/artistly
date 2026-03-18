"use client";

import { useSession } from "next-auth/react";

export default function ArtistProfile({ artist }: any) {
  const { data: session } = useSession();

  const isOwner =
    session?.user?.id === artist?.userId?._id?.toString();

  return (
    <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-white space-y-6">

      {/* 🔥 Header */}
      <div className="flex items-center gap-6">
        <img
          src={
            artist.media?.profileImage ||
            "https://via.placeholder.com/150"
          }
          alt="profile"
          className="w-28 h-28 rounded-full object-cover border border-white/30"
        />

        <div>
          <h1 className="text-3xl font-bold">
            {artist.userId?.name || "Artist"}
          </h1>
          <p className="text-purple-300">{artist.category}</p>

          {artist.verificationStatus === "VERIFIED" && (
            <p className="text-green-400 text-sm mt-1">✔ Verified</p>
          )}
        </div>

        {/* 🔥 Edit button */}
        {isOwner && (
          <button className="ml-auto bg-yellow-400 text-black px-4 py-2 rounded-xl font-semibold">
            Edit Profile
          </button>
        )}
      </div>

      {/* 🔥 Bio */}
      <div>
        <h2 className="text-lg font-semibold mb-1">Bio</h2>
        <p className="text-gray-300">{artist.bio}</p>
      </div>

      {/* 🔥 Genres */}
      <div>
        <h2 className="text-lg font-semibold mb-1">Genres</h2>
        <div className="flex flex-wrap gap-2">
          {artist.genres?.length ? (
            artist.genres.map((g: string) => (
              <span
                key={g}
                className="bg-white/20 px-3 py-1 rounded-full text-sm"
              >
                {g}
              </span>
            ))
          ) : (
            <p className="text-gray-400">No genres listed</p>
          )}
        </div>
      </div>

      {/* 🔥 Price */}
      <div>
        <h2 className="text-lg font-semibold mb-1">Price Range</h2>
        <p>
          ₹{artist.priceRange.min} - ₹{artist.priceRange.max}
        </p>
      </div>

      {/* 🔥 Experience */}
      <div>
        <h2 className="text-lg font-semibold mb-1">Experience</h2>
        <p>
          {artist.experienceYears
            ? `${artist.experienceYears} years`
            : "Not specified"}
        </p>
      </div>

      {/* 🔥 Rating */}
      <div>
        <h2 className="text-lg font-semibold mb-1">Rating</h2>
        <p>
          ⭐ {artist.rating.average.toFixed(1)} ({artist.rating.count} reviews)
        </p>
      </div>

      {/* 🔥 Videos */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {artist.media?.videos?.length ? (
            artist.media.videos.map((video: string, i: number) => (
              <video
                key={i}
                src={video}
                controls
                className="rounded-xl w-full"
              />
            ))
          ) : (
            <p className="text-gray-400">No videos uploaded</p>
          )}
        </div>
      </div>

      {/* 🔥 Metadata */}
      <div className="text-xs text-gray-400 pt-4 border-t border-white/10">
        <p>Created: {new Date(artist.createdAt).toLocaleDateString()}</p>
        <p>Updated: {new Date(artist.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}