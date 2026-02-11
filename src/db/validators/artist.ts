import * as yup from "yup"

export const artistSchema = yup.object({
  category: yup.string().required(),
  genres: yup.array(yup.string()).default([]),
  priceRange: yup.object({
    min: yup.number().required(),
    max: yup.number().required(),
  }),
  bio: yup.string().required(),
  experienceYears: yup
    .number()
    .nullable() // allow null
    .default(null), // always present
  media: yup.object({
    profileImage: yup.string().url().nullable().default(null),
    videos: yup.array(yup.string().url()).default([]),
  }),
})
export type ArtistInput = yup.InferType<typeof artistSchema>