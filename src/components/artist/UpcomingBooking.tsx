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
    return <p className="text-gray-400">No bookings yet.</p>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Bookings</h2>

      <div className="space-y-4">
        {bookings.map((booking: any) => (
          <div
            key={booking._id}
            className="flex justify-between border-b border-gray-700 pb-3"
          >
            <div>
              <p className="font-medium">{booking.eventType}</p>
              <p className="text-sm text-gray-400">
                {booking.eventLocation.city}
              </p>
            </div>

            <div className="text-right">
              <p>{new Date(booking.eventDate).toDateString()}</p>

              {booking.status === "REQUESTED" ? (
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => handleAction(booking._id, "ACCEPTED")}
                    className="text-green-400"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleAction(booking._id, "REJECTED")}
                    className="text-red-400"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <p className="text-sm text-purple-400">{booking.status}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}