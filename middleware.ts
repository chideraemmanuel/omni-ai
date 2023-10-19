import { NextRequest, NextResponse } from 'next/server';
import User from './models/user';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from './lib/utils/database';

export async function middleware(request: NextRequest) {
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

  // if (nextUrl.pathname.startsWith('/dashboard') && token) {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET!);

  //   await connectToDatabase();

  //   // @ts-ignore
  //   const currentUser = await User.findById(decoded.id);

  //   if (!currentUser) {
  //     return NextResponse.redirect(new URL('/login', request.url));
  //   } else if (currentUser && !currentUser?.verified) {
  //     return NextResponse.redirect(new URL('/user/verify', request.url));
  //   }
  // }

  // WHEN NAVIGATING TO VERIFICATION PPAGE...
  // if (nextUrl.pathname.startsWith('/user/verify') && !token) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // if (nextUrl.pathname.startsWith('/user/verify') && token) {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET!);

  //   await connectToDatabase();

  //   // @ts-ignore
  //   const currentUser = await User.findById(decoded.id);

  //   if (!currentUser) {
  //     return NextResponse.redirect(new URL('/login', request.url));
  //   } else if (currentUser.verified) {
  //     // NAVIGATE TO DASHBOARD IF USER IS ALREADY VERIFIED
  //     return NextResponse.redirect(new URL('/dashboard', request.url));
  //   }
  // }

  // if (!token) {
  //   // return NextResponse.redirect(new URL('/login', request.url));
  // }
}

// export const config = {
//   matcher: '/dashboard/:path*',
// };
