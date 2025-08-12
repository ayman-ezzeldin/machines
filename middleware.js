import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const isAuth = await getToken({req: request})
  const protectedRoutes = ['/profile'];
  const isAuthRoute = pathname.startsWith('/auth') 
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (!isAuth && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  if (isAuth && isAuthRoute) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

}, {
  callbacks: {
    authorized: () => {
      return true;
    },
  },
})


export const config ={
  matcher: ['/profile/:path*', '/auth/:path*'],
}