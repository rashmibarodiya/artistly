import { getArtists } from "@/db/actions/getArtist";
import ArtistCard from "../../components/ArtistsCard";
import Filter from "../../components/Filters";
import AISearch from "@/components/ai/AISearch"
import { Suspense } from "react";
export default async function ArtistListingPage({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const params = await searchParams; // ✅ FIX

  const artists = await getArtists(params);
  return (
    <div className="w-full bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-12 px-6 text-white space-y-8">

      <h1 className="text-5xl font-semibold text-center">
        Browse Artists
      </h1>
      <Suspense fallback={<div>Loading filters...</div>}>
        <Filter searchParams={params} />
      </Suspense>
      <AISearch/>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {artists.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No artists available
          </p>
        ) : (
          artists.map((artist: any) => (
            <ArtistCard key={artist._id} artist={artist} />
          ))
        )}

      </div>

    </div>
  );
}