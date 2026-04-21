"use client";

import { useState } from "react";
import ArtistCard from "./ArtistsCard";

export default function AISearch() {
  const [input, setInput] = useState("");
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!input) return;

    setLoading(true);

    const res = await fetch("/api/ai/parse-event", {
      method: "POST",
      body: JSON.stringify({ description: input }),
    });

    const data = await res.json();
    setArtists(data.artists || []);
    setLoading(false);
  };

  return (
    <div className="bg-white/10 p-6 rounded-xl space-y-4">
      <h2 className="text-2xl font-semibold">✨ AI Recommendations</h2>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Describe your event (e.g. Wedding, singer, 20k budget)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 rounded-lg text-black"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-semibold cursor-pointer
        transition duration-200 ease-in-out hover:bg-yellow-300 hover:scale-105 hover:shadow-xl 
        active:scale-95"
        >
          Searchjj
        </button>
      </div>

      {loading && <p>Finding best artists...</p>}

      {artists.length > 0 && (
        <div>
          <h3 className="text-lg mb-3">Top Matches</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {artists.map((artist) => (
              <ArtistCard key={artist._id} artist={artist} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}