import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Session ended" });
  response.cookies.set({
    name: "sessionToken",
    value: "",
    maxAge: 0,
    path: "/",
  });
  return response;
}
