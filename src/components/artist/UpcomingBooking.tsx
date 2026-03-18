"use client";

import { useRouter } from "next/navigation";
import { updateBookingStatus } from "@/db/actions/bookings/updateBookingStatus";
export default function UpcomingBookings({ bookings }: any) {
  const router = useRouter();

  const handleAction = async (
    bookingId: string,
    status: "ACCEPTED" | "REJECTED"
  ) => {
    await updateBookingStatus(bookingId, status);
    router.refresh();
  };

  if (!bookings.length) {
    return <p className="text-purple-200">No bookings yet.</p>;
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">

      <h2 className="text-2xl font-semibold mb-6">
        Upcoming Bookings
      </h2>

      <div className="space-y-5">
        {bookings.map((booking: any) => (
          <div
            key={booking._id}
            className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            <div>
              <p className="text-lg font-semibold">
                {booking.eventType}
              </p>

              <p className="text-sm text-purple-200">
                {booking.eventLocation.city}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm">
                {new Date(booking.eventDate).toDateString()}
              </p>

              {booking.status === "REQUESTED" ? (
                <div className="flex gap-3 justify-end mt-2">
                  <button
                    onClick={() =>
                      handleAction(booking._id, "ACCEPTED")
                    }
                    className="bg-green-500/20 text-green-300 px-3 py-1 rounded hover:bg-green-500/30 transition"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      handleAction(booking._id, "REJECTED")
                    }
                    className="bg-red-500/20 text-red-300 px-3 py-1 rounded hover:bg-red-500/30 transition"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <p
                  className={`mt-2 text-sm ${
                    booking.status === "ACCEPTED"
                      ? "text-green-300"
                      : "text-red-300"
                  }`}
                >
                  {booking.status}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}