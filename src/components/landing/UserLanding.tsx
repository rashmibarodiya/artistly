
"use client";

import Link from "next/link";
import Categories from "@/components/Categories";
import { useSession } from "next-auth/react";

const HEADLINE = "FIND YOUR HEADLINER";

export default function UserLanding() {
  const { data: session } = useSession();
  const role = session?.user?.role;

  return (
    <>
      {/* HERO */}
      <section className="min-h-[calc(100dvh-5rem)] bg-gradient-to-b from-marquee-bg to-marquee-bg2 text-marquee-cream px-6 relative overflow-hidden flex flex-col justify-center">
        {/* Background blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-marquee-velvet/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-marquee-amber/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center">
          <p className="text-marquee-amber text-xs tracking-[0.3em] uppercase mb-5">
            ✦ Book Amazing Talent ✦
          </p>

          <h1 className="font-display text-5xl md:text-7xl tracking-wide leading-none">
            {HEADLINE.split("").map((char, i) => (
              <span
                key={i}
                className="bulb"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <p className="mt-6 text-marquee-cream/70 max-w-xl mx-auto">
            Singers, DJs, dancers, and speakers — booked in minutes, not messages.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link
              href="/artists"
              className="bg-marquee-amber text-marquee-bg px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              Explore Artists
            </Link>

            {!session && (
              <Link
                href="/register"
                className="border border-marquee-plum px-8 py-3 rounded-full hover:bg-white/5 transition"
              >
                Join Now
              </Link>
            )}

            {role === "USER" && (
              <Link
                href="/user/mybookings"
                className="border border-marquee-plum px-8 py-3 rounded-full hover:bg-white/5 transition"
              >
                Bookings
              </Link>
            )}

            {role === "ARTIST" && (
              <Link
                href="/dashboard/artist"
                className="border border-marquee-plum px-8 py-3 rounded-full hover:bg-white/5 transition"
              >
                Profile
              </Link>
            )}
          </div>
        </div>

        {/* ✅ FIXED Scroll cue */}
        <a
          href="#categories"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-marquee-cream/40 hover:text-marquee-amber transition-colors"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase">
            More Acts
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </a>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="bg-marquee-bg2 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Categories />
        </div>
      </section>
    </>
  );
}