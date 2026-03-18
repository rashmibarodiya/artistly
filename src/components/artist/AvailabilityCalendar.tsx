"use client";

import { useState } from "react";
import { toggleAvailability } from "@/db/actions/availability/toggleAvailability";
export default function AvailabilityCalendar({
  availability,
  userId,
}: any) {
  const [date, setDate] = useState("");

  async function handleAdd() {
    if (!date) return;

    await toggleAvailability(userId, new Date(date));
    window.location.reload();
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">

      <h2 className="text-2xl font-semibold mb-6">
        Availability
      </h2>

      {/* Add date */}
      <div className="flex gap-4 mb-6">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-white/20 text-white p-2 rounded outline-none"
        />

        <button
          onClick={handleAdd}
          className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600 transition"
        >
          Toggle
        </button>
      </div>

      {/* Show existing */}
      <div className="space-y-3">
        {availability.map((a: any) => (
          <div
            key={a._id}
            className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/10"
          >
            <span>
              {new Date(a.date).toDateString()}
            </span>

            <span
              className={
                a.isAvailable
                  ? "text-green-300"
                  : "text-red-300"
              }
            >
              {a.isAvailable ? "Available" : "Blocked"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}