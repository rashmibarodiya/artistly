// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import google from "../../../public/google.svg"
// import Image from "next/image";

// export default function RegisterPage() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState<"USER" | "ARTIST">("USER");
//   const [name, setName] = useState("");
//   const [error, setError] = useState("");

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await axios.post("/api/auth/register", {
//         email,
//         name,
//         password,
//         role,
//       });

//       // 🔥 AUTO LOGIN AFTER REGISTER
//       const res = await signIn("credentials", {
//         email,
//         password,
//         redirect: false,
//       });

//       if (res?.error) {
//         setError(res.error);
//         return;
//       }

//       // ✅ now session exists
//       router.push(`/auth/role-redirect?role=${role}`);

//     } catch (err: any) {
//       setError(err?.response?.data?.error || "Something went wrong");
//     }
//   };

//   return (
//     <section className="w-full bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-14 px-6 text-white">

//       <div className="max-w-md mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">

//         <h2 className="text-3xl font-bold text-center mb-8">
//           Join Artistly
//         </h2>

//         <form onSubmit={handleRegister} className="space-y-5">

//           {/* Email */}
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           {/* Password */}
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           {/* Role Selector */}
//           <div className="space-y-2">
//             <p className="text-sm text-purple-200">Register As</p>

//             <div className="flex gap-4">
//               {["USER", "ARTIST"].map((r) => (
//                 <button
//                   type="button"
//                   key={r}
//                   onClick={() => setRole(r as "USER" | "ARTIST")}
//                   className={`flex-1 py-2 rounded-full border transition ${role === r
//                     ? "bg-yellow-400 text-black border-yellow-400"
//                     : "bg-white/20 border-white/30 hover:bg-white/30"
//                     }`}
//                 >
//                   {r}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {error && (
//             <p className="text-red-400 text-sm">{error}</p>
//           )}

//           {/* Register Button */}
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black py-3 rounded-full font-semibold hover:scale-105 transition"
//           >
//             Create Account
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="flex items-center my-6">
//           <div className="flex-1 border-t border-white/20" />
//           <span className="px-3 text-sm text-purple-300">OR</span>
//           <div className="flex-1 border-t border-white/20" />
//         </div>

//         {/* Google Auth */}
//         <button
//           type="button"
//           onClick={() =>
//             signIn("google", {
//               callbackUrl: `/auth/role-redirect?role=${role}`,
//             })
//           }
//           className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white shadow-lg cursor-pointer
//   p-3 rounded-xl hover:bg-white/30 transition"
//         >
//           <Image
//             src={google}
//             alt="Google logo"
//             width={20}
//             height={20}
//           />
//           <span>Continue with Google</span>
//         </button>
//         <button
//           type="button"
//           onClick={() =>
//             router.push("/login")
//           }
//           className="w-full bg-gradient-to-r mt-3 from-purple-900 via-purple-800 to-indigo-900 text-white shadow-lg p-3 rounded-xl cursor-pointer hover:bg-purple/30 transition"
//         >
//           Already have an account
//         </button>
//       </div>
//     </section>
//   );
// }


"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import google from "../../../public/google.svg";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"USER" | "ARTIST">("USER");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("/api/auth/register", {
        email,
        name,
        password,
        role,
      });

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        return;
      }

      router.push(`/auth/role-redirect?role=${role}`);

    } catch (err: any) {
      setError(err?.response?.data?.error || "Something went wrong");
    }
  };

  const inputStyle =
    "w-full px-4 py-2 rounded-lg bg-marquee-bg border border-marquee-plum text-marquee-cream placeholder-marquee-cream/40 focus:outline-none focus:ring-2 focus:ring-marquee-amber transition";

  return (
    <section className="w-full  bg-gradient-to-b from-marquee-bg to-marquee-bg2 py-8 px-6 relative overflow-hidden flex items-center justify-center">

      {/* Spotlight beam */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(232,163,61,0.18) 0%, rgba(232,163,61,0) 65%)",
        }}
      />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-marquee-velvet/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-marquee-amber/10 rounded-full blur-3xl" />

      {/* PASS CARD */}
      <div className="relative max-w-md w-full">

        {/* Lanyard hole */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-marquee-bg2 border-2 border-marquee-plum z-10" />

        <div className="relative bg-marquee-card border border-marquee-plum rounded-3xl pt-8 pb-8 px-8 shadow-2xl">

          <p className="text-center text-marquee-amber text-[11px] tracking-[0.3em] uppercase mb-1">
            ✦ Artistly Access Pass ✦
          </p>
          <h2 className="font-display text-4xl tracking-wide text-center text-marquee-cream mb-8">
            Get Your Pass
          </h2>

          <form onSubmit={handleRegister} className="space-y-2">

            <input
              type="email"
              placeholder="Email"
              className={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Full Name"
              className={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Pass tier selector */}
            <div className="space-y-2 pt-1">
              <p className="text-[11px] uppercase tracking-widest text-marquee-cream/50">
                Choose your pass
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("USER")}
                  className={`relative py-2 rounded-xl border text-sm font-semibold transition overflow-hidden ${
                    role === "USER"
                      ? "border-marquee-amber bg-marquee-bg text-marquee-cream"
                      : "border-marquee-plum text-marquee-cream/50 hover:border-marquee-cream/30"
                  }`}
                >
                  {role === "USER" && (
                    <span className="absolute top-1 right-1 text-[8px] tracking-widest text-marquee-amber">
                      ●
                    </span>
                  )}
                  GUEST
                  <span className="block text-[10px] font-normal tracking-widest text-marquee-cream/40 mt-0.5">
                    BOOK ARTISTS
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("ARTIST")}
                  className={`relative py-3 rounded-xl border text-sm font-semibold transition overflow-hidden ${
                    role === "ARTIST"
                      ? "border-marquee-amber bg-marquee-amber/10 text-marquee-amber"
                      : "border-marquee-plum text-marquee-cream/50 hover:border-marquee-cream/30"
                  }`}
                >
                  {role === "ARTIST" && (
                    <span className="absolute -top-1 -right-8 w-24 text-center text-[9px] tracking-widest bg-marquee-amber text-marquee-bg rotate-45 py-0.5">
                      ALL ACCESS
                    </span>
                  )}
                  ARTIST
                  <span className="block text-[10px] font-normal tracking-widest opacity-60 mt-0.5">
                    GET BOOKED
                  </span>
                </button>
              </div>
            </div>

            {error && (
              <p className="text-marquee-velvet text-sm bg-marquee-velvet/10 border border-marquee-velvet/30 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-marquee-amber text-marquee-bg py-2 rounded-full font-semibold hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(232,163,61,0.35)] transition"
            >
              Create Account
            </button>
          </form>

          {/* Perforated tear line */}
          <div className="relative my-4">
            <div className="border-t border-dashed border-marquee-plum" />
            <span className="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-marquee-bg2" />
            <span className="absolute -right-8 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-marquee-bg2" />
          </div>

          <button
            type="button"
            onClick={() =>
              signIn("google", {
                callbackUrl: `/auth/role-redirect?role=${role}`,
              })
            }
            className="w-full flex items-center justify-center gap-3 bg-marquee-bg border border-marquee-plum text-marquee-cream cursor-pointer p-3 rounded-xl hover:border-marquee-cream/40 transition"
          >
            <Image src={google} alt="Google logo" width={20} height={20} />
            <span className="text-sm">Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full mt-3 text-marquee-cream/50 text-sm hover:text-marquee-amber transition"
          >
            Already have a pass? <span className="underline">Sign in</span>
          </button>
        </div>
      </div>
    </section>
  );
}