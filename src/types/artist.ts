
import { Types } from "mongoose"
export interface IArtist {
  _id: Types.ObjectId
  userId: Types.ObjectId          // ref User

  category: "Singer" | "DJ" | "Dancer" | "Speaker"
  genres?: string[]

  priceRange: {
    min: number
    max: number
  }

  bio: string
  experienceYears?: number

  verificationStatus: "PENDING" | "VERIFIED" | "REJECTED"

  rating: {
    average: number
    count: number
  }

  media: {
    profileImage?: string
    videos?: string[]
  }

  isActive: boolean

  createdAt: Date
  updatedAt: Date
}
