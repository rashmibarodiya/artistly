"use server";

import { artistSchema, ArtistInput } from "@/db/validators/artist";
import { Artist } from "@/db/schema/Artist";
import { connectDB } from "@/db/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Types } from "mongoose";

export async function createArtist(data: ArtistInput) {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = new Types.ObjectId(session.user.id);

  try {
    const validated = await artistSchema.validate(data, {
      abortEarly: false,
    });

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

    return {
      id: artist._id.toString(),
      category: artist.category,
      success: true,
    };
  } catch (error) {
    console.error("createArtist failed:", error);
    throw error;
  }
}