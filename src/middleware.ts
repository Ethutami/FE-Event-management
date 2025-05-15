import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { IUser } from "./interfaces/auth.interface";
import { jwtDecode } from "jwt-decode";

export default async function middleware(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    const protectedRoute = req.nextUrl.pathname === "/dashboard";

    const access_token = cookieStore.get("access_token")?.value || "";

    if (protectedRoute && access_token) {
      const user = jwtDecode<IUser>(access_token);
      if (user.role === "organizer") {
        return NextResponse.next(); // Allow access to the dashboard
      }
    }

    if (protectedRoute && !access_token) {
      return NextResponse.redirect(new URL("/signin", req.nextUrl));
    }

    return NextResponse.redirect(new URL("/signin", req.nextUrl)); // Redirect if not an organizer
  } catch (err) {
    console.log(err);

    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"], // Apply middleware to all paths under /dashboard
};