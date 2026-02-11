import { NextResponse } from "next/server";
import { artistSchema } from "@/db/validators/artist";
import { Artist } from "@/db/schema/Artist";
import { connectDB } from "@/db/connect";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // validate request body
    const validatedData = await artistSchema.validate(body, {
      abortEarly: false,
    });

    const artist = await Artist.create(validatedData);

    return NextResponse.json(
      {
        success: true,
        artist,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create artist",
        errors: error?.errors || error?.message,
      },
      { status: 400 }
    );
  }
}