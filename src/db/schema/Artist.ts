import { Schema, model, models } from "mongoose";
import { IArtist } from "../../types/Artist";

const ArtistSchema = new Schema<IArtist>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    genres: [String],
    priceRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    bio: { type: String, required: true },
    experienceYears: Number,
    verificationStatus: {
      type: String,
      enum: ["PENDING", "VERIFIED", "REJECTED"],
      default: "PENDING",
    },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    media: {
      profileImage: String,
      videos: [String],
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Artist =
  models.Artist ||
  model<IArtist>("Artist", ArtistSchema);