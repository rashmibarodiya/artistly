"use client";

import Link from "next/link";
import Categories from "@/components/Categories";
import { useSession } from "next-auth/react";

export default function UserLanding() {
  const { data: session } = useSession();
  const role = session?.user?.role;

  const secondaryBtn =
    "bg-white/10 border border-white/30 px-8 py-3 rounded-full transition hover:bg-white hover:text-purple-900";

  return (
    <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-20 px-6 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>

      {/* Hero */}
      <div className="relative max-w-5xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-14 md:p-16 shadow-2xl text-center">

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Book Amazing Talent
        </h1>

        <p className="mt-6 text-lg md:text-xl text-purple-200 max-w-2xl mx-auto">
          Singers, DJs, dancers, and speakers — find the right performer for your event.
        </p>

        <div className="mt-10 flex justify-center gap-5 flex-wrap">

          {/* Always visible */}
          <Link
            href="/artists"
            className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:scale-105 hover:shadow-xl transition"
          >
            Explore Artists
          </Link>

          {/* Not logged in */}
          {!session && (
            <Link href="/register" className={secondaryBtn}>
              Join Now
            </Link>
          )}

          {/* USER */}
          {role === "USER" && (
            <Link href="/user/mybookings" className={secondaryBtn}>
              My Bookings
            </Link>
          )}

          {/* ARTIST */}
          {role === "ARTIST" && (
            <Link href="/dashboard/artist" className={secondaryBtn}>
              Profile
            </Link>
          )}

        </div>
      </div>

      {/* Categories */}
      <div className="mt-20 max-w-6xl mx-auto">
        <Categories />
      </div>
    </section>
  );
}