// import { getArtists } from "@/db/actions/getArtist";
// import ArtistCard from "../../components/ArtistsCard";
// import Filter from "../../components/Filters";
// import AISearch from "@/components/ai/AISearch"
// import { Suspense } from "react";
// export default async function ArtistListingPage({
//   searchParams,
// }: {
//   searchParams: Promise<any>;
// }) {
//   const params = await searchParams; // ✅ FIX

//   const artists = await getArtists(params);
//   return (
//     <div className="w-full bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-12 px-6 text-white space-y-8">

//       <h1 className="text-5xl font-semibold text-center">
//         Browse Artists
//       </h1>
//       <Suspense fallback={<div>Loading filters...</div>}>
//         <Filter searchParams={params} />
//       </Suspense>
//       <AISearch/>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

//         {artists.length === 0 ? (
//           <p className="text-center text-gray-500 col-span-full">
//             No artists available
//           </p>
//         ) : (
//           artists.map((artist: any) => (
//             <ArtistCard key={artist._id} artist={artist} />
//           ))
//         )}

//       </div>

//     </div>
//   );
// }

import { getArtists } from "@/db/actions/getArtist";
import ArtistCard from "../../components/ArtistsCard";
import Filter from "../../components/Filters";
import AISearch from "@/components/ai/AISearch";
import { Suspense } from "react";

export default async function ArtistListingPage({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const params = await searchParams;
  const artists = await getArtists(params);

  return (
    <div className="w-full bg-gradient-to-b from-marquee-bg to-marquee-bg2 py-12 px-6 text-marquee-cream space-y-10 min-h-screen">

      <div className="text-center space-y-2">
        <p className="text-marquee-amber text-xs tracking-[0.3em] uppercase">
          ✦ The Lineup ✦
        </p>
        <h1 className="font-display text-5xl md:text-6xl tracking-wide">
          Browse Artists
        </h1>
      </div>

      <Suspense fallback={<div className="text-center text-marquee-cream/50">Loading filters...</div>}>
        <Filter searchParams={params} />
      </Suspense>

      <AISearch />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {artists.length === 0 ? (
          <p className="text-center text-marquee-cream/50 col-span-full">
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