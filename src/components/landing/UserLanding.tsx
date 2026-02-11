import Link from "next/link";
import Categories from "@/components/Categories";

export default function UserLanding() {
  return (
    <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-20 px-6 relative overflow-hidden">

      {/* Soft background glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-500 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-30 rounded-full blur-3xl"></div>

      {/* Glass Hero Card */}
      <div className="relative max-w-5xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-16 shadow-2xl text-center">

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Book Extraordinary Talent
        </h1>

        <p className="mt-6 text-xl text-purple-200 max-w-2xl mx-auto">
          Singers, DJs, Dancers, Speakers — Find the perfect performer for your next event.
        </p>

        <div className="mt-10 flex justify-center gap-6 flex-wrap">
          <Link
            href="/artists"
            className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:scale-105 hover:shadow-xl transition"
          >
            Explore Artists
          </Link>

          <Link
            href="/register"
            className="bg-white/20 backdrop-blur-md border border-white/30 px-8 py-3 rounded-full hover:bg-white hover:text-purple-900 transition"
          >
            Join Now
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-20 max-w-6xl mx-auto">
        <Categories />
      </div>
    </section>
  );
}