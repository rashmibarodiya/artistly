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
    <div className="bg-gray-800 p-6 rounded-2xl">

      <h2 className="text-2xl font-semibold mb-4">
        Availability
      </h2>

      {/* Add date */}
      <div className="flex gap-4 mb-6">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="text-black p-2 rounded"
        />

        <button
          onClick={handleAdd}
          className="bg-purple-600 px-4 py-2 rounded"
        >
          Toggle
        </button>
      </div>

      {/* Show existing */}
      <div className="space-y-2">

        {availability.map((a: any) => (
          <div
            key={a._id}
            className="flex justify-between border-b border-gray-700 pb-2"
          >
            <span>
              {new Date(a.date).toDateString()}
            </span>

            <span
              className={
                a.isAvailable
                  ? "text-green-400"
                  : "text-red-400"
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