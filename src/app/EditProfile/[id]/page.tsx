"use server"

import EditProfile from "@/components/artist/EditProfile";
import { connectDB } from "@/db/connect";
import {Artist} from "@/db/schema/Artist";

export default async function EditArtistPage({ params }: any) {
  await connectDB();

  const artist = await Artist.findById(params.id).lean();

  if (!artist) return <div>Artist not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <EditProfile artist={JSON.parse(JSON.stringify(artist))} />
      </div>
    </div>
  );
}