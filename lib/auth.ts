import type { NextRequest, NextResponse } from 'next/server';

export function getAuthenticatedUserId(request: NextRequest) {
  const token = request.cookies.get('sb-access-token')?.value;
  if (!token) return null;
  return token.slice(0, 12) || null;
}

export function requireAuth(request: NextRequest, response: NextResponse) {
  const userId = getAuthenticatedUserId(request);
  if (!userId) {
    return response;
  }
  return null;
}
