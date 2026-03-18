"use server";

import { connectDB } from "@/db/connect";
import { Booking } from "@/db/schema/Booking";
import { Availability } from "@/db/schema/Availability";

export async function updateBookingStatus(
  bookingId: string,
  status: "ACCEPTED" | "REJECTED"
) {
  await connectDB();

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new Error("Booking not found");
  }

  // prevent changing after decision
  if (booking.status !== "REQUESTED") {
    throw new Error("Booking already handled");
  }

  booking.status = status;

  await booking.save();
  if (status === "ACCEPTED") {
  await Availability.findOneAndUpdate(
    {
      artistId: booking.artistId,
      date: booking.eventDate,
    },
    {
      isAvailable: false,
      bookingId: booking._id,
    },
    {
      upsert: true, 
      new: true,
    }
  );
}

  return { success: true };
}