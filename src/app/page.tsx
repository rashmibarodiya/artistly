import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import UserLanding from "@/components/landing/UserLanding";
import ArtistLanding from "@/components/landing/ArtistLanding";

export default async function Home() {
  const session = await getServerSession(authOptions);
 console.log("session :::: ",session?.user)
  if (session?.user?.role === "ARTIST") {
    
    // return<ArtistLanding/>
    redirect("/artist/dashboard");
  }

  // If USER or not logged in
  return <UserLanding />;
}