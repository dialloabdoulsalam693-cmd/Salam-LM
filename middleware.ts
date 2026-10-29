import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/profile', '/messages', '/notifications', '/settings', '/create', '/ai', '/admin'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/forgot-password')) {
    return NextResponse.next();
  }

  const isProtected = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  if (!isProtected) {
    return NextResponse.next();
  }

  const hasSession = Boolean(
    request.cookies.get('sb-access-token') ||
      request.cookies.get('sb-refresh-token') ||
      request.cookies.get('supabase-auth-token')
  );

  if (!hasSession) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/messages/:path*', '/notifications/:path*', '/settings/:path*', '/create/:path*', '/ai/:path*', '/admin/:path*']
};
