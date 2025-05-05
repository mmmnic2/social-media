import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const accessToken = res?.accessToken;
  const expireTime = res?.expireTime;
  const refreshToken = res?.refreshToken;

  if (!accessToken || !expireTime || !refreshToken) {
    return Response.json({ message: "Invalid data" }, { status: 400 });
  }

  (await cookies()).set({
    name: "sessionToken",
    value: accessToken,
    httpOnly: true,
    path: "/",
    maxAge: Math.floor(expireTime / 1000),
  });

  (await cookies()).set({
    name: "refreshToken",
    value: refreshToken,
    httpOnly: true,
    path: "/",
    maxAge: Math.floor(86400000 / 1000),
  });
  return Response.json("Login success!", { status: 200 });
}
