// "use client";

// import { useState } from "react";
// import { toggleAvailability } from "@/db/actions/availability/toggleAvailability";
// export default function AvailabilityCalendar({
//   availability,
//   userId,
// }: any) {
//   const [date, setDate] = useState("");

//   async function handleAdd() {
//     if (!date) return;

//     await toggleAvailability(userId, new Date(date));
//     window.location.reload();
//   }

//   return (
//     <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">

//       <h2 className="text-2xl font-semibold mb-6">
//         Availability
//       </h2>

//       {/* Add date */}
//       <div className="flex gap-4 mb-6">
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           className="bg-white/20 text-white p-2 rounded outline-none"
//         />

//         <button
//           onClick={handleAdd}
//           className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600 transition"
//         >
//           Toggle
//         </button>
//       </div>

//       {/* Show existing */}
//       <div className="space-y-3">
//         {availability.map((a: any) => (
//           <div
//             key={a._id}
//             className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/10"
//           >
//             <span>
//               {new Date(a.date).toDateString()}
//             </span>

//             <span
//               className={
//                 a.isAvailable
//                   ? "text-green-300"
//                   : "text-red-300"
//               }
//             >
//               {a.isAvailable ? "Available" : "Blocked"}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { toggleAvailability } from "@/db/actions/availability/toggleAvailability";

export default function AvailabilityCalendar({ availability, userId }: any) {
  const [date, setDate] = useState("");

  async function handleAdd() {
    if (!date) return;
    await toggleAvailability(userId, new Date(date));
    window.location.reload();
  }

  return (
    <div className="panel p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl tracking-wide">Tour Ledger</h2>
        <span className="text-[11px] uppercase tracking-widest text-marquee-cream/40">
          {availability.length} Dates Logged
        </span>
      </div>

      {/* Add date */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-marquee-bg text-marquee-cream border border-marquee-plum p-3 rounded-lg outline-none focus:ring-2 focus:ring-marquee-amber transition"
        />
        <button
          onClick={handleAdd}
          className="bg-marquee-amber text-marquee-bg px-6 py-3 rounded-full font-semibold hover:scale-[1.02] transition"
        >
          Toggle Date
        </button>
      </div>

      {/* Show existing */}
      {!availability.length ? (
        <p className="text-marquee-cream/40 text-sm py-6 text-center border border-dashed border-marquee-plum rounded-xl">
          No dates logged yet — add one above.
        </p>
      ) : (
        <div className="space-y-3">
          {availability.map((a: any) => (
            <div
              key={a._id}
              className="flex justify-between items-center p-3 rounded-lg bg-marquee-bg border border-marquee-plum"
            >
              <span className="text-marquee-cream/80 font-mono text-sm">
                {new Date(a.date).toDateString()}
              </span>

              <span
                className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-widest ${
                  a.isAvailable ? "text-marquee-amber" : "text-marquee-velvet"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    a.isAvailable ? "bg-marquee-amber" : "bg-marquee-velvet"
                  }`}
                />
                {a.isAvailable ? "Available" : "Blocked"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}