import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function proxy(req) {
  const token = await getToken({ req });

  const isLoginPage = req.nextUrl.pathname.startsWith("/login");

  // If not logged in → send to login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If logged in and tries to access login → send to dashboard
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/contacts", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|.*\\..*).*)",
  ],
};