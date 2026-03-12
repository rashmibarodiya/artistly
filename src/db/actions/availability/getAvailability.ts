"use server";

import { Availability } from "@/db/schema/Availability";
import { Artist } from "@/db/schema/Artist";
import { connectDB } from "@/db/connect";
export async function getArtistAvailability(userId: string) {
  await connectDB();

  const artist = await Artist.findOne({ userId });

  if (!artist) return [];

  const availability = await Availability.find({
    artistId: artist._id,
  })
    .sort({ date: 1 })
    .lean();

  return JSON.parse(JSON.stringify(availability));
}