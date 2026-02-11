"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function RoleRedirectPage() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams.get("role");

  useEffect(() => {
    if (status === "authenticated" && role) {
      fetch("/api/set-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      }).then(() => {
        if (role === "ARTIST") {
          router.push("/onboard");
        } else {
          router.push("/explore");
        }
      });
    }
  }, [status, role, router]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20">
        <h2 className="text-2xl font-semibold animate-pulse">
          Setting up your profile...
        </h2>
      </div>
    </div>
  );
}