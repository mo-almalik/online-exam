import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const authPage = new Set([
  '/auth/sign-in',
  '/auth/sign-up',
  '/',
  '/auth/forgot-password',
  '/auth/verify-code',
  '/auth/reset-password',
]);

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const role = token?.user?.role;
  const pathname = req.nextUrl.pathname;

  if (authPage.has(pathname) && token) {
    const redirectPath = role === 'admin' ? '/admin' : '/dashboard';
    const redirectUrl = new URL(redirectPath, req.nextUrl.origin);

    return NextResponse.redirect(redirectUrl);
  }

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    if (!token) {
      const redirectUrl = new URL('/auth/sign-in', req.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }

    if (role === 'user' && !pathname.startsWith('/dashboard')) {
      const redirectUrl = new URL('/dashboard', req.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }
    if (role === 'admin' && !pathname.startsWith('/admin')) {
      // You should not force the admin to only access the admin dashboard, admin can access anything the user can access
      const redirectUrl = new URL('/admin', req.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}
