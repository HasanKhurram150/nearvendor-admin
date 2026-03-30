import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const { pathname } = request.nextUrl;

  // 1. Define sets for protected and public routes
  const protectedPaths = [
    "/",
    "/user-management",
    "/vendor-applications",
    "/user",
    "/mint-nft",
    "/vendor-application",
  ];
  const authPaths = [
    "/signin",
    "/signup",
    "/reset-password",
    "/create-new-password",
  ];

  const isProtectedPath = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/"),
  );
  const isAuthPath = authPaths.some((path) => pathname === path);

  // 2. Redirect to signin if accessing protected path without token
  if (isProtectedPath && !token) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // 3. Redirect away from signin if already authenticated
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// 4. Optimization: Only run on pages (skip static files/api)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
};
