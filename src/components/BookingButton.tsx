"use client";

import { useState } from "react";
import { createBooking } from "@/db/actions/bookings/createBooking";

export default function BookingButton({ artist }: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    eventType: "",
    eventDate: "",
    city: "",
    address: "",
    quotedPrice: artist.priceRange?.min || 0,
    message: "",
  });

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      await createBooking({
        artistId: artist._id,
        ...form,
      });

      alert("Booking request sent!");
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to send booking");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-semibold cursor-pointer
        transition duration-200 ease-in-out hover:bg-yellow-300 hover:scale-105 hover:shadow-xl 
        active:scale-95"
      >
        Send Booking Request
      </button>

      {/* Modal */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 flex items-center justify-center 
          bg-black/40 backdrop-blur-lg z-50"
        >
          {/* Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="backdrop-blur-2xl 
            bg-gradient-to-br from-black-900/40 via-black-700/30 to-indigo-900/40 
            border border-purple-300/20 
            py-12 px-6 text-white rounded-2xl w-[400px] space-y-4 
            shadow-2xl shadow-purple-900/40 ring-1 ring-white/10"
          >
            <h2 className="text-xl font-semibold">
              Book {artist.category}
            </h2>

            <input
              name="eventType"
              placeholder="Event Type (Wedding, Birthday)"
              className="w-full p-2 rounded bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-400"
              onChange={handleChange}
            />

            <input
              type="date"
              name="eventDate"
              className="w-full p-2 rounded bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-400"
              onChange={handleChange}
            />

            <input
              name="city"
              placeholder="City"
              className="w-full p-2 rounded bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-400"
              onChange={handleChange}
            />

            <input
              name="address"
              placeholder="Address"
              className="w-full p-2 rounded bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-400"
              onChange={handleChange}
            />

            <input
              type="number"
              name="quotedPrice"
              value={form.quotedPrice}
              className="w-full p-2 rounded bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-400"
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Message for artist"
              className="w-full p-2 rounded bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-400"
              onChange={handleChange}
            />

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded border border-white/20 hover:bg-white/10 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded
                transition duration-200 ease-in-out hover:bg-yellow-300 hover:scale-105 hover:shadow-xl active:scale-95"
              >
                {loading ? "Sending..." : "Send Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}