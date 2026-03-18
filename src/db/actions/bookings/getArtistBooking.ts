"use server";
import {Booking} from "@/db/schema/Booking";
import { Artist } from "@/db/schema/Artist";
import { connectDB } from "@/db/connect";
import mongoose from "mongoose";

export async function getArtistBookings(userId: string) {
  await connectDB();

  const artist = await Artist.findOne({
  userId: new mongoose.Types.ObjectId(userId),
});
    console.log("*******user id ",userId)
    console.log("artist is ",artist)
  if (!artist) return [];

  const bookings = await Booking.find({
    artistId: artist._id,
  })
    .sort({ eventDate: 1 })
    .limit(5)
    .lean();
    console.log("bookings are ",bookings)

  return JSON.parse(JSON.stringify(bookings));
}