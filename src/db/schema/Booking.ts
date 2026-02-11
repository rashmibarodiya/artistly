import { Schema, model, models } from "mongoose";
import { IBooking } from "../../types/Booking";

const BookingSchema = new Schema<IBooking>(
  {
    artistId: { type: Schema.Types.ObjectId, ref: "ArtistProfile", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    eventType: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventLocation: {
      city: { type: String, required: true },
      address: String,
    },
    quotedPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["REQUESTED", "ACCEPTED", "REJECTED", "CANCELLED", "COMPLETED"],
      default: "REQUESTED",
    },
    message: String,
  },
  { timestamps: true }
);

export const Booking =
  models.Booking || model<IBooking>("Booking", BookingSchema);