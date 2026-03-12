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
      <button
        onClick={() => setOpen(true)}
        className="mt-2 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
      >
        Send Booking Request
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">

          <div className="bg-white text-black p-6 rounded-xl w-[400px] space-y-4">

            <h2 className="text-xl font-semibold">
              Book {artist.category}
            </h2>

            <input
              name="eventType"
              placeholder="Event Type (Wedding, Birthday)"
              className="w-full border p-2 rounded"
              onChange={handleChange}
            />

            <input
              type="date"
              name="eventDate"
              className="w-full border p-2 rounded"
              onChange={handleChange}
            />

            <input
              name="city"
              placeholder="City"
              className="w-full border p-2 rounded"
              onChange={handleChange}
            />

            <input
              name="address"
              placeholder="Address"
              className="w-full border p-2 rounded"
              onChange={handleChange}
            />

            <input
              type="number"
              name="quotedPrice"
              placeholder="Budget"
              className="w-full border p-2 rounded"
              value={form.quotedPrice}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Message for artist"
              className="w-full border p-2 rounded"
              onChange={handleChange}
            />

            <div className="flex justify-between">

              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-purple-600 text-white px-4 py-2 rounded"
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