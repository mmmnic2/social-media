import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  request.cookies.delete("sessionToken");
  return NextResponse.redirect(new URL("/login", request.url));
}
