"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

const GENRES = ["Bollywood", "Classical", "Rock", "Pop", "Hip Hop"];

export default function EditProfile({ artist, onClose }: any) {
 const [form, setForm] = useState({
  genres: artist.genres || [],
  bio: artist.bio || "",
  category: artist.category || "",
  minPrice: artist.priceRange?.min || 0,
  maxPrice: artist.priceRange?.max || 0,
  experience: artist.experienceYears || 0,
  image: artist.media?.profileImage || "",
});

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleGenre = (genre: string) => {
    setForm((prev: any) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g: string) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

 const handleSubmit = async () => {
  try {
    await fetch(`/api/editProfilea/${artist._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bio: form.bio,
        category: form.category,
        genres: form.genres,
        experienceYears: form.experience,
        priceRange: {
          min: form.minPrice,
          max: form.maxPrice,
        },
        media: {
          profileImage: form.image,
        },
      }),
    });

    onClose();
  } catch (err) {
    console.error(err);
  }
};

 return (
  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-white space-y-6 shadow-2xl">

    <h2 className="text-3xl font-bold">Edit Profile</h2>

    {/* Name */}
    <p className="text-xl text-gray-300">{artist.userId.name}</p>

    {/* Image */}
    <div>
      <p className="text-sm mb-2">Profile Image</p>

      {!form.image ? (
        <UploadButton<OurFileRouter, "artistMedia">
          endpoint="artistMedia"
          onClientUploadComplete={(res) => {
            if (!res || res.length === 0) return;

            setForm((prev: any) => ({
              ...prev,
              image: res[0].ufsUrl,
            }));
          }}
        />
      ) : (
        <div className="relative w-40 group">
          <img
            src={form.image}
            className="w-40 h-40 rounded-xl object-cover"
          />
          <button
            onClick={() =>
              setForm((prev: any) => ({ ...prev, image: "" }))
            }
            className="absolute top-2 right-2 bg-red-500 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
          >
            Remove
          </button>
        </div>
      )}
    </div>

    {/* Category */}
    <p className="text-sm mb-2">Category</p>
    <input
      name="category"
      value={form.category}
      onChange={handleChange}
      placeholder="Category"
      className="w-full bg-white/10 p-3 rounded-xl"
    />

    {/* Bio */}
    <p className="text-sm mb-2">About me</p>
    <textarea
      name="bio"
      value={form.bio}
      onChange={handleChange}
      className="w-full bg-white/10 p-3 rounded-xl"
    />

    {/* Genres */}
    <p className="text-sm mb-2">Genre</p>
    <div className="flex flex-wrap gap-2">
      {GENRES.map((g) => (
        <button
          key={g}
          onClick={() => toggleGenre(g)}
          className={`px-4 py-1 rounded-full ${
            form.genres.includes(g)
              ? "bg-purple-600"
              : "bg-white/10"
          }`}
        >
          {g}
        </button>
      ))}
    </div>

    {/* Price */}
    
    <div className="flex gap-4">
        <div className="w-full">
            <p className="text-sm mb-2">Minimum Price</p>
             <input
        type="number"
        name="minPrice"
        value={form.minPrice}
        onChange={handleChange}
        className="w-full bg-white/10 p-3 rounded-xl"
      />
        </div>
     <div className="w-full">
        <p className="text-sm mb-2">Maximum Price</p>
        <input
        type="number"
        name="maxPrice"
        value={form.maxPrice}
        onChange={handleChange}
        className="w-full bg-white/10 p-3 rounded-xl"
      />
     </div>
      
    </div>

    {/* Experience */}
    <p className="text-sm mb-2">Experience</p>
    <input
      type="number"
      name="experience"
      value={form.experience}
      onChange={handleChange}
      className="w-full bg-white/10 p-3 rounded-xl"
    />

    {/* Save */}
    <button
      onClick={handleSubmit}
      className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-semibold"
    >
      Save Changes
    </button>
  </div>
);
}