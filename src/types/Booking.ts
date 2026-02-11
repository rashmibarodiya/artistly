import {Types} from "mongoose"

export interface IBooking {
  _id: Types.ObjectId

  artistId: Types.ObjectId        // ref ArtistProfile
  userId: Types.ObjectId          // ref User

  eventType: "Wedding" | "College Fest" | "Corporate" | "Private"
  eventDate: Date

  eventLocation: {
    city: string
    address?: string
  }

  quotedPrice: number

  status:
    | "REQUESTED"
    | "ACCEPTED"
    | "REJECTED"
    | "CANCELLED"
    | "COMPLETED"

  message?: string

  createdAt: Date
  updatedAt: Date
}
