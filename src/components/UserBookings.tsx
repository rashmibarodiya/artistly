export default function UserBookings({ bookings }: any) {
  if (!bookings?.length) {
    return <p className="text-gray-400">No bookings yet.</p>;
  }

  return (
    <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-20 px-6 relative overflow-hidden min-h-screen">

      {/* Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-500 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-30 rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-10">My Bookings</h2>

        <div className="space-y-6">
          {bookings.map((booking: any) => (
            <div
              key={booking._id}
              className="bg-white/10 backdrop-blur-lg p-5 rounded-xl flex justify-between items-center border border-white/20"
            >
              <div>
                <p className="text-lg font-semibold">
                  {booking.eventType}
                </p>

                <p className="text-sm text-purple-300">
                  Artist: {booking.artistId?.userId?.name || "Unknown"}
                </p>

                <p className="text-sm text-gray-300">
                  {booking.eventLocation.city}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm">
                  {new Date(booking.eventDate).toDateString()}
                </p>

                {booking.status === "REQUESTED" ? (
                  <p className="text-yellow-400 mt-1">REQUESTED</p>
                ) : booking.status === "ACCEPTED" ? (
                  <p className="text-green-400 mt-1">ACCEPTED</p>
                ) : (
                  <p className="text-red-400 mt-1">REJECTED</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}