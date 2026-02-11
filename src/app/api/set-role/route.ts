import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/db/connect";
import { User } from "@/db/schema/User";

export async function POST(req: Request) {
    
  const session = await getServerSession(authOptions);
  const { role } = await req.json();
console.log("SESSION:", session);
console.log("ROLE RECEIVED:", role);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  await User.findOneAndUpdate(
    { email: session.user.email },
    { role },
    { new: true }
  );

  return NextResponse.json({ success: true });
}