import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ArtistLanding() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ARTIST") {
    redirect("/");
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white p-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold">
          Welcome, {session.user.name} 🎤
        </h1>

        <p className="mt-4 text-gray-400 text-lg">
          Showcase your talent. Get booked for premium events.
        </p>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <h2 className="text-xl font-semibold">🎵 Manage Profile</h2>
            <p className="mt-2 text-gray-400">
              Update your bio, genres, and media.
            </p>
            <Link href="/artist/profile" className="mt-4 inline-block text-purple-400">
              Edit →
            </Link>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <h2 className="text-xl font-semibold">📅 Booking Requests</h2>
            <p className="mt-2 text-gray-400">
              View and manage incoming bookings.
            </p>
            <Link href="/artist/bookings" className="mt-4 inline-block text-purple-400">
              View →
            </Link>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <h2 className="text-xl font-semibold">⭐ Reviews</h2>
            <p className="mt-2 text-gray-400">
              See what clients are saying.
            </p>
            <Link href="/artist/reviews" className="mt-4 inline-block text-purple-400">
              Check →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}