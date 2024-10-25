import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { authenticate } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  console.log("Middleware triggered for:", req.nextUrl.pathname); // Log the current path
  const token = req.cookies.get("token")?.value || "";
  console.log("Token found:", token); // Log the token value
  const decoded = await authenticate(token);
  if (!decoded) {
    console.log("Token is invalid or expired, redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/", "/users"], // Add your protected routes here
};
