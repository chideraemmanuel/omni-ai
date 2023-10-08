import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // get cookie on request
  const url = request.url;
  const nextUrl = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // console.log('url', url);
  // console.log('nextUrl', nextUrl.pathname);
  // console.log('token', token);

  if (
    (nextUrl.pathname.startsWith('/login') ||
      nextUrl.pathname.startsWith('/register')) &&
    token
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // if (!token) {
  //   // return NextResponse.redirect(new URL('/login', request.url));
  // }
}

// export const config = {
//   matcher: '/dashboard/:path*',
// };
