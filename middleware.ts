import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it
  if (path === "/") {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session && path === "/profill") {
    return NextResponse.redirect(new URL("/innskra", req.url));
  } else if (session && (path === "/innskra" || path === "/register")) {
    return NextResponse.redirect(new URL("/profill", req.url));
  }
  return NextResponse.next();
}
