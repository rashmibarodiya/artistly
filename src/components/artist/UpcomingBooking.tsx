// "use client";

// import { useRouter } from "next/navigation";
// import { updateBookingStatus } from "@/db/actions/bookings/updateBookingStatus";
// export default function UpcomingBookings({ bookings }: any) {
//   const router = useRouter();

//   const handleAction = async (
//     bookingId: string,
//     status: "ACCEPTED" | "REJECTED"
//   ) => {
//     await updateBookingStatus(bookingId, status);
//     router.refresh();
//   };

//   if (!bookings.length) {
//     return <p className="text-purple-200">No bookings yet.</p>;
//   }

//   return (
//     <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">

//       <h2 className="text-2xl font-semibold mb-6">
//         Upcoming Bookings
//       </h2>

//       <div className="space-y-5">
//         {bookings.map((booking: any) => (
//           <div
//             key={booking._id}
//             className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
//           >
//             <div>
//               <p className="text-lg font-semibold">
//                 {booking.eventType}
//               </p>

//               <p className="text-sm text-purple-200">
//                 {booking.eventLocation.city}
//               </p>
//             </div>

//             <div className="text-right">
//               <p className="text-sm">
//                 {new Date(booking.eventDate).toDateString()}
//               </p>

//               {booking.status === "REQUESTED" ? (
//                 <div className="flex gap-3 justify-end mt-2">
//                   <button
//                     onClick={() =>
//                       handleAction(booking._id, "ACCEPTED")
//                     }
//                     className="bg-green-500/20 text-green-300 px-3 py-1 rounded hover:bg-green-500/30 transition"
//                   >
//                     Accept
//                   </button>

//                   <button
//                     onClick={() =>
//                       handleAction(booking._id, "REJECTED")
//                     }
//                     className="bg-red-500/20 text-red-300 px-3 py-1 rounded hover:bg-red-500/30 transition"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               ) : (
//                 <p
//                   className={`mt-2 text-sm ${
//                     booking.status === "ACCEPTED"
//                       ? "text-green-300"
//                       : "text-red-300"
//                   }`}
//                 >
//                   {booking.status}
//                 </p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
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

  return (
    <div className="panel p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl tracking-wide">Call Sheet</h2>
        <span className="text-[11px] uppercase tracking-widest text-marquee-cream/40">
          {bookings.length} {bookings.length === 1 ? "Request" : "Requests"}
        </span>
      </div>

      {!bookings.length ? (
        <p className="text-marquee-cream/40 text-sm py-6 text-center border border-dashed border-marquee-plum rounded-xl">
          No bookings yet — requests will show up here.
        </p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking: any) => (
            <div
              key={booking._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-marquee-bg border border-marquee-plum hover:border-marquee-amber/40 transition"
            >
              <div>
                <p className="text-lg font-semibold text-marquee-cream">
                  {booking.eventType}
                </p>
                <p className="text-sm text-marquee-cream/50">
                  {booking.eventLocation.city}
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-sm text-marquee-cream/60 font-mono">
                  {new Date(booking.eventDate).toDateString()}
                </p>

                {booking.status === "REQUESTED" ? (
                  <div className="flex gap-3 sm:justify-end mt-2">
                    <button
                      onClick={() => handleAction(booking._id, "ACCEPTED")}
                      className="bg-marquee-amber/15 text-marquee-amber border border-marquee-amber/30 px-3 py-1 rounded-full text-sm hover:bg-marquee-amber/25 transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(booking._id, "REJECTED")}
                      className="bg-marquee-velvet/15 text-marquee-velvet border border-marquee-velvet/30 px-3 py-1 rounded-full text-sm hover:bg-marquee-velvet/25 transition"
                    >
                      Decline
                    </button>
                  </div>
                ) : (
                  <p
                    className={`mt-2 text-sm font-semibold uppercase tracking-widest ${
                      booking.status === "ACCEPTED"
                        ? "text-marquee-amber"
                        : "text-marquee-velvet"
                    }`}
                  >
                    {booking.status}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}