

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";

// import { getArtistBookings } from "@/db/actions/bookings/getArtistBooking";
// import { getArtistAvailability } from "@/db/actions/availability/getAvailability";

// import UpcomingBookings from "@/components/artist/UpcomingBooking";
// import AvailabilityCalendar from "@/components/artist/AvailabilityCalendar";
// // import EditButton from "@/components/EditButton";

// export default async function ArtistLanding() {
//   const session = await getServerSession(authOptions);
 
//   if (!session || session.user.role !== "ARTIST") {
//     redirect("/");
//   }
//   const id =session.user.id
//   const bookings = await getArtistBookings(session.user.id);
//   const availability = await getArtistAvailability(session.user.id);

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-16 px-6 relative overflow-hidden">

//       {/* Glow Effects */}
//       <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-500 opacity-30 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-30 rounded-full blur-3xl"></div>

//       <div className="relative max-w-6xl mx-auto">
        
//         <h1 className="text-5xl font-bold">
//           Welcome, {session.user.name} 🎤
//         </h1>
//         {/* <EditButton id={id} /> */}

//         <p className="mt-4 text-purple-200 text-lg">
//           Manage your bookings and availability.
//         </p>

//         {/* BOOKINGS */}
//         <div className="mt-12">
//           <UpcomingBookings bookings={bookings} />
//         </div>

//         {/* AVAILABILITY */}
//         <div className="mt-12">
//           <AvailabilityCalendar
//             availability={availability}
//             userId={session.user.id}
//           />
//         </div>

//       </div>
//     </section>
//   );
// }

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import { getArtistBookings } from "@/db/actions/bookings/getArtistBooking";
import { getArtistAvailability } from "@/db/actions/availability/getAvailability";

import UpcomingBookings from "@/components/artist/UpcomingBooking";
import AvailabilityCalendar from "@/components/artist/AvailabilityCalendar";
// import EditProfileButton from "@/components/artist/EditProfileButton";

export default async function ArtistLanding() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ARTIST") {
    redirect("/");
  }

  const bookings = await getArtistBookings(session.user.id);
  const availability = await getArtistAvailability(session.user.id);

  const pending = bookings.filter((b: any) => b.status === "REQUESTED").length;
  const accepted = bookings.filter((b: any) => b.status === "ACCEPTED").length;
  const openDates = availability.filter((a: any) => a.isAvailable).length;

  return (
    <section className="min-h-screen bg-marquee-bg2 text-marquee-cream py-16 px-6 relative overflow-hidden">

      {/* Backstage glow — dimmer than the public hero, on purpose */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-marquee-velvet/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-marquee-amber/5 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto">

        {/* MIRROR HEADER */}
        <div className="panel p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Mirror bulb strip */}
            <div className="hidden sm:flex flex-col gap-2">
  <span className="w-2.5 h-2.5 rounded-full bg-marquee-amber bulb-dot" style={{ animationDelay: "0s" }} />
  <span className="w-2.5 h-2.5 rounded-full bg-marquee-amber bulb-dot" style={{ animationDelay: "0.3s" }} />
  <span className="w-2.5 h-2.5 rounded-full bg-marquee-amber bulb-dot" style={{ animationDelay: "0.6s" }} />
</div>

            <div>
              <p className="text-marquee-amber text-[11px] tracking-[0.3em] uppercase mb-1">
                ✦ Green Room ✦
              </p>
              <h1 className="font-display text-4xl md:text-5xl tracking-wide">
                Welcome, {session.user.name}
              </h1>
              <p className="mt-2 text-marquee-cream/60">
                Manage your bookings and availability.
              </p>
            </div>
          </div>

          {/* Edit Profile — wire up later */}
          <button
            className="shrink-0 border border-marquee-plum text-marquee-cream/80 px-6 py-3 rounded-full text-sm font-semibold hover:border-marquee-amber hover:text-marquee-amber transition self-start md:self-auto"
          >
            Edit Profile
          </button>
          {/* <EditProfileButton artistId={session.user.id} /> */}
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
          <div className="panel p-5 text-center">
            <p className="font-display text-4xl text-marquee-amber">{pending}</p>
            <p className="text-[11px] uppercase tracking-widest text-marquee-cream/50 mt-1">Pending Requests</p>
          </div>
          <div className="ticket p-5 text-center">
            <p className="font-display text-4xl text-marquee-cream">{accepted}</p>
            <p className="text-[11px] uppercase tracking-widest text-marquee-cream/50 mt-1">Confirmed Gigs</p>
          </div>
          <div className="panel p-5 text-center">
            <p className="font-display text-4xl text-marquee-cream">{openDates}</p>
            <p className="text-[11px] uppercase tracking-widest text-marquee-cream/50 mt-1">Open Dates</p>
          </div>
        </div>

        {/* BOOKINGS */}
        <div className="mt-10">
          <UpcomingBookings bookings={bookings} />
        </div>

        {/* AVAILABILITY */}
        <div className="mt-10">
          <AvailabilityCalendar
            availability={availability}
            userId={session.user.id}
          />
        </div>

      </div>
    </section>
  );
}