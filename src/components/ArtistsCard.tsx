import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import ArtistCardClient from "./artist/ArtistCardClient";

export default async function ArtistCard({ artist }: { artist: any }) {
  const session = await getServerSession(authOptions);

  return (
    <ArtistCardClient
      artist={artist}
      isUser={session?.user?.role === "USER"}
    />
  );
}