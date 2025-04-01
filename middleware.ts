import { NextRequest, NextResponse } from "next/server"
import { serialize } from "cookie"
import { verifyToken } from "./lib/utils"

// Middleware function to handle authentication and redirection
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const adminToken = req.cookies.get("adminToken")?.value
  const isAuthPage = ["/sign-in", "/sign-up", "/email-verification"].includes(
    req.nextUrl.pathname
  )
  const isAdminAuthPage = ["/admin/sign-in", "/admin/sign-up"].includes(
    req.nextUrl.pathname
  )
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin")
  const isPasswordPage = ["/forgot-password", "/reset-password"].includes(
    req.nextUrl.pathname
  )
  const isPublicPage = [
    "/",
    "/about-us",
    "/privacy-policy",
    "/terms-condition",
    "/virtual-tour",
    "/virtual-tour/view",
    "/sentry-example-page",
  ].includes(req.nextUrl.pathname)

  // Handle regular user token
  if (token) {
    const user = await verifyToken(token)

    // Redirect authenticated users away from auth pages
    if (user && (isAuthPage || isPasswordPage)) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    // Handle expired or invalid token
    if (!user) {
      const expiredCookie = serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: new Date(0),
      })
      const response = NextResponse.redirect(
        new URL("/sign-in?modal=Session expired", req.url)
      )
      response.headers.set("Set-Cookie", expiredCookie)
      return response
    }
  }

  // Handle admin user token
  if (adminToken) {
    const adminUser = await verifyToken(adminToken)

    // Redirect authenticated admin users away from admin auth pages
    if (adminUser && isAdminAuthPage) {
      return NextResponse.redirect(new URL("/admin", req.url))
    }

    // Handle expired or invalid admin token
    if (!adminUser) {
      const expiredAdminCookie = serialize("adminToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: new Date(0),
      })
      const response = NextResponse.redirect(
        new URL("/admin/sign-in?modal=Session expired", req.url)
      )
      response.headers.set("Set-Cookie", expiredAdminCookie)
      return response
    }
  }

  // Redirect unauthenticated users trying to access protected pages
  if (
    !token &&
    !isAuthPage &&
    !isAdminPage &&
    !isPasswordPage &&
    !isPublicPage
  ) {
    return NextResponse.redirect(new URL("/sign-in", req.url))
  }

  // Redirect unauthenticated admin users trying to access protected admin pages
  if (!adminToken && isAdminPage && !isAdminAuthPage) {
    return NextResponse.redirect(new URL("/admin/sign-in", req.url))
  }

  return NextResponse.next()
}

// Configuration for the middleware to match specific routes
export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/email-verification",
    "/about-us",
    "/privacy-policy",
    "/terms-condition",
    "/virtual-tour",
    "/virtual-tour/view",
    "/my-account",
    "/my-reservations",
    "/reservation/:path*",
    "/admin/:path*",
    "/sentry-example-page",
  ], // List of protected pages and auth pages
}
