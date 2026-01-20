import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const privateRoutes = ['/dashboard', '/transacoes', '/transferencias', '/investimentos'];
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
  
  if (isPrivateRoute) {
    const authToken = request.cookies.get('auth-token')?.value;
    const authSession = request.cookies.get('auth-session')?.value;
    
    if (!authToken && !authSession) {
      const url = request.nextUrl.clone();
      url.pathname = '/home';
      url.searchParams.set('redirect', pathname);
      url.searchParams.set('auth', 'required');
      return NextResponse.redirect(url);
    }
  }
  
  const response = NextResponse.next();
  
  const securityHeaders = {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join('; '),
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()',
    ].join(', '),
    'X-XSS-Protection': '1; mode=block',
  };
  
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  if (process.env.NODE_ENV === 'production' && request.nextUrl.protocol === 'https:') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
