"use server";

import { artistSchema, ArtistInput } from "@/db/validators/artist";
import { Artist } from "@/db/schema/Artist";
import { connectDB } from "@/db/connect";
import { Types } from "mongoose"
// import { auth } from "@/auth"; // or next-auth

export async function createArtist(data: ArtistInput) {
  console.log("🟣 createArtist called");
  console.log("📦 incoming data:", data);

  // 🔐 get user from auth
  // const session = await auth();
  // if (!session?.user?.id) {
  //   throw new Error("Unauthorized");
  // }
  // const userId = session.user.id;

  
const userId = new Types.ObjectId() // ⚠️ replace with real auth ASAP

  await connectDB();

  try {
    // ✅ validate payload
    const validated = await artistSchema.validate(data, {
      abortEarly: false,
    });

    console.log("✅ data validated");

    const artist = await Artist.create({
      userId,
      category: validated.category,
      genres: validated.genres ?? [],
      bio: validated.bio,
      experienceYears: validated.experienceYears,

      priceRange: {
        min: validated.priceRange.min,
        max: validated.priceRange.max,
      },

      media: {
        profileImage: validated.media?.profileImage,
        videos: validated.media?.videos ?? [],
      },
    });

    console.log("🎉 artist created:", artist._id.toString());

    return artist;
  } catch (error) {
    console.error("❌ createArtist failed:", error);
    throw error; // NEVER swallow server errors
  }
}