"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"USER" | "ARTIST">("USER");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("/api/auth/register", {
        email,
        password,
        role,
      });

      router.push("/login");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-24 px-6 text-white">

      <div className="max-w-md mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl">

        <h2 className="text-3xl font-bold text-center mb-8">
          Join Artistly
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">

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

          {/* Role Selector */}
          <div className="space-y-2">
            <p className="text-sm text-purple-200">Register As</p>

            <div className="flex gap-4">
              {["USER", "ARTIST"].map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r as "USER" | "ARTIST")}
                  className={`flex-1 py-2 rounded-full border transition ${
                    role === r
                      ? "bg-yellow-400 text-black border-yellow-400"
                      : "bg-white/20 border-white/30 hover:bg-white/30"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Create Account
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
      callbackUrl: `/auth/role-redirect?role=${role}`,
    })
  }
  className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white p-3 rounded-xl hover:bg-white/30 transition"
>
  Continue with Google
</button>
      </div>
    </section>
  );
}