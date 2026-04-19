import EditProfile from "@/components/artist/EditProfile";
import { connectDB } from "@/db/connect";
import { Artist } from "@/db/schema/Artist";
import mongoose from "mongoose";

export default async function EditArtistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connectDB();

  const resolvedParams = await params; // ✅ THIS is the fix
  const id = resolvedParams.id;

  console.log("ID:", id);

  if (!id) {
    return <div>ID not found</div>;
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return <div>Invalid ID</div>;
  }

  const artist = await Artist.findById(id).lean();

  if (!artist) return <div>Artist not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <EditProfile artist={JSON.parse(JSON.stringify(artist))} />
      </div>
    </div>
  );
}