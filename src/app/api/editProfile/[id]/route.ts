import { connectDB } from "@/db/connect";
import {Artist} from "@/db/schema/Artist"

export async function PUT(req: Request, { params }: any) {
  const body = await req.json();

  await connectDB();
console.log("i am not here *****************************8")
  const updated = await Artist.findByIdAndUpdate(
    params.id,
    {
      bio: body.bio,
      category: body.category,
      genres: body.genres,
      experienceYears: body.experienceYears,
      priceRange: body.priceRange,
      "media.profileImage": body.media.profileImage,
    },
    { new: true }
  );

  return Response.json(updated);
}