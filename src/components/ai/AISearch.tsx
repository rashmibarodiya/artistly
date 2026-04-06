"use client";

import { useState } from "react";
import ArtistCardClient from "../artist/ArtistCardClient";

export default function AISearch({ isUser = true }: { isUser?: boolean }) {
  const [input, setInput] = useState("");
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!input) return;

    try {
      setLoading(true);

      const res = await fetch("/api/ai/parse-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: input,
        }),
      });

      const data = await res.json();

      if (data.error) {
        console.error("AI Error:", data.error);
        return;
      }

      setArtists(data.artists || []);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 p-6 rounded-xl space-y-4">
      <h2 className="text-2xl font-semibold">✨ AI Recommendations</h2>

      {/* 🔍 Input */}
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
          className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Search
        </button>
      </div>

      {/* ⏳ Loading */}
      {loading && <p>Finding best artists...</p>}

      {/* 🎯 Results */}
      {artists.length > 0 && (
        <div>
          <p className="text-sm text-gray-300 mb-2">
            Showing results based on your description
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {artists.map((artist) => (
              <ArtistCardClient
                key={artist._id}
                artist={artist}
                isUser={isUser}
              />
            ))}
          </div>
        </div>
      )}

      {/* ❌ No results */}
      {!loading && artists.length === 0 && input && (
        <p className="text-gray-400">No matching artists found</p>
      )}
    </div>
  );
}