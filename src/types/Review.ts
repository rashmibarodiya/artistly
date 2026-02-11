import {Types} from "mongoose"

export interface IReview {
  _id: Types.ObjectId

  bookingId: Types.ObjectId       
  artistId: Types.ObjectId
  userId: Types.ObjectId

  rating: number         
  comment?: string

  createdAt: Date
}
