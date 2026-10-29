import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = [
    '/profile',
    '/messages',
    '/notifications',
    '/settings',
    '/create',
    '/ai',
    '/ai/history',
    '/admin'
  ];

  const isProtected = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  if (isProtected) {
    const authCookie = request.cookies.get('sb-access-token');
    if (!authCookie) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/messages/:path*', '/notifications/:path*', '/settings/:path*', '/create/:path*', '/ai/:path*', '/admin/:path*']
};
