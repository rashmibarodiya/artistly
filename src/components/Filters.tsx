
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