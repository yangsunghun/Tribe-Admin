import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // 로그인 여부 확인
  const isLoggedIn = request.cookies.has("logged-in");

  // 로그인이 필요한 페이지 목록
  const protectedRoutes = ["/members", "/meetings"];

  // 현재 경로가 보호된 경로인지 확인
  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  // 로그인이 필요한 페이지에 접근하려고 할 때 로그인되어 있지 않으면 로그인 페이지로 리다이렉트
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 로그인되어 있는 상태에서 로그인 페이지에 접근하려고 하면 메인 페이지로 리다이렉트
  if (request.nextUrl.pathname === "/auth/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/members/list", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/main/:path*", "/admin/:path*", "/api/:path*"]
};
