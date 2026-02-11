'use client'

import "@uploadthing/react/styles.css"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { UploadButton } from "@uploadthing/react"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import { artistSchema } from "@/db/validators/artist"
import { createArtist } from "@/db/actions/artist"
import { useState } from "react"
import type * as yup from "yup"

/* 🔑 SINGLE SOURCE OF TRUTH */
type ArtistFormData = yup.InferType<typeof artistSchema>

const categories = ["Singer", "Dancer", "DJ", "Band"]
const genres = ["Bollywood", "Classical", "Rock", "Pop", "Hip Hop"]

export default function ArtistForm() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

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
      experienceYears: null, // ✅ always present, nullable
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
    console.log("🟢 Form submitted:", data)
    await createArtist(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 border rounded p-6"
    >
      {/* Category */}
      <div>
        <label>Category</label>
        <select {...register("category")} className="input">
          <option value="">Select</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <p className="text-red-500 text-sm">{errors.category?.message}</p>
      </div>

      {/* Genres */}
      <div>
        <label>Genres</label>
        <div className="grid grid-cols-2 gap-2">
          {genres.map((g) => (
            <label key={g} className="flex gap-2">
              <input type="checkbox" value={g} {...register("genres")} />
              {g}
            </label>
          ))}
        </div>
      </div>

      {/* Bio */}
      <div>
        <label>Bio</label>
        <textarea {...register("bio")} className="input h-24" />
        <p className="text-red-500 text-sm">{errors.bio?.message}</p>
      </div>

      {/* Experience */}
      <div>
        <label>Experience (Years)</label>
        <input
          type="number"
          {...register("experienceYears", { valueAsNumber: true })}
          className="input"
        />
      </div>

      {/* Price Range */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Min Price"
          {...register("priceRange.min", { valueAsNumber: true })}
          className="input"
        />
        <input
          type="number"
          placeholder="Max Price"
          {...register("priceRange.max", { valueAsNumber: true })}
          className="input"
        />
      </div>

      {/* UploadThing Image */}
      <div>
        <label className="block mb-2">Profile Image</label>

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
          <div className="relative w-40">
            <img
              src={previewUrl}
              alt="Profile preview"
              className="w-40 h-40 object-cover rounded border"
            />

            <button
              type="button"
              onClick={() => {
                setPreviewUrl(null)
                setValue("media.profileImage", null)
              }}
              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <button className="bg-purple-600 text-white px-6 py-2 rounded">
        Submit
      </button>
    </form>
  )
}