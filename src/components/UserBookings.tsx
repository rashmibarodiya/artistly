// export default function UserBookings({ bookings }: any) {
//   if (!bookings?.length) {
//     return <p className="text-gray-400">No bookings yet.</p>;
//   }

//   return (
//     <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-20 px-6 relative overflow-hidden min-h-screen">

//       {/* Glow */}
//       <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-500 opacity-30 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-30 rounded-full blur-3xl"></div>

//       <div className="relative max-w-4xl mx-auto">
//         <h2 className="text-4xl font-bold mb-10">Bookings</h2>

//         <div className="space-y-6">
//           {bookings.map((booking: any) => (
//             <div
//               key={booking._id}
//               className="bg-white/10 backdrop-blur-lg p-5 rounded-xl flex justify-between items-center border border-white/20"
//             >
//               <div>
//                 <p className="text-lg font-semibold">
//                   {booking.eventType}
//                 </p>

//                 <p className="text-sm text-purple-300">
//                   Artist: {booking.artistId?.userId?.name || "Unknown"}
//                 </p>

//                 <p className="text-sm text-gray-300">
//                   {booking.eventLocation.city}
//                 </p>
//               </div>

//               <div className="text-right">
//                 <p className="text-sm">
//                   {new Date(booking.eventDate).toDateString()}
//                 </p>

//                 {booking.status === "REQUESTED" ? (
//                   <p className="text-yellow-400 mt-1">REQUESTED</p>
//                 ) : booking.status === "ACCEPTED" ? (
//                   <p className="text-green-400 mt-1">ACCEPTED</p>
//                 ) : (
//                   <p className="text-red-400 mt-1">REJECTED</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

export default function UserBookings({ bookings }: any) {
  const statusStyle: Record<string, string> = {
    REQUESTED: "text-marquee-cream/60 border-marquee-plum bg-marquee-bg",
    ACCEPTED: "text-marquee-amber border-marquee-amber/40 bg-marquee-amber/10",
    REJECTED: "text-marquee-velvet border-marquee-velvet/40 bg-marquee-velvet/10",
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-marquee-bg to-marquee-bg2 text-marquee-cream py-16 px-6 relative overflow-hidden">

      <div className="absolute -top-32 -left-32 w-96 h-96 bg-marquee-velvet/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-marquee-amber/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto">

        <p className="text-marquee-amber text-[11px] tracking-[0.3em] uppercase mb-2">
          ✦ Your Stubs ✦
        </p>
        <h2 className="font-display text-5xl tracking-wide mb-10">
          Bookings
        </h2>

        {!bookings?.length ? (
          <div className="panel p-10 text-center">
            <p className="text-marquee-cream/50">
              No bookings yet — your booked events will show up here as ticket stubs.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking: any) => (
              <div
                key={booking._id}
                className="ticket flex flex-col sm:flex-row overflow-hidden hover:border-marquee-amber/40 transition"
              >
                {/* LEFT — event info */}
                <div className="flex-1 p-5">
                  <p className="font-display text-2xl tracking-wide text-marquee-cream">
                    {booking.eventType}
                  </p>
                  <p className="text-sm text-marquee-amber mt-1">
                    {booking.artistId?.userId?.name || "Unknown Artist"}
                  </p>
                  <p className="text-sm text-marquee-cream/50 mt-0.5">
                    {booking.eventLocation?.city || "Location TBD"}
                  </p>
                </div>

                {/* TEAR LINE */}
                {/* <div className="hidden sm:block w-px border-l border-dashed border-marquee-plum my-4" />
                <div className="sm:hidden h-px border-t border-dashed border-marquee-plum mx-5" /> */}

                {/* RIGHT — date + status stamp */}
                <div className="p-5 flex sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-3 sm:w-48 shrink-0">
                  <p className="text-sm text-marquee-cream/60 font-mono">
                    {new Date(booking.eventDate).toDateString()}
                  </p>
                  <span
                    className={`text-xs font-semibold uppercase tracking-widest border rounded-full px-3 py-1 ${
                      statusStyle[booking.status] ?? statusStyle.REQUESTED
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}