"use client";

import { useRouter } from "next/navigation";

export default function EditButton({ id }: { id: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/EditProfile/${id}`)}
      className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-semibold cursor-pointer 
      transition duration-200 ease-in-out hover:bg-yellow-300 hover:scale-105 hover:shadow-xl 
      active:scale-95"
    >
      Edit Profile
    </button>
  );
}