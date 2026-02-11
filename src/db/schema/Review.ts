import { Schema, model, models } from "mongoose";
import { IReview } from "../../types/Review";

const ReviewSchema = new Schema<IReview>(
  {
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
    artistId: { type: Schema.Types.ObjectId, ref: "ArtistProfile", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String,
  },
  { timestamps: true }
);

export const Review =
  models.Review || model<IReview>("Review", ReviewSchema);