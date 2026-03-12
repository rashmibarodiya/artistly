

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import { getArtistBookings } from "@/db/actions/bookings/getArtistBooking";
import { getArtistAvailability } from "@/db/actions/availability/getAvailability";

import UpcomingBookings from "@/components/artist/UpcomingBooking";
import AvailabilityCalendar from "@/components/artist/AvailabilityCalendar";

export default async function ArtistLanding() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ARTIST") {
    redirect("/");
  }

  const bookings = await getArtistBookings(session.user.id);
  console.log("  wait ***",session)
  const availability = await getArtistAvailability(session.user.id);

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white p-10">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold">
          Welcome, {session.user.name} 🎤
        </h1>

        <p className="mt-4 text-gray-400 text-lg">
          Manage your bookings and availability.
        </p>

        {/* BOOKINGS */}
        <div className="mt-12">
          <UpcomingBookings bookings={bookings} />
        </div>

        {/* AVAILABILITY */}
        <div className="mt-12">
          <AvailabilityCalendar
            availability={availability}
            userId={session.user.id}
          />        </div>

      </div>
    </section>
  );
}