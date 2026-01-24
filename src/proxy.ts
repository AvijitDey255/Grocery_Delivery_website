import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "node:url";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const publicRouters = [
    "/login",
    "/register",
    "/api/auth",
  ];
  if (publicRouters.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  console.log(token);
  console.log(req.url);
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
