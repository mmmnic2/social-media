import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res?.accessToken;
  cookies().set({
    name: "sessionToken",
    value: sessionToken,
    httpOnly: true,
    path: "/",
  });
  return Response.json({ res });
}
