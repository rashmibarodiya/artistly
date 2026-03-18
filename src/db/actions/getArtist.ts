"use server";

import { Artist } from "@/db/schema/Artist";
import { connectDB } from "@/db/connect";

export async function getArtists(filters: any = {}) {
  await connectDB();

  const query: any = {
    isActive: true,
  };

  // 🎯 Category
  if (filters.category) {
    query.category = filters.category;
  }

  // 🎯 Genre (array field → use $in)
  if (filters.genre) {
    query.genres = { $in: [filters.genre] };
  }

  // 🎯 Price (min only for now)
  if (filters.minPrice) {
    query["priceRange.min"] = {
      $gte: Number(filters.minPrice),
    };
  }

  // 🎯 Rating
  if (filters.rating) {
    query["rating.average"] = {
      $gte: Number(filters.rating),
    };
  }

  // 🎯 Verified
  if (filters.verified === "true") {
    query.verificationStatus = "VERIFIED";
  }

  const artists = await Artist.find(query).populate({
        path:"userId",
        select:"name"
    }).lean();

  return JSON.parse(JSON.stringify(artists));
}