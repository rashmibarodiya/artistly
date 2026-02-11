'use client'

import "@uploadthing/react/styles.css"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { UploadButton } from "@uploadthing/react"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import { artistSchema } from "@/db/validators/artist"
import { createArtist } from "@/db/actions/artist"
import { useState } from "react"
import { useRouter } from "next/navigation"
import type * as yup from "yup"

type ArtistFormData = yup.InferType<typeof artistSchema>

const categories = ["Singer", "Dancer", "DJ", "Band"]
const genres = ["Bollywood", "Classical", "Rock", "Pop", "Hip Hop"]

export default function ArtistForm() {
  const router = useRouter()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ArtistFormData>({
    resolver: yupResolver(artistSchema),
    defaultValues: {
      category: "",
      bio: "",
      experienceYears: null,
      genres: [],
      priceRange: {
        min: 0,
        max: 0,
      },
      media: {
        profileImage: null,
        videos: [],
      },
    },
  })

  const onSubmit = async (data: ArtistFormData) => {
    try {
      setLoading(true)
      const res = await createArtist(data)
      if(res?.success)router.push('/artist/dashboard')
      alert("🎉 Artist profile created successfully!")
    } catch (error) {
      console.error(error)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle =
    "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 mt-1 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl text-white"
    >
      {/* CATEGORY */}
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select {...register("category")} className={inputStyle}>
          <option className="text-black" value="">
            Select Category
          </option>
          {categories.map((c) => (
            <option key={c} value={c} className="text-black">
              {c}
            </option>
          ))}
        </select>
        <p className="text-red-400 text-sm mt-1">{errors.category?.message}</p>
      </div>

      {/* GENRES */}
      <div>
        <label className="block mb-2 font-medium">Genres</label>
        <div className="grid grid-cols-2 gap-3">
          {genres.map((g) => (
            <label
              key={g}
              className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 hover:bg-white/20 transition cursor-pointer"
            >
              <input
                type="checkbox"
                value={g}
                {...register("genres")}
                className="accent-pink-500"
              />
              {g}
            </label>
          ))}
        </div>
      </div>

      {/* BIO */}
      <div>
        <label className="block mb-1 font-medium">Bio</label>
        <textarea
          {...register("bio")}
          className={`${inputStyle} h-28 resize-none`}
          placeholder="Tell us about your experience and style..."
        />
        <p className="text-red-400 text-sm mt-1">{errors.bio?.message}</p>
      </div>

      {/* EXPERIENCE */}
      <div>
        <label className="block mb-1 font-medium">
          Experience (Years)
        </label>
        <input
          type="number"
          {...register("experienceYears", { valueAsNumber: true })}
          className={inputStyle}
          placeholder="e.g. 5"
        />
      </div>

      {/* PRICE RANGE */}
      <div>
        <label className="block mb-2 font-medium">Price Range (₹)</label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Minimum"
            {...register("priceRange.min", { valueAsNumber: true })}
            className={inputStyle}
          />
          <input
            type="number"
            placeholder="Maximum"
            {...register("priceRange.max", { valueAsNumber: true })}
            className={inputStyle}
          />
        </div>
      </div>

      {/* PROFILE IMAGE */}
      <div>
        <label className="block mb-2 font-medium">Profile Image</label>

        {!previewUrl ? (
          <UploadButton<OurFileRouter, "artistMedia">
            endpoint="artistMedia"
            onClientUploadComplete={(res) => {
              if (!res || res.length === 0) return

              setValue("media.profileImage", res[0].ufsUrl, {
                shouldValidate: true,
              })
              setPreviewUrl(res[0].ufsUrl)
            }}
            onUploadError={(error: Error) => {
              alert(error.message)
            }}
          />
        ) : (
          <div className="relative w-40 group">
            <img
              src={previewUrl}
              alt="Profile preview"
              className="w-40 h-40 object-cover rounded-xl border border-white/30 shadow-lg"
            />

            <button
              type="button"
              onClick={() => {
                setPreviewUrl(null)
                setValue("media.profileImage", null)
              }}
              className="absolute top-2 right-2 bg-red-600/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <button
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:scale-105 transition-transform duration-300 shadow-lg font-semibold text-lg disabled:opacity-50"
      >
        {loading ? "Creating Profile..." : "Launch My Artist Profile 🚀"}
      </button>
    </form>
  )
}