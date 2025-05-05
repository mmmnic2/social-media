import { NextRequest, NextResponse } from "next/server";
import { getUserProfile } from "@/api/user";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ user: null }, { status: 401 });

  const user = await getUserProfile();
  return NextResponse.json(user);
}
