// "use client";


// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function Filter({ searchParams }: any) {
//   const router = useRouter();

//   const [category, setCategory] = useState(searchParams.category || "");
//   const [minPrice, setMinPrice] = useState(searchParams.minPrice || "");
//   const [genre, setGenre] = useState(searchParams.genre || "");
//   const [rating, setRating] = useState(searchParams.rating || "");
//   const [verified, setVerified] = useState(
//     searchParams.verified === "true"
//   );
//   const applyFilters = () => {
//     const params = new URLSearchParams();

//     if (category) params.set("category", category);
//     if (minPrice) params.set("minPrice", minPrice);
//     if (genre) params.set("genre", genre);
//     if (rating) params.set("rating", rating);
//     if (verified) params.set("verified", "true");

//     router.push(`/artists?${params.toString()}`);
//   };

//  const clearFilters = () => {
//   // reset UI state
//   setCategory("");
//   setMinPrice("");
//   setGenre("");
//   setRating("");
//   setVerified(false);

//   // reset URL
//   router.push("/artists");
// };

//   const inputStyle =
//     "bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition";

//   return (
// <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-wrap justify-center gap-6 items-end shadow-lg">
//       {/* Category */}
//       <div className="flex flex-col">
//         <p className="text-xs text-gray-300 mb-1">Category</p>
//         <select
//           className={`${inputStyle} cursor-pointer`}
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="" className="text-black">All</option>
//           <option value="Singer" className="text-black">Singer</option>
//           <option value="DJ" className="text-black">DJ</option>
//           <option value="Dancer" className="text-black">Dancer</option>
//           <option value="Instrumentalist" className="text-black">Instrumentalist</option>
//         </select>
//       </div>
//       {/* Genre */}
//       <div className="flex flex-col">
//         <p className="text-xs text-gray-300 mb-1">Genre</p>
//         <select
//           className={`${inputStyle} cursor-pointer`}
//           value={genre}
//           onChange={(e) => setGenre(e.target.value)}
//         >
//           <option value="" className="text-black">All</option>
//           <option value="Bollywood" className="text-black">Bollywood</option>
//           <option value="Hip Hop" className="text-black">Hip Hop</option>
//           <option value="Classical" className="text-black">Classical</option>
//           <option value="Rock" className="text-black">Rock</option>
//           <option value="Pop" className="text-black">Pop</option>
//         </select>
//       </div>

//       {/* Min Price */}
//       <div className="flex flex-col">
//         <p className="text-xs text-gray-300 mb-1">Min Price</p>
//         <input
//           type="number"
//           placeholder="Min"
//           className={`${inputStyle} w-28`}
//           value={minPrice}
//           onChange={(e) => setMinPrice(e.target.value)}
//         />
//       </div>

//       {/* Max Price */}
//       {/* <div className="flex flex-col">
//         <p className="text-xs text-gray-300 mb-1">Max Price</p>
//         <input
//           type="number"
//           placeholder="Max"
//           className={`${inputStyle} w-28`}
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(e.target.value)}
//         />
//       </div> */}

//       {/* Rating */}
//       {/* <div className="flex flex-col">
//         <p className="text-xs text-gray-300 mb-1">Rating</p>
//         <select
//           className={`${inputStyle} cursor-pointer`}
//           value={rating}
//           onChange={(e) => setRating(e.target.value)}
//         >
//           <option value="" className="text-black">All</option>
//           <option value="3" className="text-black">3+</option>
//           <option value="4" className="text-black">4+</option>
//         </select>
//       </div> */}

//       {/* Verified */}
//       {/* <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
//         <input
//           type="checkbox"
//           checked={verified}
//           onChange={(e) => setVerified(e.target.checked)}
//           className="accent-yellow-400"
//         />
//         Verified
//       </label> */}

//       {/* Buttons */}
//       <div className="flex gap-3">
//         <button
//           onClick={applyFilters}
//           className="bg-yellow-400 hover:bg-yellow-300 transition text-black px-5 py-2 rounded-xl font-semibold shadow-md"
//         >
//           Apply
//         </button>

//         <button
//           onClick={clearFilters}
//           className="bg-white/10 hover:bg-white/20 transition text-white px-5 py-2 rounded-xl"
//         >
//           Clear
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Filter({ searchParams }: any) {
  const router = useRouter();
  const [category, setCategory] = useState(searchParams.category || "");
  const [minPrice, setMinPrice] = useState(searchParams.minPrice || "");
  const [genre, setGenre] = useState(searchParams.genre || "");

  const inputStyle =
    "bg-marquee-card text-marquee-cream placeholder-marquee-cream/40 border border-marquee-plum rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-marquee-amber transition";

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (minPrice) params.set("minPrice", minPrice);
    if (genre) params.set("genre", genre);
    router.push(`/artists?${params.toString()}`);
  };

  const clearFilters = () => {
    setCategory(""); setMinPrice(""); setGenre("");
    router.push("/artists");
  };

  return (
    <div className="max-w-4xl mx-auto ticket p-6 flex flex-wrap justify-center gap-6 items-end">
      <div className="flex flex-col">
        <p className="text-[11px] uppercase tracking-widest text-marquee-cream/50 mb-1">Category</p>
        <select className={inputStyle} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="Singer">Singer</option>
          <option value="DJ">DJ</option>
          <option value="Dancer">Dancer</option>
          <option value="Instrumentalist">Instrumentalist</option>
        </select>
      </div>
      <div className="flex flex-col">
        <p className="text-[11px] uppercase tracking-widest text-marquee-cream/50 mb-1">Genre</p>
        <select className={inputStyle} value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">All</option>
          <option value="Bollywood">Bollywood</option>
          <option value="Hip Hop">Hip Hop</option>
          <option value="Classical">Classical</option>
          <option value="Rock">Rock</option>
          <option value="Pop">Pop</option>
        </select>
      </div>
      <div className="flex flex-col">
        <p className="text-[11px] uppercase tracking-widest text-marquee-cream/50 mb-1">Min Price</p>
        <input type="number" placeholder="Min" className={`${inputStyle} w-28`} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
      </div>
      <div className="flex gap-3">
        <button onClick={applyFilters} className="bg-marquee-amber text-marquee-bg px-5 py-2 rounded-full font-semibold hover:scale-105 transition">
          Apply
        </button>
        <button onClick={clearFilters} className="border border-marquee-plum px-5 py-2 rounded-full hover:bg-white/5 transition">
          Clear
        </button>
      </div>
    </div>
  );
}