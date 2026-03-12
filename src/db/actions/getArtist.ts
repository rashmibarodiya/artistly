"use server";

import { Artist } from "@/db/schema/Artist";
import { connectDB } from "@/db/connect";

export async function getArtists() {
  await connectDB();

  const artists = await Artist.find({
    isActive: true,
  }).lean();

  return JSON.parse(JSON.stringify(artists));
}