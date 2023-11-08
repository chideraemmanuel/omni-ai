import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/utils/database';
import User from '@/models/user';

interface UserTypes {
  _id: string;
  first_name: string;
  last_name: string;
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
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);

  if (!decoded) {
    console.log('[TOKEN_VERIFICATION_ERROR]');
    return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  }

  try {
    console.log('connecting to database...');
    await connectToDatabase();
    console.log('connected to database!');

    try {
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

      return NextResponse.json({
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        verified: user.verified,
      });
    } catch (error: any) {
      console.log('[USER_FETCH_ERROR]', error);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.log('[DATABASE_CONNECTION_ERROR]', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
