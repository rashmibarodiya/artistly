"use server";

import { Availability } from "@/db/schema/Availability";
import { Artist } from "@/db/schema/Artist";
import { connectDB } from "@/db/connect";

export async function toggleAvailability(userId: string, date: Date) {
  await connectDB();

  const artist = await Artist.findOne({ userId });

  if (!artist) throw new Error("Artist not found");

  const existing = await Availability.findOne({
    artistId: artist._id,
    date,
  });

  if (existing) {
    existing.isAvailable = !existing.isAvailable;
    await existing.save();
    return existing;
  }

  const availability = await Availability.create({
    artistId: artist._id,
    date,
    isAvailable: true,
  });
  return availability;
}