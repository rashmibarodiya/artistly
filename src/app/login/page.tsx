"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (res?.error) {
    setError(res.error);
    return;
  }

  const session = await getSession();

  if (session?.user?.role === "ARTIST") {
    router.push("/dashboard/artist");
  } else {
    router.push("/");
  }
};
  return (
    <section className="w-full bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-24 px-6 text-white">

      <div className="max-w-md mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl">

        <h2 className="text-3xl font-bold text-center mb-8">
          Join Artistly
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />



          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-white/20" />
          <span className="px-3 text-sm text-purple-300">OR</span>
          <div className="flex-1 border-t border-white/20" />
        </div>

        {/* Google Auth */}
        <button
          type="button"
          onClick={() =>
            signIn("google", {
              callbackUrl: ``,
            })
          }
          className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white p-3 rounded-xl hover:bg-white/30 transition"
        >
          Continue with Google
        </button>
         {/* login */}
        <button
          type="button"
          onClick={() =>
            router.push("/register")
          }
          className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white p-3 rounded-xl hover:bg-white/30 transition"
        >
          Don't have an account
        </button>
      </div>
    </section>
  );
}