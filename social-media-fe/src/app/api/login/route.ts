import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res?.accessToken;
  const expireTime = res?.expireTime;
  cookies().set({
    name: "sessionToken",
    value: sessionToken,
    httpOnly: true,
    path: "/",
    maxAge: expireTime / 1000,
  });
  return Response.json("Login success!", { status: 200 });
}
