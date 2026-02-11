import { Types } from "mongoose";

export interface IAvailability {
  _id?: Types.ObjectId;

  artistId: Types.ObjectId;      // ref ArtistProfile
  date: Date;                    // event date (normalized to 00:00)

  isAvailable: boolean;          // true = free, false = booked
  bookingId?: Types.ObjectId;    // ref Booking (when booked)

  createdAt?: Date;
  updatedAt?: Date;
}