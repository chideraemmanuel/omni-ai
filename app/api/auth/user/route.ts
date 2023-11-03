import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/utils/database';
import User from '@/models/user';

interface UserTypes {
  _id: string;
  name: string;
  email: string;
  password: string;
  verified: boolean;
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'Not authorized, no token' },
      { status: 401 }
    );
  } else {
    //
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded) {
      console.log('[TOKEN_VERIFICATION_ERROR]');
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    try {
      await connectToDatabase();

      const user: UserTypes | undefined | null = await User.findById(
        // @ts-ignore
        decoded?.id
      );

      if (!user) {
        return NextResponse.json(
          { message: 'Not authorized' },
          { status: 404 }
        );
      }

      // if (!user.verified) {
      //   return NextResponse.json({ message: 'Email not verified' }, { status: 401 });
      // }

      return NextResponse.json({
        id: user._id,
        name: user.name,
        email: user.email,
        verified: user.verified,
      });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
  }
  // if (!decoded) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
}
