"use server"
import { connectDB } from "@/db/connect"
import { Booking } from "@/db/schema/Booking"
import { User } from "@/db/schema/User"
import mongoose from "mongoose"

export async function getUserBookings(userId: string) {
  await connectDB();

  const bookings = await Booking.find({
    userId: new mongoose.Types.ObjectId(userId),
  })
    .sort({ eventDate: 1 })
    .limit(5)
    .populate({
        path:"artistId",
        populate:{
            path:"userId",
            select:"name"
        }
    }) // 🔥
    .lean();

  return JSON.parse(JSON.stringify(bookings));
}