

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
  const availability = await getArtistAvailability(session.user.id);

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-16 px-6 relative overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-500 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-30 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto">
        
        <h1 className="text-5xl font-bold">
          Welcome, {session.user.name} 🎤
        </h1>

        <p className="mt-4 text-purple-200 text-lg">
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
          />
        </div>

      </div>
    </section>
  );
}