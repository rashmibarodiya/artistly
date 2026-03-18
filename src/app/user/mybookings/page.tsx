import UserBookings from "@/components/UserBookings";
import { getUserBookings } from "@/db/actions/bookings/getUserBookings";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export default async function MyBookings(){
   const session = await getServerSession(authOptions);
   
     if (!session || session.user.role !== "USER") {
       redirect("/");
     }
   
    const bookings = await getUserBookings(session?.user.id)

    return (<>
    <UserBookings bookings = {bookings}></UserBookings>
    </>)
}