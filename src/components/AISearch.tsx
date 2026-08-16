// "use client";

// import { useState } from "react";
// import ArtistCard from "./ArtistsCard";

// export default function AISearch() {
//   const [input, setInput] = useState("");
//   const [artists, setArtists] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async () => {
//     if (!input) return;

//     setLoading(true);

//     const res = await fetch("/api/ai/parse-event", {
//       method: "POST",
//       body: JSON.stringify({ description: input }),
//     });

//     const data = await res.json();
//     setArtists(data.artists || []);
//     setLoading(false);
//   };

//   return (
//     <div className="bg-white/10 p-6 rounded-xl space-y-4">
//       <h2 className="text-2xl font-semibold">✨ AI Recommendations</h2>

//       <div className="flex gap-2">
//         <input
//           type="text"
//           placeholder="Describe your event (e.g. Wedding, singer, 20k budget)"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 p-3 rounded-lg text-black"
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-semibold cursor-pointer
//         transition duration-200 ease-in-out hover:bg-yellow-300 hover:scale-105 hover:shadow-xl 
//         active:scale-95"
//         >
//           Searchjj
//         </button>
//       </div>

//       {loading && <p>Finding best artists...</p>}

//       {artists.length > 0 && (
//         <div>
//           <h3 className="text-lg mb-3">Top Matches</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {artists.map((artist) => (
//               <ArtistCard key={artist._id} artist={artist} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import ArtistCard from "./ArtistsCard";

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
    <div className="ticket max-w-4xl mx-auto p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-marquee-amber text-xl">✦</span>
        <h2 className="font-display text-2xl tracking-wide text-marquee-cream">
          AI Recommendations
        </h2>
      </div>

      {/* Input */}
      <div className="flex gap-2 flex-col sm:flex-row">
        <input
          type="text"
          placeholder="Describe your event (e.g. Wedding, singer, 20k budget)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 bg-marquee-card text-marquee-cream placeholder-marquee-cream/40 border border-marquee-plum rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-marquee-amber transition"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-marquee-amber text-marquee-bg px-6 py-3 rounded-full font-semibold cursor-pointer
          transition duration-200 ease-in-out hover:scale-105 hover:shadow-[0_0_20px_rgba(232,163,61,0.4)]
          active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-marquee-cream/60 text-sm flex items-center gap-2">
          <span className="bulb text-marquee-amber">✦</span> Finding best artists...
        </p>
      )}

      {/* Results */}
      {artists.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-widest text-marquee-cream/40 mb-3">
            Showing results based on your description
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {artists.map((artist) => (
              <ArtistCard key={artist._id} artist={artist} />
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {!loading && artists.length === 0 && input && (
        <p className="text-marquee-cream/40 text-sm">No matching artists found</p>
      )}
    </div>
  );
}