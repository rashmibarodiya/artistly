"use server";

import { Booking } from "@/db/schema/Booking";
import { connectDB } from "@/db/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function createBooking(data: any) {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) throw new Error("Unauthorized");

  const booking = await Booking.create({
    artistId: data.artistId,
    userId: session.user.id,
    eventType: data.eventType,
    eventDate: new Date(data.eventDate),
    eventLocation: {
      city: data.city,
      address: data.address,
    },
    quotedPrice: data.quotedPrice,
    message: data.message,
  });

  return JSON.parse(JSON.stringify(booking));
}