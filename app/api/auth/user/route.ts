import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/utils/database';
import User from '@/models/user';
import { cookies } from 'next/headers';

interface UserTypes {
  _id: string;
  name: string;
  email: string;
  password: string;
  verified: boolean;
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // console.log('route token', token);
  // console.log('route cookies', cookies().get('token'));

  if (!token) {
    // return NextResponse.json(
    //   { message: 'Not authorized, no token' },
    //   { status: 401 }
    // );
    return NextResponse.redirect(new URL('/login', request.url));
  } else {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    await connectToDatabase();

    // @ts-ignore
    const user: UserTypes | undefined | null = await User.findById(decoded.id);

    if (!user) {
      // return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (user && !user.verified) {
      // return NextResponse.json(
      //   { message: 'Email not verified' },
      //   { status: 403 }
      // );
      return NextResponse.redirect(new URL('/user/verify', request.url));
    }

    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      // verified: user.verified,
    });
  }
}
