import { Schema, model, models } from "mongoose";
import { IAvailability } from "../../types/Availability";

const AvailabilitySchema = new Schema<IAvailability>(
  {
    artistId: {
      type: Schema.Types.ObjectId,
      ref: "ArtistProfile",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * One artist → one entry per date
 * Prevents double booking
 */
AvailabilitySchema.index(
  { artistId: 1, date: 1 },
  { unique: true }
);

export const Availability =
  models.Availability ||
  model<IAvailability>("Availability", AvailabilitySchema);